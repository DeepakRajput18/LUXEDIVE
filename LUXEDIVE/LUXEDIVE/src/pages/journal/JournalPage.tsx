import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import {
    Search,
    User,
    ArrowRight,
    Clock,
    ChevronRight,
    Mail,
    ChevronLeft
} from 'lucide-react';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    image_url: string;
    read_time: number;
    published_at: string;
    is_featured: boolean;
    author_name?: string;
}

const JournalPage: React.FC = () => {
    const navigate = useNavigate();
    const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('LATEST');
    const [searchQuery, setSearchQuery] = useState('');
    const [email, setEmail] = useState('');

    const categories = ['LATEST', 'SUPERCARS', 'LIFESTYLE', 'TRAVEL', 'EVENTS', 'TECH', 'REVIEWS'];

    useEffect(() => {
        fetchPosts();
    }, [selectedCategory]);

    const fetchPosts = async () => {
        // In a real implementation:
        // const { data } = await supabase.from('blog_posts').select('*')...

        // Mock data for demonstration
        const mockPosts: BlogPost[] = [
            {
                id: '1',
                title: 'The Best Scenic Drives in Gujarat',
                excerpt: 'Discover the hidden coastal roads and mountain passes perfect for your next grand tour.',
                category: 'TRAVEL',
                image_url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80',
                read_time: 8,
                published_at: '2023-10-15',
                is_featured: false
            },
            {
                id: '2',
                title: 'Engineering Perfection: Inside the V12 Engine',
                excerpt: 'A deep dive into the mechanical symphony that powers our most exclusive fleet members.',
                category: 'TECH',
                image_url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80',
                read_time: 12,
                published_at: '2023-10-10',
                is_featured: false
            },
            {
                id: '3',
                title: 'Porsche 911 GT3: Track Weapon for the Street',
                excerpt: 'We took the new GT3 to the BIC to see if it lives up to the legendary badge.',
                category: 'REVIEWS',
                image_url: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80',
                read_time: 15,
                published_at: '2023-10-05',
                is_featured: false
            },
            {
                id: '4',
                title: 'How to Dress for a Supercar Weekend',
                excerpt: 'Style tips for the modern gentleman. Matching your attire to the occasion and the machine.',
                category: 'LIFESTYLE',
                image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80',
                read_time: 6,
                published_at: '2023-09-28',
                is_featured: false
            }
        ];

        setFeaturedPost({
            id: 'feat-1',
            title: 'The Art of the Grand Tour: Ferrari Roma',
            excerpt: 'Experiencing la dolce vita across the Indian countryside in Maranello\'s finest GT. A journey of elegance, performance, and pure emotion.',
            category: 'EDITOR\'S PICK',
            image_url: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80',
            read_time: 10,
            published_at: '2023-10-20',
            is_featured: true
        });

        setPosts(mockPosts);
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <h1 className="text-2xl font-serif font-bold tracking-tight cursor-pointer" onClick={() => navigate('/')}>
                            LUXEDIVE <span className="text-gray-400 font-light italic">JOURNAL</span>
                        </h1>
                        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest text-gray-500">
                            {['CARS', 'EVENTS', 'LIFESTYLE', 'REVIEWS'].map((item) => (
                                <a key={item} href="#" className="hover:text-black transition-colors">{item}</a>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="relative hidden sm:block">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-8 pr-4 py-2 bg-gray-100 rounded-full text-sm w-48 focus:outline-none focus:ring-1 focus:ring-black transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                        <button className="flex items-center gap-2 text-sm font-medium hover:opacity-70">
                            <User className="w-4 h-4" />
                            Sign In
                        </button>
                    </div>
                </div>
            </header>

            <main className="pt-20">

                {/* Featured Article - Hero */}
                {featuredPost && (
                    <section className="relative h-[80vh] w-full overflow-hidden group">
                        <img
                            src={featuredPost.image_url}
                            alt={featuredPost.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end pb-24">
                            <div className="max-w-7xl mx-auto px-6 w-full text-white">
                                <span className="inline-block px-3 py-1 bg-white text-black text-xs font-bold tracking-widest mb-6">
                                    EDITOR'S PICK
                                </span>
                                <h2 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-6 max-w-4xl">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8 font-light leading-relaxed">
                                    {featuredPost.excerpt}
                                </p>
                                <button className="px-8 py-4 bg-white text-black font-semibold tracking-wide hover:bg-gray-200 transition-colors flex items-center gap-2 group/btn">
                                    READ FULL REVIEW
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                <div className="max-w-7xl mx-auto px-6 py-20">

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-4 justify-center mb-16">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest transition-all ${selectedCategory === cat
                                    ? 'bg-black text-white shadow-lg scale-105'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Article Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {posts.map((post) => (
                            <article key={post.id} className="group cursor-pointer">
                                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                                    <span className={`absolute top-4 left-4 z-10 text-[10px] font-bold tracking-widest px-3 py-1 bg-white text-black`}>
                                        {post.category}
                                    </span>
                                    <img
                                        src={post.image_url}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium tracking-wide">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {post.read_time} MIN READ
                                    </span>
                                    <span>•</span>
                                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-3xl font-serif font-medium mb-3 group-hover:text-gray-700 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed mb-4">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center gap-2 text-xs font-bold tracking-widest group-hover:gap-3 transition-all">
                                    READ STORY <ArrowRight className="w-3 h-3" />
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-4 mt-20">
                        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-black hover:text-white transition-colors disabled:opacity-30" disabled>
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium">Page 1 of 5</span>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-black hover:text-white transition-colors">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                </div>

                {/* Newsletter Section */}
                <section className="bg-[#1A1F2E] text-white py-24">
                    <div className="max-w-2xl mx-auto px-6 text-center">
                        <Mail className="w-8 h-8 mx-auto mb-6 text-gray-400" />
                        <h2 className="text-3xl font-serif mb-4">Join the Inner Circle</h2>
                        <p className="text-gray-400 mb-8 font-light">
                            Receive exclusive access to new fleet arrivals, member-only events, and curated lifestyle content directly to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 bg-white/5 border border-white/10 px-6 py-4 rounded-lg focus:outline-none focus:border-white focus:bg-white/10 transition-colors text-white placeholder:text-gray-600"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className="px-8 py-4 bg-white text-black font-bold tracking-widest rounded-lg hover:bg-gray-200 transition-colors">
                                SUBSCRIBE
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-6">
                            By subscribing, you agree to our Privacy Policy. We respect your inbox and never spam.
                        </p>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default JournalPage;
