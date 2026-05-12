import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calendar, MapPin, Download, CreditCard, RotateCcw, MoreVertical, Clock, ShieldCheck
} from 'lucide-react';
import type { Booking } from '../../types/app.types';
import { Button } from '../ui/Button';

interface BookingCardProps {
    booking: Booking;
    onCancel: (id: string) => void;
    onDownloadInvoice: (id: string) => void;
}

const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
        case 'confirmed':
            return <div className="bg-emerald-900/30 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded border border-emerald-900/50 uppercase tracking-wider backdrop-blur-sm">Confirmed</div>;
        case 'pending_payment':
            return <div className="bg-amber-900/30 text-amber-400 text-[10px] font-bold px-2 py-1 rounded border border-amber-900/50 uppercase tracking-wider backdrop-blur-sm">Payment Pending</div>;
        case 'completed':
            return <div className="bg-white/5 text-gray-300 text-[10px] font-bold px-2 py-1 rounded border border-white/10 uppercase tracking-wider backdrop-blur-sm">Completed</div>;
        case 'cancelled':
            return <div className="bg-red-900/30 text-red-400 text-[10px] font-bold px-2 py-1 rounded border border-red-900/50 uppercase tracking-wider backdrop-blur-sm">Cancelled</div>;
        default:
            return <div className="bg-blue-900/30 text-blue-400 text-[10px] font-bold px-2 py-1 rounded border border-blue-900/50 uppercase tracking-wider backdrop-blur-sm">{status.replace('_', ' ')}</div>;
    }
};

export const BookingCard: React.FC<BookingCardProps> = ({ booking, onCancel, onDownloadInvoice }) => {
    const navigate = useNavigate();
    // Fallback if car data is missing
    const car = booking.car || {
        brand: 'Unknown Vehicle',
        model: '',
        category: 'N/A',
        year: 0,
        images: [],
        license_plate: 'N/A'
    };

    const pickupDate = new Date(booking.pickup_datetime);
    const dropoffDate = new Date(booking.dropoff_datetime);

    const getLocationString = (loc: any) => {
        if (!loc) return 'LuxeDive HQ';
        if (typeof loc === 'string') return loc;
        return loc.address || 'LuxeDive HQ';
    }

    const location = getLocationString(booking.pickup_location);

    return (
        <div className="bg-[#12141a] text-white rounded-xl border border-white/5 overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-300 group shadow-lg">
            <div className="flex flex-col md:flex-row">

                {/* Image Section */}
                <div className="md:w-1/3 relative min-h-[220px] bg-black/50">
                    <img
                        src={car.images?.[0] || 'https://images.unsplash.com/photo-1503376763036-066120622c74'}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute top-4 left-4 z-10">
                        {getStatusBadge(booking.status)}
                    </div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12141a] to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#12141a]"></div>
                </div>

                {/* Content Section */}
                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-serif font-bold text-white leading-tight flex items-center gap-2">
                                    {car.brand} {car.model}
                                </h3>
                                <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-widest">
                                    {car.category} • {car.year}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-mono text-gray-500 uppercase">Booking ID</p>
                                <p className="font-mono text-xs font-medium text-gray-300">#{booking.id.slice(0, 8).toUpperCase()}</p>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-6">

                            {/* Dates */}
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-4 h-4 text-[#D4AF37] mt-0.5" />
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Trip Dates</p>
                                        <p className="text-sm font-semibold text-gray-200">
                                            {pickupDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} — {dropoffDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            {pickupDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} pickup
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Cost & Loc */}
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 justify-between sm:justify-start">
                                    <div className="flex gap-3">
                                        <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5" />
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Location</p>
                                            <p className="text-sm font-medium text-gray-200 truncate max-w-[180px]">{location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Footer / Actions */}
                    <div className="pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">

                        {/* Price Display */}
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Total Amount</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-lg font-serif font-bold text-white">
                                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(booking.total_price)}
                                </span>
                                {(booking.status === 'confirmed' || booking.status === 'completed') &&
                                    <span className="text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 py-0.5 rounded border border-[#D4AF37]/20">PAID</span>
                                }
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 justify-end">

                            {booking.status === 'confirmed' && (
                                <>
                                    <button
                                        className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-white/10 text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                                        onClick={() => onCancel(booking.id)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
                                        onClick={() => onDownloadInvoice(booking.id)}
                                    >
                                        <Download size={14} /> Invoice
                                    </button>
                                    <button
                                        className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg bg-[#D4AF37] text-black hover:bg-[#C4A030] shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all"
                                        onClick={() => navigate(`/rental/${booking.id}/tracking`)}
                                    >
                                        Track Car
                                    </button>
                                </>
                            )}

                            {['completed', 'cancelled'].includes(booking.status) && (
                                <button
                                    className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                                    onClick={() => navigate(`/fleet/${booking.car_id}`)}
                                >
                                    <RotateCcw size={14} /> Book Again
                                </button>
                            )}

                            {booking.status === 'completed' && (
                                <button
                                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg text-gray-400 hover:text-white transition-colors"
                                    onClick={() => onDownloadInvoice(booking.id)}
                                >
                                    Invoice
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
