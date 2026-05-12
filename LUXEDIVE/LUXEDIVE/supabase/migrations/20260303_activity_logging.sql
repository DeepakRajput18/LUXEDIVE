-- ============================================================
-- LUXEDIVE: Complete Activity Logging Setup
-- Run this ENTIRE script in Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action_type TEXT NOT NULL,
  target_id TEXT,
  details JSONB DEFAULT '{}',
  ip_address TEXT,
  device_info TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_action_type ON activity_logs(action_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);

-- 2. user_sessions table (with status column)
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  login_at TIMESTAMPTZ DEFAULT NOW(),
  logout_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  ip_address TEXT,
  device_info TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add status column if upgrading from older migration
ALTER TABLE user_sessions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_login_at ON user_sessions(login_at DESC);

-- 3. search_queries table
CREATE TABLE IF NOT EXISTS search_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  query TEXT,
  filters JSONB DEFAULT '{}',
  results_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_search_queries_user_id ON search_queries(user_id);
CREATE INDEX IF NOT EXISTS idx_search_queries_created_at ON search_queries(created_at DESC);

-- 4. car_views table
CREATE TABLE IF NOT EXISTS car_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
  view_duration_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_car_views_car_id ON car_views(car_id);
CREATE INDEX IF NOT EXISTS idx_car_views_user_id ON car_views(user_id);
CREATE INDEX IF NOT EXISTS idx_car_views_created_at ON car_views(created_at DESC);

-- 5. wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, car_id)
);

CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_car_id ON wishlist(car_id);

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- activity_logs
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert own activity" ON activity_logs;
CREATE POLICY "Users can insert own activity"
  ON activity_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Admin + anon read (admin panel uses anon key, no Supabase session)
DROP POLICY IF EXISTS "Users can read own activity" ON activity_logs;
DROP POLICY IF EXISTS "Admin reads all activity" ON activity_logs;
DROP POLICY IF EXISTS "Public read activity logs" ON activity_logs;
CREATE POLICY "Public read activity logs"
  ON activity_logs FOR SELECT
  USING (true);

-- user_sessions
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own sessions" ON user_sessions;
CREATE POLICY "Users manage own sessions"
  ON user_sessions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow full insert even without session (needed for logLogin before Supabase auth completes)
DROP POLICY IF EXISTS "Service insert sessions" ON user_sessions;
CREATE POLICY "Service insert sessions"
  ON user_sessions FOR INSERT
  WITH CHECK (true);

-- Admin reads all (anon key — no Supabase auth context in admin panel)
DROP POLICY IF EXISTS "Admin reads all sessions" ON user_sessions;
DROP POLICY IF EXISTS "Public read sessions" ON user_sessions;
CREATE POLICY "Public read sessions"
  ON user_sessions FOR SELECT
  USING (true);

-- Allow update for logout
DROP POLICY IF EXISTS "Service update sessions" ON user_sessions;
CREATE POLICY "Service update sessions"
  ON user_sessions FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- search_queries
ALTER TABLE search_queries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users insert own searches" ON search_queries;
DROP POLICY IF EXISTS "Admin reads all searches" ON search_queries;
CREATE POLICY "Users insert own searches"
  ON search_queries FOR INSERT
  WITH CHECK (true);
DROP POLICY IF EXISTS "Public read searches" ON search_queries;
CREATE POLICY "Public read searches"
  ON search_queries FOR SELECT
  USING (true);

-- car_views
ALTER TABLE car_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users insert own views" ON car_views;
DROP POLICY IF EXISTS "Admin reads all views" ON car_views;
CREATE POLICY "Users insert own views"
  ON car_views FOR INSERT
  WITH CHECK (true);
DROP POLICY IF EXISTS "Public read views" ON car_views;
CREATE POLICY "Public read views"
  ON car_views FOR SELECT
  USING (true);

-- wishlist
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own wishlist" ON wishlist;
CREATE POLICY "Users manage own wishlist"
  ON wishlist FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- Enable Realtime for live admin feed (idempotent)
-- ============================================================
DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE activity_logs;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE user_sessions;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
