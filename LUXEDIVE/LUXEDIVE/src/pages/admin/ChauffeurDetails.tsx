import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { 
  User, 
  Car, 
  Calendar, 
  Star, 
  Wallet, 
  History, 
  Shield, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  Phone,
  Settings,
  DollarSign,
  TrendingUp,
  Award,
  ExternalLink,
  ChevronRight
} from 'lucide-react'
import { toast } from 'sonner'

export default function AdminChauffeurDetails() {
  const { chauffeurId } = useParams()
  const navigate = useNavigate()
  const [details, setDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [noteContent, setNoteContent] = useState('')
  const [payoutAmount, setPayoutAmount] = useState('')
  const [payoutRef, setPayoutRef] = useState('')

  useEffect(() => {
    if (chauffeurId) {
      loadDetails()
    }
  }, [chauffeurId])

  const loadDetails = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.rpc('admin_get_chauffeur_complete_details', {
        p_chauffeur_id: chauffeurId
      })
      if (error) throw error
      setDetails(data)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load chauffeur dossier")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (status: string) => {
    setActionLoading(true)
    try {
      const { error } = await supabase
        .from('chauffeurs')
        .update({ availability_status: status })
        .eq('id', chauffeurId)
      if (error) throw error
      toast.success(`Availability updated: ${status}`)
      loadDetails()
    } catch (err) {
      toast.error("Status update failed")
    } finally {
      setActionLoading(false)
    }
  }

  const handleAddNote = async () => {
    if (!noteContent) return
    setActionLoading(true)
    try {
      const { error } = await supabase
        .from('chauffeur_notes')
        .insert([{
          chauffeur_id: chauffeurId,
          content: noteContent,
          type: 'info'
        }])
      if (error) throw error
      toast.success("Intelligence note recorded")
      setNoteContent('')
      loadDetails()
    } catch (err) {
      toast.error("Failed to record note")
    } finally {
      setActionLoading(false)
    }
  }

  const handleSettlePayout = async () => {
    if (!payoutAmount || !payoutRef) {
      toast.error("Enter amount and reference")
      return
    }
    setActionLoading(true)
    try {
      const { error } = await supabase.rpc('admin_process_chauffeur_payout', {
        p_chauffeur_id: chauffeurId,
        p_amount: parseFloat(payoutAmount),
        p_ref: payoutRef
      })
      if (error) throw error
      toast.success("Payout settled")
      setPayoutAmount('')
      setPayoutRef('')
      loadDetails()
    } catch (err) {
      toast.error("Payout settlement failed")
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505]">
        <div className="w-16 h-16 border-t-2 border-amber-500 rounded-full animate-spin mb-6"></div>
        <p className="text-amber-500 font-serif text-xl tracking-widest animate-pulse">CHAUFFEUR INTELLIGENCE LOGS</p>
      </div>
    )
  }

  if (!details) return <div className="p-20 text-center">Dossier Relocated or Missing</div>

  const { chauffeur, stats, earnings, bookings, payouts, notes } = details

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500 selection:text-black font-sans pb-20">
      
      <div className="max-w-[1700px] mx-auto px-6 py-10 lg:px-12">
        
        {/* TOP OVERVIEW BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/5 pb-10">
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/admin/chauffeurs')}
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-amber-500 transition-all"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Chauffeur Command
            </button>
            <div className="flex flex-wrap items-center gap-6">
               <div className="w-20 h-20 rounded-[2rem] bg-zinc-900 border border-white/10 overflow-hidden shrink-0 shadow-2xl flex items-center justify-center">
                  {chauffeur.photo ? (
                    <img src={chauffeur.photo} className="w-full h-full object-cover" alt="Chauffeur" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-transparent flex items-center justify-center text-4xl font-serif text-amber-500">
                      {chauffeur.fullName?.[0] || 'C'}
                    </div>
                  )}
               </div>
               <div>
                  <h1 className="text-4xl md:text-5xl font-serif tracking-tighter">
                    {chauffeur.fullName}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 mt-3 text-[10px] font-black uppercase tracking-widest text-white/40">
                    <span className="flex items-center gap-2 text-amber-500"><Star className="w-3 h-3 fill-amber-500" /> {chauffeur.rating} Trust Score</span>
                    <div className="w-1 h-1 rounded-full bg-white/10" />
                    <span>{chauffeur.experience} Yrs Experience</span>
                    <div className="w-1 h-1 rounded-full bg-white/10" />
                    <span className="text-white/60">ID: {chauffeur.id.slice(0, 8)}</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`px-6 py-3 rounded-2xl border text-[11px] font-black uppercase tracking-[0.3em] ${chauffeur.availabilityStatus === 'available' ? 'bg-green-500/10 text-green-500 border-green-500/20 shadow-green-500/5' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
               {chauffeur.availabilityStatus}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* MAIN CONTENT (8 COL) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               <StatCard icon={<CheckCircle />} label="Missions Completed" value={stats.totalCompleted} color="green" />
               <StatCard icon={<Clock />} label="Mission Duration" value={`${stats.totalDays} Days`} color="amber" />
               <StatCard icon={<XCircle />} label="Cancellations" value={stats.totalCancelled} color="rose" />
            </div>

            {/* SECTION: FINANCIAL LEDGER */}
            <DossierSection icon={<Wallet />} title="Financial Intelligence">
               <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  <div className="md:col-span-2 space-y-8">
                     <DataField label="Lifetime Procurement" value={`₹${earnings.lifetime.toLocaleString()}`} highlight />
                     <div className="h-[1px] bg-white/5" />
                     <DataField label="Monthly Performance" value={`₹${earnings.thisMonth.toLocaleString()}`} />
                  </div>
                  <div className="md:col-span-3 bg-amber-500/5 border border-amber-500/10 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
                     <div>
                        <p className="text-[10px] text-amber-500/50 font-black uppercase tracking-[0.4em] mb-4">Pending Settlement Obligations</p>
                        <p className="text-6xl font-serif text-white tracking-tighter">₹{earnings.pending.toLocaleString()}</p>
                     </div>
                     <div className="mt-8 flex items-center gap-4 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                        <DollarSign className="w-4 h-4 text-amber-500" /> Last Settlement: {earnings.lastPayoutDate ? new Date(earnings.lastPayoutDate).toLocaleDateString() : 'NO PRIOR SETTLEMENT'}
                     </div>
                  </div>
               </div>
            </DossierSection>

            {/* SECTION: ASSIGNMENT HISTORY */}
            <DossierSection icon={<History />} title="Mission Operations">
               <div className="overflow-x-auto -mx-10 md:-mx-16 px-10 md:px-16">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                     <thead>
                        <tr className="border-b border-white/5">
                           {['Date', 'Customer', 'Asset Configuration', 'Duration', 'Dividend', 'Status'].map(h => (
                             <th key={h} className="pb-6 text-[9px] text-white/30 font-black uppercase tracking-[0.3em]">{h}</th>
                           ))}
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/[0.03]">
                        {bookings.map((b: any) => (
                          <tr key={b.id} className="group hover:bg-white/[0.02] transition-colors">
                            <td className="py-6 font-mono text-[10px] text-white/50">{new Date(b.createdAt).toLocaleDateString()}</td>
                            <td className="py-6 text-white font-serif text-lg">{b.customerName}</td>
                            <td className="py-6">
                               <span className="text-white/60 font-medium">{b.carName}</span>
                            </td>
                            <td className="py-6 text-white/40">{b.totalDays} Days</td>
                            <td className="py-6 text-amber-500 font-bold tracking-tighter text-base">₹{b.earnings.toLocaleString()}</td>
                            <td className="py-6">
                               <Link to={`/admin/bookings/${b.id}`} className="group/btn flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all">
                                  {b.status} <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                               </Link>
                            </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </DossierSection>

            {/* SECTION: PAYOUT HISTORY */}
            <DossierSection icon={<DollarSign />} title="Settlement Archive">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {payouts.map((p: any) => (
                    <div key={p.id} className="p-6 bg-[#08090B] border border-white/5 rounded-3xl flex items-center justify-between group hover:border-amber-500/20 transition-all">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-amber-500 transition-colors">
                             <TrendingUp className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="text-xl font-serif text-white">₹{p.amount.toLocaleString()}</p>
                             <p className="text-[10px] font-mono text-white/30 tracking-widest uppercase mt-1">{new Date(p.paidAt).toLocaleDateString()} • {p.method}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <span className="text-[9px] font-black uppercase text-green-500 tracking-widest">{p.status}</span>
                          <p className="text-[8px] font-mono text-white/20 mt-1">REF: {p.ref}</p>
                       </div>
                    </div>
                  ))}
                  {payouts.length === 0 && (
                    <div className="col-span-2 py-10 text-center border-2 border-dashed border-white/5 rounded-[2.5rem] opacity-30 italic text-sm">No settlement history identified.</div>
                  )}
               </div>
            </DossierSection>

            {/* SECTION: PERFORMANCE FLAGS */}
            <DossierSection icon={<AlertTriangle />} title="Administrative Audit">
               <div className="space-y-6">
                  {notes.map((n: any) => (
                    <div key={n.id} className="p-8 bg-black/40 border-l-4 border-amber-500/30 rounded-r-[2rem] rounded-l-lg space-y-3">
                       <div className="flex items-center justify-between">
                          <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[8px] font-black uppercase tracking-widest rounded-lg">{n.type}</span>
                          <span className="text-[9px] font-mono text-white/30 uppercase">{new Date(n.createdAt).toLocaleString()}</span>
                       </div>
                       <p className="text-lg font-serif text-white/80 leading-relaxed italic">"{n.content}"</p>
                    </div>
                  ))}
                  {notes.length === 0 && (
                    <div className="py-10 text-center opacity-30 italic flex flex-col items-center gap-4">
                       <Award className="w-8 h-8" />
                       <p className="text-sm">Exemplary Registry — No negative performance flags identified.</p>
                    </div>
                  )}
               </div>
            </DossierSection>
          </div>

          {/* SIDE PANEL (4 COL - STICKY) */}
          <div className="lg:col-span-4">
            <div className="sticky top-10 space-y-10">
              
              {/* SETTLEMENT CARD */}
              <div className="bg-[#0B0D10] border border-white/10 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                 <h3 className="text-2xl font-serif text-white mb-10 flex items-center gap-4">
                   <Wallet className="w-6 h-6 text-amber-500" /> Settle Obligations
                 </h3>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[9px] text-white/40 font-black uppercase tracking-widest pl-2">Settlement Amount</label>
                       <div className="relative">
                          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-500 font-serif text-xl">₹</span>
                          <input 
                             type="number"
                             value={payoutAmount}
                             onChange={e => setPayoutAmount(e.target.value)}
                             placeholder="0.00"
                             className="w-full bg-[#050505] border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-2xl font-serif text-white outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all"
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] text-white/40 font-black uppercase tracking-widest pl-2">Intelligence Reference (UTR/UPI)</label>
                       <input 
                          type="text"
                          value={payoutRef}
                          onChange={e => setPayoutRef(e.target.value)}
                          placeholder="Log Transaction ID..."
                          className="w-full bg-[#050505] border border-white/10 rounded-2xl py-4 px-6 text-sm font-semibold text-white outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all"
                       />
                    </div>
                    <button 
                       disabled={actionLoading || earnings.pending <= 0}
                       onClick={handleSettlePayout}
                       className="w-full py-6 bg-amber-500 text-black rounded-[2rem] font-black uppercase tracking-[0.3em] text-[12px] flex items-center justify-center gap-3 hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-amber-500/10 disabled:opacity-30 disabled:grayscale"
                    >
                       {actionLoading ? 'Processing...' : 'Authorize Settlement'}
                    </button>
                    <p className="text-center text-[9px] text-white/20 font-bold uppercase tracking-widest">Calculated Balance: ₹{earnings.pending.toLocaleString()}</p>
                 </div>
              </div>

              {/* ACTION CARD */}
              <div className="bg-[#0B0D10]/50 border border-white/5 rounded-[3.5rem] p-10">
                 <h3 className="text-2xl font-serif mb-8 flex items-center gap-4 text-white">
                    <Shield className="w-7 h-7 text-amber-500" /> Unit Command
                 </h3>
                 <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                       <button 
                          disabled={actionLoading}
                          onClick={() => handleUpdateStatus('available')}
                          className="h-20 bg-green-500/10 border border-green-500/10 rounded-3xl flex flex-col items-center justify-center gap-1 hover:bg-green-500/20 hover:border-green-500/30 transition-all group"
                       >
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-green-500/60 group-hover:text-green-500">Available</span>
                       </button>
                       <button 
                          disabled={actionLoading}
                          onClick={() => handleUpdateStatus('unavailable')}
                          className="h-20 bg-rose-500/10 border border-rose-500/10 rounded-3xl flex flex-col items-center justify-center gap-1 hover:bg-rose-500/20 hover:border-rose-500/30 transition-all group"
                       >
                          <XCircle className="w-5 h-5 text-rose-500" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-rose-500/60 group-hover:text-rose-500">Suspend</span>
                       </button>
                    </div>

                    <div className="group space-y-3">
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                         <FileText className="w-3 h-3" /> Professional Audit Note
                       </p>
                       <textarea 
                         value={noteContent}
                         onChange={e => setNoteContent(e.target.value)}
                         placeholder="Log performance intelligence..."
                         className="w-full bg-[#050505] border border-white/10 rounded-3xl p-6 text-sm font-semibold focus:border-amber-500/50 outline-none h-40 placeholder:text-white/10 transition-all"
                       />
                       <button 
                          disabled={actionLoading || !noteContent}
                          onClick={handleAddNote}
                          className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                       >
                          Record Intelligence
                       </button>
                    </div>
                 </div>
              </div>

              {/* CONTACT QUICK CARD */}
              <div className="bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/10 rounded-[3rem] p-10 flex flex-col gap-6 items-center text-center">
                 <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <Phone className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Active Comms Line</p>
                    <p className="text-2xl font-serif text-white mt-1">{chauffeur.phone}</p>
                 </div>
                 <a href={`tel:${chauffeur.phone}`} className="w-full py-4 bg-indigo-500/20 text-indigo-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">Establish Voice Contact</a>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// SUBCONPONENTS
function DossierSection({ icon, title, children }: any) {
  return (
    <div className="bg-[#0B0D10] border border-white/5 rounded-[4rem] p-10 md:p-16 shadow-2xl relative overflow-hidden hover:border-white/10 transition-all duration-500">
       <div className="absolute top-0 left-0 w-48 h-48 bg-amber-500/5 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
       <div className="flex items-center gap-6 mb-16 relative">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-amber-500/5 rounded-[1.5rem] flex items-center justify-center text-amber-500 shadow-inner border border-amber-500/10">
             {icon}
          </div>
          <h2 className="text-4xl font-serif text-white tracking-tight">{title}</h2>
       </div>
       <div className="relative">
          {children}
       </div>
    </div>
  )
}

function DataField({ label, value, highlight }: any) {
  return (
    <div className="group">
      <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em] mb-2 group-hover:text-amber-500/50 transition-colors">{label}</p>
      <p className={`text-4xl font-serif transition-all ${highlight ? 'text-amber-500' : 'text-white/90'}`}>
        {value}
      </p>
    </div>
  )
}

function StatCard({ icon, label, value, color }: any) {
  const configs: any = {
    green: 'text-green-500 bg-green-500/10 border-green-500/20',
    amber: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    rose: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
  }
  const cls = configs[color] || configs.amber
  return (
    <div className="p-8 bg-[#0B0D10] border border-white/5 rounded-[2.5rem] group hover:border-white/10 transition-all shadow-xl">
       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-inner border ${cls}`}>
          {icon}
       </div>
       <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.4em] mb-2">{label}</p>
       <p className="text-3xl font-serif text-white font-bold group-hover:scale-105 transition-transform origin-left">{value}</p>
    </div>
  )
}
