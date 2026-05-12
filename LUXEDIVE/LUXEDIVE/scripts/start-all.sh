#!/bin/bash

echo "=============================================="
echo "🚗 LUXEDIVE - Starting All Services"
echo "=============================================="
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

print_status() { echo -e "${BLUE}[LUXEDIVE]${NC} $1"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }

if [ -f .env ]; then export $(cat .env | grep -v '^#' | xargs); fi

mkdir -p logs

cleanup() {
    echo ""
    print_status "Shutting down services..."
    jobs -p | xargs kill 2>/dev/null
    supabase stop
    print_success "All services stopped"
    exit 0
}
trap cleanup INT TERM

print_status "Starting services..."
echo ""

# 1. Start Supabase
print_status "🗄️  Starting Supabase..."
supabase start > logs/supabase.log 2>&1 &
sleep 5

# 2. Start Backend API
print_status "🐍 Starting Backend API..."
cd backend
source venv/bin/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null
python app.py > ../logs/backend.log 2>&1 &
cd ..

# 3. Start 360° Generator Service
print_status "🎨 Starting 360° Generator..."
cd backend/generate_360
source venv/bin/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null
# Start node renderer
node render_worker.js > ../../logs/360-renderer.log 2>&1 &
# Start python worker
python worker.py > ../../logs/360-worker.log 2>&1 &
cd ../..

# 4. Start Frontend
print_status "⚛️  Starting Frontend..."
npm run dev:frontend > logs/frontend.log 2>&1 &

sleep 5
print_success "All Services Started! 🎉"
echo "View frontend at: http://localhost:5173"
tail -f logs/frontend.log
