$url = "https://txxguqcuirkcvtfbcgak.supabase.co/rest/v1/cars"
$anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eGd1cWN1aXJrY3Z0ZmJjZ2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwODk1NDMsImV4cCI6MjA4NDY2NTU0M30.YQxb99PYyhQjHU-yQEng9RD_vS_e11kB4QUeCbhvRaQ"

$headers = @{
    "apikey" = $anonKey
    "Authorization" = "Bearer $anonKey"
}

$columns = @("id", "brand", "model", "category", "daily_rate", "images", "image_url", "year", "seats", "transmission", "fuel_type", "is_available", "seating_capacity")

foreach ($col in $columns) {
    $fullUrl = "$url`?select=$col`&limit=1"
    try {
        $response = Invoke-RestMethod -Uri $fullUrl -Headers $headers -Method Get
        Write-Output "✅ Column $col SUCCESS"
    } catch {
        Write-Output "❌ Column $col FAILED: $($_.Exception.Message)"
    }
}
