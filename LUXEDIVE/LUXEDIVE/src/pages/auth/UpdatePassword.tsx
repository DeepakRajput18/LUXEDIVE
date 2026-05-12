import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { ArrowRight, Lock as LockIcon, CheckCircle, Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'

export default function UpdatePassword() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [sessionReady, setSessionReady] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        // Supabase injects the session automatically via URL hash after clicking the reset link.
        // We listen for PASSWORD_RECOVERY event to confirm we're in password reset mode.
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'PASSWORD_RECOVERY') {
                setSessionReady(true)
            }
        })

        // Also check if there's already a session (user came from reset link)
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) setSessionReady(true)
        })

        return () => subscription.unsubscribe()
    }, [])

    const getStrength = (pwd: string) => {
        if (pwd.length === 0) return 0
        let score = 0
        if (pwd.length >= 8) score++
        if (/[A-Z]/.test(pwd)) score++
        if (/[0-9]/.test(pwd)) score++
        if (/[^A-Za-z0-9]/.test(pwd)) score++
        return score
    }

    const strength = getStrength(password)
    const strengthLabel = ['', 'Weak', 'Fair', 'Strong', 'Very Strong'][strength]
    const strengthColor = ['', '#ef4444', '#f59e0b', '#10b981', '#059669'][strength]

    const handleSubmit = async () => {
        if (!password || password.length < 8) {
            toast.error('Password must be at least 8 characters')
            return
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        setLoading(true)
        try {
            const { error } = await supabase.auth.updateUser({ password })
            if (error) throw error

            setDone(true)
            toast.success('Password updated successfully!')
            setTimeout(() => navigate('/login'), 2500)
        } catch (err: any) {
            toast.error(err.message || 'Failed to update password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-luxe-black">
            {/* LEFT - HERO */}
            <div className="relative hidden lg:block h-screen overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1000"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    alt="Luxury Car"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-20 left-12 text-white z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-white/20 backdrop-blur rounded-full p-1">
                            <ShieldCheck className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium tracking-wide">Secure Password Update</span>
                    </div>
                    <h1 className="text-5xl font-serif mb-4">New Password.</h1>
                    <p className="text-xl text-luxe-white max-w-sm">
                        Set a strong password to protect your premium account.
                    </p>
                </div>
            </div>

            {/* RIGHT - FORM */}
            <div className="flex flex-col justify-center items-center px-8 relative">
                <div className="max-w-md w-full">
                    <div className="mb-12 text-center lg:text-left">
                        <h2 className="text-3xl font-serif text-white mb-2">Update Password</h2>
                        <p className="text-luxe-gray">Choose a strong new password for your account.</p>
                    </div>

                    {done ? (
                        <div className="bg-luxe-dark border border-white/10 rounded-xl p-8 text-center animate-in zoom-in-95 duration-500">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Password Updated!</h3>
                            <p className="text-luxe-gray text-sm">
                                Your password has been changed successfully. Redirecting to login...
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            {/* New Password */}
                            <div>
                                <label className="block text-xs uppercase text-luxe-gray mb-2">New Password</label>
                                <div className="relative">
                                    <LockIcon className="absolute top-3.5 left-4 w-5 h-5 text-luxe-gray" />
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Minimum 8 characters"
                                        className="pl-12 pr-12 h-12 bg-luxe-dark border-white/10 text-white focus:border-luxe-gold transition-colors"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute top-3.5 right-4 text-luxe-gray hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {/* Strength meter */}
                                {password.length > 0 && (
                                    <div className="mt-2">
                                        <div className="flex gap-1 mb-1">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div
                                                    key={i}
                                                    className="h-1 flex-1 rounded-full transition-all duration-300"
                                                    style={{ backgroundColor: i <= strength ? strengthColor : '#374151' }}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs" style={{ color: strengthColor }}>{strengthLabel}</p>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-xs uppercase text-luxe-gray mb-2">Confirm Password</label>
                                <div className="relative">
                                    <LockIcon className="absolute top-3.5 left-4 w-5 h-5 text-luxe-gray" />
                                    <Input
                                        type={showConfirm ? 'text' : 'password'}
                                        placeholder="Re-enter new password"
                                        className="pl-12 pr-12 h-12 bg-luxe-dark border-white/10 text-white focus:border-luxe-gold transition-colors"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute top-3.5 right-4 text-luxe-gray hover:text-white transition-colors"
                                    >
                                        {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                className="w-full h-12 bg-white text-black hover:bg-gray-200 font-bold tracking-wide"
                                onClick={handleSubmit}
                                disabled={loading || !sessionReady}
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                ) : (
                                    <>Update Password <ArrowRight className="w-4 h-4 ml-2" /></>
                                )}
                            </Button>

                            {!sessionReady && (
                                <p className="text-center text-xs text-luxe-gray">
                                    ⚠️ Invalid or expired reset link. Please{' '}
                                    <a href="/forgot-password" className="text-luxe-gold underline">request a new one</a>.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
