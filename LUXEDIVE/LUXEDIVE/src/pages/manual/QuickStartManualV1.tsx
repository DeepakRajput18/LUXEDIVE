import { Button } from '../../components/ui/Button'
import { Home, Phone, LifeBuoy, ArrowRight } from 'lucide-react'

// Page 53: Quick Start Manual V1 (Card Grid)
export default function QuickStartManualV1() {
    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            {/* TOP NAV in Page Context */}
            <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-6 z-20">
                <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest">
                    <span className="text-gray-500 hover:text-white cursor-pointer">Dashboard</span>
                    <span className="text-white relative cursor-pointer">
                        Digital Manual
                        <span className="absolute -bottom-7 left-0 right-0 h-0.5 bg-luxe-gold" />
                    </span>
                    <span className="text-gray-500 hover:text-white cursor-pointer">Concierge</span>
                </div>
                <div className="flex gap-4">
                    <Button className="bg-[#4169E1] text-white h-9 text-[10px] font-bold uppercase tracking-widest px-6 shadow-glow">
                        SOS
                    </Button>
                    <Button variant="outline" className="border-white/10 text-white h-9 text-[10px] font-bold uppercase tracking-widest px-6">
                        Return Vehicle
                    </Button>
                </div>
            </div>

            {/* HERO SECTION */}
            <div className="relative h-[400px] w-full bg-cover bg-center mb-12" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000')" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxe-black/80 to-luxe-black" />

                <div className="absolute bottom-0 left-0 right-0 p-8 pb-12 container mx-auto px-6">
                    <div className="inline-flex items-center gap-2 bg-[#4169E1] px-3 py-1 rounded text-[10px] text-white font-bold uppercase tracking-widest mb-4 shadow-lg">
                        <span>Rental Active</span>
                        <span className="w-1 h-1 rounded-full bg-white/50" />
                        <span>2 Days Remaining</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <h1 className="text-6xl font-serif text-white mb-2">Ferrari Roma</h1>
                            <p className="text-gray-400 text-lg font-light tracking-wide">Quick Start Guide</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl">

                <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
                    <h2 className="text-3xl font-serif text-white">Master Your Drive</h2>
                    <a href="#" className="text-[#4169E1] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                        View Full Manual <ArrowRight className="w-4 h-4" />
                    </a>
                </div>

                {/* GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">

                    {/* CARD 1 */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/20 transition-all">
                        <div className="h-64 bg-gray-800 relative">
                            <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-4 left-4 w-10 h-10 bg-black/50 backdrop-blur rounded flex items-center justify-center text-white">
                                <Home className="w-5 h-5" />
                            </div>
                            <div className="absolute bottom-4 right-4 text-[10px] font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur">0:45</div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold text-white mb-4">Convertible Roof Control</h3>
                            <ul className="space-y-2 text-sm text-gray-400 list-disc pl-4">
                                <li>Hold toggle down on center console to open/close</li>
                                <li>Operation permitted at speeds under 30mph (50km/h)</li>
                            </ul>
                        </div>
                    </div>

                    {/* CARD 2 */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/20 transition-all">
                        <div className="h-64 bg-gray-800 relative">
                            <img src="https://images.unsplash.com/photo-1614207213894-a690772ae3e2?q=80&w=800" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-4 left-4 w-10 h-10 bg-black/50 backdrop-blur rounded flex items-center justify-center text-white">
                                <div className="w-5 h-5 border-2 border-white rounded-sm" />
                            </div>
                            <div className="absolute bottom-4 right-4 text-[10px] font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur">1:30</div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold text-white mb-4">Sport Mode Engagement</h3>
                            <ul className="space-y-2 text-sm text-gray-400 list-disc pl-4">
                                <li>Rotate 'Manettino' dial on steering wheel to 'Sport'</li>
                                <li>Verify selection on digital driver dashboard cluster</li>
                            </ul>
                        </div>
                    </div>

                    {/* CARD 3 */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/20 transition-all">
                        <div className="h-64 bg-gray-800 relative">
                            <img src="https://images.unsplash.com/photo-1621685418182-3d5267df3c92?q=80&w=800" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-4 left-4 w-10 h-10 bg-black/50 backdrop-blur rounded flex items-center justify-center text-white">
                                <div className="w-5 h-5 bg-white/50 rounded" />
                            </div>
                            <div className="absolute bottom-4 right-4 text-[10px] font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur">1:15</div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold text-white mb-4">Massage Seat Settings</h3>
                            <ul className="space-y-2 text-sm text-gray-400 list-disc pl-4">
                                <li>Press lumbar button on door panel twice to activate</li>
                                <li>Select intensity and pattern via central infotainment screen</li>
                            </ul>
                        </div>
                    </div>

                    {/* CARD 4 */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/20 transition-all">
                        <div className="h-64 bg-gray-800 relative">
                            <img src="https://images.unsplash.com/photo-1650393279603-75b2298782e4?q=80&w=800" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-4 left-4 w-10 h-10 bg-black/50 backdrop-blur rounded flex items-center justify-center text-white">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="absolute bottom-4 right-4 text-[10px] font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur">1:05</div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold text-white mb-4">Infotainment Pairing</h3>
                            <ul className="space-y-2 text-sm text-gray-400 list-disc pl-4">
                                <li>Select 'Phone' on main menu, then 'Add New Device'</li>
                                <li>Scan QR code or select 'Ferrari Roma' from Bluetooth settings</li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* FOOTER CTA */}
                <div className="flex flex-col items-center justify-center py-12 border-t border-white/5">
                    <p className="text-gray-400 text-sm mb-6">Still need assistance?</p>
                    <div className="flex gap-4">
                        <Button className="bg-[#1A1A1A] border border-white/10 hover:bg-white text-white hover:text-black h-12 px-8 uppercase tracking-widest text-[10px] font-bold">
                            <Phone className="w-4 h-4 mr-2" /> Call Concierge
                        </Button>
                        <Button className="bg-[#1A1A1A] border border-white/10 hover:bg-white text-white hover:text-black h-12 px-8 uppercase tracking-widest text-[10px] font-bold">
                            <LifeBuoy className="w-4 h-4 mr-2" /> Live Chat
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}
