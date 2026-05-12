import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Bell,
    Globe,
    Camera,
    Save,
    Moon,
    AlertCircle,
} from 'lucide-react';
import OtpVerificationModal from '../../components/profile/OtpVerificationModal';
import ImageCropperModal from '../../components/profile/ImageCropperModal';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getInitials = (name?: string | null): string => {
    if (!name) return '?';
    return name.trim().split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(w => w[0].toUpperCase())
        .join('');
};

const formatMemberSince = (dateStr?: string | null): string => {
    if (!dateStr) return '—';
    try {
        return new Date(dateStr).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' });
    } catch {
        return '—';
    }
};

const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
const isValidPhone = (val: string) => /^\+?[0-9\s\-().]{7,20}$/.test(val.trim());

// ─── Subcomponents ────────────────────────────────────────────────────────────

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

interface FieldProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    icon: React.ReactNode;
    error?: string;
    badge?: React.ReactNode;
    readOnly?: boolean;
}

const ProfileField: React.FC<FieldProps> = ({
    label, value, onChange, type = 'text', icon, error, badge, readOnly
}) => (
    <div className="space-y-2">
        <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</label>
            {badge}
        </div>
        <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">{icon}</span>
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                readOnly={readOnly}
                className={`w-full bg-white/3 border rounded-xl pl-12 pr-4 py-3 text-sm text-white
                    placeholder-gray-600 transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37]/50
                    ${error ? 'border-red-500/60' : 'border-white/10'}
                    ${readOnly ? 'opacity-60 cursor-not-allowed' : 'hover:border-white/20'}`}
            />
        </div>
        {error && (
            <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {error}
            </p>
        )}
    </div>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const Skeleton = ({ className }: { className?: string }) => (
    <div className={`bg-white/5 animate-pulse rounded-lg ${className ?? ''}`} />
);

const ProfileSkeleton = () => (
    <div className="space-y-6">
        <div className="bg-[#0D0F14] border border-white/8 rounded-2xl p-8 space-y-8">
            <div className="flex items-center gap-5">
                <Skeleton className="w-20 h-20 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="w-36 h-5" />
                    <Skeleton className="w-24 h-3" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="w-20 h-3" />
                        <Skeleton className="w-full h-12" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

type Tab = 'general' | 'preferences' | 'notifications';

interface OtpPending {
    type: 'email' | 'phone';
    newValue: string;
}

const ProfileSettings: React.FC = () => {
    const navigate = useNavigate();
    const { user, profile, loading, refreshProfile } = useAuth();

    const [activeTab, setActiveTab] = useState<Tab>('general');

    // ── Form state (mirrors live values) ──
    const [form, setForm] = useState({
        full_name: '',
        email: '',
        phone: '',
        address: '',
    });

    // ── Original snapshot for dirty detection ──
    const original = useRef({ full_name: '', email: '', phone: '', address: '' });

    // ── Validation errors ──
    const [errors, setErrors] = useState<Partial<typeof form>>({});

    // ── Saving flow ──
    const [saving, setSaving] = useState(false);
    const [otpPending, setOtpPending] = useState<OtpPending | null>(null);

    // ── Notification preferences ──
    const [prefs, setPrefs] = useState({
        email_enabled: true,
        sms_enabled: true,
        push_enabled: false,
        marketing_enabled: false,
    });

    // ── Avatar upload ──
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const [avatarUploading, setAvatarUploading] = useState(false);

    // ── Redirect if no session ──
    useEffect(() => {
        if (!loading && !user) navigate('/login', { replace: true });
    }, [loading, user, navigate]);

    // ── Populate form when profile / user loads ──
    useEffect(() => {
        if (!user && !profile) return;
        const values = {
            full_name: profile?.full_name || '',
            email: profile?.email || user?.email || '',
            phone: profile?.phone || user?.phone || '',
            address: profile?.address || '',
        };
        setForm(values);
        original.current = { ...values };
    }, [user, profile]);

    // ── Load notification prefs ──
    useEffect(() => {
        if (user) loadPrefs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

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

    // ── Dirty detection ──
    const isDirty =
        form.full_name !== original.current.full_name ||
        form.email !== original.current.email ||
        form.phone !== original.current.phone ||
        form.address !== original.current.address;

    // ── Validate ──
    const validate = (): boolean => {
        const errs: Partial<typeof form> = {};
        if (!form.full_name.trim()) errs.full_name = 'Name is required';
        if (form.email && !isValidEmail(form.email)) errs.email = 'Invalid email address';
        if (form.phone && !isValidPhone(form.phone)) errs.phone = 'Invalid phone number';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    // ── Save flow ──
    const handleSave = async () => {
        if (!validate() || !user) return;

        const emailChanged = form.email !== original.current.email;
        const phoneChanged = form.phone !== original.current.phone;

        // Sensitive field changed → trigger OTP first
        if (phoneChanged) {
            setOtpPending({ type: 'phone', newValue: form.phone });
            return;
        }
        if (emailChanged) {
            setOtpPending({ type: 'email', newValue: form.email });
            return;
        }

        // Only non-sensitive fields changed → save directly
        await persistProfile();
    };

    const persistProfile = async () => {
        if (!user) return;
        setSaving(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: form.full_name,
                    address: form.address,
                    phone: form.phone,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', user.id);

            if (error) throw error;

            await refreshProfile();
            original.current = { ...form };
            toast.success('Profile updated successfully');
        } catch (err: any) {
            toast.error(err.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    // Called after OTP success
    const handleOtpSuccess = async () => {
        setOtpPending(null);
        // After OTP verification, also persist non-sensitive fields
        await persistProfile();
    };

    const [cropImageUrl, setCropImageUrl] = useState<string | null>(null);

    // ── Avatar upload ──
    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            if (event.target?.result) {
                setCropImageUrl(event.target.result as string);
            }
        };
        reader.onerror = () => {
            toast.error('Failed to read file.');
        };
        // Reset the input so the user can select the same file again
        e.target.value = '';
    };

    const handleCropSave = async (croppedBase64: string) => {
        setCropImageUrl(null);
        if (!user) return;
        setAvatarUploading(true);
        try {
            const { error: updateErr } = await supabase.from('profiles').update({ avatar_url: croppedBase64 }).eq('id', user.id);
            if (updateErr) throw updateErr;

            await refreshProfile();
            toast.success('Avatar updated successfully!');
        } catch (err: any) {
            toast.error(err.message || 'Failed to update avatar');
        } finally {
            setAvatarUploading(false);
        }
    };

    // ─── Sidebar tabs ──────────────────────────────────────────────────────────

    const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
        { id: 'general', label: 'Personal Info', icon: <User className="w-4 h-4" /> },
        { id: 'preferences', label: 'Preferences', icon: <Globe className="w-4 h-4" /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    ];

    // ─── Render ────────────────────────────────────────────────────────────────

    if (loading) {
        return (
            <div className="min-h-screen bg-luxe-black pt-20 p-8 max-w-4xl mx-auto">
                <ProfileSkeleton />
            </div>
        );
    }

    const initials = getInitials(profile?.full_name ?? user?.email);
    const memberSince = formatMemberSince(profile?.created_at ?? user?.created_at);

    return (
        <div className="min-h-screen bg-luxe-black font-sans text-white">
            <div className="max-w-5xl mx-auto px-6 py-10">
                {/* Page title */}
                <div className="mb-8">
                    <h1 className="text-2xl font-serif font-bold text-white">Account Settings</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your personal details and preferences</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">

                    {/* ── Sidebar ── */}
                    <aside className="w-full md:w-60 flex-shrink-0">
                        <div className="bg-[#0D0F14] border border-white/8 rounded-xl p-2 space-y-0.5 sticky top-24">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-3
                                        ${activeTab === tab.id
                                            ? 'bg-white/8 text-[#D4AF37] border border-[#D4AF37]/20'
                                            : 'text-gray-500 hover:text-white hover:bg-white/4'
                                        }`}
                                >
                                    {tab.icon} {tab.label}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* ── Main ── */}
                    <main className="flex-1 min-w-0">

                        {/* ── General / Personal Info ── */}
                        {activeTab === 'general' && (
                            <div className="space-y-6">
                                <div className="bg-[#0D0F14] border border-white/8 rounded-2xl p-8">
                                    <h2 className="text-lg font-serif font-semibold text-white mb-8">Profile Details</h2>

                                    {/* Avatar */}
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="relative flex-shrink-0">
                                            <div className="w-20 h-20 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30 flex items-center justify-center overflow-hidden">
                                                {profile?.avatar_url ? (
                                                    <img
                                                        src={profile.avatar_url}
                                                        alt="Avatar"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-[#D4AF37] font-bold text-xl font-serif">
                                                        {initials}
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => avatarInputRef.current?.click()}
                                                disabled={avatarUploading}
                                                className="absolute -bottom-1 -right-1 p-1.5 bg-[#D4AF37] text-black rounded-full hover:bg-[#C4A030] transition-colors shadow-lg disabled:opacity-50"
                                            >
                                                <Camera className="w-3.5 h-3.5" />
                                            </button>
                                            <input
                                                ref={avatarInputRef}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleAvatarChange}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white text-base">
                                                {profile?.full_name || user?.email?.split('@')[0] || 'Your Account'}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-0.5">Member since {memberSince}</p>
                                            <p className="text-xs text-gray-600 mt-0.5">{user?.email}</p>
                                        </div>
                                    </div>

                                    {/* Gold divider */}
                                    <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent mb-8" />

                                    {/* Form */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <ProfileField
                                            label="Full Name"
                                            value={form.full_name}
                                            onChange={v => setForm(f => ({ ...f, full_name: v }))}
                                            icon={<User className="w-4 h-4" />}
                                            error={errors.full_name}
                                        />
                                        <ProfileField
                                            label="Email Address"
                                            value={form.email}
                                            onChange={v => { setForm(f => ({ ...f, email: v })); setErrors(e => ({ ...e, email: '' })); }}
                                            type="email"
                                            icon={<Mail className="w-4 h-4" />}
                                            error={errors.email}
                                            badge={
                                                form.email !== original.current.email && form.email
                                                    ? <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Verification required</span>
                                                    : null
                                            }
                                        />
                                        <ProfileField
                                            label="Phone Number"
                                            value={form.phone}
                                            onChange={v => { setForm(f => ({ ...f, phone: v })); setErrors(e => ({ ...e, phone: '' })); }}
                                            type="tel"
                                            icon={<Phone className="w-4 h-4" />}
                                            error={errors.phone}
                                            badge={
                                                form.phone !== original.current.phone && form.phone
                                                    ? <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">OTP required</span>
                                                    : null
                                            }
                                        />
                                        <ProfileField
                                            label="Address"
                                            value={form.address}
                                            onChange={v => setForm(f => ({ ...f, address: v }))}
                                            icon={<MapPin className="w-4 h-4" />}
                                            error={errors.address}
                                        />
                                    </div>
                                </div>

                                {/* Save Row */}
                                <div className="flex items-center justify-end gap-4">
                                    {isDirty && (
                                        <button
                                            onClick={() => {
                                                setForm({ ...original.current });
                                                setErrors({});
                                            }}
                                            className="text-sm text-gray-500 hover:text-white transition-colors"
                                        >
                                            Discard changes
                                        </button>
                                    )}
                                    <button
                                        onClick={handleSave}
                                        disabled={!isDirty || saving}
                                        className="px-7 py-3 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-widest rounded-xl
                                            hover:bg-[#C4A030] transition-all duration-200
                                            disabled:opacity-40 disabled:cursor-not-allowed
                                            flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                                    >
                                        {saving ? (
                                            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        ) : (
                                            <Save className="w-4 h-4" />
                                        )}
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ── Preferences ── */}
                        {activeTab === 'preferences' && (
                            <div className="bg-[#0D0F14] border border-white/8 rounded-2xl p-8">
                                <h2 className="text-lg font-serif font-semibold text-white mb-8">App Preferences</h2>
                                <div className="space-y-0">
                                    {/* Language */}
                                    <div className="flex items-center justify-between py-4 border-b border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
                                                <Globe className="w-4 h-4 text-[#D4AF37]" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm text-white">Language</h4>
                                                <p className="text-xs text-gray-500">Select your preferred interface language.</p>
                                            </div>
                                        </div>
                                        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30">
                                            <option value="en">English</option>
                                            <option value="hi">Hindi</option>
                                            <option value="gu">Gujarati</option>
                                        </select>
                                    </div>
                                    {/* Theme */}
                                    <div className="flex items-center justify-between py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
                                                <Moon className="w-4 h-4 text-[#D4AF37]" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm text-white">Theme</h4>
                                                <p className="text-xs text-gray-500">Switch between light and dark mode.</p>
                                            </div>
                                        </div>
                                        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30">
                                            <option value="dark">Dark (Default)</option>
                                            <option value="light">Light</option>
                                            <option value="system">System</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── Notifications ── */}
                        {activeTab === 'notifications' && (
                            <div className="bg-[#0D0F14] border border-white/8 rounded-2xl p-8">
                                <h2 className="text-lg font-serif font-semibold text-white mb-8">Notification Settings</h2>
                                <NotificationToggle label="Email Notifications" desc="Receive booking updates and offers via email." checked={prefs.email_enabled} onChange={v => updatePref('email_enabled', v)} />
                                <NotificationToggle label="SMS Notifications" desc="Get important alerts sent to your phone." checked={prefs.sms_enabled} onChange={v => updatePref('sms_enabled', v)} />
                                <NotificationToggle label="Push Notifications" desc="Receive real-time updates on your device." checked={prefs.push_enabled} onChange={v => updatePref('push_enabled', v)} />
                                <div className="my-4 h-px bg-white/5" />
                                <NotificationToggle label="Marketing Updates" desc="Stay informed about new fleet additions and promotions." checked={prefs.marketing_enabled} onChange={v => updatePref('marketing_enabled', v)} />
                            </div>
                        )}

                    </main>
                </div>
            </div>

            {/* ── OTP Modal ── */}
            {otpPending && (
                <OtpVerificationModal
                    type={otpPending.type}
                    newValue={otpPending.newValue}
                    onSuccess={handleOtpSuccess}
                    onClose={() => setOtpPending(null)}
                />
            )}

            {/* ── Image Cropper Modal ── */}
            {cropImageUrl && (
                <ImageCropperModal
                    imageUrl={cropImageUrl}
                    onCrop={handleCropSave}
                    onClose={() => setCropImageUrl(null)}
                />
            )}
        </div>
    );
};

export default ProfileSettings;
