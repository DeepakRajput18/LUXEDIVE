import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { Users, Search, Ban, Trash2, Eye } from 'lucide-react'
import { toast } from 'sonner'

interface UserProfile {
    id: string
    full_name?: string
    phone?: string
    email?: string
    is_blocked?: boolean
    created_at: string
    booking_count?: number
}

export default function AdminUsers() {
    const navigate = useNavigate()
    const [users, setUsers] = useState<UserProfile[]>([])
    const [filtered, setFiltered] = useState<UserProfile[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState<UserProfile | null>(null)

    const fetch = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase.rpc('admin_get_all_customers')
            if (error) throw error
            
            const results = data || []
            setUsers(results)
            setFiltered(results)
        } catch (err) {
            console.error('Fetch users failed:', err)
            toast.error('Failed to load members')
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => { fetch() }, [])

    useEffect(() => {
        const q = search.toLowerCase()
        setFiltered(users.filter(u =>
            u.full_name?.toLowerCase().includes(q) ||
            u.phone?.includes(q) ||
            u.email?.toLowerCase().includes(q)
        ))
    }, [search, users])

    const toggleBlock = async (id: string, blocked: boolean) => {
        const { error } = await supabase.rpc('admin_toggle_user_block', {
            p_user_id: id,
            p_blocked: !blocked
        })
        if (error) { toast.error('Action failed'); return }
        setUsers(u => u.map(x => x.id === id ? { ...x, is_blocked: !blocked } : x))
        toast.success(blocked ? 'User unblocked' : 'User blocked')
    }

    const deleteUser = async (id: string) => {
        if (!confirm('Permanently delete this user? This cannot be undone.')) return
        const { error } = await supabase.rpc('admin_delete_user', {
            p_user_id: id
        })
        if (error) { toast.error('Delete failed: ' + error.message); return }
        setUsers(u => u.filter(x => x.id !== id))
        toast.success('User deleted')
    }

    const viewDossier = (id: string) => {
        navigate(`/admin/customers/${id}`)
    }

    const fmt = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-white">User Management</h1>
                <p className="text-gray-600 text-sm mt-0.5">{users.length} registered members</p>
            </div>

            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name, phone, or email…"
                    className="w-full pl-9 pr-4 py-2.5 bg-white/3 border border-white/8 rounded-xl text-white text-sm placeholder-gray-700 focus:outline-none focus:border-luxe-gold/30"
                />
            </div>

            {loading ? (
                <p className="text-gray-600 text-sm py-8">Loading users…</p>
            ) : (
                <div className="bg-white/3 border border-white/8 rounded-xl overflow-x-auto">
                    <table className="w-full text-sm min-w-[640px]">
                        <thead>
                            <tr className="border-b border-white/5">
                                {['Member', 'Phone', 'Bookings', 'Joined', 'Status', 'Actions'].map(h => (
                                    <th key={h} className="text-left px-4 py-3 text-gray-600 text-xs uppercase tracking-wider font-medium">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {filtered.map(u => (
                                <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-luxe-gold/10 border border-luxe-gold/20 flex items-center justify-center text-luxe-gold text-xs font-bold flex-shrink-0">
                                                {(u.full_name ?? u.phone ?? 'U')[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-white text-sm font-medium">{u.full_name ?? '—'}</p>
                                                <p className="text-gray-700 text-xs">{u.id.slice(0, 8)}&hellip;</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-400 text-xs">{u.phone ?? '—'}</td>
                                    <td className="px-4 py-3">
                                        <span className="text-white font-semibold">{u.booking_count}</span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 text-xs">{fmt(u.created_at)}</td>
                                    <td className="px-4 py-3">
                                        {u.is_blocked
                                            ? <span className="text-[10px] font-bold px-2 py-1 rounded-full border text-red-400 border-red-400/30">Blocked</span>
                                            : <span className="text-[10px] font-bold px-2 py-1 rounded-full border text-green-400 border-green-400/30">Active</span>
                                        }
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => viewDossier(u.id)} title="View User Dossier"
                                                className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-luxe-gold/10 text-gray-500 hover:text-luxe-gold transition group">
                                                <Eye className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:inline">Dossier</span>
                                            </button>
                                            <button onClick={() => toggleBlock(u.id, !!u.is_blocked)} title={u.is_blocked ? 'Unblock' : 'Block'}
                                                className={`p-1.5 rounded-lg transition ${u.is_blocked ? 'hover:bg-green-900/20 text-gray-500 hover:text-green-400' : 'hover:bg-orange-900/20 text-gray-500 hover:text-orange-400'}`}>
                                                <Ban className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={() => deleteUser(u.id)} title="Delete"
                                                className="p-1.5 rounded-lg hover:bg-red-900/20 text-gray-500 hover:text-red-400 transition">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr><td colSpan={6} className="text-center py-12">
                                    <Users className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                                    <p className="text-gray-700 text-sm">No users found</p>
                                </td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    )
}
