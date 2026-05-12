import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { 
    UserCheck, Clock, Wallet, CheckCircle2, 
    ArrowUpRight, RefreshCw, Star, MapPin,
    AlertCircle, Phone, Send, Eye
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface Chauffeur {
    id: string
    full_name: string
    phone: string
    availability_status: string
    total_earnings: number
    pending_payout: number
}

export default function ChauffeurStats() {
    const navigate = useNavigate()
    const [chauffeurs, setChauffeurs] = useState<Chauffeur[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [payoutAmount, setPayoutAmount] = useState('')
    const [payoutRef, setPayoutRef] = useState('')

    const fetchData = async () => {
        setRefreshing(true)
        try {
            const { data, error } = await supabase.rpc('admin_get_chauffeur_stats')
            if (error) throw error
            setChauffeurs(data || [])
        } catch (err: any) {
            toast.error('Failed to load chauffeur data: ' + err.message)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handlePayout = async (chauffeurId: string) => {
        if (!payoutAmount || !payoutRef) {
            toast.error('Please enter amount and reference')
            return
        }

        try {
            const { error } = await supabase.rpc('admin_process_chauffeur_payout', {
                p_chauffeur_id: chauffeurId,
                p_amount: parseFloat(payoutAmount),
                p_ref: payoutRef
            })
            if (error) throw error
            
            toast.success('Payout recorded successfully')
            setSelectedId(null)
            setPayoutAmount('')
            setPayoutRef('')
            fetchData()
        } catch (err: any) {
            toast.error('Payout failed: ' + err.message)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'available': return 'text-emerald-400 bg-emerald-400/10'
            case 'on-duty': return 'text-blue-400 bg-blue-400/10'
            case 'unavailable': return 'text-rose-400 bg-rose-400/10'
            default: return 'text-gray-400 bg-gray-400/10'
        }
    }

    if (loading) return <div className="flex items-center justify-center h-64 text-gray-500 animate-pulse">Analyzing chauffeur logistics...</div>

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-2xl font-serif text-white flex items-center gap-3">
                        <UserCheck className="w-6 h-6 text-luxe-gold" />
                        Chauffeur Command & Payouts
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Manage personnel performance and financial settlements</p>
                </div>
                <button 
                    onClick={fetchData}
                    className={`p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all ${refreshing ? 'animate-spin' : ''}`}
                >
                    <RefreshCw className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chauffeurs.map(c => (
                    <div key={c.id} className="bg-[#0B0D10]/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:border-white/20 transition-all flex flex-col group">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-luxe-gold/10 border border-luxe-gold/20 flex items-center justify-center text-luxe-gold font-bold text-lg">
                                        {c.full_name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">{c.full_name}</h3>
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${getStatusColor(c.availability_status)}`}>
                                            {c.availability_status}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-luxe-gold">
                                    <Star className="w-3 h-3 fill-luxe-gold" />
                                    <span className="text-xs font-bold">4.9</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Lifetime Earnings</p>
                                    <p className="text-white font-serif text-lg font-bold">₹{c.total_earnings.toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Pending Payout</p>
                                    <p className="text-emerald-400 font-serif text-lg font-bold">₹{c.pending_payout.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-2">
                                <a href={`tel:${c.phone}`} className="flex-1 flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-white bg-white/5 py-2 rounded-lg transition-colors border border-transparent hover:border-white/10">
                                    <Phone className="w-3 h-3" /> Call
                                </a>
                                <button 
                                    onClick={() => navigate(`/admin/chauffeurs/${c.id}`)}
                                    className="flex-1 flex items-center justify-center gap-2 text-xs text-luxe-gold hover:text-white bg-luxe-gold/5 py-2 rounded-lg transition-colors border border-luxe-gold/20 hover:border-luxe-gold"
                                >
                                    <Eye className="w-3 h-3" /> Dossier
                                </button>
                            </div>
                        </div>

                        <div className="mt-auto bg-white/[0.02] p-4 border-t border-white/5">
                            {selectedId === c.id ? (
                                <div className="space-y-3 animate-in slide-in-from-bottom-2 duration-300">
                                    <input 
                                        type="number" 
                                        placeholder="Payout Amount"
                                        value={payoutAmount}
                                        onChange={(e) => setPayoutAmount(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-luxe-gold/50"
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Transaction Ref (e.g. UPI/NEFT ID)"
                                        value={payoutRef}
                                        onChange={(e) => setPayoutRef(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-luxe-gold/50"
                                    />
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handlePayout(c.id)}
                                            className="flex-1 bg-luxe-gold text-black text-[10px] font-bold py-2 rounded-lg hover:bg-luxe-gold/90 transition-all flex items-center justify-center gap-1.5"
                                        >
                                            <Send className="w-3 h-3" /> Process Payout
                                        </button>
                                        <button 
                                            onClick={() => setSelectedId(null)}
                                            className="px-3 bg-white/10 text-gray-400 text-[10px] font-bold py-2 rounded-lg hover:bg-white/20"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => setSelectedId(c.id)}
                                    disabled={c.pending_payout <= 0}
                                    className="w-full py-2.5 rounded-xl border border-luxe-gold/30 text-luxe-gold text-[10px] font-bold uppercase tracking-widest hover:bg-luxe-gold/10 transition-all disabled:opacity-30 disabled:grayscale"
                                >
                                    Settle Dues
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
