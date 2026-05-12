import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Mail, Search, CheckCircle, Archive, Trash2, User, Clock, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'

interface Inquiry {
    id: string
    first_name: string
    last_name: string
    email: string
    message: string
    status: 'new' | 'replied' | 'archived'
    created_at: string
}

const STATUS_COLORS: Record<string, string> = {
    new: 'text-yellow-400 border-yellow-400/30',
    replied: 'text-emerald-400 border-emerald-400/30',
    archived: 'text-gray-400 border-gray-400/30',
}

export default function InquiriesManagement() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([])
    const [filtered, setFiltered] = useState<Inquiry[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    const fetchInquiries = async () => {
        setLoading(true)
        const { data, error } = await supabase.rpc('admin_fetch_guest_inquiries')
        
        if (error) {
            console.error('Fetch inquiries error:', error)
            toast.error('Failed to fetch inquiries: ' + error.message)
        } else {
            setInquiries(data || [])
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchInquiries()
    }, [])

    useEffect(() => {
        let data = inquiries
        if (statusFilter !== 'all') {
            data = data.filter(i => i.status === statusFilter)
        }
        if (search) {
            const q = search.toLowerCase()
            data = data.filter(i =>
                i.first_name.toLowerCase().includes(q) ||
                i.last_name.toLowerCase().includes(q) ||
                i.email.toLowerCase().includes(q) ||
                i.message.toLowerCase().includes(q)
            )
        }
        setFiltered(data)
    }, [inquiries, statusFilter, search])

    const updateStatus = async (id: string, status: Inquiry['status']) => {
        const { error } = await supabase.rpc('admin_manage_contact_submission', {
            p_action: 'update',
            p_id: id,
            p_status: status
        })

        if (error) {
            toast.error('Failed to update status')
        } else {
            setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i))
            toast.success(`Inquiry marked as ${status}`)
        }
    }

    const deleteInquiry = async (id: string) => {
        if (!confirm('Are you sure you want to delete this inquiry?')) return

        const { error } = await supabase.rpc('admin_manage_contact_submission', {
            p_action: 'delete',
            p_id: id
        })

        if (error) {
            toast.error('Failed to delete inquiry')
        } else {
            setInquiries(prev => prev.filter(i => i.id !== id))
            toast.success('Inquiry deleted')
        }
    }

    const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-serif text-white mb-2">Guest Inquiries</h1>
                <p className="text-gray-400 text-sm">Manage messages and questions from prospective clients.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by name, email or message..."
                        className="w-full pl-10 pr-4 py-2 bg-luxe-dark/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-luxe-gold/50"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <select
                    className="bg-luxe-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-luxe-gold/50"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Inquiries</option>
                    <option value="new">New</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                </select>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-luxe-gold mb-4"></div>
                    <p>Loading inquiries...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20 bg-luxe-dark/20 border border-white/5 rounded-xl">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                    <p className="text-gray-500">No inquiries found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filtered.map((inquiry) => (
                        <div 
                            key={inquiry.id} 
                            className="bg-luxe-dark/50 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all"
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${STATUS_COLORS[inquiry.status]}`}>
                                            {inquiry.status}
                                        </span>
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {fmtDate(inquiry.created_at)}
                                        </span>
                                    </div>
                                    <h3 className="text-luxe-white font-medium text-lg flex items-center gap-2">
                                        <User className="w-4 h-4 text-luxe-gold" />
                                        {inquiry.first_name} {inquiry.last_name}
                                    </h3>
                                    <p className="text-luxe-gold text-sm mb-3 flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5" />
                                        {inquiry.email}
                                    </p>
                                    <div className="bg-luxe-black/30 rounded-lg p-4 text-gray-300 text-sm italic border-l-2 border-luxe-gold/30">
                                        "{inquiry.message}"
                                    </div>
                                </div>

                                <div className="flex md:flex-col gap-2 justify-end">
                                    {inquiry.status === 'new' && (
                                        <button 
                                            onClick={() => updateStatus(inquiry.id, 'replied')}
                                            className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-lg transition-colors flex items-center gap-2 text-sm px-4"
                                            title="Mark as Replied"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            <span className="md:hidden">Mark Replied</span>
                                        </button>
                                    )}
                                    {inquiry.status !== 'archived' && (
                                        <button 
                                            onClick={() => updateStatus(inquiry.id, 'archived')}
                                            className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-colors flex items-center gap-2 text-sm px-4"
                                            title="Archive"
                                        >
                                            <Archive className="w-4 h-4" />
                                            <span className="md:hidden">Archive</span>
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => deleteInquiry(inquiry.id)}
                                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors flex items-center gap-2 text-sm px-4"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span className="md:hidden">Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
