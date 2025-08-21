# extraction/config.py
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
MONGO_DB = os.getenv("MONGO_DB", "ecotown")
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
RAW_DIR = os.getenv("RAW_DIR", "../data/raw")
