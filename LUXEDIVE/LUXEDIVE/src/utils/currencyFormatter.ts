/**
 * Formats a number as Indian Rupees (INR)
 * Example: 50000 -> ₹50,000
 */
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount)
}

/**
 * Formats a number with Indian comma separation but without the symbol
 * Example: 50000 -> 50,000
 */
export const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('en-IN').format(amount)
}
