from rembg import remove
from PIL import Image
from io import BytesIO
import os

print("🎨 Testing Background Removal...")
print()

temp_dir = "temp_frames"
test_image = os.path.join(temp_dir, 'test_download.jpg')

try:
    # Load test image
    if not os.path.exists(test_image):
        print(f"❌ Test image not found at {test_image}. Run test_download.py first.")
        exit(1)

    img = Image.open(test_image)
    print(f"✅ Loaded test image: {img.width}x{img.height}")
    
    # Convert to bytes
    img_byte_arr = BytesIO()
    img.save(img_byte_arr, format='PNG')
    img_bytes = img_byte_arr.getvalue()
    
    print("🔄 Removing background... (this takes 10-30 seconds)")
    
    # Remove background
    output_bytes = remove(img_bytes)
    
    # Convert back to image
    result = Image.open(BytesIO(output_bytes))
    
    print(f"✅ Background removed!")
    print(f"   Output size: {result.width}x{result.height}")
    
    # Save result
    nobg_path = os.path.join(temp_dir, 'test_nobg.png')
    result.save(nobg_path)
    print(f"✅ Saved to {nobg_path}")
    
    print()
    print("👀 Open temp_frames/test_nobg.png to verify background is transparent")
    
except Exception as e:
    print(f"❌ Error: {e}")
    print()
    print("💡 If rembg failed, try:")
    print("   pip uninstall rembg")
    print("   pip install rembg==2.0.50 --no-deps")
    print("   pip install onnxruntime pooch tqdm pillow numpy")
