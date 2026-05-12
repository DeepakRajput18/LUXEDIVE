import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MapPin,
    Clock,
    Phone,
    Navigation,
    ArrowRight,
    Instagram,
    Twitter,
    Facebook,
    Linkedin
} from 'lucide-react';

const ShowroomLocator: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white font-sans">

            {/* Header */}
            <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-black/90 to-transparent py-6 px-6 md:px-12 backdrop-blur-sm border-b border-white/5">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-serif font-bold tracking-widest cursor-pointer" onClick={() => navigate('/')}>LUXEDIVE</h1>
                    <nav className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
                        <a href="/fleet" className="hover:text-white transition-colors">Fleet</a>
                        <a href="/services" className="hover:text-white transition-colors">Services</a>
                        <a href="#" className="text-white border-b-2 border-white pb-1">Locator</a>
                        <a href="/auth/login" className="hover:text-white transition-colors">Login</a>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-end">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80"
                        className="w-full h-full object-cover"
                        alt="Luxury Showroom Exterior"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pb-24">
                    <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 shadow-lg shadow-blue-600/30">
                        Open Now • 24/7 Access
                    </span>
                    <h2 className="text-5xl md:text-7xl font-serif font-medium mb-4">The Ahmedabad Flagship</h2>
                    <p className="text-gray-300 text-lg md:text-xl font-light mb-8 max-w-2xl">
                        S.G. Highway • Gujarat's Premier Luxury Fleet Experience
                    </p>
                    <button className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors flex items-center gap-2">
                        View Location <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </section>

            {/* Main Content Split */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 flex flex-col lg:flex-row gap-16">

                {/* Left Panel: Info */}
                <div className="lg:w-1/3 space-y-12">

                    <div>
                        <h3 className="text-2xl font-serif font-medium mb-4">Showroom Access</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Visit our lounge to experience the fleet in person. Our concierge team is available around the clock to assist you with vehicle selection and test drives.
                        </p>
                    </div>

                    <div className="space-y-8">

                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                                <MapPin className="w-5 h-5 text-gray-300" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Location</h4>
                                <p className="font-serif text-lg mb-1">LUXEDIVE Premier Lounge</p>
                                <p className="text-gray-400 text-sm">Opposite Karnavati Club, S. G. Highway<br />Ahmedabad, Gujarat 380054</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                                <Clock className="w-5 h-5 text-gray-300" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Operating Hours</h4>
                                <p className="font-serif text-lg mb-1">Monday - Sunday, 24 Hours</p>
                                <button className="text-blue-400 text-sm hover:text-blue-300 underline underline-offset-4">Valet Available</button>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                                <Phone className="w-5 h-5 text-gray-300" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Concierge</h4>
                                <p className="font-serif text-lg mb-1">+91 98 0000 0000</p>
                                <button className="text-blue-400 text-sm hover:text-blue-300">Request Callback</button>
                            </div>
                        </div>

                    </div>

                    <button className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-3">
                        <Navigation className="w-4 h-4" /> Get Directions
                    </button>

                </div>

                {/* Right Panel: Map */}
                <div className="flex-1 min-h-[500px] bg-gray-900 rounded-2xl overflow-hidden relative border border-white/10">
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/1024px-Google_Maps_Logo_2020.svg.png')] bg-cover bg-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700" />

                    {/* Custom Pin Overlay */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
                        <div className="w-16 h-16 bg-black rounded-full border-4 border-white shadow-2xl flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                            <span className="font-serif font-bold text-xl">L</span>
                        </div>
                        <div className="mt-4 px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                            Flagship Store
                        </div>
                    </div>

                    {/* Zoom Controls */}
                    <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                        <button className="w-10 h-10 bg-black border border-white/20 rounded-lg text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center font-bold text-xl">+</button>
                        <button className="w-10 h-10 bg-black border border-white/20 rounded-lg text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center font-bold text-xl">-</button>
                    </div>
                </div>

            </div>

            {/* Inside the Lounge */}
            <section className="border-t border-white/10 bg-[#0F1218]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h3 className="text-3xl font-serif font-medium mb-3">Inside the Lounge</h3>
                            <p className="text-gray-400 max-w-lg">Experience automotive luxury in a space designed for comfort and privacy.</p>
                        </div>
                        <button className="hidden md:flex items-center gap-2 text-white hover:text-gray-300 transition-colors text-sm font-bold uppercase tracking-widest">
                            View Full Gallery <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px]">
                        <div className="relative group overflow-hidden rounded-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&q=80"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt="Lounge Interior"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-lg font-serif">VIP Lounge</span>
                            </div>
                        </div>
                        <div className="relative group overflow-hidden rounded-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1469285994282-454ceb49e63c?auto=format&fit=crop&q=80"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt="Car Interior"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-lg font-serif">Bespoke Interiors</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">

                    <div>
                        <h4 className="text-xl font-serif font-bold tracking-widest mb-6">LUXEDIVE</h4>
                        <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                            Redefining luxury mobility in Ahmedabad. Experience the art of drive.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-16">
                        <div>
                            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Company</h5>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Support</h5>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Contact Concierge</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Connect</h5>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                </div>
                <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-white/5 text-center md:text-left text-xs text-gray-600">
                    © 2024 LUXEDIVE. All rights reserved.
                </div>
            </footer>

        </div>
    );
};

export default ShowroomLocator;
