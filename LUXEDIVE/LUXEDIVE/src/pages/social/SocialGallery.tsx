import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Heart,
    Instagram,
    Twitter,
    MapPin,
    ArrowRight,
    ChevronDown,
    Camera,
    Share2
} from 'lucide-react';

interface SocialPost {
    id: string;
    platform: 'instagram' | 'twitter';
    imageUrl: string;
    userHandle: string;
    isVerified: boolean;
    caption: string;
    location?: string;
    likes: number;
}

const SocialGallery: React.FC = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');

    // Mock Data
    const posts: SocialPost[] = [
        {
            id: '1',
            platform: 'instagram',
            imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80',
            userHandle: '@rahul_drives',
            isVerified: true,
            caption: "Late night drives done right. The Riverfront lights hit different in a Porsche.",
            location: 'Ahmedabad Riverfront',
            likes: 1240
        },
        {
            id: '2',
            platform: 'twitter',
            imageUrl: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80',
            userHandle: '@guju_speed',
            isVerified: true,
            caption: "POV: SG Highway at 2AM. Pure therapy.",
            likes: 892
        },
        {
            id: '3',
            platform: 'instagram',
            imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80',
            userHandle: '@supercars_amd',
            isVerified: true,
            caption: "Clean lines. Mean machine. Spotted this beauty near Sindhu Bhavan.",
            location: 'Sindhu Bhavan Road',
            likes: 2100
        },
        {
            id: '4',
            platform: 'instagram',
            imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80',
            userHandle: '@priya_style',
            isVerified: true,
            caption: "Arriving in style. #GWagon #AhmedabadLuxury",
            likes: 1540
        },
        {
            id: '5',
            platform: 'instagram',
            imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80',
            userHandle: '@ahmedabad_lux',
            isVerified: true,
            caption: "Sunday morning breakfast run. The Audi handles like a dream.",
            location: 'Science City',
            likes: 980
        },
        {
            id: '6',
            platform: 'instagram',
            imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80',
            userHandle: '@wedding_entries',
            isVerified: true,
            caption: "The grandest entry for the big day. Thanks LUXEDIVE for the Rolls.",
            location: 'Taj Skyline',
            likes: 3400
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans">

            {/* Header */}
            <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-black/90 to-transparent py-6 px-6 md:px-12 backdrop-blur-sm border-b border-white/5">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-12">
                        <h1 className="text-xl font-serif font-bold tracking-widest cursor-pointer" onClick={() => navigate('/')}>LUXEDIVE</h1>
                        <nav className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
                            <a href="/fleet" className="hover:text-white transition-colors">Fleet</a>
                            <a href="/experience" className="hover:text-white transition-colors">Experience</a>
                            <a href="#" className="text-white border-b-2 border-white pb-1">Gallery</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/auth/login')} className="text-xs font-bold uppercase tracking-widest hover:text-gray-300">Login</button>
                        <button className="px-5 py-2.5 bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-colors">
                            Book Now
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 md:px-12 text-center bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80')] bg-cover bg-center bg-no-repeat relative">
                <div className="absolute inset-0 bg-black/80" />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <span className="inline-block px-4 py-1.5 border border-white/20 text-gray-300 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 backdrop-blur">
                        #LUXEDIVEMOMENTS
                    </span>
                    <h2 className="text-5xl md:text-7xl font-serif font-medium mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                        The LUXEDIVE Lifestyle
                    </h2>
                    <p className="text-gray-400 text-lg font-light tracking-wide">
                        Ahmedabad's elite. Curated moments. Unmatched power.
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="sticky top-20 z-40 bg-black/95 backdrop-blur border-y border-white/10 py-4">
                <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
                    <div className="flex gap-3 justify-center min-w-max">
                        {['All', 'Porsche', 'Audi', 'Riverfront', 'SG Highway', 'Wedding'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${filter === f
                                    ? 'bg-white text-black border-white'
                                    : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Masonry Grid */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">

                    {posts.map((post) => (
                        <div key={post.id} className="break-inside-avoid bg-[#151921] rounded-xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300 border border-white/5 hover:border-white/20">
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <img
                                    src={post.imageUrl}
                                    alt={post.caption}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4">
                                    {post.platform === 'instagram' ? (
                                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white">
                                            <Instagram className="w-4 h-4" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-blue-500/80 backdrop-blur flex items-center justify-center text-white">
                                            <Twitter className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                                <div className="absolute bottom-0 inset-x-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="font-bold text-sm tracking-wide">{post.userHandle}</span>
                                        {post.isVerified && <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center text-[8px] text-white">✓</div>}
                                    </div>
                                    <p className="text-sm text-gray-300 line-clamp-2 mb-4 font-light leading-relaxed">
                                        {post.caption}
                                    </p>
                                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                                            <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-500 fill-red-500" /> {post.likes}</span>
                                            {post.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {post.location}</span>}
                                        </div>
                                        <button className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:text-blue-400">
                                            View <ArrowRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="text-center mt-16">
                    <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 mx-auto">
                        Load More <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </section>

            {/* CTA Section */}
            <section className="border-t border-white/10 bg-[#0F1218]">
                <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                    <Camera className="w-12 h-12 text-gray-500 mx-auto mb-6" />
                    <h2 className="text-4xl font-serif font-medium mb-4">Experience the Thrill</h2>
                    <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                        Join the elite community of LUXEDIVE members today. Drive the cars you've always dreamed of on the streets of Ahmedabad.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-5 bg-blue-600 text-white font-bold uppercase tracking-widest text-xs rounded hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                            Book Your Experience
                        </button>
                        <button className="px-8 py-5 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded hover:border-white transition-colors">
                            View Fleet
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default SocialGallery;
