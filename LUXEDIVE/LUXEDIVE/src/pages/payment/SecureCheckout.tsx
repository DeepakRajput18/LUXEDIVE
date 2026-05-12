import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, ShieldCheck, FileText, Upload, Lock as LockIcon, CreditCard, Banknote, Smartphone, Info, ChevronRight, HelpCircle, Globe, Clock, User, QrCode, Loader2, AlertTriangle, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useBooking } from '../../contexts/BookingContext';
import { useAuth } from '../../contexts/AuthContext';
import { normalizeDailyRate } from '../../lib/pricingUtils';
import { toast } from 'sonner';
import { paymentService } from '../../services/paymentService';
import { getCarImage } from '../../lib/placeholders';
import { trackEvent } from '../../services/analyticsService';
import BookingLayout from '../../components/layout/BookingLayout';

const SecureCheckout: React.FC = () => {
    const navigate = useNavigate();
    const { carId } = useParams();
    const { bookingState, updateBooking } = useBooking();
    const { user } = useAuth();
    const [paymentMethod, setPaymentMethod] = useState<string>('stripe');
    const [gateways, setGateways] = useState<any[]>([]);
    const [timeLeft, setTimeLeft] = useState<number | null>(null); // Initialized in useEffect
    const [isProcessing, setIsProcessing] = useState(false);
    const [upiOption, setUpiOption] = useState<'qr' | 'id'>('qr');
    const [isQrBlurred, setIsQrBlurred] = useState(true);
    const [paymentVerifying, setPaymentVerifying] = useState(false);

    // UPI QR Specific State
    const [showQrStep, setShowQrStep] = useState(false);
    const [txnId, setTxnId] = useState('');
    const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [qrTimeLeft, setQrTimeLeft] = useState(600); // 10 Minutes for QR step
    const [realTime, setRealTime] = useState(new Date());
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalError, setModalError] = useState<{title: string, message: string}>({ title: '', message: '' });

    useEffect(() => {
        const timer = setInterval(() => setRealTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Initialize Persistent Timer
        const STORAGE_KEY = `lxd_payment_expiry_${carId || 'global'}`;
        const storedExpiry = localStorage.getItem(STORAGE_KEY);
        let finalExpiry: number;

        if (storedExpiry) {
            finalExpiry = parseInt(storedExpiry, 10);
            const remaining = Math.floor((finalExpiry - Date.now()) / 1000);
            
            if (remaining <= 0) {
                // Already expired
                localStorage.removeItem(STORAGE_KEY);
                finalExpiry = Date.now() + 15 * 60 * 1000;
                localStorage.setItem(STORAGE_KEY, finalExpiry.toString());
                setTimeLeft(900);
            } else {
                setTimeLeft(remaining);
            }
        } else {
            // Fresh session
            finalExpiry = Date.now() + 15 * 60 * 1000;
            localStorage.setItem(STORAGE_KEY, finalExpiry.toString());
            setTimeLeft(900);
        }

        // Fetch Gateways
        supabase.from('payment_gateways')
            .select('*')
            .eq('is_active', true)
            .order('is_default', { ascending: false })
            .then(({ data }) => {
                const manualUpi = { 
                    id: 'manual-upi', 
                    gateway_name: 'upi_qr', 
                    provider_name: 'upi_qr',
                    is_active: true 
                };

                if (data && data.length > 0) {
                    const filteredData = data.filter(g => g.gateway_name !== 'cash');
                    setGateways([...filteredData, manualUpi]);
                    if (filteredData.length > 0) {
                        setPaymentMethod(filteredData[0].gateway_name);
                    }
                } else {
                    setGateways([
                        { id: '1', gateway_name: 'stripe', is_default: true },
                        manualUpi
                    ]);
                    setPaymentMethod('stripe');
                }
            });
    }, []);

    useEffect(() => {
        if (!showQrStep || qrTimeLeft <= 0) return;

        const timer = setInterval(() => {
            setQrTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setShowQrStep(false);
                    toast.error('Payment window expired.');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [showQrStep, qrTimeLeft]);

    const triggerErrorModal = (title: string, message: string) => {
        setModalError({ title, message });
        setShowErrorModal(true);
        setIsProcessing(false);
    };

    const formatBookingDate = (date: Date) => date.toISOString().split('T')[0];
    const formatBookingTime = (date: Date) => date.toTimeString().split(' ')[0];

    useEffect(() => {
        if (timeLeft === null) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === null) return null;
                if (prev <= 1) {
                    clearInterval(timer);
                    const STORAGE_KEY = `lxd_payment_expiry_${carId || 'global'}`;
                    localStorage.removeItem(STORAGE_KEY);
                    toast.error('Session expired. Please restart your booking.');
                    navigate('/fleet');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [navigate, carId, timeLeft === null]);

    const formatTime = (seconds: number | null) => {
        if (seconds === null) return '15:00';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const validateBooking = (): boolean => {
        if (!bookingState.carDetails || !bookingState.carId) {
            triggerErrorModal('Dossier Error', 'Vehicle information is missing. Please select a vehicle.');
            return false;
        }

        if (!bookingState.pickupDate || !bookingState.dropoffDate) {
            triggerErrorModal('Timeline Error', 'Pickup and dropoff dates are required.');
            return false;
        }

        const days = bookingState.duration || 0;
        if (days <= 0) {
            triggerErrorModal('Duration Invalid', 'Invalid booking duration. Please check your dates.');
            return false;
        }

        const dailyRate = normalizeDailyRate(bookingState.carDetails);
        const totalPrice = dailyRate * days;

        if (!totalPrice || totalPrice <= 0 || isNaN(totalPrice)) {
            triggerErrorModal('Pricing Error', 'Invalid total amount. Please review your booking.');
            return false;
        }

        if (!paymentMethod) {
            triggerErrorModal('Gateway Error', 'Please select a payment method.');
            return false;
        }

        if (paymentMethod === 'upi_qr') {
            const utrRegex = /^\d{12}$/;
            if (!txnId) {
                triggerErrorModal('Verification Mandatory', 'UTR ID is mandatory for manual verification.');
                return false;
            }
            if (!utrRegex.test(txnId)) {
                triggerErrorModal('Protocol Refused', 'Please enter a valid 12-digit numeric UTR ID.');
                return false;
            }
            if (!screenshotFile) {
                triggerErrorModal('Evidence Required', 'Payment screenshot is mandatory. Please upload the transfer receipt.');
                return false;
            }
            if (screenshotFile.size > 5 * 1024 * 1024) {
                triggerErrorModal('Asset Too Large', 'Screenshot exceeds 5MB limit. Please upload a smaller image.');
                return false;
            }
        }

        return true;
    };

    const handleCompleteBooking = async () => {
        console.log('--- 💳 SecureCheckout: handleCompleteBooking started ---');
        if (!validateBooking()) {
            console.warn('Validation failed in handleCompleteBooking');
            toast.error('Payment Verification Required', {
                description: (
                    <div className="space-y-1">
                        <p>Please complete payment verification:</p>
                        <p>• Enter exact 12-digit numeric UTR ID</p>
                        <p>• Upload payment screenshot (Max 5MB)</p>
                    </div>
                ),
                duration: 5000
            });
            return;
        }

        const loadingToast = toast.loading('Initializing Secure Transaction...');
        setIsProcessing(true);
        
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("The transaction timed out. Please check your network and try again.")), 15000)
        );

        try {
            console.time('BookingProcess');
            console.log('TRACE: Starting Protocol Execution');
            // Wrap the entire logic in a timeout-protected race
            await Promise.race([
                (async () => {
            console.log('TRACE: Protocol Logic Initialized');
            const dailyRate = normalizeDailyRate(bookingState.carDetails!);
            let finalCarId: string = bookingState?.carDetails?.id || bookingState?.carId || ''
            
            console.log('Step 2: Database Handshake - Validating Vehicle ID:', finalCarId);
            const { data: carData, error: carError } = await supabase
                .from('cars')
                .select('brand, model, category')
                .eq('id', finalCarId)
                .single();

            if (carError) console.warn('Vehicle Metadata Lookup Error (non-fatal):', carError);
            else console.log('Vehicle Authenticated:', carData);

            console.log('Final Car ID:', finalCarId);
            const finalTotal = bookingState.totalPrice || (dailyRate * (bookingState.duration || 1));
            console.log('Final Total:', finalTotal);

            if (!user?.id || !finalCarId || !bookingState.pickupDate || !bookingState.dropoffDate || !finalTotal) {
                console.error("Missing required booking data:", { 
                    userId: !!user?.id, 
                    carId: !!finalCarId, 
                    pickup: !!bookingState.pickupDate, 
                    dropoff: !!bookingState.dropoffDate, 
                    total: !!finalTotal 
                });
                triggerErrorModal("Incomplete Dossier", "Necessary reservation metadata is missing. Please re-verify your selection protocols.");
                return;
            }

            console.log('Step 3: Protocol Initiation - Inserting Primary Booking Record...');
            const pickupDateTime = bookingState.pickupDate!;
            const dropoffDateTime = bookingState.dropoffDate!;

            const generateBookingCode = () => {
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const nums = '0123456789';
                let code = 'LXD-';
                for (let i = 0; i < 3; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
                code += '-';
                for (let i = 0; i < 4; i++) code += nums.charAt(Math.floor(Math.random() * nums.length));
                return code;
            };

            const bookingData = {
                user_id: user.id,
                car_id: finalCarId,
                booking_code: generateBookingCode(),
                pickup_date: formatBookingDate(bookingState.pickupDate!),
                pickup_time: formatBookingTime(bookingState.pickupDate!),
                drop_date: formatBookingDate(bookingState.dropoffDate!),
                drop_time: formatBookingTime(bookingState.dropoffDate!),
                total_days: bookingState.duration || 1,
                car_rent_per_day: dailyRate,
                total_car_rent: dailyRate * (bookingState.duration || 1),
                total_price: finalTotal,
                security_deposit_amount: bookingState.carDetails?.deposit_amount || 0,
                pickup_location: bookingState.pickupLocation || 'Main Branch',
                status: 'payment_initiated'
            };

            console.log('Step 3: Protocol Initiation - Inserting Primary Booking Record...');
            const { data: dbResult, error: dbError } = await supabase
                .from('bookings')
                .insert([bookingData])
                .select('id, status')
                .single();

            if (dbError) {
                console.error("Step 3 Failed: Booking Database Rejection:", dbError);
                triggerErrorModal("Database Rejection", dbError.message || "The institutional registry rejected this allocation.");
                return;
            }

            const bookingId = dbResult?.id;
            const rpcResult = { booking_id: bookingId, status: dbResult?.status, success: true };
            updateBooking({ totalPrice: finalTotal });

            if (paymentMethod === 'upi_qr') {
                // Remove showQrStep check - show UI immediately. 
                // showQrStep is now used to control the visual flow if needed, 
                // but we process submission directly here.

                // Handle Manual Proof Submission
                console.log('Step 4: Secure Asset Transfer - Starting evidence upload...');
                let screenshot_url = null;

                if (screenshotFile) {
                    const fileExt = screenshotFile.name.split('.').pop();
                    const fileName = `${bookingId}-${Date.now()}.${fileExt}`;
                    const filePath = `${user.id}/${fileName}`;

                    console.log('Step 4: Secure Asset Transfer - Starting evidence upload to [payment-proofs]...');
                    const { data: uploadData, error: uploadError } = await supabase.storage
                        .from('payment-proofs')
                        .upload(filePath, screenshotFile, {
                            cacheControl: '3600',
                            upsert: false
                        });

                    if (uploadError) {
                        console.error('Step 4 Failed: Vault Upload Error:', uploadError);
                        throw new Error("Screenshot upload failed: " + uploadError.message);
                    }
                    
                    const { data: { publicUrl } } = supabase.storage
                        .from('payment-proofs')
                        .getPublicUrl(filePath);
                    
                    screenshot_url = publicUrl;
                    console.log('TRACE: Verification evidence staged at:', screenshot_url);
                }

                console.log('TRACE: Step 5 - Transaction Record - Inserting payment proof...');
                const { error: proofError } = await supabase
                    .from('payment_proofs')
                    .insert([{
                        user_id: user.id,
                        booking_id: bookingId,
                        method: 'upi_qr',
                        transaction_id: txnId || null,
                        screenshot_url,
                        status: 'pending_verification'
                    }]);

                console.log('TRACE: Payment proof record completed. Error:', !!proofError);

                if (proofError) {
                    console.error('TRACE: Step 5 Failed: Proof Registry Error:', proofError);
                    throw new Error("Failed to store payment proof: " + proofError.message);
                }

                console.log('TRACE: Step 6 - Updating booking status to [under_verification]...');
                const { error: updateError } = await supabase
                    .from('bookings')
                    .update({ 
                        status: 'under_verification',
                        payment_status: 'pending_verification'
                    })
                    .eq('id', bookingId);

                console.log('TRACE: Status update completed - UPI flow successful.');

                toast.success('Payment Submitted Successfully!', {
                    description: 'We will confirm your booking shortly.',
                    duration: 5000
                });

                // Cleanup persistent timer
                const STORAGE_KEY = `lxd_payment_expiry_${carId || 'global'}`;
                localStorage.removeItem(STORAGE_KEY);

                console.log('TRACE: FINAL STEP - NAVIGATING TO PENDING PAGE [UPI]...');
                navigate(`/booking/pending/${bookingId}`, {
                    state: { 
                        bookingId, 
                        bookingData: { ...rpcResult, status: 'pending' },
                        manualVerification: true
                    }
                });
            } else {
                // Card Payment Path (Stripe Stub)
                console.log('TRACE: Card Payment Path - Finalizing Reservation...');
                
                toast.success('Reservation Initiated!', {
                    description: 'Finalizing your luxury allocation...',
                    duration: 3000
                });

                // Cleanup persistent timer
                const STORAGE_KEY = `lxd_payment_expiry_${carId || 'global'}`;
                localStorage.removeItem(STORAGE_KEY);

                console.log('TRACE: NAVIGATING TO PENDING PAGE [Card Flow]...');
                navigate(`/booking/pending/${bookingId}`, {
                    state: { 
                        bookingId, 
                        bookingData: { ...rpcResult, status: 'pending' },
                        stripeSimulation: true
                    }
                });
            }

                })(),
                timeoutPromise
            ]);
            
            console.timeEnd('BookingProcess');
            toast.dismiss(loadingToast);
        } catch (error: any) {
            console.timeEnd('BookingProcess');
            console.error('Booking Protocol Exception:', error);
            const errorMsg = error.message || 'The protocol was interrupted by an internal exception.';
            triggerErrorModal("Protocol Exception", errorMsg);
        }
    };

    const vehicleName = bookingState?.carDetails?.brand
        ? `${bookingState.carDetails.brand} ${bookingState.carDetails.model}`
        : 'Premium Vehicle';

    const totalPrice = bookingState.totalPrice || (bookingState?.carDetails
        ? normalizeDailyRate(bookingState.carDetails) * (bookingState.duration || 1)
        : 0);

    // Submission guard
    const isUpiValid = txnId.length === 12 && /^\d+$/.test(txnId) && screenshotFile !== null;

    return (
        <BookingLayout
            step={7}
            title="Institutional Escrow"
            subtitle="Final protocol for asset allocation & secure transit."
            onNext={handleCompleteBooking}
            isLoading={isProcessing || paymentVerifying}
            nextDisabled={(paymentMethod === 'upi_qr' && !isUpiValid) || isProcessing}
            blockedReasons={paymentMethod === 'upi_qr' && !isUpiValid ? ['UTR/Transaction ID is required', 'Payment screenshot is mandatory'] : []}
        >
            <main className="flex-1 max-w-7xl mx-auto w-full py-12 flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                    {/* BLOCKING MODAL POPUP */}
                {showErrorModal && (
                    <div className="fixed inset-0 z-[20000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                        <div className="bg-[#0B0D10] border border-red-500/30 rounded-[3rem] p-12 max-w-lg w-full shadow-[0_0_100px_rgba(239,68,68,0.15)] relative animate-in zoom-in-95 duration-500">
                            <button 
                                onClick={() => setShowErrorModal(false)}
                                className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-[2rem] bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-8 shadow-[0_0_40px_rgba(239,68,68,0.1)]">
                                    <AlertTriangle className="text-red-500 w-10 h-10" />
                                </div>
                                
                                <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Critical Protocol Alert</span>
                                <h3 className="text-3xl font-serif text-white mb-6 uppercase tracking-wider italic">{modalError.title}</h3>
                                
                                <div className="bg-black/60 p-8 rounded-2xl border border-white/5 mb-8 w-full">
                                    <p className="text-gray-400 text-sm leading-relaxed font-light italic">
                                        "{modalError.message}"
                                    </p>
                                </div>

                                <button
                                    onClick={() => setShowErrorModal(false)}
                                    className="w-full h-16 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-500 hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95"
                                >
                                    Acknowledge & Rectify
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-8">
                        <h2 className="text-2xl font-serif font-medium mb-2 text-white">Finalize Your Reservation</h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Complete your payment to secure your luxury vehicle. Your session is protected by military-grade encryption.
                        </p>
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 space-y-2">
                             <div className="flex items-center gap-2 text-amber-500">
                                <Info className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Mandatory Requirements</span>
                             </div>
                             <ul className="text-xs text-amber-200/80 list-disc pl-4 space-y-1">
                                <li>100% Advance payment required for conversion.</li>
                                <li>Driving License (Front & Back) and Aadhaar/ID proof required after payment.</li>
                                <li>Booking is non-refundable as per our premium asset allocation policy.</li>
                             </ul>
                        </div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-500" />
                            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Session Security Countdown</span>
                        </div>
                        <span className="text-xl font-mono font-bold text-amber-500">{formatTime(timeLeft)} <span className="text-xs">MIN</span></span>
                    </div>


                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {gateways.length === 0 ? (
                            [1, 2].map(i => (
                                <div key={i} className="h-24 bg-zinc-800 rounded-xl animate-pulse" />
                            ))
                        ) : (
                            gateways.map((gateway, index) => {
                                const isSelected = paymentMethod === gateway.gateway_name;
                                let Icon = Banknote;
                                let label = gateway.gateway_name;

                                if (gateway.gateway_name === 'stripe') { Icon = CreditCard; label = 'Card' }
                                else if (gateway.gateway_name === 'upi_qr') { Icon = QrCode; label = 'Scan & Pay (UPI)' }

                                return (
                                    <button
                                        key={gateway.id || `gateway-${index}`}
                                        onClick={() => {
                                            setPaymentMethod(gateway.gateway_name || '');
                                            // Ensure showQrStep is true immediately for UPI
                                            if (gateway.gateway_name === 'upi_qr') setShowQrStep(true);
                                            else setShowQrStep(false);
                                        }}
                                        className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${isSelected ? 'bg-amber-500/20 border-amber-500 text-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.15)]' : 'bg-zinc-900 border-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300'}`}
                                    >
                                        <Icon className="w-6 h-6" />
                                        <span className="text-xs font-bold uppercase">{label}</span>
                                    </button>
                                );
                            })
                        )}
                    </div>

                    <div className="bg-zinc-900 border border-white/5 rounded-xl p-6 shadow-xl mb-8">
                        {paymentMethod === 'stripe' && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Cardholder Name</label>
                                    <input type="text" placeholder="JAMESON STEELE" className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-all font-mono uppercase" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Card Number</label>
                                    <input type="text" placeholder="•••• •••• •••• 4242" className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-all font-mono tracking-wider" />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Expiry</label>
                                        <input type="text" placeholder="MM / YY" className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-all font-mono text-center" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">CVV</label>
                                        <input type="password" placeholder="•••" className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-all font-mono text-center" />
                                    </div>
                                </div>
                            </div>
                        )}


                        {paymentMethod === 'upi_qr' && (
                            <div className="animate-in slide-in-from-bottom duration-700">
                                <div className="flex flex-col items-center gap-6">
                                    <div className="text-center space-y-2 w-full">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 flex items-center gap-2">
                                                <Clock className="w-3 h-3 text-amber-500" />
                                                <span className="text-[10px] font-mono text-amber-200">{formatTime(qrTimeLeft)}</span>
                                            </div>
                                        </div>

                                        <div className="bg-black/40 border border-white/5 rounded-lg p-2 mb-4 flex justify-between items-center px-4">
                                            <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Protocol Timestamp</span>
                                            <span className="text-[10px] font-mono text-amber-500/80">
                                                {realTime.toLocaleDateString()} {realTime.toLocaleTimeString()}
                                            </span>
                                        </div>
                                        
                                        {/* UPI Option Tabs */}
                                        <div className="flex p-1 bg-black/50 border border-white/5 rounded-xl mb-6">
                                            <button 
                                                onClick={() => setUpiOption('qr')}
                                                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${upiOption === 'qr' ? 'bg-amber-500 text-black' : 'text-gray-500 hover:text-white'}`}
                                            >
                                                Scan QR (Recommended)
                                            </button>
                                            <button 
                                                onClick={() => setUpiOption('id')}
                                                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${upiOption === 'id' ? 'bg-amber-500 text-black' : 'text-gray-500 hover:text-white'}`}
                                            >
                                                Use UPI ID
                                            </button>
                                        </div>
                                    </div>

                                    {upiOption === 'qr' ? (
                                        <div 
                                            onClick={() => setIsQrBlurred(false)}
                                            className={`relative p-4 bg-white rounded-2xl shadow-xl cursor-pointer group overflow-hidden transition-all duration-700 border-4 ${isQrBlurred ? 'border-transparent' : 'border-amber-500 shadow-[0_0_30px_rgba(251,191,36,0.4)] scale-110'}`}
                                        >
                                            <img 
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=882432103@ptsbi&pn=LUXEDIVE&am=${totalPrice}&cu=INR`} 
                                                alt="UPI QR Code" 
                                                className={`w-48 h-48 transition-all duration-700 ${isQrBlurred ? 'blur-2xl opacity-50' : 'blur-0 opacity-100'}`}
                                            />
                                            {isQrBlurred && (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-black/5">
                                                    <QrCode className="w-10 h-10 text-black/60 mb-2 animate-bounce" />
                                                    <span className="text-[11px] font-black text-black uppercase tracking-widest">Tap to Reveal QR</span>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="w-full p-6 bg-black/50 border border-white/5 rounded-2xl flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
                                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                                <Smartphone className="w-6 h-6 text-amber-500" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Official UPI Address</p>
                                                <p className="text-lg font-mono text-white tracking-widest">882432103@ptsbi</p>
                                                <p className="text-[9px] text-gray-500 mt-2 uppercase">Use this UPI ID if QR scan is not working</p>
                                            </div>
                                            <button 
                                                onClick={() => { navigator.clipboard.writeText('882432103@ptsbi'); toast.success('UPI ID Copied to Clipboard') }} 
                                                className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-2"
                                            >
                                                <Check className="w-3 h-3" /> Copy Address
                                            </button>
                                        </div>
                                    )}

                                    <div className="w-full space-y-4 pt-4 border-t border-white/5">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center pr-1">
                                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Enter UTR / Transaction ID</label>
                                                    <span className="text-[9px] text-amber-500 uppercase font-black">Mandatory</span>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    placeholder="12-digit Transaction Reference" 
                                                    value={txnId}
                                                    maxLength={12}
                                                    onChange={(e) => setTxnId(e.target.value.replace(/[^0-9]/g, ''))}
                                                    className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-all font-mono tracking-widest text-sm"
                                                />
                                                <p className="text-[9px] text-gray-600 uppercase tracking-tighter italic">Exactly 12 digits, Numeric only</p>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center pr-1">
                                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Upload Payment Screenshot</label>
                                                    <span className="text-[9px] text-amber-500 uppercase font-black">Mandatory</span>
                                                </div>
                                                <div className="relative">
                                                    <input 
                                                        type="file" 
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file && file.size > 5 * 1024 * 1024) {
                                                                toast.error('File too large', { description: 'Max allowed size is 5MB' });
                                                                return;
                                                            }
                                                            setScreenshotFile(file || null);
                                                        }}
                                                        className="hidden" 
                                                        id="screenshot-upload"
                                                    />
                                                    <label 
                                                        htmlFor="screenshot-upload" 
                                                        className={`w-full h-32 bg-black border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group ${screenshotFile ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/10 hover:border-amber-500/50 hover:bg-amber-500/5'}`}
                                                    >
                                                        {screenshotFile ? (
                                                            <div className="flex flex-col items-center text-center p-4">
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <div className="w-10 h-10 bg-white/5 rounded-lg overflow-hidden border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                                                                        <img src={URL.createObjectURL(screenshotFile)} className="w-full h-full object-cover" />
                                                                    </div>
                                                                    <span className="text-xs text-emerald-400 font-bold truncate max-w-[150px]">{screenshotFile.name}</span>
                                                                </div>
                                                                <span className="text-[9px] text-emerald-500/60 uppercase tracking-widest font-black">Image Staged. Tap to Replace.</span>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <Upload className="w-6 h-6 text-gray-600 group-hover:text-amber-500 transition-all" />
                                                                <div className="text-center">
                                                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-mono">Select Transfer Evidence</p>
                                                                    <p className="text-[9px] text-gray-600">JPG / PNG • Max 5MB • Clear Image Only</p>
                                                                </div>
                                                            </>
                                                        )}
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="pt-2 space-y-2 border-t border-white/5 mt-4">
                                                <div className="flex items-start gap-2 text-emerald-500/80">
                                                    <Check className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                    <p className="text-[10px] font-medium tracking-tight">Payment will be verified within 60 minutes</p>
                                                </div>
                                                <div className="flex items-start gap-2 text-emerald-500/80">
                                                    <Check className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                    <p className="text-[10px] font-medium tracking-tight">Booking confirmation depends on verification</p>
                                                </div>
                                                <div className="flex items-start gap-2 text-red-400/80">
                                                    <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                    <p className="text-[10px] font-black uppercase tracking-tighter">Fake submissions will lead to cancellation</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>


                    
                    <div className="flex justify-center flex-wrap gap-4 mt-6 text-[10px] text-gray-500 font-bold uppercase tracking-widest items-center">
                        <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-green-500" /> PCI-DSS COMPLIANT</span>
                        <span className="w-1 h-1 bg-gray-700 rounded-full" />
                        <span className="flex items-center gap-1.5"><LockIcon className="w-3 h-3 text-green-500" /> SSL 256-BIT ENCRYPTED</span>
                    </div>
                </div>

                <div className="w-full md:w-80 flex-shrink-0">
                    <div className="sticky top-24">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Summary</h3>
                        <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                            <div className="h-40 bg-zinc-800 relative">
                                <img src={bookingState.carDetails?.images?.[0] || getCarImage(bookingState.carDetails?.brand ?? '', bookingState.carDetails?.model ?? '')} alt="Vehicle" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Selected Vehicle</p>
                                    <p className="font-serif font-medium text-lg">{vehicleName}</p>
                                </div>
                            </div>
                            <div className="p-6 bg-black text-white">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Amount Due</span>
                                    <span className="text-2xl font-serif text-amber-500">₹{totalPrice.toLocaleString()}</span>
                                </div>
                                <p className="text-[10px] text-gray-600 text-right">Includes taxes & fees</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </BookingLayout>
    );
};

export default SecureCheckout;
