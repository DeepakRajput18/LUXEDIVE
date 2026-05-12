import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { CheckCircle, Landmark, Diamond, CreditCard, Clock, X, Check, ArrowRight, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Page 59: Refund Selection
export default function RefundSelection() {
    const navigate = useNavigate()
    const [selectedMethod, setSelectedMethod] = useState<'bank' | 'credits'>('credits')

    const handleConfirm = () => {
        // In a real app, this would trigger a backend mutation
        navigate('/refund-tracker', {
            state: {
                refundId: 'R-8392',
                amount: selectedMethod === 'credits' ? 210000 : 200000,
                method: selectedMethod,
                status: 'processing'
            }
        });
    }

    return (
        <div className="min-h-screen bg-black/90 text-white pt-24 pb-20 flex flex-col items-center justify-center relative">
            {/* Blurred Background simulating overlay */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2000')] bg-cover bg-center opacity-10 blur-xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-5xl px-6">

                {/* SUCCESS HEADER */}
                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/20 animate-in zoom-in duration-500">
                        <CheckCircle className="w-10 h-10 text-white fill-current" />
                    </div>
                    <h1 className="text-3xl font-serif text-white mb-4">Booking #LXR-2026 Cancelled</h1>
                    <p className="text-lg text-gray-400 font-light max-w-xl mx-auto">
                        Your cancellation was successful. To complete the process, please select your preferred refund method below.
                    </p>
                </div>

                {/* SELECTION CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

                    {/* OPTION 1: BANK TRANSFER */}
                    <div
                        onClick={() => setSelectedMethod('bank')}
                        className={`bg-[#121212] border rounded-2xl p-8 cursor-pointer transition-all relative ${selectedMethod === 'bank' ? 'border-[#4169E1] ring-1 ring-[#4169E1]' : 'border-white/5 hover:border-white/20'}`}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-gray-800 rounded-xl text-gray-400">
                                <Landmark className="w-6 h-6" />
                            </div>
                            <div className={`w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center ${selectedMethod === 'bank' ? 'bg-[#4169E1] border-transparent' : ''}`}>
                                {selectedMethod === 'bank' && <Check className="w-3 h-3 text-white" />}
                            </div>
                        </div>

                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Bank Transfer</h3>
                        <div className="text-3xl font-serif text-white font-bold mb-1">Refund ₹2,00,000</div>
                        <div className="text-sm text-gray-400 mb-8">Original Payment Method</div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <CreditCard className="w-4 h-4 text-gray-500" /> Refund to HDFC •••• 1234
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <Clock className="w-4 h-4 text-gray-500" /> 5-7 Business Days processing
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <X className="w-4 h-4 text-red-500" /> No bonus credit applied
                            </div>
                        </div>
                    </div>

                    {/* OPTION 2: LUXEDIVE CREDITS */}
                    <div
                        onClick={() => setSelectedMethod('credits')}
                        className={`bg-[#121212] border rounded-2xl p-8 cursor-pointer transition-all relative ${selectedMethod === 'credits' ? 'border-[#4169E1] ring-1 ring-[#4169E1] ring-offset-4 ring-offset-black' : 'border-white/5 hover:border-white/20'}`}
                    >
                        <div className="absolute top-0 right-0 bg-[#4169E1] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-bl-xl rounded-tr-xl">
                            +5% Bonus
                        </div>

                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-[#4169E1] rounded-xl text-white shadow-lg shadow-blue-900/30">
                                <Diamond className="w-6 h-6 fill-current" />
                            </div>
                            <div className={`w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center ${selectedMethod === 'credits' ? 'bg-[#4169E1] border-transparent' : ''}`}>
                                {selectedMethod === 'credits' && <Check className="w-3 h-3 text-white" />}
                            </div>
                        </div>

                        <h3 className="text-xs font-bold text-[#4169E1] uppercase tracking-widest mb-1">LUXEDIVE Credits</h3>
                        <div className="text-3xl font-serif text-white font-bold mb-1">Refund ₹2,10,000</div>
                        <div className="text-sm text-gray-400 mb-8">Instant Availability</div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <CheckCircle className="w-4 h-4 text-[#4169E1]" /> Instant wallet credit
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <CheckCircle className="w-4 h-4 text-[#4169E1]" /> <span className="text-[#4169E1] font-bold">+5% Bonus Applied</span> (₹10,000 value)
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <CheckCircle className="w-4 h-4 text-[#4169E1]" /> Premium status retained
                            </div>
                        </div>
                    </div>

                </div>

                {/* ACTION */}
                <div className="text-center">
                    <Button onClick={handleConfirm} className="bg-[#4169E1] text-white hover:bg-blue-600 h-14 px-12 uppercase tracking-widest text-xs font-bold shadow-2xl shadow-blue-900/40 transform hover:scale-105 transition-all">
                        Confirm Refund Selection <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <div className="mt-8">
                        <a href="#" className="flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest font-bold">
                            Need help with this cancellation? Contact Support
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}
