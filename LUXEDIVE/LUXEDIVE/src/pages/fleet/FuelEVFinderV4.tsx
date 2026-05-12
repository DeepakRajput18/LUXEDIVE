import { Button } from '../../components/ui/Button'
import { Droplet, Zap, Navigation, Phone, Car, AlertTriangle } from 'lucide-react'

// Page 48: Fuel & EV Finder V4 (No Map, Grid Layout)
export default function FuelEVFinderV4() {
    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            {/* HEADER TABS */}
            <div className="container mx-auto px-6 mb-12">
                <div className="flex justify-center mb-12">
                    <div className="bg-[#121212] rounded-full p-1 border border-white/5 inline-flex">
                        <button className="px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Active Rental</button>
                        <button className="px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#4169E1] text-white shadow-lg">Fuel & Charging Finder</button>
                    </div>
                </div>

                {/* VEHICLE STATUS BAR */}
                <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-16 bg-gray-900 rounded-lg overflow-hidden border border-white/10">
                            <img src="https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=200" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h2 className="text-xl font-serif text-white">Ferrari F8 Tributo</h2>
                            <div className="flex gap-4 mt-2">
                                <span className="flex items-center gap-1.5 text-[10px] bg-yellow-900/20 text-yellow-500 px-2 py-0.5 rounded border border-yellow-500/20 font-bold uppercase tracking-widest">
                                    <AlertTriangle className="w-3 h-3" /> Fuel Low
                                </span>
                                <span className="text-xs text-gray-400 font-mono">Range: ~40 miles</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Required Fuel</p>
                            <p className="text-white text-lg font-bold">98 Octane</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                            <Droplet className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl">

                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
                    <div>
                        <h1 className="text-3xl font-serif text-white mb-2">Nearby Premium Fuel & Charging</h1>
                        <p className="text-gray-400 font-light text-sm">Filtering for high-performance stations compatible with your vehicle.</p>
                    </div>

                    {/* FILTER PILLS */}
                    <div className="flex gap-2 flex-wrap">
                        <button className="h-9 px-4 rounded-full border border-[#4169E1] bg-blue-900/20 text-[#4169E1] text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-blue-900/30">98 Octane</button>
                        <button className="h-9 px-4 rounded-full border border-white/10 bg-[#121212] text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:text-white hover:border-white/30 transition-colors">Supercharger</button>
                        <button className="h-9 px-4 rounded-full border border-white/10 bg-[#121212] text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:text-white hover:border-white/30 transition-colors">Open Now</button>
                        <button className="h-9 px-4 rounded-full border border-white/10 bg-[#121212] text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:text-white hover:border-white/30 transition-colors">&lt; 5 miles</button>
                    </div>
                </div>

                {/* GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Card 1 */}
                    <div className="bg-[#121212] border border-blue-500/30 p-6 rounded-2xl group hover:bg-[#1A1A1A] transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold text-white">Shell V-Power</h3>
                            <span className="text-xs font-mono text-[#4169E1]">4 min</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-6">1.2 mi • 1280 5th Ave</p>
                        <div className="flex gap-2 flex-wrap mb-6">
                            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-[9px] font-bold uppercase">98 Octane</span>
                            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-[9px] font-bold uppercase">95 Octane</span>
                            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-[9px] font-bold uppercase">Market</span>
                        </div>
                        <Button className="w-full bg-[#4169E1] text-white hover:bg-blue-600 uppercase tracking-widest text-[10px] font-bold h-10">
                            <Navigation className="w-3 h-3 mr-2" /> Navigate
                        </Button>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl group hover:bg-[#1A1A1A] transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold text-white">BP Ultimate</h3>
                            <span className="text-xs font-mono text-gray-400">8 min</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-6">3.5 mi • 45 W 34th St</p>
                        <div className="flex gap-2 flex-wrap mb-6">
                            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-[9px] font-bold uppercase">98 Octane</span>
                            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-[9px] font-bold uppercase">Car Wash</span>
                        </div>
                        <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold h-10">
                            <Navigation className="w-3 h-3 mr-2" /> Navigate
                        </Button>
                    </div>

                    {/* Card 3 (EV Mix) */}
                    <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl group hover:bg-[#1A1A1A] transition-all opacity-70 grayscale">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold text-white">Ionity Charging</h3>
                            <span className="text-xs font-mono text-gray-400">12 min</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-6">4.1 mi • Hudson Yards L2</p>
                        <div className="flex gap-2 flex-wrap mb-6">
                            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-[9px] font-bold uppercase flex items-center gap-1"><Zap className="w-3 h-3" /> 350KW</span>
                            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-[9px] font-bold uppercase">CCS2</span>
                        </div>
                        <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold h-10">
                            <Navigation className="w-3 h-3 mr-2" /> Navigate
                        </Button>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl group hover:bg-[#1A1A1A] transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold text-white">Exxon Mobil</h3>
                            <span className="text-xs font-mono text-gray-400">15 min</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-6">5.8 mi • 781 10th Ave</p>
                        <div className="flex gap-2 flex-wrap mb-6">
                            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-[9px] font-bold uppercase">93 Octane</span>
                            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-[9px] font-bold uppercase">24/7</span>
                        </div>
                        <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold h-10">
                            <Navigation className="w-3 h-3 mr-2" /> Navigate
                        </Button>
                    </div>

                    {/* Card 5 */}
                    <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl group hover:bg-[#1A1A1A] transition-all opacity-70 grayscale">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold text-white">Tesla Supercharger</h3>
                            <span className="text-xs font-mono text-gray-400">18 min</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-6">6.2 mi • Brookfield Place</p>
                        <div className="flex gap-2 flex-wrap mb-6">
                            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-[9px] font-bold uppercase flex items-center gap-1"><Zap className="w-3 h-3" /> 250KW</span>
                            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-[9px] font-bold uppercase">Adapter Req</span>
                        </div>
                        <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold h-10">
                            <Navigation className="w-3 h-3 mr-2" /> Navigate
                        </Button>
                    </div>

                    {/* Card 6 */}
                    <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl group hover:bg-[#1A1A1A] transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold text-white">Esso Synergy</h3>
                            <span className="text-xs font-mono text-gray-400">22 min</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-6">7.5 mi • 501 W 42nd St</p>
                        <div className="flex gap-2 flex-wrap mb-6">
                            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-[9px] font-bold uppercase">95 Octane</span>
                            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-[9px] font-bold uppercase">Tire Air</span>
                        </div>
                        <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold h-10">
                            <Navigation className="w-3 h-3 mr-2" /> Navigate
                        </Button>
                    </div>

                </div>

                {/* FOOTER */}
                <div className="text-center mt-16 pb-8">
                    <a href="#" className="inline-flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold hover:text-white transition-colors">
                        <Phone className="w-4 h-4" /> Call Roadside Assistance
                    </a>
                </div>

            </div>
        </div>
    )
}
