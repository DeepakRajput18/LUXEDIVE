import os
import sys
from dotenv import load_dotenv

# Try to load from root or local
load_dotenv()
load_dotenv('../../.env.local')

print("=" * 70)
print("LUXEDIVE 360 SYSTEM DIAGNOSTIC")
print("=" * 70)
print()

# Check Python version
print(f"Python: {sys.version}")
print()

# Check environment variables
print("ENVIRONMENT VARIABLES:")
for var in ['SERPAPI_KEY', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'DATABASE_URL']:
    val = os.getenv(var)
    if val:
        print(f"  [OK] {var}: {val[:30]}...")
    else:
        print(f"  [MISSING] {var}")
print()

# Check packages
print("PYTHON PACKAGES:")
# Map import names to package names
packages = {
    'rembg': 'rembg',
    'cv2': 'opencv-python',
    'PIL': 'pillow',
    'psycopg2': 'psycopg2-binary',
    'supabase': 'supabase',
    'serpapi': 'google-search-results'
}
for imp_name, pkg_name in packages.items():
    try:
        __import__(imp_name)
        print(f"  [OK] {pkg_name} ({imp_name})")
    except ImportError:
        print(f"  [NOT INSTALLED] {pkg_name}")
print()

# Check directories
print("DIRECTORIES:")
if os.path.exists('temp_frames'):
    print(f"  [OK] temp_frames/")
else:
    print(f"  [MISSING] temp_frames/")
print()

# Check database
print("DATABASE CONNECTION:")
try:
    import psycopg2
    db_url = os.getenv('DATABASE_URL')
    if db_url:
        conn = psycopg2.connect(db_url)
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM cars")
        count = cursor.fetchone()[0]
        print(f"  [OK] Connected ({count} cars)")
        
        # Check columns
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'cars' 
              AND column_name IN ('has_360_view', 'frames_count', 'image_360_folder')
        """)
        cols = [c[0] for c in cursor.fetchall()]
        print(f"  [OK] Columns found: {', '.join(cols)}")
        
        conn.close()
    else:
        print("  [MISSING] DATABASE_URL")
except Exception as e:
    print(f"  [FAILED] {e}")
print()

# Check Supabase
print("SUPABASE STORAGE:")
try:
    from supabase import create_client
    url = os.getenv('SUPABASE_URL')
    key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
    if url and key:
        supabase = create_client(url, key)
        buckets = supabase.storage.list_buckets()
        if any(b.name == 'vehicle-360' for b in buckets):
            print(f"  [OK] vehicle-360 bucket exists")
        else:
            print(f"  [MISSING] vehicle-360 bucket")
    else:
        print("  [MISSING] Credentials")
except Exception as e:
    print(f"  [FAILED] {e}")
print()

print("=" * 70)
print("DIAGNOSTIC COMPLETE")
print("=" * 70)
