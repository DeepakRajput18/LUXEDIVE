import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Calendar, Search, CheckCircle, XCircle, Check, Undo2, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { paymentService } from '../../services/paymentService'

interface Booking {
    id: string
    car_id: string
    user_id: string
    start_date: string
    end_date: string
    total_price: number
    status: string
    payment_status?: string
    created_at: string
    cars?: { name: string }
    profiles?: { full_name?: string; phone?: string }
}

const STATUS_COLORS: Record<string, string> = {
    pending: 'text-yellow-400 border-yellow-400/30',
    payment_initiated: 'text-amber-400 border-amber-400/30',
    pending_approval: 'text-indigo-400 border-indigo-400/30 shadow-indigo-500/5',
    payment_completed: 'text-blue-400 border-blue-400/30',
    documents_submitted: 'text-purple-400 border-purple-400/30',
    under_verification: 'text-indigo-400 border-indigo-400/30',
    verified: 'text-emerald-400 border-emerald-400/30',
    confirmed: 'text-green-400 border-green-400/30',
    active: 'text-green-500 border-green-500/30',
    completed: 'text-gray-400 border-gray-400/30',
    cancelled: 'text-red-400 border-red-400/30',
    rejected: 'text-red-600 border-red-600/30',
}

export default function AdminBookings() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [filtered, setFiltered] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    const fetch = async () => {
        const { data } = await supabase
            .from('bookings')
            .select('*, cars(name), profiles(full_name, phone)')
            .order('created_at', { ascending: false })
        setBookings(data ?? [])
        setLoading(false)
    }
    useEffect(() => { fetch() }, [])

    useEffect(() => {
        let data = bookings
        if (statusFilter !== 'all') data = data.filter(b => b.status === statusFilter)
        if (search) {
            const q = search.toLowerCase()
            data = data.filter(b =>
                b.cars?.name?.toLowerCase().includes(q) ||
                b.profiles?.full_name?.toLowerCase().includes(q) ||
                b.id.toLowerCase().includes(q)
            )
        }
        setFiltered(data)
    }, [bookings, statusFilter, search])

    const updateStatus = async (id: string, status: string) => {
        const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
        if (error) { toast.error('Failed to update'); return }
        setBookings(b => b.map(x => x.id === id ? { ...x, status } : x))
        toast.success(`Booking ${status}`)
    }

    const handleRefund = async (bookingId: string) => {
        if (!confirm('Are you sure you want to issue a full refund and cancel this booking?')) return;

        const toastId = toast.loading('Initiating refund...');
        try {
            // 1. Get the successful payment record for this booking
            const { data: payment, error } = await supabase
                .from('payments')
                .select('id')
                .eq('booking_id', bookingId)
                .eq('status', 'successful')
                .single();

            if (error || !payment) throw new Error('No successful payment found for this booking.');

            // 2. Call the refund edge function
            await paymentService.requestRefund(payment.id);

            // 3. Update local state to cancelled and payment_status to refunded
            setBookings(b => b.map(x => x.id === bookingId ? { ...x, status: 'cancelled', payment_status: 'refunded' } : x));

            toast.success('Refund processed successfully!', { id: toastId });
        } catch (error: any) {
            console.error('Refund error:', error);
            toast.error(error.message || 'Failed to process refund.', { id: toastId });
        }
    }

    const statusLabel = (s: string) => s.replace(/_/g, ' ').charAt(0).toUpperCase() + s.replace(/_/g, ' ').slice(1)
    const fmt = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-white">Bookings</h1>
                <p className="text-gray-600 text-sm mt-0.5">{bookings.length} total bookings</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input
                        value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search by car, user, or booking ID…"
                        className="w-full pl-9 pr-4 py-2.5 bg-white/3 border border-white/8 rounded-xl text-white text-sm placeholder-gray-700 focus:outline-none focus:border-luxe-gold/30"
                    />
                </div>
                <select
                    value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                    className="bg-white/3 border border-white/8 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-luxe-gold/30">
                    <option value="all" className="bg-gray-900">All Status</option>
                    {['pending', 'pending_approval', 'confirmed', 'active', 'completed', 'cancelled'].map(s => (
                        <option key={s} value={s} className="bg-gray-900">{statusLabel(s)}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <p className="text-gray-600 text-sm py-8">Loading bookings…</p>
            ) : (
                <div className="bg-white/3 border border-white/8 rounded-xl overflow-x-auto">
                    <table className="w-full text-sm min-w-[800px]">
                        <thead>
                            <tr className="border-b border-white/5">
                                {['Booking ID', 'Vehicle', 'Client', 'Dates', 'Amount', 'Payment', 'Status', 'Actions'].map(h => (
                                    <th key={h} className="text-left px-4 py-3 text-gray-600 text-xs uppercase tracking-wider font-medium">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {filtered.map(b => (
                                <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-4 py-3 text-gray-600 text-xs font-mono">{b.id.slice(0, 8)}&hellip;</td>
                                    <td className="px-4 py-3 text-white font-medium">{b.cars?.name ?? '—'}</td>
                                    <td className="px-4 py-3 text-gray-400">{b.profiles?.full_name ?? b.user_id.slice(0, 8)}</td>
                                    <td className="px-4 py-3 text-gray-400 text-xs">{fmt(b.start_date)} → {fmt(b.end_date)}</td>
                                    <td className="px-4 py-3 text-white">₹{b.total_price?.toLocaleString()}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${b.payment_status === 'paid' ? 'text-green-400 border-green-400/30' : 'text-yellow-400 border-yellow-400/30'
                                            }`}>{b.payment_status ?? 'pending'}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${STATUS_COLORS[b.status] ?? 'text-gray-400 border-gray-400/30'}`}>
                                            {statusLabel(b.status)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                             {b.status === 'pending_approval' && (
                                                <button onClick={() => updateStatus(b.id, 'confirmed')} title="Approve Booking"
                                                    className="p-1.5 rounded-lg hover:bg-green-900/20 text-gray-500 hover:text-green-400 transition">
                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                </button>
                                             )}
                                            {b.status === 'documents_submitted' && (
                                                <button onClick={() => updateStatus(b.id, 'verified')} title="Verify Documents"
                                                    className="p-1.5 rounded-lg hover:bg-emerald-900/20 text-gray-500 hover:text-emerald-400 transition">
                                                    <ShieldCheck className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                            {b.status === 'verified' && (
                                                <button onClick={() => updateStatus(b.id, 'confirmed')} title="Confirm Booking"
                                                    className="p-1.5 rounded-lg hover:bg-green-900/20 text-gray-500 hover:text-green-400 transition">
                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                            {(b.status === 'confirmed' || b.status === 'active') && (
                                                <button onClick={() => updateStatus(b.id, 'completed')} title="Mark Completed"
                                                    className="p-1.5 rounded-lg hover:bg-blue-900/20 text-gray-500 hover:text-blue-400 transition">
                                                    <Check className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                            {b.status !== 'cancelled' && b.status !== 'completed' && (
                                                <button onClick={() => updateStatus(b.id, 'cancelled')} title="Cancel"
                                                    className="p-1.5 rounded-lg hover:bg-red-900/20 text-gray-500 hover:text-red-400 transition">
                                                    <XCircle className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                            {(b.payment_status === 'successful' || b.payment_status === 'paid' || b.status === 'payment_completed') && b.status !== 'cancelled' && b.status !== 'completed' && (
                                                <button onClick={() => handleRefund(b.id)} title="Issue Refund & Cancel"
                                                    className="p-1.5 rounded-lg hover:bg-orange-900/20 text-gray-500 hover:text-orange-400 transition">
                                                    <Undo2 className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr><td colSpan={8} className="text-center py-12">
                                    <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                                    <p className="text-gray-700 text-sm">No bookings found</p>
                                </td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
