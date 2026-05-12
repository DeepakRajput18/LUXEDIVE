import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Diamond,
    ShieldCheck,
    Sparkles,
    Gauge,
    Palette,
    Clock,
    Award,
    ArrowRight,
    ChevronDown
} from 'lucide-react';

const OurStory: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">

            {/* Navigation Overlay (Assuming shared layout but explicitly handling here for standalone preview) */}
            <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference text-white">
                <h1 className="text-xl font-serif font-bold tracking-widest cursor-pointer" onClick={() => navigate('/')}>LUXEDIVE</h1>
                <button className="text-sm font-medium tracking-widest hover:opacity-70" onClick={() => navigate('/')}>CLOSE</button>
            </header>

            <main>

                {/* Hero Section */}
                <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80"
                        alt="Luxury Car Front"
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />

                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                        <p className="text-sm md:text-base text-gray-400 font-medium tracking-[0.2em] mb-6 uppercase">Est. 2012</p>
                        <h1 className="text-5xl md:text-8xl font-serif font-medium mb-6 leading-tight">
                            The LUXEDIVE <br /> <span className="italic relative">Story<span className="absolute -bottom-2 left-0 right-0 h-1 bg-white/20 skew-x-12"></span></span>
                        </h1>
                        <p className="text-lg md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                            Redefining luxury mobility in Ahmedabad. Where engineering perfection meets white-glove service.
                        </p>
                    </div>

                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
                        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
                        <ChevronDown className="w-4 h-4" />
                    </div>
                </section>

                {/* Mission Statement */}
                <section className="py-32 bg-black relative">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <Diamond className="w-8 h-8 text-blue-500 mx-auto mb-10" />
                        <blockquote className="text-3xl md:text-5xl font-serif leading-tight text-white mb-10">
                            "We don't just rent cars; we curate experiences. Every journey should be an occasion, every mile a memory."
                        </blockquote>
                        <cite className="text-sm font-bold tracking-widest text-gray-500 not-italic uppercase">
                            &mdash; The LUXEDIVE Manifesto
                        </cite>
                    </div>
                </section>

                {/* Our Vision & Founders */}
                <section className="py-24 bg-[#0F1218]">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-serif">A Vision of Excellence</h2>
                            <div className="w-20 h-1 bg-blue-600" />
                            <p className="text-gray-400 leading-relaxed text-lg">
                                Founded on the belief that access to the world's finest machinery should be seamless and dignified. LUXEDIVE began as a private club for enthusiasts and has evolved into India's premier luxury mobility service.
                            </p>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                We are driven by a singular obsession: to provide an automotive experience that is as flawless as the vehicles we curate. From the scent of the leather to the precision of the delivery, no detail is too small.
                            </p>
                            <button className="group flex items-center gap-3 text-white font-medium tracking-wide pt-4 hover:opacity-80">
                                READ OUR FULL MANIFESTO <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/5] bg-gray-900 rounded-sm overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"
                                    alt="Founding Team"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white text-black p-6 shadow-xl max-w-xs">
                                <p className="font-serif text-xl italic mb-2">"Excellence is not an act, but a habit."</p>
                                <p className="text-xs font-bold tracking-wider uppercase opacity-60">The Founding Team</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Fleet Standards (4 Pillars) */}
                <section className="py-32 bg-black border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                            <div>
                                <span className="text-blue-500 font-mono text-sm mb-4 block">THE GOLD STANDARD</span>
                                <h2 className="text-4xl md:text-5xl font-serif">The Four Pillars</h2>
                            </div>
                            <p className="text-gray-500 max-w-md text-sm leading-relaxed">
                                Every vehicle in our fleet must pass a rigorous certification process before it is presented to a client. This is the LUXEDIVE promise.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {[
                                { icon: ShieldCheck, title: 'Safety First', desc: '100+ point mechanical inspection before every single handover.' },
                                { icon: Sparkles, title: 'Impeccable Hygiene', desc: 'Medical-grade sanitization and detailing standards.' },
                                { icon: Gauge, title: 'Peak Performance', desc: 'Maintained strictly by authorized dealerships to factory spec.' },
                                { icon: Palette, title: 'Aesthetic Detail', desc: 'Protected by ceramic coatings and PPF for a showroom finish.' }
                            ].map((pillar, idx) => (
                                <div key={idx} className="group cursor-default">
                                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-8 group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-colors">
                                        <pillar.icon className="w-8 h-8 text-white group-hover:text-blue-500 transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-serif mb-4">{pillar.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{pillar.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-20 text-center">
                            <button className="px-8 py-3 border border-white/20 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-all">
                                VIEW FULL CHECKLIST
                            </button>
                        </div>
                    </div>
                </section>

                {/* Our Heritage Timeline */}
                <section className="py-32 bg-[#0F1218] overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative p-12 bg-[#1A1F2E] rounded-2xl border border-white/5">
                            <div className="absolute top-0 right-0 p-6 opacity-20">
                                <Clock className="w-32 h-32" />
                            </div>
                            <div className="relative z-10 space-y-12">
                                {[
                                    { year: '2012', title: 'Inception', desc: 'Started with 2 cars: A Ghost and a 911.' },
                                    { year: '2016', title: 'Expansion', desc: 'First corporate partnership and fleet growth to 20 units.' },
                                    { year: '2020', title: 'Digital First', desc: 'Launch of the LUXEDIVE app and contactless booking.' },
                                    { year: '2023', title: 'The Wedding Collection', desc: 'Dedicated bespoke service for grand occasions.' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <span className="text-2xl font-serif text-blue-500/50 group-hover:text-blue-500 transition-colors">{item.year}</span>
                                        <div>
                                            <h4 className="text-lg font-medium text-white mb-2">{item.title}</h4>
                                            <p className="text-gray-500 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <span className="text-xs font-bold bg-white text-black px-3 py-1 mb-6 inline-block">SINCE 2012</span>
                            <h2 className="text-4xl font-serif mb-8">A Decade of Driving Dreams</h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                From a humble garage with two iconic vehicles to a fleet of over 150 masterpieces, our journey mirrors the aspirations of our clients. We have served over 5,000 distinct journeys, each one adding to our legacy.
                            </p>
                            <div className="flex gap-12 mt-12">
                                <div>
                                    <span className="block text-4xl font-serif text-white mb-2">150+</span>
                                    <span className="text-xs text-gray-500 uppercase tracking-widest">Vehicles</span>
                                </div>
                                <div>
                                    <span className="block text-4xl font-serif text-white mb-2">5k+</span>
                                    <span className="text-xs text-gray-500 uppercase tracking-widest">Journeys</span>
                                </div>
                                <div>
                                    <span className="block text-4xl font-serif text-white mb-2">12</span>
                                    <span className="text-xs text-gray-500 uppercase tracking-widest">Showrooms</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-40 bg-white text-black text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
                    <div className="relative z-10 max-w-3xl mx-auto px-6">
                        <Award className="w-12 h-12 mx-auto mb-8 text-black" />
                        <h2 className="text-5xl md:text-6xl font-serif mb-8">Ready for the Exceptional?</h2>
                        <p className="text-xl text-gray-600 mb-12 font-light">
                            Join the select few who experience the world from the best seats in motion.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <button
                                onClick={() => navigate('/fleet')}
                                className="px-8 py-4 bg-black text-white font-bold tracking-widest hover:bg-gray-800 transition-colors"
                            >
                                VIEW OUR FLEET
                            </button>
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-8 py-4 border-2 border-black text-black font-bold tracking-widest hover:bg-black hover:text-white transition-colors"
                            >
                                CONTACT CONCIERGE
                            </button>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default OurStory;
