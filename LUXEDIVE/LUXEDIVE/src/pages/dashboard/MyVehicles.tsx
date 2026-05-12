import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'sonner'
import {
  Car, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp,
  Trash2, ToggleLeft, ToggleRight, CalendarDays, X, ChevronDown,
  ChevronUp, IndianRupee, RefreshCw, Eye
} from 'lucide-react'
import { Button } from '../../components/ui/Button'

interface UserVehicle {
  v_id: string
  v_brand: string
  v_model: string
  v_year: number
  v_images: string[]
  v_status: string
  v_is_available: boolean
  v_price_per_day: number | null
  v_total_bookings: number
  v_total_earnings: number
  v_admin_note: string | null
  v_created_at: string
}

interface BookingSlot {
  id: string
  pickup_datetime: string
  dropoff_datetime: string
  status: string
  total_price: number
  payment_status: string
}

interface UnavailRequest {
  id: string
  admin_status: string
  reason: string
  unavailable_from: string
  unavailable_until: string | null
  duration_days: number | null
  admin_note: string | null
}

export default function MyVehicles() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [vehicles, setVehicles] = useState<UserVehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Modal states
  const [unavailModal, setUnavailModal] = useState<{ open: boolean; carId: string; carName: string } | null>(null)
  const [unavailReason, setUnavailReason] = useState('')
  const [unavailDays, setUnavailDays] = useState('')
  const [unavailSubmitting, setUnavailSubmitting] = useState(false)

  // Per-vehicle data
  const [slots, setSlots] = useState<Record<string, BookingSlot[]>>({})
  const [earnings, setEarnings] = useState<Record<string, { total: number; paid: number; pending: number }>>({})
  const [unavailReqs, setUnavailReqs] = useState<Record<string, UnavailRequest[]>>({})

  useEffect(() => { if (user) loadVehicles() }, [user])

  const loadVehicles = async () => {
    try {
      const { data, error } = await supabase.rpc('get_user_vehicles', { p_user_id: user?.id })
      if (error) throw error
      setVehicles(data || [])
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const loadVehicleDetails = async (carId: string) => {
    // Booking Slots
    const { data: bookingData } = await supabase
      .from('bookings')
      .select('id, pickup_datetime, dropoff_datetime, status, total_price, payment_status')
      .eq('car_id', carId)
      .neq('status', 'cancelled')
      .order('pickup_datetime', { ascending: false })
    setSlots(prev => ({ ...prev, [carId]: bookingData || [] }))

    // Earnings
    const total = (bookingData || []).reduce((s: number, b: BookingSlot) => s + Number(b.total_price), 0)
    const paid = (bookingData || []).filter((b: BookingSlot) => b.payment_status === 'paid').reduce((s: number, b: BookingSlot) => s + Number(b.total_price), 0)
    setEarnings(prev => ({ ...prev, [carId]: { total, paid, pending: total - paid } }))

    // Unavailability Requests
    const { data: reqData } = await supabase
      .from('vehicle_unavailability_requests')
      .select('*')
      .eq('car_id', carId)
      .eq('owner_id', user?.id)
      .order('created_at', { ascending: false })
    setUnavailReqs(prev => ({ ...prev, [carId]: reqData || [] }))
  }

  const handleExpand = (carId: string) => {
    if (expandedId === carId) { setExpandedId(null); return }
    setExpandedId(carId)
    loadVehicleDetails(carId)
  }

  // Set car AVAILABLE directly - no admin approval needed
  const setAvailable = async (carId: string) => {
    const { error } = await supabase.from('cars').update({ is_available: true, under_maintenance: false }).eq('id', carId)
    if (error) { toast.error(error.message); return }
    toast.success('Car is now Available on fleet!')
    loadVehicles()
  }

  // Open modal for unavailability request
  const openUnavailModal = (carId: string, carName: string) => {
    setUnavailModal({ open: true, carId, carName })
    setUnavailReason('')
    setUnavailDays('')
  }

  // Submit unavailability - creates request for admin + immediately sets is_available = false
  const submitUnavail = async () => {
    if (!unavailModal || !unavailReason.trim()) { toast.error('Please provide a reason'); return }
    setUnavailSubmitting(true)
    try {
      const carId = unavailModal.carId
      const days = parseInt(unavailDays) || null
      const until = days ? new Date(Date.now() + days * 86400000).toISOString() : null

      // Immediately mark car unavailable in fleet
      await supabase.from('cars').update({ is_available: false }).eq('id', carId)

      // Log the request for admin
      const { error } = await supabase.from('vehicle_unavailability_requests').insert({
        car_id: carId,
        owner_id: user?.id,
        reason: unavailReason,
        unavailable_from: new Date().toISOString(),
        unavailable_until: until,
        duration_days: days,
        admin_status: 'pending'
      })
      if (error) throw error

      toast.success('Car marked as unavailable. Admin has been notified.')
      setUnavailModal(null)
      loadVehicles()
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setUnavailSubmitting(false)
    }
  }

  // Remove car from fleet completely
  const removeCar = async (carId: string, carName: string) => {
    if (!confirm(`Remove "${carName}" from the fleet? This cannot be undone.`)) return
    const { error } = await supabase.from('cars').delete().eq('id', carId)
    if (error) { toast.error(error.message); return }
    toast.success(`${carName} removed from fleet.`)
    setVehicles(prev => prev.filter(v => v.v_id !== carId))
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500" />
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white">My Fleet</h1>
          <p className="text-gray-400 mt-1 text-sm">Manage your luxury vehicle listings</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={loadVehicles} className="p-2.5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/30 transition-all">
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link to="/add-vehicle">
            <Button variant="primary" className="shadow-[0_0_15px_rgba(251,191,36,0.2)]">+ List New Vehicle</Button>
          </Link>
        </div>
      </div>

      {vehicles.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-16 text-center">
          <div className="bg-amber-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Car className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Vehicles Listed</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8">Start earning by adding your luxury car to our fleet.</p>
          <Link to="/add-vehicle"><Button variant="outline">Get Started</Button></Link>
        </div>
      ) : (
        <div className="space-y-6">
          {vehicles.map(vehicle => (
            <div key={vehicle.v_id} className="bg-[#0A0A0A] border border-white/5 hover:border-white/15 rounded-2xl overflow-hidden transition-all">
              {/* Main Row */}
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-56 relative h-48 md:h-auto overflow-hidden flex-shrink-0">
                  <img
                    src={vehicle.v_images?.[0] || '/placeholder.jpg'}
                    alt={`${vehicle.v_brand} ${vehicle.v_model}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <StatusBadge status={vehicle.v_status} />
                  </div>
                </div>

                {/* Core Details */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-serif text-white">{vehicle.v_brand} {vehicle.v_model} <span className="text-gray-500 text-sm font-sans">({vehicle.v_year})</span></h3>
                      <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">Added {new Date(vehicle.v_created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    {vehicle.v_status === 'approved' && (
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${vehicle.v_is_available ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' : 'bg-red-500/15 border-red-500/30 text-red-400'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${vehicle.v_is_available ? 'bg-emerald-400' : 'bg-red-400'}`} />
                        {vehicle.v_is_available ? 'Live on Fleet' : 'Unavailable'}
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  {vehicle.v_status === 'approved' && (
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      <Stat label="Daily Rate" value={`₹${vehicle.v_price_per_day?.toLocaleString() || '—'}`} />
                      <Stat label="Total Bookings" value={String(vehicle.v_total_bookings || 0)} />
                      <Stat label="Total Earnings" value={`₹${(vehicle.v_total_earnings || 0).toLocaleString()}`} highlight />
                    </div>
                  )}

                  {vehicle.v_status !== 'approved' && (
                    <div className="py-3 px-4 bg-amber-500/5 border border-amber-500/15 rounded-xl mb-5 flex items-center gap-3">
                      <Clock className="w-4 h-4 text-amber-500 animate-pulse flex-shrink-0" />
                      <p className="text-sm text-gray-400">Vehicle is under admin review. Expected within 48 hours.</p>
                    </div>
                  )}

                  {vehicle.v_admin_note && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mb-5 flex gap-3">
                      <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-300 italic">{vehicle.v_admin_note}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {vehicle.v_status === 'approved' && (
                      <>
                        {/* Availability Toggle */}
                        {vehicle.v_is_available ? (
                          <button
                            onClick={() => openUnavailModal(vehicle.v_id, `${vehicle.v_brand} ${vehicle.v_model}`)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-xs font-bold uppercase tracking-widest"
                          >
                            <ToggleLeft className="w-4 h-4" /> Mark Unavailable
                          </button>
                        ) : (
                          <button
                            onClick={() => setAvailable(vehicle.v_id)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all text-xs font-bold uppercase tracking-widest"
                          >
                            <ToggleRight className="w-4 h-4" /> Mark Available
                          </button>
                        )}

                        {/* View Slots toggle */}
                        <button
                          onClick={() => handleExpand(vehicle.v_id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all text-xs font-bold uppercase tracking-widest"
                        >
                          <CalendarDays className="w-4 h-4" />
                          {expandedId === vehicle.v_id ? 'Hide Details' : 'Slots & Payments'}
                          {expandedId === vehicle.v_id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      </>
                    )}

                    {/* Remove Car */}
                    <button
                      onClick={() => removeCar(vehicle.v_id, `${vehicle.v_brand} ${vehicle.v_model}`)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/5 border border-red-500/15 text-red-500/70 hover:text-red-400 hover:bg-red-500/15 transition-all text-xs font-bold uppercase tracking-widest ml-auto"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded: Slots + Payments + Unavail Requests */}
              {expandedId === vehicle.v_id && (
                <div className="border-t border-white/5 p-6 space-y-6 bg-white/[0.02]">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Booking Slots */}
                    <div className="lg:col-span-2">
                      <h4 className="text-xs font-black uppercase tracking-widest text-amber-500 mb-4 flex items-center gap-2">
                        <CalendarDays className="w-4 h-4" /> Booking Slots
                      </h4>
                      {(slots[vehicle.v_id] || []).length === 0 ? (
                        <div className="text-center py-8 text-gray-600 text-sm">No bookings found for this vehicle.</div>
                      ) : (
                        <div className="space-y-3">
                          {(slots[vehicle.v_id] || []).map(slot => {
                            const now = new Date()
                            const pickup = new Date(slot.pickup_datetime)
                            const dropoff = new Date(slot.dropoff_datetime)
                            const isOngoing = pickup <= now && dropoff >= now
                            const isFuture = pickup > now
                            return (
                              <div key={slot.id} className={`flex items-center justify-between p-4 rounded-xl border ${isOngoing ? 'bg-emerald-500/10 border-emerald-500/20' : isFuture ? 'bg-blue-500/10 border-blue-500/20' : 'bg-white/3 border-white/5'}`}>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${isOngoing ? 'bg-emerald-500 text-black' : isFuture ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}>
                                      {isOngoing ? '● Ongoing' : isFuture ? '◆ Upcoming' : '◻ Completed'}
                                    </span>
                                    <span className={`text-[9px] font-bold uppercase tracking-widest ${slot.payment_status === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                                      {slot.payment_status}
                                    </span>
                                  </div>
                                  <p className="text-white text-sm font-medium">
                                    {pickup.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    {' → '}
                                    {dropoff.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                  </p>
                                  <p className="text-gray-500 text-xs">{pickup.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} to {dropoff.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-amber-500 font-serif text-lg">₹{Number(slot.total_price).toLocaleString()}</p>
                                  <p className="text-gray-600 text-[10px] uppercase tracking-widest">{slot.status}</p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    {/* Right column: Payment Summary + Unavailability Requests */}
                    <div className="space-y-5">
                      {/* Payment Summary */}
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-amber-500 mb-4 flex items-center gap-2">
                          <IndianRupee className="w-4 h-4" /> Payments
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-gray-400 text-xs uppercase tracking-widest">Total Earned</span>
                            <span className="text-white font-serif text-sm">₹{(earnings[vehicle.v_id]?.total || 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-emerald-400 text-xs uppercase tracking-widest">Paid Out</span>
                            <span className="text-emerald-400 font-serif text-sm">₹{(earnings[vehicle.v_id]?.paid || 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-amber-400 text-xs uppercase tracking-widest">Pending</span>
                            <span className="text-amber-400 font-serif text-sm">₹{(earnings[vehicle.v_id]?.pending || 0).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Unavailability Requests */}
                      {(unavailReqs[vehicle.v_id] || []).length > 0 && (
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" /> Unavailability Requests
                          </h4>
                          <div className="space-y-2">
                            {(unavailReqs[vehicle.v_id] || []).slice(0, 3).map(req => (
                              <div key={req.id} className={`p-3 rounded-xl border text-xs ${req.admin_status === 'approved' ? 'bg-emerald-500/10 border-emerald-500/20' : req.admin_status === 'rejected' ? 'bg-red-500/10 border-red-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`font-black uppercase tracking-widest ${req.admin_status === 'approved' ? 'text-emerald-400' : req.admin_status === 'rejected' ? 'text-red-400' : 'text-amber-400'}`}>
                                    {req.admin_status}
                                  </span>
                                  {req.duration_days && <span className="text-gray-500">{req.duration_days} days</span>}
                                </div>
                                <p className="text-gray-300">{req.reason}</p>
                                {req.admin_note && <p className="text-blue-300 mt-1 italic">Admin: {req.admin_note}</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Unavailability Modal */}
      {unavailModal?.open && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#0E0E0E] border border-white/10 rounded-2xl max-w-md w-full p-8 relative shadow-2xl animate-fade-in-up">
            <button onClick={() => setUnavailModal(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-serif text-white mb-1">Mark as Unavailable</h3>
              <p className="text-gray-400 text-sm">{unavailModal.carName} — please tell admin why this car won't be available.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-2">Reason *</label>
                <textarea
                  value={unavailReason}
                  onChange={e => setUnavailReason(e.target.value)}
                  placeholder="e.g. Personal use, Scheduled maintenance, Inspection due..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-500/50 resize-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-2">Duration (days) — optional</label>
                <input
                  type="number"
                  value={unavailDays}
                  onChange={e => setUnavailDays(e.target.value)}
                  placeholder="e.g. 3"
                  min={1}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <p className="text-amber-400 text-xs">⚠️ This car will immediately become unavailable on the fleet. Admin will review your request.</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setUnavailModal(null)} className="flex-1 py-3 border border-white/10 rounded-xl text-gray-400 hover:text-white text-sm transition-all">
                Cancel
              </button>
              <button
                onClick={submitUnavail}
                disabled={unavailSubmitting || !unavailReason.trim()}
                className="flex-1 py-3 bg-red-500 hover:bg-red-400 text-white font-bold text-sm rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {unavailSubmitting ? 'Submitting...' : 'Confirm Unavailable'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
      <div className={`text-lg font-bold ${highlight ? 'text-emerald-400' : 'text-white'}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-0.5">{label}</div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { label: string; cls: string }> = {
    pending: { label: 'In Review', cls: 'bg-yellow-500/90 text-white' },
    under_review: { label: 'Specialist Review', cls: 'bg-orange-500/90 text-white' },
    approved: { label: 'Verified', cls: 'bg-emerald-500/90 text-white' },
    rejected: { label: 'Needs Action', cls: 'bg-red-500/90 text-white' },
    suspended: { label: 'Suspended', cls: 'bg-gray-700/90 text-white' }
  }
  const { label, cls } = cfg[status] || cfg.pending
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 ${cls}`}>
      {label}
    </span>
  )
}
