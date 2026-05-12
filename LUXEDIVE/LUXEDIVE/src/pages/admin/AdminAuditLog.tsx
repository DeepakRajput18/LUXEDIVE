import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { FileText, Search } from 'lucide-react'

interface AuditEntry {
    id: string
    user_id: string | null
    action_type: string
    target_id: string | null
    details: Record<string, unknown>
    device_info: string | null
    created_at: string
    profiles?: { full_name?: string }
}

const ACTION_TYPES = ['all', 'user_registered', 'user_login', 'user_logout', 'car_viewed', 'car_searched', 'booking_created', 'payment_completed', 'review_submitted', 'profile_updated']

export default function AdminAuditLog() {
    const [logs, setLogs] = useState<AuditEntry[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [actionFilter, setActionFilter] = useState('all')
    const [page, setPage] = useState(0)
    const PAGE_SIZE = 20

    useEffect(() => {
        setPage(0)
        const load = async () => {
            setLoading(true)
            let query = supabase
                .from('activity_logs')
                .select('*, profiles(full_name)')
                .order('created_at', { ascending: false })
                .range(0, PAGE_SIZE - 1)

            if (actionFilter !== 'all') query = query.eq('action_type', actionFilter)

            const { data } = await query
            setLogs(data ?? [])
            setLoading(false)
        }
        load()
    }, [actionFilter])

    const loadMore = async () => {
        const next = page + 1
        let query = supabase
            .from('activity_logs')
            .select('*, profiles(full_name)')
            .order('created_at', { ascending: false })
            .range(next * PAGE_SIZE, next * PAGE_SIZE + PAGE_SIZE - 1)

        if (actionFilter !== 'all') query = query.eq('action_type', actionFilter)

        const { data } = await query
        setLogs(prev => [...prev, ...(data ?? [])])
        setPage(next)
    }

    const filtered = logs.filter(l => {
        const q = search.toLowerCase()
        return !q ||
            (l.profiles?.full_name?.toLowerCase().includes(q) ||
                l.action_type.includes(q) ||
                (l.user_id?.includes(q) ?? false) ||
                (l.target_id?.includes(q) ?? false))
    })

    const fmt = (d: string) => new Date(d).toLocaleString('en-IN', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    })

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-white">Audit Log</h1>
                <p className="text-gray-600 text-sm mt-0.5">Complete immutable record of all user actions</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search by user, action, or ID…"
                        className="w-full pl-9 pr-4 py-2.5 bg-white/3 border border-white/8 rounded-xl text-white text-sm placeholder-gray-700 focus:outline-none focus:border-luxe-gold/30" />
                </div>
                <select value={actionFilter} onChange={e => setActionFilter(e.target.value)}
                    className="bg-white/3 border border-white/8 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-luxe-gold/30">
                    {ACTION_TYPES.map(a => (
                        <option key={a} value={a} className="bg-gray-900 capitalize">{a === 'all' ? 'All Actions' : a.replace(/_/g, ' ')}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <p className="text-gray-600 text-sm py-8">Loading audit log…</p>
            ) : (
                <>
                    <div className="bg-white/[0.03] border border-white/8 rounded-xl overflow-x-auto">
                        <table className="w-full text-sm min-w-[700px]">
                            <thead>
                                <tr className="border-b border-white/5">
                                    {['Time', 'User', 'Action', 'Target', 'Device'].map(h => (
                                        <th key={h} className="text-left px-4 py-3 text-gray-600 text-xs uppercase tracking-wider font-medium">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.04]">
                                {filtered.map(l => (
                                    <tr key={l.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-4 py-3 text-gray-600 text-xs">{fmt(l.created_at)}</td>
                                        <td className="px-4 py-3 text-white text-sm">{l.profiles?.full_name ?? l.user_id?.slice(0, 8) ?? 'Guest'}</td>
                                        <td className="px-4 py-3">
                                            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-white/5 text-luxe-gold capitalize">
                                                {l.action_type.replace(/_/g, ' ')}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 text-xs font-mono">{l.target_id?.slice(0, 10) ?? '—'}</td>
                                        <td className="px-4 py-3 text-gray-700 text-xs max-w-[160px] truncate">{l.device_info?.split(' | ')[0] ?? '—'}</td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr><td colSpan={5} className="text-center py-12">
                                        <FileText className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                                        <p className="text-gray-700 text-sm">No audit entries</p>
                                        <p className="text-gray-800 text-xs mt-1">Run the DB migration then use the app to generate activity</p>
                                    </td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {filtered.length >= PAGE_SIZE && (
                        <button onClick={loadMore}
                            className="mt-4 w-full py-2.5 border border-white/8 rounded-xl text-gray-400 hover:text-white text-sm transition-colors hover:bg-white/5">
                            Load more
                        </button>
                    )}
                </>
            )}
        </div>
    )
}
