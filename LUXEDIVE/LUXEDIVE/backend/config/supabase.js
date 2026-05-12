const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Anon Key is missing');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Full Connectivity Check for Supabase
 * proves that the keys are valid and the network is reachable
 */
const checkConnection = async () => {
  try {
    // Simple check to see if we can reach any table
    // error.code 'PGRST116' just means table doesn't exist, which still proves connectivity/authorization
    const { error } = await supabase.from('_test_connection').select('*').limit(1);
    
    if (error && error.code !== 'PGRST205') {
      console.error("❌ Supabase Connection Failed:", error.message, "Code:", error.code);
    } else {
      console.log("✅ Supabase Connected & Authorized.");
    }
  } catch (err) {
    console.error("❌ Unexpected Supabase Initialization Error:", err.message);
  }
};

// Run connectivity check on startup
checkConnection();

module.exports = { supabase };
