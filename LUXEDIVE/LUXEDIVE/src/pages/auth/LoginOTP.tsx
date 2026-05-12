import { useState, useEffect } from 'react'
import { Button } from '../../components/ui/Button'
import { Mail, ArrowRight, Check } from 'lucide-react'

// Mock verification flow
export default function LoginOTP() {
    const [step, setStep] = useState<'request' | 'verify'>('request')
    const [timer, setTimer] = useState(24)

    useEffect(() => {
        if (step === 'verify' && timer > 0) {
            const interval = setInterval(() => setTimer(t => t - 1), 1000)
            return () => clearInterval(interval)
        }
    }, [step, timer])

    return (
        <div className="min-h-screen bg-black flex flex-col md:flex-row overflow-hidden">
            {/* LEFT SPLIT - HERO */}
            <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1552519507-da8b1227ad4a?q=80&w=1600"
                    className="w-full h-full object-cover"
                    alt="Luxury Dashboard"
                />
                <div className="absolute bottom-12 left-12 z-20 max-w-md hidden md:block">
                    <span className="bg-luxe-gold/90 text-black text-[10px] font-bold px-3 py-1 rounded mb-4 inline-block uppercase tracking-widest">
                        ✓ Premium Verified Rentals
                    </span>
                    <h1 className="text-5xl font-serif text-white mb-2 leading-tight">Experience <br />the Drive.</h1>
                    <p className="text-white/80 font-light text-lg">Ahmedabad's Finest Luxury Fleet at your fingertips.</p>
                </div>
            </div>

            {/* RIGHT SPLIT - FORM */}
            <div className="w-full md:w-1/2 bg-[#0A0A0A] flex flex-col justify-center items-center p-8 md:p-16 relative">
                <div className="w-full max-w-md">
                    <div className="mb-10 text-center md:text-left">
                        <p className="text-luxe-gold text-xs leading-none mb-4 tracking-[0.3em] uppercase font-bold">LUXEDIVE</p>
                        <h2 className="text-3xl font-serif text-white mb-2">Welcome Back</h2>
                        <p className="text-gray-500 text-sm">Enter your details to access your fleet dashboard.</p>
                    </div>

                    <div className="space-y-6">
                        {step === 'request' ? (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-white transition-colors" />
                                    <input
                                        type="text"
                                        defaultValue="+91 98765 43210"
                                        className="w-full bg-[#121212] border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-colors h-14"
                                        placeholder="Phone Number or Email"
                                    />
                                </div>
                                <Button onClick={() => setStep('verify')} className="w-full mt-6 bg-white text-black hover:bg-gray-200 h-14 uppercase tracking-widest text-xs font-bold transition-transform active:scale-95">
                                    Send OTP <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-px bg-white/10 flex-1" />
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Verification</span>
                                    <div className="h-px bg-white/10 flex-1" />
                                </div>

                                <div className="flex justify-between gap-2 mb-6">
                                    {['5', '2', '9', '', '', ''].map((digit, i) => (
                                        <div key={i} className={`w-12 h-14 rounded border flex items-center justify-center text-xl font-mono ${digit ? 'border-luxe-gold text-luxe-gold bg-luxe-gold/5' : 'border-white/10 text-white bg-[#121212]'}`}>
                                            {digit || '_'}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center text-xs mb-8">
                                    <button onClick={() => setStep('request')} className="text-gray-400 hover:text-white underline">Edit Number</button>
                                    <span className="text-gray-500 font-mono">Resend code in 00:{timer < 10 ? `0${timer}` : timer}</span>
                                </div>

                                <Button className="w-full bg-[#1A1A1A] text-white hover:bg-black border border-white/10 h-14 uppercase tracking-widest text-xs font-bold">
                                    Verify <Check className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        )}

                        <p className="text-[10px] text-center text-gray-600 mt-8 leading-relaxed">
                            By continuing, you agree to our <span className="underline cursor-pointer hover:text-gray-400">Terms of Service</span> and <span className="underline cursor-pointer hover:text-gray-400">Privacy Policy</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
