import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import {
    Bell,
    Globe,
    Moon,
    Shield,
    Smartphone,
    Mail,
    ChevronRight,
    Lock as LockIcon,
    Trash2
} from 'lucide-react';
import ConnectedAccounts from '../dashboard/ConnectedAccounts';

const NotificationToggle = ({
    label, desc, checked, onChange
}: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) => (
    <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
        <div>
            <h4 className="font-semibold text-sm text-white">{label}</h4>
            <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={checked}
                onChange={e => onChange(e.target.checked)}
            />
            <div className="w-11 h-6 bg-white/10 rounded-full peer
                peer-focus:ring-2 peer-focus:ring-[#D4AF37]/30
                peer-checked:bg-[#D4AF37]
                after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                after:bg-white after:rounded-full after:h-5 after:w-5
                after:transition-all peer-checked:after:translate-x-full" />
        </label>
    </div>
);

const UserSettings: React.FC = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const [prefs, setPrefs] = useState({
        email_enabled: true,
        sms_enabled: true,
        push_enabled: false,
        marketing_enabled: false,
    });

    useEffect(() => {
        if (!loading && !user) navigate('/login', { replace: true });
        if (user) loadPrefs();
    }, [loading, user]);

    const loadPrefs = async () => {
        const { data } = await supabase
            .from('notification_preferences')
            .select('*')
            .eq('user_id', user?.id)
            .maybeSingle();
        if (data) {
            setPrefs({
                email_enabled: data.email_enabled ?? true,
                sms_enabled: data.sms_enabled ?? true,
                push_enabled: data.push_enabled ?? false,
                marketing_enabled: data.marketing_enabled ?? false,
            });
        }
    };

    const updatePref = async (key: string, value: boolean) => {
        setPrefs(prev => ({ ...prev, [key]: value }));
        if (!user) return;
        const { error } = await supabase
            .from('notification_preferences')
            .upsert({ user_id: user.id, [key]: value, updated_at: new Date().toISOString() });
        if (error) {
            toast.error('Failed to update preference');
            setPrefs(prev => ({ ...prev, [key]: !value }));
        } else {
            toast.success('Preferences saved');
        }
    };

    return (
        <div className="animate-in fade-in duration-700">
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-white">Settings</h1>
                <p className="text-sm text-gray-400 mt-1">Configure your preferences, notifications, and security</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ── Notifications ── */}
                <div className="space-y-6">
                    <div className="bg-[#0D0F14] border border-white/8 rounded-2xl p-8">
                        <h2 className="text-lg font-serif font-semibold text-white mb-6 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-luxe-gold" /> Notifications
                        </h2>
                        <div className="space-y-4">
                            <NotificationToggle label="Email Updates" desc="Receive booking receipts and monthly heritage reports." checked={prefs.email_enabled} onChange={v => updatePref('email_enabled', v)} />
                            <NotificationToggle label="SMS Alerts" desc="Critical arrival alerts and chauffeur communications." checked={prefs.sms_enabled} onChange={v => updatePref('sms_enabled', v)} />
                            <NotificationToggle label="Push Notifications" desc="Real-time tracking and concierge notifications." checked={prefs.push_enabled} onChange={v => updatePref('push_enabled', v)} />
                            <NotificationToggle label="Marketing Updates" desc="Be the first to know about new fleet arrivals." checked={prefs.marketing_enabled} onChange={v => updatePref('marketing_enabled', v)} />
                        </div>
                    </div>

                    {/* ── Preferences ── */}
                    <div className="bg-[#0D0F14] border border-white/8 rounded-2xl p-8">
                        <h2 className="text-lg font-serif font-semibold text-white mb-6 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-luxe-gold" /> Application Preferences
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm font-medium">Default Language</span>
                                </div>
                                <select className="bg-transparent text-sm text-luxe-gold font-bold focus:outline-none">
                                    <option value="en">English (UK)</option>
                                    <option value="hi">Hindi</option>
                                    <option value="gu">Gujarati</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Moon className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm font-medium">Visual Theme</span>
                                </div>
                                <select className="bg-transparent text-sm text-luxe-gold font-bold focus:outline-none">
                                    <option value="dark">Cinematic Dark</option>
                                    <option value="light">Classic Light</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Security & Accounts ── */}
                <div className="space-y-6">
                    <div className="bg-[#0D0F14] border border-white/8 rounded-2xl p-8">
                        <h2 className="text-lg font-serif font-semibold text-white mb-6 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-luxe-gold" /> Security & Access
                        </h2>
                        <div className="space-y-4">
                            <button className="w-full flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/5 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <LockIcon className="w-4 h-4 text-gray-400 group-hover:text-luxe-gold transition-colors" />
                                    <div className="text-left">
                                        <p className="text-sm font-medium">Update Password</p>
                                        <p className="text-[10px] text-gray-500">Regularly update your primary access key</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-600" />
                            </button>
                            
                            <button 
                                onClick={() => navigate('/account-deletion')}
                                className="w-full flex items-center justify-between p-4 bg-red-500/5 border border-red-500/10 rounded-xl hover:bg-red-500/10 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <Trash2 className="w-4 h-4 text-red-400" />
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-red-200">Deactivate Account</p>
                                        <p className="text-[10px] text-red-500/60 uppercase tracking-tighter">Permanent erasure of heritage logs</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-red-900/40" />
                            </button>
                        </div>
                    </div>

                    {/* Integrated Connected Accounts */}
                    <div className="bg-[#0D0F14] border border-white/8 rounded-2xl p-8">
                        <h2 className="text-lg font-serif font-semibold text-white mb-6 flex items-center gap-2">
                            <Smartphone className="w-5 h-5 text-luxe-gold" /> Connected Accounts
                        </h2>
                        {/* Compact version of ConnectedAccounts logic or component */}
                        <div className="space-y-3">
                            {['Google', 'Apple'].map((acc) => (
                                <div key={acc} className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/5 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs border border-white/10">
                                            {acc[0]}
                                        </div>
                                        <span className="text-xs font-medium">{acc}</span>
                                    </div>
                                    <button className="text-[10px] font-bold text-luxe-gold hover:text-white transition-colors uppercase tracking-widest">
                                        Link
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSettings;
