-- ============================================================
-- LUXEDIVE: Dynamic Pricing & User Analytics Setup
-- ============================================================

-- 1. user_behavior_events
CREATE TABLE IF NOT EXISTS user_behavior_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id TEXT, -- useful if user is not logged in
    event_type TEXT NOT NULL,
    vehicle_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    page TEXT,
    metadata JSONB DEFAULT '{}',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_behavior_events_user_id ON user_behavior_events(user_id);
CREATE INDEX IF NOT EXISTS idx_user_behavior_events_event_type ON user_behavior_events(event_type);
CREATE INDEX IF NOT EXISTS idx_user_behavior_events_vehicle_id ON user_behavior_events(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_user_behavior_events_timestamp ON user_behavior_events(timestamp DESC);

ALTER TABLE user_behavior_events ENABLE ROW LEVEL SECURITY;
-- Only service role can insert, admin can read
DROP POLICY IF EXISTS "Admins can view behavior events" ON user_behavior_events;
CREATE POLICY "Admins can view behavior events" ON user_behavior_events
    FOR SELECT USING (auth.jwt() ->> 'email' IN ('admin@luxedive.com'));

-- 2. demand_events
CREATE TABLE IF NOT EXISTS demand_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- search, view, wishlist, booking_attempt, booking_success
    demand_score INTEGER DEFAULT 0,
    location TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_demand_events_vehicle_id ON demand_events(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_demand_events_event_type ON demand_events(event_type);
CREATE INDEX IF NOT EXISTS idx_demand_events_timestamp ON demand_events(timestamp DESC);

ALTER TABLE demand_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can view demand events" ON demand_events;
CREATE POLICY "Admins can view demand events" ON demand_events
    FOR SELECT USING (auth.jwt() ->> 'email' IN ('admin@luxedive.com'));

-- 3. dynamic_pricing
CREATE TABLE IF NOT EXISTS dynamic_pricing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    predicted_demand_score NUMERIC DEFAULT 0,
    recommended_price NUMERIC,
    prediction_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dynamic_pricing_vehicle_id ON dynamic_pricing(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_dynamic_pricing_date ON dynamic_pricing(prediction_date DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_dynamic_pricing_vehicle_date ON dynamic_pricing(vehicle_id, prediction_date);

ALTER TABLE dynamic_pricing ENABLE ROW LEVEL SECURITY;
-- Public can read to get current price, only service role writes
DROP POLICY IF EXISTS "Public can read dynamic pricing" ON dynamic_pricing;
CREATE POLICY "Public can read dynamic pricing" ON dynamic_pricing
    FOR SELECT USING (true);


-- 4. vehicle_popularity (Aggregated table)
CREATE TABLE IF NOT EXISTS vehicle_popularity (
    vehicle_id UUID PRIMARY KEY REFERENCES cars(id) ON DELETE CASCADE,
    views INTEGER DEFAULT 0,
    bookings INTEGER DEFAULT 0,
    wishlist_count INTEGER DEFAULT 0,
    conversion_rate NUMERIC DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE vehicle_popularity ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can view vehicle popularity" ON vehicle_popularity;
CREATE POLICY "Admins can view vehicle popularity" ON vehicle_popularity
    FOR SELECT USING (auth.jwt() ->> 'email' IN ('admin@luxedive.com'));

-- 5. user_activity_summary (Aggregated table)
CREATE TABLE IF NOT EXISTS user_activity_summary (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    total_visits INTEGER DEFAULT 0,
    vehicles_viewed INTEGER DEFAULT 0,
    bookings_made INTEGER DEFAULT 0,
    last_active TIMESTAMP WITH TIME ZONE,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE user_activity_summary ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can view user activity summary" ON user_activity_summary;
CREATE POLICY "Admins can view user activity summary" ON user_activity_summary
    FOR SELECT USING (auth.jwt() ->> 'email' IN ('admin@luxedive.com'));


-- Create functions for aggregation jobs
-- 1. Aggregate vehicle popularity
CREATE OR REPLACE FUNCTION aggregate_vehicle_popularity()
RETURNS void AS $$
BEGIN
    INSERT INTO vehicle_popularity (vehicle_id, views, bookings, wishlist_count, conversion_rate, last_updated)
    SELECT 
        c.id as vehicle_id,
        COALESCE(SUM(CASE WHEN e.event_type = 'vehicle_view' THEN 1 ELSE 0 END), 0) as views,
        COALESCE(SUM(CASE WHEN e.event_type = 'booking_success' THEN 1 ELSE 0 END), 0) as bookings,
        COALESCE(SUM(CASE WHEN e.event_type = 'wishlist_add' THEN 1 ELSE 0 END), 0) as wishlist_count,
        CASE 
            WHEN SUM(CASE WHEN e.event_type = 'vehicle_view' THEN 1 ELSE 0 END) > 0 
            THEN (SUM(CASE WHEN e.event_type = 'booking_success' THEN 1 ELSE 0 END)::NUMERIC / SUM(CASE WHEN e.event_type = 'vehicle_view' THEN 1 ELSE 0 END)::NUMERIC) * 100
            ELSE 0 
        END as conversion_rate,
        NOW() as last_updated
    FROM cars c
    LEFT JOIN user_behavior_events e ON c.id = e.vehicle_id
    GROUP BY c.id
    ON CONFLICT (vehicle_id) DO UPDATE SET
        views = EXCLUDED.views,
        bookings = EXCLUDED.bookings,
        wishlist_count = EXCLUDED.wishlist_count,
        conversion_rate = EXCLUDED.conversion_rate,
        last_updated = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Aggregate user activity
CREATE OR REPLACE FUNCTION aggregate_user_activity()
RETURNS void AS $$
BEGIN
    INSERT INTO user_activity_summary (user_id, total_visits, vehicles_viewed, bookings_made, last_active, last_updated)
    SELECT 
        u.id as user_id,
        COALESCE(SUM(CASE WHEN e.event_type = 'page_visit' THEN 1 ELSE 0 END), 0) as total_visits,
        COALESCE(SUM(CASE WHEN e.event_type = 'vehicle_view' THEN 1 ELSE 0 END), 0) as vehicles_viewed,
        COALESCE(SUM(CASE WHEN e.event_type = 'booking_success' THEN 1 ELSE 0 END), 0) as bookings_made,
        MAX(e.timestamp) as last_active,
        NOW() as last_updated
    FROM auth.users u
    LEFT JOIN user_behavior_events e ON u.id = e.user_id
    GROUP BY u.id
    ON CONFLICT (user_id) DO UPDATE SET
        total_visits = EXCLUDED.total_visits,
        vehicles_viewed = EXCLUDED.vehicles_viewed,
        bookings_made = EXCLUDED.bookings_made,
        last_active = EXCLUDED.last_active,
        last_updated = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
