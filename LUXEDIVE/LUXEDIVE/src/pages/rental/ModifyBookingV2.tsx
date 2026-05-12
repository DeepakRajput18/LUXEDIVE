import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight,
    MapPin,
    Calendar,
    Clock,
    Shield,
    ChevronDown,
    Info
} from 'lucide-react';

const ModifyBookingV2: React.FC = () => {
    const navigate = useNavigate();

    // Mock State
    const [pickupDate, setPickupDate] = useState('2023-10-24');
    const [pickupTime, setPickupTime] = useState('10:00');
    const [dropoffDate, setDropoffDate] = useState('2023-10-27');
    const [dropoffTime, setDropoffTime] = useState('10:00');

    return (
        <div className="min-h-screen bg-[#0F1218] text-white font-sans selection:bg-white selection:text-black pb-20">

            {/* Full-width Hero */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80"
                    alt="Porsche 911"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1218] via-transparent to-black/60" />

                {/* Overlay Header */}
                <div className="absolute top-0 inset-x-0 p-8 flex justify-between items-start z-10">
                    <div>
                        <p className="text-xs font-bold text-white/60 tracking-[0.2em] mb-2 uppercase">Your Reservation: #83921</p>
                        <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-4 tracking-tight">Remaster Your Journey</h1>
                    </div>
                    <button className="px-6 py-2 border border-white/30 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all backdrop-blur-sm">
                        Upgrade Vehicle
                    </button>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-8 z-10 bg-gradient-to-t from-[#0F1218] h-32" />
            </div>

            <main className="max-w-5xl mx-auto px-6 relative z-20 -mt-24">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Itinerary Card */}
                    <div className="lg:col-span-2 bg-white text-black p-8 rounded-2xl shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-xl">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-serif">Modify Itinerary</h3>
                                    <p className="text-sm text-gray-500">Update your travel dates & times</p>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded transition-colors hover:bg-black hover:text-white cursor-pointer">
                                Availability Check Active
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            {/* Pick-up Input Group */}
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Pick-up</label>
                                <div className="space-y-3">
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between cursor-pointer hover:border-black transition-colors group">
                                        <span className="font-medium text-sm">{pickupDate}</span>
                                        <Calendar className="w-4 h-4 text-gray-400 group-hover:text-black" />
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between cursor-pointer hover:border-black transition-colors group">
                                        <span className="font-medium text-sm">{pickupTime}</span>
                                        <Clock className="w-4 h-4 text-gray-400 group-hover:text-black" />
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between cursor-pointer hover:border-black transition-colors group">
                                        <span className="font-medium text-sm truncate">AMD Terminal 2</span>
                                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-black" />
                                    </div>
                                </div>
                            </div>

                            {/* Drop-off Input Group */}
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Drop-off</label>
                                <div className="space-y-3">
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between cursor-pointer hover:border-black transition-colors group">
                                        <span className="font-medium text-sm">{dropoffDate}</span>
                                        <Calendar className="w-4 h-4 text-gray-400 group-hover:text-black" />
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between cursor-pointer hover:border-black transition-colors group">
                                        <span className="font-medium text-sm">{dropoffTime}</span>
                                        <Clock className="w-4 h-4 text-gray-400 group-hover:text-black" />
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between cursor-pointer hover:border-black transition-colors group">
                                        <span className="font-medium text-sm truncate">SG Highway Showroom</span>
                                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-black" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Viz */}
                        <div className="h-40 bg-gray-100 rounded-xl relative overflow-hidden group cursor-pointer border border-gray-200">
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200/50 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <span className="text-xs font-bold bg-white px-3 py-1 rounded shadow-md">Expand Map View</span>
                            </div>
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-[10px] font-bold text-black border border-gray-200 z-10">
                                ROUTE: AMD → SG HIGHWAY
                            </div>
                            {/* Mock Map Background */}
                            <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/1024px-Google_Maps_Logo_2020.svg.png')] bg-cover bg-center opacity-20 grayscale" />
                        </div>

                    </div>

                    {/* Right Panel - Summary */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Car Snapshot */}
                        <div className="bg-[#1A1F2E] p-6 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-10 rounded overflow-hidden bg-gray-800">
                                    <img src="https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">Porsche 911 Carrera S</p>
                                    <p className="text-gray-500 text-xs">Sport • Automatic • Black</p>
                                </div>
                            </div>
                            <div className="h-px bg-white/5 w-full" />
                        </div>

                        {/* Price Calculation (Floating Style) */}
                        <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-black p-8 rounded-2xl border border-blue-500/30 relative overflow-hidden shadow-2xl shadow-blue-900/20">
                            <div className="relative z-10">
                                <p className="text-blue-200/60 text-xs font-bold uppercase tracking-widest mb-6">Financial Adjustment</p>

                                <div className="space-y-2 mb-8">
                                    <div className="flex justify-between text-blue-200/40 text-sm">
                                        <span>Original Amount</span>
                                        <span className="line-through">₹95,000.00</span>
                                    </div>
                                    <div className="flex justify-between text-white font-medium">
                                        <span>New Estimate</span>
                                        <span>₹1,15,000.00</span>
                                    </div>
                                </div>

                                <div className="bg-black/30 p-4 rounded-xl border border-white/5 mb-6">
                                    <p className="text-center text-xs text-gray-400 mb-1 uppercase tracking-wide">Difference Due Now</p>
                                    <p className="text-center text-4xl font-serif text-white tracking-tight">+₹20,000.00</p>
                                    <p className="text-center text-[10px] text-blue-400 mt-2 font-medium">TAXES & INSURANCE INCLUDED</p>
                                </div>

                                <div className="space-y-3">
                                    <button onClick={() => navigate('/modification-confirmed')} className="w-full py-3 bg-white text-black font-bold rounded-lg text-sm hover:bg-gray-100 transition-colors">
                                        CONFIRM CHANGES
                                    </button>
                                    <button className="w-full py-2 text-xs text-gray-400 hover:text-white transition-colors">
                                        DISCARD ALL
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Modification Guarantee */}
                        <div className="flex gap-4 p-4 border border-white/5 rounded-xl bg-white/[0.02]">
                            <Shield className="w-8 h-8 text-gray-600 flex-shrink-0" />
                            <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                                Adjustments are subject to vehicle availability at the selected time. Changing dates may affect your original rate tier and cancellation eligibility.
                            </p>
                        </div>

                    </div>

                </div>

                {/* Bottom Help */}
                <div className="mt-20 text-center border-t border-white/5 pt-12">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Need Expert Assistance?</h4>
                    <a href="#" className="font-serif text-xl border-b border-white/20 pb-1 hover:text-gray-300 hover:border-white transition-all">
                        Contact our 24/7 Concierge
                    </a>
                </div>

            </main>
        </div>
    );
};

export default ModifyBookingV2;
