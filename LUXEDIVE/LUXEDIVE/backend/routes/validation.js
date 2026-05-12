const express = require('express');
const { supabase } = require('../config/supabase');

const router = express.Router();

/**
 * Get current server time (for client sync)
 */
router.get('/current-time', async (req, res) => {
  try {
    const { data, error } = await supabase.rpc('get_current_time_ist');
    if (error) throw error;
    res.json({ success: true, ...data });
  } catch (error) {
    console.error('Get current time error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Validate pickup datetime
 */
router.post('/validate-pickup-time', async (req, res) => {
  try {
    const { pickupDate, pickupTime, timezone = 'Asia/Kolkata' } = req.body;

    if (!pickupDate || !pickupTime) {
      return res.status(400).json({ success: false, error: 'Pickup date and time are required' });
    }

    const { data: validation, error } = await supabase.rpc('validate_booking_datetime', {
      p_pickup_date: pickupDate,
      p_pickup_time: pickupTime,
      p_timezone: timezone
    });

    if (error) throw error;

    if (!validation.valid) {
      return res.json({
        success: false,
        valid: false,
        reason: validation.reason,
        original: validation.original,
        corrected: validation.corrected,
        popup: validation.popup,
        autoCorrect: {
          date: validation.corrected.date,
          time: validation.corrected.time
        }
      });
    }

    res.json({ success: true, valid: true, message: validation.message });
  } catch (error) {
    console.error('Validate pickup error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Validate drop datetime
 */
router.post('/validate-drop-time', async (req, res) => {
  try {
    const { pickupDate, pickupTime, dropDate, dropTime, timezone = 'Asia/Kolkata' } = req.body;

    if (!pickupDate || !pickupTime || !dropDate || !dropTime) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const { data: validation, error } = await supabase.rpc('validate_drop_datetime', {
      p_pickup_date: pickupDate,
      p_pickup_time: pickupTime,
      p_drop_date: dropDate,
      p_drop_time: dropTime,
      p_timezone: timezone
    });

    if (error) throw error;

    if (!validation.valid) {
      return res.json({
        success: false,
        valid: false,
        reason: validation.reason,
        corrected: validation.corrected,
        popup: validation.popup,
        autoCorrect: {
          date: validation.corrected.date,
          time: validation.corrected.time
        }
      });
    }

    res.json({ success: true, valid: true, message: validation.message });
  } catch (error) {
    console.error('Validate drop error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
