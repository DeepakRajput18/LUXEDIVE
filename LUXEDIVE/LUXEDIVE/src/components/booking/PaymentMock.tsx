import { useState, useEffect } from 'react'
import { Button } from '../ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { CreditCard, Lock as LockIcon, ShieldCheck, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface PaymentMockProps {
    amount: number;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function PaymentMock({ amount, onSuccess, onCancel }: PaymentMockProps) {
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        const parts = []
        for (let i = 0; i < v.length; i += 4) {
            parts.push(v.substring(i, i + 4))
        }
        if (parts.length) {
            return parts.join(' ')
        } else {
            return value
        }
    }

    const formatExpiry = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        if (v.length >= 2) {
            return `${v.substring(0, 2)}/${v.substring(2, 4)}`
        }
        return v
    }

    const handlePay = () => {
        if (cardNumber.length < 16 || expiry.length < 5 || cvv.length < 3 || !name) {
            toast.error("Please fill in all card details correctly.")
            return;
        }

        setStatus('processing');

        // Simulate API
        setTimeout(() => {
            if (cardNumber.includes('0000')) {
                setStatus('error');
                toast.error("Payment Declined: Insufficient Funds");
            } else {
                setStatus('success');
                toast.success("Payment Successful!");
                setTimeout(onSuccess, 1500);
            }
        }, 2500);
    }

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center py-12 animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                    <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">Payment Confirmed</h3>
                <p className="text-gray-400">Transaction ID: tx_{Math.random().toString(36).substr(2, 9)}</p>
            </div>
        )
    }

    return (
        <Card className="bg-[#1A1A1A] border-white/10 w-full max-w-md mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-luxe-gold to-yellow-600"></div>

            <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-serif text-white flex items-center gap-2">
                        <LockIcon className="w-5 h-5 text-luxe-gold" />
                        Secure Checkout
                    </CardTitle>
                    <div className="flex gap-2">
                        <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">VISA</span>
                        </div>
                        <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-red-500/80 -mr-2"></div>
                            <div className="w-4 h-4 rounded-full bg-orange-500/80"></div>
                        </div>
                    </div>
                </div>
                <p className="text-gray-400 text-sm">Total to pay: <span className="text-white font-bold text-lg">₹{amount.toLocaleString('en-IN')}</span></p>
            </CardHeader>

            <CardContent className="space-y-6">

                {status === 'error' && (
                    <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400 text-sm">
                        <AlertCircle className="w-5 h-5" />
                        Card declined. Please try another method.
                    </div>
                )}

                {/* Card Preview */}
                <div className="relative h-48 bg-gradient-to-br from-indigo-900 to-blue-900 rounded-xl p-6 shadow-2xl border border-white/10 transform transition-transform hover:scale-[1.02]">
                    <div className="absolute top-6 right-6 opacity-50">
                        <CreditCard className="w-8 h-8 text-white" />
                    </div>
                    <div className="mt-12">
                        <div className="text-2xl font-mono text-white tracking-widest shadow-black drop-shadow-md">
                            {cardNumber || '•••• •••• •••• ••••'}
                        </div>
                    </div>
                    <div className="mt-8 flex justify-between text-white/80">
                        <div>
                            <div className="text-[10px] uppercase tracking-widest opacity-70">Card Holder</div>
                            <div className="font-bold text-sm">{name || 'YOUR NAME'}</div>
                        </div>
                        <div>
                            <div className="text-[10px] uppercase tracking-widest opacity-70">Expires</div>
                            <div className="font-bold text-sm font-mono">{expiry || 'MM/YY'}</div>
                        </div>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">Card Number</label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="0000 0000 0000 0000"
                                maxLength={19}
                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-luxe-gold transition-colors font-mono"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">Expiry Date</label>
                            <input
                                type="text"
                                placeholder="MM/YY"
                                maxLength={5}
                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-luxe-gold transition-colors font-mono text-center"
                                value={expiry}
                                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">CVC / CVV</label>
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                                <input
                                    type="password"
                                    placeholder="123"
                                    maxLength={4}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-9 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-luxe-gold transition-colors font-mono text-center"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">Cardholder Name</label>
                        <input
                            type="text"
                            placeholder="ARJUN SHARMA"
                            className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-luxe-gold transition-colors"
                            value={name}
                            onChange={(e) => setName(e.target.value.toUpperCase())}
                        />
                    </div>
                </div>

                <Button
                    onClick={handlePay}
                    disabled={status === 'processing'}
                    className="w-full h-12 bg-luxe-gold text-black hover:bg-white font-bold uppercase tracking-widest transition-all"
                >
                    {status === 'processing' ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
                        </>
                    ) : (
                        `Pay ₹${amount.toLocaleString('en-IN')}`
                    )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500">
                    <ShieldCheck className="w-3 h-3" />
                    Payments are encrypted and secured by Razorpay
                </div>

                <div className="text-center">
                    <button onClick={onCancel} className="text-xs text-gray-500 hover:text-white underline">Cancel Transaction</button>
                </div>

            </CardContent>
        </Card>
    )
}
