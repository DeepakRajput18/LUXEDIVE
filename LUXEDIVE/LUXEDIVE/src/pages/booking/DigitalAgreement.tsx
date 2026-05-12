import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { FileText, Download, X, Eraser, Check, Lock as LockIcon, ChevronRight, PenTool, ArrowRight } from 'lucide-react'

// Page 33: Digital Agreement
export default function DigitalAgreement() {
    const [signature, setSignature] = useState(false)

    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            {/* HEADER */}
            <div className="container mx-auto px-6 mb-8 flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-luxe-gold">Step 3 of 4</span>
                        <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-luxe-gold w-[75%]" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-serif text-white">Rental Agreement</h1>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Security ID</p>
                    <p className="text-sm font-mono text-gray-300">994-FK1-22</p>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT: PDF VIEWER */}
                <div className="lg:col-span-2 bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden h-[800px] flex flex-col">
                    <div className="h-14 bg-[#0F0F0F] border-b border-white/5 flex items-center justify-between px-6">
                        <span className="text-xs text-gray-400 font-mono">LD-RENT-2024-8839.pdf</span>
                        <div className="flex items-center gap-4">
                            <button className="text-gray-400 hover:text-white"><Download className="w-4 h-4" /></button>
                            <div className="flex items-center gap-2 bg-black/50 rounded px-2 py-1">
                                <button className="text-gray-400 hover:text-white text-xs">-</button>
                                <span className="text-xs text-gray-400 font-mono">100%</span>
                                <button className="text-gray-400 hover:text-white text-xs">+</button>
                            </div>
                        </div>
                    </div>

                    {/* PDF Content Placeholder */}
                    <div className="flex-1 bg-white/5 p-12 overflow-y-auto">
                        <div className="bg-white text-black min-h-[1000px] shadow-2xl p-12 mx-auto max-w-2xl font-serif text-sm leading-relaxed space-y-6">
                            <div className="text-center mb-12 border-b-2 border-black pb-8">
                                <h2 className="text-2xl font-bold uppercase tracking-widest mb-2">Rental Agreement</h2>
                                <p className="text-xs uppercase tracking-wide text-gray-600">LuxeDive Premium Mobility Solutions</p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold uppercase text-xs tracking-widest border-b border-gray-200 pb-2">1. Vehicle & Term</h3>
                                <p>This agreement is made between LUXEDIVE (Owner) and <strong>Mr. Arjun Sharma (Renter)</strong> for the rental of the vehicle described as <strong>2024 Porsche 911 Carrera S</strong>.</p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold uppercase text-xs tracking-widest border-b border-gray-200 pb-2">2. Prohibited Uses</h3>
                                <p>The Vehicle shall not be used: (a) for any illegal purpose; (b) in any race, speed test, or contest; (c) to tow or push anything; (d) on unpaved roads.</p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold uppercase text-xs tracking-widest border-b border-gray-200 pb-2">3. Vehicle Condition</h3>
                                <p>Renter acknowledges having received the Vehicle in good, safe, and operable condition. Any existing damage is noted in the Condition Report.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: SUMMARY & SIGNATURE */}
                <div className="space-y-8">

                    {/* Summary Card */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Reservation Summary</h3>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-12 bg-gray-900 rounded overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=200" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-white font-serif">2024 Porsche 911 Carrera S</p>
                                <p className="text-xs text-gray-500">₹35,000/day</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-6 border-t border-b border-white/5 py-6">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500 font-bold uppercase tracking-widest">Duration</span>
                                <span className="text-white">3 Days</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500 font-bold uppercase tracking-widest">Mileage</span>
                                <span className="text-white">500 km Included</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500 font-bold uppercase tracking-widest">Insurance</span>
                                <span className="text-white">Full Protection</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end">
                            <span className="text-sm font-bold text-white uppercase tracking-widest">Total Due</span>
                            <span className="text-2xl font-serif text-luxe-gold">₹1,05,000</span>
                        </div>
                    </div>

                    {/* Signature Card */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                            <PenTool className="w-4 h-4 text-luxe-gold" /> Electronic Signature
                        </h3>

                        <div
                            onClick={() => setSignature(true)}
                            className={`h-32 border-2 border-dashed rounded-xl mb-4 flex items-center justify-center cursor-pointer transition-colors relative group ${signature ? 'border-emerald-500/50 bg-emerald-900/10' : 'border-white/10 bg-[#0A0A0A] hover:bg-white/5'}`}
                        >
                            {signature ? (
                                <div className="font-script text-4xl text-white opacity-80 rotate-[-5deg]">Arjun Sharma</div>
                            ) : (
                                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest group-hover:text-white">Tap to Sign Here</span>
                            )}
                            {signature && (
                                <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] text-emerald-500 font-bold uppercase tracking-widest bg-emerald-900/20 px-2 py-0.5 rounded">
                                    <Check className="w-3 h-3" /> Verified
                                </div>
                            )}
                        </div>

                        {signature && (
                            <button onClick={(e) => { e.stopPropagation(); setSignature(false); }} className="text-[10px] text-red-500 hover:text-red-400 font-bold uppercase tracking-widest flex items-center gap-1 mb-6">
                                <Eraser className="w-3 h-3" /> Clear Signature
                            </button>
                        )}

                        <div className="space-y-3">
                            <Button disabled={!signature} className="w-full bg-[#4169E1] disabled:bg-gray-800 disabled:text-gray-600 text-white hover:bg-blue-600 uppercase tracking-widest text-[10px] font-bold h-12 shadow-lg shadow-blue-900/20 transition-all">
                                Accept & Continue <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold h-10">
                                    Download Draft
                                </Button>
                                <Button variant="outline" className="border-red-900/30 text-gray-500 hover:text-red-500 hover:bg-red-900/10 uppercase tracking-widest text-[10px] font-bold h-10">
                                    Decline
                                </Button>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-600 uppercase tracking-widest">
                            <LockIcon className="w-3 h-3" /> 256-bit SSL Encrypted Transaction
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}
