# debug_decode_qr.py
import sys
from PIL import Image, ImageOps, ImageFilter
from pyzbar.pyzbar import decode, ZBarSymbol
import xml.etree.ElementTree as ET
import re

AADHAAR_REGEX = re.compile(r'\b(\d{12})\b')

def try_parse_xml(data):
    try:
        root = ET.fromstring(data.strip())
        uid = root.attrib.get("uid")
        if uid and uid.isdigit() and len(uid) == 12:
            return uid, "attr_uid"
        for elem in root.iter():
            if elem.tag.lower() == "uid" and elem.text and elem.text.isdigit():
                return elem.text.strip(), "elem_uid"
    except ET.ParseError:
        return None, None
    return None, None

def decode_with_pyzbar(img):
    results = decode(img, symbols=[ZBarSymbol.QRCODE])
    out = []
    for r in results:
        try:
            payload = r.data.decode("utf-8", errors="replace")
        except:
            payload = r.data
        out.append({
            "data": payload,
            "rect": r.rect,
            "type": r.type,
            "raw_len": len(r.data)
        })
    return out

def preprocess_and_try(img):
    attempts = []
    attempts.append(("original", img))
    gray = ImageOps.grayscale(img)
    attempts.append(("grayscale", gray))
    w, h = gray.size
    if w > 0 and h > 0:
        attempts.append(("resize_x2", gray.resize((w*2, h*2))))
        attempts.append(("sharpen_resize_x2", gray.filter(ImageFilter.SHARPEN).resize((w*2, h*2))))
    attempts.append(("invert", ImageOps.invert(gray)))
    bw = gray.point(lambda p: 255 if p > 128 else 0)
    attempts.append(("threshold", bw))
    blur = gray.filter(ImageFilter.GaussianBlur(1))
    bw2 = blur.point(lambda p: 255 if p > 120 else 0)
    attempts.append(("blur_threshold", bw2))

    results = []
    for name, im in attempts:
        parsed_list = []
        dec = decode_with_pyzbar(im)
        for d in dec:
            uid, how = try_parse_xml(d["data"])
            regex = (
                AADHAAR_REGEX.search(d["data"])
                if isinstance(d["data"], str)
                else None
            )
            parsed_list.append({
                "payload_preview": (
                    d["data"][:200] + "..."
                    if isinstance(d["data"], str) and len(d["data"]) > 200
                    else d["data"]
                ),
                "raw_len": d["raw_len"],
                "rect": d["rect"],
                "type": d["type"],
                "xml_uid": uid,
                "xml_how": how,
                "regex_match": regex.group(1) if regex else None,
            })
        results.append((name, parsed_list))
    return results

def main(path):
    try:
        img = Image.open(path).convert("RGB")
    except Exception as e:
        print("ERROR: unable to open image:", e)
        return

    print("Image path:", path, "size:", img.size)
    results = preprocess_and_try(img)
    found = False

    for name, parsed in results:
        print("\n--- Attempt:", name, "decoded:", len(parsed))
        for i, p in enumerate(parsed):
            print(f"  [{i}] type={p['type']}, rect={p['rect']}, raw_len={p['raw_len']}")
            print("       payload_preview:", repr(p['payload_preview']))
            print("       xml_uid:", p['xml_uid'], "xml_how:", p['xml_how'], "regex_match:", p['regex_match'])
            if p["xml_uid"] or p["regex_match"]:
                found = True

    if not found:
        print("\nNo Aadhaar UID found in ANY decoding attempt.")
        print("This likely means:")
        print("- The test image does NOT contain a QR")
        print("- OR the QR is too small / blurred")
        print("- OR it is NOT an actual Aadhaar secure QR")
    else:
        print("\nAadhaar UID FOUND!")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python debug_decode_qr.py <image>")
        sys.exit(1)
    main(sys.argv[1])
