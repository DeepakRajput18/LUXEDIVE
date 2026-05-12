import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Activity, User, Car, ShoppingBag, Star, Search, LogIn, LogOut, UserPlus, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

interface ActivityLog {
    id: string
    user_id: string | null
    action_type: string
    target_id: string | null
    details: Record<string, unknown>
    device_info: string | null
    created_at: string
    profiles?: { full_name?: string; phone?: string }
}

const ACTION_META: Record<string, { icon: typeof Activity; color: string; label: string }> = {
    user_registered: { icon: UserPlus, color: 'text-green-400', label: 'Registered' },
    user_login: { icon: LogIn, color: 'text-blue-400', label: 'Logged In' },
    user_logout: { icon: LogOut, color: 'text-gray-400', label: 'Logged Out' },
    car_viewed: { icon: Car, color: 'text-yellow-400', label: 'Viewed Car' },
    car_searched: { icon: Search, color: 'text-purple-400', label: 'Searched' },
    car_wishlisted: { icon: Star, color: 'text-pink-400', label: 'Wishlisted' },
    booking_created: { icon: ShoppingBag, color: 'text-orange-400', label: 'Booking Created' },
    payment_completed: { icon: Activity, color: 'text-emerald-400', label: 'Payment Done' },
    review_submitted: { icon: Star, color: 'text-amber-400', label: 'Review Submitted' },
    profile_updated: { icon: User, color: 'text-cyan-400', label: 'Profile Updated' },
}

function timeAgo(date: string) {
    const secs = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (secs < 60) return `${secs}s ago`
    if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
    if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`
    return `${Math.floor(secs / 86400)}d ago`
}

export default function AdminActivityFeed() {
    const [logs, setLogs] = useState<ActivityLog[]>([])
    const [loading, setLoading] = useState(true)
    const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

    const fetchLogs = async () => {
        const { data } = await supabase
            .from('activity_logs')
            .select('*, profiles(full_name, phone)')
            .order('created_at', { ascending: false })
            .limit(50)
        if (data) {
            setLogs(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchLogs()

        // Auto-refresh every 10 seconds
        intervalRef.current = setInterval(fetchLogs, 10_000)
        return () => clearInterval(intervalRef.current)
    }, [])

    // Supabase Realtime subscription
    useEffect(() => {
        const channel = supabase
            .channel('activity_feed')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity_logs' }, (payload) => {
                setLogs(prev => [payload.new as ActivityLog, ...prev.slice(0, 49)])
                toast.info('New activity detected', { duration: 2000 })
            })
            .subscribe()
        return () => { supabase.removeChannel(channel) }
    }, [])

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-semibold text-white">Live Activity Feed</h1>
                    <p className="text-gray-600 text-sm mt-0.5">Real-time user actions · auto-refreshes every 10s</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-green-400">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Live
                    </div>
                    <button onClick={fetchLogs} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg text-gray-400 hover:text-white text-xs transition">
                        <RefreshCw className="w-3.5 h-3.5" /> Refresh
                    </button>
                </div>
            </div>

            {loading ? (
                <p className="text-gray-600 text-sm py-8">Loading activity feed…</p>
            ) : logs.length === 0 ? (
                <div className="text-center py-20 border border-white/5 rounded-xl">
                    <Activity className="w-10 h-10 mx-auto mb-3 text-gray-700" />
                    <p className="text-gray-600 text-sm">No activity recorded yet</p>
                    <p className="text-gray-700 text-xs mt-1">Run the DB migration in Supabase SQL Editor first</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {logs.map(log => {
                        const meta = ACTION_META[log.action_type] ?? { icon: Activity, color: 'text-gray-400', label: log.action_type }
                        const Icon = meta.icon
                        const userName = (log as unknown as { profiles?: { full_name?: string } }).profiles?.full_name ?? log.user_id?.slice(0, 8) ?? 'Guest'
                        const carName = (log.details?.car_name as string) ?? log.target_id?.slice(0, 8) ?? '—'

                        return (
                            <div key={log.id} className="flex items-center gap-4 px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.04] rounded-xl transition-colors group">
                                {/* Icon */}
                                <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 ${meta.color}`}>
                                    <Icon className="w-4 h-4" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-white text-sm font-medium truncate max-w-[120px]">{userName}</span>
                                        <span className={`text-xs font-semibold ${meta.color}`}>{meta.label}</span>
                                        {carName !== '—' && <span className="text-gray-500 text-xs truncate max-w-[160px]">· {carName}</span>}
                                    </div>
                                    <p className="text-gray-700 text-[10px] mt-0.5 truncate">{log.device_info?.split(' | ')[0] ?? '—'}</p>
                                </div>

                                {/* Time */}
                                <span className="text-gray-600 text-xs flex-shrink-0">{timeAgo(log.created_at)}</span>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
