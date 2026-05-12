import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv('backend/generate_360/.env')
supabase = create_client(os.getenv('SUPABASE_URL'), os.getenv('SUPABASE_SERVICE_ROLE_KEY'))

res = supabase.table('car_360_requests').select('*').order('created_at', desc=True).limit(1).execute()
if res.data:
    item = res.data[0]
    print(f"ID: {item['id']}")
    print(f"Status: {item['status']}")
    print(f"Progress: {item['progress']}%")
    print(f"Car: {item.get('car_brand', '')} {item.get('car_model', '')}")
    if item.get('error_message'):
        print(f"Error: {item['error_message']}")
else:
    print("Empty database")
