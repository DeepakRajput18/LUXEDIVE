import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import {
    ChevronRight,
    MapPin,
    Calendar,
    Clock,
    ArrowRight,
    Info,
    Car,
    HeadphonesIcon
} from 'lucide-react';

const ModifyBookingV1: React.FC = () => {
    const navigate = useNavigate();
    const { bookingId } = useParams<{ bookingId: string }>();

    // Mock State
    const [pickupDate, setPickupDate] = useState('2023-10-24');
    const [pickupTime, setPickupTime] = useState('10:00');
    const [pickupLocation, setPickupLocation] = useState('AMD_INT');

    const [dropoffDate, setDropoffDate] = useState('2023-10-27');
    const [dropoffTime, setDropoffTime] = useState('10:00');
    const [dropoffLocation, setDropoffLocation] = useState('AMD_INT');

    return (
        <div className="min-h-screen bg-gray-50 text-black font-sans pb-20">

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200 py-4 px-6 md:px-12">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>My Bookings</span> <ChevronRight className="w-3 h-3" />
                    <span className="text-black">Modify Reservation #{bookingId || '83921'}</span>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-12">

                <div className="mb-12">
                    <h1 className="text-4xl font-serif font-medium mb-3">Modify Reservation</h1>
                    <p className="text-gray-500">Update your itinerary or upgrade your vehicle for your upcoming trip to Ahmedabad.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Panel - Current Vehicle */}
                    <div className="lg:col-span-2 space-y-8">

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest bg-white border border-gray-200 px-3 py-1 rounded-full">
                                    Current Vehicle
                                </span>
                                <button className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                                    CHANGE VEHICLE <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="p-8 flex flex-col md:flex-row gap-8 items-center">
                                <div className="w-full md:w-1/2 aspect-[16/9] relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80"
                                        alt="Porsche 911"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <h2 className="text-2xl font-serif font-medium mb-2">Porsche 911 Carrera S</h2>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className="px-3 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">Automatic</span>
                                        <span className="px-3 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">2 Passengers</span>
                                        <span className="px-3 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">4 Bags</span>
                                    </div>
                                    <div className="space-y-2 text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span>Sport Package Included</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span>GPS Navigation Included</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Itinerary Details */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-black text-white rounded-lg">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">Itinerary Details</h3>
                                    <p className="text-xs text-green-600 font-bold uppercase tracking-wide">EDITABLE</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Pickup */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Pick-up</h4>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <label className="text-xs text-gray-400 block mb-1">Date</label>
                                            <input
                                                type="date"
                                                value={pickupDate}
                                                onChange={(e) => setPickupDate(e.target.value)}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm font-medium"
                                            />
                                        </div>
                                        <div className="relative">
                                            <label className="text-xs text-gray-400 block mb-1">Time</label>
                                            <input
                                                type="time"
                                                value={pickupTime}
                                                onChange={(e) => setPickupTime(e.target.value)}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="text-xs text-gray-400 block mb-1">Location</label>
                                        <select
                                            value={pickupLocation}
                                            onChange={(e) => setPickupLocation(e.target.value)}
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm font-medium appearance-none"
                                        >
                                            <option value="AMD_INT">Ahmedabad Intl. Airport (AMD)</option>
                                            <option value="SBEACH">SG Highway Showroom</option>
                                        </select>
                                        <MapPin className="absolute right-3 top-8 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Dropoff */}
                                <div className="space-y-4 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0 md:pl-8">
                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Return</h4>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <label className="text-xs text-gray-400 block mb-1">Date</label>
                                            <input
                                                type="date"
                                                value={dropoffDate}
                                                onChange={(e) => setDropoffDate(e.target.value)}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm font-medium"
                                            />
                                        </div>
                                        <div className="relative">
                                            <label className="text-xs text-gray-400 block mb-1">Time</label>
                                            <input
                                                type="time"
                                                value={dropoffTime}
                                                onChange={(e) => setDropoffTime(e.target.value)}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="text-xs text-gray-400 block mb-1">Location</label>
                                        <select
                                            value={dropoffLocation}
                                            onChange={(e) => setDropoffLocation(e.target.value)}
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm font-medium appearance-none"
                                        >
                                            <option value="AMD_INT">Same as pick-up location</option>
                                            <option value="SBEACH">SG Highway Showroom</option>
                                        </select>
                                        <MapPin className="absolute right-3 top-8 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                            </div>

                            {/* Map Preview Placeholder */}
                            <div className="mt-8 h-48 bg-gray-100 rounded-lg relative overflow-hidden flex items-center justify-center text-gray-400 text-sm font-medium border border-gray-200">
                                <MapPin className="w-6 h-6 mr-2 text-gray-300" /> Map Preview: Ahmedabad, GJ
                            </div>
                        </div>

                        {/* Policy Notice */}
                        <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg flex items-start gap-3">
                            <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-yellow-800 leading-relaxed">
                                <strong>Cancellation Policy Update:</strong> Modifying your dates may affect your eligibility for free cancellation. Please review the updated terms before confirming.
                            </p>
                        </div>

                    </div>


                    {/* Right Panel - Price Summary & Actions */}
                    <div className="lg:col-span-1">
                        <div className="bg-black text-white rounded-xl p-8 sticky top-24 shadow-2xl shadow-gray-200">
                            <h3 className="text-lg font-serif font-medium mb-8">Price Summary</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Original Booking</span>
                                    <span className="line-through decoration-red-500">₹95,000.00</span>
                                </div>
                                <div className="flex justify-between text-white font-medium text-lg">
                                    <span>New Total Estimate</span>
                                    <span>₹1,15,000.00</span>
                                </div>
                                <div className="pt-4 border-t border-white/20 flex justify-between items-baseline">
                                    <span className="text-sm text-gray-400">Due Today</span>
                                    <span className="text-3xl font-serif text-white ml-2">+₹20,000.00</span>
                                </div>
                                <p className="text-xs text-gray-500 text-right">Includes all applicable taxes & insurance.</p>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={() => navigate('/modification-confirmed')}
                                    className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    CONFIRM CHANGES <ArrowRight className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="w-full py-2 text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    Discard Changes
                                </button>
                            </div>

                            {/* Concierge Help */}
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-white/10 rounded-full">
                                        <HeadphonesIcon className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-bold text-white uppercase tracking-widest">Need Assistance?</span>
                                </div>
                                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                                    Our concierge team is available 24/7 to help you with your booking modifications and bespoke requests.
                                </p>
                                <button className="text-xs font-bold text-white border-b border-white hover:opacity-80 pb-0.5">
                                    CONTACT SUPPORT
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
};

// Simple Icon component helper
const CheckCircle = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

export default ModifyBookingV1;
