import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { AlertTriangle, Clock, Calendar, MapPin, Upload, X, FileText, ChevronLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function DamageDisputeAppeal() {
    const [evidence, setEvidence] = useState<string[]>([])
    const [description, setDescription] = useState('')

    return (
        <div className="min-h-screen bg-luxe-black text-white pt-20 pb-20">

            {/* HEADER */}
            <div className="container mx-auto px-6 mb-8">
                <Link to="/rentals" className="text-gray-500 hover:text-white flex items-center gap-2 mb-6 text-xs uppercase tracking-widest font-bold">
                    <ChevronLeft className="w-4 h-4" /> Back to Rentals
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-serif text-white mb-2">Damage Dispute Appeal</h1>
                        <p className="text-gray-400">Case #DSP-2023-8821 • Porsche 911 GT3</p>
                    </div>
                    <div className="text-right">
                        <span className="bg-red-900/20 text-red-500 border border-red-900/30 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                            Disputed Amount: ₹25,000
                        </span>
                        <div className="flex items-center gap-2 justify-end mt-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" /> Review Timeline: 48 Hours
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT: CLAIM DETAILS */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Damage Claim Details</h3>

                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Claim Type</p>
                                <div className="flex items-center gap-2 text-white text-sm">
                                    <AlertTriangle className="w-4 h-4 text-red-500" /> Scratch on Front Bumper
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Estimated Repair</p>
                                <p className="text-white text-sm">₹25,000 (Authorized Service Center)</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Return Date</p>
                                <div className="flex items-center gap-2 text-white text-sm">
                                    <Calendar className="w-4 h-4 text-gray-400" /> Oct 15, 2023
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Location</p>
                                <div className="flex items-center gap-2 text-white text-sm">
                                    <MapPin className="w-4 h-4 text-gray-400" /> Ahmedabad HQ
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Company Evidence</h3>
                        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden border border-white/10 relative group">
                            <img src="https://images.unsplash.com/photo-1617713670985-5b871987d69b?q=80&w=400" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-[9px] text-white font-mono flex justify-between">
                                <span>IMG_2991.JPG</span>
                                <span>Oct 15 • 10:42 AM</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 italic">Submitted by Inspector Marcus T.</p>
                    </div>
                </div>

                {/* RIGHT: APPEAL FORM */}
                <div className="lg:col-span-2">
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                        <h3 className="text-xl font-serif text-white mb-6">Submit Your Appeal</h3>

                        {/* Explain */}
                        <div className="mb-8">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 block">Explanation of Events</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                maxLength={2000}
                                className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-white text-sm focus:border-luxe-gold outline-none min-h-[150px] leading-relaxed resize-none"
                                placeholder="Please describe why you believe this damage charge is incorrect. Include details about the handover process or pre-existing conditions..."
                            />
                            <div className="text-right text-[10px] text-gray-600 mt-2 font-mono">
                                {description.length}/2000
                            </div>
                        </div>

                        {/* Upload */}
                        <div className="mb-8">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 block">Upload Rebuttal Evidence</label>

                            <div className="border-2 border-dashed border-white/10 bg-[#0A0A0A] rounded-xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer group">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/10 transition-colors">
                                    <Upload className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                </div>
                                <p className="text-sm text-white font-medium mb-1">Click to upload or drag and drop</p>
                                <p className="text-xs text-gray-500">Timestamped photos or videos highly recommended (Max 20MB)</p>
                            </div>

                            {/* Previews (Mock) */}
                            <div className="grid grid-cols-4 gap-4 mt-4">
                                {/* Empty for now based on state */}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-4 border-t border-white/5 pt-6">
                            <Button variant="outline" className="border-white/10 text-white hover:bg-white hover:text-black uppercase tracking-widest text-[10px] font-bold h-12 px-8">
                                Save Draft
                            </Button>
                            <Button className="bg-[#4169E1] text-white hover:bg-blue-600 uppercase tracking-widest text-[10px] font-bold h-12 px-8 shadow-lg shadow-blue-900/20">
                                Submit Appeal <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
