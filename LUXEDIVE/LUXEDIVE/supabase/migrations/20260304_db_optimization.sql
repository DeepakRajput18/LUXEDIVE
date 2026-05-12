-- ============================================================
-- LUXEDIVE: Advanced Database Query Optimization
-- Version: 2026-03-04
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================
-- This migration implements:
--   1. B-tree indexes on cars for all filter columns
--   2. Composite indexes for multi-column fleet filtering
--   3. Covering indexes (INCLUDE) for index-only scans
--   4. Partial indexes for active-only bookings
--   5. GIN index for full-text search on car descriptions
--   6. GIN index for JSONB specification filtering
--   7. Indexes on bookings join columns
--   8. Materialized view for admin analytics
--   9. Slow query logging setup
--  10. thumbnail_url column for faster list loads
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- SECTION 0: ENSURE ALL REQUIRED COLUMNS EXIST
-- Add any missing columns before we index them
-- ────────────────────────────────────────────────────────────

-- is_featured: used by admin panel and homepage featured section
ALTER TABLE cars ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- status: some rows may only have is_available; standardize
ALTER TABLE cars ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'available';

-- image_url and thumbnail_url for fast listing queries
ALTER TABLE cars ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE cars ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- description and search_vector for full-text search
ALTER TABLE cars ADD COLUMN IF NOT EXISTS description TEXT;

-- JSONB spec columns (some migrations use specifications, newer ones use specs)
ALTER TABLE cars ADD COLUMN IF NOT EXISTS specifications JSONB DEFAULT '{}';
ALTER TABLE cars ADD COLUMN IF NOT EXISTS specs JSONB DEFAULT '{}';

-- features array
ALTER TABLE cars ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}';

-- seating capacity aliases
ALTER TABLE cars ADD COLUMN IF NOT EXISTS seating_capacity INTEGER;


-- ────────────────────────────────────────────────────────────
-- SECTION 1: CARS TABLE — B-TREE INDEXES
-- Speeds up single-column WHERE clauses users commonly use
-- ────────────────────────────────────────────────────────────

-- Category filter (most common fleet filter)
CREATE INDEX IF NOT EXISTS idx_cars_category
    ON cars (category);

-- Status filter (available / maintenance / booked)
CREATE INDEX IF NOT EXISTS idx_cars_status
    ON cars (status);

-- Brand search / filter
CREATE INDEX IF NOT EXISTS idx_cars_brand
    ON cars (brand);

-- Price range filter
CREATE INDEX IF NOT EXISTS idx_cars_daily_rate
    ON cars (daily_rate);

-- Year filter
CREATE INDEX IF NOT EXISTS idx_cars_year
    ON cars (year);

-- Featured flag — for homepage featured section
CREATE INDEX IF NOT EXISTS idx_cars_featured
    ON cars (is_featured)
    WHERE is_featured = true;

-- Availability flag
CREATE INDEX IF NOT EXISTS idx_cars_is_available
    ON cars (is_available)
    WHERE is_available = true;

-- ────────────────────────────────────────────────────────────
-- SECTION 2: COMPOSITE INDEXES FOR MULTI-COLUMN FILTER QUERIES
-- Users filter: category + price + availability simultaneously
-- ────────────────────────────────────────────────────────────

-- Primary fleet listing composite: most common compound filter
-- Optimizes: WHERE category = ? AND daily_rate <= ? AND status = ?
CREATE INDEX IF NOT EXISTS idx_cars_fleet_filter
    ON cars (category, daily_rate, status);

-- Category + availability (used by user-facing fleet page)
CREATE INDEX IF NOT EXISTS idx_cars_category_available
    ON cars (category, is_available)
    WHERE is_available = true;

-- Brand + model compound (for admin search)
CREATE INDEX IF NOT EXISTS idx_cars_brand_model
    ON cars (brand, model);

-- ────────────────────────────────────────────────────────────
-- SECTION 3: COVERING INDEXES (INCLUDE) — INDEX-ONLY SCANS
-- PostgreSQL can answer the whole query from the index alone,
-- without touching the main table pages.
-- ────────────────────────────────────────────────────────────

-- Fleet list: category filter → serves brand, model, daily_rate, image_url
-- without hitting the heap
CREATE INDEX IF NOT EXISTS idx_cars_listing_cover
    ON cars (category, status)
    INCLUDE (brand, model, daily_rate, image_url, year);

-- Admin fleet table: all needed columns for the table view
CREATE INDEX IF NOT EXISTS idx_cars_admin_cover
    ON cars (brand, model)
    INCLUDE (category, daily_rate, status, is_featured, image_url);

-- ────────────────────────────────────────────────────────────
-- SECTION 4: THUMBNAIL COLUMN
-- Storing a pre-sized thumbnail URL avoids loading full 
-- high-res images in list views.
-- ────────────────────────────────────────────────────────────

ALTER TABLE cars ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Backfill thumbnail_url from image_url for existing cars
UPDATE cars
SET thumbnail_url = image_url
WHERE thumbnail_url IS NULL AND image_url IS NOT NULL;

-- ────────────────────────────────────────────────────────────
-- SECTION 5: FULL-TEXT SEARCH WITH GIN INDEX
-- Enables fast text search across brand, model, description
-- ────────────────────────────────────────────────────────────

-- Add a generated tsvector column for search
ALTER TABLE cars ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Populate the search_vector for all existing cars
UPDATE cars
SET search_vector = to_tsvector(
    'english',
    COALESCE(brand, '') || ' ' ||
    COALESCE(model, '') || ' ' ||
    COALESCE(category, '') || ' ' ||
    COALESCE(description, '') || ' ' ||
    COALESCE(fuel_type::TEXT, '') || ' ' ||
    COALESCE(transmission::TEXT, '')
);

-- GIN index on the search vector
CREATE INDEX IF NOT EXISTS idx_cars_search
    ON cars USING GIN (search_vector);

-- Auto-update search_vector on insert/update
CREATE OR REPLACE FUNCTION update_car_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := to_tsvector(
        'english',
        COALESCE(NEW.brand, '') || ' ' ||
        COALESCE(NEW.model, '') || ' ' ||
        COALESCE(NEW.category, '') || ' ' ||
        COALESCE(NEW.description, '') || ' ' ||
        COALESCE(NEW.fuel_type::TEXT, '') || ' ' ||
        COALESCE(NEW.transmission::TEXT, '')
    );
    -- Sync thumbnail_url when image_url changes
    IF NEW.thumbnail_url IS NULL AND NEW.image_url IS NOT NULL THEN
        NEW.thumbnail_url := NEW.image_url;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trig_car_search_vector ON cars;
CREATE TRIGGER trig_car_search_vector
    BEFORE INSERT OR UPDATE ON cars
    FOR EACH ROW EXECUTE FUNCTION update_car_search_vector();

-- ────────────────────────────────────────────────────────────
-- SECTION 6: JSONB INDEXING FOR SPECIFICATIONS
-- GIN index lets us filter by any key inside the specs JSONB
-- ────────────────────────────────────────────────────────────

-- GIN index on specifications column
CREATE INDEX IF NOT EXISTS idx_cars_specifications
    ON cars USING GIN (specifications);

-- Also index the alternate `specs` column used by newer data
CREATE INDEX IF NOT EXISTS idx_cars_specs
    ON cars USING GIN (specs);

-- ────────────────────────────────────────────────────────────
-- SECTION 7: BOOKINGS TABLE — JOIN & FILTER INDEXES
-- Ensures booking queries and joins are fast
-- ────────────────────────────────────────────────────────────

-- Only add booking indexes if the bookings table exists
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'bookings'
    ) THEN

        -- User booking history (most common user query)
        -- Real column: user_id ✓
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_bookings_user_id
                 ON bookings (user_id)';

        -- Vehicle/car lookup — real column is car_id (not vehicle_id)
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_bookings_car_id
                 ON bookings (car_id)';

        -- Time-based reports
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_bookings_created_at
                 ON bookings (created_at DESC)';

        -- Availability date overlap checks
        -- Real date columns: pickup_datetime / dropoff_datetime
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_bookings_car_dates
                 ON bookings (car_id, pickup_datetime, dropoff_datetime)';

        -- Status filter
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_bookings_status
                 ON bookings (status)';

        -- Partial index: only active bookings (skips cancelled/completed)
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_bookings_active
                 ON bookings (car_id, pickup_datetime, dropoff_datetime)
                 WHERE status NOT IN (''cancelled'', ''completed'')';

        -- Composite for user dashboard (user + status filter)
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_bookings_user_status
                 ON bookings (user_id, status)';

        -- Covering index for admin bookings list (total_amount is the real column)
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_bookings_admin_cover
                 ON bookings (created_at DESC)
                 INCLUDE (user_id, car_id, status, total_amount)';

    END IF;
END $$;


-- ────────────────────────────────────────────────────────────
-- SECTION 8: PROFILES TABLE INDEXES
-- ────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_profiles_membership
    ON profiles (membership_tier)
    WHERE membership_tier IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_profiles_created_at
    ON profiles (created_at DESC);

-- ────────────────────────────────────────────────────────────
-- SECTION 9: MATERIALIZED VIEW — ADMIN ANALYTICS
-- Pre-computes fleet statistics so the admin dashboard loads
-- instantly without expensive GROUP BY queries on every load.
-- ────────────────────────────────────────────────────────────

-- Vehicle stats summary usable by admin analytics dashboard
DROP MATERIALIZED VIEW IF EXISTS mv_fleet_stats;
CREATE MATERIALIZED VIEW mv_fleet_stats AS
SELECT
    category,
    COUNT(*) AS total_vehicles,
    COUNT(*) FILTER (WHERE status = 'available' OR is_available = true) AS available_count,
    COUNT(*) FILTER (WHERE is_featured = true) AS featured_count,
    ROUND(AVG(daily_rate), 0) AS avg_daily_rate,
    MIN(daily_rate) AS min_daily_rate,
    MAX(daily_rate) AS max_daily_rate,
    COUNT(*) FILTER (WHERE image_url IS NOT NULL) AS vehicles_with_images
FROM cars
GROUP BY category
ORDER BY category;

-- Index the materialized view for fast lookup by category
CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_fleet_stats_category
    ON mv_fleet_stats (category);

-- Brand-level stats
DROP MATERIALIZED VIEW IF EXISTS mv_brand_stats;
CREATE MATERIALIZED VIEW mv_brand_stats AS
SELECT
    brand,
    COUNT(*) AS vehicle_count,
    ROUND(AVG(daily_rate), 0) AS avg_daily_rate,
    ARRAY_AGG(DISTINCT category) AS categories,
    COUNT(*) FILTER (WHERE status = 'available' OR is_available = true) AS available_count
FROM cars
GROUP BY brand
ORDER BY vehicle_count DESC;

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_brand_stats_brand
    ON mv_brand_stats (brand);

-- Booking stats (only if bookings table exists)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'bookings'
    ) THEN
        EXECUTE '
        DROP MATERIALIZED VIEW IF EXISTS mv_booking_stats;
        CREATE MATERIALIZED VIEW mv_booking_stats AS
        SELECT
            c.id AS car_id,
            c.brand,
            c.model,
            c.category,
            c.daily_rate,
            COUNT(b.id) AS total_bookings,
            COUNT(b.id) FILTER (WHERE b.status = ''completed'') AS completed_bookings,
            COALESCE(SUM(b.total_amount) FILTER (WHERE b.status = ''completed''), 0) AS total_revenue,
            MAX(b.created_at) AS last_booked_at
        FROM cars c
        LEFT JOIN bookings b ON c.id = b.car_id
        GROUP BY c.id, c.brand, c.model, c.category, c.daily_rate
        ORDER BY total_bookings DESC';

        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_mv_booking_stats_car
                 ON mv_booking_stats (car_id)';

        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_mv_booking_stats_revenue
                 ON mv_booking_stats (total_revenue DESC)';
    END IF;
END $$;


-- ────────────────────────────────────────────────────────────
-- SECTION 10: REFRESH FUNCTION FOR MATERIALIZED VIEWS
-- Call this from a scheduled job or after bulk data changes
-- ────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION refresh_analytics_views()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY mv_fleet_stats;
    REFRESH MATERIALIZED VIEW CONCURRENTLY mv_brand_stats;
    -- Refresh booking stats if it exists
    IF EXISTS (
        SELECT 1 FROM pg_matviews WHERE matviewname = 'mv_booking_stats'
    ) THEN
        REFRESH MATERIALIZED VIEW CONCURRENTLY mv_booking_stats;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- ────────────────────────────────────────────────────────────
-- SECTION 11: QUERY PERFORMANCE HELPER FUNCTIONS
-- Utility RPCs callable from the Supabase client or SQL Editor
-- ────────────────────────────────────────────────────────────

-- Fleet search using full-text search (fast GIN path)
CREATE OR REPLACE FUNCTION search_cars(
    search_term TEXT,
    p_category TEXT DEFAULT NULL,
    p_max_price NUMERIC DEFAULT NULL,
    p_limit INT DEFAULT 20,
    p_offset INT DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    brand TEXT,
    model TEXT,
    category TEXT,
    daily_rate NUMERIC,
    image_url TEXT,
    thumbnail_url TEXT,
    status TEXT,
    year INT,
    rank REAL
)
LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.id,
        c.brand,
        c.model,
        c.category,
        c.daily_rate,
        c.image_url,
        c.thumbnail_url,
        c.status,
        c.year,
        ts_rank(c.search_vector, plainto_tsquery('english', search_term)) AS rank
    FROM cars c
    WHERE
        (search_term IS NULL OR search_term = '' OR
         c.search_vector @@ plainto_tsquery('english', search_term))
        AND (p_category IS NULL OR c.category = p_category)
        AND (p_max_price IS NULL OR c.daily_rate <= p_max_price)
    ORDER BY rank DESC, c.brand, c.model
    LIMIT p_limit
    OFFSET p_offset;
END;
$$;

-- Get fleet stats from the materialized view (instant — no GROUP BY)
CREATE OR REPLACE FUNCTION get_fleet_summary()
RETURNS TABLE (
    category TEXT,
    total_vehicles BIGINT,
    available_count BIGINT,
    featured_count BIGINT,
    avg_daily_rate NUMERIC,
    min_daily_rate NUMERIC,
    max_daily_rate NUMERIC
)
LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT
        fs.category,
        fs.total_vehicles,
        fs.available_count,
        fs.featured_count,
        fs.avg_daily_rate,
        fs.min_daily_rate,
        fs.max_daily_rate
    FROM mv_fleet_stats fs
    ORDER BY fs.total_vehicles DESC;
END;
$$;

-- ────────────────────────────────────────────────────────────
-- SECTION 12: VERIFY INDEXES (INFORMATIONAL)
-- Run these queries after applying to confirm indexes exist
-- ────────────────────────────────────────────────────────────

/*
-- Verify all indexes on cars table:
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'cars'
ORDER BY indexname;

-- Verify materialized views:
SELECT matviewname, ispopulated
FROM pg_matviews;

-- Check index usage (run after normal traffic):
SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
WHERE tablename = 'cars'
ORDER BY idx_scan DESC;

-- Analyze a specific query to confirm index usage:
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT id, brand, model, daily_rate, image_url
FROM cars
WHERE category = 'LUXURY' AND status = 'available'
ORDER BY daily_rate DESC
LIMIT 20;

-- Test full-text search performance:
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT brand, model, ts_rank(search_vector, query) AS rank
FROM cars, plainto_tsquery('english', 'luxury automatic') query
WHERE search_vector @@ query
ORDER BY rank DESC;
*/

-- ────────────────────────────────────────────────────────────
-- FINAL: Initial view population
-- ────────────────────────────────────────────────────────────

-- Populate/refresh the materialized views immediately
REFRESH MATERIALIZED VIEW mv_fleet_stats;
REFRESH MATERIALIZED VIEW mv_brand_stats;
