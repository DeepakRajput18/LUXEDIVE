import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import {
    ShieldAlert,
    Lock as LockIcon,
    Car,
    CreditCard,
    PhoneCall,
    RefreshCcw
} from 'lucide-react';

const PaymentRecovery: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get('booking_id');
    const [loading, setLoading] = useState(false);

    // Mock Data (In reality, fetch from API based on bookingId)
    const transaction = {
        amount: 350000.00,
        vehicle: 'Porsche 911 Carrera S',
        dates: 'Oct 12 - Oct 15',
        lastMethod: 'Visa ending in 4242',
        failureReason: 'Insufficient Funds'
    };

    const handleRetry = async () => {
        setLoading(true);
        try {
            // Simulate API call to retry payment
            // const { data, error } = await supabase.functions.invoke('retry-payment', { body: { booking_id: bookingId } });
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Success simulation
            navigate('/payment/success');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black/95 flex items-center justify-center p-6 relative">
            {/* Background with Red Tint */}
            <div className="absolute inset-0 bg-red-900/10 z-0" />
            <div className="absolute top-0 right-0 p-6 z-20">
                <button onClick={() => navigate('/support')} className="text-gray-400 hover:text-white text-sm font-medium">Help Center</button>
            </div>

            <div className="bg-[#0F1218] border border-red-900/30 w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden">
                {/* Top Red Bar */}
                <div className="h-1 bg-red-600 w-full" />

                <div className="p-8 md:p-12 text-center">

                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                        <ShieldAlert className="w-10 h-10 text-red-500" />
                    </div>

                    <h1 className="text-3xl font-serif font-medium text-white mb-2">Transaction Unsuccessful</h1>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                        We were unable to process the payment for your upcoming reservation. Please update your payment method to secure your booking.
                    </p>

                    {/* Transaction Card */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-left">
                        <div className="flex justify-between items-start mb-4">
                            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest rounded border border-red-500/30">
                                {transaction.failureReason}
                            </span>
                            <span className="text-white font-serif text-lg font-medium">₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <Car className="w-4 h-4 text-gray-500" />
                                <span>{transaction.vehicle}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <span className="text-gray-500 text-xs uppercase font-bold w-4 text-center">📅</span>
                                <span>{transaction.dates}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <button
                            onClick={handleRetry}
                            disabled={loading}
                            className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <RefreshCcw className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    <CreditCard className="w-4 h-4" /> Retry with {transaction.lastMethod}
                                </>
                            )}
                        </button>

                        <button
                            onClick={() => navigate('/payment/methods')}
                            className="w-full bg-transparent border border-white/20 text-white font-medium py-4 rounded-lg hover:border-white transition-colors"
                        >
                            Use a Different Payment Method
                        </button>
                    </div>

                </div>

                {/* Security Footer */}
                <div className="bg-black/40 p-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <div className="flex items-center gap-2 text-green-500 font-medium">
                        <LockIcon className="w-3 h-3" /> 256-BIT SSL ENCRYPTED
                    </div>
                    <button className="text-gray-500 hover:text-white flex items-center gap-2 transition-colors">
                        Need assistance? Contact 24/7 Concierge <PhoneCall className="w-3 h-3" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PaymentRecovery;
