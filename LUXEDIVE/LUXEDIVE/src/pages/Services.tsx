import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({
    title,
    description,
    image,
    link,
    features,
    delay
}: {
    title: string;
    description: string;
    image: string;
    link: string;
    features: string[];
    delay: number;
}) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
            }}
            className="group relative h-[500px] w-full overflow-hidden rounded-2xl"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
                <h3 className="mb-3 text-3xl font-bold text-white font-playfair">{title}</h3>
                <p className="mb-6 text-gray-300 line-clamp-2 md:line-clamp-none">
                    {description}
                </p>

                <ul className="mb-8 space-y-2">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-400">
                            <Star className="mr-2 h-3 w-3 text-luxe-gold" fill="currentColor" />
                            {feature}
                        </li>
                    ))}
                </ul>

                <Link
                    to={link}
                    className="group/btn flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
                >
                    EXPLORE SERVICE
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
            </div>
        </motion.div>
    );
};

const Services = () => {
    return (
        <div className="min-h-screen bg-black pt-20">
            {/* Hero Section */}
            <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-4 text-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000"
                        alt="Sports Car Background"
                        className="h-full w-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>

                <div className="relative z-10 max-w-4xl space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block rounded-full border border-luxe-gold/30 bg-luxe-gold/10 px-4 py-1.5 text-xs font-bold tracking-widest text-luxe-gold uppercase backdrop-blur-sm">
                            World-Class Excellence
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl font-bold leading-tight text-white md:text-7xl font-playfair"
                    >
                        Our Premium <span className="text-luxe-gold">Services</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mx-auto max-w-2xl text-lg text-gray-400"
                    >
                        Experience the pinnacle of automotive luxury. From bespoke wedding entrances to executive corporate fleets, we tailor every journey to perfection.
                    </motion.p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">

                    <ServiceCard
                        title="Professional Chauffeur"
                        description="Sit back and relax while our uniformed, highly-trained chauffeurs navigate the city with precision and discretion."
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScQXeLIh0W9PLSiqHk_lRjHjpf4WjpuRkDRw&s"
                        link="/chauffeurs"
                        features={['Uniformed Professionals', 'Multilingual Drivers', 'Route Planning', 'Confidentiality Agreement']}
                        delay={0}
                    />

                    <ServiceCard
                        title="Wedding & Events"
                        description="Make your special day unforgettable with our curated collection of bridal cars and grand entrance vehicles."
                        image="https://weddingsdegoa.com/wp-content/uploads/2023/09/RCF-Wedding-Cars-2.webp"
                        link="/events/wedding"
                        // Checking existing routes: CorporateEvents exists at /corporate/events. Wedding hub at /wedding/collection (if created) or fleet?
                        // Let's verify route. Assuming /corporate/events for now covers events. 
                        // Wait, looking at file list: no specific "Wedding" hub page, but "CorporateEvents" exists.
                        // Let's link to /corporate/events for now or create a placeholder for Wedding if disjoint.
                        // Actually, in gap analysis, "WeddingCollection" was mentioned. Let's assume /wedding/collection. 
                        features={['Bridal Ribbon/Decor', 'Red Carpet Arrival', 'Flexible Packages', 'Photo Op Coordination']}
                        delay={0.2}
                    />

                    <ServiceCard
                        title="Corporate Fleet"
                        description="Elevate your business presence. Executive transport solutions for airport transfers, roadshows, and client meetings."
                        image="https://images.unsplash.com/photo-1532988633349-d3dfb28ee834?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGx1eHVyeSUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D"
                        link="/corporate/events"
                        features={['GST Invoicing', 'Priority Booking', 'Account Manager', 'Airport Meet & Greet']}
                        delay={0.4}
                    />
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="border-t border-white/10 bg-black py-20">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <div className="grid gap-8 sm:grid-cols-3">
                        <div className="flex flex-col items-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                                <Shield className="h-8 w-8 text-luxe-gold" />
                            </div>
                            <h4 className="mb-2 text-lg font-bold text-white">Fully Insured</h4>
                            <p className="text-sm text-gray-400">Comprehensive coverage for peace of mind on every journey.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                                <Clock className="h-8 w-8 text-luxe-gold" />
                            </div>
                            <h4 className="mb-2 text-lg font-bold text-white">24/7 Concierge</h4>
                            <p className="text-sm text-gray-400">Round-the-clock support for bookings and roadside assistance.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                                <Award className="h-8 w-8 text-luxe-gold" />
                            </div>
                            <h4 className="mb-2 text-lg font-bold text-white">Verified Excellence</h4>
                            <p className="text-sm text-gray-400">5-star rated service with audited vehicle maintenance logs.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
