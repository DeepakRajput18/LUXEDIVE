import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import {
    Star,
    CheckCircle,
    Quote,
    ChevronDown,
    Car,
    Filter
} from 'lucide-react';

// Initialize Supabase client
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';
// const supabase = createClient(supabaseUrl, supabaseAnonKey);
interface Testimonial {
    id: string;
    author_name: string;
    vehicle_model: string;
    rating: number;
    content: string;
    image_url: string;
    category: 'SUPERCARS' | 'CHAUFFEUR' | 'EVENTS' | 'WEDDING';
    is_verified_member: boolean;
    date: string;
}

const Testimonials: React.FC = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState<Testimonial[]>([]);
    const [filter, setFilter] = useState<string>('ALL');
    const [loading, setLoading] = useState(true);

    const categories = ['ALL', 'SUPERCARS', 'CHAUFFEUR', 'EVENTS', 'WEDDING'];

    useEffect(() => {
        fetchReviews();
    }, [filter]);

    const fetchReviews = async () => {
        setLoading(true);
        // Real fetch: supabase.from('reviews').select('*').eq('category', filter)...

        // Mock Data
        const mockReviews: Testimonial[] = [
            {
                id: '1',
                author_name: 'Arjun K.',
                vehicle_model: 'Audi R8 V10 Plus',
                rating: 5,
                content: 'The drop-off service was impeccable. The car arrived detailed to perfection, and the sound of that V10 is something I’ll never forget. A truly world-class experience right here in Ahmedabad.',
                image_url: 'https://images.unsplash.com/photo-1621689262059-d830b561c2c3?auto=format&fit=crop&q=80',
                category: 'SUPERCARS',
                is_verified_member: true,
                date: '2023-10-12'
            },
            {
                id: '2',
                author_name: 'Vikram S.',
                vehicle_model: 'BMW 7 Series LWB',
                rating: 5,
                content: 'For our board meeting, we needed absolute reliability and comfort. The chauffeur was professional, punctual, and the vehicle was pristine. LUXEDIVE is now our corporate partner.',
                image_url: 'https://images.unsplash.com/photo-1555215695-3004980adade?auto=format&fit=crop&q=80',
                category: 'CHAUFFEUR',
                is_verified_member: true,
                date: '2023-09-28'
            },
            {
                id: '3',
                author_name: 'Priya & Rohan',
                vehicle_model: 'Mercedes G-Wagon',
                rating: 5,
                content: 'Made our anniversary unforgettable. The G-Wagon has such a commanding presence. The booking process was seamless compared to others.',
                image_url: 'https://images.unsplash.com/photo-1520031441872-ddb150c16203?auto=format&fit=crop&q=80',
                category: 'EVENTS',
                is_verified_member: false,
                date: '2023-10-05'
            },
            {
                id: '4',
                author_name: 'Karan & Neha',
                vehicle_model: 'Rolls Royce Ghost',
                rating: 5,
                content: 'The wedding entry was a dream come true. The floral decor was managed by LUXEDIVE’s concierge and it matched our theme perfectly.',
                image_url: 'https://images.unsplash.com/photo-1601666870634-93e10815e4a7?auto=format&fit=crop&q=80',
                category: 'WEDDING',
                is_verified_member: true,
                date: '2023-11-01'
            },
            {
                id: '5',
                author_name: 'Ananya D.',
                vehicle_model: 'Porsche 911 Carrera',
                rating: 5,
                content: 'Highway driving is unmatched in a 911. The car felt brand new. Verified member status gives total peace of mind regarding liability.',
                image_url: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80',
                category: 'SUPERCARS',
                is_verified_member: true,
                date: '2023-08-15'
            },
            {
                id: '6',
                author_name: 'Rajiv M.',
                vehicle_model: 'Jaguar F-Type',
                rating: 4,
                content: 'Stunning vehicle. The exhaust note is addictive. Only issue was slightly complex pickup verification, but support helped quickly.',
                image_url: 'https://images.unsplash.com/photo-1605218427368-35b019b8004b?auto=format&fit=crop&q=80',
                category: 'SUPERCARS',
                is_verified_member: true,
                date: '2023-09-10'
            }
        ];

        if (filter === 'ALL') {
            setReviews(mockReviews);
        } else {
            setReviews(mockReviews.filter(r => r.category === filter));
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black pb-20">

            {/* Header */}
            <div className="bg-[#0F1218] border-b border-white/5 pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">TESTIMONIALS</p>
                    <h1 className="text-5xl md:text-6xl font-serif font-medium mb-6">Voices of Distinction</h1>
                    <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
                        See how Ahmedabad's elite navigate the city in LUXEDIVE excellence.
                    </p>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-full text-xs font-medium tracking-wider transition-all border ${filter === cat
                                    ? 'bg-white text-black border-white'
                                    : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-16">

                {/* Masonry Grid Simulation (using simple CSS grid for now) */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="break-inside-avoid bg-[#1A1F2E] border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all group">

                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={review.image_url}
                                    alt={review.vehicle_model}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2E] to-transparent" />

                                <div className="absolute bottom-4 left-4">
                                    {review.is_verified_member && (
                                        <div className="flex items-center gap-1 bg-green-500/10 text-green-500 px-2 py-1 rounded text-[10px] font-bold uppercase backdrop-blur-sm border border-green-500/20 mb-2 w-fit">
                                            <CheckCircle className="w-3 h-3" /> Verified Member
                                        </div>
                                    )}
                                    <h3 className="text-white font-serif text-lg">{review.vehicle_model}</h3>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 pt-6 relative">
                                <Quote className="absolute top-4 right-4 w-8 h-8 text-white/5" />

                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3 h-3 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-700'}`}
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-400 font-serif italic leading-relaxed mb-6 text-sm">
                                    "{review.content}"
                                </p>

                                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                    <span className="text-sm font-medium text-white">{review.author_name}</span>
                                    <span className="text-xs text-gray-600">{new Date(review.date).toLocaleDateString()}</span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-24 text-center border-t border-white/5 pt-16">
                    <h2 className="text-3xl font-serif font-medium mb-4">Experience the Extraordinary</h2>
                    <p className="text-gray-500 mb-10">Join an exclusive club of connoisseurs.</p>
                    <div className="flex justify-center gap-6">
                        <button
                            onClick={() => navigate('/fleet')}
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-900/20"
                        >
                            BOOK YOUR DRIVE
                        </button>
                        <button
                            onClick={() => navigate('/fleet')}
                            className="px-8 py-4 border border-white/20 hover:bg-white hover:text-black text-white font-bold rounded-lg transition-colors"
                        >
                            VIEW FULL FLEET
                        </button>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default Testimonials;
