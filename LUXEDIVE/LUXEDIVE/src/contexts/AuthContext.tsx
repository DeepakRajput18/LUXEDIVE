import { createContext, useContext, useEffect, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'
import type { Profile } from '../types/app.types'
import { logLogout } from '../services/activityLogger'

// Fallback safely whether VITE_API_URL includes /api or not
const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;

interface AuthContextType {
  session: Session | null
  user: User | null
  profile: Profile | null
  loading: boolean
  isAdmin: boolean
  isNewUser: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  signInWithOtp: (phone: string) => Promise<{ error: any }>
  verifyOtp: (phone: string, token: string) => Promise<{ data: { session: Session | null; user: User | null } | null; error: any }>
  signUp: (phone: string, password: string, options?: any) => Promise<{ data: { session: Session | null; user: User | null } | null; error: any }>
  signInWithPassword: (identifier: string, password: string) => Promise<{ data: { session: Session | null; user: User | null } | null; error: any }>
  resetPasswordForEmail: (email: string) => Promise<{ data: any; error: any }>
  checkUserExists: (phone: string, email: string) => Promise<{ exists: boolean; message: string }>
  sendOtp: (phone: string) => Promise<{ success: boolean; error?: string }>
  verifyOtpCode: (phone: string, code: string) => Promise<{ success: boolean; message: string }>
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  isNewUser: false,
  signOut: async () => { },
  refreshProfile: async () => { },
  signInWithOtp: async () => ({ error: null }),
  verifyOtp: async () => ({ data: null, error: null }),
  signUp: async () => ({ data: null, error: null }),
  signInWithPassword: async () => ({ data: null, error: null }),
  resetPasswordForEmail: async () => ({ data: null, error: null }),
  checkUserExists: async () => ({ exists: false, message: 'Available' }),
  sendOtp: async () => ({ success: false }),
  verifyOtpCode: async () => ({ success: false, message: '' }),
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isNewUser, setIsNewUser] = useState(false)

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // 2. Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
      } else {
        setProfile(data)
      }
    } catch (err) {
      console.error('Unexpected error fetching profile:', err)
    } finally {
      // After profile fetch, check if the user is new (has bookings)
      checkIfNewUser(userId)
    }
  }

  const checkIfNewUser = async (userId: string) => {
    try {
      const { count, error } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)

      if (error) {
        console.error('Error checking new user status:', error)
        setIsNewUser(false)
      } else {
        setIsNewUser(count === 0)
      }
    } catch (err) {
      console.error('Unexpected error checking new user status:', err)
      setIsNewUser(false)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    // Log logout + close session before signing out
    const sessionId = sessionStorage.getItem('luxedive_session_id')
    const currentUser = (await supabase.auth.getUser()).data.user
    if (currentUser) {
      await logLogout(currentUser.id, sessionId)
    }
    sessionStorage.removeItem('luxedive_session_id')

    await supabase.auth.signOut()
    setProfile(null)
    setUser(null)
    setSession(null)
    setIsNewUser(false)
  }

  const refreshProfile = async () => {
    const currentUser = (await supabase.auth.getUser()).data.user
    if (currentUser) await fetchProfile(currentUser.id)
  }

  const signInWithOtp = async (phone: string) => {
    try {
      const { success, error } = await sendOtp(phone);
      return { error: error ? new Error(error) : null };
    } catch (err: any) {
      return { error: err };
    }
  }

  const verifyOtp = async (phone: string, token: string) => {
    const phoneWithCode = phone.startsWith('+')
      ? phone
      : `+91${phone.replace(/\D/g, '')}`;

    const { data, error } = await supabase.auth.verifyOtp({
      phone: phoneWithCode,
      token,
      type: 'sms',
    })
    return { data, error }
  }

  const signUp = async (phone: string, password: string, options?: any) => {
    const { data, error } = await supabase.auth.signUp({
      phone,
      password,
      options,
    })
    return { data, error }
  }

  const signInWithPassword = async (identifier: string, password: string) => {
    const isEmail = identifier.includes('@');
    if (isEmail) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: identifier,
        password,
      })
      return { data, error }
    } else {
      // Phone login: look up email first, then sign in with email+password
      const cleanPhone = identifier.replace(/\D/g, '')
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('phone', cleanPhone)
        .single()

      if (profileError || !profileData?.email) {
        return { data: null, error: new Error('No account found with this mobile number') }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: profileData.email,
        password,
      })
      return { data, error }
    }
  }

  const resetPasswordForEmail = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    })
    return { data, error }
  }

  // Check if phone/email already exists using RPC
  const checkUserExists = async (phone: string, email: string): Promise<{ exists: boolean; message: string }> => {
    try {
      const { data, error } = await supabase
        .rpc('check_user_exists', { p_phone: phone, p_email: email })

      if (error) throw error

      if (data && data.length > 0) {
        return { exists: data[0].exists, message: data[0].message }
      }
      return { exists: false, message: 'Available' }
    } catch (err) {
      // Fallback: manual check if RPC not available
      const { data: existing } = await supabase
        .from('profiles')
        .select('email, phone')
        .or(`email.eq.${email},phone.eq.${phone}`)
        .maybeSingle()

      if (existing) {
        const msg = existing.phone === phone ? 'Mobile number already registered' : 'Email already registered'
        return { exists: true, message: msg }
      }
      return { exists: false, message: 'Available' }
    }
  }

  // Send OTP via Node Backend (Fast2SMS)
  const sendOtp = async (phone: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Safely construct URL without double slashes
      const cleanBase = API_BASE_URL.replace(/\/+$/, '');
      const endpoint = `${cleanBase}/auth/send-otp`;
      console.log(`📡 Sending OTP request to: ${endpoint}`);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: phone,
          type: 'sms'
        }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Invalid response from server:", text);
        throw new Error("Server returned an invalid format. Please try again.");
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to send OTP via backend');
      }

      return { success: true };
    } catch (err: any) {
      console.error('❌ Send OTP Backend Error:', err);
      // Give a clear message if fetch itself fails (e.g. CORS, AdBlock, offline)
      if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
         return { success: false, error: 'Network error. Please disable adblockers or check your connection.' };
      }
      return { success: false, error: err.message || 'Failed to send OTP' };
    }
  }

  // Verify OTP code via Node Backend (Consolidated)
  const verifyOtpCode = async (phone: string, code: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: phone,
          otp: code
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        return { success: true, message: data.message || 'OTP verified successfully' };
      }
      
      return { success: false, message: data.error || 'Invalid OTP' };
    } catch (err: any) {
      console.warn('Backend verification failed, trying direct table fallback:', err);
    }

    // Strategy 2: Try RPC function
    try {
      const { data, error } = await supabase
        .rpc('verify_otp', { p_phone: phone, p_code: code })

      if (error) throw error

      if (data && data.length > 0) {
        return { success: data[0].success, message: data[0].message }
      }
    } catch (rpcErr) {
      console.warn('verify_otp RPC unavailable, trying direct table:', rpcErr)
    }

    // Strategy 3: Direct table check (fallback if RPC not yet deployed)
    try {
      const { data: otpRecord, error: fetchError } = await supabase
        .from('otp_verifications')
        .select('*')
        .eq('phone_number', phone)
        .eq('otp_code', code)
        .eq('verified', false)
        .gte('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (fetchError) throw fetchError

      if (otpRecord) {
        // Check attempts
        if (otpRecord.attempts >= 3) {
          return { success: false, message: 'Too many attempts. Request a new OTP.' }
        }
        // Mark as verified
        await supabase
          .from('otp_verifications')
          .update({ verified: true })
          .eq('id', otpRecord.id)
        return { success: true, message: 'OTP verified successfully' }
      }

      // Wrong OTP - increment attempts
      const { data: latest } = await supabase
        .from('otp_verifications')
        .select('id, attempts')
        .eq('phone_number', phone)
        .eq('verified', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (latest) {
        await supabase
          .from('otp_verifications')
          .update({ attempts: latest.attempts + 1 })
          .eq('id', latest.id)
      }

      return { success: false, message: 'Invalid OTP. Please try again.' }
    } catch (tableErr: any) {
      return { success: false, message: tableErr.message || 'Verification failed' }
    }
  }


  const isAdmin = profile?.role === 'admin'

  return (
    <AuthContext.Provider value={{
      session, user, profile, loading, isAdmin, isNewUser, signOut, refreshProfile,
      signInWithOtp, verifyOtp, signUp, signInWithPassword, resetPasswordForEmail,
      checkUserExists, sendOtp, verifyOtpCode
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
