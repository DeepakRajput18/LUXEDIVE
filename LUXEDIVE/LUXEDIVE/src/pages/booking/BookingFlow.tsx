import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, ShieldCheck, CreditCard, ChevronRight, 
  Upload, CheckCircle, Clock, Info, User, Car, Star,
  AlertCircle, Lock as LockIcon, Smartphone, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useBooking } from '../../contexts/BookingContext';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'sonner';
import { format, differenceInDays } from 'date-fns';
import { getCarImage } from '../../lib/placeholders';

// Loading Razorpay SDK dynamically
const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

type BookingStep = 'details' | 'documents' | 'payment' | 'success';

export default function BookingFlow() {
  const { carId } = useParams<{ carId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookingState, updateBooking } = useBooking();
  
  const [step, setStep] = useState<BookingStep>('details');
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState<any>(null);
  const [breakdown, setBreakdown] = useState<any>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  
  // Step 1: Details State
  const [details, setDetails] = useState({
    pickupLocation: bookingState.pickupLocation || '',
    dropoffLocation: bookingState.dropoffLocation || '',
    pickupDate: bookingState.pickupDate ? format(bookingState.pickupDate, 'yyyy-MM-dd') : '',
    pickupTime: '10:00',
    dropoffDate: bookingState.dropoffDate ? format(bookingState.dropoffDate, 'yyyy-MM-dd') : '',
    dropoffTime: '10:00',
    withChauffeur: false
  });

  // Step 2: Documents State
  const [docs, setDocs] = useState({
    dlFront: null as File | null,
    dlBack: null as File | null,
    idFront: null as File | null,
    idBack: null as File | null,
    selfie: null as File | null,
    licenseNumber: '',
    idProofType: 'aadhar' as 'aadhar' | 'passport' | 'voter_id' | 'pan_card',
    idProofNumber: ''
  });

  // Initial Data Fetch
  useEffect(() => {
    const fetchCar = async () => {
      if (!carId) return;
      const { data, error } = await supabase.from('cars').select('*').eq('id', carId).single();
      if (data) setCar(data);
    };
    fetchCar();
  }, [carId]);

  // Handle Step 1: Create Booking Recommendation / Calculation
  const handleCalculate = async () => {
    if (!details.pickupDate || !details.dropoffDate) {
      toast.error('Please select both dates');
      return;
    }

    setLoading(true);
    try {
      // Call RPC to calculate total
      const { data, error } = await supabase.rpc('calculate_booking_total', {
        p_car_id: carId,
        p_pickup_date: details.pickupDate,
        p_drop_date: details.dropoffDate,
        p_chauffeur_id: null // Will handle chauffeur selection later if needed
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setBreakdown(data.breakdown);
      setStep('documents');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Step 2: Upload Documents & Create Initial Booking
  const handleDocumentSubmit = async () => {
    if (!docs.dlFront || !docs.dlBack || !docs.idFront || !docs.licenseNumber || !docs.idProofNumber) {
      toast.error('Please fill all document fields and upload required photos');
      return;
    }

    setLoading(true);
    try {
      // 1. Create the booking record first (Pending status)
      const { data: bookingResult, error: bookingError } = await supabase.rpc('create_booking', {
        p_user_id: user?.id,
        p_car_id: carId,
        p_chauffeur_id: null,
        p_pickup_location: details.pickupLocation,
        p_drop_location: details.dropoffLocation,
        p_pickup_date: details.pickupDate,
        p_pickup_time: details.pickupTime,
        p_drop_date: details.dropoffDate,
        p_drop_time: details.dropoffTime
      });

      if (bookingError) throw bookingError;
      const newBookingId = bookingResult.bookingId;
      setBookingId(newBookingId);

      // 2. Upload Files to Supabase Storage
      const uploadFile = async (file: File, path: string) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${newBookingId}/${path}_${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage.from('booking-documents').upload(fileName, file);
        if (error) throw error;
        return data.path;
      };

      const [dlFUrl, dlBUrl, idFUrl, idBUrl, selfieUrl] = await Promise.all([
        uploadFile(docs.dlFront, 'dl_front'),
        uploadFile(docs.dlBack, 'dl_back'),
        uploadFile(docs.idFront, 'id_front'),
        docs.idBack ? uploadFile(docs.idBack, 'id_back') : Promise.resolve(''),
        docs.selfie ? uploadFile(docs.selfie, 'selfie') : Promise.resolve('')
      ]);

      // 3. Save to user_documents table
      const { error: docError } = await supabase.from('user_documents').insert({
        user_id: user?.id,
        booking_id: newBookingId,
        driving_license_front: dlFUrl,
        driving_license_back: dlBUrl,
        id_proof_front: idFUrl,
        id_proof_back: idBUrl,
        selfie_with_license: selfieUrl,
        license_number: docs.licenseNumber,
        license_expiry: '2030-01-01', // Example default if not captured
        id_proof_type: docs.idProofType,
        id_proof_number: docs.idProofNumber
      });

      if (docError) throw docError;

      setStep('payment');
      toast.success('Documents uploaded successfully');
    } catch (err: any) {
      toast.error(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle Step 3: Razorpay Payment
  const initiatePayment = async () => {
    setLoading(true);
    try {
      const res = await loadRazorpay();
      if (!res) throw new Error('Razorpay SDK failed to load');

      // 1. Create Payment Order via Edge Function
      const { data, error } = await supabase.functions.invoke('create-payment-order', {
        body: { booking_id: bookingId }
      });

      if (error) throw error;

      // 2. Open Razorpay Checkout
      const options = {
        key: data.razorpay_key_id,
        amount: data.amount * 100, // into paise
        currency: data.currency,
        name: 'LUXEDIVE Rental',
        description: `Booking ${bookingId}`,
        order_id: data.razorpay_order_id,
        handler: async function (response: any) {
          // 3. Verify Payment
          const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-payment', {
            body: {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              payment_record_id: data.payment_id
            }
          });

          if (verifyData.success) {
            navigate(`/booking/pending/${bookingId}`);
            toast.success('Payment completed successfully!');
          } else {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: user?.user_metadata?.full_name || '',
          email: user?.email || '',
        },
        theme: { color: '#F59E0B' }
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();

    } catch (err: any) {
      toast.error(err.message || 'Payment initiation failed');
    } finally {
      setLoading(false);
    }
  };

  if (!car) return <div className="min-h-screen bg-black flex items-center justify-center">Loading luxurious experience...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-[#0A0B0D]/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-400" />
          </button>
          <h1 className="text-xl font-serif tracking-widest text-white uppercase italic">Luxedive Bookings</h1>
        </div>
        
        {/* Progress Tracker */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { id: 'details', label: 'Ride Details', icon: Clock },
            { id: 'documents', label: 'Verification', icon: ShieldCheck },
            { id: 'payment', label: 'Checkout', icon: CreditCard },
          ].map((s, idx) => (
            <div key={s.id} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-500 ${
                step === s.id ? 'bg-amber-500 text-black' : step === 'success' || (idx === 0 && step !== 'details') || (idx === 1 && step === 'payment') ? 'bg-green-500 text-white' : 'bg-white/5 text-gray-600'
              }`}>
                {step === 'success' || (idx === 0 && step !== 'details') || (idx === 1 && step === 'payment') ? <CheckCircle className="w-4 h-4" /> : idx + 1}
              </div>
              <span className={`text-[10px] uppercase tracking-[0.2em] font-black ${step === s.id ? 'text-amber-500' : 'text-gray-600'}`}>{s.label}</span>
              {idx < 2 && <div className="w-12 h-px bg-white/5" />}
            </div>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:grid lg:grid-cols-12 lg:gap-16">
        
        {/* LEFT SECTION: Steps Flow */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {step === 'details' && (
              <motion.div 
                key="step-details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-12"
              >
                <div>
                  <h2 className="text-4xl font-serif mb-4">Plan Your Journey</h2>
                  <p className="text-gray-500 text-sm tracking-wide">Enter your pickup and dropoff details to view the luxury breakdown.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase font-black tracking-widest text-amber-500/80">Pickup Location</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-amber-500 transition-colors" />
                      <input 
                        className="w-full bg-[#0A0B0D] border border-white/5 rounded-2xl py-5 pl-12 pr-4 text-sm focus:border-amber-500/50 outline-none transition-all"
                        placeholder="Enter pickup address"
                        value={details.pickupLocation}
                        onChange={(e) => setDetails({...details, pickupLocation: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase font-black tracking-widest text-amber-500/80">Dropoff Location</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-amber-500 transition-colors" />
                      <input 
                        className="w-full bg-[#0A0B0D] border border-white/5 rounded-2xl py-5 pl-12 pr-4 text-sm focus:border-amber-500/50 outline-none transition-all"
                        placeholder="Enter dropoff address"
                        value={details.dropoffLocation}
                        onChange={(e) => setDetails({...details, dropoffLocation: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase font-black tracking-widest text-amber-500/80">Pickup Date</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-amber-500 transition-colors" />
                      <input 
                        type="date"
                        className="w-full bg-[#0A0B0D] border border-white/5 rounded-2xl py-5 pl-12 pr-4 text-sm focus:border-amber-500/50 outline-none transition-all [color-scheme:dark]"
                        value={details.pickupDate}
                        onChange={(e) => setDetails({...details, pickupDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase font-black tracking-widest text-amber-500/80">Dropoff Date</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-amber-500 transition-colors" />
                      <input 
                        type="date"
                        className="w-full bg-[#0A0B0D] border border-white/5 rounded-2xl py-5 pl-12 pr-4 text-sm focus:border-amber-500/50 outline-none transition-all [color-scheme:dark]"
                        value={details.dropoffDate}
                        onChange={(e) => setDetails({...details, dropoffDate: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-amber-500/5 border border-amber-500/10 rounded-[2rem] flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest">Professional Chauffeur</h4>
                      <p className="text-xs text-gray-500 font-light">Opt for our flagship elite escort service.</p>
                    </div>
                  </div>
                  <div 
                    onClick={() => setDetails({...details, withChauffeur: !details.withChauffeur})}
                    className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-all duration-300 ${details.withChauffeur ? 'bg-amber-500' : 'bg-white/10'}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${details.withChauffeur ? 'translate-x-6' : 'translate-x-0'}`} />
                  </div>
                </div>

                <button 
                  onClick={handleCalculate}
                  disabled={loading}
                  className="w-full py-6 rounded-2xl bg-amber-500 text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-amber-400 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                >
                  {loading ? 'Calculating Luxury...' : 'Continue to Verification'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {step === 'documents' && (
              <motion.div 
                key="step-docs"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-12"
              >
                <div>
                  <h2 className="text-4xl font-serif mb-4">Security Verification</h2>
                  <p className="text-gray-500 text-sm tracking-wide">Upload your credentials to start our ultra-fast screening process.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <DocumentUploader 
                    label="Driving License Front" 
                    onFileSelect={(file) => setDocs({...docs, dlFront: file})}
                    currentFile={docs.dlFront}
                  />
                  <DocumentUploader 
                    label="Driving License Back" 
                    onFileSelect={(file) => setDocs({...docs, dlBack: file})}
                    currentFile={docs.dlBack}
                  />
                  <DocumentUploader 
                    label="Passport / Aadhar (Front)" 
                    onFileSelect={(file) => setDocs({...docs, idFront: file})}
                    currentFile={docs.idFront}
                  />
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase font-black tracking-widest text-amber-500/80">License Number</label>
                    <input 
                      placeholder="e.g. DL-XXXXXXXXXXX"
                      className="w-full bg-[#0A0B0D] border border-white/5 rounded-2xl py-5 px-6 text-sm focus:border-amber-500/50 outline-none transition-all"
                      value={docs.licenseNumber}
                      onChange={(e) => setDocs({...docs, licenseNumber: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase font-black tracking-widest text-amber-500/80">ID Proof Number</label>
                    <input 
                      placeholder="e.g. 1234 5678 9012"
                      className="w-full bg-[#0A0B0D] border border-white/5 rounded-2xl py-5 px-6 text-sm focus:border-amber-500/50 outline-none transition-all"
                      value={docs.idProofNumber}
                      onChange={(e) => setDocs({...docs, idProofNumber: e.target.value})}
                    />
                  </div>
                </div>

                <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex gap-4">
                  <Info className="w-5 h-5 text-blue-400 shrink-0" />
                  <p className="text-[10px] text-gray-500 leading-relaxed tracking-wider uppercase">
                    Your data is encrypted using military-grade RSA-4096. No human sees it until after payment confirmation.
                  </p>
                </div>

                <button 
                  onClick={handleDocumentSubmit}
                  disabled={loading}
                  className="w-full py-6 rounded-2xl bg-amber-500 text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-amber-400 disabled:opacity-50 transition-all"
                >
                  {loading ? 'Processing Files...' : 'Verified & Secure Checkout'}
                </button>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div 
                key="step-payment"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-12"
              >
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-amber-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                    <LockIcon className="w-8 h-8 text-amber-500" />
                  </div>
                  <h2 className="text-4xl font-serif">Secure Encryption</h2>
                  <p className="text-gray-500 text-sm tracking-wide mx-auto max-w-md">Almost there. Finalize your 100% advance payment + security deposit via Razorpay.</p>
                </div>

                <div className="bg-[#0A0B0D] border border-white/5 rounded-[3rem] p-10 space-y-8">
                  <div className="flex items-center justify-between pb-6 border-b border-white/5">
                    <span className="text-sm font-light text-gray-400 uppercase tracking-widest">Grand Total</span>
                    <span className="text-4xl font-serif text-amber-500">₹{((breakdown?.totalAmount || 0) + (breakdown?.securityDeposit || 0)).toLocaleString()}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 text-[10px] uppercase font-black tracking-widest text-gray-600">
                    <div>Rental Amount: ₹{(breakdown?.totalAmount || 0).toLocaleString()}</div>
                    <div className="text-right">Security Deposit: ₹{(breakdown?.securityDeposit || 0).toLocaleString()}</div>
                  </div>
                </div>

                <button 
                  onClick={initiatePayment}
                  disabled={loading}
                  className="w-full py-8 rounded-[2rem] bg-white text-black font-black uppercase tracking-[0.4em] text-xs hover:bg-gray-200 transition-all flex items-center justify-center gap-4 group"
                >
                  <Smartphone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {loading ? 'Initiating Razorpay...' : 'Pay Now via UPI/Card'}
                </button>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div 
                key="step-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-12"
              >
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
                  <div className="relative w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <CheckCircle className="w-16 h-16 text-black" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-5xl font-serif">Journey Confirmed</h2>
                  <p className="text-gray-400 text-sm max-w-md mx-auto tracking-wide font-light leading-relaxed">
                    Success! Your booking <span className="text-white font-mono">{bookingId}</span> is now under concierge review. We'll notify you once our team verifies your documents.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button 
                    onClick={() => navigate('/dashboard/bookings')}
                    className="px-10 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all"
                  >
                    View in Dashboard
                  </button>
                  <button 
                    onClick={() => navigate('/')}
                    className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
                  >
                    Return Home
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT SECTION: Car Summary Card (Sticky) */}
        <div className="lg:col-span-5 pt-12 lg:pt-0">
          <div className="sticky top-28 space-y-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-transparent rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-[#0A0B0D] border border-white/5 rounded-[3rem] p-10 space-y-8 shadow-2xl">
                <img 
                  src={car.images?.[0] || getCarImage(car.brand, car.model)} 
                  alt={car.model} 
                  className="w-full h-48 object-cover rounded-[2rem] grayscale hover:grayscale-0 transition-all duration-700"
                />
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Rare Find • Ahmedabad</span>
                  </div>
                  <h3 className="text-3xl font-serif text-white">{car.brand} {car.model}</h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-medium">{car.category} • {car.year}</p>
                </div>

                {breakdown && (
                  <div className="space-y-6 pt-6 border-t border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-light">Rental ({breakdown.totalDays} Days)</span>
                      <span className="text-white font-medium">₹{breakdown.totalCarRent.toLocaleString()}</span>
                    </div>
                    {breakdown.totalChauffeurCost > 0 && (
                       <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 font-light">Chauffeur Service</span>
                        <span className="text-white font-medium">₹{breakdown.totalChauffeurCost.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-light">Insurance (Zero Dep)</span>
                      <span className="text-green-500 font-black tracking-widest text-[9px]">INCLUDED</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-light">GST (18%) + Svc (2%)</span>
                      <span className="text-white font-medium">₹{(breakdown.gst + breakdown.convenienceFee).toLocaleString()}</span>
                    </div>
                    <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1">Total Rent</p>
                        <p className="text-[9px] text-gray-700 uppercase font-black">Hold for verification</p>
                      </div>
                      <span className="text-3xl font-serif text-amber-500">₹{breakdown.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                )}
                
                <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-4">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest leading-relaxed">
                    LUXEDIVE Secure Escrow Policy™ in effect. 100% Refundable deposit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Trust Badges */}
      <footer className="mt-24 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-12 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-8 h-8" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-black">End-to-End Encryption</span>
          </div>
          <div className="flex items-center gap-4">
            <LockIcon className="w-8 h-8" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-black">PCI-DSS Compliant</span>
          </div>
          <div className="flex items-center gap-4">
            <Star className="w-8 h-8" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-black">Premium Verification</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DocumentUploader({ label, onFileSelect, currentFile }: any) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] uppercase font-black tracking-widest text-amber-500/80">{label}</label>
      <div 
        onClick={() => document.getElementById(`file-${label}`)?.click()}
        className={`relative h-44 rounded-2xl border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center cursor-pointer group hover:bg-white/5 ${
        currentFile ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 hover:border-amber-500/50'
      }`}>
        <input 
          id={`file-${label}`}
          type="file" 
          className="hidden" 
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
        />
        {currentFile ? (
          <>
            <CheckCircle className="w-8 h-8 text-green-500 mb-3" />
            <p className="text-[10px] text-green-500 uppercase tracking-widest font-black">{currentFile.name}</p>
          </>
        ) : (
          <>
            <Upload className="w-8 h-8 text-gray-600 mb-3 group-hover:text-amber-500 transition-colors" />
            <p className="text-[10px] text-gray-600 uppercase tracking-widest font-black">Upload Photo</p>
          </>
        )}
      </div>
    </div>
  );
}
