CREATE OR REPLACE FUNCTION check_car_availability(
  p_car_id UUID,
  p_start_date TIMESTAMPTZ,
  p_end_date TIMESTAMPTZ
) RETURNS BOOLEAN AS $$
DECLARE
  conflict_count INTEGER;
BEGIN
  -- Check for any booking that overlaps with the requested range
  -- Overlap logic: (StartA < EndB) AND (EndA > StartB)
  SELECT COUNT(*)
  INTO conflict_count
  FROM bookings
  WHERE car_id = p_car_id
    AND status NOT IN ('cancelled', 'completed')
    AND pickup_datetime < p_end_date
    AND dropoff_datetime > p_start_date;

  -- If no conflicts, it's available
  RETURN conflict_count = 0;
END;
$$ LANGUAGE plpgsql;
