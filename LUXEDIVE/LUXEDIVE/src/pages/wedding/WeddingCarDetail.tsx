import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Rotate3D, MapPin, Flower, Armchair, ChevronLeft } from 'lucide-react'

const CAR_DATA: Record<string, {
    title: string;
    subtitle: string;
    price: string;
    image: string;
    collection: string;
    features: { title: string; desc: string; icon: any }[];
}> = {
    vintage: {
        title: "Rolls-Royce Ghost",
        subtitle: "The Wedding Edition • Absolute Black",
        price: "₹1,25,000",
        collection: "Masterpiece Collection",
        image: "https://images.unsplash.com/photo-1631295868223-63265b40d9f4?auto=format&fit=crop&q=80&w=2000", // Rolls Royce Ghost
        features: [
            { icon: Armchair, title: "Bridal Gown Room", desc: "Extended wheelbase and carriage doors designed specifically for effortless entry with voluminous bridal gowns." },
            { icon: Flower, title: "Floral Climate Zone", desc: "Precision climate control focused on rear parcel shelf to maintain freshness of wedding floral arrangements." }
        ]
    },
    modern: {
        title: "Mercedes-Maybach S680",
        subtitle: "Contemporary Ultra-Luxury • Diamond White",
        price: "₹85,000",
        collection: "Avant-Garde Collection",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2000", // Mercedes S-Class
        features: [
            { icon: Armchair, title: "First Class Rear Suite", desc: "Reclining executive seats with hot stone massage function and champagne fridge." },
            { icon: Rotate3D, title: "Magic Body Control", desc: "Camera-assisted suspension that scans the road ahead for the smoothest possible arrival." }
        ]
    },
    sport: {
        title: "Lamborghini Urus",
        subtitle: "Performance SUV • Giallo Auge",
        price: "₹95,000",
        collection: "Adrenaline Collection",
        image: "https://images.unsplash.com/photo-1669605786358-8b5d387f3add?auto=format&fit=crop&q=80&w=2000", // Lamborghini Urus
        features: [
            { icon: Rotate3D, title: "Grand Entrance Mode", desc: "Active exhaust valve control to ensure your arrival makes the perfect acoustic statement." },
            { icon: Armchair, title: "Sport Luxury Cabin", desc: "Alcantara and carbon fiber interior with custom contrast stitching matching your wedding theme." }
        ]
    }
}

export default function WeddingCarDetail() {
    const navigate = useNavigate()
    const { id } = useParams()

    // Default to vintage if id not found or invalid
    const activeCar = CAR_DATA[id || 'vintage'] || CAR_DATA['vintage']

    return (
        <div className="h-screen bg-[#0F172A] text-white flex overflow-hidden">

            {/* TOP NAV OVERLAY */}
            <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-8 z-30 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="flex gap-8 pointer-events-auto">
                    <button onClick={() => navigate('/events/wedding')} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white">The Collection</button>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white border-b border-purple-500 pb-1">Vehicle Detail</span>
                    <button onClick={() => navigate('/concierge')} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white">Concierge</button>
                </div>
                <div className="flex items-center gap-6 pointer-events-auto">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Ahmedabad</span>
                    <Button variant="outline" onClick={() => navigate('/dashboard/bookings')} className="border-white/20 text-white hover:bg-white/10 uppercase tracking-widest text-[10px] font-bold h-8 px-4">
                        My Booking
                    </Button>
                </div>
            </div>

            {/* LEFT SECTION - 3D INTERACTIVE */}
            <div className="flex-1 relative bg-gradient-to-br from-[#050505] to-[#1a1a1a] items-center justify-center flex flex-col">

                {/* Breadcrumb */}
                <div className="absolute top-24 left-8 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    Wedding Fleet <span className="mx-2 text-gray-700">/</span> {activeCar.collection} <span className="mx-2 text-gray-700">/</span> {activeCar.title}
                </div>

                {/* Car Image */}
                <div className="relative w-full max-w-4xl aspect-[16/9] mb-12 flex items-center justify-center">
                    <img
                        src={activeCar.image}
                        alt={activeCar.title}
                        className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                    />

                    {/* Rotation indicator removed */}
                </div>

                {/* Thumbnail Gallery (Static for now, but visual confirmation) */}
                <div className="absolute bottom-8 left-8 flex gap-4">
                    <div className="w-20 h-20 rounded-lg border-2 border-[#4169E1] overflow-hidden cursor-pointer">
                        <img src={activeCar.image} className="w-full h-full object-cover" />
                    </div>
                    {/* Placeholder thumbnails */}
                    <div className="w-20 h-20 rounded-lg border border-white/10 overflow-hidden cursor-pointer hover:border-white/50 transition-colors">
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center"><Armchair className="w-6 h-6 text-gray-600" /></div>
                    </div>
                </div>

                {/* Concierge Notice */}
                <div className="absolute bottom-8 right-8 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#4169E1] animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#4169E1]">Bespoke Concierge Available</span>
                </div>

            </div>

            {/* RIGHT SIDEBAR - DETAILS */}
            <div className="w-[400px] bg-[#0B1121] border-l border-white/5 flex flex-col p-8 overflow-y-auto">

                <div className="mb-8">
                    <div className="inline-block px-2 py-1 bg-blue-900/20 rounded text-[9px] font-bold uppercase tracking-widest text-[#4169E1] mb-4 border border-blue-500/20">
                        {activeCar.collection}
                    </div>
                    <h1 className="text-4xl font-serif text-white italic mb-1">{activeCar.title}</h1>
                    <p className="text-sm text-gray-400 font-light">{activeCar.subtitle}</p>
                </div>

                {/* Check Availability Card */}
                <div className="bg-[#12182B] rounded-xl p-6 mb-8 border border-white/5">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Location</div>
                            <div className="text-sm font-bold text-white uppercase tracking-widest">Ahmedabad</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1 text-right">Status</div>
                            <div className="flex items-center justify-end gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-sm font-bold text-emerald-500 uppercase tracking-widest">Available</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-px bg-white/5 mb-4" />
                    <div className="flex justify-between items-end">
                        <span className="text-xs text-gray-400 mb-1">Starting from</span>
                        <span className="text-2xl font-serif font-bold text-white">{activeCar.price} <span className="text-sm font-sans font-normal text-gray-500">/ day</span></span>
                    </div>
                </div>

                {/* Wedding Exclusives */}
                <div className="mb-8">
                    <h2 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Wedding Exclusives</h2>

                    <div className="space-y-4">
                        {activeCar.features.map((feature, idx) => (
                            <div key={idx} className="bg-[#12182B] rounded-xl p-4 border border-white/5 hover:border-purple-500/30 transition-colors group">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-900/20 text-[#4169E1] flex items-center justify-center shrink-0">
                                        <feature.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{feature.title}</h3>
                                        <p className="text-[11px] text-gray-500 leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-auto pt-8">
                    <Button
                        onClick={() => navigate('/wedding/decor', {
                            state: {
                                car: {
                                    title: activeCar.title,
                                    image: activeCar.image
                                }
                            }
                        })}
                        className="w-full h-14 bg-white text-black hover:bg-[#4169E1] hover:text-white transition-colors uppercase tracking-widest text-xs font-bold text-center flex items-center justify-center"
                    >
                        Proceed to Customization <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
                    </Button>
                </div>
            </div>

        </div>
    )
}
