import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { blogService } from '../../services/blogService'
import type { BlogPost } from '../../services/blogService'
import { SeoHelmet } from '../../components/SeoHelmet'
import { Calendar, User, Clock, Star, Camera, Music, Shield, FileText, CheckCircle } from 'lucide-react'
import { Skeleton } from '../../components/ui/Skeleton'

export default function BlogPostPage() {
    const { slug } = useParams()
    const [post, setPost] = useState<BlogPost | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (slug) {
            blogService.getPostBySlug(slug).then(p => {
                setPost(p)
                setLoading(false)
            })
        }
    }, [slug])

    if (loading) return <div className="container py-20"><Skeleton className="h-[60vh]" /></div>

    // --- CONTENT FOR LUXURY CAR RENTAL TIPS ---
    if (slug === 'luxury-car-rental-tips-ahmedabad') {
        const rentalPost = {
            title: "The Insider's Guide to Renting a Luxury Car in Ahmedabad",
            excerpt: "Everything you need to know before booking that dream ride, from insurance to hidden clauses.",
            cover_image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop", // Mercedes Benz
            author: "LUXEDIVE Concierge",
            published_at: "2026-02-10",
            tags: ["Guide", "Tips", "Rental"]
        }

        return (
            <div className="min-h-screen bg-black text-white">
                <SeoHelmet title={rentalPost.title} description={rentalPost.excerpt} image={rentalPost.cover_image} />

                {/* HEADER IMAGE */}
                <div className="h-[70vh] relative">
                    <img src={rentalPost.cover_image} className="w-full h-full object-cover" alt="Luxury Car Rental Ahmedabad" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                        <div className="container mx-auto max-w-4xl">
                            <div className="flex flex-wrap gap-3 mb-6">
                                {rentalPost.tags.map((tag, idx) => (
                                    <span key={idx} className="px-4 py-1.5 bg-luxe-gold/20 text-luxe-gold text-xs font-bold uppercase tracking-wider rounded-full border border-luxe-gold/30">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight tracking-tight">The Insider's Guide to <span className="text-luxe-gold">Renting a Luxury Car</span> in Ahmedabad</h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
                                <span className="flex items-center gap-2"><User className="w-4 h-4" /> by {rentalPost.author}</span>
                                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(rentalPost.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 10 min read</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="container mx-auto max-w-4xl px-6 md:px-8 py-16">

                    {/* Introduction */}
                    <div className="mb-12">
                        <p className="text-2xl text-luxe-gray leading-relaxed font-serif italic border-l-4 border-luxe-gold pl-8 py-4 mb-8 bg-luxe-gold/5">
                            "Driving a luxury car isn't just about transportation; it's about the experience. The smell of premium leather, the roar of a V8 engine, and the way the world looks a little different from behind the wheel of a masterpiece."
                        </p>

                        <p className="text-lg text-gray-300 leading-relaxed mb-6">
                            Ahmedabad's appetite for luxury is growing, and so is the demand for premium car rentals. Whether you need a <strong>Mercedes S-Class</strong> for a corporate delegation, a <strong>Porsche Boxster</strong> for a weekend getaway to Udaipur, or a <strong>Audi Q7</strong> for a family function, renting allows you to experience these engineering marvels without the commitment of ownership.
                        </p>

                        <p className="text-lg text-gray-300 leading-relaxed mb-6">
                            However, renting a high-end vehicle is different from booking a regular cab. The stakes are higher, and the process is more detailed. Here is your comprehensive checklist to ensure a smooth and sophisticated rental experience in Ahmedabad.
                        </p>
                    </div>

                    {/* Section 1: Documentation */}
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif text-luxe-gold mb-6 flex items-center gap-4">
                            <span className="text-4xl md:text-5xl opacity-50">01</span> The Paperwork: Get It Right
                        </h2>

                        <div className="relative h-80 rounded-2xl overflow-hidden mb-8 group">
                            <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Car Keys" />
                            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-4 py-2 rounded text-xs text-white">
                                Documents • The Boring but Essential Part
                            </div>
                        </div>

                        <p className="text-lg text-gray-300 leading-relaxed mb-6">
                            Luxury car rentals require strict identity and security verification. Unlike standard rentals, you cannot just show up with a license. To avoid last-minute hassles, ensure you have the following ready:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-900/50 p-4 rounded-xl border border-white/10 flex gap-3">
                                <FileText className="text-luxe-gold w-6 h-6 flex-shrink-0" />
                                <div>
                                    <h4 className="text-white font-bold text-sm">Valid Driving License</h4>
                                    <p className="text-gray-400 text-xs mt-1">Must be at least 2 years old. International Driver's Permit required for NRIs.</p>
                                </div>
                            </div>
                            <div className="bg-gray-900/50 p-4 rounded-xl border border-white/10 flex gap-3">
                                <Shield className="text-luxe-gold w-6 h-6 flex-shrink-0" />
                                <div>
                                    <h4 className="text-white font-bold text-sm">Security Deposit</h4>
                                    <p className="text-gray-400 text-xs mt-1">High-end cars block a security deposit on your credit card (₹50k - ₹2L depending on the model).</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Assessing Your Needs */}
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif text-luxe-gold mb-6 flex items-center gap-4">
                            <span className="text-4xl md:text-5xl opacity-50">02</span> Self-Drive vs. Chauffeur-Driven
                        </h2>

                        <p className="text-lg text-gray-300 leading-relaxed mb-6">
                            This is the biggest decision you'll make. Ahmedabad's traffic can be chaotic.
                        </p>

                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-blue-900/20 to-transparent p-6 rounded-xl border-l-4 border-blue-500">
                                <h3 className="text-xl font-bold text-white mb-2">Chauffeur-Driven</h3>
                                <p className="text-gray-300"><strong>Best for:</strong> Weddings, Corporate Events, Airport Transfers.</p>
                                <p className="text-gray-400 text-sm mt-2">Rent a <strong>Mercedes E-Class</strong> or <strong>BMW 7 Series</strong>. Sit back, enjoy the reclining seats, ambient lighting, and let a uniformed professional navigate the S.G. Highway traffic. Zero stress, maximum status.</p>
                            </div>

                            <div className="bg-gradient-to-r from-red-900/20 to-transparent p-6 rounded-xl border-l-4 border-red-500">
                                <h3 className="text-xl font-bold text-white mb-2">Self-Drive</h3>
                                <p className="text-gray-300"><strong>Best for:</strong> Road Trips, Weekend Dates, Enthusiasts.</p>
                                <p className="text-gray-400 text-sm mt-2">Rent a <strong>Mini Cooper Convertible</strong> or a <strong>Ford Mustang</strong>. This is for when YOU want to be in control. Experience the handling and power firsthand. Ensure you are comfortable with the car's dimensions before heading into the Old City!</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Insurance & Inspection */}
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif text-luxe-gold mb-6 flex items-center gap-4">
                            <span className="text-4xl md:text-5xl opacity-50">03</span> The Pre-Rental Inspection
                        </h2>

                        <div className="relative h-80 rounded-2xl overflow-hidden mb-8 group">
                            <img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Car Inspection" />
                            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-4 py-2 rounded text-xs text-white">
                                Details Matter • Check every scratch
                            </div>
                        </div>

                        <p className="text-lg text-gray-300 leading-relaxed mb-6">
                            Before you zoom off, spend 10 minutes inspecting the car. Luxury cars have expensive parts, and you don't want to be billed for a scratch you didn't cause.
                        </p>

                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0 mt-1" />
                                <span className="text-gray-300"><strong>Video Walkaround:</strong> Take a 360-degree video of the car in good light. Zoom in on wheels (rim scratches are common) and bumpers.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0 mt-1" />
                                <span className="text-gray-300"><strong>Check the Tech:</strong> Ensure the Bluetooth connects, the GPS works, and the AC is cooling effectively (crucial for Ahmedabad heat!).</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0 mt-1" />
                                <span className="text-gray-300"><strong>Fuel Level:</strong> Check the fuel gauge. LUXEDIVE policy is "Full-to-Full", meaning you get a full tank and return a full tank.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Conclusion */}
                    <div className="border-t border-gray-800 pt-10">
                        <h2 className="text-3xl font-serif text-luxe-gold mb-6">Experience the Extraordinary</h2>

                        <p className="text-lg text-gray-300 leading-relaxed mb-6">
                            Renting a luxury car is about elevating your journey. It turns a mundane drive into a memory. At LUXEDIVE, we pride ourselves on maintaining an impeccable fleet that feels brand new every time you step inside.
                        </p>

                        <div className="bg-luxe-gold/10 border-l-4 border-luxe-gold p-8 rounded-r-xl mt-8">
                            <p className="text-xl font-serif text-white mb-2">Ready to Upgrade Your Drive?</p>
                            <p className="text-gray-400 mb-6">Browse our fleet of over 50 premium vehicles available right here in Ahmedabad.</p>

                            <div className="text-sm font-bold text-luxe-gold uppercase tracking-widest">
                                Call us at +91 98 0000 0000 for instant booking.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    // Fallback for direct access if slug doesn't match mock data (KEEPING THE WEDDING POST AS DEFAULT FALLBACK FOR NOW TO NOT BREAK PREVIOUS WORK)
    const displayPost = post || {
        title: "The Ultimate Guide to a Royal Wedding Entrance",
        excerpt: "Why a Vintage Rolls Royce makes the perfect statement for your Baraat.",
        cover_image: "https://images.unsplash.com/photo-1618480392095-8664082269a2?q=80&w=2071&auto=format&fit=crop",
        author: "Event Stylist",
        published_at: "2026-01-20",
        tags: ["Wedding", "Trends", "Luxury"]
    }

    // ... (Rest of the component for the default Wedding post, copied from previous step to ensure it remains available for other slugs/default view)
    return (
        <div className="min-h-screen bg-black text-white">
            <SeoHelmet title={displayPost.title} description={displayPost.excerpt} image={displayPost.cover_image} />

            {/* HEADER IMAGE */}
            <div className="h-[70vh] relative">
                <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Indian Wedding Entrance" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <div className="container mx-auto max-w-4xl">
                        <div className="flex flex-wrap gap-3 mb-6">
                            {displayPost.tags.map((tag, idx) => (
                                <span key={idx} className="px-4 py-1.5 bg-luxe-gold/20 text-luxe-gold text-xs font-bold uppercase tracking-wider rounded-full border border-luxe-gold/30">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight tracking-tight">The Ultimate Guide to a <span className="text-luxe-gold">Royal Wedding Entrance</span> in Ahmedabad</h1>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
                            <span className="flex items-center gap-2"><User className="w-4 h-4" /> by {displayPost.author}</span>
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(displayPost.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 8 min read</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="container mx-auto max-w-4xl px-6 md:px-8 py-16">

                {/* Introduction */}
                <div className="mb-12">
                    <p className="text-2xl text-luxe-gray leading-relaxed font-serif italic border-l-4 border-luxe-gold pl-8 py-4 mb-8 bg-luxe-gold/5">
                        "First impressions last forever, and nowhere is this more true than at an Indian wedding. The groom's entry isn't just an arrival; it's a statement of legacy, style, and celebration."
                    </p>

                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        In the grand tapestry of an Indian wedding (Shaadi), the Baraat holds a special place. It's that electrifying moment when the groom, accompanied by his friends and family, makes his way to the venue. Gone are the days when a simple horse (Ghodi) was the only option. Today, the modern Indian groom demands an entry that reflects his personality—bold, luxurious, and unforgettable.
                    </p>

                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        Whether you're planning a lavish reception at a 5-star hotel on SG Highway or a traditional ceremony at a heritage venue in Ahmedabad, your choice of wheels sets the tone for the entire evening. We've curated the most spectacular wedding entrance ideas that blend tradition with modern automotive luxury.
                    </p>
                </div>

                {/* Idea 1: The Vintage Royal */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-luxe-gold mb-6 flex items-center gap-4">
                        <span className="text-4xl md:text-5xl opacity-50">01</span> The Vintage Royale
                    </h2>

                    <div className="relative h-96 rounded-2xl overflow-hidden mb-8 group">
                        <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Vintage Rolls Royce" />
                        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-4 py-2 rounded text-xs text-white">
                            Rolls Royce Silver Cloud • The definitive classic
                        </div>
                    </div>

                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        Nothing screams "Royalty" quite like a vintage Rolls Royce. For the groom who appreciates timeless elegance and wants to channel his inner Maharaja, a classic <strong>Rolls Royce Silver Cloud</strong> or a <strong>Vintage Bentley</strong> is the ultimate choice.
                    </p>

                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        Imagine rolling up to the venue entrance in a pristine white classic car, the chrome gleaming under the venue lights. It's sophisticated, it's grand, and it provides the perfect backdrop for those candid Baraat photos. The slow, majestic arrival allows photographers to capture every emotion as you wave to the gleaming crowd.
                    </p>

                    <div className="bg-luxe-gold/10 border border-luxe-gold/30 p-6 rounded-xl flex gap-4 items-start">
                        <Star className="w-6 h-6 text-luxe-gold flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="text-luxe-gold font-bold mb-1">Perfect For:</h4>
                            <p className="text-gray-400 text-sm">Traditional weddings, heritage venues, and grooms wearing Sherwanis or Jodhpuris.</p>
                        </div>
                    </div>
                </div>

                {/* Idea 2: The Modern Power Statement */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-luxe-gold mb-6 flex items-center gap-4">
                        <span className="text-4xl md:text-5xl opacity-50">02</span> The Supercar Roar
                    </h2>

                    <div className="relative h-96 rounded-2xl overflow-hidden mb-8 group">
                        <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Lamborghini Entrance" />
                        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-4 py-2 rounded text-xs text-white">
                            Lamborghini Huracán • The sound of arrival
                        </div>
                    </div>

                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        For the groom who loves speed and wants to make heads turn before he's even seen, a supercar entry is the way to go. The distinct roar of a <strong>Lamborghini Huracán</strong> or a <strong>Ferrari Portofino</strong> engine announces your arrival better than any DJ ever could.
                    </p>

                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        A convertible (Spyder) is highly recommended here. It allows you to sit back (or even sit on the back deck of the car) and interact with the Baraatis dancing around the car. The contrast of a vibrant Traditional outfit against the sleek, modern lines of a yellow or red supercar creates a stunning visual aesthetic that is very popular on Instagram Reels.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                        <div className="bg-gray-900/50 p-6 rounded-xl border border-white/5">
                            <Music className="w-6 h-6 text-blue-400 mb-3" />
                            <h4 className="text-white font-bold mb-2">The Vibe</h4>
                            <p className="text-gray-400 text-sm">High energy, loud, party atmosphere. Perfect for Sangeet nights or reception entries.</p>
                        </div>
                        <div className="bg-gray-900/50 p-6 rounded-xl border border-white/5">
                            <Camera className="w-6 h-6 text-blue-400 mb-3" />
                            <h4 className="text-white font-bold mb-2">Photo Op</h4>
                            <p className="text-gray-400 text-sm">Low-angle shots capturing the car's aggressive stance with the groom stepping out.</p>
                        </div>
                    </div>
                </div>

                {/* Idea 3: The Brides Entry */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-luxe-gold mb-6 flex items-center gap-4">
                        <span className="text-4xl md:text-5xl opacity-50">03</span> The Bride's Grand Entry
                    </h2>

                    <div className="relative h-96 rounded-2xl overflow-hidden mb-8 group">
                        <img src="https://images.unsplash.com/photo-1596706076383-7c8a666ac58e?q=80&w=2574&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Bride Entry" />
                        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-4 py-2 rounded text-xs text-white">
                            Drive-in Style • Independent & Chic
                        </div>
                    </div>

                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        Why should boys have all the fun? The modern Indian bride is independent, stylish, and loves to drive. Gone are the days of the traditional 'Doli'. Today's brides are choosing to drive themselves to the Mandap in a stylish <strong>Mini Cooper Convertible</strong> or being chauffeured in a luxurious <strong>Mercedes S-Class</strong>.
                    </p>

                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        For a truly fairytale entry, a convertible is iconic. It allows the bride's beautiful heavy lehenga and jewelry to be visible properly, without being hidden behind tinted windows. Entering with your girl gang/bridesmaids in a convoy of luxury cars is another trend that's catching on fast in Ahmedabad.
                    </p>
                </div>

                {/* Pro Tips Section */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 mb-16">
                    <h3 className="text-2xl font-serif text-white mb-6">Planning the Perfect Entry: Tips from the Experts</h3>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-luxe-gold/20 flex items-center justify-center text-luxe-gold font-bold flex-shrink-0">1</div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Time it Right</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">Ensure your car arrival coincides with the 'Golden Hour' (just before sunset) if possible. The lighting on the car's metallic paint and your outfit will be cinematic.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-luxe-gold/20 flex items-center justify-center text-luxe-gold font-bold flex-shrink-0">2</div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Coordinate with Photographers</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">Tell your photographer beforehand which car you are arriving in. They need to set up wide-angle lenses to capture the full majesty of the vehicle along with the crowd.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-luxe-gold/20 flex items-center justify-center text-luxe-gold font-bold flex-shrink-0">3</div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Practice the Exit</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">It sounds silly, but getting out of a low-slung sports car in a heavy Sherwani or Lehenga can be tricky. Do a quick practice run to ensure your first step out is graceful!</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conclusion */}
                <div className="border-t border-gray-800 pt-10">
                    <h2 className="text-3xl font-serif text-luxe-gold mb-6">Make Your Dream Entry a Reality</h2>

                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        Your wedding is a once-in-a-lifetime event, and your entry sets the narrative for the whole celebration. Whether you choose the imperial grace of a Rolls Royce or the heart-thumping excitement of a Ferrar, LUXEDIVE has the perfect fleet to match your vision.
                    </p>

                    <div className="bg-luxe-gold/10 border-l-4 border-luxe-gold p-8 rounded-r-xl mt-8">
                        <p className="text-xl font-serif text-white mb-2">Connect with our Wedding Concierge</p>
                        <p className="text-gray-400 mb-6">Our team specializes in wedding logistics and can help coordinate your entire fleet, from the groom's car to guest transportation.</p>

                        <div className="text-sm font-bold text-luxe-gold uppercase tracking-widest">
                            Call us at +91 98 0000 0000 to reserve your date.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
