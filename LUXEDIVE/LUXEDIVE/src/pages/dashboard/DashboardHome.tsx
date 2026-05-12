import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../contexts/AuthContext'
import { Car, Calendar, Wallet, Heart, TrendingUp, Clock, AlertCircle } from 'lucide-react'
import { Skeleton } from '../../components/ui/Skeleton'
import { Button } from '../../components/ui/Button'

interface DashboardStats {
  totalBookings: number
  activeBookings: number
  upcomingBookings: number
  cancelledBookings: number
  totalSpent: number
  pendingPayments: number
  totalRefunded: number
  favoritesCars: number
  loyaltyPoints: number
  bookingsThisMonth: number
  spentThisMonth: number
  lastBookingDate: string | null
  lastPaymentDate: string | null
}

interface RecentBooking {
  id: string
  carBrand: string
  carModel: string
  carImage: string
  startDate: string
  endDate: string
  totalAmount: number
  status: string
  bookingCode: string
  createdAt: string
}

interface UpcomingTrip {
  id: string
  carBrand: string
  carModel: string
  carImage: string
  startDate: string
  endDate: string
  pickupLocation: string
  status: string
  daysUntil: number
}

interface DashboardData {
  stats: DashboardStats
  recentBookings: RecentBooking[]
  upcomingTrips: UpcomingTrip[]
  quickActions: Array<{ action: string; count: number }>
}

export default function DashboardHome() {
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadDashboardData()
    
    // Refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000)
    
    return () => clearInterval(interval)
  }, [user])

  const loadDashboardData = async () => {
    if (!user) return
    
    try {
      if (!dashboardData) setLoading(true)
      
      const { data, error } = await supabase
        .rpc('get_user_dashboard_data', {
          p_user_id: user.id
        })

      if (error) throw error

      setDashboardData(data)
    } catch (err: any) {
      console.error('Dashboard load error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading && !dashboardData) {
    return <DashboardSkeleton />
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-serif text-white mb-2">Something went wrong</h2>
        <p className="text-gray-400 mb-6">{error}</p>
        <Button onClick={loadDashboardData} variant="primary">Retry</Button>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <Car className="w-12 h-12 text-gray-600 mb-4" />
        <h2 className="text-2xl font-serif text-white mb-2">No data yet</h2>
        <p className="text-gray-400 mb-6">Start your first luxury experience today.</p>
        <Button onClick={() => window.location.href = '/fleet'} variant="primary">Explore Fleet</Button>
      </div>
    )
  }

  const { stats, recentBookings, upcomingTrips } = dashboardData

  return (
    <div className="p-0 space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif text-white">Welcome back.</h1>
          <p className="text-gray-400 mt-2 font-light">Here's your rental overview for this month.</p>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
          <Clock className="w-3 h-3 text-luxe-gold" />
          Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Car className="w-5 h-5" />}
          label="Total Bookings"
          value={stats.totalBookings}
          change={`${stats.bookingsThisMonth} this month`}
          color="blue"
        />
        
        <StatCard
          icon={<Calendar className="w-5 h-5" />}
          label="Upcoming Trips"
          value={stats.upcomingBookings}
          change={`${stats.activeBookings} active now`}
          color="gold"
        />
        
        <StatCard
          icon={<Wallet className="w-5 h-5" />}
          label="Total Spent"
          value={`₹${(stats.totalSpent / 1000).toFixed(1)}K`}
          change={`₹${(stats.spentThisMonth / 1000).toFixed(1)}K this month`}
          color="green"
        />
        
        <StatCard
          icon={<Heart className="w-5 h-5" />}
          label="Favorite Cars"
          value={stats.favoritesCars}
          change={`${stats.loyaltyPoints} points earned`}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Trips */}
          {upcomingTrips && upcomingTrips.length > 0 ? (
            <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-xl font-serif text-white">Upcoming Trips</h2>
                <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest text-luxe-gold">View Calendar</Button>
              </div>
              
              <div className="divide-y divide-white/5">
                {upcomingTrips.map(trip => (
                  <div key={trip.id} className="p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-white/[0.02] transition-colors group">
                    <div className="w-full md:w-40 aspect-[16/10] rounded-xl overflow-hidden bg-zinc-900 border border-white/5">
                      <img
                        src={trip.carImage}
                        alt={`${trip.carBrand} ${trip.carModel}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-luxe-gold uppercase tracking-widest">{trip.status}</span>
                      </div>
                      <h3 className="text-xl font-serif text-white group-hover:text-luxe-gold transition-colors">{trip.carBrand} {trip.carModel}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-xs text-gray-500 flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1.5"><TrendingUp className="w-3 h-3" /> {trip.pickupLocation}</p>
                      </div>
                    </div>
                    
                    <div className="text-right flex flex-col items-end">
                      <div className="text-2xl font-serif text-white">{trip.daysUntil < 0 ? 'Today' : `T-minus ${trip.daysUntil}d`}</div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">To Pickup</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
             <div className="bg-[#121212] border border-white/5 rounded-2xl p-12 text-center">
               <Calendar className="w-10 h-10 text-gray-700 mx-auto mb-4" />
               <p className="text-gray-500 font-light italic">No upcoming trips. Your next adventure awaits.</p>
               <Button onClick={() => window.location.href = '/fleet'} variant="ghost" className="mt-4 text-luxe-gold uppercase tracking-widest text-[10px] font-bold border border-white/10 px-8">Book a Car</Button>
             </div>
          )}

          {/* Recent Bookings */}
          {recentBookings && recentBookings.length > 0 && (
            <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-xl font-serif text-white">Recent Activity</h2>
                <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest text-luxe-gold">History</Button>
              </div>
              
              <div className="divide-y divide-white/5">
                {recentBookings.map(booking => (
                  <div key={booking.id} className="p-4 flex items-center justify-between hover:bg-white/[0.01] transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 bg-zinc-900 rounded-lg overflow-hidden border border-white/5 shrink-0">
                        <img src={booking.carImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-luxe-gold transition-colors">{booking.carBrand} {booking.carModel}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-0.5">{booking.bookingCode}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-bold text-white mb-1">₹{booking.totalAmount.toLocaleString()}</div>
                      <StatusBadge status={booking.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
           {/* Loyalty Card */}
           <div className="bg-gradient-to-br from-[#1A1A1A] to-black border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-luxe-gold/5 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10">
                  <h3 className="font-serif text-white text-xl mb-1">Membership Status</h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-6">Platinum Executive</p>

                  <div className="mb-2 flex justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-luxe-gold">Current Points: {stats.loyaltyPoints}</span>
                      <span className="text-gray-600">Next Tier: 5,000</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-6">
                      <div 
                        className="h-full bg-luxe-gold shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all duration-1000 ease-out" 
                        style={{ width: `${Math.min((stats.loyaltyPoints / 5000) * 100, 100)}%` }} 
                      />
                  </div>
                  <p className="text-[10px] text-gray-500 italic leading-relaxed">"You are in the top 2% of our elite drivers this year."</p>
              </div>
          </div>

          <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
            <h3 className="font-serif text-white text-lg mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <QuickActionButton icon={<Car className="w-4 h-4" />} label="New Trip" onClick={() => window.location.href = '/fleet'} />
              <QuickActionButton icon={<Heart className="w-4 h-4" />} label="Favorites" onClick={() => window.location.href = '/dashboard/favorites'} />
              <QuickActionButton icon={<Wallet className="w-4 h-4" />} label="Payments" onClick={() => window.location.href = '/dashboard/payments'} />
              <QuickActionButton icon={<Clock className="w-4 h-4" />} label="History" onClick={() => window.location.href = '/dashboard/bookings'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, change, color }: any) {
  const colorClasses = {
    blue: 'text-blue-500',
    green: 'text-emerald-500',
    gold: 'text-luxe-gold',
    red: 'text-rose-500'
  }

  return (
    <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 group hover:border-white/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden relative">
      <div className={`absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity scale-[2] pointer-events-none ${colorClasses[color]}`}>
        {icon}
      </div>
      <div className={`w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center mb-4 border border-white/[0.05] group-hover:border-white/10 transition-all ${colorClasses[color]}`}>
        {icon}
      </div>
      <div className="text-3xl font-serif text-white mb-1 group-hover:text-luxe-gold transition-colors">{value}</div>
      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{label}</div>
      <div className="text-[9px] text-gray-600 mt-3 font-medium uppercase tracking-widest">{change}</div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    completed: { label: 'Completed', class: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
    active: { label: 'Active', class: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    confirmed: { label: 'Confirmed', class: 'bg-luxe-gold/10 text-luxe-gold border-luxe-gold/20' },
    upcoming: { label: 'Upcoming', class: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
    cancelled: { label: 'Cancelled', class: 'bg-rose-500/10 text-rose-500 border-rose-500/20' },
    pending: { label: 'Pending', class: 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20' }
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending

  return (
    <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-widest ${config.class}`}>
      {config.label}
    </span>
  )
}

function QuickActionButton({ icon, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-luxe-gold hover:text-black transition-all group"
    >
      <div className="text-gray-400 group-hover:text-black transition-colors">{icon}</div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-black">{label}</span>
    </button>
  )
}

function DashboardSkeleton() {
  return (
    <div className="p-0 space-y-8 animate-pulse">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64 bg-white/5" />
          <Skeleton className="h-4 w-48 bg-white/5" />
        </div>
        <Skeleton className="h-10 w-32 bg-white/5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-32 bg-[#121212] border border-white/5 rounded-2xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Skeleton className="h-64 bg-[#121212] border border-white/5 rounded-2xl" />
          <Skeleton className="h-48 bg-[#121212] border border-white/5 rounded-2xl" />
        </div>
        <div className="space-y-8">
          <Skeleton className="h-48 bg-white/5 rounded-2xl" />
          <Skeleton className="h-64 bg-white/5 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
