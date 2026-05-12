-- ============================================================
-- LUXEDIVE: Ensure booking table structure and RLS inserted
-- Version: 2026-03-07
-- ============================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'bookings'
        AND column_name = 'payment_method'
    ) THEN
        ALTER TABLE bookings ADD COLUMN payment_method TEXT;
    END IF;
    
    -- Ensure payment_status is present (should be, but just in case)
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'bookings'
        AND column_name = 'payment_status'
    ) THEN
        ALTER TABLE bookings ADD COLUMN payment_status TEXT;
    END IF;
END $$;

-- ────────────────────────────────────────────────────────────
-- SECTION: Add Row Level Security (RLS) Policy
-- Ensure authenticated users can insert bookings.
-- ────────────────────────────────────────────────────────────

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow_booking_insert" ON bookings;
CREATE POLICY "allow_booking_insert"
ON bookings
FOR INSERT
TO authenticated
WITH CHECK (true);
