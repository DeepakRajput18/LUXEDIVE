# Process 360 viewer queue
cd c:\Users\deepa\Desktop\LUXEDIVE\LUXEDIVE\LUXEDIVE\backend\generate_360
.\venv\Scripts\Activate.ps1
python -c "from car_360_generator import process_queue_item; process_queue_item()"

$date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
"360 queue processed at $date" | Out-File -Append -FilePath c:\Users\deepa\Desktop\LUXEDIVE\LUXEDIVE\LUXEDIVE\scripts\luxedive_360.log
