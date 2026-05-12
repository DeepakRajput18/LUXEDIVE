import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Upload, CheckCircle2, AlertCircle, FileText, Smartphone, ArrowRight, Loader2, Info, Lock as LockIcon } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'sonner';

const DocumentUpload: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
    const [documents, setDocuments] = useState({
        licenseFront: null as File | null,
        licenseBack: null as File | null,
        aadhaarFront: null as File | null,
        aadhaarBack: null as File | null,
        selfie: null as File | null
    });
    const [previews, setPreviews] = useState({
        licenseFront: '',
        licenseBack: '',
        aadhaarFront: '',
        aadhaarBack: '',
        selfie: ''
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: keyof typeof documents) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size exceeds 5MB limit');
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            toast.error('Invalid file type. Please upload JPG, PNG or PDF.');
            return;
        }

        setDocuments(prev => ({ ...prev, [type]: file }));
        
        // Preview for images
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, [type]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        } else {
            setPreviews(prev => ({ ...prev, [type]: 'pdf' }));
        }
    };

    const uploadFile = async (file: File, type: string) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${bookingId}_${type}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `booking-docs/${bookingId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('documents')
            .getPublicUrl(filePath);

        return { type, url: publicUrl, path: filePath };
    };

    const handleSubmit = async () => {
        const requiredFields: (keyof typeof documents)[] = ['licenseFront', 'licenseBack', 'aadhaarFront', 'selfie'];
        const missing = requiredFields.filter(field => !documents[field]);

        if (missing.length > 0) {
            toast.error('Please upload all required documents.');
            return;
        }

        setIsUploading(true);
        try {
            const uploadPromises = Object.entries(documents)
                .filter(([_, file]) => file !== null)
                .map(([type, file]) => uploadFile(file!, type));

            const uploadedDocs = await Promise.all(uploadPromises);

            // Create a single document record mapping types to columns
            const docData: any = {
                booking_id: bookingId,
                status: 'pending',
                verification_status: 'pending'
            };

            const typeMap: { [key: string]: string } = {
                licenseFront: 'dl_front_url',
                licenseBack: 'dl_back_url',
                aadhaarFront: 'aadhaar_front_url',
                aadhaarBack: 'aadhaar_back_url',
                selfie: 'passport_photo_url'
            };

            uploadedDocs.forEach(doc => {
                if (typeMap[doc.type]) {
                    docData[typeMap[doc.type]] = doc.url;
                }
            });

            // Record in database - Upsert by booking_id
            const { error: dbError } = await supabase
                .from('user_documents')
                .upsert(docData, { onConflict: 'booking_id' });

            if (dbError) throw dbError;

            // Update booking status
            const { error: bookingError } = await supabase
                .from('bookings')
                .update({ 
                    status: 'document_submitted',
                    documents_status: 'pending'
                })
                .eq('id', bookingId);

            if (bookingError) throw bookingError;

            toast.success('Documents submitted successfully! Our team will verify them shortly.');
            navigate(`/booking/confirmation/${bookingId}`);

        } catch (error: any) {
            console.error('Upload error:', error);
            toast.error('Failed to upload documents. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const DocSlot = ({ type, label, description, required = false }: { type: keyof typeof documents, label: string, description: string, required?: boolean }) => (
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        {label} {required && <span className="text-amber-500">*</span>}
                    </h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter mt-1">{description}</p>
                </div>
                {documents[type] && <CheckCircle2 className="w-5 h-5 text-green-500" />}
            </div>

            <div className="relative aspect-video bg-black rounded-lg border border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500/50 transition-all mt-4 overflow-hidden group">
                <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    onChange={(e) => handleFileChange(e, type)}
                    accept="image/*,.pdf"
                />
                
                {previews[type] ? (
                    previews[type] === 'pdf' ? (
                        <div className="flex flex-col items-center gap-2">
                            <FileText className="w-8 h-8 text-amber-500" />
                            <span className="text-xs text-gray-400">{documents[type]?.name}</span>
                        </div>
                    ) : (
                        <img src={previews[type]} alt={label} className="w-full h-full object-cover" />
                    )
                ) : (
                    <div className="flex flex-col items-center gap-2 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-gray-600 group-hover:text-amber-500" />
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Click to Upload</span>
                    </div>
                )}
                
                {documents[type] && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-amber-500 px-3 py-1 rounded">Change File</span>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-amber-500/30">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                            <Shield className="text-black w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-lg font-serif font-bold tracking-widest">SECURE VERIFICATION</h1>
                            <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Identification Required</p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Payment Confirmed</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Identity Check</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="flex items-center gap-3 opacity-30">
                            <div className="w-4 h-4 border border-white/50 rounded-full" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Confirm Booking</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left: Content */}
                    <div className="flex-1">
                        <div className="mb-10">
                            <h2 className="text-4xl font-serif font-medium mb-4 text-white">Upload Documents</h2>
                            <p className="text-gray-400 leading-relaxed max-w-xl">
                                To complete your luxury experience, we require mandatory legal verification. Your data is encrypted and stored in our secure vault.
                            </p>
                            
                            <div className="mt-8 flex flex-wrap gap-4">
                                <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-lg flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-amber-500" />
                                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Originals Required for Pickup</span>
                                </div>
                                <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-lg flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-blue-400" />
                                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">256-Bit Encryption Active</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DocSlot 
                                type="licenseFront" 
                                label="Driving License (Front)" 
                                description="Clear photo showing license number" 
                                required 
                            />
                            <DocSlot 
                                type="licenseBack" 
                                label="Driving License (Back)" 
                                description="Reverse side with address details" 
                                required 
                            />
                            <DocSlot 
                                type="aadhaarFront" 
                                label="Aadhaar / ID Card" 
                                description="Government issued identification" 
                                required 
                            />
                            <DocSlot 
                                type="selfie" 
                                label="Selfie Verification" 
                                description="Real-time portrait for face match" 
                                required 
                            />
                        </div>

                        <div className="mt-12 bg-zinc-900/50 border border-white/5 rounded-2xl p-8">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                                        <Info className="w-6 h-6 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white mb-1">Double check your uploads</p>
                                        <p className="text-xs text-gray-500">Ensure all text is legible and photos are not blurry. Rejected documents will delay your rental.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isUploading}
                                    className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-amber-500 hover:text-black transition-all flex items-center gap-3 disabled:opacity-50 group"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Complete Verification
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Sidebar Info */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <div className="sticky top-32 space-y-6">
                            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Security Standards</h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                            <LockIcon className="w-4 h-4 text-green-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white uppercase tracking-wider mb-1">Encrypted Transit</p>
                                            <p className="text-[10px] text-gray-500 leading-relaxed uppercase">TLS 1.3 protocol protects every byte sent.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white uppercase tracking-wider mb-1">GDPR Compliant</p>
                                            <p className="text-[10px] text-gray-500 leading-relaxed uppercase">Data handled according to global privacy laws.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                            <Smartphone className="w-4 h-4 text-amber-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white uppercase tracking-wider mb-1">OVD Verified</p>
                                            <p className="text-[10px] text-gray-500 leading-relaxed uppercase">Official Valid Documents Only.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest leading-loose">
                                    Need assistance? Contact our 24/7 Concierge at <span className="text-amber-500">+91 1800-LUXEDIVE</span> or use the live chat for priority support.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DocumentUpload;
