-- ============================================================
-- LUXEDIVE: Final RLS Override for Bookings
-- Version: 2026-03-08
-- ============================================================
-- The previous emergency override allowed INSERTs but did not 
-- allow the returning clause (.select()) which caused a 403 
-- error on the frontend when retrieving the new booking ID.
-- ============================================================

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 1. Drop existing permissive policies
DROP POLICY IF EXISTS "allow_all_inserts" ON bookings;
DROP POLICY IF EXISTS "allow_all_select" ON bookings;

-- 2. Create universally permissive INSERT policy.
CREATE POLICY "allow_all_inserts"
ON bookings
FOR INSERT
TO public
WITH CHECK (true);

-- 3. Ensure SELECT enables RETURNING clauses on newly inserted rows
CREATE POLICY "allow_all_select"
ON bookings
FOR SELECT
TO public
USING (true);

-- 4. Ensure UPDATE is possible for payment webhooks
CREATE POLICY "allow_all_updates"
ON bookings
FOR UPDATE
TO public
USING (true);
