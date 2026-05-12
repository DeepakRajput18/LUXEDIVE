import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv('backend/generate_360/.env')
supabase = create_client(os.getenv('SUPABASE_URL'), os.getenv('SUPABASE_SERVICE_ROLE_KEY'))

supabase.table('car_360_requests').update({'status': 'pending', 'progress': 0}).eq('id', 'e7197a54-53dd-4b11-a7db-7938931c7a4d').execute()
print("Reset status to pending!")
