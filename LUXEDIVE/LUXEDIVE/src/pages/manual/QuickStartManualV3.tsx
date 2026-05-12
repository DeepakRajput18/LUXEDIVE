import { Button } from '../../components/ui/Button'
import { Zap, Gauge, Armchair, Music, AlertTriangle, Headset, Lock as LockIcon, Play, Eye, BookOpen, Camera, ChevronRight } from 'lucide-react'

// Page 55: Quick Start Manual V3 (Immersive Sidebar + 3D View)
export default function QuickStartManualV3() {
    return (
        <div className="h-screen bg-luxe-black text-white flex overflow-hidden">

            {/* SIDEBAR (30%) */}
            <div className="w-[30%] bg-[#0A0A0A] border-r border-white/5 flex flex-col relative z-20">
                <div className="p-8 border-b border-white/5">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Digital Manual</h2>
                    <h1 className="text-2xl font-serif text-white">Porsche 911 GT3</h1>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="space-y-1 py-4">
                        {/* Active Item */}
                        <div className="px-4">
                            <button className="w-full flex items-center justify-between p-4 bg-[#1A1A1A] border border-[#4169E1] rounded-xl text-white shadow-[0_0_15px_rgba(65,105,225,0.15)]">
                                <div className="flex items-center gap-4">
                                    <Zap className="w-5 h-5 text-[#4169E1]" />
                                    <div className="text-left">
                                        <span className="block text-xs font-bold uppercase tracking-widest text-[#4169E1]">Quick Start</span>
                                        <span className="block text-[10px] text-gray-500 mt-0.5">Essential Controls</span>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-[#4169E1]" />
                            </button>
                        </div>

                        {/* Menu Items */}
                        <button className="w-full flex items-center gap-4 px-8 py-4 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                            <Gauge className="w-5 h-5" />
                            <span className="text-xs font-bold uppercase tracking-widest">Driving Dynamics</span>
                        </button>
                        <button className="w-full flex items-center gap-4 px-8 py-4 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                            <Armchair className="w-5 h-5" />
                            <span className="text-xs font-bold uppercase tracking-widest">Comfort & Climate</span>
                        </button>
                        <button className="w-full flex items-center gap-4 px-8 py-4 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                            <Music className="w-5 h-5" />
                            <span className="text-xs font-bold uppercase tracking-widest">Infotainment</span>
                        </button>
                        <button className="w-full flex items-center gap-4 px-8 py-4 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                            <AlertTriangle className="w-5 h-5" />
                            <span className="text-xs font-bold uppercase tracking-widest">Emergency</span>
                        </button>
                    </div>
                </div>

                {/* Sidebar Footer */}
                <div className="p-8 border-t border-white/5 space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">
                            <span>Fuel Level</span>
                            <span className="text-white">85%</span>
                        </div>
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-[#4169E1] w-[85%]" />
                        </div>
                        <div className="text-[10px] text-gray-500 text-right">Range: 280 mi</div>
                    </div>
                    <Button className="w-full bg-[#1A1A1A] border border-white/10 hover:bg-white text-white hover:text-black uppercase tracking-widest text-[10px] font-bold h-12">
                        <Headset className="w-4 h-4 mr-2" /> Contact Concierge
                    </Button>
                </div>
            </div>

            {/* MAIN 3D VIEW (70%) */}
            <div className="flex-1 relative bg-gradient-to-b from-[#121212] to-[#050505] flex items-center justify-center overflow-hidden">

                {/* Header Overlay */}
                <div className="absolute top-12 left-0 right-0 text-center z-10 pointer-events-none">
                    <h1 className="text-[100px] font-black text-white/5 uppercase leading-none tracking-tighter select-none">Porsche</h1>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <h2 className="text-3xl font-serif text-white mb-2">PORSCHE 911 GT3</h2>
                        <span className="bg-emerald-900/20 text-emerald-500 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                            Connected • Live
                        </span>
                    </div>
                </div>

                {/* Simulated 3D Car Image (Static for now) */}
                <div className="relative w-full max-w-4xl aspect-video scale-110">
                    <img src="https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1200" className="w-full h-full object-contain drop-shadow-2xl" />

                    {/* Hotspot */}
                    <div className="absolute top-[40%] left-[25%] flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="relative group cursor-pointer">
                            <div className="w-4 h-4 bg-[#4169E1] rounded-full animate-ping absolute inset-0" />
                            <div className="w-4 h-4 bg-white rounded-full relative z-10 border-2 border-[#4169E1] group-hover:scale-110 transition-transform" />
                            <div className="absolute top-full left-1/2 -translate-x-1/2 h-16 w-px bg-white/20" />
                        </div>
                        <div className="bg-[#121212]/90 backdrop-blur border border-white/10 p-4 rounded-xl max-w-xs shadow-2xl">
                            <div className="flex items-center gap-2 mb-2 text-[#4169E1] text-[10px] font-bold uppercase tracking-widest border-b border-white/5 pb-2">
                                <LockIcon className="w-3 h-3" /> Front Trunk
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed mb-4">
                                To open the front trunk (frunk), locate the release latch in the driver's footwell or press the key fob button twice rapidly.
                            </p>
                            <Button className="w-full bg-[#4169E1] text-white hover:bg-blue-600 h-8 text-[9px] font-bold uppercase tracking-widest">
                                <Play className="w-3 h-3 mr-1" /> Watch Video
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 p-1 bg-[#1A1A1A]/80 backdrop-blur rounded-full border border-white/10">
                    <button className="w-12 h-12 rounded-full bg-[#4169E1] text-white flex items-center justify-center hover:bg-blue-600 transition-colors">
                        <Eye className="w-5 h-5" />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-transparent text-gray-400 flex items-center justify-center hover:text-white hover:bg-white/5 transition-colors">
                        <BookOpen className="w-5 h-5" />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-transparent text-gray-400 flex items-center justify-center hover:text-white hover:bg-white/5 transition-colors">
                        <Play className="w-5 h-5" />
                    </button>
                </div>

                <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-gray-600 uppercase tracking-widest font-bold">Drag to Rotate</p>

                {/* Environment Toggle */}
                <div className="absolute bottom-12 right-12">
                    <button className="flex items-center gap-2 bg-[#1A1A1A]/80 backdrop-blur border border-white/10 rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                        <Camera className="w-4 h-4" /> Studio Dark
                    </button>
                </div>

            </div>
        </div>
    )
}
