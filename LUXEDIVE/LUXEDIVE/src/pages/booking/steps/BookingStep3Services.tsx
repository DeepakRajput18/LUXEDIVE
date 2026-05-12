import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../../../contexts/BookingContext'
import { Card, CardContent } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { ShieldCheck, UserCheck, ArrowRight, Minus, Plus, Check } from 'lucide-react'
import { supabase } from '../../../lib/supabaseClient'
import { useAuth } from '../../../contexts/AuthContext'
import { toast } from 'sonner'
import { normalizeDailyRate } from '../../../lib/pricingUtils'

export default function BookingStep3Services() {
    const navigate = useNavigate()
    const { bookingState, updateBooking } = useBooking()
    const { user } = useAuth()
    const [hasChauffeurBenefit, setHasChauffeurBenefit] = useState(false)

    useEffect(() => {
        if (user) checkBenefit()
        updateBooking({
            chauffeurRequired: true,
            insurance: 'zero_dep'
        })
    }, [user])

    const checkBenefit = async () => {
        const { data, error } = await supabase
            .from('membership_benefits')
            .select('*')
            .eq('user_id', user?.id)
            .eq('benefit_key', 'chauffeur_service')
            .gte('remaining_uses', 1)
            .maybeSingle()

        if (data) setHasChauffeurBenefit(true)
    }

    const calculateTotal = () => {
        if (!bookingState.carDetails) return 0

        const dailyRate = normalizeDailyRate(bookingState.carDetails)
        const days = bookingState.duration || 1

        return dailyRate * days
    }

    const totalAmount = calculateTotal()

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-32">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header & Progress */}
                <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
                    <div>
                        <span className="text-amber-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-2 block">Step 03 of 05</span>
                        <h1 className="text-4xl font-serif text-white">Elevate Your Journey</h1>
                        <p className="text-gray-400 font-light mt-2">Premium services included with your booking at no additional cost.</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-500 text-xs uppercase tracking-widest mb-2 font-bold">Progress</p>
                        <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full w-[60%]" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

                    <Card className="relative overflow-hidden group bg-zinc-900 border border-amber-500/30 hover:border-amber-500 transition-colors">
                        <div className="h-64 relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1553440291-f9b93666b379?q=80&w=800" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Chauffeur" />
                            <div className="absolute top-4 left-4">
                                <span className="bg-amber-500 text-black text-[10px] uppercase font-bold px-3 py-1.5 rounded tracking-widest shadow-lg">Included • Free</span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent p-6 pt-12">
                                <h3 className="text-2xl font-serif text-white">Professional Chauffeur</h3>
                                <p className="text-xl text-amber-500 mt-1 font-serif">
                                    <span className="line-through text-gray-500 text-base mr-2">₹2,000/day</span>
                                    <span>FREE</span>
                                </p>
                            </div>
                        </div>

                        <CardContent className="p-8">
                            <ul className="space-y-4 mb-8">
                                {['10+ Years Experience', 'Multi-lingual (English, Hindi, German)', 'Uniformed • Premium Attire'].map(f => (
                                    <li key={f} className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-amber-500/50">
                                            <Check className="w-3 h-3 text-amber-500" />
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex items-center justify-center pt-6 border-t border-white/5">
                                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-6 py-3">
                                    <p className="text-sm font-bold text-amber-500 text-center flex items-center gap-2">
                                        <Check className="w-4 h-4" />
                                        Included with your booking
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden group bg-zinc-900 border border-amber-500/30 hover:border-amber-500 transition-colors shadow-[0_0_30px_rgba(251,191,36,0.05)]">
                        <div className="h-64 relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt="Interior" />
                            <div className="absolute top-4 left-4">
                                <span className="bg-amber-500 text-black text-[10px] uppercase font-bold px-3 py-1.5 rounded tracking-widest shadow-lg">Included • Free</span>
                            </div>
                            <div className="absolute top-4 right-4">
                                <div className="w-6 h-6 rounded border flex items-center justify-center bg-amber-500 border-amber-500">
                                    <Check className="w-4 h-4 text-black" />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent p-6 pt-12">
                                <h3 className="text-2xl font-serif text-white">Premium Protection</h3>
                                <p className="text-xl text-amber-500 mt-1 font-serif">
                                    <span className="line-through text-gray-500 text-base mr-2">₹4,500</span>
                                    <span>FREE</span>
                                </p>
                            </div>
                        </div>

                        <CardContent className="p-8">
                            <ul className="space-y-4 mb-8">
                                {['Zero-Deductible (Full Coverage)', '24/7 Priority Roadside Assistance', 'Theft & Personal Property Cover'].map(f => (
                                    <li key={f} className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-amber-500/50">
                                            <ShieldCheck className="w-3 h-3 text-amber-500" />
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex items-center justify-center pt-6 border-t border-white/5">
                                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-6 py-3">
                                    <p className="text-sm font-bold text-amber-500 text-center flex items-center gap-2">
                                        <Check className="w-4 h-4" />
                                        Included with your booking
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>

                <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 py-6 px-8 z-50">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Total Amount</p>
                            <p className="text-xl font-serif text-amber-500">₹{totalAmount.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <Button variant="outline" onClick={() => navigate(-1)} className="border-white/10 text-gray-400 hover:text-white hover:bg-white/5 uppercase tracking-widest text-xs font-bold px-8 bg-transparent">
                                Back
                            </Button>
                            <Button onClick={() => navigate('/booking/elite')} className="bg-white text-black hover:bg-amber-400 hover:text-black h-12 px-10 border border-transparent uppercase tracking-[0.2em] text-xs font-bold shadow-lg">
                                Continue to Extras <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
