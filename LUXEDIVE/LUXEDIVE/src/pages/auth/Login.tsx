import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabaseClient'
import { toast } from 'sonner'
import { Mail, Lock as LockIcon, Loader2, Eye, EyeOff, CheckCircle, Phone } from 'lucide-react'
import { logLogin } from '../../services/activityLogger'

export default function Login() {
    const navigate = useNavigate()

    const [identifier, setIdentifier] = useState('') // email or phone
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const isPhoneInput = /^\d/.test(identifier) && !identifier.includes('@')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!identifier.trim() || !password) {
            toast.error('Please fill all fields')
            return
        }

        setLoading(true)

        try {
            let loginEmail = identifier.trim()

            // Determine if phone or email
            const cleanIdentifier = identifier.replace(/\s/g, '')
            const isPhone = /^[6-9]\d{9}$/.test(cleanIdentifier) || /^\d{10}$/.test(cleanIdentifier)

            if (isPhone) {
                // Lookup email from phone using secure RPC to bypass RLS
                const { data: rpcData, error: rpcError } = await supabase
                    .rpc('get_email_by_phone', { p_phone: cleanIdentifier })
                
                if (rpcError || !rpcData || rpcData.length === 0) {
                    // Try with +91 prefix just in case legacy data
                    const { data: rpcData2, error: rpcError2 } = await supabase
                        .rpc('get_email_by_phone', { p_phone: '+91' + cleanIdentifier })
                    
                    if (rpcError2 || !rpcData2 || rpcData2.length === 0) {
                        toast.error('No account found with this mobile number')
                        return
                    }
                    loginEmail = rpcData2[0].email
                } else {
                    loginEmail = rpcData[0].email
                }
            }

            // Sign in with email + password
            const { data, error } = await supabase.auth.signInWithPassword({
                email: loginEmail,
                password
            })

            if (error) {
                if (error.message.includes('Invalid login credentials')) {
                    toast.error('Incorrect email/phone or password')
                } else if (error.message.includes('Email not confirmed')) {
                    // Smart Recovery: If phone was verified but email was unconfirmed in Supabase
                    console.log('🔄 Account unconfirmed in Supabase. Attempting auto-recovery...');
                    const { data: confirmed } = await supabase.rpc('confirm_user_by_email', { user_email: loginEmail });
                    
                    if (confirmed) {
                        toast.loading('Activating account and signing in...');
                        // Retry login once
                        const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
                            email: loginEmail,
                            password
                        });
                        
                        if (!retryError && retryData.user) {
                            // Proceed as normal
                            const { data: profile } = await supabase
                                .from('profiles')
                                .select('full_name, role')
                                .eq('id', retryData.user.id)
                                .single()

                            const firstName = profile?.full_name?.split(' ')[0] || 'there'
                            toast.success(`Account activated! Welcome back, ${firstName}! 🚗`)
                            const sessionId = await logLogin(retryData.user.id, profile?.full_name)
                            if (sessionId) sessionStorage.setItem('luxedive_session_id', sessionId)
                            
                            if (profile?.role === 'admin') navigate('/admin')
                            else navigate('/')
                            return;
                        }
                    }
                    toast.error('Your account requires activation. Please contact support.')
                } else {
                    toast.error(error.message)
                }
                return
            }

            if (!data.user) {
                toast.error('Login failed. Please try again.')
                return
            }

            // Fetch profile for personalized welcome + role-based redirect
            const { data: profile } = await supabase
                .from('profiles')
                .select('full_name, role')
                .eq('id', data.user.id)
                .single()

            const firstName = profile?.full_name?.split(' ')[0] || 'there'
            toast.success(`Welcome back, ${firstName}! 🚗`)

            // Log login action + create session record
            const sessionId = await logLogin(data.user.id, profile?.full_name)
            if (sessionId) sessionStorage.setItem('luxedive_session_id', sessionId)

            // Role-based redirect — admins go to admin panel, users go to HOME per new strict rules
            if (profile?.role === 'admin') {
                navigate('/admin')
            } else {
                navigate('/')
            }

        } catch (error: any) {
            console.error('Login error:', error)
            toast.error('Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-luxe-black">
            {/* LEFT - Hero Image */}
            <div className="relative hidden lg:block h-screen overflow-hidden">
                <img
                    src="/login-hero.jpg"
                    alt="Luxury Car"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

                <div className="absolute top-10 left-10 z-10">
                    {/* Logo removed to prevent overlap with main navbar */}
                </div>

                <div className="absolute bottom-16 left-12 text-white z-10 max-w-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-luxe-gold/20 backdrop-blur rounded-full p-1">
                            <CheckCircle className="w-4 h-4 text-luxe-gold" />
                        </div>
                        <span className="text-sm font-medium tracking-wide">Premium Verified Rentals</span>
                    </div>
                    <h1 className="text-5xl font-serif mb-4">Experience the Drive.</h1>
                    <p className="text-xl text-gray-300">
                        Ahmedabad's finest luxury fleet at your fingertips.
                    </p>
                </div>
            </div>

            {/* RIGHT - Form */}
            <div className="flex flex-col justify-center items-center px-8 relative">
                <div className="max-w-md w-full">
                    {/* Mobile logo */}
                    <div className="lg:hidden mb-8 text-center">
                        <span className="text-luxe-gold text-xl font-serif tracking-widest">LUXEDIVE</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="mb-10">
                            <h2 className="text-3xl font-serif text-white mb-2">Welcome Back</h2>
                            <p className="text-luxe-gray">Sign in to access your premium dashboard</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Email or Phone */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-luxe-gray mb-2">
                                    Email or Mobile Number
                                </label>
                                <div className="relative">
                                    {isPhoneInput ? (
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxe-gray" />
                                    ) : (
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxe-gray" />
                                    )}
                                    <input
                                        type="text"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg h-14 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-luxe-gold transition-colors"
                                        placeholder="Email or 10-digit phone"
                                        autoComplete="username"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-gray-600 mt-1">Enter your registered email or mobile number</p>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-luxe-gray">
                                        Password
                                    </label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-xs text-luxe-gold hover:text-white transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxe-gray" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg h-14 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-luxe-gold transition-colors"
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-luxe-gray hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 bg-white hover:bg-gray-200 text-black font-bold uppercase tracking-wider text-sm rounded-lg disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In →'
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center pt-4 border-t border-white/5">
                            <span className="text-sm text-gray-400">Don't have an account? </span>
                            <Link to="/signup" className="text-sm text-luxe-gold hover:text-white transition-colors underline font-medium">
                                Sign Up
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <p className="absolute bottom-6 left-0 right-0 text-center text-[10px] text-luxe-gray px-4">
                    Protected by enterprise-grade encryption. By continuing, you agree to our{' '}
                    <Link to="/legal/terms" className="text-white cursor-pointer hover:text-luxe-gold transition-colors">Terms</Link>.
                </p>
            </div>
        </div>
    )
}
