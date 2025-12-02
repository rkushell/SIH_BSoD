from PIL import Image, ImageDraw, ImageFont

def make_image_with_id(idnum="999999999999", path="test_card.png"):


    img = Image.new("RGB", (1000,500), color=(255,255,255))
    d = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("DejaVuSans.ttf", 64)
    except:
        font = None
    d.text((50,200), f"Aadhaar No: {idnum}", fill=(0,0,0), font=font)
    img.save(path)
    print(f"Saved {path}")

if __name__ == "__main__":
    make_image_with_id()
