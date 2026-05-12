import React, { useState, useEffect, useMemo } from 'react';
import {
    Bell,
    Check,
    Clock,
    Settings,
    CreditCard,
    Calendar,
    Info,
    ChevronRight,
    Trash2,
    Sparkles,
    ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface Notification {
    id: string;
    type: string;
    title: string;
    message: string;
    created_at: string;
    is_read: boolean;
    related_id?: string;
}

const NotificationCenter: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [filter, setFilter] = useState<'all' | 'booking' | 'payment' | 'system'>('all');
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        if (!user) return;
        try {
            const { data, error } = await supabase
                .from('notifications')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            setNotifications(data || []);
        } catch (err: any) {
            console.error('Failed to fetch notifications:', err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [user]);

    const markAllRead = async () => {
        if (!user) return;
        try {
            const { error } = await supabase
                .from('notifications')
                .update({ is_read: true })
                .eq('user_id', user.id);
            if (error) throw error;
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
            toast.success('All messages marked as read');
        } catch (err: any) {
            toast.error('Failed to update status');
        }
    };

    const deleteNotification = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const { error } = await supabase
                .from('notifications')
                .delete()
                .eq('id', id);
            if (error) throw error;
            setNotifications(prev => prev.filter(n => n.id !== id));
        } catch (err: any) {
            toast.error('Delete failed');
        }
    };

    const filteredNotifications = useMemo(() => {
        return notifications.filter(n => filter === 'all' || n.type === filter);
    }, [notifications, filter]);

    const unreadCount = useMemo(() => {
        return notifications.filter(n => !n.is_read).length;
    }, [notifications]);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'booking': return <Calendar className="w-4 h-4 text-emerald-500" />;
            case 'payment': return <CreditCard className="w-4 h-4 text-amber-500" />;
            case 'system': return <Settings className="w-4 h-4 text-luxe-gray" />;
            default: return <Info className="w-4 h-4 text-white/40" />;
        }
    };

    return (
        <div className="min-h-screen bg-[#060709] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent text-white font-sans pb-24 pt-32 px-6 md:px-12">
            
            <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-16">

                {/* Left Sidebar: Navigation & Filters */}
                <div className="lg:col-span-3 space-y-12">
                    <div className="relative">
                        <div className="flex items-center gap-3 mb-2 px-2">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Intelligent Hub</h2>
                        </div>
                        <h1 className="text-4xl font-serif text-white tracking-widest px-1">Notifications</h1>
                    </div>

                    <nav className="space-y-2">
                        {[
                            { id: 'all', label: 'All Protocols', icon: Bell },
                            { id: 'booking', label: 'Schedule Sync', icon: Calendar },
                            { id: 'payment', label: 'Financial Audit', icon: CreditCard },
                            { id: 'system', label: 'Security Alerts', icon: ShieldCheck }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setFilter(item.id as any)}
                                className={`w-full group flex items-center justify-between px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${
                                    filter === item.id
                                        ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20'
                                        : 'bg-white/[0.02] border-white/5 text-gray-500 hover:bg-white/[0.05] hover:border-white/10'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </div>
                                {item.id === 'all' && unreadCount > 0 && (
                                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black ${
                                        filter === item.id ? 'bg-black text-amber-500' : 'bg-amber-500 text-black'
                                    }`}>
                                        {unreadCount}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>

                    <div className="pt-8 border-t border-white/5 space-y-4">
                        <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/5">
                            <p className="text-[9px] text-gray-500 leading-relaxed uppercase tracking-widest italic">
                                Verified Secure Protocol: All communications are encrypted and synchronized across your executive endpoints.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-9 space-y-10">
                    <div className="flex items-end justify-between border-b border-white/5 pb-8">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/60 mb-1 capitalize">{filter} Archive</p>
                            <h3 className="text-xl font-serif text-white uppercase tracking-widest">Active Intelligence</h3>
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllRead}
                                className="text-[10px] font-black text-gray-500 hover:text-white flex items-center gap-2 uppercase tracking-widest transition-colors"
                            >
                                <Check className="w-3 h-3" /> Mark Intelligence as Read
                            </button>
                        )}
                    </div>

                    {loading ? (
                        <div className="space-y-4">
                            {[1,2,3].map(i => (
                                <div key={i} className="h-28 bg-white/[0.02] border border-white/5 rounded-3xl animate-pulse" />
                            ))}
                        </div>
                    ) : filteredNotifications.length === 0 ? (
                        <div className="py-32 bg-white/[0.01] border border-dashed border-white/10 rounded-[3rem] text-center flex flex-col items-center justify-center gap-6 group hover:border-white/20 transition-all duration-700">
                            <div className="w-16 h-16 rounded-full bg-white/[0.02] flex items-center justify-center border border-white/5 group-hover:scale-110 group-hover:bg-white/5 transition-all duration-700">
                                <Bell className="w-6 h-6 text-gray-700" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em]">Signal Clear</p>
                                <p className="text-xs text-gray-600 font-bold tracking-widest">No active archival entries detected.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    onClick={() => notification.related_id && navigate(`/booking/confirmation/${notification.related_id}`)}
                                    className={`group relative bg-[#0B0D10]/50 border backdrop-blur-3xl rounded-3xl p-8 transition-all duration-700 cursor-pointer flex items-center gap-8 ${
                                        notification.is_read 
                                            ? 'border-white/5 opacity-60 grayscale-[0.5] hover:grayscale-0 hover:opacity-100 hover:border-white/10' 
                                            : 'border-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.05)] border-l-4 border-l-amber-500'
                                    }`}
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border transition-all duration-1000 ${
                                        notification.is_read 
                                            ? 'bg-white/[0.02] border-white/5' 
                                            : 'bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500/20'
                                    }`}>
                                        {getTypeIcon(notification.type)}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-sm font-bold text-white uppercase tracking-widest group-hover:text-amber-500 transition-colors">
                                                {notification.title}
                                            </h4>
                                            <span className="text-[8px] text-gray-500 font-serif flex items-center gap-2 uppercase tracking-widest">
                                                <Clock className="w-2.5 h-2.5" /> {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-[0.1em] font-medium pr-12 line-clamp-2">
                                            {notification.message}
                                        </p>
                                    </div>

                                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 flex items-center gap-4">
                                        <button
                                            onClick={(e) => deleteNotification(notification.id, e)}
                                            className="p-3 text-gray-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                                            title="Archive Entry"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-amber-500 transition-colors" />
                                    </div>

                                    {!notification.is_read && (
                                        <div className="absolute top-8 right-8 w-2 h-2 bg-amber-500 rounded-full animate-pulse group-hover:opacity-0 transition-opacity" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationCenter;
