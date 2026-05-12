import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Shield, PenTool, CheckCircle, Zap } from 'lucide-react'

// Image 8: Commitment & Safety Page
export default function Commitment() {
    return (
        <div className="bg-white text-black font-sans">
            {/* HERO */}
            <div className="relative h-[70vh] flex items-center">
                <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2574&auto=format&fit=crop"
                    className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Safety First, Luxury Always</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 font-light">
                        Our unyielding dedication to your security and comfort. Every mile is backed by our obsessive standards.
                    </p>
                    <Link to="/fleet">
                        <Button size="lg" className="bg-luxe-gold text-black border-none hover:bg-yellow-500">Explore Our Fleet</Button>
                    </Link>
                </div>
            </div>

            {/* SECTION 1 - 50 POINT */}
            <section className="py-24 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070" className="w-full rounded-sm grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl" />
                    <div className="absolute bottom-8 right-8 bg-white px-4 py-2 text-xs font-bold tracking-widest uppercase border border-black/10 shadow-lg">
                        Fleet Certified
                    </div>
                </div>
                <div>
                    <p className="text-luxe-gold text-sm font-bold tracking-widest uppercase mb-2">Maintenance Excellence</p>
                    <h2 className="text-4xl font-serif mb-6 text-gray-900">The 50-Point Standard</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                        Every vehicle undergoes a rigorous 50-point mechanical and cosmetic inspection before a single key is turned. From fluid analysis to brake testing, perfection is our baseline.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {['Fluid Analysis', 'Brake Performance', 'Tire Integrity', 'Cosmetic Detailing'].map(i => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-luxe-gold" />
                                <span className="font-medium text-gray-800">{i}</span>
                            </div>
                        ))}
                    </div>
                    <Button variant="ghost" className="text-luxe-gold hover:text-white p-0 h-auto font-bold uppercase tracking-widest text-xs">→</Button>
                </div>
            </section>

            {/* SECTION 2 - ELITE CHAUFFEURS */}
            <section className="py-24 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif mb-4 text-gray-900">ELITE PERSONNEL</h2>
                        <p className="text-gray-500">More Than Drivers. Ambassadors.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: Shield, title: "Background Verification", text: "Comprehensive criminal and driving record checks spanning 10 years." },
                            { icon: Zap, title: "Advanced Driving", text: "Defensive driving certifications and emergency maneuvers. Trained on track." },
                            { icon: PenTool, title: "Etiquette Training", text: "Protocol training for VIP handling, confidentiality, and luxury service standards." },
                            { icon: CheckCircle, title: "Service Certification", text: "Final examinations to operate high-end vehicles with active clients." }
                        ].map((item, i) => (
                            <div key={i} className="text-center p-8 bg-white border border-gray-100 shadow-sm rounded-xl">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <item.icon className="w-8 h-8 text-gray-800" />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-luxe-gold text-white font-bold flex items-center justify-center mx-auto -mt-10 mb-6 border-4 border-white">
                                    {i + 1}
                                </div>
                                <h3 className="text-lg font-serif mb-3 text-gray-900">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3 - INSURANCE */}
            <section className="py-24 container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif mb-4 text-gray-900">Comprehensive Peace of Mind</h2>
                    <p className="text-gray-500">Industry-leading insurance coverage included with every reservation.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2"><Shield className="w-5 h-5 text-luxe-gold" /> Zero Deductible</h3>
                        <p className="text-gray-600 leading-relaxed">Full collision and liability coverage with absolutely zero out-of-pocket costs for our clients in the event of an accident.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2"><Zap className="w-5 h-5 text-luxe-gold" /> 24/7 Roadside</h3>
                        <p className="text-gray-600 leading-relaxed">Immediate dispatch assistance for flat tires, battery jumps, or fuel delivery, available anywhere within our service regions.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5 text-luxe-gold" /> Total Protection</h3>
                        <p className="text-gray-600 leading-relaxed">Comprehensive protection against theft, vandalism, and weather damage, ensuring you are never liable for factors outside your control.</p>
                    </div>
                </div>
            </section>

            {/* TESTIMONIAL */}
            <section className="py-24 bg-black text-white text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <span className="text-6xl font-serif text-luxe-gold block mb-8">"</span>
                    <p className="text-3xl md:text-4xl font-serif leading-tight mb-12">
                        My personal guarantee is that every journey meets the LUXEDIVE gold standard. We don't just rent cars; we engineer peace of mind.
                    </p>
                    <div>
                        <p className="font-script text-4xl text-luxe-gray mb-2">Vikram Singh Adani</p>
                        <p className="text-xs font-bold tracking-widest uppercase">VIKRAM SINGH ADANI, CEO</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
