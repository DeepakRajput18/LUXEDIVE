const express = require('express');
const { supabase } = require('../config/supabase');
const router = express.Router();

// Generate 360 - Ported from Python app.py
router.post('/generate', async (req, res) => {
  try {
    const data = req.body;
    const { data: result, error } = await supabase
      .from('car_360_requests')
      .insert({
        car_id: data.car_id,
        car_brand: data.car_brand,
        car_model: data.car_model,
        uploaded_image_url: data.image_url,
        status: 'pending'
      })
      .select();

    if (error) throw error;
    
    return res.json({ success: true, data: result });
  } catch (error) {
    console.error('360 Generate Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Get 360 Status - Ported from Python app.py
router.get('/status/:requestId', async (req, res) => {
  try {
    const { requestId } = req.params;
    const { data, error } = await supabase
      .from('car_360_requests')
      .select('*')
      .eq('id', requestId)
      .single();

    if (error) throw error;
    
    return res.json({ success: true, data });
  } catch (error) {
    console.error('360 Status Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
