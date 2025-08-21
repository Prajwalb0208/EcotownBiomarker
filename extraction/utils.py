# extraction/utils.py
import hashlib
from pathlib import Path
import re
from dateutil.parser import parse as dtparse

def file_sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return "sha256:" + h.hexdigest()

def find_date_in_text(text):
    # simple first-date extractor, robustify as needed
    m = re.search(r"(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4})", text, re.I)
    if m:
        try:
            return dtparse(m.group(1)).date().isoformat()
        except:
            pass
    m = re.search(r"(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})", text)
    if m:
        try:
            return dtparse(m.group(1)).date().isoformat()
        except:
            pass
    return None
