$url = "https://txxguqcuirkcvtfbcgak.supabase.co/rest/v1/bookings?select=*&limit=1"
$anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eGd1cWN1aXJrY3Z0ZmJjZ2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwODk1NDMsImV4cCI6MjA4NDY2NTU0M30.YQxb99PYyhQjHU-yQEng9RD_vS_e11kB4QUeCbhvRaQ"

$headers = @{
    "apikey" = $anonKey
    "Authorization" = "Bearer $anonKey"
}

try {
    $response = Invoke-RestMethod -Uri $url -Headers $headers -Method Get
    if ($response.Count -gt 0) {
        $keys = $response[0].psobject.properties.name -join "`r`n"
        Set-Content -Path "bookings_cols.txt" -Value $keys
        Write-Host "Wrote columns to bookings_cols.txt"
    } else {
        Write-Host "No data"
    }
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)"
}
