-- ============================================================
-- LUXEDIVE Authentication System - Database Migration
-- Run this entire script in Supabase SQL Editor
-- ============================================================

-- ============================
-- STEP 1: OTP Verifications Table
-- ============================
CREATE TABLE IF NOT EXISTS otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_otp_phone ON otp_verifications(phone_number);
CREATE INDEX IF NOT EXISTS idx_otp_expires ON otp_verifications(expires_at);

-- Auto-delete expired OTPs cleanup function
CREATE OR REPLACE FUNCTION delete_expired_otps()
RETURNS void AS $$
BEGIN
  DELETE FROM otp_verifications WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;


-- ============================
-- STEP 2: Enhance Profiles Table
-- ============================
ALTER TABLE profiles 
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS membership_tier TEXT DEFAULT 'silver',
  ADD COLUMN IF NOT EXISTS wallet_balance NUMERIC DEFAULT 0,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Add unique constraint on phone if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'profiles' AND constraint_name = 'profiles_phone_key'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_phone_key UNIQUE (phone);
  END IF;
END$$;

CREATE INDEX IF NOT EXISTS idx_profiles_phone ON profiles(phone) WHERE phone IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email) WHERE email IS NOT NULL;


-- ============================
-- STEP 3: Auto-create Profile Trigger
-- ============================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, email, full_name, phone, phone_verified, 
    membership_tier, wallet_balance
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', NULL),
    COALESCE((NEW.raw_user_meta_data->>'phone_verified')::boolean, FALSE),
    'silver',
    0
  )
  ON CONFLICT (id) DO UPDATE SET
    email = COALESCE(EXCLUDED.email, profiles.email),
    full_name = COALESCE(NULLIF(EXCLUDED.full_name, ''), profiles.full_name),
    phone = COALESCE(EXCLUDED.phone, profiles.phone),
    phone_verified = COALESCE(EXCLUDED.phone_verified, profiles.phone_verified),
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ============================
-- STEP 4: RPC - Generate OTP
-- ============================
CREATE OR REPLACE FUNCTION generate_otp(p_phone TEXT)
RETURNS TABLE(otp_code TEXT, expires_at TIMESTAMPTZ) AS $$
DECLARE
  v_otp TEXT;
  v_expires TIMESTAMPTZ;
BEGIN
  -- Generate 6-digit OTP
  v_otp := LPAD(FLOOR(RANDOM() * 999999 + 1)::TEXT, 6, '0');
  v_expires := NOW() + INTERVAL '5 minutes';
  
  -- Delete old OTPs for this phone
  DELETE FROM otp_verifications WHERE phone_number = p_phone;
  
  -- Insert new OTP
  INSERT INTO otp_verifications (phone_number, otp_code, expires_at)
  VALUES (p_phone, v_otp, v_expires);
  
  RETURN QUERY SELECT v_otp, v_expires;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ============================
-- STEP 5: RPC - Verify OTP
-- ============================
CREATE OR REPLACE FUNCTION verify_otp(p_phone TEXT, p_code TEXT)
RETURNS TABLE(success BOOLEAN, message TEXT) AS $$
DECLARE
  v_record RECORD;
BEGIN
  -- Get latest unverified OTP for this phone
  SELECT * INTO v_record FROM otp_verifications
  WHERE phone_number = p_phone AND verified = FALSE
  ORDER BY created_at DESC LIMIT 1;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 'No OTP found. Please request a new one.';
    RETURN;
  END IF;
  
  -- Check expiry
  IF v_record.expires_at < NOW() THEN
    RETURN QUERY SELECT FALSE, 'OTP expired. Request a new one.';
    RETURN;
  END IF;
  
  -- Check attempts
  IF v_record.attempts >= 3 THEN
    RETURN QUERY SELECT FALSE, 'Too many failed attempts. Request a new OTP.';
    RETURN;
  END IF;
  
  -- Verify code
  IF v_record.otp_code = p_code THEN
    UPDATE otp_verifications SET verified = TRUE WHERE id = v_record.id;
    RETURN QUERY SELECT TRUE, 'OTP verified successfully';
  ELSE
    UPDATE otp_verifications SET attempts = attempts + 1 WHERE id = v_record.id;
    RETURN QUERY SELECT FALSE, format('Invalid OTP. %s attempts remaining.', 2 - v_record.attempts);
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ============================
-- STEP 6: RPC - Check User Exists
-- ============================
CREATE OR REPLACE FUNCTION check_user_exists(p_phone TEXT, p_email TEXT)
RETURNS TABLE(exists BOOLEAN, message TEXT) AS $$
DECLARE
  v_phone_exists BOOLEAN;
  v_email_exists BOOLEAN;
BEGIN
  SELECT EXISTS(SELECT 1 FROM profiles WHERE phone = p_phone AND phone IS NOT NULL) INTO v_phone_exists;
  SELECT EXISTS(SELECT 1 FROM profiles WHERE email = p_email AND email IS NOT NULL) INTO v_email_exists;
  
  IF v_phone_exists THEN
    RETURN QUERY SELECT TRUE, 'Mobile number already registered';
  ELSIF v_email_exists THEN
    RETURN QUERY SELECT TRUE, 'Email already registered';
  ELSE
    RETURN QUERY SELECT FALSE, 'Available';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ============================
-- STEP 7: Row Level Security
-- ============================

-- Enable RLS on otp_verifications (service role only via edge functions)
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

-- Policy: only service role can access OTP table (edge functions use service role key)
DROP POLICY IF EXISTS "service_role_otp" ON otp_verifications;
CREATE POLICY "service_role_otp" ON otp_verifications
  FOR ALL USING (auth.role() = 'service_role');

-- Profiles RLS (if not already set)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Service can insert profiles" ON profiles;
CREATE POLICY "Service can insert profiles" ON profiles
  FOR INSERT WITH CHECK (true);
