import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Shield, Star, Crown, Lightbulb, ChevronRight } from 'lucide-react'
import { teamData } from '../data/teamData'

export default function About() {
    return (
        <div className="bg-black text-white min-h-screen font-sans">
            {/* HERO SECTION */}
            <div className="relative h-[90vh] flex items-center justify-center text-center">
                <img src="https://d3ugq33b6jrffx.cloudfront.net/wp-content/uploads/2025/12/Sports-Cars-1024x682.jpg"
                    className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Luxury Interior" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />

                <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
                    <span className="inline-block px-4 py-1.5 border border-luxe-gold text-luxe-gold text-[10px] font-bold tracking-[0.3em] mb-8 uppercase">
                        Since 2012
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 max-w-5xl leading-tight">
                        Defining the Gold Standard in Luxury Motion
                    </h1>
                    <p className="text-xl text-luxe-gray max-w-3xl mb-12 font-light leading-relaxed">
                        We don't just rent cars; we curate journeys. From the roar of a V8 to the silence of a chauffeur's nod, every detail is engineered for perfection.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <Link to="/fleet">
                            <Button size="lg" className="bg-luxe-gold text-black hover:bg-white hover:text-black px-10 h-14 text-xs font-bold tracking-widest uppercase transition-all">
                                Explore Fleet
                            </Button>
                        </Link>
                        <Link to="/services">
                            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-black px-10 h-14 text-xs font-bold tracking-widest uppercase transition-all">
                                View Services
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* HERITAGE & MISSION */}
            <section className="py-32 container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                    <h2 className="text-3xl md:text-4xl font-serif text-white leading-tight">Our Heritage & Mission</h2>
                    <div className="space-y-6 text-luxe-gray text-lg font-light leading-relaxed">
                        <p>
                            Founded in 2012, LUXEDIVE began with a single vision: to bring world-class automotive experiences to the region. What started as a private collection of three vintage Rolls Royces has evolved into the city's premier fleet of over 100 ultra-luxury vehicles.
                        </p>
                        <p>
                            Our mission is simple yet ambitious: to redefine mobility as an art form. We believe that how you arrive matters just as much as where you are going.
                        </p>
                    </div>
                    <Link to="/history" className="inline-flex items-center text-luxe-gold hover:text-white transition-colors text-sm font-medium tracking-wide uppercase border-b border-luxe-gold pb-1 group">
                        Read the full history <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div className="relative group">
                    <div className="absolute inset-0 bg-luxe-gold/20 translate-x-4 translate-y-4 rounded-sm transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
                    <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop"
                        className="relative z-10 w-full rounded-sm grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl" alt="Vintage Car" />
                    <p className="absolute bottom-6 left-8 z-20 text-[10px] text-white/70 tracking-[0.2em] font-medium uppercase drop-shadow-md">
                        Est. 2012 - The Original Fleet
                    </p>
                </div>
            </section>

            {/* CORE VALUES */}
            <section className="py-32 bg-[#0A0A0A] border-y border-white/5">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-20">
                        <p className="text-luxe-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Our Pillars</p>
                        <h2 className="text-4xl font-serif text-white">Core Values</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: Crown, title: "Integrity", text: "Honest pricing and hidden fees. We believe trust is the ultimate luxury currency." },
                            { icon: Star, title: "Excellence", text: "A meticulously maintained fleet. Every vehicle is a masterwork of automotive perfection." },
                            { icon: Shield, title: "Discretion", text: "Your privacy is our utmost priority. Our chauffeurs and staff are trained in absolute confidentiality." },
                            { icon: Lightbulb, title: "Innovation", text: "Seamless digital booking experience. We integrate traditional luxury with modern technology." }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-8 group-hover:border-luxe-gold/50 transition-colors">
                                    <item.icon className="w-6 h-6 text-luxe-gold" />
                                </div>
                                <h3 className="text-xl font-serif text-white mb-4">{item.title}</h3>
                                <p className="text-luxe-gray text-sm leading-relaxed max-w-xs">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="py-24 container mx-auto px-6 lg:px-12 border-b border-white/5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
                    {[
                        { num: "100+", label: "Luxury Cars" },
                        { num: "15+", label: "Premium Brands" },
                        { num: "5K+", label: "Journeys" },
                        { num: "24/7", label: "Concierge" }
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <p className="text-5xl md:text-6xl font-serif text-luxe-gold mb-3">{stat.num}</p>
                            <p className="text-[10px] text-luxe-gray font-bold uppercase tracking-[0.25em]">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* LEADERSHIP TEAM */}
            <section className="py-32 bg-black">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <p className="text-luxe-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Leadership</p>
                        <h2 className="text-4xl font-serif text-white mb-6">The Founding Team</h2>
                        <p className="text-luxe-gray font-light leading-relaxed">
                            Visionaries dedicated to elevating the standards of luxury travel and redefining the art of motion across the region.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {teamData.map((member, i) => (
                            <Link to={`/team/${member.slug}`} key={i} className="group cursor-pointer block">
                                <div className="mb-8 relative overflow-hidden rounded-sm aspect-[3/4]">
                                    <img src={member.images.portrait} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" alt={member.name} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                        <span className="text-white text-xs uppercase tracking-widest font-bold">View Bio →</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-luxe-gold transition-colors">{member.name}</h3>
                                <p className="text-luxe-gray text-xs font-bold uppercase tracking-[0.2em]">{member.role}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-20 bg-[#050505] border-t border-white/10">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
                        <div>
                            <h4 className="text-white font-serif text-xl mb-6">LUXEDIVE</h4>
                            <div className="text-luxe-gray text-sm space-y-2 font-light">
                                <p>1284 5th Avenue</p>
                                <p>New York, NY 10029</p>
                                <p>+1 (555) 928-1200</p>
                            </div>
                        </div>
                        <div>
                            <ul className="space-y-4 text-sm text-luxe-gray uppercase tracking-widest font-medium">
                                <li><Link to="/fleet" className="hover:text-white transition-colors">The Fleet</Link></li>
                                <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
                                <li><Link to="/concierge" className="hover:text-white transition-colors">Concierge</Link></li>
                                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Newsletter</h4>
                            <div className="flex">
                                <input type="email" placeholder="Email Address"
                                    className="bg-transparent border-b border-white/20 text-white text-sm py-3 w-full focus:outline-none focus:border-luxe-gold transition-colors" />
                                <button className="text-luxe-gold text-sm font-bold uppercase tracking-widest ml-4 hover:text-white transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-8 border-t border-white/5 text-[10px] text-luxe-gray uppercase tracking-widest font-medium">
                        <p>© 2024 LUXEDIVE. ALL RIGHTS RESERVED.</p>
                        <div className="flex gap-6">
                            <Link to="/legal/privacy" className="hover:text-white">Privacy Policy</Link>
                            <Link to="/legal/terms" className="hover:text-white">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
