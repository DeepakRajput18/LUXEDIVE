import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Check, ArrowRight, Home } from 'lucide-react'

// Page 68: Wedding - Success (Previously WeddingSuccess)
export default function WeddingReservationSuccess() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center relative overflow-hidden">

            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 text-center max-w-lg px-6">

                <div className="w-24 h-24 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-cyan-500/50 animate-in zoom-in duration-500">
                    <Check className="w-12 h-12 text-black" />
                </div>

                <div className="inline-block px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-6">
                    Inquiry Received
                </div>

                <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Your Fleet Quote is on the Way</h1>

                <p className="text-gray-400 bg-black/20 p-6 rounded-xl border border-white/5 mb-8 text-sm leading-relaxed">
                    Thank you. Our wedding concierge team has received your details for <strong>120 Guests</strong> from <strong>The Ritz-Carlton</strong> to <strong>Estate de Lumiere</strong>.
                    <br /><br />
                    A personalized PDF proposal including your <strong>Rolls-Royce Ghost</strong> and <strong>VIP Shuttles</strong> will be sent to your email within 2 hours.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={() => navigate('/dashboard')}
                        className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-widest text-xs h-12 px-8"
                    >
                        Track in Dashboard
                    </Button>
                    <Button
                        onClick={() => navigate('/')}
                        variant="outline"
                        className="border-white/10 hover:bg-white/5 text-white font-bold uppercase tracking-widest text-xs h-12 px-8"
                    >
                        <Home className="w-4 h-4 mr-2" /> Return Home
                    </Button>
                </div>

            </div>
        </div>
    )
}
