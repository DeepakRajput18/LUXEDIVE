const express = require('express');
const { supabase } = require('../config/supabase');
const { ensureUserContext } = require('../middleware/userContext');

const router = express.Router();

// Apply security context
router.use(ensureUserContext);

/**
 * Create booking with integrated datetime validation
 */
router.post('/create', async (req, res) => {
  try {
    const userId = req.authenticatedUser.id;
    let {
      carId,
      chauffeurId,
      pickupLocation,
      dropLocation,
      pickupDate,
      pickupTime,
      dropDate,
      dropTime
    } = req.body;

    const timezone = 'Asia/Kolkata';
    let popups = [];

    // STEP 1: Validate pickup datetime (3-hour buffer)
    const { data: pickupVal, error: pickupErr } = await supabase.rpc('validate_booking_datetime', {
      p_pickup_date: pickupDate,
      p_pickup_time: pickupTime,
      p_timezone: timezone
    });

    if (pickupErr) throw pickupErr;

    if (!pickupVal.valid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid pickup time',
        message: pickupVal.popup.message,
        validation: pickupVal
      });
    }

    // STEP 2: Validate drop datetime (6-hour gap)
    const { data: dropVal, error: dropErr } = await supabase.rpc('validate_drop_datetime', {
      p_pickup_date: pickupDate,
      p_pickup_time: pickupTime,
      p_drop_date: dropDate,
      p_drop_time: dropTime,
      p_timezone: timezone
    });

    if (dropErr) throw dropErr;

    if (!dropVal.valid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid rental duration',
        message: dropVal.popup.message,
        validation: dropVal
      });
    }

    // STEP 3: Create booking
    const { data: result, error: createErr } = await supabase.rpc('create_booking', {
      p_user_id: userId,
      p_car_id: carId,
      p_chauffeur_id: chauffeurId || null,
      p_pickup_location: pickupLocation || 'Main Hub',
      p_drop_location: dropLocation || 'Main Hub',
      p_pickup_date: pickupDate,
      p_pickup_time: pickupTime,
      p_drop_date: dropDate,
      p_drop_time: dropTime
    });

    if (createErr) throw createErr;

    res.json({
      success: true,
      booking: result,
      corrected: {
        pickup: { date: pickupDate, time: pickupTime },
        drop: { date: dropDate, time: dropTime }
      },
      popups: popups,
      message: 'Booking created with active verification.'
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
