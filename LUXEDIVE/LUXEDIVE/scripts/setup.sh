#!/bin/bash

echo "=============================================="
echo "🚗 LUXEDIVE - Initial Setup"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() { echo -e "${BLUE}[LUXEDIVE]${NC} $1"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }

if [ ! -f "package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_status "Checking prerequisites..."
if ! command -v node &> /dev/null; then print_error "Node.js not installed."; exit 1; fi
if ! command -v python3 &> /dev/null; then print_error "Python not installed."; exit 1; fi

if ! command -v supabase &> /dev/null; then
    print_warning "Supabase CLI not found. Installing..."
    npm install -g supabase
fi
print_success "Prerequisites checked"

print_status "📦 Installing frontend and root packages..."
# Run npm install to get dependencies
npm install 
print_success "Dependencies installed"

print_status "🐍 Setting up Python backend..."
mkdir -p backend
cd backend
python3 -m venv venv
source venv/bin/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null
pip install --upgrade pip
pip install -r requirements.txt
deactivate
cd ..
print_success "Backend virtual environment created"

print_status "🎨 Setting up 360° generator..."
mkdir -p backend/generate_360
cd backend/generate_360
python3 -m venv venv
source venv/bin/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null
pip install --upgrade pip
pip install -r requirements.txt
deactivate
cd ../..
print_success "360° generator environment created"

print_status "⚙️  Configuring environment variables..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    print_success "Created .env file (please update with your keys)"
else
    print_warning ".env file already exists"
fi

cp .env backend/.env 2>/dev/null || true
cp .env backend/generate_360/.env 2>/dev/null || true

if [ ! -d "supabase" ]; then
    supabase init
    print_success "Supabase initialized"
fi

chmod +x scripts/*.sh

print_success "Setup complete! 🎉"
