import requests
from PIL import Image
from io import BytesIO
import os

print("📥 Testing Image Download...")
print()

test_url = "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800"
temp_dir = "temp_frames"

if not os.path.exists(temp_dir):
    os.makedirs(temp_dir)

try:
    response = requests.get(test_url, timeout=10)
    img = Image.open(BytesIO(response.content))
    img = img.convert('RGB')
    
    print(f"✅ Downloaded image")
    print(f"   Size: {img.width}x{img.height}")
    print(f"   Format: {img.format}")
    
    # Save test
    save_path = os.path.join(temp_dir, 'test_download.jpg')
    img.save(save_path)
    print(f"✅ Saved to {save_path}")
    
except Exception as e:
    print(f"❌ Error: {e}")
