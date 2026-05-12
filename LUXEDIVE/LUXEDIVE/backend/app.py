from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

app = Flask(__name__)
CORS(app)

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'service': 'LUXEDIVE Backend API', 'version': '1.0.0'})

@app.route('/api/cars', methods=['GET'])
def get_cars():
    try:
        response = supabase.table('cars').select('*').execute()
        return jsonify({'success': True, 'data': response.data})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/360/generate', methods=['POST'])
def generate_360():
    try:
        data = request.json
        response = supabase.table('car_360_requests').insert({
            'car_id': data['car_id'],
            'car_brand': data['car_brand'],
            'car_model': data['car_model'],
            'uploaded_image_url': data['image_url'],
            'status': 'pending'
        }).execute()
        return jsonify({'success': True, 'data': response.data})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/360/status/<request_id>', methods=['GET'])
def get_360_status(request_id):
    try:
        response = supabase.table('car_360_requests').select('*').eq('id', request_id).single().execute()
        return jsonify({'success': True, 'data': response.data})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('BACKEND_PORT', 5000))
    print(f"🐍 Backend API starting on http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)
