import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { ArrowRight, CheckCircle, Mail, ArrowLeft, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const { resetPasswordForEmail } = useAuth()

    const handleSubmit = async () => {
        if (!email || !email.includes('@')) {
            toast.error('Please enter a valid email address')
            return
        }

        setLoading(true)
        try {
            const { error } = await resetPasswordForEmail(email)
            if (error) throw error

            setSubmitted(true)
            toast.success('Password reset link sent to your email')
        } catch (err: any) {
            console.error('Reset error:', err)
            toast.error(err.message || 'Failed to send reset link')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-luxe-black">
            {/* LEFT - HERO */}
            <div className="relative hidden lg:block h-screen overflow-hidden">
                <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    alt="Luxury Car"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-20 left-12 text-white z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-white/20 backdrop-blur rounded-full p-1">
                            <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium tracking-wide">Secure Account Recovery</span>
                    </div>
                    <h1 className="text-5xl font-serif mb-4">Regain Access.</h1>
                    <p className="text-xl text-luxe-white max-w-sm">Restore access to your premium garage and fleet management.</p>
                </div>
            </div>

            {/* RIGHT - FORM */}
            <div className="flex flex-col justify-center items-center px-8 relative">
                <div className="max-w-md w-full">
                    <div className="mb-12 text-center lg:text-left">
                        <Link to="/login" className="inline-flex items-center text-xs text-luxe-gold uppercase tracking-widest mb-6 hover:text-white transition-colors">
                            <ArrowLeft className="w-3 h-3 mr-2" /> Back to Login
                        </Link>
                        <h2 className="text-3xl font-serif text-white mb-2">Forgot Password?</h2>
                        <p className="text-luxe-gray">Enter your email to receive a secure reset link.</p>
                    </div>

                    {!submitted ? (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <div>
                                <label className="block text-xs uppercase text-luxe-gray mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute top-3.5 left-4 w-5 h-5 text-luxe-gray" />
                                    <Input
                                        type="email"
                                        placeholder="name@example.com"
                                        className="pl-12 h-12 bg-luxe-dark border-white/10 text-white focus:border-luxe-gold transition-colors"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <Button
                                className="w-full h-12 bg-white text-black hover:bg-gray-200 font-bold tracking-wide"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (
                                    <>Send Reset Link <ArrowRight className="w-4 h-4 ml-2" /></>
                                )}
                            </Button>
                        </div>
                    ) : (
                        <div className="bg-luxe-dark border border-white/10 rounded-xl p-8 text-center animate-in zoom-in-95 duration-500">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Check your email</h3>
                            <p className="text-luxe-gray text-sm mb-6">
                                We have sent a password reset link to <span className="text-white">{email}</span>. Please check your inbox and spam folder.
                            </p>
                            <Button
                                variant="outline"
                                className="w-full border-white/10 text-white hover:bg-white hover:text-black"
                                onClick={() => setSubmitted(false)}
                            >
                                Try another email
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
