import React, { useState } from 'react';
import {
    CreditCard,
    Trash2,
    Star,
    Plus,
    ShieldCheck,
    Lock as LockIcon,
    ChevronRight,
    X,
    Wallet
} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface PaymentMethod {
    id: string;
    brand: 'visa' | 'mastercard' | 'amex';
    last4: string;
    expiryMonth: string;
    expiryYear: string;
    isDefault: boolean;
    nameOnCard?: string;
}

const PaymentVault: React.FC = () => {
    // Mock Data
    const [methods, setMethods] = useState<PaymentMethod[]>([
        {
            id: 'pm_1',
            brand: 'visa',
            last4: '4242',
            expiryMonth: '12',
            expiryYear: '25',
            isDefault: true,
            nameOnCard: 'James Sterling'
        },
        {
            id: 'pm_2',
            brand: 'mastercard',
            last4: '8839',
            expiryMonth: '09',
            expiryYear: '24',
            isDefault: false,
            nameOnCard: 'James Sterling'
        },
        {
            id: 'pm_3',
            brand: 'amex',
            last4: '1005',
            expiryMonth: '01',
            expiryYear: '26',
            isDefault: false,
            nameOnCard: 'James Sterling'
        }
    ]);

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);

    // Form States
    const [newCard, setNewCard] = useState({ name: '', number: '', expiry: '', cvc: '' });
    const [editDetails, setEditDetails] = useState({ name: '', expiry: '' });

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to remove this payment method?')) {
            setMethods(prev => prev.filter(m => m.id !== id));
            toast.success("Payment method removed successfully");
        }
    };

    const handleSetDefault = (id: string) => {
        setMethods(prev => prev.map(m => ({
            ...m,
            isDefault: m.id === id
        })));
        toast.success("Primary payment method updated");
    };

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!newCard.name || !newCard.number || !newCard.expiry || !newCard.cvc) {
            toast.error("Please fill all card details");
            return;
        }

        // Mock tokenization and saving
        const brand = newCard.number.startsWith('4') ? 'visa' : newCard.number.startsWith('5') ? 'mastercard' : 'amex';
        const last4 = newCard.number.slice(-4) || '0000';
        const [expiryMonth, expiryYear] = newCard.expiry.split('/') || ['12', '28'];

        const newMethod: PaymentMethod = {
            id: `pm_${Date.now()}`,
            brand: brand as any,
            last4,
            expiryMonth: expiryMonth || '12',
            expiryYear: expiryYear || '30',
            isDefault: methods.length === 0,
            nameOnCard: newCard.name
        };

        setMethods([...methods, newMethod]);
        setIsAddModalOpen(false);
        setNewCard({ name: '', number: '', expiry: '', cvc: '' });
        toast.success("Payment method added securely");
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingMethod) return;

        if (!editDetails.name || !editDetails.expiry) {
            toast.error("Please provide valid details");
            return;
        }

        const [expiryMonth, expiryYear] = editDetails.expiry.split('/');

        setMethods(prev => prev.map(m =>
            m.id === editingMethod.id
                ? { ...m, nameOnCard: editDetails.name, expiryMonth, expiryYear }
                : m
        ));

        setIsEditModalOpen(false);
        setEditingMethod(null);
        toast.success("Card details updated");
    };

    const openEditModal = (method: PaymentMethod) => {
        setEditingMethod(method);
        setEditDetails({
            name: method.nameOnCard || '',
            expiry: `${method.expiryMonth}/${method.expiryYear}`
        });
        setIsEditModalOpen(true);
    };

    const getBrandIcon = (brand: string) => {
        switch (brand) {
            case 'visa': return <div className="font-bold text-blue-400 italic font-serif text-lg">VISA</div>;
            case 'mastercard': return <div className="flex -space-x-2"><div className="w-6 h-6 rounded-full bg-red-500/80" /><div className="w-6 h-6 rounded-full bg-yellow-500/80" /></div>;
            case 'amex': return <div className="font-bold text-blue-300 text-xs border border-blue-300 px-1 rounded">AMEX</div>;
            default: return <CreditCard className="w-6 h-6" />;
        }
    };

    return (
        <div className="min-h-screen bg-[#0F1218] text-white font-sans flex">

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="mb-12">
                    <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest mb-4">
                        <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link to="/dashboard/settings" className="hover:text-white transition-colors">Settings</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-luxe-gold font-bold">Payment Vault</span>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                        <div>
                            <h2 className="text-3xl font-serif font-medium mb-3 flex items-center gap-3">Payment Vault <LockIcon className="w-6 h-6 text-gray-500" /></h2>
                            <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
                                Manage your secure payment methods for seamless luxury rentals. All data is encrypted and stored in compliance with PCI-DSS standards.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full text-green-400 text-xs font-bold uppercase tracking-wide">
                            <ShieldCheck className="w-4 h-4" /> AES-256 Encrypted
                        </div>
                    </div>
                </header>

                {methods.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
                        <Wallet className="w-16 h-16 text-gray-500 mb-6" />
                        <h3 className="text-xl font-serif text-white mb-2">No Payment Methods</h3>
                        <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">
                            Add a credit or debit card to seamlessly process future luxury rentals and incidentals.
                        </p>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-white text-black px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors"
                        >
                            Add Your First Method
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Default Method */}
                        <section className="mb-12">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Primary Method</h3>
                            {methods.filter(m => m.isDefault).map(method => (
                                <div key={method.id} className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1218] border border-blue-500/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                                    <div className="flex items-center gap-6 z-10 w-full md:w-auto">
                                        <div className="w-16 h-10 bg-white/5 rounded border border-white/10 flex items-center justify-center text-white">
                                            {getBrandIcon(method.brand)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <p className="font-mono text-xl tracking-widest text-white">•••• •••• •••• {method.last4}</p>
                                                <span className="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest rounded shadow-lg shadow-blue-500/20">Default</span>
                                            </div>
                                            <p className="text-gray-400 text-xs flex items-center gap-2 uppercase tracking-wider">
                                                Expires: <span className="text-white font-mono">{method.expiryMonth}/{method.expiryYear}</span>
                                                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                                {method.nameOnCard || 'Cardholder'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 z-10 w-full md:w-auto">
                                        <button
                                            onClick={() => openEditModal(method)}
                                            className="px-4 py-2 border border-white/10 rounded-lg text-sm font-medium hover:bg-white hover:text-black transition-all"
                                        >
                                            Edit Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* Saved Methods */}
                        <section>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Saved Methods</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                {methods.filter(m => !m.isDefault).map(method => (
                                    <div key={method.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all flex flex-col justify-between h-48 group">
                                        <div>
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-12 h-8 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                                                    {getBrandIcon(method.brand)}
                                                </div>
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                                    <button
                                                        onClick={() => handleSetDefault(method.id)}
                                                        className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors border border-transparent hover:border-yellow-400/20"
                                                        title="Set as Default"
                                                    >
                                                        <Star className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(method.id)}
                                                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors border border-transparent hover:border-red-400/20"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="font-mono text-lg tracking-widest text-white mb-1">•••• {method.last4}</p>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Expires {method.expiryMonth}/{method.expiryYear}</p>
                                        </div>
                                    </div>
                                ))}

                                {/* Add New Card */}
                                <button
                                    onClick={() => setIsAddModalOpen(true)}
                                    className="h-48 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <Plus className="w-6 h-6" />
                                    </div>
                                    <span className="text-sm font-bold uppercase tracking-widest">Add New Method</span>
                                </button>

                            </div>
                        </section>
                    </>
                )}

                <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                    <div className="flex items-center gap-2 text-center md:text-left">
                        <ShieldCheck className="w-4 h-4 text-gray-600 flex-shrink-0" />
                        <span>Securely stored & encrypted via Stripe Vault. LUXEDIVE does not store your full card details.</span>
                    </div>
                    <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                        <div className="font-bold font-serif italic text-blue-400">VISA</div>
                        <div className="flex -space-x-1"><div className="w-3 h-3 rounded-full bg-red-500" /><div className="w-3 h-3 rounded-full bg-yellow-500" /></div>
                        <div className="font-bold border px-1 rounded text-blue-300 border-blue-300">AMEX</div>
                    </div>
                </footer>
            </main>

            {/* ADD METHOD MODAL */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#12141A] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-white/5 text-white">
                            <h3 className="font-serif text-xl">Add Payment Method</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddSubmit} className="p-6 space-y-5">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Name on Card</label>
                                <input
                                    type="text"
                                    required
                                    value={newCard.name}
                                    onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                                    className="w-full bg-[#1A1D24] border border-white/5 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-white/5 transition-colors"
                                    placeholder="JAMES STERLING"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Card Number</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        required
                                        maxLength={16}
                                        value={newCard.number}
                                        onChange={(e) => setNewCard({ ...newCard, number: e.target.value.replace(/\D/g, '') })}
                                        className="w-full bg-[#1A1D24] border border-white/5 rounded-lg pl-12 pr-4 py-3 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:bg-white/5 transition-colors"
                                        placeholder="0000 0000 0000 0000"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Expiry</label>
                                    <input
                                        type="text"
                                        required
                                        value={newCard.expiry}
                                        onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                                        className="w-full bg-[#1A1D24] border border-white/5 rounded-lg px-4 py-3 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:bg-white/5 transition-colors"
                                        placeholder="MM/YY"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">CVC</label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={4}
                                        value={newCard.cvc}
                                        onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value.replace(/\D/g, '') })}
                                        className="w-full bg-[#1A1D24] border border-white/5 rounded-lg px-4 py-3 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:bg-white/5 transition-colors"
                                        placeholder="123"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-white text-black font-bold uppercase tracking-widest text-xs py-4 rounded-lg hover:bg-gray-200 transition-colors mt-4 flex items-center justify-center gap-2">
                                <LockIcon className="w-3.5 h-3.5" /> Save Securely
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* EDIT METHOD MODAL */}
            {isEditModalOpen && editingMethod && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#12141A] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-white/5 text-white">
                            <h3 className="font-serif text-xl">Edit Payment Details</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="p-6 space-y-5">
                            {/* Read-only card info */}
                            <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center gap-4 mb-4">
                                <div className="p-2 bg-white/10 rounded">
                                    {getBrandIcon(editingMethod.brand)}
                                </div>
                                <div>
                                    <p className="font-mono text-white tracking-widest">•••• •••• •••• {editingMethod.last4}</p>
                                    <p className="text-xs text-gray-500 uppercase">Card Number (Encrypted)</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Name on Card</label>
                                <input
                                    type="text"
                                    required
                                    value={editDetails.name}
                                    onChange={(e) => setEditDetails({ ...editDetails, name: e.target.value })}
                                    className="w-full bg-[#1A1D24] border border-white/5 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-white/5 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Expiry</label>
                                <input
                                    type="text"
                                    required
                                    value={editDetails.expiry}
                                    onChange={(e) => setEditDetails({ ...editDetails, expiry: e.target.value })}
                                    className="w-full bg-[#1A1D24] border border-white/5 rounded-lg px-4 py-3 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:bg-white/5 transition-colors"
                                />
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white font-bold uppercase tracking-widest text-xs py-4 rounded-lg hover:bg-blue-700 transition-colors mt-4">
                                Update Details
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PaymentVault;
