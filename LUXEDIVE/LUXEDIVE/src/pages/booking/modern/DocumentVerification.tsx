import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CheckCircle2, Shield, FileText, Camera, Lock as LockIcon, Globe, Cpu, Fingerprint, X, AlertTriangle, CheckCircle, Info, AlertOctagon, Trash2, RefreshCw } from 'lucide-react'
import { useBooking } from '../../../contexts/BookingContext'
import { useAuth } from '../../../contexts/AuthContext'
import BookingLayout from '../../../components/layout/BookingLayout'
import { toast } from 'sonner'

// ─── Custom Popup Modal ───────────────────────────────────────────────────────
interface PopupState {
    isOpen: boolean
    title: string
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
}

function ValidationPopup({ popup, onClose }: { popup: PopupState; onClose: () => void }) {
    if (!popup.isOpen) return null

    const config = {
        success: {
            icon: <CheckCircle className="w-7 h-7" />,
            iconBg: 'bg-emerald-500/10',
            iconColor: 'text-emerald-400',
            border: 'border-emerald-500/20',
            glow: 'from-emerald-500/10 to-transparent',
            badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            badgeText: 'SUCCESS'
        },
        error: {
            icon: <AlertOctagon className="w-7 h-7" />,
            iconBg: 'bg-red-500/10',
            iconColor: 'text-red-400',
            border: 'border-red-500/20',
            glow: 'from-red-500/10 to-transparent',
            badge: 'bg-red-500/10 text-red-400 border-red-500/20',
            badgeText: 'REJECTED'
        },
        warning: {
            icon: <AlertTriangle className="w-7 h-7" />,
            iconBg: 'bg-amber-500/10',
            iconColor: 'text-amber-400',
            border: 'border-amber-500/20',
            glow: 'from-amber-500/10 to-transparent',
            badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
            badgeText: 'WARNING'
        },
        info: {
            icon: <Info className="w-7 h-7" />,
            iconBg: 'bg-blue-500/10',
            iconColor: 'text-blue-400',
            border: 'border-blue-500/20',
            glow: 'from-blue-500/10 to-transparent',
            badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            badgeText: 'INFO'
        }
    }

    const c = config[popup.type]

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={`relative w-full max-w-md bg-[#0C0C0C] border ${c.border} rounded-[2rem] overflow-hidden shadow-2xl animate-[fadeInScale_0.2s_ease-out]`}
                style={{ animation: 'fadeInScale 0.2s ease-out' }}
            >
                {/* Top glow accent */}
                <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${c.glow} pointer-events-none`} />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200 z-10"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Content */}
                <div className="relative p-8 pt-10">
                    {/* Icon + Badge */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-2xl ${c.iconBg} flex items-center justify-center ${c.iconColor} flex-shrink-0`}>
                            {c.icon}
                        </div>
                        <div>
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-widest border ${c.badge} mb-1`}>
                                {c.badgeText}
                            </span>
                            <h3 className="text-white font-black text-lg leading-tight">{popup.title}</h3>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/5 mb-6" />

                    {/* Message */}
                    <div className="space-y-2 mb-8">
                        {popup.message.split('\n').map((line, i) => (
                            line.trim() ? (
                                <p key={i} className={`text-sm leading-relaxed ${line.startsWith('•') || line.startsWith('✓') || line.startsWith('❌') ? 'text-gray-300 pl-2' : 'text-gray-400'}`}>
                                    {line}
                                </p>
                            ) : <div key={i} className="h-1" />
                        ))}
                    </div>

                    {/* Dismiss button */}
                    <button
                        onClick={onClose}
                        className={`w-full py-3.5 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all duration-300 ${
                            popup.type === 'success'
                                ? 'bg-emerald-500 hover:bg-emerald-400 text-black'
                                : popup.type === 'error'
                                ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20'
                                : popup.type === 'warning'
                                ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20'
                                : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                        }`}
                    >
                        {popup.type === 'success' ? 'Continue' : 'Dismiss'}
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.92) translateY(8px); }
                    to   { opacity: 1; transform: scale(1)    translateY(0px); }
                }
            `}</style>
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DocumentVerification() {
    const { carId } = useParams()
    const { user } = useAuth()
    const { bookingState, updateBooking } = useBooking()
    const [isUploading, setIsUploading] = useState(false)

    const [uploads, setUploads] = useState({
        licenseFront: !!bookingState.addOns?.includes('licenseFront'),
        licenseBack: !!bookingState.addOns?.includes('licenseBack'),
        aadhaarFront: !!bookingState.addOns?.includes('aadhaarFront'),
        aadhaarBack: !!bookingState.addOns?.includes('aadhaarBack'),
        selfie: !!bookingState.addOns?.includes('selfie')
    })

    const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({})

    // AUTOFILL PREVIOUSLY VERIFIED DOCUMENTS
    React.useEffect(() => {
        const fetchExistingDocs = async () => {
            if (!user) return
            
            try {
                const { data: { session } } = await supabase.auth.getSession()
                if (!session?.access_token) return

                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/user-data/documents`, {
                    headers: {
                        'Authorization': `Bearer ${session.access_token}`
                    }
                })

                if (!response.ok) throw new Error('Failed to fetch existing documents')
                const result = await response.json()
                const data = result.documents

                if (data && data.length > 0) {
                    const docs = data[0]
                    const newUploads = { ...uploads }
                    const newAddOns = [...(bookingState.addOns || [])]

                    const mapping = [
                        { key: 'aadhaarFront', url: docs.aadhaar_front_url },
                        { key: 'aadhaarBack', url: docs.aadhaar_back_url },
                        { key: 'licenseFront', url: docs.dl_front_url },
                        { key: 'licenseBack', url: docs.dl_back_url },
                        { key: 'selfie', url: docs.passport_photo_url }
                    ]

                    mapping.forEach(({ key, url }) => {
                        if (url) {
                            newUploads[key as keyof typeof uploads] = true
                            if (!newAddOns.includes(key)) newAddOns.push(key)
                        }
                    })

                    setUploads(newUploads)
                    updateBooking({ addOns: newAddOns })
                    
                    if (mapping.some(m => m.url)) {
                        toast.success('Previously verified documents linked to this booking.')
                    }
                }
            } catch (err) {
                console.error('Error fetching existing documents:', err)
            }
        }

        fetchExistingDocs()
    }, [user])

    const [popup, setPopup] = useState<PopupState>({
        isOpen: false,
        title: '',
        message: '',
        type: 'info'
    })

    const showPopup = (p: { title: string; message: string; type: 'success' | 'error' | 'warning' | 'info' }) => {
        setPopup({ isOpen: true, ...p })
    }

    const closePopup = () => setPopup(prev => ({ ...prev, isOpen: false }))

    const typeMapping: Record<string, string> = {
        aadhaarFront: 'aadhaar_front',
        aadhaarBack: 'aadhaar_back',
        licenseFront: 'dl_front',
        licenseBack: 'dl_back',
        selfie: 'passport_photo'
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: keyof typeof uploads) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        const toastId = toast.loading(`Encrypting and uploading ${type.replace(/([A-Z])/g, ' $1').toLowerCase()}...`)

        if (!user) {
            toast.error('Authentication required. Please log in.', { id: toastId })
            setIsUploading(false)
            return
        }

        try {
            const formData = new FormData()
            formData.append('document', file)
            formData.append('userId', user.id)
            formData.append('bookingId', carId || 'new-booking')
            formData.append('documentType', typeMapping[type] || 'other')

            let response: Response
            try {
                response = await fetch('http://localhost:5000/api/documents/upload', {
                    method: 'POST',
                    body: formData
                })
            } catch {
                toast.dismiss(toastId)
                setIsUploading(false)
                showPopup({
                    title: 'Validation Server Offline',
                    message: 'The document validation backend is not running.\n\nTo start it:\n• Open a terminal\n• Navigate to the backend/ folder\n• Run: node server.js\n\nThen try uploading again.',
                    type: 'warning'
                })
                return
            }

            const data = await response.json()

            if (!data.success) {
                toast.error('Upload rejected', { id: toastId })
                showPopup({
                    title: data.popup?.title || 'Upload Failed',
                    message: data.popup?.message || data.error || 'Document rejected.',
                    type: data.popup?.type || 'error'
                })
                return
            }

            // Success — store preview URL from local file
            const localPreviewUrl = URL.createObjectURL(file)
            setPreviewUrls(prev => ({ ...prev, [type]: localPreviewUrl }))
            setUploads(prev => ({ ...prev, [type]: true }))
            const currentAddOns = bookingState.addOns || []
            if (!currentAddOns.includes(type)) {
                updateBooking({ addOns: [...currentAddOns, type] })
            }
            toast.success('Document uploaded successfully', { id: toastId })

            if (data.popup) {
                showPopup({
                    title: data.popup.title,
                    message: data.popup.message,
                    type: 'success'
                })
            }

        } catch (error: any) {
            console.error('Upload Error:', error)
            toast.error('Upload failed. Please retry.', { id: toastId })
        } finally {
            setIsUploading(false)
        }
    }

    const handleRemove = (type: keyof typeof uploads) => {
        setUploads(prev => ({ ...prev, [type]: false }))
        setPreviewUrls(prev => {
            const next = { ...prev }
            delete next[type]
            return next
        })
        const currentAddOns = bookingState.addOns || []
        updateBooking({ addOns: currentAddOns.filter(a => a !== type) })
    }

    const isComplete = Object.values(uploads).every(v => v === true)

    return (
        <>
            <ValidationPopup popup={popup} onClose={closePopup} />

            <BookingLayout
                step={5}
                title="Premium Verification"
                subtitle="Luxedive Secure Identity Protocol — Mandatory for security clearance."
                nextDisabled={!isComplete || isUploading}
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 pb-20">
                    {/* VAULT INTERFACE */}
                    <div className="lg:col-span-8 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <UploadSlot
                                label="License (Front)"
                                type="licenseFront"
                                isDone={uploads.licenseFront}
                                onUpload={(e) => handleFileUpload(e, 'licenseFront')}
                                onRemove={() => handleRemove('licenseFront')}
                                previewUrl={previewUrls['licenseFront']}
                                icon={<FileText className="w-5 h-5" />}
                            />
                            <UploadSlot
                                label="License (Back)"
                                type="licenseBack"
                                isDone={uploads.licenseBack}
                                onUpload={(e) => handleFileUpload(e, 'licenseBack')}
                                onRemove={() => handleRemove('licenseBack')}
                                previewUrl={previewUrls['licenseBack']}
                                icon={<FileText className="w-5 h-5" />}
                            />
                            <UploadSlot
                                label="Identity (Front)"
                                type="aadhaarFront"
                                isDone={uploads.aadhaarFront}
                                onUpload={(e) => handleFileUpload(e, 'aadhaarFront')}
                                onRemove={() => handleRemove('aadhaarFront')}
                                previewUrl={previewUrls['aadhaarFront']}
                                icon={<Shield className="w-5 h-5" />}
                            />
                            <UploadSlot
                                label="Identity (Back)"
                                type="aadhaarBack"
                                isDone={uploads.aadhaarBack}
                                onUpload={(e) => handleFileUpload(e, 'aadhaarBack')}
                                onRemove={() => handleRemove('aadhaarBack')}
                                previewUrl={previewUrls['aadhaarBack']}
                                icon={<Shield className="w-5 h-5" />}
                            />
                            <UploadSlot
                                label="Biometric Selfie"
                                type="selfie"
                                isDone={uploads.selfie}
                                onUpload={(e) => handleFileUpload(e, 'selfie')}
                                onRemove={() => handleRemove('selfie')}
                                previewUrl={previewUrls['selfie']}
                                icon={<Camera className="w-5 h-5" />}
                                isBiometric
                            />
                        </div>

                        {/* SECURITY ADVISORY */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative p-10 bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] flex items-start gap-6 overflow-hidden">
                                <LockIcon className="absolute -right-4 -bottom-4 w-32 h-32 text-white/[0.02] -rotate-12" />
                                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-6 h-6 text-amber-500" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-2 font-mono">Vault Protocol v2.4</h4>
                                    <p className="text-[11px] text-gray-500 leading-relaxed font-light uppercase tracking-tight">
                                        All documents are processed through our proprietary Luxedive Secure Protocol.
                                        Data is encrypted in transit and purged upon booking completion.
                                        <span className="text-amber-500/60 block mt-2">● High Resolution Originals Required for Handover.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TRUST CERTIFICATE SIDEBAR */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-b from-white/5 to-transparent rounded-[3rem] blur-sm opacity-50"></div>
                            <div className="relative p-8 bg-zinc-900/30 backdrop-blur-3xl border border-white/10 rounded-[3rem] space-y-8">
                                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                                    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Digital Certificate</h3>
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                </div>

                                <div className="space-y-8">
                                    <CertificateItem icon={<Cpu className="w-4 h-4" />} title="256-Bit Hardware Encryption" desc="End-to-end silicon level security" />
                                    <CertificateItem icon={<Globe className="w-4 h-4" />} title="Global Privacy Standard" desc="Fully GDPR & CCPA compliant" />
                                    <CertificateItem icon={<Fingerprint className="w-4 h-4" />} title="Biometric Matching" desc="AI-powered face validation" />
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                            <LockIcon className="w-3.5 h-3.5 text-amber-500" />
                                        </div>
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Secure Handshake Active</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-1000"
                                            style={{ width: `${(Object.values(uploads).filter(Boolean).length / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 border border-white/5 rounded-[3rem] bg-black/40 flex flex-col items-center text-center gap-4">
                            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] leading-loose max-w-[200px]">
                                LUXEDIVE Concierge is monitoring this connection.
                            </p>
                        </div>
                    </div>
                </div>
            </BookingLayout>
        </>
    )
}

function CertificateItem({ icon, title, desc }: any) {
    return (
        <div className="flex gap-4 group/item">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 group-hover/item:text-amber-500 group-hover/item:border-amber-500/20 transition-all duration-500">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{title}</p>
                <p className="text-[9px] text-gray-600 uppercase tracking-tighter">{desc}</p>
            </div>
        </div>
    )
}

function UploadSlot({ label, type, isDone, onUpload, onRemove, previewUrl, icon, isBiometric }: any) {
    const inputRef = React.useRef<HTMLInputElement>(null)

    return (
        <div className={`relative aspect-[4/5] rounded-[2.5rem] border transition-all duration-700 group overflow-hidden ${
            isDone
                ? 'bg-emerald-500/[0.03] border-emerald-500/20'
                : 'bg-white/[0.02] backdrop-blur-md border-white/5 hover:border-amber-500/30'
        }`}>

            {/* Hidden file input — only active when NOT done */}
            {!isDone && (
                <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                    onChange={onUpload}
                    accept="image/jpeg,image/jpg,image/png"
                />
            )}

            {/* Hidden input for re-upload (change) */}
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={onUpload}
                accept="image/jpeg,image/jpg,image/png"
            />

            {/* ── DONE STATE: preview + actions ── */}
            {isDone ? (
                <div className="relative h-full flex flex-col">
                    {/* Solid dark background — no photo preview (admin verifies) */}
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-emerald-900/5" />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-6">
                        {/* Top: check badge */}
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-black flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full">
                                Uploaded
                            </span>
                        </div>

                        {/* Label */}
                        <div>
                            <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-3">{label}</h4>

                            {/* Action buttons */}
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => inputRef.current?.click()}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-gray-400 hover:text-amber-400 transition-all duration-200 text-[9px] font-bold uppercase tracking-widest"
                                >
                                    <RefreshCw className="w-3 h-3" />
                                    Change
                                </button>
                                <button
                                    type="button"
                                    onClick={onRemove}
                                    className="flex items-center justify-center w-9 py-2 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-gray-500 hover:text-red-400 transition-all duration-200"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Watermark shield */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-20deg] opacity-5 pointer-events-none">
                        <Shield className="w-32 h-32 text-emerald-500" />
                    </div>
                </div>
            ) : (
                /* ── EMPTY STATE ── */
                <div className="h-full p-8 flex flex-col justify-between">
                    {!isDone && (
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-amber-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    )}

                    <div className="flex justify-between items-start">
                        <div className="w-14 h-14 rounded-3xl flex items-center justify-center transition-all duration-700 shadow-2xl bg-white/5 text-gray-500 group-hover:text-amber-500 group-hover:scale-110">
                            {icon}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors duration-500">{label}</h4>
                        <div className="flex items-center gap-2">
                            <div className="h-[2px] rounded-full transition-all duration-700 w-6 bg-white/10 group-hover:w-16 group-hover:bg-amber-500/50"></div>
                            <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Pending</span>
                        </div>
                    </div>

                    {!isDone && (
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-amber-500/[0.05] to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-in-out pointer-events-none" />
                    )}

                    {isBiometric && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none group-hover:opacity-30 transition-opacity">
                            <div className="w-24 h-24 border-2 border-dashed border-amber-500 rounded-full animate-[spin_10s_linear_infinite]"></div>
                            <div className="absolute w-2 h-2 bg-amber-500 rounded-full"></div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
