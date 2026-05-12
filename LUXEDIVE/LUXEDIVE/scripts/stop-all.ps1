Write-Host "==============================================" -ForegroundColor Green
Write-Host "[LUXEDIVE] - Stopping All Services" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Green

Write-Host "[Supabase] Stopping Supabase..." -ForegroundColor Cyan
npx supabase stop

Write-Host "[Node] Stopping Node processes (Vite, Renderer)..." -ForegroundColor Cyan
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "[Python] Stopping Python processes (Flask API, Worker)..." -ForegroundColor Cyan
Get-Process -Name "python" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "[Success] All services stopped!" -ForegroundColor Green
