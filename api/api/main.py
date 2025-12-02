# main.py
import os
import time
import logging
from typing import Optional

import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from starlette.concurrency import run_in_threadpool

# processor.py must provide decode_qr_from_bytes and extract_aadhaar_uid_from_xml
from processor import decode_qr_from_bytes, extract_aadhaar_uid_from_xml

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("aadhaar-api")

# Prefer DATABASE_URL; fallback to individual env parts (local dev)
DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    db_user = os.environ.get("DB_USER", "hackuser")
    db_pass = os.environ.get("DB_PASSWORD", "hackpass")
    db_host = os.environ.get("DB_HOST", "localhost")
    db_port = os.environ.get("DB_PORT", "5432")
    db_name = os.environ.get("DB_NAME", "hackathon")
    DATABASE_URL = f"postgresql://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"

def get_db_connection(retries: int = 10, delay: float = 1.0):
    """Connect using DATABASE_URL with retries (returns psycopg2 connection)."""
    last_exc = None
    for attempt in range(1, retries + 1):
        try:
            conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
            return conn
        except Exception as e:
            last_exc = e
            logger.warning("[DB] connect attempt %d/%d failed: %s", attempt, retries, e)
            time.sleep(delay)
    raise last_exc

def find_student_by_aadhaar(aadhaar_uid: str) -> Optional[dict]:
    """
    Lookup students.identification_number == aadhaar_uid.
    Returns dict or None.
    """
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id, name, email, phone, identification_number
                FROM students
                WHERE identification_number = %s
                """,
                (aadhaar_uid,)
            )
            row = cur.fetchone()
            if row:
                row = dict(row)
                # rename to keep API JSON consistent with previous key
                row["aadhaar_uid"] = row.pop("identification_number")
                return row
            return None
    finally:
        conn.close()

app = FastAPI(title="Aadhaar QR Scanner API")

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/scan")
async def scan_aadhaar(file: UploadFile = File(...)):
    # Validate file type
    content_type = file.content_type or ""
    if not content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Upload must be an image file (png/jpeg).")

    body = await file.read()
    if not body:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    # Decode QR(s)
    try:
        decoded_texts = decode_qr_from_bytes(body)
    except Exception as e:
        logger.exception("Error decoding QR from uploaded image")
        return JSONResponse(status_code=500, content={"status": "error", "message": "failed to decode image", "detail": str(e)})

    if not decoded_texts:
        return JSONResponse(status_code=404, content={"status": "no_qr_found", "message": "No QR code detected in image."})

    # Try each decoded payload until we find a UID
    for payload in decoded_texts:
        uid = extract_aadhaar_uid_from_xml(payload)
        if uid:
            try:
                student = await run_in_threadpool(find_student_by_aadhaar, uid)
            except Exception as e:
                logger.exception("DB lookup failed")
                return JSONResponse(status_code=500, content={"status": "error", "message": "database lookup failed", "detail": str(e)})

            if student:
                return {"status": "found", "student": student}
            else:
                return {"status": "not_found", "uid": uid}

    # QR(s) present but none contained Aadhaar XML/uid
    return JSONResponse(status_code=422, content={"status": "qr_without_uid", "decoded_payloads": decoded_texts})

