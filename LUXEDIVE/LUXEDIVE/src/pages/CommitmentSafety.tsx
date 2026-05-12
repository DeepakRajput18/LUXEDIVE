import { Button } from '../components/ui/Button'
import { Check, Shield, Award, Users, AlertTriangle, Lock as LockIcon, Zap } from 'lucide-react'

export default function CommitmentSafety() {
    return (
        <div className="min-h-screen bg-[#FDFCF8] text-black">
            {/* HERO */}
            <div className="h-[70vh] relative flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2000"
                        className="w-full h-full object-cover brightness-[0.4]"
                        alt="Safety Hero"
                    />
                </div>
                <div className="relative z-10 text-center max-w-4xl px-6">
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight">Safety First, <br />Luxury Always</h1>
                    <p className="text-xl md:text-2xl text-gray-200 font-light mb-10 leading-relaxed max-w-2xl mx-auto">
                        Our unyielding dedication to your security and comfort. Every mile is backed by our obsessive standards.
                    </p>
                    <Button className="bg-luxe-gold text-black hover:bg-yellow-500 h-14 px-10 uppercase tracking-widest text-sm font-bold shadow-xl shadow-yellow-900/20">
                        Explore Our Fleet
                    </Button>
                </div>
            </div>

            {/* SECTION 1 - 50 Point Standard */}
            <section className="py-24 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="w-full md:w-1/2 relative group">
                            <div className="absolute -top-6 -left-6 bg-black text-white text-[10px] font-bold uppercase px-4 py-2 z-20 tracking-widest">
                                Fleet Certified
                            </div>
                            <div className="relative overflow-hidden rounded-sm">
                                <img
                                    src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=800"
                                    className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    alt="Mechanic"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <span className="text-luxe-gold text-[10px] uppercase tracking-[0.2em] font-bold block mb-4">Maintenance Excellence</span>
                            <h2 className="text-4xl font-serif mb-6 text-gray-900">The 50-Point Standard</h2>
                            <p className="text-gray-600 leading-relaxed mb-10 text-lg font-light">
                                Every vehicle undergoes a rigorous 50-point mechanical and cosmetic inspection before a single key is turned. From fluid analysis to brake testing, perfection is our baseline.
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-10">
                                {[
                                    'Fluid Analysis',
                                    'Brake Performance',
                                    'Tire Integrity',
                                    'Cosmetic Detailing'
                                ].map(item => (
                                    <div key={item} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                                        </div>
                                        <span className="text-sm font-medium uppercase tracking-wide text-gray-800">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <a href="#" className="text-sm font-bold uppercase tracking-widest border-b-2 border-luxe-gold pb-1 hover:text-luxe-gold transition-colors inline-block">
                                View Full Checklist →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2 - Elite Chauffeurs */}
            <section className="py-24 px-6 bg-[#F5F5F0]">
                <div className="container mx-auto max-w-6xl text-center">
                    <h2 className="text-4xl font-serif mb-4 text-gray-900">ELITE PERSONNEL<br /><span className="text-gray-500 italic text-2xl block mt-2">More Than Drivers. Ambassadors.</span></h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-16 font-light">
                        Our chauffeurs are selected through an industry-leading vetting process, ensuring discretion, safety, and unmatched professionalism.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { title: 'Background Verification', icon: Shield, desc: 'Comprehensive criminal and driving record checks spanning 10 years.' },
                            { title: 'Advanced Driving Course', icon: Users, desc: 'Defensive driving certifications and emergency maneuvers. Trained on track.' },
                            { title: 'Etiquette Training', icon: Award, desc: 'Protocol training for VIP handling, confidentiality, and luxury service standards.' },
                            { title: 'Service Certification', icon: Check, desc: 'Final examinations to operate high-end vehicles with active clients.' },
                        ].map((step, i) => (
                            <div key={i} className="bg-white p-8 rounded shadow-sm hover:shadow-xl transition-shadow duration-300 relative group">
                                <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full mx-auto mb-6 text-xl font-serif relative z-10">
                                    {i + 1}
                                </div>
                                <h3 className="text-lg font-serif mb-4">{step.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed font-light">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3 - Insurance */}
            <section className="py-24 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif mb-4 text-gray-900">Comprehensive Peace of Mind</h2>
                        <p className="text-gray-600 font-light">Industry-leading insurance coverage included with every reservation.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <Shield className="w-12 h-12 mx-auto text-emerald-600 mb-6" />
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Zero Deductible</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">Full collision and liability coverage with absolutely zero out-of-pocket costs for our clients in the event of an accident.</p>
                        </div>
                        <div className="text-center">
                            <Zap className="w-12 h-12 mx-auto text-blue-600 mb-6" />
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">24/7 Roadside</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">Immediate dispatch assistance for flat tires, battery jumps, or fuel delivery, available anywhere within our service regions.</p>
                        </div>
                        <div className="text-center">
                            <LockIcon className="w-12 h-12 mx-auto text-purple-600 mb-6" />
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Total Protection</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">Comprehensive protection against theft, vandalism, and weather damage, ensuring you are never liable for factors outside your control.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="py-24 px-6 bg-black text-white text-center">
                <div className="container mx-auto max-w-4xl">
                    <span className="text-6xl font-serif text-luxe-gold opacity-30 block mb-6">"</span>
                    <p className="text-2xl md:text-4xl font-serif leading-tight mb-12 text-gray-200">
                        My personal guarantee is that every journey meets the LUXEDIVE gold standard. We don't just rent cars; we engineer peace of mind.
                    </p>
                    <div>
                        <p className="font-serif text-2xl text-luxe-gold italic mb-2">Vikram Singh Adani</p>
                        <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500">Vikram Singh Adani, CEO</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <div className="bg-[#121212] py-8 text-center border-t border-white/10">
                <p className="text-[10px] text-gray-600 uppercase tracking-widest text-[#FDFCF8]">
                    © 2026 LUXEDIVE. All rights reserved. | <a href="#" className="hover:text-white">Privacy Policy</a>, <a href="#" className="hover:text-white">Terms of Service</a>
                </p>
            </div>
        </div>
    )
}
