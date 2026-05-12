import os
from dotenv import load_dotenv
from supabase import create_client, Client
from PIL import Image
from io import BytesIO

load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

print("☁️  Testing Supabase Upload...")
print()

try:
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("❌ Supabase credentials missing from .env")
        exit(1)

    # Connect to Supabase
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("✅ Connected to Supabase")
    
    # Create test image
    img = Image.new('RGB', (100, 100), color='red')
    img_byte_arr = BytesIO()
    img.save(img_byte_arr, format='PNG')
    img_bytes = img_byte_arr.getvalue()
    
    print(f"✅ Created test image ({len(img_bytes)} bytes)")
    
    # Upload to storage
    test_path = "test-folder/test-upload.png"
    
    # Check if bucket exists first
    buckets = supabase.storage.list_buckets()
    if not any(b.name == 'vehicle-360' for b in buckets):
        print("❌ Bucket 'vehicle-360' NOT FOUND. Create it in Supabase dashboard.")
        exit(1)
    
    response = supabase.storage.from_('vehicle-360').upload(
        test_path,
        img_bytes,
        {
            "content-type": "image/png",
            "upsert": "true"
        }
    )
    
    print(f"✅ Uploaded to Supabase Storage")
    print(f"   Path: vehicle-360/{test_path}")
    
    # Get public URL
    public_url = supabase.storage.from_('vehicle-360').get_public_url(test_path)
    print(f"   URL: {public_url}")
    
    print()
    print("👀 Open this URL in browser to verify:")
    print(f"   {public_url}")
    
except Exception as e:
    print(f"❌ Error: {e}")
    print()
    print("💡 Common issues:")
    print("   1. Bucket 'vehicle-360' doesn't exist → Create it in Supabase Dashboard")
    print("   2. Bucket is not public → Go to Storage settings and make it public")
    print("   3. Wrong SUPABASE_SERVICE_ROLE_KEY → Get from Settings → API")
