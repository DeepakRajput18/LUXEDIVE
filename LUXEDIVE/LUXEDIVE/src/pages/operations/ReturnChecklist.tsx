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
    Car,
    DollarSign
} from 'lucide-react';

interface CheckItem {
    id: string;
    label: string;
    status: 'good' | 'damaged';
    notes?: string;
    photos?: string[];
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

const ReturnChecklist: React.FC = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [booking, setBooking] = useState<any>(null);
    const [handoverData, setHandoverData] = useState<any>(null);

    // Form State
    const [odometer, setOdometer] = useState<number | ''>('');
    const [fuelLevel, setFuelLevel] = useState<number>(100);
    const [checklist, setChecklist] = useState<CheckItem[]>(
        ZONES.map(z => ({ id: z.id, label: z.label, status: 'good', notes: '', photos: [] }))
    );
    const [signName, setSignName] = useState('');
    const [cleanliness, setCleanliness] = useState<'clean' | 'moderate' | 'messy'>('clean');

    // Fines
    const [incidentalCharges, setIncidentalCharges] = useState(0);

    useEffect(() => {
        if (bookingId) fetchBooking();
    }, [bookingId]);

    const fetchBooking = async () => {
        // Get booking and previous handover checklist
        const { data: bookingData } = await supabase
            .from('bookings')
            .select('*, car:cars(*), profile:profiles(*)')
            .eq('id', bookingId)
            .single();

        if (bookingData) {
            setBooking(bookingData);

            // Try fetch handover data for comparison
            const { data: checklistData } = await supabase
                .from('vehicle_checklists')
                .select('*')
                .eq('booking_id', bookingId)
                .eq('checklist_type', 'handover')
                .single();

            if (checklistData) setHandoverData(checklistData);
        }
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
        if (!odometer || !signName) {
            toast.error("Please complete all mandatory fields");
            return;
        }

        setLoading(true);
        try {
            // 1. Create Return Checklist
            const { error } = await supabase
                .from('vehicle_checklists')
                .insert({
                    booking_id: bookingId,
                    car_id: booking?.car_id,
                    checklist_type: 'return',
                    odometer_reading: Number(odometer),
                    fuel_level: fuelLevel,
                    condition_report: {
                        zones: checklist,
                        cleanliness,
                        incidental_charges: incidentalCharges
                    },
                    signed_by_name: signName,
                    status: 'completed',
                    created_at: new Date().toISOString()
                });

            if (error) throw error;

            // 2. Update Booking Status -> Completed (or pending_audit if damaged)
            const finalStatus = incidentalCharges > 0 || checklist.some(i => i.status === 'damaged')
                ? 'pending_audit'
                : 'completed';

            await supabase
                .from('bookings')
                .update({
                    status: finalStatus,
                    dropoff_datetime: new Date().toISOString()
                })
                .eq('id', bookingId);

            // 3. Release deposit if no issues (Simulated)
            if (finalStatus === 'completed') {
                toast.success("Return processed successfully. Deposit released.");
            } else {
                toast.warning("Return processed with reported issues/charges. Sent for audit.");
            }

            navigate('/admin/bookings');
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit return.");
        } finally {
            setLoading(false);
        }
    };

    if (!booking) return <div className="p-10 text-center">Loading Data...</div>;

    const distanceTraveled = handoverData && odometer ? Number(odometer) - handoverData.odometer_reading : 0;

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900">
            {/* Header */}
            <header className="bg-black text-white p-6 sticky top-0 z-40 shadow-md">
                <div className="flex items-center gap-4 mb-4">
                    <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>
                    <h1 className="text-xl font-bold uppercase tracking-widest text-emerald-400">Digital Return</h1>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Booking Ref</p>
                        <p className="font-mono text-lg font-bold text-white">#{bookingId?.slice(0, 8)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold">{booking.car?.brand} {booking.car?.model}</p>
                        <p className="text-xs text-green-400 font-bold uppercase tracking-wider">Completing Rental</p>
                    </div>
                </div>
            </header>

            <div className="max-w-xl mx-auto p-6 space-y-8">

                {/* 1. Comparison Stats */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-serif font-bold text-lg mb-4 flex items-center gap-2">
                        <Gauge className="w-5 h-5 text-luxe-gold" /> Usage Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-[10px] uppercase font-bold text-gray-400">Start Odometer</p>
                            <p className="font-mono font-bold">{handoverData?.odometer_reading || '---'} km</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-[10px] uppercase font-bold text-gray-400">Start Fuel</p>
                            <p className="font-mono font-bold">{handoverData?.fuel_level || '--'}%</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Return Odometer</label>
                            <input
                                type="number"
                                value={odometer}
                                onChange={e => setOdometer(e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-full bg-gray-50 border border-gray-300 p-3 rounded-lg font-mono font-bold focus:ring-2 focus:ring-black/10 transition-all"
                                placeholder="e.g. 12800"
                            />
                            {distanceTraveled > 0 && (
                                <p className="text-xs text-blue-600 font-bold mt-1 text-right">Trip: {distanceTraveled} km</p>
                            )}
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">Return Fuel Level</label>
                                <span className={`font-bold ${fuelLevel < 30 ? 'text-red-500' : 'text-emerald-600'}`}>{fuelLevel}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={fuelLevel}
                                onChange={e => setFuelLevel(Number(e.target.value))}
                                className="w-full accent-black h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Condition Checklist */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-serif font-bold text-lg mb-4 flex items-center gap-2">
                        <Car className="w-5 h-5 text-luxe-gold" /> Final Inspection
                    </h3>
                    <div className=" mb-6">
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Interior Cleanliness</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['clean', 'moderate', 'messy'].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => setCleanliness(opt as any)}
                                    className={`py-2 text-xs font-bold uppercase border rounded-lg transition-all ${cleanliness === opt ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200'}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6 border-t border-gray-100 pt-6">
                        {checklist.map((item) => (
                            <div key={item.id} className="pb-4 border-b border-gray-100 last:border-0">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold text-sm">{item.label}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => updateStatus(item.id, 'good')}
                                            className={`px-3 py-1.5 rounded text-xs font-bold uppercase flex items-center gap-1 transition-colors ${item.status === 'good' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-gray-50 text-gray-400 border border-gray-200'}`}
                                        >
                                            <CheckCircle className="w-3 h-3" /> OK
                                        </button>
                                        <button
                                            onClick={() => updateStatus(item.id, 'damaged')}
                                            className={`px-3 py-1.5 rounded text-xs font-bold uppercase flex items-center gap-1 transition-colors ${item.status === 'damaged' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-gray-50 text-gray-400 border border-gray-200'}`}
                                        >
                                            <AlertTriangle className="w-3 h-3" /> New Damage
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
                                        <p className="text-xs text-red-600 font-bold">* Please take clear photos for the database.</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Incidentals */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-serif font-bold text-lg mb-4 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-luxe-gold" /> Charges & Fees
                    </h3>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Incidental Charges (Fuel, Late, Cleaning)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-gray-400 font-bold">₹</span>
                            <input
                                type="number"
                                value={incidentalCharges}
                                onChange={e => setIncidentalCharges(Number(e.target.value))}
                                className="w-full bg-gray-50 border border-gray-300 p-3 pl-8 rounded-lg font-mono font-bold"
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Enter 0 if no additional charges apply.</p>
                    </div>
                </div>

                {/* 4. Agent Sign Off */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-serif font-bold text-lg mb-4">Agent Verification</h3>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Processed By (Agent Name)</label>
                        <input
                            type="text"
                            value={signName}
                            onChange={e => setSignName(e.target.value)}
                            placeholder="Enter full name"
                            className="w-full bg-gray-50 border border-gray-300 p-3 rounded-lg"
                        />
                    </div>
                </div>

                {/* Action */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                    {loading ? 'Processing...' : (
                        <>
                            <Save className="w-5 h-5" /> Finalize Return
                        </>
                    )}
                </button>

            </div>
        </div>
    );
};

export default ReturnChecklist;
