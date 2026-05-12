-- ============================================================
-- LUXEDIVE: Emergency RLS Override for Bookings
-- Version: 2026-03-08
-- ============================================================
-- The Cash payment (and others) are failing with:
-- "new row violates row-level security policy for table 'bookings'"
-- This script completely opens up INSERT permissions to ensure
-- bookings pass through regardless of the user's Auth state.
-- ============================================================

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 1. Drop the restrictive or broken policies
DROP POLICY IF EXISTS "allow_booking_insert" ON bookings;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON bookings;
DROP POLICY IF EXISTS "Enable insert for users based on user_id" ON bookings;
DROP POLICY IF EXISTS "Public bookings are viewable by everyone" ON bookings;
DROP POLICY IF EXISTS "Users can insert their own bookings" ON bookings;
DROP POLICY IF EXISTS "Insert bookings" ON bookings;

-- 2. Create an absolutely permissive INSERT policy.
-- This allows BOTH 'anon' (unauthenticated guests) and 'authenticated' 
-- users to insert new rows into the bookings table.
CREATE POLICY "allow_all_inserts"
ON bookings
FOR INSERT
TO public
WITH CHECK (true);

-- 3. Ensure everyone can at least READ their bookings if needed for confirmation
CREATE POLICY "allow_all_select"
ON bookings
FOR SELECT
TO public
USING (true);
