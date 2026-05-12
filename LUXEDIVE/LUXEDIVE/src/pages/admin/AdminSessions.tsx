import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Monitor, Clock, AlertTriangle, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react'

interface UserSession {
    id: string
    user_id: string
    login_at: string
    logout_at: string | null
    duration_seconds: number | null
    ip_address: string | null
    device_info: string | null
    status: string | null
    profiles?: { full_name?: string; phone?: string }
}

function formatDuration(secs: number | null) {
    if (!secs) return '—'
    if (secs < 60) return `${secs}s`
    if (secs < 3600) return `${Math.floor(secs / 60)}m ${secs % 60}s`
    return `${Math.floor(secs / 3600)}h ${Math.floor((secs % 3600) / 60)}m`
}

const PAGE_SIZE = 20

export default function AdminSessions() {
    const [sessions, setSessions] = useState<UserSession[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [lastRefresh, setLastRefresh] = useState(new Date())
    const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

    const fetchSessions = useCallback(async (currentPage = 0) => {
        const from = currentPage * PAGE_SIZE
        const to = from + PAGE_SIZE - 1

        const { data, count, error } = await supabase
            .from('user_sessions')
            .select('*, profiles(full_name, phone)', { count: 'exact' })
            .order('login_at', { ascending: false })
            .range(from, to)

        if (error) {
            console.warn('[AdminSessions] fetch error:', error.message)
        } else {
            setSessions(data ?? [])
            setTotalCount(count ?? 0)
        }
        setLoading(false)
        setLastRefresh(new Date())
    }, [])

    useEffect(() => {
        fetchSessions(page)

        // Auto-refresh every 10 seconds
        intervalRef.current = setInterval(() => fetchSessions(page), 10_000)
        return () => clearInterval(intervalRef.current)
    }, [fetchSessions, page])

    // Realtime subscription — new sessions appear instantly
    useEffect(() => {
        const channel = supabase
            .channel('admin_sessions_realtime')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'user_sessions'
            }, () => {
                fetchSessions(page)
            })
            .subscribe()
        return () => { supabase.removeChannel(channel) }
    }, [fetchSessions, page])

    const activeSessions = sessions.filter(s => s.status === 'active' || !s.logout_at)
    const totalPages = Math.ceil(totalCount / PAGE_SIZE)

    // Suspicious login detection: same user_id logging in within 5 min
    const suspiciousUsers = new Set<string>()
    const userLoginTimes: Record<string, number[]> = {}
    for (const s of sessions) {
        const t = new Date(s.login_at).getTime()
        userLoginTimes[s.user_id] = [...(userLoginTimes[s.user_id] ?? []), t]
    }
    for (const [uid, times] of Object.entries(userLoginTimes)) {
        times.sort()
        for (let i = 1; i < times.length; i++) {
            if (times[i] - times[i - 1] < 5 * 60 * 1000) suspiciousUsers.add(uid)
        }
    }

    const fmt = (d: string) => new Date(d).toLocaleString('en-IN', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    })

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-semibold text-white">User Sessions</h1>
                    <p className="text-gray-600 text-sm mt-0.5">
                        {activeSessions.length} active · {totalCount} total ·{' '}
                        <span className="text-gray-700">refreshed {Math.floor((Date.now() - lastRefresh.getTime()) / 1000)}s ago</span>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {suspiciousUsers.size > 0 && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-900/20 border border-orange-500/20 rounded-lg text-orange-400 text-xs">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            {suspiciousUsers.size} suspicious
                        </div>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-green-400">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Live
                    </div>
                    <button
                        onClick={() => { setLoading(true); fetchSessions(page) }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg text-gray-400 hover:text-white text-xs transition"
                    >
                        <RefreshCw className="w-3.5 h-3.5" /> Refresh
                    </button>
                </div>
            </div>

            {/* Active sessions strip */}
            {activeSessions.length > 0 && (
                <div className="mb-5 flex flex-wrap gap-2">
                    {activeSessions.map(s => (
                        <div key={s.id} className="flex items-center gap-2 px-3 py-1.5 bg-green-900/20 border border-green-500/20 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-green-300 text-xs font-medium">
                                {s.profiles?.full_name ?? s.user_id.slice(0, 10)} — Active
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {loading ? (
                <div className="flex items-center gap-2 text-gray-600 text-sm py-8">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Loading sessions…
                </div>
            ) : sessions.length === 0 ? (
                <div className="text-center py-16 border border-white/5 rounded-xl">
                    <Monitor className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                    <p className="text-gray-500 text-sm font-medium">No sessions recorded yet</p>
                    <p className="text-gray-700 text-xs mt-1">
                        Make sure you ran the DB migration in Supabase SQL Editor,
                        then log in as a user
                    </p>
                </div>
            ) : (
                <>
                    <div className="bg-white/[0.03] border border-white/8 rounded-xl overflow-x-auto">
                        <table className="w-full text-sm min-w-[640px]">
                            <thead>
                                <tr className="border-b border-white/5">
                                    {['User', 'Login', 'Logout', 'Duration', 'Status', 'Device'].map(h => (
                                        <th key={h} className="text-left px-4 py-3 text-gray-600 text-xs uppercase tracking-wider font-medium">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.04]">
                                {sessions.map(s => {
                                    const isActive = s.status === 'active' || !s.logout_at
                                    const isSuspicious = suspiciousUsers.has(s.user_id)
                                    return (
                                        <tr key={s.id} className={`hover:bg-white/[0.02] transition-colors ${isSuspicious ? 'border-l-2 border-l-orange-500' : ''}`}>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    {isSuspicious && <AlertTriangle className="w-3 h-3 text-orange-400 flex-shrink-0" />}
                                                    <div>
                                                        <p className={`text-sm font-medium ${isSuspicious ? 'text-orange-300' : 'text-white'}`}>
                                                            {s.profiles?.full_name ?? '—'}
                                                        </p>
                                                        <p className="text-gray-700 text-[10px] font-mono">{s.user_id.slice(0, 10)}…</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-400 text-xs">{fmt(s.login_at)}</td>
                                            <td className="px-4 py-3 text-gray-600 text-xs">{s.logout_at ? fmt(s.logout_at) : '—'}</td>
                                            <td className="px-4 py-3 text-gray-400 text-xs">{formatDuration(s.duration_seconds)}</td>
                                            <td className="px-4 py-3">
                                                {isActive
                                                    ? <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-400 w-fit">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                                        Active
                                                    </span>
                                                    : <span className="text-[10px] font-bold text-gray-600">Closed</span>
                                                }
                                            </td>
                                            <td className="px-4 py-3 text-gray-700 text-xs max-w-[160px] truncate">
                                                {s.device_info?.split(' | ')[0] ?? '—'}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-gray-600 text-xs">
                                Page {page + 1} of {totalPages} · {totalCount} sessions total
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    disabled={page === 0}
                                    onClick={() => setPage(p => p - 1)}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg text-gray-400 hover:text-white text-xs disabled:opacity-30 disabled:cursor-not-allowed transition"
                                >
                                    <ChevronLeft className="w-3.5 h-3.5" /> Prev
                                </button>
                                <button
                                    disabled={page >= totalPages - 1}
                                    onClick={() => setPage(p => p + 1)}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg text-gray-400 hover:text-white text-xs disabled:opacity-30 disabled:cursor-not-allowed transition"
                                >
                                    Next <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
