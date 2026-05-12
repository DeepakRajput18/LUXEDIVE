import { Button } from '../../components/ui/Button'
import { Info, Clock, AlertTriangle, ArrowRight, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Page 58: Refund Estimator
export default function RefundEstimator() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl">

                {/* LEFT COLUMN (4 cols) */}
                <div className="lg:col-span-4 space-y-8">
                    <div>
                        <h2 className="text-3xl font-serif text-white mb-2">Refund & Cancellation <span className="text-[#4169E1] block">Estimator</span></h2>
                        <p className="text-gray-400 font-light text-sm leading-relaxed">
                            Transparency is our luxury. Calculate your potential refund instantly based on our 24h/12h cancellation policy before you commit to any changes.
                        </p>
                    </div>

                    {/* BOOKING SELECTOR */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-6">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4 block">Select Active Booking</label>
                        <div className="bg-[#1A1A1A] rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors group">
                            <div className="w-16 h-10 rounded bg-gray-800 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=200" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-bold text-white truncate w-32">Porsche 911 ...</h3>
                                <p className="text-[10px] text-gray-500">Oct 24 - Oct 27, 2023</p>
                            </div>
                            <div className="px-2 py-0.5 bg-emerald-900/20 text-emerald-500 text-[9px] font-bold uppercase rounded border border-emerald-500/20">Confirmed</div>
                            <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-white" />
                        </div>
                        <div className="mt-3 text-[10px] text-gray-600 font-mono text-center">Booking ID: #LX-AMD-9924</div>
                    </div>

                    {/* POLICY RECAP */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4 text-[#4169E1]">
                            <Info className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Policy Recap</span>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-xs text-gray-300">
                                <div className="w-2 h-2 rounded-full bg-[#4169E1]" />
                                <span><span className="font-bold text-white">24h before:</span> 100% Refund</span>
                            </li>
                            <li className="flex items-center gap-3 text-xs text-gray-300">
                                <div className="w-2 h-2 rounded-full bg-orange-500" />
                                <span><span className="font-bold text-white">12h - 24h:</span> 50% Refund</span>
                            </li>
                            <li className="flex items-center gap-3 text-xs text-gray-300">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <span><span className="font-bold text-white">&lt; 12h before:</span> No Refund</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* RIGHT COLUMN (8 cols) */}
                <div className="lg:col-span-8">
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 lg:p-12 relative overflow-hidden">
                        <div className="absolute top-8 right-8 text-[10px] text-[#4169E1] font-bold uppercase tracking-widest bg-blue-900/10 px-3 py-1 rounded-full border border-blue-500/20">
                            Current Server Time: 14:35 PM IST
                        </div>

                        <h2 className="text-2xl font-serif text-white mb-10">Estimation Breakdown</h2>

                        {/* TIMELINE */}
                        <div className="relative mb-12 px-4">
                            {/* Line */}
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-800 -translate-y-1/2" />
                            <div className="flex justify-between relative z-10">
                                {/* Point 1 */}
                                <div className="text-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-700 border-4 border-[#121212] mx-auto mb-2 flex items-center justify-center"></div>
                                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Booking Created</div>
                                </div>
                                {/* Point 2 - Active */}
                                <div className="text-center">
                                    <div className="w-8 h-8 rounded-full bg-[#4169E1] border-4 border-[#121212] mx-auto mb-2 shadow-[0_0_15px_rgba(65,105,225,0.5)]"></div>
                                    <div className="text-[10px] text-[#4169E1] uppercase font-bold tracking-widest">You Are Here</div>
                                    <div className="text-xs font-bold text-white mt-1">18h 25m</div>
                                </div>
                                {/* Point 3 */}
                                <div className="text-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-700 border-4 border-[#121212] mx-auto mb-2 flex items-center justify-center"></div>
                                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Pickup (Oct 24)</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="bg-[#1A1A1A] rounded-xl p-4 flex items-center gap-4">
                                <Clock className="w-8 h-8 text-gray-500" />
                                <div>
                                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Time Until Pickup</div>
                                    <div className="text-xl font-bold text-white">18h 25m</div>
                                </div>
                            </div>

                            <div className="bg-yellow-900/10 border border-yellow-500/20 rounded-xl p-4 flex items-center gap-4">
                                <AlertTriangle className="w-8 h-8 text-yellow-500" />
                                <div>
                                    <div className="text-[10px] text-yellow-500 uppercase font-bold tracking-widest">Policy Bracket: Late Cancellation</div>
                                    <div className="text-xs text-yellow-200">Less than 24h notice applied</div>
                                </div>
                            </div>
                        </div>

                        {/* FINANCIAL SUMMARY */}
                        <div className="space-y-4 border-t border-white/5 pt-8 mb-8">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">Total Booking Value</span>
                                <span className="text-white font-mono">₹45,000</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">Security Deposit (Refundable)</span>
                                <span className="text-white font-mono">₹25,000</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2 text-red-400">
                                    <span>Late Cancellation Fee (50%)</span>
                                    <Info className="w-3 h-3 cursor-help" />
                                </div>
                                <span className="text-red-400 font-mono">- ₹22,500</span>
                            </div>
                        </div>

                        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-8 flex items-center justify-between mb-8">
                            <div>
                                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Estimated Refund Amount</div>
                                <div className="text-xs text-gray-600">*Returned to original payment method</div>
                            </div>
                            <div className="text-4xl font-serif font-bold text-white">₹47,500</div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-6 items-center">
                            <button className="text-xs text-gray-500 hover:text-white uppercase tracking-widest font-bold transition-colors">Keep Booking</button>
                            <Button onClick={() => navigate('/refund-selection')} className="bg-[#4169E1] text-white hover:bg-blue-600 h-14 px-8 uppercase tracking-widest text-xs font-bold shadow-lg shadow-blue-900/20">
                                Continue to Cancellation <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>

                        <p className="mt-8 text-center text-[10px] text-gray-600 uppercase tracking-widest">
                            This is an estimate. Final amounts are confirmed on the next screen. Refunds typically process within 5-7 business days.
                        </p>

                    </div>
                </div>

            </div>
        </div>
    )
}
