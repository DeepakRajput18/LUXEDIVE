import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    HelpCircle,
    Shield,
    Ticket,
    MessageCircle,
    Phone,
    MapPin,
    ChevronDown,
    ChevronUp,
    Download,
    ArrowRight,
    Send
} from 'lucide-react';

const SupportCenter: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'faq' | 'policies' | 'ticket'>('faq');
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "What documents are required for booking?",
            answer: "To rent a luxury vehicle, you must provide a valid Driving License, and an Aadhar Card or Passport for identity proof. For our Super Luxury tier (e.g., Mercedes S-Class, BMW 7 Series), a secondary credit card authorization and a clean driving record check may be mandatory."
        },
        {
            question: "How does the security deposit refund work?",
            answer: "Security deposits are released within 24 hours of vehicle return, provided there are no damages. Depending on your bank, it may take 3-5 business days to reflect in your account."
        },
        {
            question: "What is the fuel policy for luxury rentals?",
            answer: "We provide vehicles with a full tank of premium fuel. We expect the vehicle to be returned with a full tank. Alternatively, we can refuel for you at current market rates plus a small convenience fee."
        },
        {
            question: "Do you offer chauffeur services for weddings?",
            answer: "Yes, we offer professional, uniformed chauffeurs for weddings and special events. Please select the 'Chauffeur Service' add-on during your booking process."
        },
        {
            question: "What happens if I return the car late?",
            answer: "A grace period of 60 minutes is allowed. Beyond that, hourly charges apply. Returns delayed by more than 4 hours will sustain a full day's rental charge."
        }
    ];

    return (
        <div className="min-h-screen bg-white text-black font-sans">

            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
                    <h1 className="text-xl font-serif font-bold tracking-widest cursor-pointer" onClick={() => navigate('/')}>LUXEDIVE</h1>
                    <nav className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-500">
                        <a href="/fleet" className="hover:text-black transition-colors">Fleet</a>
                        <a href="/services" className="hover:text-black transition-colors">Services</a>
                        <a href="/about" className="hover:text-black transition-colors">About Us</a>
                        <a href="#" className="text-black border-b-2 border-black pb-1">Help Center</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/auth/login')} className="text-xs font-bold uppercase tracking-widest hover:text-gray-600">Sign In</button>
                        <button className="px-5 py-2.5 bg-black text-white font-bold uppercase tracking-widest text-[10px] hover:bg-gray-800 transition-colors">Join Club</button>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="bg-gray-50 py-20 px-6 md:px-12 text-center border-b border-gray-200">
                <div className="max-w-3xl mx-auto">
                    <span className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-4 block">Concierge Desk</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6 text-gray-900">Support & Concierge</h2>
                    <p className="text-gray-500 text-lg mb-10 font-light">
                        Experience absolute peace of mind. Find answers, review policies, or contact our dedicated support team.
                    </p>

                    <div className="relative max-w-xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search FAQs, policies, or troubleshooting..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <button className="absolute right-2 top-2 bottom-2 bg-black text-white px-6 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                            Search
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col lg:flex-row gap-16">

                {/* Left Column: Navigation & Content */}
                <div className="flex-1">

                    {/* Tabs */}
                    <div className="flex items-center gap-1 border-b border-gray-200 mb-10 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('faq')}
                            className={`px-6 py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap ${activeTab === 'faq' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                        >
                            <span className="flex items-center gap-2"><HelpCircle className="w-4 h-4" /> FAQs</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('policies')}
                            className={`px-6 py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap ${activeTab === 'policies' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                        >
                            <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Rental Policies</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('ticket')}
                            className={`px-6 py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap ${activeTab === 'ticket' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                        >
                            <span className="flex items-center gap-2"><Ticket className="w-4 h-4" /> Raise a Ticket</span>
                        </button>
                    </div>

                    {/* Content: FAQ */}
                    {activeTab === 'faq' && (
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300"
                                >
                                    <button
                                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                        className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors text-left"
                                    >
                                        <span className="font-bold text-gray-900">{faq.question}</span>
                                        {openFaqIndex === index ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                    </button>
                                    {openFaqIndex === index && (
                                        <div className="p-6 pt-0 text-gray-600 leading-relaxed text-sm bg-white">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Content: Policies */}
                    {activeTab === 'policies' && (
                        <div>
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-serif font-medium">Rental Agreement Terms</h3>
                                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-blue-700 border border-blue-100 bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                                    <Download className="w-4 h-4" /> Download PDF
                                </button>
                            </div>

                            <div className="space-y-8 text-gray-600 text-sm leading-relaxed">
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-2 uppercase tracking-wide text-xs">1. General Rental Conditions</h4>
                                    <p className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                        The Renter agrees to the provisions of this contract and has received a copy thereof. The vehicle is delivered in good general condition and clean. The Renter agrees to return the vehicle in the same condition, with all documents, parts, and accessories, at the location and on the date designated in this Agreement.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-900 mb-2 uppercase tracking-wide text-xs">2. Use of Vehicle</h4>
                                    <p className="mb-4">The vehicle must not be used:</p>
                                    <ul className="space-y-3 pl-4">
                                        <li className="flex gap-3">
                                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                            <span>For any illegal purposes or in connection with any illegal activity.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                            <span>To participate in any race, rally, test, or other competitive event.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                            <span>To tow or tow any other vehicle, trailer, or other object.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                            <span>To carry passengers other than the authorized driver details provided during booking.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content: Ticket */}
                    {activeTab === 'ticket' && (
                        <div className="max-w-2xl">
                            <div className="mb-8">
                                <h3 className="text-xl font-serif font-medium mb-2">Submit a Request</h3>
                                <p className="text-gray-500 text-sm">Our concierge team typically responds within 2 hours during business hours.</p>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Issue Category</label>
                                        <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5">
                                            <option>Booking Modification</option>
                                            <option>Billing & Refunds</option>
                                            <option>Technical Support</option>
                                            <option>Other Inquiry</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Priority Level</label>
                                        <div className="flex gap-2">
                                            {['Low', 'Medium', 'High'].map((p) => (
                                                <label key={p} className="flex-1 cursor-pointer">
                                                    <input type="radio" name="priority" className="peer sr-only" />
                                                    <div className="w-full h-full flex items-center justify-center py-3 rounded-xl border border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-400 peer-checked:bg-black peer-checked:text-white peer-checked:border-black transition-all">
                                                        {p}
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Subject</label>
                                    <input type="text" placeholder="E.g., Refund for booking #LD-2023-889" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Description</label>
                                    <textarea rows={6} placeholder="Please describe your issue in detail..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 resize-none" />
                                </div>

                                <button className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                    Submit Ticket <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    )}

                </div>

                {/* Right Sidebar - Contact Cards */}
                <div className="w-full lg:w-80 flex-shrink-0 space-y-6">

                    {/* WhatsApp Card */}
                    <div className="group bg-green-50 border border-green-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                                <MessageCircle className="w-5 h-5" />
                            </div>
                            <span className="px-2 py-1 bg-white text-green-600 border border-green-200 text-[10px] font-bold uppercase tracking-wide rounded">Fastest</span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">WhatsApp Support</h3>
                        <p className="text-sm text-gray-500 mb-6">Connect instantly with our concierge desk for quick assistance.</p>
                        <button className="w-full py-3 bg-white border border-green-200 text-green-700 font-bold rounded-lg text-xs uppercase tracking-widest hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors">
                            Chat Now
                        </button>
                    </div>

                    {/* Helpline Card */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                                <Phone className="w-5 h-5" />
                            </div>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">24/7 Helpline</h3>
                        <p className="text-sm text-gray-500 mb-6">Urgent roadside assistance or booking emergencies.</p>
                        <button className="w-full py-3 bg-gray-100 text-gray-900 font-bold rounded-lg text-xs tracking-wider hover:bg-gray-200 transition-colors">
                            +91 79 1234 5678
                        </button>
                    </div>

                    {/* Location Card */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                <MapPin className="w-5 h-5" />
                            </div>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Visit our HQ</h3>
                        <p className="text-sm text-gray-500 mb-4">S.G. Highway, Bodakdev, Ahmedabad, Gujarat 380054</p>

                        <div className="h-24 bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/1024px-Google_Maps_Logo_2020.svg.png')] bg-cover bg-center opacity-70" />
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest hover:text-blue-800">
                            Get Directions <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default SupportCenter;
