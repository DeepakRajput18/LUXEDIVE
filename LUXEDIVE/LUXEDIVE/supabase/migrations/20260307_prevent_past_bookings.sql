-- ============================================================
-- LUXEDIVE: Database Constraint for Future Bookings
-- Version: 2026-03-07
-- ============================================================
-- This migration creates a trigger to guarantee that no bookings
-- can be physically inserted if the pickup_datetime is in the past.
-- ============================================================

CREATE OR REPLACE FUNCTION enforce_future_booking_time()
RETURNS TRIGGER AS $$
BEGIN
    -- We allow a tiny 5-minute buffer to account for minor client/server clock drift 
    -- and network latency during the insertion process.
    -- We only check this on INSERT, or if the pickup_datetime is being altered in an UPDATE.
    IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.pickup_datetime IS DISTINCT FROM OLD.pickup_datetime) THEN
        IF NEW.pickup_datetime < (NOW() - interval '5 minutes') THEN
            RAISE EXCEPTION 'Booking start datetime cannot be in the past.';
        END IF;
    END IF;

    -- Always validate dropoff is after pickup
    IF NEW.dropoff_datetime <= NEW.pickup_datetime THEN
        RAISE EXCEPTION 'Dropoff datetime must be strictly after pickup datetime.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS ensure_future_booking ON bookings;

CREATE TRIGGER ensure_future_booking
BEFORE INSERT OR UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION enforce_future_booking_time();
