import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabaseClient'
import { toast } from 'sonner'
import { Mail, Lock as LockIcon, User, Phone, ArrowRight, Loader2, Eye, EyeOff, CheckCircle, ShieldCheck } from 'lucide-react'
import type { SignUpFormData } from '../../types/auth.types'

export default function SignUp() {
    const { checkUserExists, sendOtp, verifyOtpCode } = useAuth()
    const navigate = useNavigate()

    const [step, setStep] = useState<'details' | 'otp'>('details')
    const [formData, setFormData] = useState<SignUpFormData>({
        full_name: '',
        phone: '',
        email: '',
        password: '',
        confirm_password: ''
    })

    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [resendTimer, setResendTimer] = useState(0)

    const otpRefs = useRef<(HTMLInputElement | null)[]>([])

    // Resend timer countdown
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [resendTimer])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name === 'phone') {
            const digits = value.replace(/\D/g, '').slice(0, 10)
            setFormData(prev => ({ ...prev, phone: digits }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const validatePassword = (pwd: string): string | null => {
        if (pwd.length < 8) return 'Password must be at least 8 characters'
        if (!/[A-Z]/.test(pwd)) return 'Must contain at least one uppercase letter'
        if (!/[a-z]/.test(pwd)) return 'Must contain at least one lowercase letter'
        if (!/[0-9]/.test(pwd)) return 'Must contain at least one number'
        if (!/[!@#$%^&*]/.test(pwd)) return 'Must contain a special character (!@#$%^&*)'
        return null
    }

    const getPasswordStrength = (pwd: string): { score: number; label: string; color: string } => {
        let score = 0
        if (pwd.length >= 8) score++
        if (/[A-Z]/.test(pwd)) score++
        if (/[a-z]/.test(pwd)) score++
        if (/[0-9]/.test(pwd)) score++
        if (/[!@#$%^&*]/.test(pwd)) score++

        if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' }
        if (score === 3) return { score, label: 'Fair', color: 'bg-yellow-500' }
        if (score === 4) return { score, label: 'Good', color: 'bg-blue-500' }
        return { score, label: 'Strong', color: 'bg-green-500' }
    }

    const handleSubmitDetails = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validation
        if (!formData.full_name.trim()) {
            toast.error('Please enter your full name')
            return
        }

        const phoneRegex = /^[6-9]\d{9}$/
        if (!phoneRegex.test(formData.phone)) {
            toast.error('Enter a valid 10-digit Indian mobile number')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            toast.error('Enter a valid email address')
            return
        }

        const pwdError = validatePassword(formData.password)
        if (pwdError) {
            toast.error(pwdError)
            return
        }

        if (formData.password !== formData.confirm_password) {
            toast.error('Passwords do not match')
            return
        }

        setLoading(true)

        try {
            // Check for duplicates
            const { exists, message } = await checkUserExists(formData.phone, formData.email)
            if (exists) {
                toast.error(message)
                return
            }

            // Send OTP
            const result = await sendOtp(formData.phone)
            if (!result.success) {
                throw new Error(result.error || 'Failed to send OTP')
            }

            setStep('otp')
            setResendTimer(60)
            setOtp(['', '', '', '', '', ''])
            toast.success('OTP sent to your mobile!')
            setTimeout(() => otpRefs.current[0]?.focus(), 150)
        } catch (error: any) {
            toast.error(error.message || 'Sign up failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleOtpChange = (index: number, value: string) => {
        if (value && !/^\d$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Auto-advance
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus()
        }
    }

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus()
        }
    }

    const handleOtpPaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
        if (pasted.length > 0) {
            const newOtp = [...otp]
            pasted.split('').forEach((char, i) => {
                if (i < 6) newOtp[i] = char
            })
            setOtp(newOtp)
            const nextIndex = Math.min(pasted.length, 5)
            otpRefs.current[nextIndex]?.focus()
        }
    }

    const handleVerifyOtp = async () => {
        const otpCode = otp.join('')

        if (otpCode.length !== 6) {
            toast.error('Enter the complete 6-digit code')
            return
        }

        setLoading(true)

        try {
            // Verify OTP
            const { success, message } = await verifyOtpCode(formData.phone, otpCode)

            if (!success) {
                toast.error(message || 'Invalid OTP')
                return
            }

            // Create Supabase auth account
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.full_name,
                        phone: formData.phone,
                        phone_verified: true
                    }
                }
            })

            if (data?.user?.email) {
                // Auto-confirm the user since we verified them via Phone OTP already
                await supabase.rpc('confirm_user_by_email', { user_email: data.user.email })
            }

            if (error) {
                if (error.message.includes('already registered')) {
                    // Try to sign them in instead
                    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                        email: formData.email,
                        password: formData.password
                    })
                    if (signInError) throw signInError
                    if (signInData.user) {
                        await supabase.from('profiles').update({
                            phone: formData.phone,
                            phone_verified: true
                        }).eq('id', signInData.user.id)
                    }
                    toast.success('Welcome back to LUXEDIVE!')
                    navigate('/')
                    return
                }
                throw error
            }

            if (!data.user) throw new Error('Account creation failed')

            // Explicit profile upsert to ensure all data is persisted
            await supabase.from('profiles').upsert({
                id: data.user.id,
                email: formData.email,
                full_name: formData.full_name,
                phone: formData.phone,
                phone_verified: true,
                wallet_balance: 0,
                membership_tier: 'silver'
            }, { onConflict: 'id' })

            toast.success('Account created! Welcome to LUXEDIVE!')
            navigate('/')

        } catch (error: any) {
            toast.error(error.message || 'Verification failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleResendOtp = async () => {
        if (resendTimer > 0) return

        setLoading(true)
        try {
            const result = await sendOtp(formData.phone)
            if (!result.success) throw new Error(result.error)

            setOtp(['', '', '', '', '', ''])
            toast.success('New OTP sent!')
            setTimeout(() => otpRefs.current[0]?.focus(), 100)
            setResendTimer(60)
        } catch (error: any) {
            toast.error('Failed to resend OTP')
        } finally {
            setLoading(false)
        }
    }

    const passwordStrength = formData.password ? getPasswordStrength(formData.password) : null

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-luxe-black">
            {/* LEFT - Hero */}
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
                    <h1 className="text-5xl font-serif mb-4">Join the Elite.</h1>
                    <p className="text-xl text-gray-300">
                        Create your account to access Ahmedabad's finest luxury fleet.
                    </p>
                </div>
            </div>

            {/* RIGHT - Form */}
            <div className="flex flex-col justify-center items-center px-8 py-12 relative">
                <div className="max-w-md w-full">
                    {/* Mobile logo */}
                    <div className="lg:hidden mb-8 text-center">
                        <span className="text-luxe-gold text-xl font-serif tracking-widest">LUXEDIVE</span>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 'details' ? (
                            <motion.div
                                key="details"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="mb-8">
                                    <h2 className="text-3xl font-serif text-white mb-2">Create Account</h2>
                                    <p className="text-luxe-gray">Join India's premier luxury car rental</p>
                                </div>

                                <form onSubmit={handleSubmitDetails} className="space-y-5">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-luxe-gray mb-2">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxe-gray" />
                                            <input
                                                type="text"
                                                name="full_name"
                                                value={formData.full_name}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg h-14 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-luxe-gold transition-colors"
                                                placeholder="Deepak Rajput"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-luxe-gray mb-2">
                                            Mobile Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxe-gray" />
                                            <div className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm border-r border-white/10 pr-3 select-none">
                                                +91
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg h-14 pl-24 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-luxe-gold transition-colors"
                                                placeholder="8824342103"
                                                maxLength={10}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-luxe-gray mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxe-gray" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg h-14 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-luxe-gold transition-colors"
                                                placeholder="deepak@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-luxe-gray mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxe-gray" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg h-14 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-luxe-gold transition-colors"
                                                placeholder="Min 8 chars, mixed case + number"
                                                minLength={8}
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
                                        {/* Password strength indicator */}
                                        {formData.password && passwordStrength && (
                                            <div className="mt-2">
                                                <div className="flex gap-1">
                                                    {[1, 2, 3, 4, 5].map(i => (
                                                        <div
                                                            key={i}
                                                            className={`h-1 flex-1 rounded-full transition-all ${i <= passwordStrength.score ? passwordStrength.color : 'bg-white/10'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-xs text-luxe-gray mt-1">
                                                    Strength: <span className={`font-semibold ${passwordStrength.score >= 4 ? 'text-green-400' : passwordStrength.score === 3 ? 'text-blue-400' : 'text-red-400'}`}>{passwordStrength.label}</span>
                                                    <span className="ml-2 text-gray-600">· Uppercase, lowercase, number, special char</span>
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-luxe-gray mb-2">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxe-gray" />
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="confirm_password"
                                                value={formData.confirm_password}
                                                onChange={handleChange}
                                                className={`w-full bg-white/5 border rounded-lg h-14 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none transition-colors ${formData.confirm_password && formData.password !== formData.confirm_password ? 'border-red-500/60' : 'border-white/10 focus:border-luxe-gold'}`}
                                                placeholder="Re-enter password"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-luxe-gray hover:text-white transition-colors"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-14 bg-luxe-gold hover:bg-luxe-gold/90 text-black font-bold uppercase tracking-wider text-sm rounded-lg disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Sending OTP...
                                            </>
                                        ) : (
                                            <>
                                                Continue <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="mt-6 text-center pt-4 border-t border-white/5">
                                    <span className="text-sm text-gray-400">Already have an account? </span>
                                    <Link to="/login" className="text-sm text-luxe-gold hover:text-white transition-colors underline font-medium">
                                        Sign In
                                    </Link>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="otp"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="mb-8">
                                    <button
                                        onClick={() => setStep('details')}
                                        className="text-luxe-gold text-sm font-bold mb-6 uppercase tracking-wider hover:text-white transition-colors block"
                                    >
                                        ← Edit Details
                                    </button>

                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-luxe-gold/10 flex items-center justify-center">
                                            <ShieldCheck className="w-6 h-6 text-luxe-gold" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-serif text-white">Verify Mobile</h2>
                                            <p className="text-luxe-gray text-sm">OTP sent to <span className="text-white font-semibold">+91 {formData.phone}</span></p>
                                        </div>
                                    </div>
                                </div>

                                {/* OTP Inputs */}
                                <div className="flex gap-3 mb-6 justify-center">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => { otpRefs.current[index] = el }}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                            onPaste={index === 0 ? handleOtpPaste : undefined}
                                            className={`w-12 h-14 bg-white/5 border-2 rounded-lg text-center text-2xl font-bold text-white focus:outline-none transition-all ${digit ? 'border-luxe-gold' : 'border-white/10 focus:border-luxe-gold'}`}
                                        />
                                    ))}
                                </div>

                                {/* Resend */}
                                <div className="text-center mb-6">
                                    {resendTimer > 0 ? (
                                        <p className="text-luxe-gray text-sm">
                                            Resend in <span className="text-luxe-gold font-bold font-mono">{resendTimer}s</span>
                                        </p>
                                    ) : (
                                        <button
                                            onClick={handleResendOtp}
                                            disabled={loading}
                                            className="text-luxe-gold text-sm font-bold uppercase tracking-wider hover:text-white transition-colors disabled:opacity-50"
                                        >
                                            Resend OTP
                                        </button>
                                    )}
                                </div>

                                <button
                                    onClick={handleVerifyOtp}
                                    disabled={loading || otp.join('').length !== 6}
                                    className="w-full h-14 bg-luxe-gold hover:bg-luxe-gold/90 text-black font-bold uppercase tracking-wider text-sm rounded-lg disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-5 h-5" />
                                            Verify &amp; Create Account
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-luxe-gray text-center mt-6">
                                    OTP expires in 5 minutes. Check your SMS inbox.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <p className="absolute bottom-6 left-0 right-0 text-center text-[10px] text-luxe-gray px-4">
                    Protected by enterprise-grade encryption. By continuing, you agree to our{' '}
                    <Link to="/legal/terms" className="text-white cursor-pointer hover:text-luxe-gold transition-colors">Terms</Link>.
                </p>
            </div>
        </div>
    )
}
