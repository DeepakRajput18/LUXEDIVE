import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { 
    Car, Users, Calendar, TrendingUp, AlertTriangle, 
    ArrowUpRight, RefreshCw, Clock, Wallet, CheckCircle2, Shield
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface Stats {
    fleet: { total: number; available: number; maintenance: number }
    members: { total: number; new_30d: number }
    bookings: { total: number; pending: number; active: number }
    revenue: { total: number; this_month: number }
    alerts: { pending_approvals: number; pending_refunds: number; chauffeur_apps: number }
}

interface RecentBooking {
    id: string
    status: string
    total_price: number
    pickup_datetime: string
    car_name: string
    client_name: string
    created_at: string
}

const STATUS_COLORS: Record<string, string> = {
    pending_payment: 'text-amber-400 bg-amber-400/10',
    pending_approval: 'text-blue-400 bg-blue-400/10',
    confirmed: 'text-emerald-400 bg-emerald-400/10',
    completed: 'text-gray-400 bg-gray-400/10',
    cancelled: 'text-rose-400 bg-rose-400/10',
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([])
    const [loading, setLoading] = useState(true)
    const [lastRefresh, setLastRefresh] = useState(new Date())
    const [refreshing, setRefreshing] = useState(false)

    const loadData = async () => {
        setRefreshing(true)
        try {
            const { data: statsData, error: statsErr } = await supabase.rpc('get_admin_dashboard_stats')
            const { data: recentData, error: recentErr } = await supabase.rpc('get_admin_recent_bookings')

            if (statsErr) {
                console.warn('Dashboard stats RPC error:', statsErr)
            }
            if (recentErr) {
                console.warn('Recent bookings RPC error:', recentErr)
            }

            // High-density null-safety fallbacks
            setStats(statsData || {
                fleet: { total: 0, available: 0, maintenance: 0 },
                members: { total: 0, new_30d: 0 },
                bookings: { total: 0, pending: 0, active: 0 },
                revenue: { total: 0, this_month: 0 },
                alerts: { pending_approvals: 0, pending_refunds: 0, chauffeur_apps: 0 }
            })
            setRecentBookings(recentData || [])
            setLastRefresh(new Date())
        } catch (err) {
            console.error('Dashboard load failed:', err)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        loadData()
        const interval = setInterval(loadData, 30000) // Auto refresh every 30s
        return () => clearInterval(interval)
    }, [])

    const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
    const fmtCurrency = (n: number) => `₹${n.toLocaleString('en-IN')}`

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500 gap-4">
                <div className="w-12 h-12 border-2 border-luxe-gold/20 border-t-luxe-gold rounded-full animate-spin" />
                <p className="text-sm font-medium animate-pulse">Synchronizing fleet intelligence...</p>
            </div>
        )
    }

    const kpis = stats ? [
        { label: 'Total Fleet', value: stats.fleet.total, sub: `${stats.fleet.available} Available · ${stats.fleet.maintenance} Maintenance`, icon: Car, link: '/admin/fleet', color: 'text-emerald-400', theme: 'emerald' },
        { label: 'Platform Members', value: stats.members.total, sub: `+${stats.members.new_30d} new this month`, icon: Users, link: '/admin/customers', color: 'text-blue-400', theme: 'blue' },
        { label: 'Total Revenue', value: stats.revenue.total >= 100000 ? `₹${(stats.revenue.total / 100000).toFixed(2)}L` : fmtCurrency(stats.revenue.total), sub: `${fmtCurrency(stats.revenue.this_month)} this month`, icon: Wallet, link: '/admin/reports', color: 'text-luxe-gold', theme: 'gold' },
        { label: 'Live Bookings', value: stats.bookings.total, sub: `${stats.bookings.active} Active · ${stats.bookings.pending} Pending`, icon: Calendar, link: '/admin/bookings', color: 'text-purple-400', theme: 'purple' },
    ] : []

    const alerts = stats ? [
        { count: stats.alerts.pending_approvals, label: 'Vehicle Approvals', link: '/admin/fleet/approvals', icon: CheckCircle2 },
        { count: stats.alerts.pending_refunds, label: 'Refund Requests', link: '/admin/payments', icon: Clock },
        { count: stats.alerts.chauffeur_apps, label: 'Chauffeur Verifications', link: '/admin/chauffeurs', icon: Shield },
    ].filter(a => a.count > 0) : []

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-white">Dashboard Overview</h1>
                    <p className="text-gray-500 text-sm mt-1">Strategic oversight of LUXEDIVE operations</p>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Auto-refresh active</span>
                    <RefreshCw className={`w-3 h-3 text-luxe-gold ${refreshing ? 'animate-spin' : ''}`} />
                    <div className="w-[1px] h-3 bg-white/10" />
                    <span className="text-[10px] text-gray-400">Last update: {lastRefresh.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            {/* Critical Alerts */}
            {alerts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {alerts.map(alert => (
                        <Link 
                            key={alert.label} 
                            to={alert.link}
                            className="flex items-center justify-between bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl hover:bg-amber-500/10 transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 group-hover:scale-110 transition-transform">
                                    <alert.icon className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-semibold">{alert.count} Pending</p>
                                    <p className="text-amber-500/70 text-[10px] uppercase tracking-wider">{alert.label}</p>
                                </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-amber-500/40 group-hover:text-amber-500 transition-colors" />
                        </Link>
                    ))}
                </div>
            )}

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map(k => {
                    const Icon = k.icon
                    return (
                        <Link key={k.label} to={k.link}
                            className="relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all group shadow-2xl shadow-black/40">
                            {/* Accent Background */}
                            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-[60px] opacity-10 ${k.color.replace('text-', 'bg-')}`} />
                            
                            <div className="flex items-center justify-between mb-6">
                                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${k.color} shadow-lg border border-white/5 group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <ArrowUpRight className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
                            </div>
                            
                            <div className="space-y-1">
                                <div className="text-3xl font-bold text-white tracking-tight">{k.value}</div>
                                <div className="text-xs font-medium text-gray-400 uppercase tracking-widest">{k.label}</div>
                                <div className="pt-3 flex items-center gap-2">
                                    <TrendingUp className={`w-3 h-3 ${k.color}`} />
                                    <span className="text-[10px] text-gray-600 font-medium">{k.sub}</span>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Bookings Table */}
                <div className="lg:col-span-2 bg-[#0B0D10]/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
                    <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent">
                        <div>
                            <h3 className="text-white text-base font-medium">Recent Activity</h3>
                            <p className="text-[10px] text-gray-500 mt-0.5">Latest verified rental transactions</p>
                        </div>
                        <Link to="/admin/bookings" className="px-3 py-1.5 rounded-lg bg-white/5 text-luxe-gold text-xs font-semibold hover:bg-white/10 transition-colors border border-white/5">View Ledger</Link>
                    </div>
                    
                    <div className="overflow-x-auto">
                        {recentBookings.length === 0 ? (
                            <div className="py-24 text-center">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                                    <Calendar className="w-8 h-8 text-gray-700" />
                                </div>
                                <p className="text-gray-600 text-sm font-medium italic">No recent transactions recorded</p>
                            </div>
                        ) : (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/[0.04]">
                                        {['Vehicle', 'Client', 'Timeline', 'Revenue', 'Status'].map(h => (
                                            <th key={h} className="text-left px-6 py-4 text-gray-500 text-[10px] uppercase tracking-widest font-bold">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.04]">
                                    {recentBookings.map(b => (
                                        <tr key={b.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="text-white font-semibold flex items-center gap-2">
                                                    {b.car_name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 font-medium">{b.client_name}</td>
                                            <td className="px-6 py-4">
                                                <div className="text-gray-500 text-xs flex flex-col gap-1">
                                                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-gray-700" /> {fmtDate(b.pickup_datetime)}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-white font-serif tracking-wide">{fmtCurrency(b.total_price)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm ${STATUS_COLORS[b.status] ?? 'text-gray-400 bg-gray-400/10'}`}>
                                                    {b.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Performance Snapshot */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Fleet Health</h4>
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-[11px] text-gray-400 mb-1.5 font-medium">
                                    <span>Availability Rate</span>
                                    <span className="text-white">{stats ? Math.round((stats.fleet.available / stats.fleet.total) * 100) : 0}%</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                                        style={{ width: stats ? `${(stats.fleet.available / stats.fleet.total) * 100}%` : '0%' }}
                                    />
                                </div>
                            </div>
                            <div className="pt-2 flex items-center justify-between bg-white/5 rounded-lg px-4 py-3">
                                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Maintenance Dept.</span>
                                <span className={stats?.fleet.maintenance ? 'text-amber-400' : 'text-gray-600'}>
                                    {stats?.fleet.maintenance || 0} Alert{stats?.fleet.maintenance !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0B0D10]/50 border border-white/10 rounded-2xl p-6 shadow-xl">
                        <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Quick Actions</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Add Car', link: '/admin/fleet/add', color: 'bg-luxe-gold/10' },
                                { label: 'Review AI', link: '/admin/demand', color: 'bg-white/5' },
                                { label: 'Audit Log', link: '/admin/audit', color: 'bg-white/5' },
                                { label: 'Settings', link: '/admin/settings', color: 'bg-white/5' },
                            ].map(btn => (
                                <Link 
                                    key={btn.label} 
                                    to={btn.link}
                                    className={`px-4 py-3 rounded-xl border border-white/5 text-[10px] font-bold text-white text-center hover:bg-white/10 hover:border-white/20 transition-all ${btn.color}`}
                                >
                                    {btn.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
