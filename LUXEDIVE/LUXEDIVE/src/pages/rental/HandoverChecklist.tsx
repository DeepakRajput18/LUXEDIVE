import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Camera, CheckCircle, Lock as LockIcon, PenTool, Image, Upload } from 'lucide-react'

// Page 35: Digital Handover Checklist
export default function HandoverChecklist() {
    const [activeStep, setActiveStep] = useState(3)

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
                    <h1 className="text-3xl font-serif text-white uppercase">Vehicle Handover</h1>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Rental Agreement</p>
                    <p className="text-sm font-mono text-gray-300">#99204</p>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT: CHECKLIST */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Exterior */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-emerald-500" /> Exterior Condition
                            </h3>
                            <span className="bg-emerald-900/20 text-emerald-500 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest">Passed</span>
                        </div>

                        <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-4 flex gap-4 mb-4">
                            <div className="w-20 h-20 bg-gray-900 rounded-lg overflow-hidden shrink-0">
                                <img src="https://images.unsplash.com/photo-1617713670985-5b871987d69b?q=80&w=200" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-sm text-white font-medium mb-1">No new scratches</p>
                                <p className="text-xs text-gray-500">Documented by Agent Marcus T. at 10:42 AM</p>
                            </div>
                        </div>
                    </div>

                    {/* Interior & Hygiene */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                            Interior & Hygiene
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-300">Detailing Complete & Sanitized</span>
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-300">Amenities Present (Umbrella, Champagne)</span>
                                <div className="w-5 h-5 border-2 border-gray-600 rounded"></div>
                            </div>
                        </div>
                    </div>

                    {/* Fuel & Odometer */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                            Fuel & Odometer
                        </h3>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Fuel Level</p>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl font-serif text-white">100%</span>
                                    <span className="bg-emerald-900/20 text-emerald-500 px-2 py-0.5 rounded text-[9px] font-bold uppercase">Full</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-full" />
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Odometer</p>
                                <p className="text-2xl font-serif text-white">12,405 <span className="text-sm font-sans text-gray-500">km</span></p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT: SIGN-OFF */}
                <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 h-fit sticky top-24">
                    <h3 className="text-xl font-serif text-white mb-6">Digital Sign-off</h3>

                    <div className="space-y-6 mb-8">
                        {/* Agent Sign */}
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Agent Signature</p>
                            <div className="bg-[#0A0A0A] border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between">
                                <span className="font-script text-gray-400 text-lg">Marcus Thompson</span>
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                            </div>
                        </div>

                        {/* Client Sign */}
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Client Signature</p>
                            <div className="h-24 border-2 border-dashed border-white/10 bg-[#0A0A0A] rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors group">
                                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest group-hover:text-white">Sign Here</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mb-6">
                        <input type="checkbox" className="mt-0.5 rounded bg-black border-white/20 text-luxe-gold focus:ring-0" />
                        <p className="text-[10px] text-gray-500 leading-relaxed">
                            I acknowledge the vehicle condition as stated above and accept full responsibility for the vehicle during the rental period.
                        </p>
                    </div>

                    <Button className="w-full bg-[#4169E1] text-white hover:bg-blue-600 h-14 uppercase tracking-widest text-xs font-bold shadow-lg shadow-blue-900/20 mb-4">
                        <LockIcon className="w-4 h-4 mr-2" /> Complete Handover
                    </Button>

                    <p className="text-center text-[9px] text-gray-600 uppercase tracking-widest">
                        256-BIT SECURE ENCRYPTION
                    </p>

                </div>

            </div>
        </div>
    )
}
