import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Star, Lock as LockIcon, Zap } from 'lucide-react';

const FadeInSection = ({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            });
        }, { threshold: 0.15 });

        const currentRef = domRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default function HistoryPage() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-[#0B0D10] text-white min-h-screen font-sans selection:bg-[#D4AF37]/30 selection:text-white overflow-x-hidden">
            {/* Minimal Header */}
            <div className="fixed top-0 left-0 w-full z-50 p-[24px] flex justify-between items-center bg-gradient-to-b from-[#0B0D10]/90 to-transparent pointer-events-none">
                <Link to="/" className="text-[20px] font-serif tracking-[0.2em] font-bold text-white pointer-events-auto hover:text-[#D4AF37] transition-colors drop-shadow-md">
                    LUXE<span className="text-[#D4AF37]">DIVE</span>
                </Link>
            </div>

            {/* SECTION 1 - CINEMATIC HERO */}
            <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0B0D10]">
                {/* Parallax Image Wrapper */}
                <div
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                    style={{ transform: `translateY(${scrollY * 0.3}px)` }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop"
                        alt="Cinematic Luxury Car"
                        className="w-full h-auto max-h-[80vh] object-contain opacity-60"
                    />
                </div>

                {/* Dark overlay with blur-like gradient to soften edges */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/50 to-[#0B0D10]/20" />
                <div className="absolute inset-0 bg-[#0B0D10]/20 backdrop-blur-[2px]" />

                <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[24px] flex flex-col items-center justify-center text-center">
                    <FadeInSection>
                        <span className="inline-block px-[16px] py-[8px] border border-[#D4AF37]/50 text-[#D4AF37] text-[14px] font-bold tracking-[0.3em] mb-[24px] uppercase backdrop-blur-sm">
                            Heritage
                        </span>
                    </FadeInSection>
                    <FadeInSection delay={200}>
                        <h1 className="text-[48px] md:text-[60px] font-serif text-white mb-[24px] leading-[1.2] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            The Birth of LUXEDIVE
                        </h1>
                    </FadeInSection>
                    <FadeInSection delay={400}>
                        <p className="text-[18px] md:text-[20px] text-[#A0A0A0] font-light tracking-wide max-w-[800px] mx-auto leading-[1.8]">
                            Founded in 2026 with a vision to redefine luxury mobility.
                        </p>
                    </FadeInSection>
                </div>

                <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                    <div className="w-[1px] h-[60px] bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
                </div>
            </section>

            {/* SECTION 2 - THE BEGINNING (Text Left, Image Right) */}
            <section className="py-[60px] md:py-[100px] relative border-b border-white/5 bg-[#0B0D10]">
                <div className="w-full max-w-[1200px] mx-auto px-[24px]">
                    <div className="flex flex-col md:flex-row gap-[40px] md:gap-[80px] items-center">

                        <div className="w-full md:w-1/2">
                            <FadeInSection>
                                <div className="flex items-center gap-[16px] mb-[24px]">
                                    <div className="w-[40px] h-[1px] bg-[#D4AF37]" />
                                    <span className="text-[#D4AF37] text-[14px] font-bold tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">Genesis</span>
                                </div>
                                <h2 className="text-[32px] md:text-[36px] font-serif mb-[24px] leading-[1.3] text-white">
                                    2026 — Where It All Began
                                </h2>
                            </FadeInSection>

                            <FadeInSection delay={200}>
                                <div className="text-[18px] md:text-[20px] text-[#A0A0A0] font-light leading-[1.8]">
                                    <p className="mb-[24px]">
                                        LUXEDIVE was founded in 2026 in Ahmedabad with a bold vision — to bring ultra-luxury automotive experiences to India in a way never seen before.
                                    </p>
                                    <p className="mb-[24px]">
                                        What started as a curated collection of premium vehicles quickly evolved into a symbol of exclusivity, combining cutting-edge technology with timeless elegance.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        <div className="w-full md:w-1/2 flex justify-center items-center">
                            <FadeInSection delay={300} className="w-full">
                                <div className="relative w-full flex justify-center items-center group">
                                    <div className="absolute inset-0 bg-[#D4AF37]/5 mix-blend-overlay z-10" />
                                    <img
                                        src="https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2070&auto=format&fit=crop"
                                        alt="First Fleet Launch Concept"
                                        loading="lazy"
                                        className="w-full h-auto max-h-[80vh] object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-[1.02]"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-[24px] bg-gradient-to-t from-[#0B0D10] to-transparent z-20">
                                        <p className="text-[14px] text-white/70 font-bold tracking-[0.2em] uppercase text-center">The First Arrival - 2026</p>
                                    </div>
                                </div>
                            </FadeInSection>
                        </div>

                    </div>
                </div>
            </section>

            {/* SECTION 3 - BUILDING THE FLEET (Images Grid) */}
            <section className="py-[60px] md:py-[100px] relative border-b border-white/5 bg-[#0B0D10]">
                <div className="absolute inset-0 bg-[#ffffff] opacity-[0.01]" />
                <div className="w-full max-w-[1200px] mx-auto px-[24px] relative z-10">

                    <FadeInSection className="text-center mb-[80px] max-w-[800px] mx-auto">
                        <h2 className="text-[32px] md:text-[36px] font-serif mb-[24px] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                            Expanding the Extraordinary
                        </h2>
                        <p className="text-[18px] md:text-[20px] text-[#A0A0A0] font-light leading-[1.8] mb-[24px]">
                            Within months, LUXEDIVE expanded into exotic hypercars, wedding collections, and chauffeur-driven luxury services. The goal was never volume — it was perfection.
                        </p>
                    </FadeInSection>

                    <div className="flex flex-col md:flex-row gap-[24px] md:gap-[40px]">
                        <FadeInSection delay={100} className="w-full md:w-1/3 flex justify-center items-center">
                            <div className="relative w-full group overflow-hidden bg-[#000]">
                                <img src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1974&auto=format&fit=crop" alt="Hypercar" loading="lazy" className="w-full h-auto max-h-[80vh] md:aspect-[3/4] object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                                <div className="absolute inset-0 bg-[#0B0D10]/40 group-hover:bg-transparent transition-colors duration-500" />
                                <div className="absolute bottom-[24px] left-[24px]">
                                    <p className="text-[#D4AF37] text-[14px] font-bold tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Hypercar Division</p>
                                </div>
                            </div>
                        </FadeInSection>

                        <FadeInSection delay={300} className="w-full md:w-1/3 flex justify-center items-center md:mt-[40px]">
                            <div className="relative w-full group overflow-hidden bg-[#000]">
                                <img src="https://images.unsplash.com/photo-1715791645661-9fb6fb03b06f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHdlZGRpbmclMjBjYXJ8ZW58MHx8MHx8fDA%3D" alt="Wedding Fleet" loading="lazy" className="w-full h-auto max-h-[80vh] md:aspect-[3/4] object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                                <div className="absolute inset-0 bg-[#0B0D10]/40 group-hover:bg-transparent transition-colors duration-500" />
                                <div className="absolute bottom-[24px] left-[24px]">
                                    <p className="text-[#D4AF37] text-[14px] font-bold tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Wedding Collection</p>
                                </div>
                            </div>
                        </FadeInSection>

                        <FadeInSection delay={500} className="w-full md:w-1/3 flex justify-center items-center">
                            <div className="relative w-full group overflow-hidden bg-[#000]">
                                <img src="https://plus.unsplash.com/premium_photo-1661507156446-364c353f6799?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmVzc2lvbmFsJTIwY2hhdWZmZXVyJTIwZ3JvdXB8ZW58MHx8MHx8fDA%3D" alt="Chauffeur Services" loading="lazy" className="w-full h-auto max-h-[80vh] md:aspect-[3/4] object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                                <div className="absolute inset-0 bg-[#0B0D10]/40 group-hover:bg-transparent transition-colors duration-500" />
                                <div className="absolute bottom-[24px] left-[24px]">
                                    <p className="text-[#D4AF37] text-[14px] font-bold tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Executive Chauffeur</p>
                                </div>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* SECTION 4 - TRUST & EXCELLENCE (Image Left, Text Right) */}
            <section className="py-[60px] md:py-[100px] border-b border-white/5 relative bg-[#0B0D10]">
                <div className="w-full max-w-[1200px] mx-auto px-[24px]">
                    <div className="flex flex-col md:flex-row gap-[40px] md:gap-[80px] items-stretch">

                        <div className="w-full md:w-1/2 flex order-2 md:order-1 items-center justify-center">
                            <FadeInSection delay={200} className="w-full flex justify-center">
                                <div className="relative w-full h-full flex flex-col justify-center items-center group perspective-1000">
                                    {/* Gold glowing backdrop to separate the "sticker" from the black background */}
                                    <div className="absolute inset-x-0 bottom-[10%] h-[40%] bg-[#D4AF37]/20 blur-[80px] rounded-full group-hover:bg-[#D4AF37]/30 transition-all duration-1000" />
                                    <img
                                        src="/f1-car.png"
                                        alt="F1 Front View Cinematic Sticker"
                                        loading="lazy"
                                        className="relative z-10 w-full h-auto max-h-[80vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,1)] hover:scale-[1.03] transition-all duration-1000 mix-blend-screen opacity-100"
                                    />
                                    {/* Additional ambient shadow ground effect */}
                                    <div className="absolute bottom-0 w-[80%] h-[20px] bg-black/80 blur-[20px] rounded-[100%]" />
                                </div>
                            </FadeInSection>
                        </div>

                        <div className="w-full md:w-1/2 order-1 md:order-2 flex flex-col justify-center">
                            <FadeInSection className="mb-[40px]">
                                <span className="inline-block px-[16px] py-[8px] border border-[#D4AF37]/30 text-[#D4AF37] text-[14px] font-bold tracking-[0.3em] mb-[24px] uppercase">
                                    The Standard
                                </span>
                                <h2 className="text-[32px] md:text-[36px] font-serif text-white mb-[24px]">Driven by Trust</h2>
                            </FadeInSection>

                            <div className="flex flex-col gap-[40px]">
                                {[
                                    { icon: Shield, title: "Verified Chauffeurs", desc: "Rigorous background checks and elite training for absolute safety and discretion." },
                                    { icon: Star, title: "Premium Members", desc: "An exclusive community of discerning individuals who demand the very best." },
                                    { icon: LockIcon, title: "AES-256 Vault", desc: "Military-grade encryption securing every transaction and personal detail." },
                                    { icon: Zap, title: "Seamless Tech", desc: "Frictionless booking technology merging analog luxury with digital perfection." }
                                ].map((feature, idx) => (
                                    <FadeInSection key={idx} delay={idx * 150} className="flex flex-col sm:flex-row items-start gap-[24px] group">
                                        <div className="shrink-0 mt-[4px]">
                                            <feature.icon className="w-[32px] h-[32px] text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors duration-500 drop-shadow-[0_0_5px_rgba(212,175,55,0.2)]" />
                                        </div>
                                        <div>
                                            <h3 className="text-[20px] md:text-[24px] font-serif mb-[8px] text-white/90 group-hover:text-white transition-colors">{feature.title}</h3>
                                            <p className="text-[16px] md:text-[18px] text-[#A0A0A0] leading-[1.8] font-light">{feature.desc}</p>
                                        </div>
                                    </FadeInSection>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* SECTION 5 - TODAY & BEYOND (Full Width Cinematic) */}
            <section className="relative min-h-screen w-full flex items-center justify-center bg-[#0B0D10] overflow-hidden">
                {/* Subtle background image */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center mix-blend-screen opacity-50">
                    <img
                        src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop"
                        alt="Future of Luxury"
                        loading="lazy"
                        className="w-full h-auto max-h-[80vh] object-contain grayscale"
                    />
                </div>

                {/* Gradients to blend it completely into black on edges */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D10] via-transparent to-[#0B0D10]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/80 to-[#0B0D10]/20" />

                <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[24px] text-center flex flex-col items-center justify-center py-[100px]">
                    <FadeInSection>
                        <h2 className="text-[40px] md:text-[60px] font-serif mb-[24px] leading-[1.2] text-white">
                            The Future of <br /><span className="text-[#D4AF37] italic drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">Luxury Mobility</span>
                        </h2>
                    </FadeInSection>
                    <FadeInSection delay={200}>
                        <p className="text-[18px] md:text-[20px] text-[#A0A0A0] font-light leading-[1.8] mb-[80px] max-w-[800px] mx-auto">
                            From hypercars to electric performance icons, LUXEDIVE continues to redefine what it means to arrive in style.
                        </p>
                    </FadeInSection>
                    <FadeInSection delay={400} className="flex flex-col items-center w-full">
                        <div className="w-[80px] md:w-[120px] h-[1px] bg-[#D4AF37] mb-[40px] shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                        <p className="text-[24px] md:text-[32px] font-serif text-white tracking-wide italic">
                            "This is not just a ride. This is LUXEDIVE."
                        </p>
                    </FadeInSection>
                </div>
            </section>

            {/* Footer Navigation */}
            <div className="bg-[#0B0D10] py-[80px] flex justify-center relative z-20 border-t border-white/5">
                <FadeInSection>
                    <Link
                        to="/about"
                        className="group flex items-center gap-[16px] px-[32px] py-[16px] border border-white/20 hover:border-[#D4AF37] transition-all duration-300 rounded-sm hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(212,175,55,0.1)]"
                    >
                        <ArrowLeft className="w-[20px] h-[20px] text-[#A0A0A0] group-hover:text-[#D4AF37] group-hover:-translate-x-1 transition-all" />
                        <span className="text-[14px] font-bold tracking-[0.2em] uppercase text-white">Back to About</span>
                    </Link>
                </FadeInSection>
            </div>
        </div>
    );
}
