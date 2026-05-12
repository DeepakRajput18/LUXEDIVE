-- ============================================================
-- LUXEDIVE: Update Vehicle Prices
-- Version: 2026-03-08
-- ============================================================
-- Rule 1: Divide every vehicle's daily_rate by 5.
-- Rule 2: Ensure the maximum price does not exceed ₹100,000.
-- Rule 3: Round prices to a clean integer value.
-- ============================================================

UPDATE cars
SET daily_rate = LEAST(ROUND(daily_rate / 5.0), 100000);

-- Verification Query (For manual checking in the SQL Editor)
-- SELECT brand, model, daily_rate
-- FROM cars
-- ORDER BY daily_rate DESC;
