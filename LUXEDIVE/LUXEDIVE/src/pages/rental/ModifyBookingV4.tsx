import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight,
    MapPin,
    Calendar,
    Clock,
    ShieldAlert,
    Activity,
    Server,
    Printer,
    Download,
    Box
} from 'lucide-react';

const ModifyBookingV4: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#050505] text-[#E0E0E0] font-mono text-sm selection:bg-green-900 selection:text-white pb-20">

            {/* Admin Header */}
            <header className="border-b border-green-900/30 bg-[#0A0A0A] px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500">DASHBOARD &gt; BOOKINGS &gt; <span className="text-white">#83921-MOD</span></span>
                    <span className="px-2 py-0.5 bg-green-900/20 text-green-500 text-[10px] font-bold border border-green-900/50 rounded flex items-center gap-1">
                        <Activity className="w-3 h-3" /> SYSTEM OPTIMAL
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-gray-500 hover:text-white uppercase text-xs font-bold tracking-widest">Discard Changes</button>
                    <button
                        onClick={() => navigate('/modification-confirmed')}
                        className="px-4 py-2 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-gray-200"
                    >
                        Finalize Adjustment
                    </button>
                </div>
            </header>

            <main className="p-6 grid grid-cols-12 gap-6">

                {/* Main Comparison Area */}
                <div className="col-span-8 space-y-6">
                    <h1 className="text-xl font-bold uppercase tracking-widest text-white mb-6">Modify Booking Summary</h1>

                    <div className="grid grid-cols-2 gap-px bg-green-900/30 border border-green-900/30 rounded-lg overflow-hidden">

                        {/* Current State */}
                        <div className="bg-[#0A0A0A] p-6 relative group">
                            <div className="absolute top-2 right-2 text-[10px] font-bold text-gray-600 uppercase">Current State</div>

                            <div className="mb-6 opacity-60 grayscale group-hover:grayscale-0 transition-all">
                                <img src="https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80" className="w-full h-40 object-cover rounded border border-white/10 mb-4" />
                                <h3 className="text-lg font-bold text-white">Porsche 911 Carrera S</h3>
                                <div className="flex gap-2 mt-2">
                                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded">SPORT PLUS</span>
                                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded">FULL INSURANCE</span>
                                </div>
                            </div>

                            <div className="space-y-4 text-xs text-gray-400 font-mono">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>PICKUP EPOCH</span>
                                    <span className="text-white">1698141600 (24 OCT)</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>DROPOFF EPOCH</span>
                                    <span className="text-white">1698400800 (27 OCT)</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>LOC CODE</span>
                                    <span className="text-white">AMD-INT-T2</span>
                                </div>
                            </div>
                        </div>

                        {/* Proposed Adjustment */}
                        <div className="bg-[#0F1218] p-6 relative">
                            <div className="absolute top-2 right-2 text-[10px] font-bold text-green-500 uppercase flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Live Proposal
                            </div>

                            <div className="mb-6">
                                <div className="w-full h-40 bg-black/50 rounded border-2 border-dashed border-green-900/50 flex items-center justify-center mb-4 text-green-700 text-xs">
                                    NO VEHICLE CHANGE
                                </div>
                                <h3 className="text-lg font-bold text-white">Porsche 911 Carrera S</h3>
                                <div className="flex gap-2 mt-2">
                                    <span className="text-[10px] bg-green-900/20 text-green-400 border border-green-900/50 px-2 py-0.5 rounded">CONFIG RETAINED</span>
                                </div>
                            </div>

                            <div className="space-y-4 text-xs text-gray-300 font-mono">
                                <div className="flex justify-between border-b border-green-900/20 pb-2">
                                    <span>PICKUP</span>
                                    <span className="text-white">24 OCT 23</span>
                                </div>
                                <div className="flex justify-between border-b border-green-900/20 pb-2 bg-green-900/10 -mx-2 px-2 rounded">
                                    <span>DROPOFF</span>
                                    <span className="text-green-400 font-bold">27 OCT 23 (EXTENDED)</span>
                                </div>
                                <div className="flex justify-between border-b border-green-900/20 pb-2">
                                    <span>LOC CODE</span>
                                    <span className="text-white">AMD-INT-T2</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Right: Financial Summary */}
                <div className="col-span-4 space-y-6">

                    <div className="bg-[#0A0A0A] border-[3px] border-green-900/20 rounded-lg p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-16 bg-green-500/5 blur-3xl rounded-full pointer-events-none" />

                        <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                            <Box className="w-4 h-4 text-green-500" />
                            <h2 className="font-bold text-white uppercase tracking-wider">Financial Summary</h2>
                        </div>

                        <div className="space-y-3 font-mono text-xs mb-8">
                            <div className="flex justify-between items-center text-gray-500">
                                <span>ORIGINAL LEDGER</span>
                                <span>₹95,000.00</span>
                            </div>
                            <div className="flex justify-between items-center text-green-400">
                                <span>ADJUSTMENT SURCHARGE</span>
                                <span>+₹16,500.00</span>
                            </div>
                            <div className="flex justify-between items-center text-green-600/70">
                                <span>APPLIED TAXES (2%)</span>
                                <span>+₹3,500.00</span>
                            </div>
                        </div>

                        <div className="bg-green-900/10 border border-green-900/30 p-4 rounded mb-6 text-center">
                            <p className="text-[10px] text-green-600 uppercase tracking-widest mb-1">Total Net Difference</p>
                            <p className="text-3xl font-bold text-white tracking-tighter">+₹20,000.00</p>
                        </div>

                        <div className="text-[10px] text-gray-500 leading-relaxed bg-black/20 p-3 rounded">
                            <span className="text-green-500 font-bold">ANALYSIS:</span> The increase is primarily attributed to the extended return window (3 hours) and peak-season service charges for the selected Oct 27 slot.
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/modification-confirmed')}
                            className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-green-50 transition-colors"
                        >
                            COMMIT CHANGES
                        </button>
                        <div className="flex justify-between text-[10px] text-gray-500 uppercase font-bold">
                            <button className="flex items-center gap-1 hover:text-white"><Download className="w-3 h-3" /> Export Quote</button>
                            <button className="flex items-center gap-1 hover:text-white"><Printer className="w-3 h-3" /> Print Ledger</button>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-6 text-[10px] text-gray-600 font-mono space-y-2">
                        <p><span className="text-gray-400">POLICY PROTOCOL:</span> AMENDMENT #442</p>
                        <p><span className="text-gray-400">SYSTEM NOTE:</span> Modifying itinerary parameters triggers immediate recalculation of base rates.</p>
                        <div className="flex items-center gap-2 pt-2 text-green-600/50">
                            <ShieldAlert className="w-3 h-3" /> SECURE MODE ALPHA
                        </div>
                    </div>

                </div>

            </main>

            <footer className="fixed bottom-0 inset-x-0 h-8 bg-[#0A0A0A] border-t border-white/5 flex items-center justify-between px-6 text-[10px] text-gray-600 uppercase tracking-widest">
                <span>&copy; 2024 LUXEDIVE SYSTEMS</span>
                <span className="flex items-center gap-2"><Server className="w-3 h-3" /> LATENCY: 24ms</span>
            </footer>

        </div>
    );
};

export default ModifyBookingV4;
