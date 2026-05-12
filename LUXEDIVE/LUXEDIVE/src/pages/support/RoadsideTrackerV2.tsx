import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    PhoneCall,
    MapPin,
    Clock,
    MessageSquare,
    AlertCircle,
    Wrench,
    Car,
    ZoomIn,
    ZoomOut,
    Navigation,
    X
} from 'lucide-react';

const RoadsideTrackerV2: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 text-black font-sans flex flex-col md:flex-row">

            {/* Left Panel - Minimal Info */}
            <div className="w-full md:w-[420px] bg-white border-r border-gray-200 z-10 flex flex-col h-screen overflow-hidden shadow-2xl">

                {/* Header */}
                <div className="p-8 pb-0">
                    <div className="flex justify-between items-start mb-6">
                        <div className="px-3 py-1 bg-blue-600/10 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-2 animate-pulse">
                            <div className="w-2 h-2 bg-blue-600 rounded-full" /> Live Tracking Active
                        </div>
                        <div className="px-3 py-1 bg-yellow-400/10 text-yellow-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-yellow-400/20">
                            Premium Member
                        </div>
                    </div>

                    <h1 className="text-2xl font-serif font-medium mb-3">Emergency Help Dispatched</h1>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                        A specialized technician has accepted your request and is en route to your location.
                    </p>

                    {/* Arrival & Technician Combined Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-6 shadow-xl mb-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10" />

                        <div className="flex items-center justify-between mb-8 z-10 relative">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-2">
                                    <Clock className="w-3 h-3" /> Estimated Arrival
                                </p>
                                <p className="text-4xl font-serif">12 <span className="text-lg font-sans text-gray-500">mins</span></p>
                            </div>
                            <div className="w-12 h-12 relative">
                                <svg className="w-full h-full -rotate-90 text-blue-600" viewBox="0 0 36 36">
                                    <path className="text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                                    <path className="text-blue-500" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                                    <img src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black" />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-sm">Marcus Thorne</p>
                                <p className="text-[10px] text-gray-400">4.9★ • Elite Technician</p>
                            </div>
                            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                                <MessageSquare className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Service Details Minified */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                            <Wrench className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                            <p className="text-xs font-bold text-gray-800">Tire Change</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                            <Car className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                            <p className="text-xs font-bold text-gray-800">MB Sprinter</p>
                        </div>
                    </div>

                </div>

                {/* Bottom Actions */}
                <div className="mt-auto p-8 pt-0 space-y-4">
                    <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all">
                        <PhoneCall className="w-4 h-4" /> Contact Concierge
                    </button>
                    <button className="w-full py-2 text-xs text-gray-400 hover:text-red-500 font-medium transition-colors">
                        Cancel Request
                    </button>
                </div>

            </div>

            {/* Right Panel - Map */}
            <div className="flex-1 relative bg-gray-100">
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/1024px-Google_Maps_Logo_2020.svg.png')] bg-cover bg-center opacity-40 grayscale-[20%]" />

                <div className="absolute top-8 right-8 flex flex-col gap-2">
                    <button className="w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center text-gray-600 hover:text-black transition-colors">
                        <ZoomIn className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center text-gray-600 hover:text-black transition-colors">
                        <ZoomOut className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-blue-600 shadow-xl shadow-blue-600/30 rounded-xl flex items-center justify-center text-white hover:bg-blue-700 transition-colors mt-2">
                        <Navigation className="w-5 h-5" />
                    </button>
                </div>

                {/* User Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="relative flex flex-col items-center">
                        <div className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded shadow-lg mb-2">Your Location</div>
                        <div className="w-4 h-4 bg-black rounded-full border-2 border-white shadow-xl z-20" />
                        <div className="absolute bottom-2 w-16 h-1 bg-black/20 blur-sm rounded-full" />
                    </div>
                </div>

                {/* Tech Pin */}
                <div className="absolute top-[30%] left-[40%] pointer-events-none">
                    <div className="relative flex flex-col items-center">
                        <div className="bg-white text-blue-600 text-[10px] font-bold px-3 py-1 rounded shadow-lg mb-2 border border-blue-100">2.4 miles away</div>
                        <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-xl z-20" />
                        <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping" />
                    </div>
                </div>

                {/* Route Line */}
                <svg className="absolute inset-0 pointer-events-none w-full h-full drop-shadow-xl">
                    <path d="M 400 250 Q 550 350 700 450" stroke="#3B82F6" strokeWidth="5" fill="none" strokeLinecap="round" />
                </svg>

            </div>

        </div>
    );
};

export default RoadsideTrackerV2;
