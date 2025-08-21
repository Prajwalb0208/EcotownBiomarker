import pdfplumber
import re
from pathlib import Path
from pymongo import MongoClient
from datetime import datetime, timezone
from dateutil.parser import parse as dtparse
import json
from dotenv import load_dotenv
import os

load_dotenv()

# ====== CONFIG ======
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB")
RAW_FILE = os.getenv("RAW_FILE")
# ====================

# Biomarker patterns
PATTERNS = {
    "Total Cholesterol": r"TOTAL CHOLESTEROL[^\d]*([0-9]+(?:\.[0-9]+)?)\s*(mg\/dL|mg/dl)?",
    "LDL": r"LDL CHOLESTEROL[^\d]*([0-9]+(?:\.[0-9]+)?)\s*(mg\/dL|mg/dl)?",
    "HDL": r"HDL CHOLESTEROL[^\d]*([0-9]+(?:\.[0-9]+)?)\s*(mg\/dL|mg/dl)?",
    "Triglycerides": r"TRIGLYCERIDES[^\d]*([0-9]+(?:\.[0-9]+)?)\s*(mg\/dL|mg/dl)?",
    "Creatinine": r"CREATININE[^\d]*([0-9]+(?:\.[0-9]+)?)\s*(mg\/dL|mg/dl)?",
    "Vitamin D": r"(?:25-?OH\s+)?VITAMIN\s+D[^\d]*([0-9]+(?:\.[0-9]+)?)\s*(ng\/mL|ng/ml)?",
    "Vitamin B12": r"VITAMIN B-?12[^\d]*([0-9]+(?:\.[0-9]+)?)\s*(pg\/mL|pg/ml)?",
    "HbA1c": r"HbA1c[^\d]*([0-9]+(?:\.[0-9]+)?)\s*(%)?"
}

# -------- Utilities --------
def normalize_name(name):
    """Normalize patient name for consistent storage."""
    if not name:
        return None
    name = re.sub(r"^(MR\.?|MRS\.?|MS\.?|DR\.?)\s+", "", name, flags=re.I)  # remove titles
    name = re.sub(r"\bREGISTRATION\b", "", name, flags=re.I)  # remove registration word
    name = re.sub(r"[^A-Za-z\s]", "", name)  # remove special characters
    return " ".join(name.strip().split()).upper()

def find_date_in_text(text):
    """Find collection date in text."""
    patterns = [
        r"(\d{1,2}\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4})",
        r"(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})"
    ]
    for pat in patterns:
        m = re.search(pat, text, re.I)
        if m:
            try:
                return dtparse(m.group(1)).date().isoformat()
            except:
                continue
    return None

# -------- Extraction --------
def extract_biomarkers(pdf_path):
    """Extract patient and biomarker data from PDF."""
    with pdfplumber.open(pdf_path) as pdf:
        text_pages = [p.extract_text() or "" for p in pdf.pages]
    full_text = "\n".join(text_pages)

    # Patient name
    name_match = re.search(r"NAME\s*[:\-]?\s*([A-Z][A-Z \.\-]{2,})", full_text, re.I)
    raw_name = name_match.group(1).strip() if name_match else None
    normalized = normalize_name(raw_name)

    # Collection date
    collected_on = find_date_in_text(full_text)
    if not collected_on:
        print("⚠️ No collection date found in PDF")

    # Biomarkers
    biomarkers = []
    for biomarker, pattern in PATTERNS.items():
        m = re.search(pattern, full_text, re.I)
        if m:
            try:
                value_match = next((g for g in m.groups() if g and re.match(r"^\d+(\.\d+)?$", g)), None)
                value = float(value_match) if value_match else None
                unit_match = re.search(r"(mg\/dL|mg/dl|ng\/mL|ng/ml|pg\/mL|pg/ml|%)", m.group(0), re.I)
                unit = unit_match.group(1) if unit_match else None
                if value is not None:
                    biomarkers.append({
                        "type": biomarker,
                        "value": value,
                        "unit": unit,
                        "date": collected_on
                    })
            except Exception as e:
                print(f"❌ Error extracting {biomarker}: {e}")

    return {
        "patient": {
            "name": raw_name,
            "normalized_name": normalized
        },
        "collected_on": collected_on,
        "biomarkers": biomarkers,
        "extracted_at": datetime.now(timezone.utc).isoformat(),
        "source_file": pdf_path.name
    }

# -------- Main Runner --------
if __name__ == "__main__":
    pdf_path = Path(RAW_FILE)
    if not pdf_path.exists():
        print(f"❌ File not found: {pdf_path}")
        exit(1)

    # Extract data
    data = extract_biomarkers(pdf_path)
    print("=== Extracted Data ===")
    print(json.dumps(data, indent=2))

    # Save to MongoDB
    client = MongoClient(MONGO_URI)
    db = client[MONGO_DB]
    res = db.patients.update_one(
        {"patient.normalized_name": data["patient"]["normalized_name"]},
        {
            "$set": {
                "patient.name": data["patient"]["name"],
                "patient.normalized_name": data["patient"]["normalized_name"]
            },
            "$push": {
                "reports": {
                    "collected_on": data["collected_on"],
                    "biomarkers": data["biomarkers"],
                    "extracted_at": data["extracted_at"],
                    "source_file": data["source_file"]
                }
            }
        },
        upsert=True
    )

    if res.upserted_id:
        print(f"✅ New patient created with _id {res.upserted_id}")
    else:
        print(f"✅ Added new report to existing patient (matched {res.matched_count})")
