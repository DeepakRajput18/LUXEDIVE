import React, { useState, useEffect, useRef } from 'react';
import { X, Shield, RotateCcw, CheckCircle, AlertCircle, Mail, Phone } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

type OtpType = 'email' | 'phone';
type OtpStatus = 'idle' | 'sending' | 'pending' | 'verifying' | 'verified' | 'error';

interface OtpVerificationModalProps {
    type: OtpType;
    newValue: string;
    onSuccess: () => void;
    onClose: () => void;
}

const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({
    type,
    newValue,
    onSuccess,
    onClose,
}) => {
    const { sendOtp: authSendOtp, verifyOtpCode } = useAuth();
    const [status, setStatus] = useState<OtpStatus>('idle');
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [error, setError] = useState<string>('');
    const [cooldown, setCooldown] = useState<number>(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Auto-send on mount
    useEffect(() => {
        handleSendOtp();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Cooldown timer
    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setTimeout(() => setCooldown(c => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);

    const handleSendOtp = async () => {
        setStatus('sending');
        setError('');
        try {
            if (type === 'phone') {
                const cleanPhone = newValue.replace(/\D/g, '').slice(-10);
                const result = await authSendOtp(cleanPhone);
                if (!result.success) throw new Error(result.error || 'Failed to send OTP');

                toast.success('OTP sent to your mobile!');
                setOtp(['', '', '', '', '', '']);
            } else {
                const { error: err } = await supabase.auth.updateUser({ email: newValue });
                if (err) throw err;
            }
            setStatus('pending');
            setCooldown(60);
        } catch (err: any) {
            setError(err.message || 'Failed to send verification. Please try again.');
            setStatus('error');
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (paste.length === 6) {
            setOtp(paste.split(''));
            inputRefs.current[5]?.focus();
        }
    };

    const verifyOtp = async () => {
        const code = otp.join('');
        if (code.length !== 6) {
            setError('Please enter the complete 6-digit code.');
            return;
        }
        setStatus('verifying');
        setError('');
        try {
            const cleanPhone = newValue.replace(/\D/g, '').slice(-10);
            const { success, message } = await verifyOtpCode(cleanPhone, code);

            if (!success) throw new Error(message || 'Invalid code.');

            setStatus('verified');
            setTimeout(() => {
                onSuccess();
            }, 1200);
        } catch (err: any) {
            setError(err.message || 'Invalid code. Please check and try again.');
            setStatus('pending');
        }
    };

    const isComplete = otp.every(d => d !== '');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-[#0D0F14] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
                {/* Gold top accent */}
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

                {/* Header */}
                <div className="px-6 pt-6 pb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-[#D4AF37]" />
                        </div>
                        <div>
                            <h3 className="font-serif text-white text-lg font-semibold">Verify {type === 'phone' ? 'Phone' : 'Email'}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Security verification required</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 pb-6 space-y-6">
                    {/* Info card */}
                    <div className="bg-white/3 border border-white/8 rounded-xl p-4 flex items-start gap-3">
                        {type === 'phone' ? (
                            <Phone className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                        ) : (
                            <Mail className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                        )}
                        <p className="text-sm text-gray-300">
                            {type === 'phone'
                                ? <>A 6-digit code has been sent to <span className="text-white font-medium">{newValue}</span>. Enter it below to confirm your new number.</>
                                : <>A confirmation link has been sent to <span className="text-white font-medium">{newValue}</span>. Please check your inbox and click the link to verify your new email.</>
                            }
                        </p>
                    </div>

                    {/* OTP Input — phone only */}
                    {type === 'phone' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-2" onPaste={handlePaste}>
                                {otp.map((digit, i) => (
                                    <input
                                        key={i}
                                        ref={el => { inputRefs.current[i] = el; }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={e => handleOtpChange(i, e.target.value)}
                                        onKeyDown={e => handleKeyDown(i, e)}
                                        className={`w-11 h-14 text-center text-xl font-bold bg-[#13161C] border rounded-xl text-white transition-all duration-200 focus:outline-none
                      ${digit ? 'border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.2)]' : 'border-white/10'}
                      focus:border-[#D4AF37] focus:shadow-[0_0_12px_rgba(212,175,55,0.3)]`}
                                    />
                                ))}
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="flex items-center gap-2 text-red-400 text-sm">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Verify Button */}
                            {status === 'verified' ? (
                                <div className="flex items-center justify-center gap-2 py-3 text-green-400 font-semibold">
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Verified! Updating profile...</span>
                                </div>
                            ) : (
                                <button
                                    onClick={verifyOtp}
                                    disabled={!isComplete || status === 'verifying'}
                                    className="w-full py-3 bg-[#D4AF37] text-black font-bold text-sm uppercase tracking-widest rounded-xl 
                    hover:bg-[#C4A030] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
                    flex items-center justify-center gap-2"
                                >
                                    {status === 'verifying' ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            Verifying...
                                        </>
                                    ) : 'Verify Code'}
                                </button>
                            )}
                        </div>
                    )}

                    {/* Email success state */}
                    {type === 'email' && status === 'pending' && (
                        <div className="flex items-center justify-center gap-3 py-4 text-green-400">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">Confirmation email sent successfully</span>
                        </div>
                    )}

                    {/* Error state (send failed) */}
                    {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Resend */}
                    {type === 'phone' && (
                        <div className="text-center">
                            <button
                                onClick={handleSendOtp}
                                disabled={cooldown > 0 || status === 'sending'}
                                className="text-sm text-gray-500 hover:text-[#D4AF37] disabled:text-gray-700 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 mx-auto"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OtpVerificationModal;
