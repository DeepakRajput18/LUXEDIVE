import fs from 'fs';

const reviewerSql = fs.readFileSync('populate_reviewer_names.sql', 'utf8');
const chauffeurSql = fs.readFileSync('populate_chauffeurs.sql', 'utf8');

const schemaSql = `
-- Create chauffeurs table
CREATE TABLE IF NOT EXISTS chauffeurs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    legacy_id INTEGER UNIQUE,
    full_name TEXT NOT NULL,
    first_name TEXT NOT NULL,
    profile_photo TEXT,
    age INTEGER,
    experience_years INTEGER,
    total_trips_completed INTEGER DEFAULT 0,
    price_per_day INTEGER,
    languages TEXT[],
    availability_status TEXT,
    is_top_chauffeur BOOLEAN DEFAULT false,
    bio TEXT,
    driving_style TEXT,
    specializations TEXT[],
    uniform_style TEXT,
    certifications TEXT[],
    background_verified BOOLEAN DEFAULT true,
    police_verification_status BOOLEAN DEFAULT true,
    driving_license_number TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create reviewer_names_pool table
CREATE TABLE IF NOT EXISTS reviewer_names_pool (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    ethnicity TEXT CHECK (ethnicity IN ('gujarati', 'indian', 'foreign')),
    city TEXT,
    country TEXT,
    is_used BOOLEAN DEFAULT false,
    used_for_chauffeur_id UUID REFERENCES chauffeurs(id),
    assigned_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create chauffeur_reviews table
CREATE TABLE IF NOT EXISTS chauffeur_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chauffeur_id UUID REFERENCES chauffeurs(id) ON DELETE CASCADE,
    reviewer_name_id UUID REFERENCES reviewer_names_pool(id),
    full_name TEXT,
    initials TEXT,
    city TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_verified_trip BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Function to assign a unique reviewer name
CREATE OR REPLACE FUNCTION assign_unique_reviewer_name(p_chauffeur_id UUID, p_ethnicity TEXT DEFAULT NULL)
RETURNS UUID AS $$
DECLARE
    v_name_id UUID;
BEGIN
    SELECT id INTO v_name_id
    FROM reviewer_names_pool
    WHERE is_used = false
    AND (p_ethnicity IS NULL OR ethnicity = p_ethnicity)
    LIMIT 1
    FOR UPDATE SKIP LOCKED;

    IF v_name_id IS NOT NULL THEN
        UPDATE reviewer_names_pool
        SET is_used = true,
            used_for_chauffeur_id = p_chauffeur_id,
            assigned_at = now()
        WHERE id = v_name_id;
    END IF;

    RETURN v_name_id;
END;
$$ LANGUAGE plpgsql;
`;

const finalSql = schemaSql + "\n" + reviewerSql + "\n" + chauffeurSql;

fs.writeFileSync('full_migration.sql', finalSql);
console.log('Merged into full_migration.sql');
