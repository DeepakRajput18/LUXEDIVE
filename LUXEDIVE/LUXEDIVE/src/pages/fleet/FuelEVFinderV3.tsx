import { Button } from '../../components/ui/Button'
import { Droplet, Zap, Navigation, Plus, Minus, Search, CheckCircle, ArrowRight } from 'lucide-react'

// Page 47: Fuel & EV Finder V3 (Tab System)
export default function FuelEVFinderV3() {
    return (
        <div className="h-screen bg-luxe-black text-white pt-20 flex flex-col">

            {/* NAV (Tabs in Header) */}
            <div className="h-14 bg-[#121212] border-b border-white/5 flex items-center justify-center gap-12 text-[10px] uppercase font-bold tracking-widest">
                <span className="text-gray-500 hover:text-white cursor-pointer px-4 py-2">Dashboard</span>
                <span className="text-white bg-blue-900/10 border border-blue-500/20 px-6 py-2 rounded-full cursor-pointer">Fuel & Energy</span>
                <span className="text-gray-500 hover:text-white cursor-pointer px-4 py-2">Vehicle</span>
                <span className="text-gray-500 hover:text-white cursor-pointer px-4 py-2">Concierge</span>
            </div>

            <div className="flex-1 overflow-hidden flex">

                {/* SIDEBAR */}
                <div className="w-[450px] flex-shrink-0 bg-[#0A0A0A] border-r border-white/5 p-8 flex flex-col">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-serif text-white mb-2">Fuel & Charging</h2>
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Exclusive High-Octane Partner Network</p>
                    </div>

                    <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search nearby..."
                            className="w-full bg-[#121212] border border-white/10 rounded-xl h-12 pl-12 pr-4 text-white text-sm focus:border-luxe-gold outline-none"
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex mb-8 border-b border-white/10">
                        <button className="flex-1 pb-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white border-b-2 border-transparent">Premium Fuel</button>
                        <button className="flex-1 pb-4 text-[10px] font-bold uppercase tracking-widest text-white border-b-2 border-[#4169E1]">EV Charging</button>
                    </div>

                    <div className="space-y-6 overflow-y-auto flex-1 pr-2">

                        {/* Featured Card */}
                        <div className="bg-gradient-to-br from-blue-900/20 to-[#121212] border border-blue-500/30 p-6 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-3">
                                <CheckCircle className="w-5 h-5 text-[#4169E1] fill-current" />
                            </div>
                            <h3 className="text-xl font-serif text-white mb-1">Tata Power EZ Charge</h3>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">1.9 km • SG Highway Luxury Hub</p>

                            <div className="flex items-end gap-3 mb-6">
                                <div className="text-3xl font-mono text-white">₹18.50<span className="text-sm text-gray-500">/kWh</span></div>
                                <div className="text-sm text-gray-500 line-through mb-1">₹25.00</div>
                                <span className="bg-luxe-gold/20 text-luxe-gold text-[9px] px-2 py-0.5 rounded uppercase font-bold mb-1.5 ml-auto">Member Price</span>
                            </div>

                            <div className="flex gap-2 mb-6">
                                <span className="bg-black/50 border border-white/10 px-3 py-1 rounded-lg text-[10px] text-gray-300 font-bold uppercase flex items-center gap-1.5">
                                    <Zap className="w-3 h-3 text-[#4169E1]" /> Lightning Fast
                                </span>
                                <span className="bg-black/50 border border-white/10 px-3 py-1 rounded-lg text-[10px] text-gray-300 font-bold uppercase">
                                    Lounge Access
                                </span>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <Button className="col-span-2 bg-[#4169E1] text-white hover:bg-blue-600 h-10 text-[10px] font-bold uppercase tracking-widest">
                                    Navigate <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 h-10 text-[10px] font-bold uppercase tracking-widest">
                                    Details
                                </Button>
                            </div>
                        </div>

                        {/* List Items */}
                        <div className="space-y-4">
                            <div className="bg-[#121212] border border-white/5 p-4 rounded-xl flex justify-between items-center group hover:border-white/10 transition-colors">
                                <div>
                                    <h4 className="text-white font-bold text-sm">Ather Grid</h4>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">3.5 km • ITC Narmada</p>
                                    <span className="text-[10px] text-emerald-500 font-bold uppercase mt-2 block">Free (LuxeDive Members)</span>
                                </div>
                                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 h-8 w-8 p-0 rounded-full flex items-center justify-center">
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="bg-[#121212] border border-white/5 p-4 rounded-xl flex justify-between items-center group hover:border-white/10 transition-colors">
                                <div>
                                    <h4 className="text-white font-bold text-sm">Magenta ChargeGrid</h4>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">8.0 km • Mumbai-Ahmedabad Highway</p>
                                    <span className="text-[10px] text-gray-400 font-mono mt-2 block">₹21.00/kWh</span>
                                </div>
                                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 h-8 w-8 p-0 rounded-full flex items-center justify-center">
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* MAP */}
                <div className="flex-1 bg-[#1e232b] relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200" className="w-full h-full object-cover opacity-40 grayscale" />

                    {/* Pins */}
                    <div className="absolute top-1/4 left-1/4 animate-bounce">
                        <div className="bg-[#4169E1] w-8 h-8 rounded-full shadow-xl flex items-center justify-center border-2 border-white">
                            <Zap className="w-4 h-4 text-white fill-current" />
                        </div>
                    </div>

                    {/* Vehicle Status Overlay */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#121212]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-6 shadow-2xl min-w-[400px]">
                        <div className="w-16 h-10 bg-gray-800 rounded flex items-center justify-center overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1614207213894-a690772ae3e2?q=80&w=200" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Porsche Taycan Turbo S</span>
                                <span className="text-sm font-mono text-white">24%</span>
                            </div>
                            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 w-[24%]" />
                            </div>
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
