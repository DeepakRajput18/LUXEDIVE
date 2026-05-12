import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { AlertCircle, FileText, Check, DollarSign, Image, Calendar, Shield } from 'lucide-react'

// This component serves as both Admin View and User Detailed View
export default function DamageDisputeReview() {
    const [activeTab, setActiveTab] = useState('review')

    return (
        <div className="min-h-screen bg-luxe-black text-white pt-20 pb-20">

            {/* TOP NAV / BREADCRUMBS */}
            <div className="container mx-auto px-6 mb-8 flex justify-between items-center">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    Home / Rentals / Disputes / #DSP-8821
                </div>
                <div className="flex gap-4">
                    {['Dashboard', 'Disputes', 'Rentals', 'History'].map(tab => (
                        <button key={tab} className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl">

                {/* HERO STATUS */}
                <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-serif text-white mb-2 flex items-center gap-3">
                            Review Damage Dispute
                            <span className="bg-orange-900/20 text-orange-400 border border-orange-900/30 px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest">
                                Action Required
                            </span>
                        </h1>
                        <p className="text-gray-400 text-sm">Please review the evidence and accept charges to release your remaining deposit.</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Total Outstanding</p>
                        <p className="text-3xl font-serif text-white">₹23,836</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT: EVIDENCE GALLERY */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Comparison */}
                        <div className="bg-[#121212] border border-white/5 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                    <Image className="w-4 h-4 text-luxe-gold" /> Evidence Comparison
                                </h3>
                                <span className="text-[10px] text-gray-500">4 Photos Available</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 relative">
                                {/* Handover Photo */}
                                <div className="relative group">
                                    <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1622185124086-162f23ce8a39?q=80&w=600" className="w-full h-full object-cover opacity-80" />
                                    </div>
                                    <span className="absolute top-3 left-3 bg-black/70 px-2 py-1 rounded text-[9px] text-white font-bold uppercase backdrop-blur-sm">
                                        Handover (Oct 12)
                                    </span>
                                    <span className="absolute bottom-3 right-3 text-emerald-500 text-xs font-bold flex items-center gap-1 bg-black/70 px-2 py-1 rounded backdrop-blur-sm">
                                        <Check className="w-3 h-3" /> Clear
                                    </span>
                                </div>

                                {/* Return Photo */}
                                <div className="relative group">
                                    <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden border-2 border-red-500/50">
                                        <img src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="absolute top-3 left-3 bg-red-900/80 px-2 py-1 rounded text-[9px] text-white font-bold uppercase backdrop-blur-sm">
                                        Return (Oct 15)
                                    </span>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-red-500 rounded-full animate-ping opacity-20" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-red-500 rounded-full bg-red-500/10 flex items-center justify-center">
                                        <span className="text-red-500 text-xs font-bold">!</span>
                                    </div>
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="grid grid-cols-6 gap-2 mt-4">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="aspect-square bg-[#0A0A0A] rounded overflow-hidden border border-white/5 hover:border-white/30 cursor-pointer">
                                        <div className="w-full h-full bg-white/5 flex items-center justify-center text-gray-700">
                                            <Image className="w-4 h-4" />
                                        </div>
                                    </div>
                                ))}
                                <button className="col-span-1 aspect-square bg-[#0A0A0A] border border-white/5 border-dashed rounded flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-colors">
                                    <span className="text-xs font-bold">+</span>
                                    <span className="text-[8px] uppercase mt-1">Upload</span>
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT: ESTIMATE & ACTIONS */}
                    <div className="space-y-6">

                        {/* Cost Breakdown */}
                        <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-luxe-gold" /> Repair Estimate
                            </h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-sm text-gray-300">
                                    <span>Front Bumper Replacement</span>
                                    <span>₹12,000</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-300">
                                    <span>Paint & Finish (OEM Match)</span>
                                    <span>₹5,000</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-300">
                                    <span>Labor Charges (4 hrs)</span>
                                    <span>₹3,200</span>
                                </div>
                            </div>

                            <div className="h-px bg-white/10 mb-4" />

                            <div className="space-y-2 mb-8">
                                <div className="flex justify-between text-xs text-gray-500 italic">
                                    <span>CGST (9%)</span>
                                    <span>₹1,818</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 italic">
                                    <span>SGST (9%)</span>
                                    <span>₹1,818</span>
                                </div>
                                <div className="flex justify-between items-end mt-4">
                                    <span className="text-sm font-bold text-white uppercase tracking-widest">Total Due</span>
                                    <span className="text-2xl font-serif text-luxe-gold">₹23,836</span>
                                </div>
                            </div>

                            {/* Info Box */}
                            <div className="bg-[#0A0A0A] rounded-lg p-4 mb-6 border border-white/5 flex gap-3">
                                <Shield className="w-5 h-5 text-gray-400 shrink-0" />
                                <p className="text-[10px] text-gray-500 leading-relaxed">
                                    This amount will be automatically deducted from your security deposit of ₹1,00,000. The remaining balance of ₹76,164 will be refunded typically within 3-5 business days.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white uppercase tracking-widest text-[10px] font-bold h-12 shadow-lg shadow-emerald-900/20">
                                    <Check className="w-4 h-4 mr-2" /> Accept & Pay ₹23,836
                                </Button>
                                <Button variant="outline" className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10 uppercase tracking-widest text-[10px] font-bold h-12">
                                    <AlertCircle className="w-4 h-4 mr-2" /> Submit Dispute
                                </Button>
                            </div>

                            <div className="text-center mt-6">
                                <a href="#" className="text-[10px] text-gray-600 hover:text-white underline">Read Dispute Resolution Policy</a>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
