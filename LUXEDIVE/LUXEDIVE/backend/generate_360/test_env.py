import os
from dotenv import load_dotenv

load_dotenv()

print("🔍 Testing Environment Variables...")
print()

# Check each variable
vars_to_check = [
    'SERPAPI_KEY',
    'SUPABASE_URL', 
    'SUPABASE_SERVICE_ROLE_KEY',
    'DATABASE_URL'
]

all_ok = True
for var in vars_to_check:
    value = os.getenv(var)
    if value:
        print(f"✅ {var}: {value[:30]}...")
    else:
        print(f"❌ {var}: MISSING!")
        all_ok = False

print()
if all_ok:
    print("✅ All environment variables present!")
else:
    print("❌ Some variables missing. Check your .env file.")

# Test imports
print()
print("🔍 Testing Python Packages...")
try:
    import rembg
    print("✅ rembg installed")
except:
    print("❌ rembg FAILED")

try:
    import cv2
    print("✅ opencv-python installed")
except:
    print("❌ opencv-python FAILED")

try:
    from supabase import create_client
    print("✅ supabase installed")
except:
    print("❌ supabase FAILED")

try:
    import psycopg2
    print("✅ psycopg2 installed")
except:
    print("❌ psycopg2 FAILED")

try:
    from serpapi import GoogleSearch
    print("✅ google-search-results installed")
except:
    print("❌ google-search-results FAILED")
