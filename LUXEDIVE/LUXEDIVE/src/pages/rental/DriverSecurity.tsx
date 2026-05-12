import { Button } from '../../components/ui/Button'
import { Shield, Clock, MapPin, User, Thermometer, Award, Phone } from 'lucide-react'

// Page 38: Driver & Vehicle Security
export default function DriverSecurity() {
    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            {/* HEADER */}
            <div className="container mx-auto px-6 mb-8 flex items-center justify-between">
                <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Home / Rentals / Verification & Security</p>
                    <h1 className="text-3xl font-serif text-white uppercase">Security & Verification</h1>
                </div>
                <div className="bg-emerald-900/10 border border-emerald-500/20 px-4 py-2 rounded-full flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10B981]" />
                    <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Live Monitoring Active</span>
                    <span className="text-[10px] text-emerald-800 hidden md:inline">|</span>
                    <span className="text-[10px] text-gray-400 font-mono hidden md:inline">#LX-8892-SECURE</span>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT: DRIVER PROFILE */}
                <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden p-8 h-fit">
                    <div className="text-center mb-6 relative">
                        <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full overflow-hidden border-2 border-luxe-gold p-1 mb-4">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div className="absolute top-0 right-1/2 translate-x-10 bg-emerald-500 rounded-full p-1 border-2 border-[#121212]">
                            <User className="w-3 h-3 text-white" />
                        </div>
                        <h2 className="text-xl font-serif text-white">Arthur Pennyworth</h2>
                        <p className="text-[10px] text-luxe-gold uppercase tracking-widest font-bold mt-1">Elite Chauffeur • ID: 9942</p>
                    </div>

                    <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-4 mb-6 flex items-center justify-center gap-3">
                        <Shield className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-300 font-bold uppercase tracking-widest">Silver Badge Verified</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-[#0A0A0A] p-3 rounded-lg text-center border border-white/5">
                            <Award className="w-5 h-5 text-gray-500 mx-auto mb-2" />
                            <p className="text-xs text-white font-bold">12 Years</p>
                            <p className="text-[9px] text-gray-500 uppercase">Experience</p>
                        </div>
                        <div className="bg-[#0A0A0A] p-3 rounded-lg text-center border border-white/5">
                            <Thermometer className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                            <p className="text-xs text-white font-bold">98.4°F</p>
                            <p className="text-[9px] text-emerald-500 uppercase">Normal</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Button className="w-full bg-white text-black hover:bg-luxe-gold uppercase tracking-widest text-[10px] font-bold h-12 shadow-lg shadow-white/5">
                            <Phone className="w-4 h-4 mr-2" /> Contact
                        </Button>
                        <Button variant="outline" className="w-full border-white/10 text-gray-400 hover:text-white hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold h-12">
                            <Shield className="w-4 h-4 mr-2" /> Report Issue
                        </Button>
                    </div>
                </div>

                {/* RIGHT: TRACKING & MAP */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Vehicle Header */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-1">Rolls-Royce Phantom</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Extended Wheelbase • Shadow Black</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-mono text-white mb-1 tracking-wider">LX-DV-88</div>
                            <div className="bg-blue-900/20 text-blue-200 px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5 border border-blue-500/20">
                                <Clock className="w-3 h-3" /> Deep Cleaned 09:00 AM
                            </div>
                        </div>
                    </div>

                    {/* Live Map */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden h-[500px] relative group">
                        {/* Mock Map View */}
                        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800" className="w-full h-full object-cover opacity-50 grayscale" />

                        {/* Overlay UI */}
                        <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-4 max-w-xs shadow-2xl">
                            <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-3">Journey Details</p>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="flex flex-col items-center pt-1">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3B82F6]" />
                                        <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500/50 to-transparent my-1" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">Current Location</p>
                                        <p className="text-sm text-white font-medium">Mayfair, London W1J</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex flex-col items-center pt-1">
                                        <div className="w-2 h-2 rounded-full bg-luxe-gold" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">Destination</p>
                                        <p className="text-sm text-white font-medium">Heathrow T5, VIP Drop-off</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 flex items-center gap-3 shadow-2xl">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-xs font-bold text-white uppercase tracking-widest">2 Mins Away</span>
                        </div>

                        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                            <button className="w-8 h-8 bg-black/80 backdrop-blur border border-white/10 rounded flex items-center justify-center text-white hover:bg-white/20">+</button>
                            <button className="w-8 h-8 bg-black/80 backdrop-blur border border-white/10 rounded flex items-center justify-center text-white hover:bg-white/20">-</button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest px-2">
                        <span>© 2024 LuxeDive Premium Mobility</span>
                        <div className="flex gap-4">
                            <span>Privacy Policy</span>
                            <span>Terms of Service</span>
                            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> 256-bit Encrypted</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
