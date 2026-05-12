import { supabase } from '../lib/supabaseClient'

export const authService = {
  // Login with Email OTP
  async signInWithEmail(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false, // Enforce signup flow separately
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) throw error
    return data
  },

  // Signup with Email OTP (Auth)
  async signUp(email: string, metadata: { full_name: string; phone: string }) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        data: metadata,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    })
    
    if (error) throw error
    return data
  },

  // Verify OTP
  async verifyOtp(email: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    })
    if (error) throw error
    return data
  },
  
  // Profile Management
  async getProfile(userId: string) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (error) throw error
      return data
  },

  async updateProfile(userId: string, updates: { full_name?: string, phone?: string, avatar_url?: string }) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
      
    if (error) throw error
    return data
  },
  
  async signOut() {
    return supabase.auth.signOut()
  }
}

// --- Custom Node.js Backend OTP Service ---
const API_URL = 'http://localhost:5000/api/auth';

export const sendOTP = async (identifier: string, type: 'email' | 'sms') => {
  const response = await fetch(`${API_URL}/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, type })
  });

  const data = await response.json();
  return data;
};

export const verifyOTP = async (identifier: string, otp: string) => {
  const response = await fetch(`${API_URL}/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, otp })
  });

  const data = await response.json();
  return data;
};

export const resendOTP = async (identifier: string, type: 'email' | 'sms') => {
  const response = await fetch(`${API_URL}/resend-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, type })
  });

  const data = await response.json();
  return data;
};

