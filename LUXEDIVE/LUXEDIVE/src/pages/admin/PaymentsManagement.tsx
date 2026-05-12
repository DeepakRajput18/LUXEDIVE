import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { 
    CreditCard, Search, Filter, ArrowUpRight, 
    RefreshCw, Clock, CheckCircle2, XCircle, AlertCircle,
    Undo2
} from 'lucide-react'
import { toast } from 'sonner'

interface Payment {
    id: string
    booking_id: string
    booking_code?: string
    amount: number
    status: string
    payment_method?: string
    transaction_id?: string
    error_message?: string
    refund_amount: number | null
    refund_reason: string | null
    created_at: string
    user_name: string
    user_email?: string
    source?: string
}

export default function PaymentsManagement() {
    const [payments, setPayments] = useState<Payment[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
    const [showRefundModal, setShowRefundModal] = useState(false)
    const [refundData, setRefundData] = useState({ amount: '', reason: '' })
    const [activeTab, setActiveTab] = useState<'transactions' | 'verifications'>('transactions')

    // Verification Queue State
    const [pendingProofs, setPendingProofs] = useState<any[]>([])
    const [verifyingProof, setVerifyingProof] = useState<string | null>(null)
    const [showProofDetails, setShowProofDetails] = useState<any | null>(null)
    const [rejectionReason, setRejectionReason] = useState('')
    const [showRejectionModal, setShowRejectionModal] = useState<any | null>(null)

    const fetchPayments = async () => {
        setRefreshing(true)
        try {
            const { data, error } = await supabase.rpc('admin_get_payments')
            if (error) throw error
            setPayments(data || [])
        } catch (err: any) {
            toast.error('Failed to load payments: ' + err.message)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    const fetchPendingProofs = async () => {
        try {
            const { data, error } = await supabase.rpc('admin_fetch_payment_proofs');

            if (error) throw error;
            setPendingProofs(data || []);
        } catch (err: any) {
            toast.error('Failed to load verification queue: ' + err.message);
        }
    }

    useEffect(() => {
        fetchPayments()
        fetchPendingProofs()
    }, [])

    const handleRefund = async () => {
        if (!selectedPayment || !refundData.amount || !refundData.reason) {
            toast.error('Please fill in all refund details')
            return
        }

        try {
            const { error } = await supabase.rpc('admin_process_refund', {
                p_payment_id: selectedPayment.id,
                p_refund_amount: parseFloat(refundData.amount),
                p_reason: refundData.reason
            })
            if (error) throw error
            
            toast.success('Refund processed successfully')
            setShowRefundModal(false)
            setRefundData({ amount: '', reason: '' })
            fetchPayments()
        } catch (err: any) {
            toast.error('Refund failed: ' + err.message)
        }
    }

    const handleVerification = async (proofId: string, bookingId: string, status: 'verified' | 'failed', reason?: string) => {
        setVerifyingProof(proofId);
        toast.loading(`${status === 'verified' ? 'Approving' : 'Rejecting'} payment...`, { id: 'verify_proof' });

        try {
            const { error } = await supabase.rpc('admin_manage_payment_verification', {
                p_proof_id: proofId,
                p_booking_id: bookingId,
                p_status: status,
                p_reason: reason || null
            });

            if (error) throw error;

            toast.success(`Payment ${status === 'verified' ? 'Approved' : 'Rejected'} successfully`, { id: 'verify_proof' });
            fetchPendingProofs();
            fetchPayments();
            setShowProofDetails(null);
            setShowRejectionModal(null);
            setRejectionReason('');
        } catch (err: any) {
            toast.error(`Action failed: ${err.message}`, { id: 'verify_proof' });
        } finally {
            setVerifyingProof(null);
        }
    }

    const filteredPayments = payments.filter(p => 
        p.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.booking_id.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'success':
            case 'paid':
            case 'refunded': return 'text-emerald-400 bg-emerald-400/10'
            case 'pending':
            case 'refund_requested': return 'text-amber-400 bg-amber-400/10'
            case 'failed': return 'text-rose-400 bg-rose-400/10'
            default: return 'text-gray-400 bg-gray-400/10'
        }
    }

    if (loading) {
        return <div className="flex items-center justify-center h-64 text-gray-500 animate-pulse">Initializing financial records...</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-2xl font-serif text-white flex items-center gap-3">
                        <CreditCard className="w-6 h-6 text-luxe-gold" />
                        Payments & Financial Ledger
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Audit transactions and manage platform refunds</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                            type="text" 
                            placeholder="Search by user or booking ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-luxe-gold/50 w-64 transition-all"
                        />
                    </div>
                    <button 
                        onClick={() => {
                            fetchPayments();
                            fetchPendingProofs();
                        }}
                        className={`p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all ${refreshing ? 'animate-spin' : ''}`}
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-white/[0.02] border border-white/5 p-1 rounded-xl w-fit">
                <button 
                    onClick={() => setActiveTab('transactions')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'transactions' ? 'bg-luxe-gold text-black' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    Transactions
                </button>
                <button 
                    onClick={() => setActiveTab('verifications')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all relative ${activeTab === 'verifications' ? 'bg-luxe-gold text-black' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    Verification Queue
                    {pendingProofs.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-[#0B0D10]">
                            {pendingProofs.length}
                        </span>
                    )}
                </button>
            </div>

            {activeTab === 'transactions' ? (
                <>
                    <div className="bg-[#0B0D10]/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl overflow-x-auto">
                        <table className="w-full text-sm">
                        {/* Existing Table Content */}
                    <thead>
                        <tr className="border-b border-white/[0.04] bg-white/[0.02]">
                            {['Date & Time', 'User', 'Amount & Reference', 'Status & Method', 'Refund Details', 'Actions'].map(h => (
                                <th key={h} className="text-left px-6 py-4 text-gray-500 text-[10px] uppercase tracking-widest font-bold">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                        {filteredPayments.map(p => (
                            <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-white font-medium">{new Date(p.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                        <span className="text-[10px] text-gray-600 uppercase tracking-tighter">{new Date(p.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-gray-300">{p.user_name}</span>
                                        {p.user_email && <span className="text-[10px] text-gray-600 truncate max-w-[140px]">{p.user_email}</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-serif text-white text-base">₹{p.amount.toLocaleString()}</span>
                                        {p.booking_code && <span className="text-[10px] text-gray-600 font-mono italic">{p.booking_code}</span>}
                                        {p.transaction_id && <span className="text-[10px] text-luxe-gold/70 font-mono tracking-tighter mt-1">REF: {p.transaction_id}</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm w-fit ${getStatusColor(p.status)}`}>
                                            {p.status.replace(/_/g, ' ')}
                                        </span>
                                        {p.payment_method && (
                                            <span className="text-[10px] text-gray-600 uppercase tracking-tighter pl-1">{p.payment_method.replace('_', ' ')}</span>
                                        )}
                                        {p.status === 'failed' && p.error_message && (
                                            <span className="text-[9px] text-rose-500/70 italic mt-1 max-w-[150px] leading-tight">"{p.error_message}"</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {p.refund_amount ? (
                                        <div className="flex flex-col gap-1 text-[11px]">
                                            <span className="text-rose-400 font-bold">Refunded: ₹{p.refund_amount.toLocaleString()}</span>
                                            <span className="text-gray-500 italic">"{p.refund_reason}"</span>
                                        </div>
                                    ) : (
                                        <span className="text-gray-700 text-xs italic">No refunds</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {p.status === 'success' && !p.refund_amount && (
                                        <button 
                                            onClick={() => {
                                                setSelectedPayment(p)
                                                setShowRefundModal(true)
                                            }}
                                            className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all border border-rose-500/20 shadow-lg"
                                            title="Issue Refund"
                                        >
                                            <Undo2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Refund Modal */}
            {showRefundModal && selectedPayment && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowRefundModal(false)} />
                    <div className="relative bg-[#111318] border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-rose-500/20 rounded-2xl text-rose-500">
                                <Undo2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Issue Refund</h3>
                                <p className="text-xs text-gray-500">Processing for: {selectedPayment.user_name}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">Refund Amount (Max ₹{selectedPayment.amount})</label>
                                <input 
                                    type="number" 
                                    max={selectedPayment.amount}
                                    value={refundData.amount}
                                    onChange={(e) => setRefundData({...refundData, amount: e.target.value})}
                                    placeholder="Enter amount..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">Reason for Refund</label>
                                <textarea 
                                    rows={3}
                                    value={refundData.reason}
                                    onChange={(e) => setRefundData({...refundData, reason: e.target.value})}
                                    placeholder="Customer cancellation, vehicle fault, etc..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500/50 resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-8">
                            <button 
                                onClick={() => setShowRefundModal(false)}
                                className="flex-1 py-3 px-4 rounded-xl text-gray-400 hover:bg-white/5 text-sm font-bold transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleRefund}
                                className="flex-1 py-3 px-4 rounded-xl bg-rose-500 text-white text-sm font-bold hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-all"
                            >
                                Process Refund
                            </button>
                        </div>
                    </div>
                </div>
                )}
            </>
        ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingProofs.length === 0 ? (
                        <div className="col-span-full py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 text-center">
                            <div className="p-4 bg-white/5 rounded-full">
                                <CheckCircle2 className="w-8 h-8 text-gray-600" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-white font-medium">Clear for now</h3>
                                <p className="text-sm text-gray-500">All payment proofs have been processed.</p>
                            </div>
                        </div>
                    ) : (
                        pendingProofs.map(proof => (
                            <div key={proof.id} className="bg-[#0B0D10]/50 border border-white/10 rounded-3xl overflow-hidden group hover:border-luxe-gold/30 transition-all flex flex-col">
                                <div className="aspect-video relative overflow-hidden bg-black/40">
                                    {proof.screenshot_url ? (
                                        <img 
                                            src={proof.screenshot_url} 
                                            alt="Payment Proof" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-600">
                                            <AlertCircle className="w-8 h-8 opacity-20" />
                                            <span className="text-[10px] uppercase font-bold tracking-widest">No Screenshot Provided</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <button 
                                            onClick={() => setShowProofDetails(proof)}
                                            className="w-full py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-xs font-bold text-white hover:bg-white/20 transition-all"
                                        >
                                            View Full details
                                        </button>
                                    </div>
                                    <div className="absolute top-3 left-3 px-3 py-1 bg-amber-500/20 backdrop-blur-md border border-amber-500/30 rounded-full">
                                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-tighter">₹{proof.bookings?.total_price?.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-white font-serif text-lg">{proof.profiles?.full_name || 'Unknown User'}</h4>
                                            <span className="text-[10px] text-gray-600 font-mono">ID: {proof.id.slice(0,8)}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 truncate">{proof.profiles?.email}</p>
                                    </div>

                                    <div className="bg-white/[0.03] rounded-2xl p-3 space-y-2">
                                        <div className="flex items-center justify-between text-[10px]">
                                            <span className="text-gray-500 uppercase font-bold tracking-widest">Transaction ID</span>
                                            <span className="text-white font-mono">{proof.transaction_id || 'NOT PROVIDED'}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[10px]">
                                            <span className="text-gray-500 uppercase font-bold tracking-widest">Submitted</span>
                                            <span className="text-gray-400">{new Date(proof.created_at).toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-auto">
                                        <button 
                                            onClick={() => setShowRejectionModal(proof)}
                                            disabled={verifyingProof === proof.id}
                                            className="flex-1 py-3 px-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-bold uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all disabled:opacity-50"
                                        >
                                            Reject
                                        </button>
                                        <button 
                                            onClick={() => handleVerification(proof.id, proof.booking_id, 'verified')}
                                            disabled={verifyingProof === proof.id}
                                            className="flex-1 py-3 px-4 rounded-xl bg-luxe-gold text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-amber-900/20 disabled:opacity-50"
                                        >
                                            Verify & Confirm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Proof Detail Modal */}
            {showProofDetails && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowProofDetails(null)} />
                    <div className="relative bg-[#111318] border border-white/10 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex-1 bg-black/40 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-white/10 overflow-auto">
                            {showProofDetails.screenshot_url ? (
                                <img 
                                    src={showProofDetails.screenshot_url} 
                                    className="max-w-full rounded-2xl shadow-2xl" 
                                    alt="Transaction Proof"
                                />
                            ) : (
                                <div className="text-center space-y-4 py-20">
                                    <AlertCircle className="w-16 h-16 text-gray-700 mx-auto" />
                                    <p className="text-gray-500 italic">No screenshot attached to this proof submission.</p>
                                </div>
                            )}
                        </div>
                        <div className="w-full md:w-80 p-8 flex flex-col gap-6">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-serif text-white">{showProofDetails.profiles?.full_name || 'Unknown User'}</h3>
                                <p className="text-sm text-amber-500/80 font-bold uppercase tracking-widest">Manual UPI Verification</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Transaction Amount</label>
                                    <div className="text-2xl font-serif text-white">₹{showProofDetails.bookings?.total_price?.toLocaleString()}</div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Recipient TXN ID</label>
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 font-mono text-sm text-white break-all">
                                        {showProofDetails.transaction_id || 'Not Provided'}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Booking Context</label>
                                    <div className="text-xs text-gray-400">ID: {showProofDetails.booking_id}</div>
                                </div>
                            </div>

                            <div className="mt-auto space-y-3">
                                <button 
                                    onClick={() => handleVerification(showProofDetails.id, showProofDetails.booking_id, 'verified')}
                                    className="w-full py-4 bg-luxe-gold text-black font-bold uppercase tracking-widest rounded-2xl hover:bg-white transition-all shadow-xl shadow-amber-900/20"
                                >
                                    Approve Booking
                                </button>
                                <button 
                                    onClick={() => setShowRejectionModal(showProofDetails)}
                                    className="w-full py-4 bg-white/5 text-rose-500 font-bold uppercase tracking-widest rounded-2xl hover:bg-rose-500/10 transition-all border border-rose-500/10"
                                >
                                    Reject Proof
                                </button>
                                {showProofDetails.screenshot_url && (
                                    <a 
                                        href={showProofDetails.screenshot_url}
                                        download={`proof_${showProofDetails.id.slice(0,8)}.png`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3 bg-white/5 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all border border-white/5 flex items-center justify-center gap-2"
                                    >
                                        <ArrowUpRight className="w-3 h-3" /> Download High-Res
                                    </a>
                                )}
                                <button 
                                    onClick={() => setShowProofDetails(null)}
                                    className="w-full py-3 text-gray-500 text-xs font-bold uppercase tracking-tighter"
                                >
                                    Close Preview
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Rejection Reason Modal */}
            {showRejectionModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowRejectionModal(null)} />
                    <div className="relative bg-[#111318] border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-rose-500/20 rounded-2xl text-rose-500">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Reject Payment</h3>
                                <p className="text-xs text-gray-500">Provide a reason for the customer</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">Rejection Reason</label>
                                <textarea 
                                    rows={4}
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    placeholder="e.g., Transaction ID not found in bank records, screenshot is blurred, etc..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500/50 resize-none text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-8">
                            <button 
                                onClick={() => setShowRejectionModal(null)}
                                className="flex-1 py-3 px-4 rounded-xl text-gray-400 hover:bg-white/5 text-sm font-bold transition-all"
                            >
                                Back
                            </button>
                            <button 
                                onClick={() => handleVerification(showRejectionModal.id, showRejectionModal.booking_id, 'failed', rejectionReason)}
                                disabled={!rejectionReason || verifyingProof === showRejectionModal.id}
                                className="flex-1 py-3 px-4 rounded-xl bg-rose-500 text-white text-sm font-bold hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-all disabled:opacity-50"
                            >
                                Confirm Rejection
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
