# processor.py
"""
Image / QR processing utilities for Aadhaar QR scanning.

Provides:
- decode_qr_from_bytes(file_bytes) -> list[str]
- decode_qr(file_path) -> list[str]
- extract_aadhaar_uid_from_xml(xml_text) -> Optional[str]

Behavior:
- decode_qr_from_bytes uses Pillow + pyzbar to read QR codes from image bytes.
- extract_aadhaar_uid_from_xml first tries to parse XML and read the uid attribute
  from the PrintLetterBarcodeData element (case-insensitive). If that fails, it
  falls back to finding the first 12-digit numeric sequence in the payload.
"""
from io import BytesIO
from typing import List, Optional
from PIL import Image
from pyzbar.pyzbar import decode as _pyzbar_decode
import xml.etree.ElementTree as ET
import re
import logging

logger = logging.getLogger("processor")
logger.setLevel(logging.INFO)

# -------------------------
# QR decoding helpers
# -------------------------
def decode_qr_from_bytes(file_bytes: bytes) -> List[str]:
    """
    Decode QR codes from image bytes. Returns a list of decoded payload strings.
    If no QR codes are found returns an empty list.
    """
    if not file_bytes:
        return []

    try:
        im = Image.open(BytesIO(file_bytes))
        # normalize image format to RGB
        im = im.convert("RGB")
    except Exception as e:
        logger.exception("Failed to open image from bytes: %s", e)
        return []

    try:
        decoded_objects = _pyzbar_decode(im)
    except Exception as e:
        logger.exception("pyzbar.decode failed: %s", e)
        return []

    results: List[str] = []
    for dobj in decoded_objects:
        try:
            text = dobj.data.decode("utf-8", errors="replace")
            results.append(text)
        except Exception:
            # fallback: include binary data as repr
            try:
                results.append(dobj.data.decode("latin-1"))
            except Exception:
                results.append(repr(dobj.data))
    return results


def decode_qr(file_path: str) -> List[str]:
    """
    Convenience helper: decode QR(s) from a file on disk.
    """
    try:
        with open(file_path, "rb") as f:
            return decode_qr_from_bytes(f.read())
    except Exception as e:
        logger.exception("Failed to read/decode file %s: %s", file_path, e)
        return []

# Aliases for compatibility
decode_qr_image = decode_qr
read_qr_from_image = decode_qr_from_bytes
decode_qr_from_image = decode_qr_from_bytes

# -------------------------
# Aadhaar XML parsing
# -------------------------
def extract_aadhaar_uid_from_xml(xml_text: str) -> Optional[str]:
    """
    Parse the Aadhaar QR payload and extract a valid Aadhaar UID (12 digits).

    Strategy:
    1. If xml_text is parseable XML, look for a PrintLetterBarcodeData element
       (case-insensitive) and read its 'uid' attribute. If it's exactly 12 digits -> return it.
    2. If parsing fails or uid attr not present/invalid, search the full payload
       for the first 12-digit numeric sequence and return that.
    3. Otherwise return None.

    This approach avoids returning DOB (usually 8 digits) and prefers explicit XML data.
    """
    if not xml_text or not isinstance(xml_text, str):
        return None

    text = xml_text.strip()
    # keep plain copy for regex fallback
    plain = text

    # normalize to the first '<' if payload has leading garbage
    if '<' in text:
        text = text[text.find('<'):]

    # helper to extract uid attribute from an element
    def uid_from_elem(elem: ET.Element) -> Optional[str]:
        for key in ("uid", "UID", "Uid"):
            val = elem.attrib.get(key)
            if val:
                v = val.strip()
                if v.isdigit() and len(v) == 12:
                    return v
                # if attribute exists but not valid 12 digits, continue searching
        return None

    # 1) Try XML parsing and extracting uid attribute
    try:
        root = ET.fromstring(text)
        # direct check on root
        uid = uid_from_elem(root)
        if uid:
            return uid

        # search for PrintLetterBarcodeData element among descendants
        for elem in root.iter():
            tag = (elem.tag or "").lower()
            if tag.endswith("printletterbarcodedata") or "printletterbarcodedata" in tag:
                uid = uid_from_elem(elem)
                if uid:
                    return uid
    except ET.ParseError:
        # XML parse failed — continue to regex fallback
        pass
    except Exception as e:
        logger.exception("Unexpected error while parsing XML for UID: %s", e)

    # 2) Regex fallback: find the first standalone 12-digit numeric sequence
    # Use word boundaries to avoid mid-number matches.
    m = re.search(r"\b(\d{12})\b", plain)
    if m:
        candidate = m.group(1)
        if candidate.isdigit():
            return candidate

    return None

# Additional aliases for compatibility with different imports
extract_uid_from_xml = extract_aadhaar_uid_from_xml
extract_uid = extract_aadhaar_uid_from_xml
get_aadhaar_uid = extract_aadhaar_uid_from_xml
get_uid_from_xml = extract_aadhaar_uid_from_xml
