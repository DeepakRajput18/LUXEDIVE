import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'sonner';
import {
    CheckCircle,
    XCircle,
    Camera,
    Upload,
    Fuel,
    Gauge,
    Save,
    ArrowLeft,
    AlertTriangle,
    Car
} from 'lucide-react';

interface CheckItem {
    id: string;
    label: string;
    status: 'good' | 'damaged';
    notes?: string;
    photos?: string[]; // URLs
}

const ZONES = [
    { id: 'front', label: 'Front Bumper & Grille' },
    { id: 'rear', label: 'Rear Bumper & Trunk' },
    { id: 'left', label: 'Left Side (Driver)' },
    { id: 'right', label: 'Right Side (Passenger)' },
    { id: 'wheels', label: 'Wheels & Tyres' },
    { id: 'glass', label: 'Windshield & Windows' },
    { id: 'interior', label: 'Interior Upholstery' },
    { id: 'dashboard', label: 'Dashboard & Electronics' }
];

const HandoverChecklist: React.FC = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [booking, setBooking] = useState<any>(null);

    // Form State
    const [odometer, setOdometer] = useState<number | ''>('');
    const [fuelLevel, setFuelLevel] = useState<number>(100);
    const [checklist, setChecklist] = useState<CheckItem[]>(
        ZONES.map(z => ({ id: z.id, label: z.label, status: 'good', notes: '', photos: [] }))
    );
    const [signName, setSignName] = useState('');
    const [agreed, setAgreed] = useState(false);

    useEffect(() => {
        if (bookingId) fetchBooking();
    }, [bookingId]);

    const fetchBooking = async () => {
        const { data } = await supabase
            .from('bookings')
            .select('*, car:cars(*), profile:profiles(*)')
            .eq('id', bookingId)
            .single();
        if (data) setBooking(data);
    };

    const updateStatus = (id: string, status: 'good' | 'damaged') => {
        setChecklist(prev => prev.map(item =>
            item.id === id ? { ...item, status } : item
        ));
    };

    const updateNotes = (id: string, notes: string) => {
        setChecklist(prev => prev.map(item =>
            item.id === id ? { ...item, notes } : item
        ));
    };

    const handleSubmit = async () => {
        if (!odometer || !signName || !agreed) {
            toast.error("Please complete all mandatory fields");
            return;
        }

        setLoading(true);
        try {
            // 1. Create Checklist Record
            const { error } = await supabase
                .from('vehicle_checklists')
                .insert({
                    booking_id: bookingId,
                    car_id: booking?.car_id,
                    checklist_type: 'handover', // or 'pickup'
                    odometer_reading: Number(odometer),
                    fuel_level: fuelLevel,
                    condition_report: checklist,
                    signed_by_name: signName,
                    status: 'completed',
                    created_at: new Date().toISOString()
                });

            if (error) throw error;

            // 2. Update Booking Status -> Active
            await supabase
                .from('bookings')
                .update({ status: 'active', pickup_datetime: new Date().toISOString() }) // Mark actual start
                .eq('id', bookingId);

            toast.success("Handover complete! Rental is now active.");
            navigate('/admin/bookings'); // Or wherever appropriate
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit handover. Check console.");
        } finally {
            setLoading(false);
        }
    };

    if (!booking) return <div className="p-10 text-center">Loading Booking...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900">
            {/* Header */}
            <header className="bg-black text-white p-6 sticky top-0 z-40 shadow-md">
                <div className="flex items-center gap-4 mb-4">
                    <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>
                    <h1 className="text-xl font-bold uppercase tracking-widest">Digital Handover</h1>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Booking Ref</p>
                        <p className="font-mono text-lg font-bold text-luxe-gold">#{bookingId?.slice(0, 8)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold">{booking.car?.brand} {booking.car?.model}</p>
                        <p className="text-xs text-gray-400">{booking.profile?.full_name}</p>
                    </div>
                </div>
            </header>

            <div className="max-w-xl mx-auto p-6 space-y-8">

                {/* 1. Vitals */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-serif font-bold text-lg mb-4 flex items-center gap-2">
                        <Gauge className="w-5 h-5 text-luxe-gold" /> Vehicle Vitals
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Odometer Reading (km)</label>
                            <input
                                type="number"
                                value={odometer}
                                onChange={e => setOdometer(e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-full bg-gray-50 border border-gray-300 p-3 rounded-lg font-mono font-bold"
                                placeholder="e.g. 12500"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">Fuel / Battery Level</label>
                                <span className="font-bold text-emerald-600">{fuelLevel}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={fuelLevel}
                                onChange={e => setFuelLevel(Number(e.target.value))}
                                className="w-full accent-black h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-gray-400 mt-1 uppercase">
                                <span>Empty</span>
                                <span>Quarter</span>
                                <span>Half</span>
                                <span>Full</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Condition Checklist */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-serif font-bold text-lg mb-4 flex items-center gap-2">
                        <Car className="w-5 h-5 text-luxe-gold" /> Condition Report
                    </h3>
                    <div className="space-y-6">
                        {checklist.map((item) => (
                            <div key={item.id} className="pb-4 border-b border-gray-100 last:border-0">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold text-sm">{item.label}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => updateStatus(item.id, 'good')}
                                            className={`px-3 py-1.5 rounded text-xs font-bold uppercase flex items-center gap-1 transition-colors ${item.status === 'good' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-gray-50 text-gray-400 border border-gray-200'}`}
                                        >
                                            <CheckCircle className="w-3 h-3" /> Good
                                        </button>
                                        <button
                                            onClick={() => updateStatus(item.id, 'damaged')}
                                            className={`px-3 py-1.5 rounded text-xs font-bold uppercase flex items-center gap-1 transition-colors ${item.status === 'damaged' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-gray-50 text-gray-400 border border-gray-200'}`}
                                        >
                                            <AlertTriangle className="w-3 h-3" /> Issue
                                        </button>
                                    </div>
                                </div>

                                {item.status === 'damaged' && (
                                    <div className="bg-red-50 p-3 rounded-lg space-y-3 animate-fade-in">
                                        <textarea
                                            placeholder="Describe the damage..."
                                            value={item.notes}
                                            onChange={e => updateNotes(item.id, e.target.value)}
                                            className="w-full text-sm p-2 rounded bg-white border border-red-200 focus:outline-none focus:border-red-400"
                                            rows={2}
                                        />
                                        <button className="w-full py-2 bg-white border border-red-200 text-red-600 rounded text-xs font-bold uppercase flex items-center justify-center gap-2 hover:bg-red-50">
                                            <Camera className="w-4 h-4" /> Add Photo
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Sign Off */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-serif font-bold text-lg mb-4">Digital Sign-Off</h3>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            By signing below, I acknowledge that the vehicle condition recorded above is accurate and I accept full responsibility for the vehicle during the rental period.
                        </p>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <input
                                type="checkbox"
                                id="agree"
                                checked={agreed}
                                onChange={e => setAgreed(e.target.checked)}
                                className="w-5 h-5 accent-black"
                            />
                            <label htmlFor="agree" className="text-sm font-bold">I confirm the vehicle condition.</label>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Signed By (Name)</label>
                            <input
                                type="text"
                                value={signName}
                                onChange={e => setSignName(e.target.value)}
                                placeholder="Enter full name"
                                className="w-full bg-gray-50 border border-gray-300 p-3 rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Action */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                    {loading ? 'Processing...' : (
                        <>
                            <Save className="w-5 h-5" /> Complete Handover
                        </>
                    )}
                </button>

            </div>
        </div>
    );
};

export default HandoverChecklist;
