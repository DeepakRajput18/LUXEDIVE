import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import {
    AlertTriangle,
    CreditCard,
    CheckCircle,
    Calendar,
    ArrowRight
} from 'lucide-react';

const FinesTracker: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [fines, setFines] = useState<any[]>([]);

    useEffect(() => {
        if (user) fetchFines();
    }, [user]);

    const fetchFines = async () => {
        // In a real app, this would query a dedicated 'fines' table or 'vehicle_checklists'
        // For this demo, we'll simuluate fetching checklist items with charges
        const { data } = await supabase
            .from('vehicle_checklists')
            .select('*, booking:bookings(ref, car:cars(brand, model))')
            .eq('checklist_type', 'return')
            .gt('condition_report->incidental_charges', 0)
            .order('created_at', { ascending: false });

        if (data) setFines(data);
        setLoading(false);
    };

    const handlePay = async (id: string, amount: number) => {
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 2000)),
            {
                loading: 'Processing payment...',
                success: () => {
                    // Update fine status (Simulated)
                    // await supabase.from('fines').update({ status: 'paid' }).eq('id', id)
                    return 'Payment successful! Receipt sent to email.';
                },
                error: 'Payment failed'
            }
        );
    };

    return (
        <div className="min-h-screen bg-white">
            <header className="bg-white border-b border-gray-100 p-6">
                <h1 className="text-2xl font-serif font-bold">Fines & Incidentals</h1>
                <p className="text-gray-500 text-sm mt-1">Manage toll violations, parking tickets, and damage fees.</p>
            </header>

            <div className="max-w-4xl mx-auto p-6">
                {loading ? (
                    <div className="p-10 text-center text-gray-400">Loading records...</div>
                ) : fines.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="font-bold text-lg">No Outstanding Fines</h3>
                        <p className="text-gray-500 text-sm">You have a clean driving record with LuxeDive.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {fines.map(fine => {
                            const amount = fine.condition_report?.incidental_charges || 0;
                            const isPaid = false; // Mock status

                            return (
                                <div key={fine.id} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="bg-red-50 p-3 rounded-full text-red-600">
                                            <AlertTriangle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-lg">Incidental Charge</h3>
                                                <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                                    #{fine.booking?.ref || 'REF-001'}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-2">
                                                {fine.booking?.car?.brand} {fine.booking?.car?.model}
                                            </p>
                                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {new Date(fine.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-3 min-w-[150px]">
                                        <p className="font-mono text-2xl font-bold">₹{amount.toLocaleString()}</p>

                                        {!isPaid ? (
                                            <button
                                                onClick={() => handlePay(fine.id, amount)}
                                                className="w-full bg-black text-white px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <CreditCard className="w-3 h-3" /> Pay Now
                                            </button>
                                        ) : (
                                            <span className="text-green-600 font-bold text-sm flex items-center gap-1">
                                                <CheckCircle className="w-4 h-4" /> Paid
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinesTracker;
