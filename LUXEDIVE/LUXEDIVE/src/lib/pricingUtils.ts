export function normalizeDailyRate(vehicle: any): number {
    // Return the raw daily rate from the database.
    // If it's missing or 0, fallback to a reasonable default or keep it 0 to indicate issue.
    // The previous logic artificially clamped prices between 15k and 37k, which hid real high-end car prices.
    return vehicle.price_per_day || vehicle.daily_rate || 0
}
