const { supabase } = require('../config/supabase');

/**
 * Middleware to ensure strict user isolation
 * Prevents any cross-user data contamination by validating JWTs
 */
async function ensureUserContext(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
        message: 'Please login to continue'
      });
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Verify token and get user from Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      console.error('Auth verification error:', error);
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired session',
        message: 'Your session has expired. Please login again.'
      });
    }

    // Attach authenticated user to request
    req.authenticatedUser = {
      id: user.id,
      email: user.email
    };

    // VALIDATION: If the client explicitly sends a userId, it MUST match the token
    const requestedUserId = req.body.userId || req.query.userId || req.params.userId;
    
    if (requestedUserId && requestedUserId !== user.id) {
      console.warn(`🚨 SECURITY ALERT: User ${user.id} attempted to access data for ${requestedUserId}`);
      return res.status(403).json({
        success: false,
        error: 'Access denied',
        message: 'Security violation: You can only access your own data.'
      });
    }

    // Always prefer the authenticated ID for subsequent lookups
    req.userId = user.id;

    next();
  } catch (error) {
    console.error('User context middleware exception:', error);
    res.status(500).json({
      success: false,
      error: 'Internal authentication failure'
    });
  }
}

module.exports = { ensureUserContext };
