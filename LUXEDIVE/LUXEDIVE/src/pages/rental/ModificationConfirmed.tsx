import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import {
    CheckCircle,
    Clock,
    MapPin,
    RefreshCw,
    ArrowRight,
    Download,
    Calendar
} from 'lucide-react';

interface ModificationDetails {
    bookingRef: string;
    vehicleName: string;
    vehicleImage: string;
    oldSchedule: {
        pickup: string;
        dropoff: string;
        location: string;
    };
    newSchedule: {
        pickup: string;
        dropoff: string;
        location: string;
        isExtended: boolean;
    };
    priceDelta: number;
    oldTotal: number;
    newTotal: number;
    cardLast4: string;
}

const ModificationConfirmed: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [details, setDetails] = useState<ModificationDetails | null>(null);

    useEffect(() => {
        // Mock fetching modification details from URL param or state
        // const bookingId = searchParams.get('id');
        // fetchModificationDetails(bookingId);

        // Simulated Data
        setDetails({
            bookingRef: 'LX-8842-MD',
            vehicleName: 'Audi RS7 Sportback',
            vehicleImage: 'https://images.unsplash.com/photo-1603584173870-7b299f589c00?auto=format&fit=crop&q=80',
            oldSchedule: {
                pickup: 'Oct 12, 2023, 10:00 AM',
                dropoff: 'Oct 15, 2023, 10:00 AM',
                location: 'Mumbai International Airport (BOM)'
            },
            newSchedule: {
                pickup: 'Oct 12, 2023, 10:00 AM',
                dropoff: 'Oct 18, 2023, 06:00 PM',
                location: 'Mumbai International Airport (BOM)',
                isExtended: true
            },
            priceDelta: 1200,
            oldTotal: 43800,
            newTotal: 45000,
            cardLast4: '4242'
        });
    }, []);

    if (!details) return null;

    return (
        <div className="min-h-screen bg-white text-black font-sans flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500" />
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-green-50 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl w-full bg-white relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-serif font-medium mb-4 text-green-900">Booking Successfully Updated</h1>
                    <p className="text-gray-500 text-lg">Your reservation for the <span className="text-black font-medium">{details.vehicleName}</span> has been modified.</p>
                    <p className="text-xs font-mono text-gray-400 mt-4 uppercase tracking-widest">Ref: {details.bookingRef}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

                    {/* Old Schedule */}
                    <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 relative opacity-60">
                        <div className="absolute top-4 right-4 text-gray-400">
                            <Clock className="w-5 h-5" />
                        </div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Previous Schedule</h3>
                        <div className="space-y-6">
                            <div>
                                <p className="text-xs text-gray-400 mb-1">Pick-up</p>
                                <p className="text-gray-600 font-medium">{details.oldSchedule.pickup}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-1">Drop-off</p>
                                <p className="text-gray-600 font-medium">{details.oldSchedule.dropoff}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-1">Location</p>
                                <p className="text-gray-600 font-medium flex items-center gap-2">
                                    <MapPin className="w-3 h-3" /> {details.oldSchedule.location}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* New Schedule */}
                    <div className="p-8 rounded-2xl bg-green-50 border border-green-100 relative shadow-lg shadow-green-900/5">
                        <div className="absolute top-4 right-4 text-green-600">
                            <RefreshCw className="w-5 h-5" />
                        </div>
                        <h3 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-6">Updated Schedule</h3>
                        <div className="space-y-6">
                            <div>
                                <p className="text-xs text-green-700/60 mb-1">Pick-up</p>
                                <p className="text-green-900 font-medium">{details.newSchedule.pickup}</p>
                            </div>
                            <div className="relative">
                                {details.newSchedule.isExtended && (
                                    <span className="absolute -top-1 -right-2 px-2 py-0.5 bg-green-200 text-green-800 text-[10px] font-bold rounded uppercase">Extended</span>
                                )}
                                <p className="text-xs text-green-700/60 mb-1">Drop-off</p>
                                <p className="text-green-900 font-medium">{details.newSchedule.dropoff}</p>
                            </div>
                            <div>
                                <p className="text-xs text-green-700/60 mb-1">Location</p>
                                <p className="text-green-900 font-medium flex items-center gap-2">
                                    <MapPin className="w-3 h-3" /> {details.newSchedule.location}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end border-t border-gray-100 pt-12">

                    {/* Vehicle Card */}
                    <div className="flex items-center gap-6">
                        <div className="w-32 h-20 rounded-lg overflow-hidden relative bg-gray-100">
                            <img src={details.vehicleImage} alt={details.vehicleName} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Maserati</span>
                            <p className="font-serif text-xl font-medium text-black">{details.vehicleName}</p>
                            <a href="#" className="text-xs text-blue-600 hover:underline mt-1 inline-block">View Specs</a>
                        </div>
                    </div>

                    {/* Price Summary */}
                    <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Price Adjustment Summary</p>
                        <div className="flex items-end justify-end gap-2 mb-1">
                            <span className="text-3xl font-serif text-green-700 font-medium">+₹{details.priceDelta.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-4">Charged to card ending in •••• {details.cardLast4}</p>

                        <div className="inline-flex flex-col items-end gap-1 text-xs text-gray-500 font-mono bg-gray-50 p-3 rounded border border-gray-100">
                            <div className="flex justify-between w-40">
                                <span>Old Total:</span>
                                <span className="line-through">₹{details.oldTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between w-40 text-black font-bold">
                                <span>New Total:</span>
                                <span>₹{details.newTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-4">
                    <button
                        onClick={() => navigate('/dashboard/bookings/LX-8842-MD')}
                        className="px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg shadow-lg shadow-green-900/20 transition-all flex items-center gap-2"
                    >
                        VIEW UPDATED ITINERARY <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-8 py-4 bg-white border border-gray-200 text-gray-600 hover:text-black hover:border-black font-medium rounded-lg transition-all"
                    >
                        Return to Dashboard
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <button className="text-xs font-medium text-gray-400 hover:text-gray-600 flex items-center justify-center gap-2 mx-auto">
                        <Download className="w-3 h-3" /> Download Revised Invoice
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ModificationConfirmed;
