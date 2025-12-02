# make_test_qr.py
import qrcode
from PIL import Image
import sys, os

def uidai_xml(uid):
    return (
        f'<PrintLetterBarcodeData uid="{uid}" '
        f'name="TEST USER" gender="M" yob="2000" '
        f'co="S/O TEST" house="X" street="Y" lm="Z" '
        f'loc="LOC" vtc="VTC" po="PO" dist="DIST" '
        f'subdist="SUB" state="STATE" pc="123456" />'
    )

def make_qr(uid, out="test_qr.png", size=400):
    payload = uidai_xml(uid)
    qr = qrcode.QRCode(border=2, box_size=4)
    qr.add_data(payload)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white").convert("RGB")
    img = img.resize((size, size))
    img.save(out)
    print("[QR] Created:", out)

def paste_qr_onto_card(card_path, qr_path, out_path="test_card_with_qr.png", position=None):
    card = Image.open(card_path).convert("RGB")
    qr = Image.open(qr_path).convert("RGBA")

    w, h = card.size
    qw, qh = qr.size

    if position is None:
        margin = 20
        position = (w - qw - margin, h - qh - margin)

    card.paste(qr, position, qr)
    card.save(out_path)
    print("[CARD] Created:", out_path)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python make_test_qr.py <12digit_uid> <card_image> [output_image]")
        sys.exit(1)

    uid = sys.argv[1]              # correct: first argument = UID
    card_image = sys.argv[2]       # second argument = image
    out_path = sys.argv[3] if len(sys.argv) > 3 else "test_card_with_qr.png"

    qr_temp = "temp_test_qr.png"

    make_qr(uid, qr_temp, size=300)
    paste_qr_onto_card(card_image, qr_temp, out_path=out_path)
    os.remove(qr_temp)

