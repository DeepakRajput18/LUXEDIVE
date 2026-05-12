import os
import cv2
import numpy as np
from PIL import Image
import rembg
import requests
from io import BytesIO

def download_image(url: str) -> Image.Image:
    headers = {'User-Agent': 'Mozilla/5.0'}
    r = requests.get(url, headers=headers, timeout=30)
    r.raise_for_status()
    return Image.open(BytesIO(r.content)).convert("RGBA")

def remove_background(img: Image.Image) -> Image.Image:
    return rembg.remove(img)

def overlay_on_white_canvas(img: Image.Image, target_size=(1200, 800)) -> Image.Image:
    # Resize keeping aspect ratio
    img.thumbnail((target_size[0]-100, target_size[1]-100), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", target_size, (255, 255, 255, 255))
    x = (target_size[0] - img.width) // 2
    y = (target_size[1] - img.height) // 2
    canvas.paste(img, (x, y), img)
    return canvas.convert("RGB") # Drop alpha for final output

def generate_fake_360_frames(image_url: str, output_dir: str):
    os.makedirs(output_dir, exist_ok=True)
    
    print("Downloading and removing background...")
    raw_img = download_image(image_url)
    no_bg = remove_background(raw_img)
    base_img = overlay_on_white_canvas(no_bg)
    
    base_cv = cv2.cvtColor(np.array(base_img), cv2.COLOR_RGB2BGR)
    h, w = base_cv.shape[:2]
    
    print("Generating 36 fake rotation frames...")
    for i in range(36):
        angle = i * 10
        rad = np.radians(angle)
        
        # Compression calculation
        scale_x = abs(np.cos(rad))
        if scale_x < 0.15:
            scale_x = 0.15
            
        scale_y = 1.0 + 0.05 * abs(np.sin(rad))
        skew = 0.15 * np.sin(rad) * np.cos(rad)
        
        is_flipped = 90 < angle < 270
        
        brightness = 1.0
        if 135 < angle < 225:
            brightness = 0.85
            
        pts1 = np.float32([[0, 0], [w, 0], [0, h], [w, h]])
        
        cx, cy = w / 2, h / 2
        new_w = w * scale_x
        new_h = h * scale_y
        skew_offset = skew * h
        
        dst_x1 = cx - new_w / 2
        dst_x2 = cx + new_w / 2
        
        pts2 = np.float32([
            [dst_x1, cy - new_h / 2 - skew_offset],
            [dst_x2, cy - new_h / 2 + skew_offset],
            [dst_x1, cy + new_h / 2 - skew_offset],
            [dst_x2, cy + new_h / 2 + skew_offset]
        ])
        
        if is_flipped:
            pts2 = np.float32([
                [dst_x2, cy - new_h / 2 + skew_offset],
                [dst_x1, cy - new_h / 2 - skew_offset],
                [dst_x2, cy + new_h / 2 + skew_offset],
                [dst_x1, cy + new_h / 2 - skew_offset]
            ])

        matrix = cv2.getPerspectiveTransform(pts1, pts2)
        transformed = cv2.warpPerspective(base_cv, matrix, (w, h), borderMode=cv2.BORDER_CONSTANT, borderValue=(255, 255, 255))
        
        if brightness != 1.0:
            mask = cv2.inRange(transformed, np.array([250, 250, 250]), np.array([255, 255, 255]))
            hsv = cv2.cvtColor(transformed, cv2.COLOR_BGR2HSV).astype(np.float64)
            hsv[:, :, 2] *= brightness
            hsv[:, :, 2] = np.clip(hsv[:, :, 2], 0, 255)
            darkened = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)
            darkened[mask > 0] = (255, 255, 255)
            transformed = darkened
            
        path = os.path.join(output_dir, f"frame_{i+1:02d}.png")
        cv2.imwrite(path, transformed)
        print(f"Saved {path}")

if __name__ == "__main__":
    generate_fake_360_frames("https://raw.githubusercontent.com/danielgatis/rembg/master/examples/car-1.jpg", "temp_local_360")
