import { Button } from '../../components/ui/Button'
import { Bus, Car, ArrowRight, Users, MapPin, Building2, Map as MapIcon, Info, Check } from 'lucide-react'

import { useNavigate } from 'react-router-dom'

// Page 67: Wedding - Guest Logistics
export default function WeddingGuestLogistics() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-[#0F172A] text-white pt-24 pb-20">

            {/* NAV */}
            <div className="fixed top-0 left-0 right-0 h-20 bg-[#0F172A]/95 backdrop-blur-md z-50 border-b border-white/5 flex items-center justify-between px-8">
                <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest text-gray-400">
                    <button onClick={() => navigate('/fleet')} className="hover:text-white">Fleet</button>
                    <button onClick={() => navigate('/events/wedding')} className="text-white border-b-2 border-cyan-500 pb-1">Weddings</button>
                    <button onClick={() => navigate('/services')} className="hover:text-white">VIP Services</button>
                    <button onClick={() => navigate('/contact')} className="hover:text-white">Contact</button>
                </div>
                <div className="flex gap-4">
                    <Button onClick={() => navigate('/dashboard')} className="bg-cyan-900/20 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500 hover:text-black h-8 text-[10px] font-bold uppercase tracking-widest">
                        My Account
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl">

                {/* PROGRESS */}
                <div className="mb-12">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-500">Wedding Booking Progress</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Step 3 of 4</span>
                    </div>
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 w-3/4 rounded-full" />
                    </div>
                    <div className="mt-2 text-right text-[10px] font-bold uppercase tracking-widest text-white">Current Step: Guest & VIP Logistics</div>
                </div>

                {/* HEADER */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-serif text-white mb-4">Step 03: Guest & VIP Logistics</h1>
                    <p className="text-gray-400 font-light text-lg max-w-2xl mx-auto">
                        Ensure your guests arrive in style and comfort with our coordinated fleet solutions. From premium coaches to individual executive SUVs.
                    </p>
                </div>

                {/* TRANSPORT CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

                    {/* 1. Coaches */}
                    <div className="bg-[#12182B] border border-white/5 rounded-xl p-8 text-center hover:border-white/20 transition-all cursor-pointer group">
                        <div className="w-20 h-20 mx-auto bg-cyan-900/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Bus className="w-10 h-10 text-cyan-500" />
                        </div>
                        <h3 className="text-xl font-serif text-white mb-2">Luxury Coaches</h3>
                        <p className="text-xs text-gray-400 leading-relaxed mb-6 h-10">Perfect for larger groups. 30-50 guests with leather interiors and full climate control.</p>
                        <div className="inline-block px-3 py-1 bg-white/5 rounded text-[9px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                            Executive Class
                        </div>
                    </div>

                    {/* 2. SUVs (Selected) */}
                    <div className="bg-[#12182B] border-2 border-cyan-500 rounded-xl p-8 text-center relative shadow-[0_0_30px_rgba(6,182,212,0.1)] cursor-pointer transform scale-105">
                        <div className="absolute top-4 right-4 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-black" />
                        </div>
                        <div className="w-20 h-20 mx-auto bg-cyan-500/20 rounded-full flex items-center justify-center mb-6">
                            <Car className="w-10 h-10 text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-serif text-white mb-2">Fleet of SUVs</h3>
                        <p className="text-xs text-cyan-100/70 leading-relaxed mb-6 h-10">Private transfers for bridal parties or immediate family. Black-label Cadillac Escalades.</p>
                        <div className="inline-block px-3 py-1 bg-cyan-500 text-black rounded text-[9px] font-bold uppercase tracking-widest">
                            Selected
                        </div>
                    </div>

                    {/* 3. Shuttle */}
                    <div className="bg-[#12182B] border border-white/5 rounded-xl p-8 text-center hover:border-white/20 transition-all cursor-pointer group">
                        <div className="w-20 h-20 mx-auto bg-cyan-900/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Bus className="w-10 h-10 text-cyan-500" />
                        </div>
                        <h3 className="text-xl font-serif text-white mb-2">VIP Shuttle Service</h3>
                        <p className="text-xs text-gray-400 leading-relaxed mb-6 h-10">On-demand luxury loops between hotel and venue. Mercedes-Benz Sprinter fleet.</p>
                        <div className="inline-block px-3 py-1 bg-white/5 rounded text-[9px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                            Flexible Loop
                        </div>
                    </div>

                </div>

                {/* LOGISTICS FORM & MAP */}
                <div className="bg-[#12182B] border border-white/5 rounded-2xl p-8 md:p-12 mb-12">
                    <div className="flex items-center gap-3 mb-8 pb-8 border-b border-white/5">
                        <MapIcon className="w-6 h-6 text-cyan-500" />
                        <h2 className="text-2xl font-serif text-white">Logistics & Route Details</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Form */}
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] text-cyan-500 uppercase tracking-widest font-bold mb-3 block">Number of Guests</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        defaultValue="120"
                                        className="w-full bg-[#0B1121] border border-white/10 rounded-xl h-14 pl-12 pr-6 text-white font-bold focus:border-cyan-500 outline-none transition-colors"
                                    />
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] text-cyan-500 uppercase tracking-widest font-bold mb-3 block">Hotel Pickup (Origin)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        defaultValue="The Ritz-Carlton, Downtown"
                                        className="w-full bg-[#0B1121] border border-white/10 rounded-xl h-14 pl-12 pr-6 text-white font-bold focus:border-cyan-500 outline-none transition-colors"
                                    />
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] text-cyan-500 uppercase tracking-widest font-bold mb-3 block">Venue (Destination)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        defaultValue="Estate de Lumiere"
                                        className="w-full bg-[#0B1121] border border-white/10 rounded-xl h-14 pl-12 pr-6 text-white font-bold focus:border-cyan-500 outline-none transition-colors"
                                    />
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                </div>
                            </div>
                        </div>

                        {/* Map Simulation */}
                        <div className="bg-[#0B1121] rounded-xl overflow-hidden relative min-h-[300px] border border-white/5">
                            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-74.006,40.7128,12,0/800x600?access_token=Pk.eyJ1IjoiZXhhbXBsZSJsIjoiY250cnlsIn0.1')] bg-cover bg-center opacity-50 grayscale" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] to-transparent" />

                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Pick up</div>
                                        <div className="text-xl font-bold text-white">14:00</div>
                                    </div>
                                    <div className="text-center pb-1">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-500 mb-1">BST: 25 Mins</div>
                                        <div className="w-24 h-0.5 bg-cyan-500/50 relative">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Drop</div>
                                        <div className="text-xl font-bold text-white">14:30</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* PRO TIP */}
                <div className="flex items-start gap-4 bg-cyan-900/10 border border-cyan-500/20 p-6 rounded-xl mb-12">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                        <Info className="w-5 h-5 text-cyan-500" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white mb-1">Pro Tip</h4>
                        <p className="text-xs text-cyan-200/70 leading-relaxed">
                            Based on 120 guests, we recommend a fleet of <span className="text-white font-bold">6 Black SUVs</span> and <span className="text-white font-bold">1 VIP Shuttle Loop</span> for maximum efficiency.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-right">
                    <Button onClick={() => navigate('/wedding/success')} className="h-16 px-12 bg-white text-black hover:bg-cyan-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-white/5">
                        Calculate Fleet Quote <ArrowRight className="w-4 h-4 ml-3" />
                    </Button>
                </div>

            </div>
        </div>
    )
}
