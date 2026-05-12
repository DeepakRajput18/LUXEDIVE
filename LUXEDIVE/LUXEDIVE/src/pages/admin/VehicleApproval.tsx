import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../contexts/AuthContext'
import { 
  Car, 
  Check, 
  X, 
  Clock, 
  Info, 
  DollarSign, 
  ShieldCheck, 
  MapPin, 
  Calendar,
  AlertCircle,
  ExternalLink,
  CheckCircle,
  Star,
  Trash2
} from 'lucide-react'
import { toast } from 'sonner'
import { PriceInput } from '../../components/forms/PriceInput'

interface PendingVehicle {
  v_id: string
  v_owner_name: string
  v_owner_email: string
  v_owner_phone: string
  v_brand: string
  v_model: string
  v_year: number
  v_registration_number: string
  v_buying_cost: number
  v_images: string[]
  v_description: string
  v_usage_history: string
  v_faults: string | null
  v_city: string
  v_status: string
  v_created_at: string
}

const INPUT = 'w-full bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all duration-200'
const LABEL = 'block text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-medium'
const CARD = 'bg-[#111111] border border-[#1E1E1E] rounded-2xl p-6'

export default function VehicleApproval() {
  const { user } = useAuth()
  const [vehicles, setVehicles] = useState<PendingVehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVehicle, setSelectedVehicle] = useState<PendingVehicle | null>(null)
  
  // Photo curation state
  const [primaryPhotoIdx, setPrimaryPhotoIdx] = useState(0)
  const [removedPhotoIdxs, setRemovedPhotoIdxs] = useState<number[]>([])

  // Approval Form State
  const [approvalData, setApprovalData] = useState({
    pricePerDay: '',
    category: 'LUXURY',
    adminNote: ''
  })
  
  // Rejection State
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectionForm, setShowRejectionForm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    fetchPendingVehicles()
  }, [])

  const fetchPendingVehicles = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.rpc('admin_get_pending_vehicles')
      if (error) throw error
      setVehicles(data || [])
    } catch (err: any) {
      toast.error('Failed to load pending vehicles: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    if (!selectedVehicle || !approvalData.pricePerDay) {
      toast.error('Please enter the daily rental price')
      return
    }

    setIsProcessing(true)
    try {
      // Build curated images: filter out removed ones
      const allImgs = selectedVehicle.v_images
      const curatedImages = allImgs.filter((_, i) => !removedPhotoIdxs.includes(i))
      const primaryImage = allImgs[primaryPhotoIdx] || allImgs[0]

      const { data, error } = await supabase.rpc('admin_approve_vehicle', {
        p_vehicle_id: selectedVehicle.v_id,
        p_admin_id: user?.id,
        p_price_per_day: parseInt(approvalData.pricePerDay),
        p_category: approvalData.category,
        p_admin_note: approvalData.adminNote,
        p_primary_image: primaryImage,
        p_curated_images: curatedImages
      })

      if (error) throw error

      toast.success('Vehicle approved and added to fleet!')
      setSelectedVehicle(null)
      fetchPendingVehicles()
    } catch (err: any) {
      toast.error('Approval failed: ' + err.message)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReject = async () => {
    if (!selectedVehicle || !rejectionReason) {
      toast.error('Please provide a rejection reason')
      return
    }

    setIsProcessing(true)
    try {
      const { data, error } = await supabase.rpc('admin_reject_vehicle', {
        p_vehicle_id: selectedVehicle.v_id,
        p_admin_id: user?.id,
        p_rejection_reason: rejectionReason
      })

      if (error) throw error

      toast.success('Vehicle submission rejected')
      setShowRejectionForm(false)
      setSelectedVehicle(null)
      fetchPendingVehicles()
    } catch (err: any) {
      toast.error('Rejection failed: ' + err.message)
    } finally {
      setIsProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Clock className="w-8 h-8 text-[#D4AF37] animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-8 bg-[#0A0A0A] min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Marketplace Approvals</h1>
          <p className="text-gray-500 mt-1">Review and price user-submitted vehicles</p>
        </div>
        <div className="bg-[#D4AF37]/10 px-4 py-2 rounded-xl border border-[#D4AF37]/20">
          <span className="text-[#D4AF37] font-bold">{vehicles.length} Pending</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Pending List */}
        <div className="lg:col-span-4 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
          {vehicles.length === 0 ? (
            <div className={CARD + ' text-center py-12'}>
              <CheckCircle className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No pending submissions</p>
            </div>
          ) : (
            vehicles.map(v => (
              <div 
                key={v.v_id}
                onClick={() => {
                  setSelectedVehicle(v)
                  setShowRejectionForm(false)
                  setPrimaryPhotoIdx(0)
                  setRemovedPhotoIdxs([])
                }}
                className={`cursor-pointer transition-all duration-300 rounded-2xl border ${
                  selectedVehicle?.v_id === v.v_id 
                    ? 'bg-[#1A1A1A] border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
                    : 'bg-[#111111] border-[#1E1E1E] hover:border-gray-700'
                } p-4`}
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/5">
                    <img src={v.v_images[0]} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold">{v.v_brand} {v.v_model}</h3>
                    <p className="text-gray-500 text-xs mt-1">{v.v_owner_name}</p>
                    <div className="flex items-center gap-2 mt-2">
                       <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded-full border border-white/5">
                        {v.v_year}
                       </span>
                       <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full border border-[#D4AF37]/10">
                        {v.v_city}
                       </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Review Detail */}
        <div className="lg:col-span-8">
          {selectedVehicle ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 pb-12">
              {/* Image Gallery with Curation */}
              <div className={CARD}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-[#D4AF37]" />
                    <h2 className="text-white font-bold">Vehicle Inspection Photos</h2>
                  </div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                    ⭐ = Main Photo &nbsp;|&nbsp; 🗑 = Remove from album
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedVehicle.v_images.map((img, i) => {
                    const isRemoved = removedPhotoIdxs.includes(i)
                    const isPrimary = primaryPhotoIdx === i
                    return (
                      <div key={i} className={`aspect-video rounded-xl overflow-hidden border-2 relative group transition-all ${
                        isRemoved ? 'opacity-30 border-red-500/30 grayscale' :
                        isPrimary ? 'border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.4)]' :
                        'border-white/10 hover:border-white/30'
                      }`}>
                        <img src={img} className="w-full h-full object-cover" />

                        {/* Primary badge */}
                        {isPrimary && !isRemoved && (
                          <div className="absolute top-2 left-2 bg-[#D4AF37] text-black text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 fill-current" /> Main
                          </div>
                        )}

                        {/* Hover controls */}
                        {!isRemoved && (
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                            {!isPrimary && (
                              <button
                                onClick={() => setPrimaryPhotoIdx(i)}
                                title="Set as main photo"
                                className="p-2 bg-[#D4AF37] rounded-full text-black hover:scale-110 transition-transform"
                              >
                                <Star className="w-4 h-4 fill-current" />
                              </button>
                            )}
                            <a href={img} target="_blank" className="p-2 bg-white/20 rounded-full text-white hover:scale-110 transition-transform">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => setRemovedPhotoIdxs(prev => [...prev, i])}
                              title="Remove from album"
                              className="p-2 bg-red-500/80 rounded-full text-white hover:scale-110 transition-transform"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {/* Restore removed */}
                        {isRemoved && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <button
                              onClick={() => setRemovedPhotoIdxs(prev => prev.filter(x => x !== i))}
                              className="text-[10px] text-white font-bold bg-red-500/70 px-3 py-1.5 rounded-full"
                            >
                              Restore
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  {selectedVehicle.v_images.length - removedPhotoIdxs.length} photo{selectedVehicle.v_images.length - removedPhotoIdxs.length !== 1 ? 's' : ''} will be saved to the fleet listing.
                </p>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={CARD}>
                  <label className={LABEL}>Owner Information</label>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Name</span>
                      <span className="text-white font-medium">{selectedVehicle.v_owner_name}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Email</span>
                      <span className="text-white font-medium">{selectedVehicle.v_owner_email}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Phone</span>
                      <span className="text-white font-medium">{selectedVehicle.v_owner_phone}</span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-white/5 my-4"></div>
                  
                  <label className={LABEL}>Location Details</label>
                   <div className="flex items-start gap-3 mt-2">
                    <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5" />
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {selectedVehicle.v_city}
                    </p>
                  </div>
                </div>

                <div className={CARD}>
                  <label className={LABEL}>Financial Audit</label>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Reported Cost</span>
                      <span className="text-white font-bold">₹{selectedVehicle.v_buying_cost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Age of Vehicle</span>
                      <span className="text-white font-medium">{new Date().getFullYear() - selectedVehicle.v_year} Years</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Reg. Number</span>
                      <span className="text-white font-bold tracking-wider">{selectedVehicle.v_registration_number}</span>
                    </div>
                  </div>

                  <div className="h-px bg-white/5 my-4"></div>

                  <label className={LABEL}>Usage Profile</label>
                  <p className="text-sm text-gray-300 mt-2 bg-black/30 p-3 rounded-lg border border-white/5 italic">
                    "{selectedVehicle.v_usage_history}"
                  </p>
                </div>
              </div>

              {/* Description & Faults */}
              <div className={CARD}>
                <label className={LABEL}>Technical Description</label>
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  {selectedVehicle.v_description}
                </p>

                {selectedVehicle.v_faults && (
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-red-400 uppercase tracking-widest font-bold mb-1">Owner Reported Faults</p>
                      <p className="text-sm text-red-200">{selectedVehicle.v_faults}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Approval Flow */}
              <div className={`${CARD} border-[#D4AF37]/20 bg-[#161616]`}>
                {!showRejectionForm ? (
                  <>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-black flex items-center justify-center">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-bold text-white">Market Pricing Setup</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <PriceInput
                          label="Daily Rental Price"
                          type="car"
                          value={approvalData.pricePerDay === '' ? '' : Number(approvalData.pricePerDay)}
                          onChange={(v) => setApprovalData({...approvalData, pricePerDay: v.toString()})}
                          required={true}
                        />
                      </div>
                      <div>
                        <label className={LABEL}>Category</label>
                        <select
                          value={approvalData.category}
                          onChange={e => setApprovalData({...approvalData, category: e.target.value})}
                          className={INPUT + ' appearance-none cursor-pointer'}
                        >
                          <option value="LUXURY">LUXURY</option>
                          <option value="SPORTS">SPORTS</option>
                          <option value="EXOTIC">EXOTIC</option>
                          <option value="CLASSIC">CLASSIC</option>
                          <option value="WEDDING">WEDDING</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Estimated Earnings Model</p>
                        <p className="text-sm text-gray-400 mt-1">
                          LUXEDIVE Commission (20%): <span className="text-white">₹{(parseInt(approvalData.pricePerDay || '0') * 0.2).toLocaleString()}</span>
                          &nbsp;·&nbsp; User Share (80%): <span className="text-green-500">₹{(parseInt(approvalData.pricePerDay || '0') * 0.8).toLocaleString()}</span>
                        </p>
                    </div>

                    <div className="mb-6">
                      <label className={LABEL}>Internal Admin Note (Optional)</label>
                      <textarea 
                        value={approvalData.adminNote}
                        onChange={e => setApprovalData({...approvalData, adminNote: e.target.value})}
                        className={INPUT + ' h-24 resize-none'}
                        placeholder="Condition looks excellent, rare color combo..."
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <button 
                        onClick={handleApprove}
                        disabled={isProcessing}
                        className="flex-1 h-12 rounded-xl bg-[#D4AF37] text-black font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
                      >
                       {isProcessing ? <Clock className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                        Finalize & Activate Listing
                      </button>
                      
                      <button 
                        onClick={() => setShowRejectionForm(true)}
                        className="px-6 h-12 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 font-bold transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="animate-in slide-in-from-bottom-4">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-red-500">Rejection Protocol</h2>
                      <button onClick={() => setShowRejectionForm(false)} className="text-gray-500">Cancel</button>
                    </div>

                    <div className="mb-6">
                      <label className={LABEL}>Rejection Reason (Sent to User)</label>
                      <textarea 
                        value={rejectionReason}
                        onChange={e => setRejectionReason(e.target.value)}
                        className={INPUT + ' h-32 border-red-500/20 focus:border-red-500'}
                        placeholder="Images were poor quality, maintenance records missing..."
                      />
                    </div>

                    <button 
                      onClick={handleReject}
                      disabled={isProcessing}
                      className="w-full h-12 rounded-xl bg-red-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-all disabled:opacity-50"
                    >
                      {isProcessing ? <Clock className="w-5 h-5 animate-spin" /> : <X className="w-5 h-5" />}
                      Confirm Rejection
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-2 border-dashed border-[#1E1E1E] rounded-3xl flex flex-col items-center justify-center p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#111111] border border-[#1E1E1E] flex items-center justify-center mb-6">
                 <Info className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-white font-bold text-lg">Select a submission to review</h3>
              <p className="text-gray-600 max-w-xs mx-auto mt-2">
                Click on a vehicle from the pending list on the left to start the verification process.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
