import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv('backend/generate_360/.env')
supabase = create_client(os.getenv('SUPABASE_URL'), os.getenv('SUPABASE_SERVICE_ROLE_KEY'))

res = supabase.table('car_360_requests').select('*').execute()
print(f"Total rows in car_360_requests: {len(res.data)}")
for item in res.data:
    print(f"ID: {item.get('id')} | Car_ID: {item.get('car_id')} | Status: {item.get('status')} | Brand: {item.get('car_brand')}")
