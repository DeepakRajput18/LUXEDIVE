import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MapPin,
    PhoneCall,
    MessageSquare,
    Clock,
    User,
    AlertTriangle,
    ZoomIn,
    ZoomOut,
    Navigation,
    Wrench
} from 'lucide-react';

const RoadsideTrackerV1: React.FC = () => {
    const navigate = useNavigate();
    const [eta, setEta] = useState(12);

    // Simulate eta countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setEta((prev) => (prev > 0 ? prev - 1 : 0));
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white text-black font-sans pb-20 pt-20">

            {/* Header */}
            <header className="fixed top-0 inset-x-0 h-20 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-8">
                    <h1 className="text-xl font-serif font-bold tracking-widest cursor-pointer" onClick={() => navigate('/')}>LUXEDIVE</h1>
                    <nav className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest text-gray-400">
                        <a href="/dashboard" className="hover:text-black transition-colors">Dashboard</a>
                        <a href="#" className="text-blue-600 flex items-center gap-1">Roadside <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" /></a>
                        <a href="/rentals" className="hover:text-black transition-colors">Rentals</a>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Priority Status</span>
                        <span className="text-xs font-bold text-blue-600 uppercase flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> High Dispatch
                        </span>
                    </div>
                    <button className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80" alt="User" className="w-full h-full object-cover" />
                    </button>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">

                {/* Left Panel - Info */}
                <div className="w-full lg:w-[480px] bg-white border-r border-gray-200 p-8 overflow-y-auto flex flex-col">

                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Help is on the way</span>
                        </div>
                        <h2 className="text-3xl font-serif font-medium mb-1">Emergency Help Dispatched</h2>
                        <p className="text-gray-500 text-sm">Order #LX-9928 • Standard Priority</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-lg">Marcus V.</h3>
                                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">
                                        <span className="text-xs font-bold">4.9</span>
                                        <span className="text-yellow-400 text-xs">★</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Lead Technician</p>
                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                    <Navigation className="w-3 h-3" /> Driving MB Sprinter Van
                                </p>
                            </div>
                            <button className="p-3 bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors">
                                <MessageSquare className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
                            <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Clock className="w-3 h-3" /> Arrival
                            </p>
                            <p className="text-3xl font-serif text-blue-900 mb-2">{eta} <span className="text-sm font-sans text-blue-500">min</span></p>
                            <div className="h-1.5 bg-blue-200 rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-blue-600 rounded-full" />
                            </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-100 p-5 rounded-xl">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Navigation className="w-3 h-3" /> Distance
                            </p>
                            <p className="text-3xl font-serif text-gray-900 mb-2">2.4 <span className="text-sm font-sans text-gray-500">mi</span></p>
                            <p className="text-[10px] text-green-600 font-bold uppercase tracking-wide bg-green-50 inline-block px-2 py-0.5 rounded">
                                Traffic is light
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 mb-8">
                        <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Service Details</h4>
                            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                                    <Wrench className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Flat Tire Assistance</p>
                                    <p className="text-xs text-gray-500">Rear Right Tire • Michelin Pilot Sport</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Vehicle Identity</h4>
                            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
                                <div className="w-16 h-10 bg-gray-100 rounded overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1583121274602-3e2820c698d9?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Ferrari Roma (2023)</p>
                                    <p className="text-xs text-gray-500 font-mono">LXR-8821 • Silver</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto space-y-3">
                        <button className="w-full py-4 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-xl">
                            <PhoneCall className="w-4 h-4" /> Call Support
                        </button>
                        <p className="text-[10px] text-gray-400 text-center">
                            For immediate medical emergencies, please dial <span className="text-red-500 font-bold">911</span>.
                        </p>
                    </div>

                </div>

                {/* Right Panel - Map */}
                <div className="flex-1 bg-gray-200 relative">
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/1024px-Google_Maps_Logo_2020.svg.png')] bg-cover bg-center opacity-30 grayscale" />

                    {/* Map Controls Overlay */}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur shadow-lg rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-4 h-4 border-2 border-t-blue-600 border-blue-200 rounded-full animate-spin" />
                            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Tracking Service Unit</span>
                        </div>
                        <p className="text-[10px] text-gray-500 ml-6">Last update: Just now</p>
                    </div>

                    <div className="absolute bottom-12 right-6 space-y-2">
                        <button className="w-10 h-10 bg-white shadow-lg rounded-lg flex items-center justify-center text-gray-600 hover:text-black">
                            <ZoomIn className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 bg-white shadow-lg rounded-lg flex items-center justify-center text-gray-600 hover:text-black">
                            <ZoomOut className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 bg-blue-600 shadow-lg shadow-blue-600/30 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 mt-4">
                            <Navigation className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Simulated Pins */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                            <div className="w-4 h-4 bg-blue-600 rounded-full shadow-lg border-2 border-white z-10 relative" />
                            <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping" />
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-[10px] font-bold shadow whitespace-nowrap">Service Unit</div>
                        </div>
                    </div>

                    <div className="absolute top-1/3 left-1/3">
                        <div className="relative">
                            <div className="w-4 h-4 bg-black rounded-full shadow-lg border-2 border-white z-10 relative" />
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-[10px] font-bold shadow whitespace-nowrap">You</div>
                        </div>
                    </div>

                    {/* Simulated Route Line */}
                    <svg className="absolute inset-0 pointer-events-none w-full h-full">
                        <path d="M 400 300 Q 500 400 600 500" stroke="#3B82F6" strokeWidth="4" fill="none" strokeDasharray="10,5" />
                    </svg>

                </div>

            </div>
        </div>
    );
};

export default RoadsideTrackerV1;
