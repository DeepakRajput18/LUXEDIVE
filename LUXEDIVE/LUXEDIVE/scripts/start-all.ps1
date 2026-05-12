Write-Host "==============================================" -ForegroundColor Green
Write-Host "[LUXEDIVE] - Starting All Services" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Green

# Create log directory
New-Item -ItemType Directory -Force -Path "logs" | Out-Null

Write-Host "[Supabase] Starting Supabase..." -ForegroundColor Cyan
Start-Process -NoNewWindow -FilePath "npx.cmd" -ArgumentList "supabase", "start" -RedirectStandardOutput "logs/supabase.log" -RedirectStandardError "logs/supabase.error.log"
Start-Sleep -Seconds 5

Write-Host "[Backend] Starting Secure API (Node.js)..." -ForegroundColor Cyan
Start-Process -NoNewWindow -FilePath "node" -ArgumentList "backend\server.js" -RedirectStandardOutput "logs\backend.log" -RedirectStandardError "logs\backend.error.log"

Write-Host "[360] Starting 360 Generator..." -ForegroundColor Cyan
$gen360Python = "backend\generate_360\venv\Scripts\python.exe"
if (-Not (Test-Path $gen360Python)) { $gen360Python = "python" }
Start-Process -NoNewWindow -FilePath "node" -ArgumentList "backend\generate_360\render_worker.js" -RedirectStandardOutput "logs\360-renderer.log" -RedirectStandardError "logs\360-renderer.error.log"
Start-Process -NoNewWindow -FilePath $gen360Python -ArgumentList "backend\generate_360\worker.py" -RedirectStandardOutput "logs\360-worker.log" -RedirectStandardError "logs\360-worker.error.log"

Write-Host "[Frontend] Starting Frontend..." -ForegroundColor Cyan
Start-Process -NoNewWindow -FilePath "npm.cmd" -ArgumentList "run", "dev:frontend" -RedirectStandardOutput "logs\frontend.log" -RedirectStandardError "logs\frontend.error.log"

Write-Host "[Success] All Services Started! View logs in the 'logs' folder." -ForegroundColor Green
Write-Host "Frontend is loading on http://localhost:5173" -ForegroundColor Green
