# LUXEDIVE Startup Script
# This script starts the Frontend, Backend Renderer, and 360 Generator Worker.

Write-Host "🚀 Starting LUXEDIVE All-in-One Service..." -ForegroundColor Cyan

# 1. Start Frontend (Vite)
Write-Host "Starting Frontend (Vite)..." -ForegroundColor Yellow
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory "c:\Users\deepa\Desktop\LUXEDIVE\LUXEDIVE\LUXEDIVE"

# 2. Start Backend Renderer (Node.js)
Write-Host "Starting Backend Renderer (Node.js)..." -ForegroundColor Yellow
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "start" -WorkingDirectory "c:\Users\deepa\Desktop\LUXEDIVE\LUXEDIVE\LUXEDIVE\backend\generate_360"

# 3. Start 360 Generator Worker (Python)
Write-Host "Starting 360 Generator Worker (Python)..." -ForegroundColor Yellow
$PYTHON_EXE = "python"
# Try the parent directory's .venv first (as identified in file exploration)
if (Test-Path "c:\Users\deepa\Desktop\LUXEDIVE\.venv\Scripts\python.exe") {
    $PYTHON_EXE = "c:\Users\deepa\Desktop\LUXEDIVE\.venv\Scripts\python.exe"
}
# Fallback to project-local .venv if it exists
elseif (Test-Path "c:\Users\deepa\Desktop\LUXEDIVE\LUXEDIVE\LUXEDIVE\.venv\Scripts\python.exe") {
    $PYTHON_EXE = "c:\Users\deepa\Desktop\LUXEDIVE\LUXEDIVE\LUXEDIVE\.venv\Scripts\python.exe"
}
Start-Process -NoNewWindow -FilePath $PYTHON_EXE -ArgumentList "worker.py" -WorkingDirectory "c:\Users\deepa\Desktop\LUXEDIVE\LUXEDIVE\LUXEDIVE\backend\generate_360"


Write-Host "✅ All services initiated. Use Ctrl+C to stop this window (if applicable)." -ForegroundColor Green
Write-Host "Services running in background:" -ForegroundColor Gray
Write-Host " - Frontend: http://localhost:5173" -ForegroundColor Gray
Write-Host " - Renderer: Listening for requests..." -ForegroundColor Gray
Write-Host " - Worker: Polling car_360_queue..." -ForegroundColor Gray
