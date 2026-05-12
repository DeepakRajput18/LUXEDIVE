import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Diamond, Calendar, MessageSquare, ArrowRight, Share2, Mail, Phone, Users, Car, Clock, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { InfiniteScrollingGallery } from '../../components/ui/InfiniteScrollingGallery';

export default function WeddingCollection() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#D4AF37]/30">
            {/* TOP NAV ... */}
            <div className="fixed top-0 left-0 right-0 h-20 bg-[#0a0a0a]/90 backdrop-blur-md z-50 border-b border-white/5 flex items-center justify-between px-8">
                <div className="text-xl font-serif text-white tracking-widest cursor-pointer" onClick={() => navigate('/')}>LUXEDIVE</div>
                <div className="flex items-center justify-center gap-4 text-[10px] uppercase font-bold tracking-[0.3em] text-[#D4AF37] hidden md:flex">
                    <span className="w-8 h-px bg-[#D4AF37]/50"></span>
                    THE WEDDING COLLECTION
                    <span className="w-8 h-px bg-[#D4AF37]/50"></span>
                </div>
                <Button onClick={() => navigate('/wedding/inquiry')} className="bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black uppercase tracking-widest text-[10px] font-bold h-9 px-6 transition-all duration-300">
                    Book Now
                </Button>
            </div>

            {/* 1. Cinematic Hero Section */}
            <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        src="https://www.montereytouringvehicles.com/wp-content/uploads/2020/09/rolls-royce-classic-wedding-rental-cars-monterey-ca-mtv-scaled.jpg"
                        alt="Wedding Elegance"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-black/30"></div>
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="relative z-10 text-center px-6 max-w-4xl pt-20"
                >
                    <div className="flex items-center justify-center gap-4 text-[10px] sm:text-xs font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-6 drop-shadow-md">
                        LUXEDIVE WEDDING COLLECTION
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 tracking-tight drop-shadow-xl">
                        Arrive in <br /><span className="italic font-light">Timeless Elegance</span>
                    </h1>

                    <div className="flex justify-center mb-8">
                        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
                    </div>

                    <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-md">
                        A grand entrance crafted for your most unforgettable day. Discover the perfect companion to begin your legacy.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button
                            onClick={() => {
                                document.getElementById('fleet-showcase')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300"
                        >
                            Explore Wedding Fleet
                        </button>
                        <button
                            onClick={() => navigate('/wedding/inquiry')}
                            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white text-xs font-bold uppercase tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
                        >
                            Book Your Date
                        </button>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
                        <motion.div
                            animate={{ y: [0, 48] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="absolute top-0 left-0 w-full h-1/2 bg-[#D4AF37]"
                        />
                    </div>
                </motion.div>
            </div>

            {/* 2. Love Story Section */}
            <section className="py-24 md:py-32 relative bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="order-2 lg:order-1 relative"
                        >
                            <div className="aspect-[3/4] overflow-hidden rounded-sm relative shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1542042161784-26ab9e041e89?q=80&w=800" alt="Wedding Car" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 border border-white/10 m-4"></div>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-[#D4AF37]/30 border-t-0 border-l-0 z-0 hidden md:block"></div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="order-1 lg:order-2 lg:pl-12"
                        >
                            <div className="flex items-center gap-4 text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-6">
                                <span className="w-8 h-px bg-[#D4AF37]/50"></span>
                                THE EXPERIENCE
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                                Your Grand Entrance <br />Begins Here
                            </h2>
                            <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
                                <p>
                                    Every detail of your wedding day is a reflection of your unique love story. At LUXEDIVE, we believe your arrival should be as breathtaking as the journey you are embarking upon.
                                </p>
                                <p>
                                    Our collection of premium vehicles offers more than just transportation; they provide presence, elegance, and an unforgettable legacy. Let our professional chauffeurs ensure your entrance is seamless, allowing you to savor every miraculous moment.
                                </p>
                            </div>
                            <div className="mt-10">
                                <Diamond className="w-8 h-8 text-[#D4AF37] opacity-50" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Wedding Fleet Showcase */}
            <section id="fleet-showcase" className="py-24 bg-[#050505] relative border-y border-white/5">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">The Wedding Fleet</h2>
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-[1px] bg-[#D4AF37]/50"></div>
                        </div>
                        <p className="text-gray-400 font-light max-w-2xl mx-auto">Select a masterpiece that resonates with your vision.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group cursor-pointer relative"
                            onClick={() => navigate('/fleet?brands=Rolls Royce,Bentley')}
                        >
                            <div className="h-[500px] overflow-hidden relative border border-white/10 group-hover:border-[#D4AF37]/50 transition-colors duration-500 rounded-sm">
                                <img src="https://vintagecarforwedding.com/wp-content/uploads/2021/06/Honeyview__LAK8572-2.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" alt="Classic Vintage" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-8 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest mb-3">Heritage Collection</div>
                                    <h3 className="text-3xl font-serif text-white mb-2">The Classic Vintage</h3>
                                    <div className="w-0 h-[1px] bg-[#D4AF37] mx-auto mb-4 group-hover:w-16 transition-all duration-500"></div>
                                    <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-6">For the Royal Arrival</p>

                                    <div className="inline-flex items-center text-xs uppercase tracking-widest text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        Explore Collection <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            whileHover={{ y: -10 }}
                            className="group cursor-pointer relative mt-0 md:mt-12"
                            onClick={() => navigate('/fleet?brands=Mercedes-Benz,BMW')}
                        >
                            <div className="h-[500px] overflow-hidden relative border border-white/10 group-hover:border-[#D4AF37]/50 transition-colors duration-500 rounded-sm">
                                <img src="https://images-cdn.easyweddings.com.au/s3/prod-ew-image-global-v2/Live/ImageUploader/crop-7106c074-77b5-69e1-3080-556a681aa90a-be04c7dd-91c7-4305-bc94-03001cd44818.JPG?quality=80&format=jpg&mode=crop&autorotate=true&crop=0,0,0,0&width=2048" className="w-full h-full object-cover object-[85%_center] transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" alt="Contemporary" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-8 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest mb-3">Contemporary Collection</div>
                                    <h3 className="text-3xl font-serif text-white mb-2">Modern Elegance</h3>
                                    <div className="w-0 h-[1px] bg-[#D4AF37] mx-auto mb-4 group-hover:w-16 transition-all duration-500"></div>
                                    <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-6">For Modern Sophistication</p>

                                    <div className="inline-flex items-center text-xs uppercase tracking-widest text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        Explore Collection <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            whileHover={{ y: -10 }}
                            className="group cursor-pointer relative"
                            onClick={() => navigate('/fleet?brands=Lamborghini,Ferrari')}
                        >
                            <div className="h-[500px] overflow-hidden relative border border-white/10 group-hover:border-[#D4AF37]/50 transition-colors duration-500 rounded-sm">
                                <img src="https://media2.insideweddings.com/images/33d31b9c6d31d34f513c7fb2e89321d9.original.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" alt="Performance" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-8 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest mb-3">Performance Collection</div>
                                    <h3 className="text-3xl font-serif text-white mb-2">Sports Arrival</h3>
                                    <div className="w-0 h-[1px] bg-[#D4AF37] mx-auto mb-4 group-hover:w-16 transition-all duration-500"></div>
                                    <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-6">For Performance Presence</p>

                                    <div className="inline-flex items-center text-xs uppercase tracking-widest text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        Explore Collection <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* 4. Why Choose LUXEDIVE */}
            <section className="py-24 relative overflow-hidden bg-[#0a0a0a]">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-serif text-white mb-4">The LUXEDIVE Difference</h2>
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-[1px] bg-[#D4AF37]/50"></div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37] stroke-[1.5]" />, title: "Impeccable Reliability", text: "Guaranteed on-time arrival with a backup vehicle ready on standby." },
                            { icon: <Users className="w-6 h-6 text-[#D4AF37] stroke-[1.5]" />, title: "Elite Chauffeurs", text: "Professionally trained, flawlessly attired, and dedicated to your comfort." },
                            { icon: <Car className="w-6 h-6 text-[#D4AF37] stroke-[1.5]" />, title: "Bespoke Decoration", text: "Tasteful floral and ribbon arrangements tailored to your wedding theme." },
                            { icon: <Clock className="w-6 h-6 text-[#D4AF37] stroke-[1.5]" />, title: "Flexible Packages", text: "Hourly and day-long reservations designed around your precise schedule." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="text-center p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-sm"
                            >
                                <div className="w-16 h-16 mx-auto border border-[#D4AF37]/30 rounded-full flex items-center justify-center mb-6 bg-[#D4AF37]/5 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-serif text-white mb-3">{item.title}</h3>
                                <p className="text-sm text-gray-400 font-light leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Wedding Moments Gallery */}
            <section className="py-24 bg-[#050505] border-t border-white/5">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center justify-center mb-12 text-center"
                    >
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-4">
                                <span className="w-8 h-px bg-[#D4AF37]/50 hidden sm:block"></span>
                                INSPIRATION
                                <span className="w-8 h-px bg-[#D4AF37]/50 hidden sm:block"></span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif text-white">Moments in Motion</h2>
                        </div>
                    </motion.div>

                    <InfiniteScrollingGallery images={[
                        "https://hyderabadluxuryweddingcar.com/assets/img/modern-cab-wedding-cars.jpg",
                        "https://www.premiercarriage.co.uk/uploads/2025/02/14/classic-vintage-wedding-cars-for-hire.webp",
                        "https://vintagecarforwedding.com/wp-content/uploads/elementor/thumbs/vintage-car-for-wedding-p5u8s02b3dw9o1em1smk4fr6hb3nlms3eramfpv594.jpg",
                        "https://assets.easyweddings.com/files/2021/10/31051345/triple-r-luxury-car-hire-wedding-cars.jpg",
                        "https://miro.medium.com/v2/resize:fit:1200/1*oXDxnjHrb28iXVe2Y4jRkQ.jpeg",
                        "https://static01.nyt.com/images/2023/07/16/multimedia/TRADITIONS-CANS-cqbw/TRADITIONS-CANS-cqbw-videoSixteenByNineJumbo1600.jpg",
                        "https://sidhuweddingcars.com/wp-content/uploads/2023/01/Rolls-Royce-Phantom-768x444.jpg",
                        "https://pagesix.com/wp-content/uploads/sites/3/2022/09/fast-furious-wedding-032.jpg",
                        "https://www.rockmywedding.co.uk/1200x1200/5016/6323/8992/how-to-decorate-a-wedding-car.jpg?fit=1",
                        "https://images.pexels.com/photos/10182899/pexels-photo-10182899.jpeg?auto=compress&cs=tinysrgb&w=1920",
                        "https://images.pexels.com/photos/2504917/pexels-photo-2504917.jpeg?auto=compress&cs=tinysrgb&w=1920",
                        "https://images.pexels.com/photos/32392454/pexels-photo-32392454.jpeg?auto=compress&cs=tinysrgb&w=1920",
                        "https://images.pexels.com/photos/32392455/pexels-photo-32392455.jpeg?auto=compress&cs=tinysrgb&w=1920",
                        "https://images.pexels.com/photos/26757790/pexels-photo-26757790.jpeg?auto=compress&cs=tinysrgb&w=1920"
                    ]} />
                </div>
            </section>


            {/* FOOTER */}
            <footer className="border-t border-white/5 py-12 bg-black">
                <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <span className="text-xl font-serif text-white tracking-widest">LUXEDIVE</span>
                        <span className="text-[10px] text-gray-600 uppercase tracking-widest">© 2026 LUXEDIVE LUXURY RENTALS. ALL RIGHTS RESERVED.</span>
                    </div>
                    <div className="flex gap-6 text-gray-400">
                        <button className="hover:text-[#D4AF37] transition-colors"><Share2 className="w-5 h-5" /></button>
                        <button className="hover:text-[#D4AF37] transition-colors"><Mail className="w-5 h-5" /></button>
                        <button className="hover:text-[#D4AF37] transition-colors"><Phone className="w-5 h-5" /></button>
                    </div>
                </div>
            </footer>
        </div>
    )
}
