import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    SearchX,
    Bell,
    ArrowRight,
    Calendar,
    MapPin,
    Sparkles
} from 'lucide-react';

const NoResultsDiscover: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [showWaitlistSuccess, setShowWaitlistSuccess] = useState(false);

    // Suggested Alternatives (Mock)
    const recommendations = [
        {
            id: 'porsche-taycan',
            name: 'Porsche Taycan',
            category: 'Electric Sport',
            image: 'https://images.unsplash.com/photo-1614200187524-dc4b89114b05?auto=format&fit=crop&q=80',
            price: '₹35,000/day'
        },
        {
            id: 'audi-r8',
            name: 'Audi R8 V10',
            category: 'Supercar',
            image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80',
            price: '₹75,000/day'
        },
        {
            id: 'bmw-i8',
            name: 'BMW i8 Roadster',
            category: 'Hybrid Sport',
            image: 'https://images.unsplash.com/photo-1555215695-3004980adade?auto=format&fit=crop&q=80',
            price: '₹45,000/day'
        }
    ];

    const handleWaitlistJoin = (e: React.FormEvent) => {
        e.preventDefault();
        setShowWaitlistSuccess(true);
        // Logic to add to waitlist table
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans pb-20 pt-32 px-6">

            <div className="max-w-4xl mx-auto text-center mb-24">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                    <SearchX className="w-10 h-10 text-gray-400" />
                    <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center animate-bounce shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                        <span className="text-black text-lg font-bold">!</span>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6">No matches found for your dates</h1>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
                    All vehicles in the <span className="text-black font-bold">Convertible</span> category are temporarily unavailable for <span className="text-black font-bold">Oct 24 - Oct 27</span>.
                </p>

                {!showWaitlistSuccess ? (
                    <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-2xl border border-gray-200">
                        <div className="flex items-center justify-center gap-2 mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">
                            <Bell className="w-4 h-4" /> Waitlist Alert
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                            Get notified instantly if a vehicle becomes available for your selected dates.
                        </p>
                        <form onSubmit={handleWaitlistJoin} className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                            />
                            <button type="submit" className="bg-black text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
                                Notify Me
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="max-w-md mx-auto bg-green-50 p-6 rounded-2xl border border-green-200 animate-fadeIn">
                        <p className="text-green-800 font-bold mb-2">You're on the list!</p>
                        <p className="text-green-600 text-sm">We'll email you at {email} as soon as a match is found.</p>
                    </div>
                )}
            </div>

            {/* Alternatives */}
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-8 pb-4 border-b border-gray-100">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">AVAILABLE ALTERNATIVES</p>
                        <h2 className="text-2xl font-serif font-medium">You might also like from our collection</h2>
                    </div>
                    <button
                        onClick={() => navigate('/fleet')}
                        className="text-sm font-bold border-b border-black hover:opacity-70 transition-opacity pb-1"
                    >
                        View All Fleet
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recommendations.map((car) => (
                        <div key={car.id} className="group cursor-pointer" onClick={() => navigate(`/fleet/${car.id}`)}>
                            <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6 relative">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                                    Available
                                </div>
                            </div>

                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="text-xl font-medium group-hover:text-blue-600 transition-colors">{car.name}</h3>
                                    <p className="text-gray-500 text-xs mt-1 uppercase tracking-wide">{car.category}</p>
                                </div>
                                <p className="text-lg font-serif">{car.price}</p>
                            </div>

                            <div className="flex items-center gap-4 mt-4 text-xs text-gray-400 opacity-60 group-hover:opacity-100 transition-opacity">
                                <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Pristine Condition</span>
                                <span className="flex items-center gap-1"><ArrowRight className="w-3 h-3" /> Book Instantly</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default NoResultsDiscover;
