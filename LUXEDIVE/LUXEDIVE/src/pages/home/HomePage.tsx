import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Calendar, MapPin, ChevronDown, ArrowRight, Star, Check } from 'lucide-react'
import CarScrollCanvas from '../../components/home/CarScrollCanvas'

// Page 70: Home Page (Landing)
export default function HomePage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
    const textY = useTransform(scrollYProgress, [0, 0.15], [0, -50])

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans">

            {/* NAV (Transparent Overlay) */}
            <div className="absolute top-0 left-0 right-0 h-24 z-50 flex items-center justify-between px-8 md:px-16 border-b border-white/10 bg-gradient-to-b from-black/80 to-transparent">
                <div className="text-2xl font-serif tracking-widest">LUXEDIVE</div>
                <div className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300">
                    <a href="#" className="hover:text-white transition-colors">Fleet</a>
                    <a href="#" className="hover:text-white transition-colors">Services</a>
                    <a href="#" className="hover:text-white transition-colors">Experience</a>
                    <a href="#" className="hover:text-white transition-colors">Membership</a>
                </div>
                <Button className="bg-white text-black hover:bg-luxe-gold transition-colors h-10 px-6 text-[11px] font-bold uppercase tracking-widest rounded-none">
                    Sign In
                </Button>
            </div>

            {/* HERO (400vh Scroll-Driven) */}
            <div ref={containerRef} className="relative h-[400vh] w-full">
                <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                    {/* Background Canvas */}
                    <CarScrollCanvas
                        scrollYProgress={scrollYProgress}
                        totalFrames={40}
                        imageFolderPath="/gif/"
                    />

                    {/* Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 z-10 pointer-events-none" />

                    <motion.div
                        style={{ opacity: textOpacity, y: textY }}
                        className="relative z-20 text-center max-w-4xl px-6 -mt-20 w-full"
                    >
                        <div className="inline-block px-4 py-1.5 border border-white/30 rounded-full bg-black/30 backdrop-blur mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxe-gold">Premium Chauffeur Services</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-serif text-white mb-8 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 pointer-events-auto">
                            Experience the <br /><span className="italic text-luxe-gold">Extraordinary</span>
                        </h1>

                        {/* Booking Widget */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-2 md:p-3 rounded-xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 transform hover:scale-[1.01] transition-transform pointer-events-auto">
                            <div className="flex-1 bg-black/40 rounded-lg h-14 px-4 flex items-center border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
                                <Calendar className="w-4 h-4 text-gray-400 mr-3 group-hover:text-white" />
                                <div className="text-left">
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Pick-up Date</div>
                                    <div className="text-sm font-bold text-white">Oct 24, 10:00 AM</div>
                                </div>
                            </div>
                            <div className="flex-1 bg-black/40 rounded-lg h-14 px-4 flex items-center border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
                                <MapPin className="w-4 h-4 text-gray-400 mr-3 group-hover:text-white" />
                                <div className="text-left">
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Location</div>
                                    <div className="text-sm font-bold text-white">Ahmedabad, GJ</div>
                                </div>
                            </div>
                            <div className="flex-1 bg-black/40 rounded-lg h-14 px-4 flex items-center border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
                                <div className="text-left w-full">
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Vehicle Type</div>
                                    <div className="text-sm font-bold text-white flex justify-between items-center">
                                        All Models <ChevronDown className="w-3 h-3 text-gray-500" />
                                    </div>
                                </div>
                            </div>
                            <Button className="h-14 bg-luxe-gold hover:bg-yellow-600 text-black font-bold uppercase tracking-widest text-xs px-8 rounded-lg pointer-events-auto">
                                Check Availability
                            </Button>
                        </div>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        style={{ opacity: textOpacity }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20"
                    >
                        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
                            <div className="w-1 h-2 bg-white rounded-full" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* STATS */}
            <div className="py-20 border-y border-white/5 bg-[#050505]">
                <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    <div className="space-y-2">
                        <div className="text-4xl font-serif text-white">150+</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Luxury Vehicles</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-serif text-white">5k+</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Satisfied Clients</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-serif text-white">12</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Showrooms</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-serif text-white">24/7</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Premium Service</div>
                    </div>
                </div>
            </div>

            {/* FLEET PREVIEW */}
            <div className="py-24 container mx-auto px-6">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl font-serif text-white mb-4">Live Fleet Preview</h2>
                        <p className="text-gray-400 font-light">Real-time availability from our Ahmedabad garage.</p>
                    </div>
                    <a href="#" className="text-xs font-bold uppercase tracking-widest text-luxe-gold hover:text-white transition-colors flex items-center gap-2">
                        View Full Inventory <ArrowRight className="w-4 h-4" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { name: 'Mercedes-Benz S-Class', price: '18,500', cat: 'Luxury', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600' },
                        { name: 'BMW 7 Series', price: '16,000', cat: 'Premium', img: 'https://images.unsplash.com/photo-1555215695-3004980adade?q=80&w=600' },
                        { name: 'Audi R8 Spyder', price: '45,000', cat: 'Exotic', img: 'https://images.unsplash.com/photo-1603584173870-7b299f589c7d?q=80&w=600' },
                        { name: 'Range Rover Sport', price: '22,000', cat: 'SUV', img: 'https://images.unsplash.com/photo-1606016159991-efe4f274641c?q=80&w=600' },
                    ].map((car, i) => (
                        <div key={i} className="group bg-[#121212] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-500">
                            <div className="h-48 overflow-hidden relative">
                                <img src={car.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded text-white border border-white/10">
                                    {car.cat}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-serif text-white mb-1 group-hover:text-luxe-gold transition-colors">{car.name}</h3>
                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                                    <span className="text-sm text-gray-400">Daily Rate</span>
                                    <span className="text-lg font-bold text-white">₹{car.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SERVICES */}
            <div className="py-24 bg-[#080808] border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Wedding */}
                        <div className="relative h-[400px] group cursor-pointer overflow-hidden rounded-sm">
                            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-luxe-gold mb-2">Special Occasions</div>
                                <h3 className="text-3xl font-serif text-white mb-4">The Wedding Collection</h3>
                                <p className="text-xs text-gray-300 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity">Make your grand entrance with our curated wedding fleet.</p>
                                <ArrowRight className="w-6 h-6 text-white" />
                            </div>
                        </div>

                        {/* Corporate */}
                        <div className="relative h-[400px] group cursor-pointer overflow-hidden rounded-sm">
                            <img src="https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=800" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-luxe-gold mb-2">Business Class</div>
                                <h3 className="text-3xl font-serif text-white mb-4">Corporate Fleet</h3>
                                <p className="text-xs text-gray-300 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity">Executive transport for professionals who demand excellence.</p>
                                <ArrowRight className="w-6 h-6 text-white" />
                            </div>
                        </div>

                        {/* Self Drive */}
                        <div className="relative h-[400px] group cursor-pointer overflow-hidden rounded-sm">
                            <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-luxe-gold mb-2">Pure Performance</div>
                                <h3 className="text-3xl font-serif text-white mb-4">Self-Drive Freedom</h3>
                                <p className="text-xs text-gray-300 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity">Experience the thrill of the open road on your terms.</p>
                                <ArrowRight className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TESTIMONIAL */}
            <div className="py-24 container mx-auto px-6 text-center">
                <Star className="w-8 h-8 text-luxe-gold mx-auto mb-8 fill-luxe-gold" />
                <h2 className="text-3xl md:text-5xl font-serif italic text-white mb-8 max-w-4xl mx-auto leading-relaxed">
                    "LUXEDIVE redefined my expectations of luxury rental. The vehicle condition was impeccable, and the concierge service was truly world-class."
                </h2>
                <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left">
                        <div className="text-sm font-bold text-white">Aditya Birla</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-luxe-gold flex items-center gap-1">
                            <Check className="w-3 h-3" /> Verified Member
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="border-t border-white/10 bg-[#050505] pt-16 pb-8">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div>
                        <span className="text-2xl font-serif text-white tracking-widest block mb-6">LUXEDIVE</span>
                        <p className="text-xs text-gray-500 leading-relaxed mb-6">
                            Ahmedabad's premier luxury car rental service. Delivering excellence, performance, and sophistication for every journey.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-[11px] mb-6">Company</h4>
                        <ul className="space-y-4 text-xs text-gray-400">
                            <li><a href="#" className="hover:text-white">About Us</a></li>
                            <li><a href="#" className="hover:text-white">Careers</a></li>
                            <li><a href="#" className="hover:text-white">Press</a></li>
                            <li><a href="#" className="hover:text-white">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-[11px] mb-6">Support</h4>
                        <ul className="space-y-4 text-xs text-gray-400">
                            <li><a href="#" className="hover:text-white">Contact Concierge</a></li>
                            <li><a href="#" className="hover:text-white">Help Center</a></li>
                            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-[11px] mb-6">Connect</h4>
                        <div className="flex gap-4 mb-6">
                            {/* Social Icons (using placeholders for specific icons not imported) */}
                            <div className="w-10 h-10 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors flex items-center justify-center cursor-pointer font-bold text-xs">IG</div>
                            <div className="w-10 h-10 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors flex items-center justify-center cursor-pointer font-bold text-xs">TW</div>
                            <div className="w-10 h-10 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors flex items-center justify-center cursor-pointer font-bold text-xs">LI</div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 uppercase tracking-widest">
                    <div>© 2024 LUXEDIVE. All rights reserved.</div>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-gray-400">Privacy</a>
                        <a href="#" className="hover:text-gray-400">Terms</a>
                        <a href="#" className="hover:text-gray-400">Sitemap</a>
                    </div>
                </div>
            </div>

        </div>
    )
}
