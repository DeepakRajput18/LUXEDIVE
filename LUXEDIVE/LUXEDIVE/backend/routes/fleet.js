const express = require('express');
const { supabase } = require('../config/supabase');
const router = express.Router();

// Get all cars - Ported from Python app.py
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cars')
      .select('*');

    if (error) throw error;
    
    return res.json({ success: true, data });
  } catch (error) {
    console.error('Fleet API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
