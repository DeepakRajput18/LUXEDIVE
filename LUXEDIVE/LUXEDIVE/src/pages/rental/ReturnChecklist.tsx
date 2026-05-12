import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { AlertTriangle, CheckCircle, Fuel, Gauge, Settings, Key, FileText, ArrowRight } from 'lucide-react'

// Page 36: Digital Return Checklist
export default function ReturnChecklist() {
    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            {/* HEADER */}
            <div className="container mx-auto px-6 mb-8 flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-serif text-white uppercase">Vehicle Return Checklist</h1>
                        <span className="bg-emerald-900/20 text-emerald-500 border border-emerald-900/30 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                            Return Phase Active
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm">Contract #8842 • Return Date: Oct 15, 10:42 AM</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Agent ID</p>
                    <div className="flex items-center gap-4">
                        <p className="text-sm font-mono text-white">AGT-8842</p>
                        <button className="text-[10px] text-red-500 hover:text-red-400 font-bold uppercase tracking-widest underline decoration-dotted">Cancel Return</button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT: INSPECTION */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Damage Inspection */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-gray-400" /> Damage Inspection
                            </h3>
                            <div className="bg-orange-900/20 text-orange-500 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-orange-900/30 flex items-center gap-2">
                                <AlertTriangle className="w-3 h-3" /> 1 New Issue Detected
                            </div>
                        </div>

                        {/* Comparison */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                                <img src="https://images.unsplash.com/photo-1622185124086-162f23ce8a39?q=80&w=400" className="w-full h-full object-cover opacity-60" />
                                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] px-2 py-1 rounded uppercase font-bold">Handover (Oct 12)</span>
                            </div>
                            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative border-2 border-orange-500/50">
                                <img src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=400" className="w-full h-full object-cover" />
                                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] px-2 py-1 rounded uppercase font-bold">Return (Today)</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-[#0A0A0A] p-4 rounded-xl border border-white/5 flex flex-col items-center text-center">
                                <span className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Exterior</span>
                                <span className="text-emerald-500 font-bold text-sm">PASS</span>
                            </div>
                            <div className="bg-[#0A0A0A] p-4 rounded-xl border border-orange-500/30 flex flex-col items-center text-center relative">
                                <span className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Wheels</span>
                                <span className="text-orange-500 font-bold text-sm">FLAGGED</span>
                                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                            </div>
                            <div className="bg-[#0A0A0A] p-4 rounded-xl border border-white/5 flex flex-col items-center text-center">
                                <span className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Interior</span>
                                <span className="text-emerald-500 font-bold text-sm">PASS</span>
                            </div>
                        </div>
                    </div>

                    {/* Fuel & Mileage */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Fuel */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Fuel className="w-4 h-4 text-gray-400" />
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Fuel Level</h3>
                            </div>
                            <div className="h-32 bg-[#0A0A0A] rounded-xl border border-white/5 p-6 flex flex-col justify-between">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs text-gray-500 font-bold">E</span>
                                    <span className="text-2xl font-serif text-white">85%</span>
                                    <span className="text-xs text-gray-500 font-bold">F</span>
                                </div>
                                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-luxe-gold w-[85%]" />
                                </div>
                                <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-widest mt-2">
                                    <span>Tank: 64L</span>
                                    <span className="text-red-400 font-bold">Refuel Charge: +₹3,500.00</span>
                                </div>
                            </div>
                        </div>

                        {/* Mileage */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Gauge className="w-4 h-4 text-gray-400" />
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Mileage</h3>
                            </div>
                            <div className="space-y-3 bg-[#0A0A0A] rounded-xl border border-white/5 p-6">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Start: 12,405</span>
                                    <span>End: 12,980</span>
                                </div>
                                <div className="flex justify-between items-end border-t border-white/5 pt-3">
                                    <div>
                                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Total Distance</span>
                                        <span className="text-xl font-serif text-white">575 <span className="text-xs font-sans text-gray-500">km</span></span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-red-400 uppercase tracking-widest block mb-1">Overage (75km)</span>
                                        <span className="text-sm font-bold text-red-400">+₹12,000.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Accessories */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Accessories Return</h3>
                        <div className="flex gap-4">
                            {[
                                { name: 'Master Key', icon: Key, status: 'present' },
                                { name: 'Spare Key', icon: Key, status: 'present' },
                                { name: 'Manual', icon: FileText, status: 'present' },
                                { name: 'Cables', icon: Settings, status: 'missing', charge: '₹6,500.00' },
                            ].map((item) => (
                                <div key={item.name} className={`flex-1 p-4 rounded-xl border flex flex-col items-center gap-2 ${item.status === 'missing' ? 'bg-red-900/10 border-red-500/30' : 'bg-[#0A0A0A] border-white/5'}`}>
                                    <item.icon className={`w-5 h-5 ${item.status === 'missing' ? 'text-red-500' : 'text-gray-400'}`} />
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${item.status === 'missing' ? 'text-red-400' : 'text-gray-300'}`}>{item.name}</span>
                                    {item.charge && <span className="text-[10px] font-bold text-red-500">{item.charge}</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* RIGHT: SUMMARY & ACTIONS */}
                <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 h-fit sticky top-24">
                    <h3 className="text-xl font-serif text-white mb-8 border-b border-white/5 pb-4">Final Summary</h3>
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500 uppercase tracking-widest">Base Rental Cost</span>
                            <span className="text-gray-600 line-through">₹95,000.00</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-white uppercase tracking-widest">Mileage Overage</span>
                            <span className="text-white">₹12,000.00</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-white uppercase tracking-widest">Refuel Charge</span>
                            <span className="text-white">₹3,500.00</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-white uppercase tracking-widest">Damage Fee (Scratch)</span>
                            <span className="text-white">₹20,000.00</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-white uppercase tracking-widest">Missing Item</span>
                            <span className="text-white">₹6,500.00</span>
                        </div>
 
                        <div className="border-t border-white/5 pt-4 flex justify-between items-end">
                            <span className="text-sm font-bold text-white uppercase tracking-widest">Total Due</span>
                            <span className="text-3xl font-serif text-luxe-gold">₹42,000.00</span>
                        </div>
                    </div>

                    {/* Signatures */}
                    <div className="space-y-4 mb-8">
                        <div className="bg-[#0A0A0A] p-3 rounded border border-emerald-500/20 flex justify-between items-center">
                            <div>
                                <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Client Signature</p>
                                <p className="text-xs font-script text-gray-400 mt-1">Bruce Wayne</p>
                            </div>
                            <div className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Verified
                            </div>
                        </div>
                        <div className="h-14 border-2 border-dashed border-white/10 rounded flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Agent Tap to Sign</span>
                        </div>
                    </div>

                    <Button className="w-full bg-white text-black hover:bg-luxe-gold h-14 uppercase tracking-widest text-xs font-bold shadow-lg shadow-white/5">
                        <Settings className="w-4 h-4 mr-2" /> Confirm Return
                    </Button>

                </div>

            </div>
        </div>
    )
}
