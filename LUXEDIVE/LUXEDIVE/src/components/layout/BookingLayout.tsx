import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { ChevronLeft, ArrowRight, AlertCircle, X } from 'lucide-react'
import { useBooking } from '../../contexts/BookingContext'

interface BookingLayoutProps {
    children: React.ReactNode
    step: number
    title: string
    subtitle?: string
    onNext?: () => void
    nextDisabled?: boolean
    isLoading?: boolean
    blockedReasons?: string[] // Pro UX: list of multiple reasons why it's blocked
}

const STEPS = [
    { id: 1, name: 'Fleet' },
    { id: 2, name: 'Details' },
    { id: 3, name: 'Itinerary' },
    { id: 4, name: 'Service' },
    { id: 5, name: 'Verification' },
    { id: 6, name: 'Summary' },
    { id: 7, name: 'Payment' }
]

export default function BookingLayout({
    children,
    step,
    title,
    subtitle,
    onNext,
    nextDisabled,
    isLoading,
    blockedReasons = []
}: BookingLayoutProps) {
    const navigate = useNavigate()
    const { carId } = useParams()
    const { bookingState } = useBooking()
    const [showBlockedPopup, setShowBlockedPopup] = React.useState(false)

    const handleBack = () => {
        if (step === 2) navigate('/fleet')
        else if (step === 3) navigate(`/booking/${carId}`)
        else if (step === 4) navigate(`/booking/${carId}/itinerary`)
        else if (step === 5) navigate(`/booking/${carId}/chauffeur`)
        else if (step === 6) navigate(`/booking/${carId}/documents`)
        else if (step === 7) navigate(`/booking/${carId}/summary`)
    }

    const handleContinue = () => {
        console.log('--- 🚀 BookingLayout: handleContinue triggered ---');
        console.log('Step:', step, 'onNext present:', !!onNext, 'isLoading:', isLoading, 'nextDisabled:', nextDisabled);
        
        if (onNext) {
            console.log('Calling onNext handler...');
            onNext()
            return
        }

        if (step === 2) navigate(`/booking/${carId}/itinerary`)
        else if (step === 3) navigate(`/booking/${carId}/chauffeur`)
        else if (step === 4) navigate(`/booking/${carId}/documents`)
        else if (step === 5) navigate(`/booking/${carId}/summary`)
        else if (step === 6) navigate(`/booking/${carId}/payment`)
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-44 font-sans">
            {/* PROGRESS BAR */}
            <div className="fixed top-16 left-0 right-0 h-1 bg-zinc-900 z-50 print:hidden">
                <div 
                    className="h-full bg-amber-500 transition-all duration-500 ease-out" 
                    style={{ width: `${(step / STEPS.length) * 100}%` }} 
                />
            </div>

            <div className="container mx-auto px-6 max-w-7xl">
                {/* STEP INDICATOR */}
                <div className="flex items-center justify-between mb-12 overflow-x-auto pb-4 no-scrollbar print:hidden">
                    {STEPS.map((s) => (
                        <div key={s.id} className="flex items-center gap-3 flex-shrink-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-300 ${step >= s.id ? 'bg-amber-500 border-amber-500 text-black' : 'border-zinc-800 text-gray-500'}`}>
                                {s.id}
                            </div>
                            <span className={`text-[10px] uppercase tracking-widest font-black ${step >= s.id ? 'text-white' : 'text-gray-600'}`}>
                                {s.name}
                            </span>
                            {s.id < STEPS.length && <div className="w-8 h-[1px] bg-zinc-800 mx-2" />}
                        </div>
                    ))}
                </div>

                {/* HEADER */}
                <div className="mb-10 print:hidden">
                    <button 
                        onClick={handleBack}
                        className="flex items-center gap-2 text-gray-500 hover:text-amber-500 text-xs font-bold uppercase tracking-widest mb-6 transition-colors group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
                    </button>
                    <h1 className="text-4xl font-serif text-white mb-2">{title}</h1>
                    {subtitle && <p className="text-gray-400 font-light">{subtitle}</p>}
                </div>

                {/* CONTENT */}
                <div className="animate-fade-in">
                    {children}
                </div>

                {/* SMART FIX: PRO-LEVEL CENTERED MODAL POPUP */}
                {showBlockedPopup && blockedReasons.length > 0 && (
                    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                        <div 
                            className="bg-zinc-900 border border-amber-500/30 rounded-[2.5rem] p-10 shadow-[0_0_100px_rgba(0,0,0,0.8)] max-w-lg w-full relative animate-in zoom-in-95 slide-in-from-bottom-8 duration-500"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setShowBlockedPopup(false)}
                                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-3xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-8">
                                    <AlertCircle className="text-amber-500 w-10 h-10" />
                                </div>
                                
                                <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Verification Required</span>
                                <h3 className="text-3xl font-serif text-white mb-6">Action Required</h3>
                                
                                <div className="space-y-4 w-full text-left bg-black/40 p-6 rounded-2xl border border-white/5 mb-8">
                                    {blockedReasons.map((reason, idx) => (
                                        <div key={`block-${idx}`} className="flex items-start gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                                            <p className="text-gray-300 text-sm leading-relaxed">{reason}</p>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setShowBlockedPopup(false)}
                                    className="w-full h-14 bg-white text-black rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-luxe-gold hover:text-white transition-all shadow-xl shadow-white/5"
                                >
                                    Review Details
                                </button>
                            </div>

                            <div className="mt-8 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 animate-shrink" />
                            </div>
                        </div>
                    </div>
                )}

                {/* FOOTER NAV (Tesla-style Fixed Bottom) */}
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-black/95 backdrop-blur-xl border-t border-white/10 z-[9999] pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] print:hidden">
                    <div className="container mx-auto max-w-7xl flex items-center justify-between">
                        <div className="hidden md:block">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Currently Viewing</p>
                            <p className="text-sm font-serif text-white">{bookingState.carDetails?.brand} {bookingState.carDetails?.model}</p>
                        </div>

                        <div className="flex items-center gap-6 w-full md:w-auto">
                            <div className="flex-1 md:flex-none text-right mr-6">
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Estimated Total</p>
                                <p className="text-xl font-serif text-amber-500">₹{Math.round(bookingState.totalPrice).toLocaleString()}</p>
                            </div>
                            {/* SMART FIX: Intercept disabled clicks to show centered modal */}
                            <div
                                onClick={() => {
                                    if ((nextDisabled || isLoading) && blockedReasons.length > 0) {
                                        setShowBlockedPopup(true)
                                        setTimeout(() => setShowBlockedPopup(false), 5000)
                                    }
                                }}
                            >
                                <button
                                    onClick={handleContinue}
                                    disabled={nextDisabled || isLoading}
                                    title={nextDisabled && blockedReasons.length > 0 ? `Required: ${blockedReasons.join(', ')}` : ''}
                                    className={`h-14 px-10 rounded-xl font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-3 transition-all ${nextDisabled || isLoading ? 'bg-zinc-800 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-amber-400 hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/10'}`}
                                >
                                    {isLoading ? 'Processing...' : step === 6 ? 'Confirm & Pay' : 'Continue'} 
                                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
