import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { CheckCircle, AlertTriangle, Droplet, Sparkles, Camera, PenTool, Link } from 'lucide-react'

// Page 30: Delivery Inspection (Pre-Pickup by Customer)
export default function DeliveryInspection() {
    const [agreed, setAgreed] = useState(false)

    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            {/* HEADER BADGE */}
            <div className="container mx-auto px-6 mb-8 text-center">
                <div className="inline-flex items-center gap-2 bg-blue-900/20 text-[#4169E1] border border-blue-900/30 px-4 py-2 rounded-full mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#4169E1] animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Inspection Required</span>
                </div>
                <h1 className="text-4xl font-serif text-white mb-2">Verify Vehicle Condition</h1>
                <p className="text-gray-400 font-light">Please review the vehicle status before accepting the keys.</p>
            </div>

            <div className="container mx-auto px-6 max-w-4xl">

                {/* PROGRESS */}
                <div className="mb-12">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                        <span>Checks Verified</span>
                        <span>3 of 4 (75%)</span>
                    </div>
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#4169E1] w-[75%]" />
                    </div>
                </div>

                {/* MAIN CARD */}
                <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">

                    {/* Vehicle Header */}
                    <div className="relative h-64 bg-gray-900">
                        <img src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent" />
                        <div className="absolute bottom-6 left-8">
                            <h2 className="text-3xl font-serif text-white mb-1">Mercedes-AMG GT</h2>
                            <div className="flex gap-4 text-xs font-mono text-gray-400">
                                <span>Lic: LXD 9982</span>
                                <span>•</span>
                                <span>Selenite Grey</span>
                            </div>
                        </div>
                    </div>

                    {/* Checklist Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">

                        {/* Item 1 */}
                        <div className="bg-[#121212] p-8 flex items-start gap-4 group hover:bg-[#161616] transition-colors">
                            <div className="w-10 h-10 rounded-full bg-emerald-900/20 flex items-center justify-center shrink-0">
                                <Sparkles className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-white text-sm">Exterior Cleanliness</h3>
                                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed mb-3">Vehicle has been professionally detailed and sanitized.</p>
                                <div className="flex items-center gap-2 text-[10px] text-gray-400 bg-black/50 px-2 py-1 rounded w-fit">
                                    <Camera className="w-3 h-3" /> Photo Verified 10:45 AM
                                </div>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="bg-[#121212] p-8 flex items-start gap-4 group hover:bg-[#161616] transition-colors">
                            <div className="w-10 h-10 rounded-full bg-emerald-900/20 flex items-center justify-center shrink-0">
                                <Droplet className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-white text-sm">Fuel Level</h3>
                                    <span className="bg-emerald-900/30 text-emerald-500 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase">Full</span>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed mb-3">Tank is at 100% capacity. Return full to avoid charges.</p>
                                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mt-2 max-w-[120px]">
                                    <div className="h-full bg-emerald-500 w-full" />
                                </div>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="bg-[#121212] p-8 flex items-start gap-4 group hover:bg-[#161616] transition-colors">
                            <div className="w-10 h-10 rounded-full bg-emerald-900/20 flex items-center justify-center shrink-0">
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-white text-sm">Interior Condition</h3>
                                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed text-balance">Leather seats treated, carpets vacuumed, all electronics functional.</p>
                            </div>
                        </div>

                        {/* Item 4 - Scratches */}
                        <div className="bg-[#121212] p-8 flex items-start gap-4 group hover:bg-[#161616] transition-colors relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-1 h-full bg-orange-500" />
                            <div className="w-10 h-10 rounded-full bg-orange-900/20 flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-5 h-5 text-orange-500" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-white text-sm">Pre-existing Marks</h3>
                                    <span className="text-[10px] text-gray-500 font-mono">(2 Found)</span>
                                </div>
                                <ul className="text-xs text-gray-500 space-y-1 my-2">
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-orange-500 rounded-full" /> Minor scratch on rear rim</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-orange-500 rounded-full" /> Paint chip on front lip</li>
                                </ul>
                                <button className="text-[10px] text-[#4169E1] hover:text-white uppercase tracking-widest font-bold flex items-center gap-1 mt-2">
                                    View Diagram & Photos <PenTool className="w-3 h-3" />
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Footer Action */}
                    <div className="p-10 bg-[#0F0F0F] border-t border-white/5 text-center">
                        <p className="text-xs text-gray-500 mb-6 max-w-lg mx-auto leading-relaxed">
                            By accepting delivery, you confirm that the vehicle condition matches the report above and you accept responsibility for any new damage found upon return.
                        </p>

                        <Button className="w-full max-w-md bg-white text-black hover:bg-luxe-gold h-14 uppercase tracking-widest text-xs font-bold shadow-xl shadow-white/5 mx-auto block mb-4">
                            Accept Delivery
                        </Button>

                        <button className="text-[10px] text-gray-600 hover:text-red-500 uppercase tracking-widest font-bold underline decoration-dotted">
                            Report an issue
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
