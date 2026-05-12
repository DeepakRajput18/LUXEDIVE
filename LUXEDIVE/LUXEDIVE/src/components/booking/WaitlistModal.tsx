import React, { useState } from 'react';
import { X, Bell, Clock, Star } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'sonner';

interface WaitlistModalProps {
    carId: string;
    carName: string;
    onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ carId, carName, onClose }) => {
    const [loading, setLoading] = useState(false);

    const handleJoin = async () => {
        setLoading(true);
        try {
            // Get the authenticated user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                toast.error('Please sign in to join the waitlist');
                setLoading(false);
                return;
            }

            // Check if already on waitlist for this car
            const { data: existing } = await supabase
                .from('waitlist')
                .select('id')
                .eq('user_id', user.id)
                .eq('car_id', carId)
                .eq('status', 'pending')
                .maybeSingle();

            if (existing) {
                toast.info(`You're already tracking ${carName}`);
                onClose();
                return;
            }

            // Insert into real waitlist table
            const { error } = await supabase.from('waitlist').insert({
                car_id: carId,
                user_id: user.id,
                status: 'pending',
                created_at: new Date().toISOString()
            });

            if (error) throw error;

            toast.success(`You'll be notified when ${carName} becomes available!`);
            onClose();
        } catch (err: any) {
            console.error('Waitlist error:', err);
            toast.error(err.message || 'Failed to join waitlist');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full">
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-16 h-16 bg-black text-luxe-gold rounded-full flex items-center justify-center mb-4 shadow-lg border-2 border-luxe-gold">
                        <Bell className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold mb-2">Join the Waitlist</h2>
                    <p className="text-gray-500 text-sm">
                        {carName} is currently fully booked for your selected dates. Join our exclusive queue to be notified instantly when it becomes available.
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl mb-6 space-y-3">
                    <div className="flex items-start gap-3">
                        <Star className="w-4 h-4 text-luxe-gold mt-1" />
                        <div>
                            <p className="font-bold text-sm">Priority Access</p>
                            <p className="text-xs text-gray-500">Platinum members get 24-hour early access.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-luxe-gold mt-1" />
                        <div>
                            <p className="font-bold text-sm">Instant Notification</p>
                            <p className="text-xs text-gray-500">Receive SMS and Email alerts the moment it frees up.</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleJoin}
                    disabled={loading}
                    className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                    {loading ? 'Joining...' : 'Confirm Waitlist Entry'}
                </button>
            </div>
        </div>
    );
};

export default WaitlistModal;
