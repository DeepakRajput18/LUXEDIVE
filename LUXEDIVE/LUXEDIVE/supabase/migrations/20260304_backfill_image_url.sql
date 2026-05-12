-- ============================================================
-- LUXEDIVE: Backfill image_url column from images array
-- Fixes admin fleet thumbnails not showing for seeded cars
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- For all cars that have images[] but no image_url set,
-- copy the first element of images array into image_url
UPDATE cars
SET image_url = images[1]
WHERE 
    (image_url IS NULL OR image_url = '')
    AND images IS NOT NULL
    AND array_length(images, 1) > 0;

-- Confirm how many rows were updated
SELECT COUNT(*) as updated_count 
FROM cars 
WHERE image_url IS NOT NULL AND image_url != '';
