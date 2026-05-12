import { Button } from '../../components/ui/Button'
import { Car, Search, Shield, Armchair, Gauge, Wifi, LifeBuoy, Phone, ArrowRight } from 'lucide-react'

// Page 56: Quick Start Manual V4 (Search-First Interface)
export default function QuickStartManualV4() {
    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20 flex flex-col items-center">

            {/* HEADER */}
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center gap-2 bg-blue-900/20 text-[#4169E1] px-4 py-1.5 rounded-full border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest mb-6">
                    <Car className="w-3 h-3" /> Active Rental
                </div>
                <h1 className="text-5xl font-serif text-white mb-2">2024 Porsche 911 Turbo S</h1>
                <p className="text-gray-400 font-light text-lg tracking-wide">Digital Quick Start Guide & Interactive Manual</p>
            </div>

            {/* SEARCH SECTION */}
            <div className="w-full max-w-2xl px-6 mb-16 relative z-10">
                <div className="relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 group-focus-within:text-[#4169E1] transition-colors" />
                    <input
                        type="text"
                        placeholder="What do you need help with?"
                        className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl h-20 pl-16 pr-20 text-white text-xl placeholder:text-gray-600 focus:border-[#4169E1] outline-none shadow-2xl shadow-blue-900/5 transition-all"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                        <span className="bg-[#2A2A2A] text-gray-500 text-[10px] font-bold px-2 py-1 rounded border border-white/5">CMD + K</span>
                    </div>
                </div>

                {/* Quick Pills */}
                <div className="flex justify-center gap-3 mt-6 flex-wrap">
                    {['Pair Bluetooth', 'Adjust Seat', 'Convertible Top', 'Refuel'].map(pill => (
                        <button key={pill} className="px-5 py-2 bg-[#121212] border border-white/10 rounded-full text-xs text-gray-400 hover:text-white hover:border-white/30 transition-colors font-medium">
                            {pill}
                        </button>
                    ))}
                </div>
            </div>

            {/* CATEGORIES GRID */}
            <div className="w-full max-w-5xl px-6 mb-20">
                <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
                    <h2 className="text-xl font-serif text-white">Browse by Category</h2>
                    <a href="#" className="text-[#4169E1] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                        View all categories <ArrowRight className="w-4 h-4" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Safety */}
                    <div className="bg-[#121212] border border-white/5 p-8 rounded-2xl hover:border-white/20 hover:bg-[#1A1A1A] transition-all cursor-pointer group text-center">
                        <div className="w-14 h-14 bg-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-[#4169E1] transition-colors">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Safety</h3>
                        <p className="text-xs text-gray-500">Airbags, ADAS, Brakes</p>
                    </div>

                    {/* Comfort */}
                    <div className="bg-[#121212] border border-white/5 p-8 rounded-2xl hover:border-white/20 hover:bg-[#1A1A1A] transition-all cursor-pointer group text-center">
                        <div className="w-14 h-14 bg-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-[#4169E1] transition-colors">
                            <Armchair className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Comfort</h3>
                        <p className="text-xs text-gray-500">Seats, Climate, Massage</p>
                    </div>

                    {/* Performance */}
                    <div className="bg-[#121212] border border-white/5 p-8 rounded-2xl hover:border-white/20 hover:bg-[#1A1A1A] transition-all cursor-pointer group text-center">
                        <div className="w-14 h-14 bg-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-[#4169E1] transition-colors">
                            <Gauge className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Performance</h3>
                        <p className="text-xs text-gray-500">Sport Mode, Suspension</p>
                    </div>

                    {/* Connectivity */}
                    <div className="bg-[#121212] border border-white/5 p-8 rounded-2xl hover:border-white/20 hover:bg-[#1A1A1A] transition-all cursor-pointer group text-center">
                        <div className="w-14 h-14 bg-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-[#4169E1] transition-colors">
                            <Wifi className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Connectivity</h3>
                        <p className="text-xs text-gray-500">CarPlay, Wi-Fi, Audio</p>
                    </div>

                </div>
            </div>

            {/* FOOTER SUPPORT */}
            <div className="w-full max-w-3xl px-6 text-center">
                <p className="text-sm text-gray-500 mb-8 font-bold uppercase tracking-widest">Can't find what you're looking for?</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-red-900/10 border border-red-500/20 p-6 rounded-xl flex items-center gap-4 hover:border-red-500/40 transition-colors cursor-pointer text-left">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-900/20">
                            <LifeBuoy className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm">Emergency Assistance</h4>
                            <p className="text-xs text-red-200">Roadside & Medical</p>
                        </div>
                    </div>

                    <div className="bg-[#121212] border border-white/10 p-6 rounded-xl flex items-center gap-4 hover:border-white/30 transition-colors cursor-pointer text-left">
                        <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shrink-0">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm">Priority Support Line</h4>
                            <p className="text-xs text-gray-400">24/7 Concierge Access</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
