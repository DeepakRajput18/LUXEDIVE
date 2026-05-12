-- ============================================================
-- LUXEDIVE: Automated Inventory Governance
-- Cancels stale bookings to release vehicle inventory.
-- ============================================================

-- 1. Add missing payment_status column to bookings
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';

-- 2. Function to cleanup stale UPI and pending sessions
CREATE OR REPLACE FUNCTION cleanup_stale_bookings()
RETURNS void AS $$
BEGIN
    -- 1. Cancel bookings in pending_verification for > 120 minutes
    -- These are UPI bookings where proof was submitted but admin hasn't approved
    UPDATE bookings
    SET status = 'cancelled',
        payment_status = 'failed',
        auto_cancelled = true,
        cancellation_reason = 'Payment verification timeout (120 minutes)'
    WHERE (status = 'pending_verification' OR payment_status = 'pending_verification')
      AND created_at < NOW() - INTERVAL '120 minutes'
      AND auto_cancelled IS NOT TRUE;

    -- 2. Cleanup draft/pending_payment bookings older than 30 minutes
    -- These are abandoned checkout sessions
    UPDATE bookings
    SET status = 'cancelled',
        auto_cancelled = true,
        cancellation_reason = 'Payment session expired'
    WHERE status IN ('draft', 'pending_payment')
      AND created_at < NOW() - INTERVAL '30 minutes'
      AND auto_cancelled IS NOT TRUE;
      
END;
$$ LANGUAGE plpgsql;

-- Documentation for scheduling:
-- SELECT cron.schedule('cleanup-stale-bookings', '0 * * * *', 'SELECT cleanup_stale_bookings();');
