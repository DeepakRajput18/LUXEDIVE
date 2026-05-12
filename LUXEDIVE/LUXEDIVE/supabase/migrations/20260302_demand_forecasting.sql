-- ============================================================
-- LUXEDIVE Fleet Demand Forecasting AI — Database Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- TABLE 1: Demand Predictions
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS demand_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  prediction_date DATE NOT NULL,
  demand_score DECIMAL(3,2) NOT NULL CHECK (demand_score BETWEEN 0 AND 1),
  predicted_bookings INTEGER NOT NULL DEFAULT 0,
  confidence_level TEXT CHECK (confidence_level IN ('low', 'medium', 'high')),
  peak_start_date DATE,
  peak_end_date DATE,
  factors JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(car_id, prediction_date)
);

CREATE INDEX IF NOT EXISTS idx_demand_car_date ON demand_predictions(car_id, prediction_date);
CREATE INDEX IF NOT EXISTS idx_demand_score ON demand_predictions(demand_score DESC);
CREATE INDEX IF NOT EXISTS idx_demand_peak ON demand_predictions(peak_start_date, peak_end_date);
CREATE INDEX IF NOT EXISTS idx_demand_date ON demand_predictions(prediction_date);

-- ────────────────────────────────────────────────────────────
-- TABLE 2: Ahmedabad Events Calendar
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ahmedabad_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'wedding_season', 'festival', 'holiday', 'ipl', 'corporate_event', 'other'
  )),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  impact_level TEXT CHECK (impact_level IN ('low', 'medium', 'high', 'very_high')),
  affected_categories TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_dates ON ahmedabad_events(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_events_type ON ahmedabad_events(event_type);

-- Pre-populate Ahmedabad events
INSERT INTO ahmedabad_events (event_name, event_type, start_date, end_date, impact_level, affected_categories) VALUES
('Wedding Season Peak', 'wedding_season', '2026-11-01', '2027-02-28', 'very_high', ARRAY['WEDDING', 'LUXURY']),
('Navratri Festival', 'festival', '2026-10-12', '2026-10-20', 'high', ARRAY['LUXURY', 'SPORTS', 'EXOTIC']),
('Diwali', 'festival', '2026-11-04', '2026-11-08', 'high', ARRAY['LUXURY', 'WEDDING', 'EXOTIC']),
('New Year Week', 'holiday', '2026-12-31', '2027-01-02', 'very_high', ARRAY['SPORTS', 'LUXURY', 'EXOTIC']),
('Republic Day', 'holiday', '2027-01-26', '2027-01-26', 'medium', ARRAY['SPORTS']),
('IPL Ahmedabad Matches', 'ipl', '2027-04-01', '2027-05-30', 'high', ARRAY['SPORTS', 'LUXURY', 'EXOTIC']),
('Uttarayan / Makar Sankranti', 'festival', '2027-01-14', '2027-01-15', 'medium', ARRAY['SPORTS', 'LUXURY']),
('Holi Weekend', 'festival', '2027-03-02', '2027-03-03', 'medium', ARRAY['SPORTS', 'LUXURY']),
('Valentine Season', 'other', '2027-02-12', '2027-02-15', 'medium', ARRAY['EXOTIC', 'SPORTS'])
ON CONFLICT DO NOTHING;

-- ────────────────────────────────────────────────────────────
-- TABLE 3: Car Search Analytics
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS car_search_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
  search_date DATE NOT NULL DEFAULT CURRENT_DATE,
  view_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  inquiry_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(car_id, search_date)
);

CREATE INDEX IF NOT EXISTS idx_search_car_date ON car_search_analytics(car_id, search_date);
CREATE INDEX IF NOT EXISTS idx_search_date ON car_search_analytics(search_date DESC);

-- ────────────────────────────────────────────────────────────
-- TABLE 4: Ahmedabad Weather Data
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ahmedabad_weather (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  temperature_max DECIMAL(4,1),
  temperature_min DECIMAL(4,1),
  rainfall_mm DECIMAL(5,2) DEFAULT 0,
  weather_condition TEXT CHECK (weather_condition IN ('sunny', 'rainy', 'cloudy', 'stormy')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_weather_date ON ahmedabad_weather(date);

-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (idempotent — drops before recreating)
-- ────────────────────────────────────────────────────────────

-- demand_predictions
ALTER TABLE demand_predictions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "demand_predictions_public_read" ON demand_predictions;
DROP POLICY IF EXISTS "demand_predictions_service_write" ON demand_predictions;
CREATE POLICY "demand_predictions_public_read" ON demand_predictions FOR SELECT USING (true);
CREATE POLICY "demand_predictions_service_write" ON demand_predictions FOR ALL USING (auth.role() = 'service_role');

-- ahmedabad_events
ALTER TABLE ahmedabad_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "events_public_read" ON ahmedabad_events;
DROP POLICY IF EXISTS "events_service_write" ON ahmedabad_events;
CREATE POLICY "events_public_read" ON ahmedabad_events FOR SELECT USING (true);
CREATE POLICY "events_service_write" ON ahmedabad_events FOR ALL USING (auth.role() = 'service_role');

-- car_search_analytics
ALTER TABLE car_search_analytics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "analytics_public_read" ON car_search_analytics;
DROP POLICY IF EXISTS "analytics_anon_insert" ON car_search_analytics;
DROP POLICY IF EXISTS "analytics_anon_update" ON car_search_analytics;
CREATE POLICY "analytics_public_read" ON car_search_analytics FOR SELECT USING (true);
CREATE POLICY "analytics_anon_insert" ON car_search_analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "analytics_anon_update" ON car_search_analytics FOR UPDATE USING (true);

-- ahmedabad_weather
ALTER TABLE ahmedabad_weather ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "weather_public_read" ON ahmedabad_weather;
CREATE POLICY "weather_public_read" ON ahmedabad_weather FOR SELECT USING (true);

-- ────────────────────────────────────────────────────────────
-- SEED INITIAL DEMAND PREDICTIONS (Rule-Based)
-- Generates predictions for next 90 days for all existing cars
-- ────────────────────────────────────────────────────────────
DO $$
DECLARE
  car_rec RECORD;
  pred_date DATE;
  base_score DECIMAL;
  final_score DECIMAL;
  event_boost DECIMAL;
  day_of_week INTEGER;
  month_num INTEGER;
  predicted_bk INTEGER;
  conf_level TEXT;
  factor_json JSONB;
  event_names TEXT[];
  event_rec RECORD;
BEGIN
  -- Loop through all cars
  FOR car_rec IN SELECT id, brand, model, category FROM cars LOOP
    -- Loop through next 90 days
    FOR i IN 0..89 LOOP
      pred_date := CURRENT_DATE + i;
      day_of_week := EXTRACT(DOW FROM pred_date); -- 0=Sun, 6=Sat
      month_num := EXTRACT(MONTH FROM pred_date);
      event_boost := 0;
      event_names := ARRAY[]::TEXT[];

      -- Base score by category
      base_score := CASE car_rec.category
        WHEN 'EXOTIC' THEN 0.65
        WHEN 'LUXURY' THEN 0.55
        WHEN 'SPORTS' THEN 0.50
        WHEN 'WEDDING' THEN 0.45
        ELSE 0.40
      END;

      -- Wedding season boost (Nov-Feb) for LUXURY and WEDDING
      IF month_num IN (11, 12, 1, 2) AND car_rec.category IN ('LUXURY', 'WEDDING') THEN
        base_score := base_score + 0.20;
        event_names := array_append(event_names, 'wedding_season');
      END IF;

      -- Festival months (Oct-Nov) — Navratri/Diwali
      IF month_num IN (10, 11) THEN
        base_score := base_score + 0.10;
        event_names := array_append(event_names, 'festival_month');
      END IF;

      -- IPL season (Apr-May) for SPORTS & EXOTIC
      IF month_num IN (4, 5) AND car_rec.category IN ('SPORTS', 'EXOTIC', 'LUXURY') THEN
        base_score := base_score + 0.15;
        event_names := array_append(event_names, 'ipl_season');
      END IF;

      -- Weekend boost
      IF day_of_week IN (0, 6) THEN
        base_score := base_score + 0.08;
        event_names := array_append(event_names, 'weekend');
      END IF;

      -- Check specific events
      FOR event_rec IN 
        SELECT event_name, event_type, impact_level, affected_categories
        FROM ahmedabad_events
        WHERE pred_date BETWEEN start_date AND end_date
      LOOP
        -- Only boost if car category is in affected categories
        IF car_rec.category = ANY(event_rec.affected_categories) THEN
          event_boost := event_boost + CASE event_rec.impact_level
            WHEN 'very_high' THEN 0.25
            WHEN 'high' THEN 0.18
            WHEN 'medium' THEN 0.10
            WHEN 'low' THEN 0.05
            ELSE 0.05
          END;
          event_names := array_append(event_names, event_rec.event_type);
        END IF;
      END LOOP;

      -- Final score with event boost, capped at 0.98
      final_score := LEAST(base_score + event_boost + (RANDOM() * 0.05), 0.98);

      -- Predicted bookings (rough estimate)
      predicted_bk := GREATEST(0, ROUND((final_score * 8)::NUMERIC)::INTEGER);

      -- Confidence level
      conf_level := CASE
        WHEN final_score >= 0.70 THEN 'high'
        WHEN final_score >= 0.45 THEN 'medium'
        ELSE 'low'
      END;

      -- Build factors JSON
      factor_json := jsonb_build_object(
        'is_weekend', day_of_week IN (0, 6),
        'month', month_num,
        'category', car_rec.category,
        'events', to_jsonb(event_names),
        'base_score', ROUND(base_score::NUMERIC, 2)
      );

      -- Upsert prediction
      INSERT INTO demand_predictions (
        car_id, prediction_date, demand_score, predicted_bookings,
        confidence_level, factors
      ) VALUES (
        car_rec.id, pred_date, ROUND(final_score::NUMERIC, 2),
        predicted_bk, conf_level, factor_json
      )
      ON CONFLICT (car_id, prediction_date) DO UPDATE SET
        demand_score = EXCLUDED.demand_score,
        predicted_bookings = EXCLUDED.predicted_bookings,
        confidence_level = EXCLUDED.confidence_level,
        factors = EXCLUDED.factors,
        updated_at = NOW();

    END LOOP;
  END LOOP;

  RAISE NOTICE 'Seeded demand predictions for % days for all cars.', 90;
END $$;
