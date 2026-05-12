import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Check, Wallet, LifeBuoy } from 'lucide-react'

export default function BookingCancellation() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-luxe-black text-white flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl w-full">

                {/* Header with Icon */}
                <div className="text-center mb-12">
                    <div className="w-24 h-24 rounded-full border border-blue-500/30 flex items-center justify-center mx-auto mb-8 bg-blue-500/10 shadow-[0_0_40px_rgba(65,105,225,0.2)]">
                        <Check className="w-10 h-10 text-[#4169E1]" />
                    </div>
                    <h1 className="text-3xl font-serif text-white mb-2">Booking #LXR-2026 Cancelled</h1>
                    <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
                        Your reservation for the Rolls-Royce Spectre has been successfully cancelled. No further action is required from your end.
                    </p>
                </div>

                {/* Refund Details */}
                <div className="bg-[#121212] border border-blue-900/20 rounded-2xl overflow-hidden relative mb-8">
                    {/* Top Blue Accent */}
                    <div className="h-1 w-full bg-[#4169E1]" />

                    <div className="p-8">
                        <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                                    <Wallet className="w-6 h-6 text-[#4169E1]" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Total Refund Amount</p>
                                    <p className="text-xs text-gray-600 font-mono">#RF-99281</p>
                                </div>
                            </div>
                            <h2 className="text-3xl font-serif text-white">₹84,810</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Refund Method</p>
                                <p className="text-white text-sm">Credit card ending in 4242</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Estimated Timeline</p>
                                <p className="text-white text-sm">Processed within 5-7 business days</p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="relative pt-6">
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-[#4169E1] w-[25%]" />
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] uppercase tracking-widest font-bold">
                                <span className="text-[#4169E1]">Initiated</span>
                                <span className="text-gray-600">Processing</span>
                                <span className="text-gray-600">Completed</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-center gap-4">
                    <Button onClick={() => navigate('/dashboard')} className="w-full bg-[#4169E1] hover:bg-blue-600 h-14 text-white uppercase tracking-widest text-xs font-bold shadow-lg shadow-blue-900/20">
                        Return to Dashboard →
                    </Button>
                    <a href="#" className="flex items-center gap-2 text-gray-500 text-xs hover:text-white transition-colors">
                        <LifeBuoy className="w-4 h-4" /> Need help with this refund? Contact Support
                    </a>
                </div>

                {/* Footer */}
                <p className="text-[9px] text-center text-gray-600 uppercase tracking-widest mt-12">
                    © 2024 LUXEDIVE. All rights reserved. | <a href="#" className="hover:text-gray-400">Privacy Policy</a>, <a href="#" className="hover:text-gray-400">Terms of Service</a>
                </p>
            </div>
        </div>
    )
}
