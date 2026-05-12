import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { Bell, CreditCard, Calendar, AlertCircle } from 'lucide-react';
import React from 'react';

export const useNotificationsEngine = () => {
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        console.log('Initializing Realtime Notifications for:', user.id);

        const channel = supabase.channel(`user_notifications_${user.id}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'notifications',
                    filter: `user_id=eq.${user.id}`
                },
                (payload) => {
                    const notification = payload.new;
                    
                    // Trigger a premium-styled toast
                    toast.custom((t) => (
                        <div className="bg-[#0B0D10]/95 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-5 shadow-2xl flex items-start gap-4 animate-in slide-in-from-right-10 duration-500 max-w-sm">
                            <div className={`p-3 rounded-full ${
                                notification.type === 'payment' ? 'bg-amber-500/10 text-amber-500' :
                                notification.type === 'booking' ? 'bg-emerald-500/10 text-emerald-500' :
                                'bg-blue-500/10 text-blue-500'
                            }`}>
                                {notification.type === 'payment' ? <CreditCard className="w-5 h-5" /> :
                                 notification.type === 'booking' ? <Calendar className="w-5 h-5" /> :
                                 <Bell className="w-5 h-5" />}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white text-xs font-black uppercase tracking-widest mb-1">{notification.title}</h4>
                                <p className="text-gray-400 text-[10px] leading-relaxed uppercase tracking-widest italic">{notification.message}</p>
                            </div>
                            <button onClick={() => toast.dismiss(t)} className="text-gray-600 hover:text-white transition-colors">
                                <AlertCircle className="w-4 h-4" />
                            </button>
                        </div>
                    ), {
                        duration: 8000,
                        position: 'top-right'
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);
};
