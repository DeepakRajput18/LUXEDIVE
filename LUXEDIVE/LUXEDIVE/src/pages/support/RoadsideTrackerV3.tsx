import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    PhoneCall,
    MapPin,
    CheckCircle2,
    Circle,
    Clock,
    Loader2,
    Navigation,
    ChevronLeft,
    X
} from 'lucide-react';

const RoadsideTrackerV3: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 text-black font-sans pb-20 pt-20">

            {/* Header */}
            <header className="fixed top-0 inset-x-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-6 lg:px-12">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-black transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-sm font-bold uppercase tracking-widest text-gray-900">Assistance Status</h1>
                        <p className="text-[10px] text-gray-500 font-medium">Ticket #8492 • Mercedes-AMG GT Black Series</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors">
                        Cancel
                    </button>
                    <button className="w-9 h-9 bg-black text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors">
                        <PhoneCall className="w-4 h-4" />
                    </button>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">

                {/* Left Panel - Timeline */}
                <div className="w-full lg:w-[400px] bg-white border-r border-gray-200 p-8 flex flex-col overflow-y-auto">

                    <div className="flex items-center justify-between mb-8">
                        <span className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full border border-blue-100 animate-pulse">
                            <div className="w-2 h-2 bg-blue-600 rounded-full" /> En Route
                        </span>
                        <div className="text-right">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Estimated Arrival</p>
                            <p className="text-2xl font-serif text-gray-900">14 <span className="text-sm font-sans text-gray-500">min</span></p>
                        </div>
                    </div>

                    {/* Technician Card */}
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-8 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                            <img src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-sm">David Miller</h3>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Tech ID #9921 • Sprinter Van</p>
                        </div>
                        <button className="px-3 py-1.5 bg-cyan-500/10 text-cyan-700 text-[10px] font-bold uppercase tracking-widest rounded border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors">
                            Contact
                        </button>
                    </div>

                    {/* Timeline */}
                    <div className="relative pl-4 space-y-12 py-4">
                        {/* Line */}
                        <div className="absolute left-[20px] top-6 bottom-6 w-0.5 bg-gray-100" />

                        {/* Step 1 */}
                        <div className="relative flex items-start gap-6 group">
                            <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 relative z-10 ring-4 ring-white shadow-sm">
                                <CheckCircle2 className="w-full h-full text-white hidden" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900 mb-1">Request Received</p>
                                <p className="text-xs text-gray-400">10:42 AM</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative flex items-start gap-6 group">
                            <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 relative z-10 ring-4 ring-white shadow-sm" />
                            <div>
                                <p className="text-sm font-bold text-gray-900 mb-1">Driver Dispatched</p>
                                <p className="text-xs text-gray-400">10:52 AM</p>
                            </div>
                        </div>

                        {/* Step 3 (Active) */}
                        <div className="relative flex items-start gap-6 group">
                            <div className="w-3 h-3 bg-blue-600 rounded-full mt-1.5 relative z-10 ring-4 ring-blue-50 shadow-lg animate-pulse" />
                            <div>
                                <p className="text-sm font-bold text-blue-600 mb-1 flex items-center gap-2">
                                    On the Way <Loader2 className="w-3 h-3 animate-spin" />
                                </p>
                                <p className="text-xs text-gray-500">Live Update</p>
                            </div>
                        </div>

                        {/* Step 4 (Pending) */}
                        <div className="relative flex items-start gap-6 group opacity-50">
                            <div className="w-3 h-3 bg-gray-200 rounded-full mt-1.5 relative z-10 ring-4 ring-white" />
                            <div>
                                <p className="text-sm font-bold text-gray-400 mb-1">Arrived</p>
                                <p className="text-xs text-gray-400">Estimated 11:06 AM</p>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Right Panel - Map */}
                <div className="flex-1 bg-gray-200 relative">
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/1024px-Google_Maps_Logo_2020.svg.png')] bg-cover bg-center opacity-50" />

                    <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                            <Navigation className="w-5 h-5 text-black" />
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Distance to you</p>
                                <p className="text-xl font-bold font-mono">2.4 <span className="text-sm text-gray-500 font-sans">mi</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Pins would be standard Google Maps pins here */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-xl animate-pulse" />

                </div>

            </div>

        </div>
    );
};

export default RoadsideTrackerV3;
