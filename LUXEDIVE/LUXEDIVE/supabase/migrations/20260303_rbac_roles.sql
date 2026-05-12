-- ============================================================
-- LUXEDIVE: Role-Based Access Control Migration
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. Add role column to profiles (default: 'user')
ALTER TABLE profiles 
  ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user' 
  CHECK (role IN ('user', 'admin', 'staff'));

-- 2. Add is_blocked column if missing
ALTER TABLE profiles 
  ADD COLUMN IF NOT EXISTS is_blocked BOOLEAN NOT NULL DEFAULT false;

-- 3. Create user_preferences table for per-user settings
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'dark',
  notifications_enabled BOOLEAN DEFAULT true,
  marketing_emails BOOLEAN DEFAULT false,
  preferred_category TEXT DEFAULT 'all',
  currency TEXT DEFAULT 'INR',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id)
);

-- 4. Enable RLS on user_preferences
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- 4a. Policy: users can read/write their own preferences only
DROP POLICY IF EXISTS "Users can view own preferences" ON user_preferences;
CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own preferences" ON user_preferences;
CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5. Update the new-user profile trigger to also:
--    a. Set role = 'user' explicitly
--    b. Initialize user_preferences row
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create profile with role = 'user'
  INSERT INTO public.profiles (
    id, 
    full_name,
    email,
    phone,
    role,
    is_blocked,
    created_at
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.email, ''),
    COALESCE(NEW.phone, COALESCE(NEW.raw_user_meta_data->>'phone', '')),
    'user',   -- Always 'user' for new signups
    false,
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    phone = EXCLUDED.phone;
  -- Note: role is NOT updated on conflict — preserves existing admin roles

  -- Initialize empty preferences
  INSERT INTO user_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;  -- Don't reset existing preferences

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop and recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 6. Backfill: set role = 'user' for all existing profiles without a role
UPDATE profiles SET role = 'user' WHERE role IS NULL OR role = '';

-- 7. Verify: show current profiles with roles
SELECT id, full_name, email, role, is_blocked, created_at 
FROM profiles 
ORDER BY created_at DESC 
LIMIT 10;
