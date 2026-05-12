import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import {
    Lock as LockIcon,
    Mail,
    Check,
    ArrowRight,
    ChevronLeft,
    Eye,
    EyeOff,
    ShieldCheck
} from 'lucide-react';

const PasswordReset: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<'request' | 'verify' | 'new_password' | 'success'>('request');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Password Requirements
    const requirements = [
        { id: 'len', label: 'At least 8 characters', valid: password.length >= 8 },
        { id: 'num', label: 'One number', valid: /\d/.test(password) },
        { id: 'sym', label: 'One special symbol (!@#$)', valid: /[!@#$%^&*]/.test(password) },
        { id: 'uplow', label: 'Upper & lowercase letters', valid: /[a-z]/.test(password) && /[A-Z]/.test(password) }
    ];

    const handleRequestReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Simulate API call
        setTimeout(() => {
            // In real app: await supabase.auth.resetPasswordForEmail(email)
            setStep('verify'); // Or 'success' to check email depending on flow
            setLoading(false);
        }, 1500);
    };

    const handleSetNewPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        setLoading(true);
        // Simulate API
        setTimeout(() => {
            // await supabase.auth.updateUser({ password })
            setStep('success');
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-6 relative overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493238792015-1a419ac6929e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/80" />

            <div className="w-full max-w-md relative z-10">

                <div className="bg-[#0F1218] border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl backdrop-blur-sm">

                    {/* Header Icon */}
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                        <LockIcon className="w-8 h-8 text-white" />
                    </div>

                    {step === 'request' && (
                        <div className="animate-fadeIn">
                            <h1 className="text-2xl font-serif font-medium text-center mb-2">Forgot Password?</h1>
                            <p className="text-gray-400 text-sm text-center mb-8">
                                Enter your email address associated with your LUXEDIVE account and we'll send you a link to reset your password.
                            </p>

                            <form onSubmit={handleRequestReset} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="john.doe@example.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:border-white focus:ring-1 focus:ring-white focus:outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <>Send Reset Link <ArrowRight className="w-4 h-4" /></>}
                                </button>
                            </form>

                            <div className="mt-8 text-center">
                                <button onClick={() => navigate('/auth/login')} className="text-sm text-gray-500 hover:text-white flex items-center justify-center gap-2 mx-auto transition-colors">
                                    <ChevronLeft className="w-4 h-4" /> Back to Sign In
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'verify' && (
                        <div className="text-center animate-fadeIn">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-serif font-medium mb-2">Check your email</h2>
                            <p className="text-gray-400 text-sm mb-8">
                                We've sent a password reset link to <span className="text-white font-bold">{email}</span>. Please click the link to continue.
                            </p>
                            <button
                                onClick={() => setStep('request')}
                                className="text-sm text-gray-500 hover:text-white underline"
                            >
                                Didn't receive specific email? Click to resend.
                            </button>

                            {/* Hidden dev button to skip flow */}
                            <button onClick={() => setStep('new_password')} className="fixed bottom-4 right-4 text-[10px] text-gray-800 opacity-50 hover:opacity-100">Dev: Skip to Set New</button>
                        </div>
                    )}

                    {step === 'new_password' && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl font-serif font-medium text-center mb-8">Set New Password</h2>

                            <form onSubmit={handleSetNewPassword} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">New Password</label>
                                    <div className="relative">
                                        <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-12 text-white placeholder-gray-600 focus:border-white focus:ring-1 focus:ring-white focus:outline-none transition-all"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Confirm Password</label>
                                    <div className="relative">
                                        <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:border-white focus:ring-1 focus:ring-white focus:outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="bg-white/5 p-4 rounded-lg space-y-2">
                                    <h4 className="text-xs text-gray-400 font-bold uppercase mb-2">Password Strength</h4>
                                    {requirements.map(req => (
                                        <div key={req.id} className="flex items-center gap-2 text-xs">
                                            <div className={`w - 3 h - 3 rounded - full flex items - center justify - center ${req.valid ? 'bg-green-500' : 'bg-gray-700'} `}>
                                                {req.valid && <Check className="w-2 h-2 text-black" />}
                                            </div>
                                            <span className={req.valid ? 'text-gray-300' : 'text-gray-600'}>{req.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                                <button
                                    type="submit"
                                    disabled={loading || !requirements.every(r => r.valid)}
                                    className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Updating...' : 'Reset Password'}
                                </button>
                            </form>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="text-center animate-fadeIn">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                                <Check className="w-8 h-8 text-black" />
                            </div>
                            <h2 className="text-2xl font-serif font-medium mb-4">Password Reset Successful</h2>
                            <p className="text-gray-400 text-sm mb-8">
                                Your password has been securely updated. You can now use your new credentials to access your account.
                            </p>
                            <button
                                onClick={() => navigate('/auth/login')}
                                className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Sign In to Account
                            </button>
                        </div>
                    )}

                </div>

                <div className="text-center mt-8 text-gray-600 text-xs flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Secure 256-bit SSL Encrypted Connection
                </div>

            </div>
        </div>
    );
};

export default PasswordReset;
