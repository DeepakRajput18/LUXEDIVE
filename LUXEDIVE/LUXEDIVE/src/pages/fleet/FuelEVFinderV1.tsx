import { Button } from '../../components/ui/Button'
import { Droplet, Zap, Navigation, Map, Search, Plus, Minus } from 'lucide-react'

// Page 45: Fuel & EV Finder V1 (Sidebar + Map)
export default function FuelEVFinderV1() {
    return (
        <div className="h-screen bg-luxe-black text-white pt-20 flex flex-col">

            {/* NAV (Mock) */}
            <div className="h-14 bg-[#121212] border-b border-white/5 flex items-center px-6 gap-8 text-[10px] uppercase font-bold tracking-widest">
                <span className="text-gray-500 hover:text-white cursor-pointer">Dashboard</span>
                <span className="text-white relative cursor-pointer">
                    Fuel & Energy
                    <span className="absolute -bottom-4 left-0 right-0 h-0.5 bg-luxe-gold" />
                </span>
                <span className="text-gray-500 hover:text-white cursor-pointer">Vehicle</span>
                <span className="text-gray-500 hover:text-white cursor-pointer">Concierge</span>
            </div>

            <div className="flex-1 overflow-hidden flex">

                {/* SIDEBAR (40%) */}
                <div className="w-[400px] flex-shrink-0 bg-[#0A0A0A] border-r border-white/5 p-6 flex flex-col">
                    <h2 className="text-xl font-serif text-white mb-6">Nearby Stations</h2>

                    <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search location or brand..."
                            className="w-full bg-[#121212] border border-white/10 rounded-xl h-12 pl-12 pr-4 text-white text-sm focus:border-[#4169E1] outline-none"
                        />
                    </div>

                    <div className="flex gap-2 p-1 bg-[#121212] rounded-lg mb-8 border border-white/5">
                        <button className="flex-1 py-2 text-[10px] font-bold uppercase tracking-widest bg-[#4169E1] text-white rounded shadow-sm">97 Octane</button>
                        <button className="flex-1 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white">Ultra-Fast EV</button>
                    </div>

                    <div className="space-y-4 overflow-y-auto flex-1 pr-2">
                        {/* Shell Card */}
                        <div className="bg-[#121212] border border-blue-500/30 p-4 rounded-xl shadow-[0_0_15px_rgba(65,105,225,0.1)]">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-900/20 flex items-center justify-center text-red-500">
                                        <Droplet className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm">IndianOil XP100</h3>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">1.3 km • 100 Octane Premium</p>
                                    </div>
                                </div>
                                <span className="text-sm font-mono text-white">₹108.50/L</span>
                            </div>
                            <Button className="w-full bg-[#4169E1] text-white hover:bg-blue-600 h-9 text-[10px] font-bold uppercase tracking-widest">
                                <Navigation className="w-3 h-3 mr-2" /> Navigate
                            </Button>
                        </div>

                        {/* Exxon Card */}
                        <div className="bg-[#121212] border border-white/5 p-4 rounded-xl hover:border-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                                        <Droplet className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm">HP Power</h3>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">3.8 km • Supreme+</p>
                                    </div>
                                </div>
                                <span className="text-sm font-mono text-gray-400">₹106.20/L</span>
                            </div>
                            <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 h-9 text-[10px] font-bold uppercase tracking-widest">
                                <Navigation className="w-3 h-3 mr-2" /> Navigate
                            </Button>
                        </div>

                        {/* Chevron Card */}
                        <div className="bg-[#121212] border border-white/5 p-4 rounded-xl hover:border-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                                        <Droplet className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm">BP Speed</h3>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">5.0 km • Supreme</p>
                                    </div>
                                </div>
                                <span className="text-sm font-mono text-gray-400">₹109.10/L</span>
                            </div>
                            <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 h-9 text-[10px] font-bold uppercase tracking-widest">
                                <Navigation className="w-3 h-3 mr-2" /> Navigate
                            </Button>
                        </div>

                        {/* Tesla Card (Using Fuel Tab but shown as ex per prompt) */}
                        <div className="bg-[#121212] border border-white/5 p-4 rounded-xl hover:border-white/10 transition-colors opacity-60 grayscale">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                                        <Zap className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm">Tata Power EZ Charge</h3>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">6.7 km • 250KW Fast Charge</p>
                                    </div>
                                </div>
                                <span className="text-sm font-mono text-gray-400">4/12 Stalls</span>
                            </div>
                            <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 h-9 text-[10px] font-bold uppercase tracking-widest">
                                <Navigation className="w-3 h-3 mr-2" /> Navigate
                            </Button>
                        </div>

                    </div>
                </div>

                {/* MAP (60%) */}
                <div className="flex-1 bg-[#1e232b] relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200" className="w-full h-full object-cover opacity-30 grayscale invert" />

                    {/* User Location */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-12 h-12 bg-blue-500/30 rounded-full animate-ping absolute inset-0" />
                        <div className="w-12 h-12 bg-white rounded-full border-4 border-luxe-black shadow-xl flex items-center justify-center relative z-10">
                            <Navigation className="w-5 h-5 text-black fill-current transform -rotate-45" />
                        </div>
                    </div>

                    {/* Pins */}
                    <div className="absolute top-1/3 left-1/3">
                        <div className="bg-[#4169E1] px-3 py-1.5 rounded-lg shadow-xl text-white text-xs font-bold after:content-[''] after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-t-[#4169E1] after:border-transparent">
                            ₹108.5
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="absolute bottom-8 right-8 flex flex-col gap-2">
                        <button className="w-10 h-10 bg-black/80 backdrop-blur text-white flex items-center justify-center rounded hover:bg-white/10"><Plus className="w-5 h-5" /></button>
                        <button className="w-10 h-10 bg-black/80 backdrop-blur text-white flex items-center justify-center rounded hover:bg-white/10"><Minus className="w-5 h-5" /></button>
                    </div>
                </div>

            </div>
        </div>
    )
}
