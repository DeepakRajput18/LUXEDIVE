import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { 
    User, 
    Mail, 
    Phone, 
    Calendar, 
    ShieldCheck, 
    Ban, 
    MessageSquare, 
    CreditCard, 
    Car, 
    Heart, 
    ChevronLeft,
    ExternalLink,
    AlertCircle,
    CheckCircle2,
    Clock,
    X,
    Maximize2,
    Database,
    Eye
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/utils'

interface UserDossier {
    profile: {
        id: string
        full_name: string
        email: string
        phone: string
        status: string
        is_blocked: boolean
        created_at: string
        avatar_url?: string
    }
    stats: {
        total_bookings: number
        completed_bookings: number
        pending_bookings: number
        cancelled_bookings: number
        total_spend: number
    }
    bookings: any[]
    payments: any[]
    documents: any[]
    vehicles: any[]
    favorites: any[]
    notes: any[]
}

export default function UserDetails() {
    const { userId } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState<UserDossier | null>(null)
    const [loading, setLoading] = useState(true)
    const [note, setNote] = useState('')
    const [submittingNote, setSubmittingNote] = useState(false)
    const [selectedDoc, setSelectedDoc] = useState<string | null>(null)

    const fetchDossier = useCallback(async () => {
        try {
            const { data: dossier, error } = await supabase.rpc('admin_get_user_complete_details', {
                p_user_id: userId
            })

            if (error) throw error
            setData(dossier)
        } catch (err: any) {
            toast.error('Failed to load user dossier: ' + err.message)
            navigate('/admin/customers')
        } finally {
            setLoading(false)
        }
    }, [userId, navigate])

    useEffect(() => {
        fetchDossier()
    }, [fetchDossier])

    const toggleBlock = async () => {
        if (!data) return
        const newStatus = !data.profile.is_blocked
        const { error } = await supabase
            .from('profiles')
            .update({ is_blocked: newStatus })
            .eq('id', userId)

        if (error) {
            toast.error('Operation failed')
            return
        }

        toast.success(newStatus ? 'User blocked' : 'User restored')
        fetchDossier()
    }

    const addNote = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!note.trim()) return
        setSubmittingNote(true)

        const { data: { user } } = await supabase.auth.getUser()
        
        const { error } = await supabase.from('user_notes').insert({
            user_id: userId,
            admin_id: user?.id,
            content: note.trim()
        })

        if (error) {
            toast.error('Failed to add note')
        } else {
            setNote('')
            fetchDossier()
            toast.success('Internal note added')
        }
        setSubmittingNote(false)
    }

    const verifyDocument = async (docId: string, status: string) => {
        const { error } = await supabase
            .from('user_documents')
            .update({ 
                verification_status: status,
                verified_at: status === 'verified' ? new Date().toISOString() : null
            })
            .eq('id', docId)

        if (error) {
            toast.error('Failed to update document')
        } else {
            toast.success(`Document ${status}`)
            fetchDossier()
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-luxe-black flex flex-col items-center justify-center p-8">
            <div className="w-12 h-12 border-4 border-luxe-gold/20 border-t-luxe-gold rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-medium animate-pulse">Assembling User Intelligence...</p>
        </div>
    )

    if (!data || !data.profile) return (
        <div className="min-h-screen bg-luxe-black flex flex-col items-center justify-center p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-700 mb-4" />
            <h2 className="text-xl font-serif text-white mb-2">Shadow Entry Detected</h2>
            <p className="text-gray-500 max-w-xs">The requested user dossier could not be mapped to the central registry.</p>
            <Button variant="outline" onClick={() => navigate('/admin/customers')} className="mt-8 border-white/10 hover:bg-white/5">Return to Directory</Button>
        </div>
    )

    const formatDate = (date: string) => new Date(date).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric'
    })

    const getStatusStyles = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'completed': case 'verified': case 'active':
                return 'bg-green-500/10 text-green-400 border-green-500/20'
            case 'pending': case 'under_review':
                return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
            case 'cancelled': case 'rejected': case 'blocked':
                return 'bg-red-500/10 text-red-400 border-red-500/20'
            default:
                return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
        }
    }

    return (
        <div className="min-h-screen bg-luxe-black text-white pb-20">
            {/* Header / Breadcrumb */}
            <div className="sticky top-0 z-40 bg-luxe-black/80 backdrop-blur-md border-b border-white/5 px-8 h-20 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate('/admin/customers')} className="p-2 hover:bg-white/5 rounded-full text-gray-400 transition">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-luxe-gold/20 to-luxe-gold/10 border border-luxe-gold/30 flex items-center justify-center text-luxe-gold text-xl font-bold font-serif shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                            {data.profile.full_name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-semibold tracking-tight">{data.profile.full_name || 'Anonymous User'}</h1>
                                <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border", getStatusStyles(data.profile.is_blocked ? 'blocked' : 'active'))}>
                                    {data.profile.is_blocked ? 'Blocked' : 'Verified Member'}
                                </span>
                            </div>
                            <p className="text-gray-500 text-xs font-mono">ID: {data.profile.id}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5 tracking-lighter">Total Procurement</p>
                        <p className="text-lg font-bold text-luxe-gold">₹{data.stats?.total_spend?.toLocaleString() ?? '0'}</p>
                    </div>
                    <Button 
                        variant="outline" 
                        onClick={toggleBlock}
                        className={cn("border-red-500/30 text-red-400 hover:bg-red-500/10", data.profile.is_blocked && "border-green-500/30 text-green-400 hover:bg-green-500/10")}
                    >
                        {data.profile.is_blocked ? <ShieldCheck className="w-4 h-4 mr-2" /> : <Ban className="w-4 h-4 mr-2" />}
                        {data.profile.is_blocked ? 'Unblock User' : 'Block User'}
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-8 mt-10 grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
                
                {/* Side 1: Core Stats & Meta */}
                <div className="lg:col-span-3 space-y-10">
                    
                    {/* Performance Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Bookings', value: data.stats?.total_bookings ?? 0, icon: Calendar, color: 'text-blue-400' },
                            { label: 'Completed', value: data.stats?.completed_bookings ?? 0, icon: CheckCircle2, color: 'text-green-400' },
                            { label: 'Cancelled', value: data.stats?.cancelled_bookings ?? 0, icon: X, color: 'text-red-400' },
                            { label: 'Pending', value: data.stats?.pending_bookings ?? 0, icon: Clock, color: 'text-amber-400' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl group hover:border-luxe-gold/20 transition-all">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={cn("p-2 rounded-xl bg-white/[0.05]", stat.color)}>
                                        <stat.icon className="w-5 h-5" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-white mb-0.5">{stat.value}</p>
                                <p className="text-xs text-gray-600 font-medium uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Booking History */}
                    <div className="bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                            <div className="flex items-center gap-3">
                                <Database className="w-5 h-5 text-luxe-gold" />
                                <h3 className="text-lg font-semibold">Booking Intelligence</h3>
                            </div>
                            <span className="text-xs text-gray-500 font-mono">{data?.bookings?.length || 0} Records found</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-black/20 text-gray-500 text-xs font-bold uppercase tracking-widest">
                                        <th className="px-6 py-4 text-left">Booking Car</th>
                                        <th className="px-6 py-4 text-left">Dates</th>
                                        <th className="px-6 py-4 text-left">Total</th>
                                        <th className="px-6 py-4 text-left">Status</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {data?.bookings?.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-semibold text-white group-hover:text-luxe-gold transition-colors">{booking.brand} {booking.model}</p>
                                                    <p className="text-[10px] font-mono text-gray-600 mt-1 uppercase">{booking.registration_number || 'REG: N/A'}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-gray-400">{formatDate(booking.start_date)}</span>
                                                    <span className="text-gray-600">to {formatDate(booking.end_date)}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-white">₹{booking.total_amount?.toLocaleString() ?? '0'}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border", getStatusStyles(booking.status))}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link to={`/admin/bookings/${booking.id}`} className="inline-flex items-center gap-2 text-luxe-gold hover:text-white transition-colors text-xs font-bold uppercase tracking-wider group">
                                                    Dossier <Eye className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {data?.bookings?.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-20 text-center">
                                                <Database className="w-10 h-10 text-gray-800 mx-auto mb-3" />
                                                <p className="text-gray-600 text-sm italic font-serif">No booking activity recorded for this member yet.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Document Vault */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 px-2">
                            <ShieldCheck className="w-5 h-5 text-luxe-gold" />
                            <h3 className="text-lg font-semibold">Identity Vault & Verification</h3>
                        </div>
                        
                        {data.documents?.files?.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data.documents.files.filter((f: any) => f.url).map((file: any, index: number) => (
                                    <div key={index} className="bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/10 transition-all">
                                        <div className="aspect-[4/3] bg-black relative group/img cursor-zoom-in" onClick={() => setSelectedDoc(file.url)}>
                                            <img src={file.url} alt={file.type} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
                                                    <Maximize2 className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                            <div className="absolute top-4 right-4">
                                                <span className={cn("px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border backdrop-blur-md shadow-2xl", getStatusStyles(data.documents.verification_status))}>
                                                    {data.documents.verification_status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">{file.type || file.name}</p>
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => verifyDocument(data.documents.id, 'verified')}
                                                    disabled={data.documents.verification_status === 'verified'}
                                                    className="flex-1 px-3 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-xl text-xs font-bold transition disabled:opacity-30 disabled:cursor-not-allowed uppercase"
                                                >
                                                    Approve Set
                                                </button>
                                                <button 
                                                    onClick={() => verifyDocument(data.documents.id, 'rejected')}
                                                    disabled={data.documents.verification_status === 'rejected'}
                                                    className="flex-1 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold transition disabled:opacity-30 disabled:cursor-not-allowed uppercase"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white/[0.02] border border-white/5 border-dashed rounded-3xl p-12 text-center">
                                <AlertCircle className="w-10 h-10 text-gray-800 mx-auto mb-3" />
                                <p className="text-gray-600 font-medium">No encrypted identity files located in the vault.</p>
                                <p className="text-[10px] text-gray-700 font-bold uppercase mt-2 tracking-widest">Awaiting Customer Upload</p>
                            </div>
                        )}
                    </div>

                    {/* Payments History */}
                    <div className="bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                            <div className="flex items-center gap-3">
                                <CreditCard className="w-5 h-5 text-luxe-gold" />
                                <h3 className="text-lg font-semibold">Payment Integrity History</h3>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-black/20 text-gray-500 text-xs font-bold uppercase tracking-widest">
                                        <th className="px-6 py-4 text-left">Transaction ID</th>
                                        <th className="px-6 py-4 text-left">Method</th>
                                        <th className="px-6 py-4 text-left">Amount</th>
                                        <th className="px-6 py-4 text-left">Date</th>
                                        <th className="px-6 py-4 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {data?.payments?.map((p) => (
                                        <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-mono text-[10px] text-gray-400">{p.id}</p>
                                                <p className="text-[9px] text-gray-600 mt-0.5">BK: {p.booking_id.slice(0, 8)}...</p>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-bold text-gray-300 uppercase underline decoration-luxe-gold/20 underline-offset-4">
                                                {p.payment_method?.replace(/_/g, ' ') || 'Manual'}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-white">₹{p.amount?.toLocaleString() ?? '0'}</td>
                                            <td className="px-6 py-4 text-xs text-gray-500">{formatDate(p.created_at)}</td>
                                            <td className="px-6 py-4">
                                                <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border", getStatusStyles(p.status))}>
                                                    {p.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {data?.payments?.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-gray-600 italic">No historical transactions found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Lower Grid: Vehicles & Favorites */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* User Vehicles */}
                        <div className="bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                            <div className="p-5 border-b border-white/5 bg-white/[0.01] flex items-center gap-3">
                                <Car className="w-5 h-5 text-luxe-gold" />
                                <h3 className="text-sm font-bold uppercase tracking-widest">Registered Assets</h3>
                            </div>
                            <div className="p-5 space-y-4">
                                {data?.vehicles?.map((v) => (
                                    <div key={v.id} className="flex items-center justify-between p-4 bg-black/30 border border-white/5 rounded-2xl group hover:border-luxe-gold/20 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-luxe-gold/10 border border-luxe-gold/20 flex items-center justify-center text-luxe-gold">
                                                <Car className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">{v.brand} {v.model}</p>
                                                <p className="text-[10px] font-mono text-gray-600 mt-0.5 uppercase tracking-tighter">{v.registration_number}</p>
                                            </div>
                                        </div>
                                        <span className={cn("px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter border", getStatusStyles(v.status))}>
                                            {v.status}
                                        </span>
                                    </div>
                                ))}
                                {data?.vehicles?.length === 0 && (
                                    <div className="py-10 text-center">
                                        <Car className="w-6 h-6 text-gray-800 mx-auto mb-2" />
                                        <p className="text-xs text-gray-600 font-medium">No luxury assets listed by this member.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Favorites */}
                        <div className="bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                            <div className="p-5 border-b border-white/5 bg-white/[0.01] flex items-center gap-3">
                                <Heart className="w-5 h-5 text-luxe-gold" />
                                <h3 className="text-sm font-bold uppercase tracking-widest">Member Wishlist</h3>
                            </div>
                            <div className="p-5">
                                <div className="flex flex-wrap gap-2">
                                    {data?.favorites?.map((f, i) => (
                                        <Link 
                                            key={i} 
                                            to={`/admin/fleet`} // Redirecting to fleet as specific car URL is complex
                                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-gray-300 hover:text-luxe-gold hover:border-luxe-gold/30 hover:bg-luxe-gold/5 transition-all flex items-center gap-2"
                                        >
                                            <Heart className="w-3 h-3 fill-luxe-gold text-luxe-gold" />
                                            {f.brand} {f.model}
                                        </Link>
                                    ))}
                                    {data?.favorites?.length === 0 && (
                                        <div className="w-full py-10 text-center">
                                            <Heart className="w-6 h-6 text-gray-800 mx-auto mb-2" />
                                            <p className="text-xs text-gray-600 font-medium italic">Wishlist is currently empty.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Side 2: Admin Sidebar Controls (Sticky) */}
                <div className="space-y-8 sticky top-28">
                    
                    {/* Member Profile Quick Card */}
                    <div className="bg-gradient-to-b from-white/[0.06] to-transparent border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-luxe-gold/5 blur-3xl -mr-16 -mt-16 pointer-events-none" />
                        <h3 className="text-sm font-black uppercase tracking-tighter text-gray-500 mb-6 flex items-center gap-2">
                             <User className="w-3 h-3 text-luxe-gold" /> Member Intelligence
                        </h3>
                        
                        <div className="space-y-5">
                            <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex items-center gap-4 group">
                                <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] text-gray-700 font-black uppercase tracking-widest mb-0.5 tracking-tighter">Verified Email</p>
                                    <p className="text-xs font-medium text-gray-200 truncate">{data?.profile?.email || 'N/A'}</p>
                                </div>
                                <a href={`mailto:${data.profile.email}`} className="text-gray-600 hover:text-white transition">
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>

                            <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex items-center gap-4 group">
                                <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500 group-hover:scale-110 transition-transform">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] text-gray-700 font-black uppercase tracking-widest mb-0.5 tracking-tighter">Primary Mobile</p>
                                    <p className="text-xs font-medium text-gray-200">{data?.profile?.phone || '— Unlinked —'}</p>
                                </div>
                                <a href={`tel:${data.profile.phone}`} className="text-gray-600 hover:text-white transition">
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>

                            <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex items-center gap-4 group">
                                <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 group-hover:scale-110 transition-transform">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] text-gray-700 font-black uppercase tracking-widest mb-0.5 tracking-tighter">Joined Date</p>
                                    <p className="text-xs font-medium text-gray-200">{formatDate(data?.profile?.created_at)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Internal Administrative Notes */}
                    <div className="bg-luxe-surface border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[500px]">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black uppercase tracking-tighter text-gray-500 flex items-center gap-2">
                                <MessageSquare className="w-3 h-3 text-luxe-gold" /> Internal Audit Notes
                            </h3>
                            <span className="text-[9px] font-black bg-white/5 px-2 py-0.5 rounded text-gray-600 uppercase tracking-widest">Confidential</span>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto pr-2 space-y-4 mb-6 custom-scrollbar">
                            {data.notes.map((n, i) => (
                                <div key={i} className="p-4 bg-white/[0.02] border-l-2 border-luxe-gold/30 rounded-r-2xl space-y-2">
                                    <p className="text-xs text-gray-300 leading-relaxed italic">"{n.content}"</p>
                                    <div className="flex items-center justify-between pt-1">
                                        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-1">
                                            <ShieldCheck className="w-2 h-2" /> {n.admin_name || 'Admin'}
                                        </span>
                                        <span className="text-[9px] text-gray-700 font-medium lowercase italic">
                                            {formatDate(n.created_at).split(' ')[0]}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {data.notes.length === 0 && (
                                <div className="py-8 text-center bg-black/20 rounded-2xl border border-dashed border-white/5 p-4">
                                    <p className="text-[10px] text-gray-600 font-medium uppercase tracking-widest">Clean Audit History</p>
                                    <p className="text-[9px] text-gray-700 italic mt-1">No warnings or internal notes logged.</p>
                                </div>
                            )}
                        </div>

                        <form onSubmit={addNote} className="space-y-3">
                            <textarea 
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Log administrative observation..."
                                className="w-full bg-black/50 border border-white/5 rounded-2xl p-4 text-xs text-white placeholder-gray-800 focus:outline-none focus:border-luxe-gold/30 resize-none h-24 transition-all"
                            />
                            <Button 
                                type="submit" 
                                variant="primary" 
                                size="sm" 
                                className="w-full shadow-lg"
                                disabled={submittingNote || !note.trim()}
                            >
                                {submittingNote ? 'Saving Entry...' : 'Save Audit Note'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Document Zoom Modal */}
            {selectedDoc && (
                <div 
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
                    onClick={() => setSelectedDoc(null)}
                >
                    <button className="absolute top-10 right-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all shadow-2xl border border-white/10 hover:scale-110 active:scale-90">
                        <X className="w-8 h-8" />
                    </button>
                    <img 
                        src={selectedDoc} 
                        alt="Document High Res" 
                        className="max-w-full max-h-full object-contain rounded-xl shadow-[0_0_100px_rgba(212,175,55,0.2)] animate-in zoom-in-95 duration-500"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    )
}
