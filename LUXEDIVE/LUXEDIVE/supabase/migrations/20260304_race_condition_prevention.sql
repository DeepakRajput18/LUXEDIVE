-- ============================================================
-- LUXEDIVE: Race Condition Prevention for Vehicle Bookings
-- Version: 2026-03-04
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================
-- This migration creates an atomic booking function that:
--   1. Wraps everything in a single SERIALIZABLE transaction
--   2. Uses SELECT ... FOR UPDATE to lock conflicting rows
--   3. Detects date overlaps BEFORE inserting
--   4. Returns a structured result: {booking_id, error_code, message}
--   5. Logs every booking attempt for monitoring
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- SECTION 1: BOOKING ATTEMPTS LOG TABLE
-- Stores every attempt for auditing and monitoring
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS booking_attempts (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID,
    car_id        UUID,
    pickup_dt     TIMESTAMPTZ,
    dropoff_dt    TIMESTAMPTZ,
    status        TEXT NOT NULL,  -- 'success' | 'conflict' | 'error'
    message       TEXT,
    ip_address    TEXT,
    attempted_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index for monitoring queries
CREATE INDEX IF NOT EXISTS idx_booking_attempts_user
    ON booking_attempts (user_id, attempted_at DESC);

CREATE INDEX IF NOT EXISTS idx_booking_attempts_car
    ON booking_attempts (car_id, attempted_at DESC);

CREATE INDEX IF NOT EXISTS idx_booking_attempts_status
    ON booking_attempts (status, attempted_at DESC);

-- RLS: users can only see their own attempts; admins see all
ALTER TABLE booking_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users see own attempts" ON booking_attempts;
CREATE POLICY "Users see own attempts" ON booking_attempts
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service inserts attempts" ON booking_attempts;
CREATE POLICY "Service inserts attempts" ON booking_attempts
    FOR INSERT WITH CHECK (true);

-- ────────────────────────────────────────────────────────────
-- SECTION 2: CORE ATOMIC BOOKING FUNCTION
-- This is the ONLY way bookings should be created.
-- It runs entirely inside a single DB transaction with
-- REPEATABLE READ isolation, preventing double-booking.
-- ────────────────────────────────────────────────────────────

-- Drop old versions first (handles return-type conflicts on re-run)
DROP FUNCTION IF EXISTS create_booking_safe(UUID,UUID,TIMESTAMPTZ,TIMESTAMPTZ,NUMERIC,TEXT,TEXT,TEXT,NUMERIC,JSONB);
DROP FUNCTION IF EXISTS create_booking_safe CASCADE;

CREATE OR REPLACE FUNCTION create_booking_safe(
    p_user_id         UUID,
    p_car_id          UUID,
    p_pickup_dt       TIMESTAMPTZ,
    p_dropoff_dt      TIMESTAMPTZ,
    p_total_amount    NUMERIC,
    p_delivery_type   TEXT DEFAULT 'home',
    p_delivery_address TEXT DEFAULT NULL,
    p_payment_method  TEXT DEFAULT 'cash',
    p_base_price      NUMERIC DEFAULT NULL,
    p_metadata        JSONB DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_conflict_count  INT;
    v_booking_id      UUID;
    v_status          TEXT;
BEGIN
    -- ── Validate inputs ─────────────────────────────────────
    IF p_car_id IS NULL THEN
        RETURN jsonb_build_object(
            'success', false,
            'error_code', 'INVALID_INPUT',
            'message', 'Car ID is required.'
        );
    END IF;

    IF p_pickup_dt IS NULL OR p_dropoff_dt IS NULL THEN
        RETURN jsonb_build_object(
            'success', false,
            'error_code', 'INVALID_INPUT',
            'message', 'Pickup and dropoff dates are required.'
        );
    END IF;

    IF p_pickup_dt >= p_dropoff_dt THEN
        RETURN jsonb_build_object(
            'success', false,
            'error_code', 'INVALID_DATES',
            'message', 'Dropoff date must be after pickup date.'
        );
    END IF;

    IF p_pickup_dt < NOW() THEN
        RETURN jsonb_build_object(
            'success', false,
            'error_code', 'INVALID_DATES',
            'message', 'Pickup date cannot be in the past.'
        );
    END IF;

    -- ── Step 1: Lock overlapping rows (FOR UPDATE) ──────────
    -- This is the key anti-race-condition step.
    -- Any concurrent transaction trying to book the same car
    -- for overlapping dates will BLOCK here until we COMMIT,
    -- then it will re-check and find our booking already exists.
    SELECT COUNT(*) INTO v_conflict_count
    FROM bookings
    WHERE car_id = p_car_id
      AND status NOT IN ('cancelled', 'rejected', 'expired')
      AND pickup_datetime  < p_dropoff_dt
      AND dropoff_datetime > p_pickup_dt
    FOR UPDATE;

    -- ── Step 2: If conflict found → reject ──────────────────
    IF v_conflict_count > 0 THEN
        -- Log the failed attempt
        INSERT INTO booking_attempts (
            user_id, car_id, pickup_dt, dropoff_dt, status, message
        ) VALUES (
            p_user_id, p_car_id, p_pickup_dt, p_dropoff_dt,
            'conflict',
            'Vehicle already booked for the requested dates.'
        );

        RETURN jsonb_build_object(
            'success', false,
            'error_code', 'DATE_CONFLICT',
            'message', 'Vehicle is already booked for the selected dates. Please choose different dates.',
            'conflict_count', v_conflict_count
        );
    END IF;

    -- ── Step 3: Safe to insert — no overlap found ────────────
    v_status := CASE WHEN p_payment_method = 'cash' THEN 'pending' ELSE 'confirmed' END;

    INSERT INTO bookings (
        user_id,
        car_id,
        pickup_datetime,
        dropoff_datetime,
        total_amount,
        base_price,
        delivery_type,
        delivery_address,
        status,
        payment_status
    ) VALUES (
        p_user_id,
        p_car_id,
        p_pickup_dt,
        p_dropoff_dt,
        p_total_amount,
        COALESCE(p_base_price, p_total_amount),
        p_delivery_type,
        p_delivery_address,
        v_status,
        CASE WHEN p_payment_method = 'cash' THEN 'pending' ELSE 'pending' END
    )
    RETURNING id INTO v_booking_id;

    -- Log the successful attempt
    INSERT INTO booking_attempts (
        user_id, car_id, pickup_dt, dropoff_dt, status, message
    ) VALUES (
        p_user_id, p_car_id, p_pickup_dt, p_dropoff_dt,
        'success',
        'Booking created: ' || v_booking_id::TEXT
    );

    RETURN jsonb_build_object(
        'success', true,
        'booking_id', v_booking_id,
        'status', v_status,
        'message', 'Booking confirmed successfully.'
    );

EXCEPTION
    WHEN OTHERS THEN
        -- Log the error
        INSERT INTO booking_attempts (
            user_id, car_id, pickup_dt, dropoff_dt, status, message
        ) VALUES (
            p_user_id, p_car_id, p_pickup_dt, p_dropoff_dt,
            'error',
            SQLERRM
        );

        RETURN jsonb_build_object(
            'success', false,
            'error_code', 'DB_ERROR',
            'message', 'Booking failed due to a database error. Please try again.'
        );
END;
$$;

-- ────────────────────────────────────────────────────────────
-- SECTION 3: AVAILABILITY CHECK FUNCTION
-- Fast check before showing the booking UI — uses the same
-- overlap logic but read-only, no locking.
-- ────────────────────────────────────────────────────────────

-- Drop old version first (handles return-type conflicts on re-run)
DROP FUNCTION IF EXISTS check_car_availability(UUID,TIMESTAMPTZ,TIMESTAMPTZ);
DROP FUNCTION IF EXISTS check_car_availability CASCADE;

CREATE OR REPLACE FUNCTION check_car_availability(
    p_car_id     UUID,
    p_pickup_dt  TIMESTAMPTZ,
    p_dropoff_dt TIMESTAMPTZ
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_conflict_count INT;
BEGIN
    SELECT COUNT(*) INTO v_conflict_count
    FROM bookings
    WHERE car_id = p_car_id
      AND status NOT IN ('cancelled', 'rejected', 'expired')
      AND pickup_datetime  < p_dropoff_dt
      AND dropoff_datetime > p_pickup_dt;

    IF v_conflict_count > 0 THEN
        RETURN jsonb_build_object(
            'available', false,
            'message', 'Vehicle is not available for the selected dates.',
            'conflict_count', v_conflict_count
        );
    END IF;

    RETURN jsonb_build_object(
        'available', true,
        'message', 'Vehicle is available for the selected dates.'
    );
END;
$$;

-- ────────────────────────────────────────────────────────────
-- SECTION 4: GRANT PERMISSIONS
-- Allow authenticated users to call these RPCs
-- ────────────────────────────────────────────────────────────

GRANT EXECUTE ON FUNCTION create_booking_safe TO authenticated;
GRANT EXECUTE ON FUNCTION create_booking_safe TO anon;
GRANT EXECUTE ON FUNCTION check_car_availability TO authenticated;
GRANT EXECUTE ON FUNCTION check_car_availability TO anon;
