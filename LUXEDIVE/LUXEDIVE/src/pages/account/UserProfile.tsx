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
    Camera,
    Save,
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

interface OtpPending {
    type: 'email' | 'phone';
    newValue: string;
}

const UserProfile: React.FC = () => {
    const navigate = useNavigate();
    const { user, profile, loading, refreshProfile } = useAuth();

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

        if (phoneChanged) {
            setOtpPending({ type: 'phone', newValue: form.phone });
            return;
        }
        if (emailChanged) {
            setOtpPending({ type: 'email', newValue: form.email });
            return;
        }

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

    const handleOtpSuccess = async () => {
        setOtpPending(null);
        await persistProfile();
    };

    const [cropImageUrl, setCropImageUrl] = useState<string | null>(null);

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

    if (loading) {
        return (
            <div className="p-8">
                <ProfileSkeleton />
            </div>
        );
    }

    const initials = getInitials(profile?.full_name ?? user?.email);
    const memberSince = formatMemberSince(profile?.created_at ?? user?.created_at);

    return (
        <div className="animate-in fade-in duration-700">
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-white">My Profile</h1>
                <p className="text-sm text-gray-400 mt-1">Manage your personal information and profile appearance</p>
            </div>

            <div className="space-y-6">
                <div className="bg-[#0D0F14] border border-white/8 rounded-2xl p-8">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="relative flex-shrink-0">
                            <div className="w-24 h-24 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                                {profile?.avatar_url ? (
                                    <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-[#D4AF37] font-bold text-2xl font-serif">{initials}</span>
                                )}
                            </div>
                            <button
                                onClick={() => avatarInputRef.current?.click()}
                                disabled={avatarUploading}
                                className="absolute -bottom-1 -right-1 p-2 bg-[#D4AF37] text-black rounded-full hover:bg-[#C4A030] transition-all shadow-lg disabled:opacity-50 hover:scale-110 active:scale-95"
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                            <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                        </div>
                        <div>
                            <h3 className="font-serif font-semibold text-white text-xl">
                                {profile?.full_name || user?.email?.split('@')[0] || 'Premium Member'}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-bold">Platinum Member</p>
                            <p className="text-xs text-gray-600 mt-1">Member since {memberSince}</p>
                        </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent mb-8" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                            badge={form.email !== original.current.email && form.email ? <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Verify Required</span> : null}
                        />
                        <ProfileField
                            label="Phone Number"
                            value={form.phone}
                            onChange={v => { setForm(f => ({ ...f, phone: v })); setErrors(e => ({ ...e, phone: '' })); }}
                            type="tel"
                            icon={<Phone className="w-4 h-4" />}
                            error={errors.phone}
                            badge={form.phone !== original.current.phone && form.phone ? <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">OTP Required</span> : null}
                        />
                        <ProfileField
                            label="Residence Address"
                            value={form.address}
                            onChange={v => setForm(f => ({ ...f, address: v }))}
                            icon={<MapPin className="w-4 h-4" />}
                            error={errors.address}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4">
                    {isDirty && (
                        <button
                            onClick={() => { setForm({ ...original.current }); setErrors({}); }}
                            className="text-sm text-gray-500 hover:text-white transition-colors uppercase tracking-widest font-bold px-4"
                        >
                            Discard
                        </button>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={!isDirty || saving}
                        className="px-8 py-3.5 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-widest rounded-xl
                            hover:bg-[#C4A030] transition-all duration-300 transform active:scale-[0.98]
                            disabled:opacity-40 disabled:cursor-not-allowed
                            flex items-center gap-2 shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
                    >
                        {saving ? (
                            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {saving ? 'Processing...' : 'Save Settings'}
                    </button>
                </div>
            </div>

            {otpPending && (
                <OtpVerificationModal
                    type={otpPending.type}
                    newValue={otpPending.newValue}
                    onSuccess={handleOtpSuccess}
                    onClose={() => setOtpPending(null)}
                />
            )}

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

export default UserProfile;
