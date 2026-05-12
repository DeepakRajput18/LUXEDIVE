Write-Host "==============================================" -ForegroundColor Green
Write-Host "[LUXEDIVE] - Initial Setup" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Green

Write-Host "[Frontend] Installing frontend dependencies..." -ForegroundColor Cyan
npm install

Write-Host "[Backend] Setting up Python backend (Flask API)..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "backend" | Out-Null
Set-Location backend
python -m venv venv
.\venv\Scripts\activate.ps1
pip install --upgrade pip
pip install -r requirements.txt
deactivate
Set-Location ..

Write-Host "[360] Setting up 360 generator..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "backend/generate_360" | Out-Null
Set-Location backend/generate_360
python -m venv venv
.\venv\Scripts\activate.ps1
pip install --upgrade pip
pip install -r requirements.txt
deactivate
Set-Location ../..

Write-Host "[Config] Configuring environment variables..." -ForegroundColor Cyan
if (-Not (Test-Path ".env")) {
    Copy-Item ".env.example" -Destination ".env"
    Write-Host "[Success] Created .env file" -ForegroundColor Green
}

Copy-Item ".env" -Destination "backend/.env" -ErrorAction SilentlyContinue
Copy-Item ".env" -Destination "backend/generate_360/.env" -ErrorAction SilentlyContinue

if (-Not (Get-Command "supabase" -ErrorAction SilentlyContinue)) {
    Write-Host "[Config] Installing Supabase CLI globally..." -ForegroundColor Cyan
    npm install -g supabase
}

if (-Not (Test-Path "supabase/config.toml")) {
    npx supabase init
    Write-Host "[Success] Supabase initialized" -ForegroundColor Green
}

Write-Host "[Success] Setup complete!" -ForegroundColor Green
