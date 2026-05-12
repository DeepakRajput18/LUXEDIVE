import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { Eye, Filter, Download, Search } from 'lucide-react'

interface BookingSummary {
  booking_id: string
  booking_code: string
  user_name: string
  user_email: string
  car_brand: string
  car_model: string
  pickup_date: string
  drop_date: string
  total_price: number
  deposit_amount: number
  status: string
  payment_status: string
  documents_status: string
  created_at: string
}

export default function BookingsManagement() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState<BookingSummary[]>([])
  const [filtered, setFiltered] = useState<BookingSummary[]>([])
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBookings()
  }, [filterStatus])

  useEffect(() => {
    if (!searchTerm) {
      setFiltered(bookings)
      return
    }
    const q = searchTerm.toLowerCase()
    const result = bookings.filter(b => 
      b.booking_code?.toLowerCase().includes(q) ||
      b.user_name?.toLowerCase().includes(q) ||
      b.user_email?.toLowerCase().includes(q) ||
      `${b.car_brand} ${b.car_model}`.toLowerCase().includes(q)
    )
    setFiltered(result)
  }, [searchTerm, bookings])

  const loadBookings = async () => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .rpc('admin_get_all_bookings', {
          p_status: filterStatus === 'all' ? null : filterStatus,
          p_limit: 100,
          p_offset: 0
        })

      if (error) throw error

      setBookings(data || [])
      setFiltered(data || [])
    } catch (err) {
      console.error('Error loading bookings:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white">Bookings Management</h1>
          <p className="text-gray-500 mt-1">{bookings.length} total bookings recorded</p>
        </div>

        <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-all">
          <Download className="w-4 h-4" />
          Export Dataset
        </button>
      </div>

      {/* SEARCH OR FILTERS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
             type="text"
             placeholder="Search by code, user, or vehicle..."
             className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-all"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="lg:col-span-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="w-4 h-4 text-gray-500 shrink-0 mr-2" />
          {[
            { id: null, label: 'All Bookings' },
            { id: 'pending_payment', label: 'Pending Payment' },
            { id: 'pending_approval', label: 'Under Review' },
            { id: 'confirmed', label: 'Confirmed' },
            { id: 'active', label: 'Active' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' }
          ].map(f => (
            <button
              key={f.label}
              onClick={() => setFilterStatus(f.id)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                filterStatus === f.id 
                  ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20' 
                  : 'bg-white/5 border-white/5 text-gray-500 hover:text-white hover:border-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#0B0D10]/50 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5">Identity</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5">Customer</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5">Vehicle</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5">Duration</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5">Financials</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5">Status</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(booking => (
                <tr key={booking.booking_id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="p-6">
                    <div className="font-mono text-amber-500 text-sm font-bold tracking-tighter">{booking.booking_code || booking.booking_id.slice(0, 8)}</div>
                    <div className="text-[10px] text-gray-500 uppercase mt-1">
                      {new Date(booking.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </div>
                  </td>
                  
                  <td className="p-6">
                    <div className="text-sm font-medium text-white">{booking.user_name || 'Anonymous User'}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{booking.user_email}</div>
                  </td>
                  
                  <td className="p-6">
                    <div className="text-sm text-white font-medium">{booking.car_brand}</div>
                    <div className="text-xs text-gray-500">{booking.car_model}</div>
                  </td>
                  
                  <td className="p-6">
                    <div className="text-xs text-white">
                      {new Date(booking.pickup_date).toLocaleDateString()}
                    </div>
                    <div className="text-[10px] text-gray-600 font-bold uppercase my-1">To</div>
                    <div className="text-xs text-white">
                      {new Date(booking.drop_date).toLocaleDateString()}
                    </div>
                  </td>
                  
                  <td className="p-6">
                    <div className="text-sm text-white font-bold">
                      ₹{booking.total_price?.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1">
                      + ₹{booking.deposit_amount?.toLocaleString()} DEP
                    </div>
                  </td>
                  
                  <td className="p-6">
                    <div className="space-y-1.5">
                      <StatusBadge status={booking.status} />
                      <div className="flex gap-2">
                        <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                            booking.payment_status === 'completed' || booking.payment_status === 'paid'
                            ? 'text-green-500 border-green-500/20 bg-green-500/5'
                            : 'text-amber-500 border-amber-500/20 bg-amber-500/5'
                        }`}>
                            PAY: {booking.payment_status || 'PENDING'}
                        </span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-6 text-right">
                    <button
                      onClick={() => navigate(`/admin/bookings/${booking.booking_id}`)}
                      className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                      <Eye className="w-3 h-3 text-amber-500" />
                      View Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {loading && (
            <div className="p-20 text-center">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Syncing Ledger...</p>
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="p-20 text-center">
              <Filter className="w-12 h-12 text-gray-800 mx-auto mb-4" />
              <p className="text-gray-500 font-serif italic text-lg">No records match your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; class: string }> = {
    pending: { label: 'Pending', class: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
    pending_payment: { label: 'Waiting Payment', class: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
    under_verification: { label: 'Under Review', class: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-indigo-500/5' },
    pending_approval: { label: 'Under Review', class: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-indigo-500/5' },
    payment_completed: { label: 'Paid', class: 'bg-green-500/10 text-green-500 border-green-500/20' },
    confirmed: { label: 'Confirmed', class: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    active: { label: 'Active', class: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' },
    completed: { label: 'Finished', class: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' },
    cancelled: { label: 'Voided', class: 'bg-red-500/10 text-red-500 border-red-500/20' }
  }

  const { label, class: className } = config[status] || { label: status, class: 'bg-gray-500/10 text-gray-400 border-gray-400/20' }

  return (
    <span className={`inline-block text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border ${className}`}>
      {label}
    </span>
  )
}
