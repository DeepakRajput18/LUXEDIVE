import { Button } from '../components/ui/Button'
import { ArrowDown, Car, Shield, MapPin, Key, ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

// Page 39: Experience Guide
export default function ExperienceGuide() {
    return (
        <div className="min-h-screen bg-luxe-black text-white">

            {/* HERO SECTION */}
            <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502877338535-766e14566cab?q=80')] bg-cover bg-center opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-luxe-black via-luxe-black/50 to-transparent" />

                <div className="relative z-10 text-center max-w-4xl px-6 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] inline-block mb-4">
                        The Process
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
                        The Art of Motion <br /> in Ahmedabad
                    </h1>
                    <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                        From selection to ignition in four effortless steps. Experience the seamless fusion of digital convenience and white-glove luxury.
                    </p>
                    <div className="pt-12 animate-bounce">
                        <ArrowDown className="w-6 h-6 mx-auto text-luxe-gold opacity-80" />
                    </div>
                </div>
            </section>

            {/* SECTION 01 - CURATED SELECTION */}
            <section className="py-32 border-b border-white/5 relative">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="order-2 lg:order-1 space-y-8">
                        <span className="text-8xl font-serif text-[#1A1A1A] font-bold block -ml-2 select-none">01</span>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-[#121212] rounded-full flex items-center justify-center border border-white/10 mb-6">
                                <Car className="w-5 h-5 text-luxe-gold" />
                            </div>
                            <h2 className="text-4xl font-serif text-white">Curated Selection</h2>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                Every Ahmedabad delivery includes power beyond base trim. Our collection is hand-picked for the discerning driver who accepts nothing less than perfection.
                            </p>
                            <Link to="/fleet" className="inline-flex items-center gap-2 text-[#4169E1] font-bold uppercase tracking-widest text-xs hover:text-white transition-colors group">
                                Browse Fleet <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 h-[600px] relative rounded-2xl overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
                    </div>
                </div>
            </section>

            {/* SECTION 02 - RAPID VERIFICATION */}
            <section className="py-32 border-b border-white/5 relative bg-[#0A0A0A]">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="h-[600px] relative rounded-2xl overflow-hidden group lg:order-1 order-1">
                        <div className="absolute inset-0 bg-blue-900/5 z-0" />
                        {/* Digital Lock Abstract Vis */}
                        <div className="w-full h-full bg-[#121212] flex items-center justify-center relative border border-white/5">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-20" />
                            <Shield className="w-32 h-32 text-[#4169E1] animate-pulse" />
                        </div>
                    </div>
                    <div className="space-y-8 lg:order-2 order-2">
                        <span className="text-8xl font-serif text-[#161616] font-bold block -ml-2 select-none">02</span>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-[#121212] rounded-full flex items-center justify-center border border-white/10 mb-6">
                                <Shield className="w-5 h-5 text-[#4169E1]" />
                            </div>
                            <h2 className="text-4xl font-serif text-white">Rapid Verification</h2>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                Our secure digital vault approves your credentials in minutes, not hours. Advanced AI identity checks meet bank-grade encryption to get you on the road instantly.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <div className="flex items-center gap-2 bg-blue-900/10 px-4 py-2 rounded border border-blue-500/20">
                                    <Shield className="w-4 h-4 text-[#4169E1]" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300">Biometric ID</span>
                                </div>
                                <div className="flex items-center gap-2 bg-emerald-900/10 px-4 py-2 rounded border border-emerald-500/20">
                                    <Shield className="w-4 h-4 text-emerald-500" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">256-Bit Encrypted</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 03 - WHITE GLOVE */}
            <section className="py-32 border-b border-white/5 relative">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="order-2 lg:order-1 space-y-8">
                        <span className="text-8xl font-serif text-[#1A1A1A] font-bold block -ml-2 select-none">03</span>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-[#121212] rounded-full flex items-center justify-center border border-white/10 mb-6">
                                <MapPin className="w-5 h-5 text-luxe-gold" />
                            </div>
                            <h2 className="text-4xl font-serif text-white">White-Glove Delivery</h2>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                We bring the vehicle to your doorstep—pristine, fueled, and ready. Whether at the airport terminal or your residence in Ahmedabad, our concierge handles the handover.
                            </p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold pt-2">
                                Serving: Ahmedabad • Surrounding Area
                            </p>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 h-[600px] relative rounded-2xl overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                </div>
            </section>

            {/* SECTION 04 - EFFORTLESS RETURN */}
            <section className="py-32 border-b border-white/5 relative bg-[#0A0A0A]">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="h-[600px] relative rounded-2xl overflow-hidden group lg:order-1 order-1">
                        <img src="https://images.unsplash.com/photo-1503376763036-066120622c74?q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="space-y-8 lg:order-2 order-2">
                        <span className="text-8xl font-serif text-[#161616] font-bold block -ml-2 select-none">04</span>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-[#121212] rounded-full flex items-center justify-center border border-white/10 mb-6">
                                <Key className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-4xl font-serif text-white">Effortless Return</h2>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                Park, hand over the keys, and walk away. We handle the rest. No paperwork, no waiting lines, just the memory of the drive.
                            </p>
                            <Button className="bg-[#4169E1] text-white hover:bg-blue-600 uppercase tracking-widest text-[10px] font-bold h-12 px-8 shadow-lg shadow-blue-900/20 mt-4">
                                Start Your Journey
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER CTA */}
            <section className="py-24 text-center">
                <h2 className="text-3xl font-serif text-white mb-8">Ready to elevate your drive?</h2>
                <div className="flex justify-center gap-6">
                    <Button className="bg-white text-black hover:bg-luxe-gold uppercase tracking-widest text-[10px] font-bold h-12 px-8">
                        View Available Cars
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold h-12 px-8">
                        <Phone className="w-4 h-4 mr-2" /> Contact Concierge
                    </Button>
                </div>
                <p className="text-xs text-gray-600 uppercase tracking-widest mt-12">© 2024 LUXEDIVE Ahmedabad. All rights reserved.</p>
            </section>

        </div>
    )
}
