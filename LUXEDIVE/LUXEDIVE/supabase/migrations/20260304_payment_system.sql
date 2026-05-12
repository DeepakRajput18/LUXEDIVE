-- ============================================================
-- LUXEDIVE: Payment Gateway System
-- Version: 2026-03-04
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1. PAYMENT GATEWAYS TABLE
-- Stores active gateway configurations securely.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payment_gateways (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gateway_name VARCHAR(50) NOT NULL UNIQUE,
    public_key TEXT,
    secret_key TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure the 'active' column exists in case the table was created previously
ALTER TABLE payment_gateways ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

-- Seed initial gateways (keys empty, to be filled in dashboard or env vars)
INSERT INTO payment_gateways (gateway_name, active) 
VALUES 
    ('razorpay', true),
    ('stripe', false)
ON CONFLICT (gateway_name) DO NOTHING;

-- RLS for payment_gateways: Only admins can view/manage
ALTER TABLE payment_gateways ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage gateways" ON payment_gateways;
CREATE POLICY "Admins can manage gateways" ON payment_gateways
    FOR ALL USING (auth.jwt() ->> 'email' IN ('admin@luxedive.com')); 
    -- Adjust admin policy based on app's actual admin roles if needed, 
    -- otherwise service_role bypasses RLS anyway for the Edge Functions.

-- ────────────────────────────────────────────────────────────
-- 2. PAYMENTS TABLE
-- Stores all payment transaction attempts and successful charges.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    booking_id UUID REFERENCES bookings(id),
    gateway VARCHAR(50) REFERENCES payment_gateways(gateway_name),
    order_id TEXT UNIQUE,      -- The Razorpay/Stripe Order ID
    payment_id TEXT UNIQUE,    -- The Razorpay/Stripe Payment ID
    amount NUMERIC NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(20) DEFAULT 'pending', -- pending, successful, failed, refunded
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure columns exist in case table was created previously
ALTER TABLE payments ADD COLUMN IF NOT EXISTS order_id TEXT UNIQUE;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS payment_id TEXT UNIQUE;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS amount NUMERIC;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS currency VARCHAR(10) DEFAULT 'INR';
ALTER TABLE payments ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending';
ALTER TABLE payments ADD COLUMN IF NOT EXISTS gateway VARCHAR(50) REFERENCES payment_gateways(gateway_name);

-- Index for fast lookups by order_id (from webhooks)
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);

-- RLS for payments: Users see their own, admins see all
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own payments" ON payments;
CREATE POLICY "Users can view own payments" ON payments
    FOR SELECT USING (auth.uid() = user_id);

-- (Inserts/Updates handled securely by Edge Functions bypassing RLS)

-- ────────────────────────────────────────────────────────────
-- 3. REFUNDS TABLE
-- Tracks all refund requests and states.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS refunds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID REFERENCES payments(id),
    booking_id UUID REFERENCES bookings(id),
    refund_amount NUMERIC NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, processed, failed
    reason TEXT,
    gateway_refund_id TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure columns exist in case table was created previously
ALTER TABLE refunds ADD COLUMN IF NOT EXISTS refund_amount NUMERIC;
ALTER TABLE refunds ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending';
ALTER TABLE refunds ADD COLUMN IF NOT EXISTS reason TEXT;
ALTER TABLE refunds ADD COLUMN IF NOT EXISTS gateway_refund_id TEXT UNIQUE;

-- RLS for refunds
ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own refunds" ON refunds;
CREATE POLICY "Users can view own refunds" ON refunds
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM payments p 
            WHERE p.id = refunds.payment_id AND p.user_id = auth.uid()
        )
    );

-- ────────────────────────────────────────────────────────────
-- 4. BOOKINGS TABLE ENHANCEMENTS
-- Note: Reusing existing table, just adding constraint checks naturally 
-- handled by the application layer. No destructive changes here.
-- Assuming `status` is already TEXT/VARCHAR and accepts these values.
-- ────────────────────────────────────────────────────────────

-- Add trigger to Auto-update updated_at for payments and refunds
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_payments_timestamp ON payments;
CREATE TRIGGER update_payments_timestamp
    BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();

DROP TRIGGER IF EXISTS update_refunds_timestamp ON refunds;
CREATE TRIGGER update_refunds_timestamp
    BEFORE UPDATE ON refunds
    FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
