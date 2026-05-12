#!/bin/bash

echo "=============================================="
echo "🚗 LUXEDIVE - Stopping All Services"
echo "=============================================="
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() { echo -e "${BLUE}[LUXEDIVE]${NC} $1"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }

print_status "Stopping Supabase..."
supabase stop
print_success "Supabase stopped"

print_status "Stopping Backend (Port 5000)..."
lsof -ti:5000 | xargs kill -9 2>/dev/null || true
print_success "Backend stopped"

print_status "Stopping Frontend (Port 5173)..."
lsof -ti:5173 | xargs kill -9 2>/dev/null || true
print_success "Frontend stopped"

print_status "Stopping Python services..."
pkill -f "worker.py" 2>/dev/null || true
pkill -f "app.py" 2>/dev/null || true
print_success "Python services stopped"

print_status "Stopping Node services..."
pkill -f "render_worker.js" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true
print_success "Node services stopped"

echo ""
print_success "All services stopped! 🛑"
