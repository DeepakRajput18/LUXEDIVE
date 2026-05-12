import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../contexts/AuthContext'
import { 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Clock, 
  RefreshCw,
  Download,
  Filter,
  AlertCircle
} from 'lucide-react'
import { Skeleton } from '../../components/ui/Skeleton'
import { Button } from '../../components/ui/Button'

interface Payment {
  payment_id: string
  booking_id: string
  amount: number
  status: string
  payment_method: string
  transaction_id: string
  car_brand: string
  car_model: string
  car_image: string
  booking_code: string
  booking_dates: string
  refund_amount: number | null
  refund_reason: string | null
  created_at: string
  completed_at: string | null
}

interface PaymentStats {
  totalPaid: number
  totalRefunded: number
  pendingPayments: number
  completedCount: number
  refundedCount: number
  cancelledCount: number
  failedCount: number
}

export default function PaymentHistory() {
  const { user } = useAuth()
  const [payments, setPayments] = useState<Payment[]>([])
  const [stats, setStats] = useState<PaymentStats | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadPaymentHistory()
      loadPaymentStats()
    }
  }, [user, filterStatus])

  const loadPaymentHistory = async () => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .rpc('get_payment_history', {
          p_user_id: user?.id,
          p_status: filterStatus,
          p_limit: 50,
          p_offset: 0
        })

      if (error) throw error

      setPayments(data || [])
    } catch (err) {
      console.error('Error loading payments:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadPaymentStats = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_payment_stats', {
          p_user_id: user?.id
        })

      if (error) throw error

      setStats(data)
    } catch (err) {
      console.error('Error loading stats:', err)
    }
  }

  const downloadInvoice = (paymentId: string) => {
    // Navigate to invoice page
    window.location.href = `/booking/invoice/${paymentId}`
  }

  return (
    <div className="p-0 space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif text-white">Payment History</h1>
          <p className="text-gray-400 mt-2 font-light">Track and manage your luxury investments.</p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCardSmall 
            label="Total Paid" 
            value={`₹${(stats.totalPaid / 1000).toFixed(1)}K`} 
            subValue={`${stats.completedCount} transactions`}
            color="green"
          />
          <StatCardSmall 
            label="Refunded" 
            value={`₹${(stats.totalRefunded / 1000).toFixed(1)}K`} 
            subValue={`${stats.refundedCount} refunds`}
            color="blue"
          />
          <StatCardSmall 
            label="Pending" 
            value={`₹${(stats.pendingPayments / 1000).toFixed(1)}K`} 
            subValue="Awaiting processing"
            color="gold"
          />
          <StatCardSmall 
            label="Failed/Cancelled" 
            value={stats.failedCount + stats.cancelledCount} 
            subValue="Past attempts"
            color="red"
          />
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3 bg-white/[0.02] p-4 rounded-xl border border-white/5 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 mr-4 shrink-0">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Filter By</span>
        </div>
        
        <FilterButton active={!filterStatus} label="All" onClick={() => setFilterStatus(null)} />
        <FilterButton active={filterStatus === 'completed'} label="Completed" onClick={() => setFilterStatus('completed')} />
        <FilterButton active={filterStatus === 'pending'} label="Pending" onClick={() => setFilterStatus('pending')} />
        <FilterButton active={filterStatus === 'refunded'} label="Refunded" onClick={() => setFilterStatus('refunded')} />
        <FilterButton active={filterStatus === 'cancelled'} label="Cancelled" onClick={() => setFilterStatus('cancelled')} />
        <FilterButton active={filterStatus === 'failed'} label="Failed" onClick={() => setFilterStatus('failed')} />
      </div>

      {/* Payments List */}
      <div className="space-y-4">
        {loading ? (
          [1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full bg-[#121212] border border-white/5 rounded-2xl" />)
        ) : payments.length === 0 ? (
          <div className="bg-[#121212] border border-white/5 rounded-2xl p-20 text-center">
            <CreditCard className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-white mb-2">No transactions found</h3>
            <p className="text-gray-500 font-light">Your payment history will appear here once you make a booking.</p>
          </div>
        ) : (
          payments.map(payment => (
            <div
              key={payment.payment_id}
              className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300 group"
            >
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex gap-6">
                  <div className="w-24 h-16 bg-zinc-900 rounded-lg overflow-hidden shrink-0 border border-white/5">
                    <img
                      src={payment.car_image}
                      alt={`${payment.car_brand} ${payment.car_model}`}
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-serif text-white group-hover:text-luxe-gold transition-colors">
                      {payment.car_brand} {payment.car_model}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{payment.booking_code}</p>
                      <p className="text-[10px] text-gray-500 font-light">{payment.booking_dates}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="px-2 py-0.5 bg-white/5 rounded text-[8px] font-bold text-gray-400 uppercase tracking-widest border border-white/5">
                        {payment.payment_method}
                      </div>
                      <div className="text-[9px] text-gray-600 font-mono">
                        TXN: {payment.transaction_id || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-3">
                  <div className="text-2xl font-serif text-white">
                    ₹{payment.amount.toLocaleString()}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                      <PaymentStatusBadge status={payment.status} />
                      <span className="text-[9px] text-gray-600 mt-1 uppercase tracking-tighter">
                         {new Date(payment.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {payment.status === 'completed' && (
                      <button
                        onClick={() => downloadInvoice(payment.booking_id)}
                        className="p-2 bg-white/5 rounded-lg text-luxe-gold hover:bg-luxe-gold hover:text-black transition-all border border-white/5"
                        title="Download Invoice"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {payment.refund_amount && (
                <div className="px-6 py-4 bg-blue-500/5 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-4 h-4 text-blue-400 animate-spin-slow" />
                    <div>
                      <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Refund Issued: ₹{payment.refund_amount.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">Reason: {payment.refund_reason || 'Customer request'}</p>
                    </div>
                  </div>
                  <div className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                    Process Complete
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function StatCardSmall({ label, value, subValue, color }: any) {
  const colorMap = {
    green: 'text-emerald-500',
    blue: 'text-blue-500',
    gold: 'text-luxe-gold',
    red: 'text-rose-500'
  }

  return (
    <div className="bg-[#121212] border border-white/5 rounded-2xl p-6">
      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">{label}</div>
      <div className={`text-2xl font-serif mb-1 ${colorMap[color as keyof typeof colorMap]}`}>{value}</div>
      <div className="text-[9px] text-gray-600 font-medium uppercase tracking-widest">{subValue}</div>
    </div>
  )
}

function FilterButton({ active, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 shrink-0 ${
        active 
          ? 'bg-luxe-gold text-black border-luxe-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
          : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/20 hover:text-white'
      }`}
    >
      {label}
    </button>
  )
}

function PaymentStatusBadge({ status }: { status: string }) {
  const config = {
    completed: { 
      label: 'Completed', 
      icon: <CheckCircle className="w-3 h-3" />,
      class: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' 
    },
    pending: { 
      label: 'Pending', 
      icon: <Clock className="w-3 h-3" />,
      class: 'text-luxe-gold bg-luxe-gold/10 border-luxe-gold/20' 
    },
    failed: { 
      label: 'Failed', 
      icon: <XCircle className="w-3 h-3" />,
      class: 'text-rose-500 bg-rose-500/10 border-rose-500/20' 
    },
    refunded: { 
      label: 'Refunded', 
      icon: <RefreshCw className="w-3 h-3" />,
      class: 'text-blue-500 bg-blue-500/10 border-blue-500/20' 
    },
    cancelled: { 
      label: 'Cancelled', 
      icon: <XCircle className="w-3 h-3" />,
      class: 'text-gray-500 bg-white/5 border-white/10' 
    }
  }

  const { label, icon, class: className } = config[status as keyof typeof config] || config.pending

  return (
    <span className={`inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${className}`}>
      {icon}
      {label}
    </span>
  )
}
