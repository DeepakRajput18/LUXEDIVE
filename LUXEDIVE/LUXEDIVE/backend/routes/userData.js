const express = require('express');
const { supabase } = require('../config/supabase');
const { ensureUserContext } = require('../middleware/userContext');

const router = express.Router();

// Apply strict isolation middleware to all routes in this file
router.use(ensureUserContext);

/**
 * Get isolated profile data
 * NEVER accepts ID from user; uses req.authenticatedUser.id
 */
router.get('/profile', async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.authenticatedUser.id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    res.json({
      success: true,
      profile: profile || {
        full_name: '',
        email: req.authenticatedUser.email,
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
      }
    });
  } catch (error) {
    console.error('Fetch profile error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Get isolated booking data
 */
router.get('/bookings', async (req, res) => {
  try {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*, car:cars(*), chauffeur:chauffeurs(*), customer:profiles(*)')
      .eq('user_id', req.authenticatedUser.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, bookings: bookings || [] });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Get isolated documents
 */
router.get('/documents', async (req, res) => {
  try {
    const { data: docs, error } = await supabase
      .from('user_documents')
      .select('*')
      .eq('user_id', req.authenticatedUser.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, documents: docs || [] });
  } catch (error) {
    console.error('Fetch documents error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Get isolated addresses
 */
router.get('/addresses', async (req, res) => {
  try {
    const { data: addresses, error } = await supabase
      .from('user_addresses')
      .select('*')
      .eq('user_id', req.authenticatedUser.id)
      .order('is_default', { ascending: false });

    if (error) throw error;

    res.json({ success: true, addresses: addresses || [] });
  } catch (error) {
    console.error('Fetch addresses error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Unified Itinerary Data (Addresses + verified docs count)
 */
router.get('/itinerary-data', async (req, res) => {
  try {
    const userId = req.authenticatedUser.id;

    const [addrRes, docRes] = await Promise.all([
      supabase.from('user_addresses').select('*').eq('user_id', userId).order('is_default', { ascending: false }),
      supabase.from('user_documents').select('id').eq('user_id', userId).eq('status', 'verified')
    ]);

    res.json({
      success: true,
      addresses: addrRes.data || [],
      verifiedDocsCount: docRes.data?.length || 0
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
