# extraction/parsers/thyrocare_parser.py
import re
from utils import find_date_in_text

# Patterns tuned to your sample report format
PATTERNS = {
    "Total Cholesterol": r"TOTAL CHOLESTEROL[^\d\-]*([0-9]+(?:\.[0-9]+)?)\s*(mg\/dL|mg/dL)?",
    "LDL": r"LDL CHOLESTEROL[^\d\-]*([0-9]+(?:\.[0-9]+)?)\s*(mg\/dL|mg/dL)?",
    "HDL": r"HDL CHOLESTEROL[^\d\-]*([0-9]+(?:\.[0-9]+)?)\s*(mg\/dL|mg/dL)?",
    "Triglycerides": r"TRIGLYCERIDES[^\d\-]*([0-9]+(?:\.[0-9]+)?)\s*(mg\/dL|mg/dL)?",
    "Creatinine": r"CREATININE[^\d\-]*([0-9]+(?:\.[0-9]+)?)\s*(mg\/dL|mg/dL)?",
    "Vitamin D": r"VITAMIN D[^\d\-]*([0-9]+(?:\.[0-9]+)?)\s*(ng\/ml|ng\/mL|ng/ml)?",
    "Vitamin B12": r"VITAMIN B-?12[^\d\-]*([0-9]+(?:\.[0-9]+)?)\s*(pg\/ml|pg\/mL|pg/ml)?",
    "HbA1c": r"HbA1c|H\.?B\.?A1c|H B A1c"
}

def parse_thyrocare(text_pages):
    full_text = "\n".join(text_pages)
    biomarkers = []
    # simple patient name extraction from the header
    name_match = re.search(r"NAME\s+([A-Z \.\-]{4,})", full_text, re.I)
    patient_name = name_match.group(1).strip() if name_match else None
    collected_on = find_date_in_text(full_text)
    # scan each pattern; also remember approximate page by searching page text blocks
    for k, pat in PATTERNS.items():
        if k == "HbA1c":
            # HbA1c often on a line like "HbA1c - (HPLC) H.P.L.C %5.5"
            m = re.search(r"HbA1c.*?%([\d\.]+)", full_text, re.I) or re.search(r"H\.P\.L\.C\s*%([\d\.]+)", full_text, re.I)
            if m:
                biomarkers.append({"type":"HbA1c","value": float(m.group(1)),"unit":"%","raw_match":m.group(0)})
            continue
        m = re.search(pat, full_text, re.I)
        if m:
            # find numeric group
            for g in m.groups():
                if g and re.match(r"^[0-9]+(\.[0-9]+)?$", str(g)):
                    val = float(g)
                    unit = next((u for u in m.groups() if isinstance(u,str) and "/" in u), None)
                    biomarkers.append({"type":k,"value":val,"unit": unit or None, "raw_match": m.group(0)})
                    break
    return {
        "patient_name": patient_name,
        "collected_on": collected_on,
        "biomarkers": biomarkers
    }
