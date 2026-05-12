-- ============================================================
-- LUXEDIVE: Admin Fleet RLS Policy Fix for Cars Table
-- Version: 2026-03-07
-- ============================================================
-- This migration ensures that admins (authenticated users)
-- can fetch and view all cars in the fleet.
-- ============================================================

ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Allow complete read access so the admin fleet page can show all vehicles 
DROP POLICY IF EXISTS "allow_admin_read" ON cars;
CREATE POLICY "allow_admin_read"
ON cars
FOR SELECT
TO authenticated
USING (true);

-- Ensure authenticated admins can also insert/update/delete vehicles
DROP POLICY IF EXISTS "allow_admin_insert" ON cars;
CREATE POLICY "allow_admin_insert"
ON cars
FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "allow_admin_update" ON cars;
CREATE POLICY "allow_admin_update"
ON cars
FOR UPDATE
TO authenticated
USING (true);

DROP POLICY IF EXISTS "allow_admin_delete" ON cars;
CREATE POLICY "allow_admin_delete"
ON cars
FOR DELETE
TO authenticated
USING (true);
