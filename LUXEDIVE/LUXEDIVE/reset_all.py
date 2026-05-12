import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv('backend/generate_360/.env')
url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
supabase = create_client(url, key)

res = supabase.table('car_360_requests').select('id, status, car_brand, car_model').order('created_at', desc=True).limit(5).execute()
for item in res.data:
    if item['status'] != 'completed':
        print(f"Resetting {item.get('car_brand')} {item.get('car_model')} (ID: {item['id']}) to pending...")
        supabase.table('car_360_requests').update({
            'status': 'pending', 
            'progress': 0, 
            'error_message': None
        }).eq('id', item['id']).execute()
print("Reset complete.")
