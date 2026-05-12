-- ============================================================
-- LUXEDIVE: Fix "record new has no field updated_at" trigger error
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Add updated_at column if it doesn't exist
ALTER TABLE cars
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Backfill existing rows
UPDATE cars SET updated_at = NOW() WHERE updated_at IS NULL;

-- 3. Create (or replace) the trigger function that auto-updates it
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Drop and re-attach the trigger so it only fires if column exists
DROP TRIGGER IF EXISTS set_updated_at ON cars;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON cars
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
