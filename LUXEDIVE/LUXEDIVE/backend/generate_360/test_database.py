import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')

print("💾 Testing Database Connection...")
print()

try:
    if not DATABASE_URL:
        print("❌ DATABASE_URL missing from .env")
        exit(1)

    # Try with Deepak@123
    test_url = "postgresql://postgres:Deepak@123@db.txxguqcuirkcvtfbcgak.supabase.co:5432/postgres"
    conn = psycopg2.connect(test_url)
    cursor = conn.cursor()
    
    print("✅ Connected to database")
    
    # Test query
    cursor.execute("SELECT COUNT(*) FROM cars")
    count = cursor.fetchone()[0]
    
    print(f"✅ Query executed")
    print(f"   Total cars in database: {count}")
    
    # Check if 360 columns exist
    cursor.execute("""
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'cars' 
          AND column_name IN ('has_360_view', 'frames_count', 'frames_folder')
    """)
    
    cols = cursor.fetchall()
    
    if len(cols) == 3:
        print(f"✅ All 360 columns exist in cars table")
    else:
        print(f"❌ Missing 360 columns. Found: {[c[0] for c in cols]}")
        print()
        print("💡 Run this SQL in Supabase:")
        print("""
        ALTER TABLE cars 
        ADD COLUMN IF NOT EXISTS has_360_view BOOLEAN DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS frames_count INTEGER DEFAULT 36,
        ADD COLUMN IF NOT EXISTS frames_folder TEXT;
        """)
    
    conn.close()
    
except Exception as e:
    print(f"❌ Error: {e}")
    print()
    print("💡 Check your DATABASE_URL in .env")
