import { Button } from '../../components/ui/Button'
import { Download, LifeBuoy, Play, Wifi, Battery, Sun } from 'lucide-react'

// Page 54: Quick Start Manual V2 (Interactive Visual Guide)
// Extends V1 but with play overlays and status bar
export default function QuickStartManualV2() {
    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            {/* HEADER */}
            <div className="container mx-auto px-6 mb-12">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-6">Rentals / Ferrari Portofino M</p>

                <div className="flex flex-col lg:flex-row justify-between items-end gap-6 pb-8 border-b border-white/5">
                    <div>
                        <div className="bg-luxe-gold/20 text-luxe-gold inline-block px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest mb-2 border border-luxe-gold/20">
                            Quick Start Guide V1.0
                        </div>
                        <h1 className="text-4xl font-serif text-white mb-2">Ferrari Portofino M</h1>
                        <p className="text-gray-400 font-light max-w-xl">
                            Master the essentials of your vehicle in minutes. Tap any section below to view the interactive visual guide.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold h-10 px-6">
                            <Download className="w-4 h-4 mr-2" /> Full Manual PDF
                        </Button>
                        <Button className="bg-red-600 hover:bg-red-700 text-white uppercase tracking-widest text-[10px] font-bold h-10 px-6 shadow-glow-red">
                            <LifeBuoy className="w-4 h-4 mr-2" /> SOS Support
                        </Button>
                    </div>
                </div>
            </div>

            {/* GRID CONTENT */}
            <div className="container mx-auto px-6 max-w-7xl mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Item 1 */}
                    <div className="group relative rounded-2xl overflow-hidden h-[340px] border border-white/5 cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-6 h-6 text-white fill-current ml-1" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <h3 className="text-2xl font-bold text-white mb-1">Convertible Roof Control</h3>
                            <p className="text-sm text-gray-400">0:45 • Essential</p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="group relative rounded-2xl overflow-hidden h-[340px] border border-white/5 cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1614207213894-a690772ae3e2?q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-6 h-6 text-white fill-current ml-1" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <h3 className="text-2xl font-bold text-white mb-1">Sport Mode Engagement</h3>
                            <p className="text-sm text-gray-400">1:30 • Performance</p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="group relative rounded-2xl overflow-hidden h-[340px] border border-white/5 cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1621685418182-3d5267df3c92?q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-6 h-6 text-white fill-current ml-1" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <h3 className="text-2xl font-bold text-white mb-1">Massage Seat Settings</h3>
                            <p className="text-sm text-gray-400">1:15 • Comfort</p>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div className="group relative rounded-2xl overflow-hidden h-[340px] border border-white/5 cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1650393279603-75b2298782e4?q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-6 h-6 text-white fill-current ml-1" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <h3 className="text-2xl font-bold text-white mb-1">Infotainment Pairing</h3>
                            <p className="text-sm text-gray-400">1:05 • Connectivity</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER STATUS BAR */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A] border-t border-white/5 py-4 px-6 z-30">
                <div className="container mx-auto max-w-7xl flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-gray-500">
                    <div className="flex gap-8">
                        <div className="flex items-center gap-2 text-white">
                            <Wifi className="w-3 h-3 text-emerald-500" /> Vehicle Connected
                        </div>
                        <div className="flex items-center gap-2 text-white">
                            <Battery className="w-3 h-3 text-emerald-500" /> Battery Optimal
                        </div>
                        <div className="flex items-center gap-2 text-white">
                            <Sun className="w-3 h-3 text-yellow-500" /> Weather: Clear
                        </div>
                    </div>
                    <div>
                        © 2024 LUXEDIVE. All rights reserved.
                    </div>
                </div>
            </div>

        </div>
    )
}
