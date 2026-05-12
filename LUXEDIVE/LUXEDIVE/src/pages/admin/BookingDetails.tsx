import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { 
  User, 
  Car, 
  Calendar, 
  MapPin, 
  CreditCard, 
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Shield,
  ArrowLeft,
  Download,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  History,
  Info,
  ChevronRight,
  Maximize2
} from 'lucide-react'
import { toast } from 'sonner'

interface ZoomModalProps {
  url: string;
  label: string;
  onClose: () => void;
}

function ZoomModal({ url, label, onClose }: ZoomModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10" onClick={onClose}>
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
      >
        <XCircle className="w-10 h-10" />
      </button>
      <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
        <img src={url} alt={label} className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10" />
        <p className="mt-6 text-white font-serif text-2xl tracking-tight text-center">{label}</p>
      </div>
    </div>
  )
}

export default function BookingDetails() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const [details, setDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [zoomImg, setZoomImg] = useState<{ url: string, label: string } | null>(null)
  const [adminNote, setAdminNote] = useState('')

  useEffect(() => {
    if (bookingId) {
      loadBookingDetails()
    }
  }, [bookingId])

  const loadBookingDetails = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.rpc('admin_get_booking_complete_details', {
        p_booking_id: bookingId
      })
      if (error) throw error
      
      if (!data) {
        setDetails(null)
      } else {
        setDetails(data)
        if (data.booking?.adminNotes) setAdminNote(data.booking.adminNotes)
      }
    } catch (err) {
      console.error('Error loading details:', err)
      // Only show error toast for actual exceptions, not for empty records
      toast.error("Intelligence connection failure")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (status: string) => {
    setActionLoading(true)
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status, admin_notes: adminNote })
        .eq('id', bookingId)

      if (error) throw error
      toast.success(`Booking ${status}`)
      loadBookingDetails()
    } catch (err) {
      console.error(err)
      toast.error("Action failed")
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505]">
        <div className="w-16 h-16 border-t-2 border-amber-500 rounded-full animate-spin mb-6"></div>
        <p className="text-amber-500 font-serif text-xl tracking-widest animate-pulse">LUXEDIVE INTELLIGENCE ENGINE</p>
      </div>
    )
  }

  if (!details) {
    return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-center p-10">
          <AlertTriangle className="w-16 h-16 text-amber-500 mb-6" />
          <h2 className="text-3xl font-serif text-white mb-4">Dossier Unavailable</h2>
          <p className="text-white/40 mb-8 max-w-md">The intelligence record for this booking could not be retrieved. It may have been purged or relocated.</p>
          <button onClick={() => navigate('/admin/bookings')} className="flex items-center gap-2 text-amber-500 font-black uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Return to Ledger
          </button>
       </div>
    )
  }

  const { booking, user, car, chauffeur, schedule, pricing, payment_proof, documents } = details

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-luxe-gold selection:text-black font-sans pb-20 selection:bg-amber-500/30">
      {zoomImg && <ZoomModal url={zoomImg.url} label={zoomImg.label} onClose={() => setZoomImg(null)} />}

      <div className="max-w-[1600px] mx-auto px-4 py-8 lg:px-10 animate-in fade-in duration-700">
        
        {/* TOP OVERVIEW BAR - COMPACT */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-white/[0.03] pb-8">
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/admin/bookings')}
              className="group flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-amber-500 transition-all font-sans"
            >
              <ArrowLeft className="w-2.5 h-2.5 transition-transform group-hover:-translate-x-1" /> Ledger Intelligence
            </button>
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-serif tracking-tighter text-white/90">
                Booking <span className="text-amber-500/80">{booking?.bookingCode || booking?.id?.slice(0, 8) || 'N/A'}</span>
              </h1>
              <LuxuryStatusBadge status={booking.status} />
            </div>
            <div className="flex flex-wrap items-center gap-5 text-[9px] font-bold uppercase tracking-widest text-white/30">
              <span className="flex items-center gap-2">
                <Calendar className="w-3 h-3 text-amber-500/50" /> {booking?.createdAt ? new Date(booking.createdAt).toLocaleString() : 'N/A'}
              </span>
              <div className="w-1 h-1 rounded-full bg-white/10 hidden sm:block" />
              <span className="flex items-center gap-3">
                <CreditCard className="w-3 h-3 text-amber-500/50" /> 
                <LuxuryStatusBadge status={booking.paymentStatus} compact />
              </span>
              <div className="w-1 h-1 rounded-full bg-white/10 hidden sm:block" />
              <span className="flex items-center gap-2 px-2 py-0.5 bg-white/5 rounded border border-white/5">
                <Shield className="w-2.5 h-2.5 text-amber-500/50" /> {booking?.id?.slice(0, 12)}...
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block border-r border-white/[0.05] pr-6 mr-2">
               <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-1">Settlement Total</p>
               <p className="text-3xl font-serif text-amber-500/90">₹{Number((pricing?.totalPrice || 0) + (pricing?.securityDeposit || 0)).toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <button className="h-12 w-12 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-center justify-center hover:bg-white/5 transition-all text-white/40 hover:text-white group">
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button className="h-12 px-6 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all">
                <ExternalLink className="w-4 h-4" /> Export
              </button>
            </div>
          </div>
        </div>

        {/* CRITICAL WARNINGS */}
        {(!payment_proof && booking.paymentStatus === 'pending') && (
           <div className="mb-10 p-6 bg-red-500/10 border border-red-500/20 rounded-[2.5rem] flex flex-col sm:flex-row items-center gap-6 animate-in fade-in slide-in-from-top-4">
              <div className="w-14 h-14 bg-red-500 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-red-500/20 shrink-0">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg font-black text-white uppercase tracking-tight mb-1">Critical Attention Required</h4>
                <p className="text-sm text-red-100 font-medium opacity-80">Payment proof has NOT been submitted for this luxury asset. Verification cannot proceed without valid settlement proof.</p>
              </div>
           </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* MAIN CONTENT (8 COL) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* SECTION: CUSTOMER */}
            <DossierSection icon={<User />} title="Customer Identity">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                <DataField label="Full Legal Name" value={user.fullName} highlight />
                <DataField label="Contact Email" value={user.email} />
                <DataField label="Phone Connection" value={user.phone} />
                <DataField label="Account Identity (UID)" value={user.id} mono />
                <div className="col-span-2 pt-6 mt-4 border-t border-white/5">
                   <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.3em] mb-3">Residence Intelligence</p>
                   <p className="text-xl font-serif text-white/90 leading-relaxed mb-1">{user.address}</p>
                   <p className="text-xs text-amber-500 font-black uppercase tracking-widest">{user.city}, {user.state} {user.pincode}</p>
                </div>
              </div>
            </DossierSection>

            {/* SECTION: ASSET INTELLIGENCE */}
            <DossierSection icon={<Car />} title="Asset Intelligence">
              <div className="flex flex-col xl:flex-row gap-12">
                <div className="xl:w-2/5 group cursor-pointer" onClick={() => setZoomImg({ url: car.images?.[0], label: car.name })}>
                  <div className="aspect-[16/11] bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-white/10 relative shadow-2xl">
                     <img src={car.images?.[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Car" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white flex items-center gap-3">
                           Expand High-Res Gallery <Maximize2 className="w-4 h-4 text-amber-500" />
                        </span>
                     </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <LuxuryTag label={car.category} />
                    <LuxuryTag label={car.transmission} />
                    <LuxuryTag label={car.fuelType} />
                    <LuxuryTag label={car.year + " Year"} />
                  </div>
                </div>
                <div className="xl:w-3/5 space-y-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <DataField label="Asset Title" value={car.name} highlight />
                    <DataField label="Registry No" value={car.registrationNumber} />
                    <DataField label="Daily Listing Rate" value={`₹${Number(car.pricePerDay).toLocaleString()}`} />
                    <DataField label="Seating Configuration" value={`${car.seatingCapacity} Premium Seats`} />
                  </div>
                  
                  {/* OWNER INFO */}
                  <div className="bg-[#08090B] border border-white/10 rounded-[2rem] p-8 shadow-inner">
                     <p className="text-[9px] text-amber-500 font-black uppercase tracking-[0.3em] mb-6">Asset Title Holder</p>
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-xl shadow-amber-500/5">
                           <User className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                           <p className="text-xl font-serif text-white">{car.owner_details?.full_name || 'LUXEDIVE CORPORATE'}</p>
                           <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">{car.owner_details?.email} • {car.owner_details?.phone}</p>
                           {car.owner_details?.address && <p className="text-[9px] text-white/30 uppercase mt-1">{car.owner_details.address}</p>}
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </DossierSection>

            {/* SECTION: LOGISTICS */}
            <DossierSection icon={<MapPin />} title="Logistics & Schedule">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-12 relative">
                    <div className="absolute left-[9px] top-10 bottom-10 w-[2px] bg-gradient-to-b from-amber-500 via-amber-500/20 to-transparent" />
                    <div className="relative pl-12">
                       <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-amber-500 border-4 border-[#050505] shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                       <p className="text-[9px] text-white/40 font-black uppercase tracking-[0.3em] mb-3">Commencement</p>
                       <p className="text-2xl font-serif text-white tracking-tight">{schedule.pickupLocation}</p>
                       <p className="text-sm text-amber-500 font-mono mt-2 font-bold uppercase tracking-wider">
                          {new Date(schedule.pickupDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} @ {schedule.pickupTime}
                       </p>
                    </div>
                    <div className="relative pl-12">
                       <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-zinc-800 border-4 border-[#050505]" />
                       <p className="text-[9px] text-white/40 font-black uppercase tracking-[0.3em] mb-3">Asset Restitution</p>
                       <p className="text-2xl font-serif text-white tracking-tight">{schedule.dropLocation || schedule.pickupLocation}</p>
                       <p className="text-sm text-white/40 font-mono mt-2 uppercase tracking-wider">
                          {new Date(schedule.dropDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} @ {schedule.dropTime}
                       </p>
                    </div>
                  </div>
                  <div className="space-y-10">
                     <DataField label="Rental Duration" value={`${schedule.totalDays} Full Rental Days`} highlight />
                     <DataField label="Handoff Protocol" value={schedule.deliveryType === 'home' ? 'Concierge Home Delivery' : 'Self-Collection Service'} />
                     <DataField label="Target Coordinates" value={schedule.deliveryAddress || 'N/A'} />
                     {schedule.totalDays < 1 && (
                        <div className="p-5 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex items-center gap-4">
                           <Info className="w-5 h-5 text-amber-500 shrink-0" />
                           <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest leading-relaxed">System Note: Short-Window Operation Protocol — Verify Time Rules (≥ 3h).</p>
                        </div>
                     )}
                  </div>
               </div>
            </DossierSection>

            {/* SECTION: CHAUFFEUR */}
            <DossierSection icon={<Shield />} title="Specialist Chauffeur">
               {chauffeur ? (
                 <div className="flex flex-col sm:flex-row items-center gap-12">
                    <div className="w-28 h-28 rounded-[2rem] bg-zinc-900 border border-white/10 overflow-hidden shrink-0 shadow-2xl">
                       <img src={chauffeur.photo || "https://ui-avatars.com/api/?name="+chauffeur.fullName+"&background=111&color=fff&size=200"} className="w-full h-full object-cover" alt="Chauffeur" />
                    </div>
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-10 text-center sm:text-left">
                       <DataField label="Professional Name" value={chauffeur.fullName} highlight />
                       <DataField label="Service Tenure" value={chauffeur.experience + " Years"} />
                       <DataField label="Trust Profile" value={`${chauffeur.rating} Verified ⭐`} />
                       <DataField label="Daily Retainer" value={`₹${Number(chauffeur.dailyRate).toLocaleString()}`} />
                    </div>
                 </div>
               ) : (
                 <div className="p-12 border-2 border-dashed border-white/5 rounded-[3rem] text-center flex flex-col items-center gap-4 bg-white/2">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                       <User className="w-6 h-6 text-white/20" />
                    </div>
                    <p className="text-white/20 font-serif text-2xl tracking-tight">Self-Drive Configuration — No Chauffeur Requested</p>
                 </div>
               )}
            </DossierSection>

            {/* SECTION: PAYMENT PROOF */}
            <DossierSection icon={<CreditCard />} title="Payment Intelligence">
               <div className="flex flex-col xl:flex-row gap-12">
                  <div className="xl:w-1/2">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <DataField label="Settlement Method" value={payment_proof?.method || 'ELECTRONIC_GATEWAY'} highlight />
                        <DataField label="Reference No (UTR)" value={payment_proof?.transactionId || 'PENDING'} mono />
                        <div className="col-span-1 sm:col-span-2">
                           <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.3em] mb-3">Verification Phase</p>
                           <LuxuryStatusBadge status={payment_proof?.status || 'awaiting_proof'} />
                        </div>
                        <DataField label="Settlement Timestamp" value={payment_proof?.createdAt ? new Date(payment_proof.createdAt).toLocaleString() : 'N/A'} />
                     </div>
                  </div>
                  <div className="xl:w-1/2">
                     <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.3em] mb-4">Visual Verification Audit</p>
                     {payment_proof?.screenshotUrl ? (
                        <div className="group relative aspect-[4/3] bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-white/10 cursor-pointer shadow-2xl" onClick={() => setZoomImg({ url: payment_proof.screenshotUrl, label: 'Payment Settlement Proof' })}>
                           <img src={payment_proof.screenshotUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Proof" />
                           <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="bg-amber-500 text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 shadow-xl">
                                <Maximize2 className="w-4 h-4" /> Expand Proof
                              </span>
                           </div>
                        </div>
                     ) : (
                       <div className="aspect-[4/3] bg-white/2 border border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 grayscale opacity-40">
                          <AlertTriangle className="w-10 h-10 text-red-500" />
                          <p className="text-[10px] uppercase font-black tracking-[0.3em] text-white">Proof Collection Pending</p>
                       </div>
                     )}
                  </div>
               </div>
            </DossierSection>

            {/* SECTION: DOCUMENTS */}
            <DossierSection icon={<FileText />} title="Identity Vault">
               <div className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 bg-white/2 border border-white/5 rounded-[2.5rem]">
                  <div className="flex items-center gap-6">
                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl ${documents?.verificationStatus === 'verified' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                        <ShieldCheck className="w-8 h-8" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Vault Security Audit</p>
                        <p className="text-2xl font-serif text-white tracking-widest">{documents?.verificationStatus?.toUpperCase() || 'PENDING_UPLOAD'}</p>
                     </div>
                  </div>
                  <LuxuryStatusBadge status={documents?.verificationStatus || 'pending'} />
               </div>

               <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  <DocVaultItem label="Aadhaar Front" url={documents?.aadhaarFront} onZoom={() => setZoomImg({ url: documents.aadhaarFront, label: 'Aadhaar Identity (Front)' })} />
                  <DocVaultItem label="Aadhaar Back" url={documents?.aadhaarBack} onZoom={() => setZoomImg({ url: documents.aadhaarBack, label: 'Aadhaar Identity (Back)' })} />
                  <DocVaultItem label="License Front" url={documents?.drivingLicenseFront} onZoom={() => setZoomImg({ url: documents.drivingLicenseFront, label: 'Driving License (Front)' })} />
                  <DocVaultItem label="License Back" url={documents?.drivingLicenseBack} onZoom={() => setZoomImg({ url: documents.drivingLicenseBack, label: 'Driving License (Back)' })} />
                  <DocVaultItem label="Passport Photo" url={documents?.passportPhoto} onZoom={() => setZoomImg({ url: documents.passportPhoto, label: 'Registrant Passport Image' })} />
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 p-10 bg-white/5 rounded-[2.5rem] border border-white/5 shadow-inner">
                  <DataField label="Regulatory License Identifier" value={documents?.licenseNumber} mono highlight />
                  <DataField label="Regulatory Identity Identifier" value={documents?.idNumber} mono highlight />
               </div>
            </DossierSection>
          </div>

          {/* SIDE PANEL (4 COL - STICKY) */}
          <div className="lg:col-span-4">
            <div className="sticky top-10 space-y-10">
              
               {/* LEDGER CARD - COMPACT */}
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-700">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                 <h3 className="text-xl font-serif text-white mb-8 flex items-center gap-3 opacity-80">
                   <DollarSign className="w-5 h-5 text-amber-500/50" /> Settlement Ledger
                 </h3>
                 <div className="space-y-4">
                   <LedgerRow label="Asset Reservation" value={pricing?.totalCarRent || 0} sub={`${schedule?.totalDays || 0} Days @ ₹${pricing?.carRentPerDay || 0}`} />
                   {pricing?.totalChauffeurCost > 0 && <LedgerRow label="Specialist Chauffeur" value={pricing.totalChauffeurCost} sub={`₹${pricing.chauffeurCostPerDay} / day`} />}
                   <div className="h-[1px] bg-white/[0.03] my-2" />
                   <LedgerRow label="Value Added Tax (18%)" value={pricing.gstAmount} />
                   <LedgerRow label="Service Retainer" value={pricing.convenienceFee} />
                   <div className="h-[1px] bg-white/[0.03] my-2" />
                   <div className="flex justify-between items-end pt-1">
                     <span className="text-[9px] text-white/20 font-black uppercase tracking-[0.3em]">Aggregate</span>
                     <span className="text-2xl font-serif text-white tracking-tighter">₹{pricing.totalPrice?.toLocaleString()}</span>
                   </div>
                   <LedgerRow label="Security Deposit" value={pricing.securityDeposit} highlight sub="REFUNDABLE" />
                   
                   <div className="mt-8 pt-8 border-t border-white/[0.05] text-center relative">
                      <p className="text-[8px] text-amber-500/40 font-black uppercase tracking-[0.4em] mb-2">Total Obligation</p>
                      <p className="text-5xl font-serif text-white tracking-tighter drop-shadow-2xl">₹{(pricing.totalPrice + pricing.securityDeposit).toLocaleString()}</p>
                   </div>
                 </div>
              </div>

              {/* ACTION CARD - SLEEK */}
              <div className="bg-luxe-gold bg-amber-500/90 rounded-[3rem] p-8 text-black shadow-2xl shadow-amber-500/10">
                 <h3 className="text-xl font-serif mb-6 flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6" /> Authority Command
                 </h3>
                 <div className="space-y-5">
                    <div className="group space-y-2">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-50 flex items-center gap-2">
                        <FileText className="w-3 h-3" /> Dossier Audit Log
                      </p>
                      <textarea 
                        value={adminNote}
                        onChange={(e) => setAdminNote(e.target.value)}
                        placeholder="Log internal observations..."
                        className="w-full bg-black/5 border border-black/10 rounded-2xl p-5 text-sm font-semibold focus:ring-4 focus:ring-black/5 outline-none h-32 placeholder:text-black/20 transition-all resize-none"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3 pt-2">
                       <button 
                         disabled={actionLoading}
                         onClick={() => handleUpdateStatus('confirmed')}
                         className="w-full bg-black h-16 rounded-2xl text-white font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-98 transition-all shadow-xl shadow-black/20 disabled:opacity-50"
                       >
                         <CheckCircle className="w-5 h-5 text-amber-500" /> Confirm Dossier
                       </button>
                       <div className="grid grid-cols-2 gap-3">
                          <button 
                             disabled={actionLoading}
                             onClick={() => handleUpdateStatus('rejected')}
                             className="bg-black/5 border border-black/10 h-14 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black tracking-widest uppercase hover:bg-black/10 transition-all"
                          >
                             <XCircle className="w-4 h-4" /> Reject
                          </button>
                          <button 
                             disabled={actionLoading}
                             onClick={() => handleUpdateStatus('under_verification')}
                             className="bg-black/5 border border-black/10 h-14 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black tracking-widest uppercase hover:bg-black/10 transition-all"
                          >
                             <Clock className="w-4 h-4" /> Flag
                          </button>
                       </div>
                    </div>
                 </div>
              </div>

              {/* TIMELINE MINI CARD */}
              <div className="bg-[#0B0D10]/50 border border-white/5 rounded-[3rem] p-10">
                 <h4 className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
                   <History className="w-4 h-4" /> Audit Chronology
                 </h4>
                 <div className="space-y-8">
                    <TimelineItem label="Booking Initialized" date={booking.createdAt} />
                    {payment_proof?.status === 'verified' && (
                       <TimelineItem 
                         label="Payment Verified" 
                         date={payment_proof.updatedAt || payment_proof.createdAt} 
                         active 
                       />
                    )}
                    {booking.confirmedAt && <TimelineItem label="Dossier Approved" date={booking.confirmedAt} active />}
                    {!booking.confirmedAt && (
                      <div className="flex items-center gap-4 opacity-30 group">
                         <div className="w-2.5 h-2.5 rounded-full border-2 border-white/20 group-hover:border-amber-500/50 transition-colors" />
                         <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Handoff Phase Locked</span>
                            <p className="text-[9px] text-white/40 font-mono mt-1 italic">Waiting for Admin Verification</p>
                         </div>
                      </div>
                    )}
                 </div>
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
    <div className="bg-white/[0.01] border border-white/[0.04] rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden group hover:border-white/[0.08] transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
       <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/[0.02] blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
       <div className="flex items-center gap-4 mb-8 relative">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500/10 to-transparent rounded-xl flex items-center justify-center text-amber-500/60 shadow-inner border border-white/5">
             {icon}
          </div>
          <h2 className="text-xl font-serif text-white tracking-tight opacity-90">{title}</h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/[0.05] to-transparent ml-4" />
       </div>
       <div className="relative">
          {children}
       </div>
    </div>
  )
}

function DataField({ label, value, highlight, mono, bold }: any) {
  return (
    <div className="group space-y-1">
      <p className="text-[8px] text-white/20 font-black uppercase tracking-[0.4em] mb-1 group-hover:text-amber-500/40 transition-colors">{label}</p>
      <p className={`text-lg transition-all ${highlight ? 'text-amber-500/90' : 'text-white/80'} ${mono ? 'font-mono tracking-tighter text-base' : 'font-serif'} ${bold ? 'font-black' : ''}`}>
        {value || <span className="text-white/10 italic">Not Disclosed</span>}
      </p>
    </div>
  )
}

function LuxuryTag({ label }: { label: string }) {
  return (
    <span className="px-5 py-2 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black text-white/30 uppercase tracking-[0.2em] hover:bg-white/10 hover:text-white/60 transition-all">
      {label}
    </span>
  )
}

function DocVaultItem({ label, url, onZoom }: any) {
  if (!url) return (
    <div className="aspect-square bg-red-500/5 border-2 border-dashed border-red-500/10 rounded-[2rem] flex flex-col items-center justify-center gap-3 opacity-60">
       <AlertTriangle className="w-8 h-8 text-red-500/40" />
       <p className="text-[8px] font-black uppercase text-red-500/40 tracking-[0.2em]">{label} MISSING</p>
    </div>
  )
  return (
    <div className="group relative aspect-square bg-zinc-900 rounded-[2rem] overflow-hidden border border-white/5 cursor-pointer shadow-xl" onClick={onZoom}>
       <img src={url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={label} />
       <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
          <p className="text-[9px] font-black uppercase text-white tracking-[0.3em] text-center px-4">{label}</p>
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-black">
             <Maximize2 className="w-4 h-4" />
          </div>
       </div>
       <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/90 rounded-xl backdrop-blur-md border border-white/10">
          <p className="text-[8px] text-white/50 font-black uppercase tracking-widest">{label}</p>
       </div>
    </div>
  )
}

function LedgerRow({ label, value, sub, highlight }: any) {
  return (
    <div className="flex justify-between items-start group">
       <div className="space-y-0.5">
         <p className={`text-sm tracking-tight transition-colors ${highlight ? 'text-amber-500 font-black' : 'text-white/40 font-medium group-hover:text-white/60'}`}>{label}</p>
         {sub && <p className="text-[10px] font-mono text-white/20 group-hover:text-white/30 transition-colors uppercase tracking-widest">{sub}</p>}
       </div>
       <span className={`text-lg font-serif transition-transform group-hover:scale-110 ${highlight ? 'text-amber-500' : 'text-white'}`}>₹{Number(value).toLocaleString()}</span>
    </div>
  )
}

function TimelineItem({ label, date, active }: any) {
  return (
    <div className="flex gap-6 items-start relative pb-4">
       <div className="mt-2 shrink-0">
          <div className={`w-3 h-3 rounded-full ${active ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-white/10'}`} />
       </div>
       <div className="space-y-1">
          <p className={`text-[11px] font-black uppercase tracking-[0.3em] ${active ? 'text-white' : 'text-white/20'}`}>{label}</p>
          <p className="text-[10px] font-mono text-white/20">{new Date(date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
       </div>
    </div>
  )
}

function LuxuryStatusBadge({ status, compact }: { status: string, compact?: boolean }) {
  const configs: any = {
    pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-amber-500/5',
    under_verification: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    confirmed: 'bg-green-500/10 text-green-500 border-green-500/20 shadow-green-500/10',
    cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
    completed: 'bg-zinc-500/10 text-zinc-500 border-white/5',
    verified: 'bg-green-500/10 text-green-500 border-green-500/20',
    paid: 'bg-green-500/10 text-green-500 border-green-500/20 shadow-green-500/5',
    success: 'bg-green-500/10 text-green-500 border-green-500/20 shadow-green-500/5',
  }
  const cls = configs[status] || 'bg-white/5 text-white/40 border-white/5'
  return (
    <span className={`${compact ? 'px-3 py-1 text-[8px]' : 'px-6 py-2.5 text-[11px]'} rounded-[1.25rem] border font-black uppercase tracking-[0.3em] transition-all hover:scale-105 active:scale-95 cursor-default ${cls}`}>
       {status?.replace('_', ' ')}
    </span>
  )
}
