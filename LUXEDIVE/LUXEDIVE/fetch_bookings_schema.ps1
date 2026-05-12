$url = "https://txxguqcuirkcvtfbcgak.supabase.co/rest/v1/bookings"
$anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eGd1cWN1aXJrY3Z0ZmJjZ2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwODk1NDMsImV4cCI6MjA4NDY2NTU0M30.YQxb99PYyhQjHU-yQEng9RD_vS_e11kB4QUeCbhvRaQ"

$headers = @{
    "apikey" = $anonKey
    "Authorization" = "Bearer $anonKey"
}

$fullUrl = "$url`?select=*&limit=1"
try {
    $response = Invoke-RestMethod -Uri $fullUrl -Headers $headers -Method Get
    $json = $response | ConvertTo-Json -Depth 5
    Write-Host $json
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)"
}
