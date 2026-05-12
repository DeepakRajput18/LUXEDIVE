import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../../../lib/supabaseClient'
import { CheckCircle, Calendar, MapPin, CreditCard, Download, ArrowRight, Phone, Shield, Printer, Clock } from 'lucide-react'
import { generateBookingReceipt } from '../../../utils/pdfGenerator'
import { toast } from 'sonner'
import { useBooking } from '../../../contexts/BookingContext'

interface BookingData {
    id: string
    car_id: string
    user_id: string
    pickup_datetime: string
    dropoff_datetime: string
    delivery_type: string
    delivery_address: string | null
    base_price: number
    total_price: number
    status: string
    payment_status: string
    payment_method?: string
    created_at: string
    chauffeur_details?: any
    chauffeur_pickup_datetime?: string
}

interface CarData {
    id: string
    brand: string
    model: string
    category: string
    transmission: string
    fuel_type: string
    images: string[]
}

export default function BookingConfirmation() {
    const { bookingId: paramBookingId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const { bookingState, resetBooking } = useBooking()
    
    const [booking, setBooking] = useState<BookingData | null>(location.state?.bookingData || null)
    const [car, setCar] = useState<CarData | null>(bookingState.carDetails as any || null)
    const [loading, setLoading] = useState(!bookingState.carDetails && !location.state?.bookingData)

    const parseJSDate = (dateStr: string | null | undefined) => {
        if (!dateStr) return new Date()
        const standardized = dateStr.replace(' ', 'T')
        const date = new Date(standardized)
        return isNaN(date.getTime()) ? new Date(dateStr) : date
    }

    useEffect(() => {
        const fetchBookingData = async () => {
            const bId = paramBookingId || location.state?.bookingId
            if (!bId && !bookingState.bookingId) {
                navigate('/fleet')
                return
            }

            try {
                if (!booking && bId) {
                    const { data: bookingData } = await supabase
                        .from('bookings')
                        .select('*')
                        .eq('id', bId)
                        .single()

                    if (bookingData) {
                        setBooking(bookingData)
                    }
                }

                if (!car && (booking?.car_id || bookingState.carId)) {
                    const { data: carData } = await supabase
                        .from('cars')
                        .select('*')
                        .eq('id', booking?.car_id || bookingState.carId)
                        .single()

                    if (carData) setCar(carData)
                }
            } catch (error) {
                console.error('Error fetching booking:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchBookingData()
    }, [paramBookingId, booking, car, bookingState.carId, navigate])

    if (loading && !bookingState.carDetails) {
        return (
            <div className="min-h-screen bg-luxe-black flex items-center justify-center">
                <div className="text-luxe-gold text-xl">Loading confirmation...</div>
            </div>
        )
    }

    // --- Dynamic Data Calculation (Single Source of Truth) ---
    const pickupDate = bookingState.pickupDate || (booking ? parseJSDate(booking.pickup_datetime) : new Date())
    const dropoffDate = bookingState.dropoffDate || (booking ? parseJSDate(booking.dropoff_datetime) : new Date())
    
    const totalDays = Math.ceil((dropoffDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24)) || 1
    
    const dailyRate = Number(bookingState.carDetails?.daily_rate || booking?.base_price || 0)
    const carSubtotal = dailyRate * totalDays
    
    const chauffeurSelected = bookingState.chauffeurRequired || !!booking?.chauffeur_details
    const chauffeurPricePerDay = 1500
    const chauffeurCharges = chauffeurSelected ? totalDays * chauffeurPricePerDay : 0
    
    const taxes = 0
    const finalAmount = carSubtotal + chauffeurCharges

    const displayBookingId = bookingState.bookingId || "LUX" + Date.now().toString().slice(-6)

    // Format: DD/MM/YYYY HH:mm
    const formatFullDate = (date: Date) => {
        const d = date.getDate().toString().padStart(2, '0')
        const m = (date.getMonth() + 1).toString().padStart(2, '0')
        const y = date.getFullYear()
        const h = date.getHours().toString().padStart(2, '0')
        const min = date.getMinutes().toString().padStart(2, '0')
        return `${d}/${m}/${y} ${h}:${min}`
    }

    const getPaymentMethod = () => {
        if (booking?.payment_method) return booking.payment_method.toUpperCase()
        if (bookingState.insurance === 'zero_dep') return 'PREMIUM SECURED'
        return 'RAZORPAY / SECURE'
    }

    const handlePrint = () => {
        window.print()
    }

    const handleDownload = () => {
        try {
            if (!car) {
                toast.error('Receipt unavailable')
                return
            }
            // Create a virtual booking object for the PDF generator if needed
            const virtualBooking = {
                id: displayBookingId,
                pickup_datetime: pickupDate.toISOString(),
                dropoff_datetime: dropoffDate.toISOString(),
                total_price: finalAmount,
                base_price: dailyRate,
                status: booking?.status || 'payment_success',
                payment_status: booking?.payment_status || 'successful',
                delivery_address: bookingState.pickupLocation || booking?.delivery_address || 'LUXEDIVE Headquarters'
            }
            generateBookingReceipt(virtualBooking as any, car as any)
            toast.success('Receipt downloaded successfully!')
        } catch (error) {
            toast.error('Failed to generate receipt')
            console.error('PDF generation error:', error)
        }
    }

    return (
        <div className="min-h-screen bg-luxe-black py-12 px-4 no-print overflow-x-hidden">
            <style>
                {`
                @media print {
                    @page {
                        size: A4;
                        margin: 15mm;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        background: white !important;
                        -webkit-print-color-adjust: exact;
                    }
                    .no-print {
                        display: none !important;
                    }
                    .print-only {
                        display: block !important;
                    }
                    .invoice-container {
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        box-shadow: none !important;
                        border: none !important;
                        page-break-inside: avoid;
                        color: #000 !important;
                        background: white !important;
                    }
                    /* Ensure icons show up in print */
                    .lucide {
                        color: #C9A44C !important;
                    }
                }
                
                .invoice-container {
                    width: 210mm;
                    min-height: 297mm;
                    background: white;
                    color: #1a1a1a;
                    padding: 20mm;
                    margin: 0 auto;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                    position: relative;
                    font-family: 'Inter', sans-serif;
                }

                .gold-accent {
                    color: #C9A44C;
                }
                
                .bg-gold-accent {
                    background-color: #C9A44C;
                }

                .border-luxe {
                    border-color: #e5e7eb;
                }
                
                .table-header {
                    background-color: #f9fafb;
                    border-bottom: 2px solid #C9A44C;
                }
                `}
            </style>

            {/* A4 Invoice Container */}
            <div className="invoice-container rounded-sm">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-10 border-b-2 border-gray-100 pb-8">
                    <div>
                        <h1 className="text-4xl font-serif gold-accent font-bold tracking-widest mb-2">LUXEDIVE</h1>
                        <p className="text-sm text-gray-500 uppercase tracking-widest">Elite Luxury Rentals</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-2xl font-bold mb-1">INVOICE</h2>
                        <p className="text-sm text-gray-600">Booking ID: <span className="font-mono font-bold text-black">{displayBookingId}</span></p>
                        <p className="text-sm text-gray-600">Date: {formatFullDate(new Date())}</p>
                    </div>
                </div>

                {/* Status Badge (Web Only) */}
                <div className="flex justify-between items-center mb-8 no-print">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${
                            booking?.status === 'confirmed' ? 'bg-emerald-100' : 'bg-amber-100'
                        } rounded-full flex items-center justify-center`}>
                            {booking?.status === 'confirmed' ? <CheckCircle className="w-6 h-6 text-emerald-600" /> : <Clock className="w-6 h-6 text-amber-600" />}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <p className={`font-bold ${
                                booking?.status === 'confirmed' ? 'text-emerald-600' : 
                                booking?.status === 'document_submitted' ? 'text-amber-600' : 
                                'text-blue-600'
                            }`}>
                                {booking?.status === 'confirmed' ? 'Verified & Confirmed' : 
                                 booking?.status === 'document_submitted' ? 'Documents Under Review' : 
                                 'Payment Successful'}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                         <button
                            onClick={handlePrint}
                            className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                        >
                            <Printer className="w-4 h-4" />
                            Print
                        </button>
                        <button
                            onClick={handleDownload}
                            className="bg-gold-accent text-white hover:bg-[#b38f3d] px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                        >
                            <Download className="w-4 h-4" />
                            PDF
                        </button>
                    </div>
                </div>

                {/* Rental Details Grid */}
                <div className="grid grid-cols-2 gap-12 mb-10">
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4 border-b pb-1">Pickup Details</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 gold-accent mt-1 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Location</p>
                                    <p className="text-sm font-semibold">{bookingState.pickupLocation || 'LUXEDIVE Headquarters'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar className="w-4 h-4 gold-accent mt-1 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Date & Time</p>
                                    <p className="text-sm font-semibold">{formatFullDate(pickupDate)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4 border-b pb-1">Dropoff Details</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 gold-accent mt-1 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Location</p>
                                    <p className="text-sm font-semibold">{bookingState.dropoffLocation || 'LUXEDIVE Headquarters'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar className="w-4 h-4 gold-accent mt-1 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Date & Time</p>
                                    <p className="text-sm font-semibold">{formatFullDate(dropoffDate)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vehicle Section */}
                {car && (
                    <div className="bg-gray-50 rounded-lg p-6 mb-10 border border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-md overflow-hidden border border-gray-200">
                                <img
                                    src={car.images?.[0] || '/placeholder-car.jpg'}
                                    alt={car.model}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold">{car.brand} {car.model}</h4>
                                <p className="text-sm text-gray-500 uppercase tracking-wider">{car.category} • {car.transmission} • {car.fuel_type}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500">Daily Rate</p>
                            <p className="text-lg font-bold gold-accent">₹{dailyRate.toLocaleString('en-IN')}</p>
                        </div>
                    </div>
                )}

                {/* Invoice Table */}
                <div className="mb-10">
                    <table className="w-full text-left">
                        <thead className="table-header">
                            <tr>
                                <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-600">Description</th>
                                <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-600 text-center">Qty (Days)</th>
                                <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-600 text-right">Rate</th>
                                <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-600 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr>
                                <td className="py-5 px-4 text-sm font-medium">Vehicle Rental ({car?.brand} {car?.model})</td>
                                <td className="py-5 px-4 text-sm text-center font-bold">{totalDays}</td>
                                <td className="py-5 px-4 text-sm text-right">₹{dailyRate.toLocaleString('en-IN')}</td>
                                <td className="py-5 px-4 text-sm text-right font-bold">₹{carSubtotal.toLocaleString('en-IN')}</td>
                            </tr>
                            {chauffeurSelected && (
                                <tr>
                                    <td className="py-5 px-4 text-sm font-medium">Elite Chauffeur Service</td>
                                    <td className="py-5 px-4 text-sm text-center font-bold">{totalDays}</td>
                                    <td className="py-5 px-4 text-sm text-right">₹{chauffeurPricePerDay.toLocaleString('en-IN')}</td>
                                    <td className="py-5 px-4 text-sm text-right font-bold">₹{chauffeurCharges.toLocaleString('en-IN')}</td>
                                </tr>
                            )}
                            <tr>
                                <td className="py-5 px-4 text-sm font-medium">GST & Service Taxes</td>
                                <td className="py-5 px-4 text-sm text-center font-bold">-</td>
                                <td className="py-5 px-4 text-sm text-right">₹0</td>
                                <td className="py-5 px-4 text-sm text-right font-bold">₹0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Totals Section */}
                <div className="flex justify-end mb-12">
                    <div className="w-64 space-y-3">
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Subtotal</span>
                            <span>₹{finalAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Discount</span>
                            <span>-₹0</span>
                        </div>
                        <div className="flex justify-between border-t-2 border-black pt-3">
                            <span className="text-lg font-bold">Total Amount</span>
                            <span className="text-2xl font-bold gold-accent">₹{finalAmount.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="border-t border-gray-100 pt-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                            <Shield className="w-4 h-4 gold-accent" />
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Secure Payment Guaranteed</span>
                        </div>
                        <p className="text-sm text-gray-600">Payment Processed via Razorpay Secure Gateway</p>
                    </div>
                    <div className="text-center sm:text-right">
                        <p className="text-sm font-bold mb-1">Contact Support</p>
                        <p className="text-xs text-gray-500">+91 1800-LUXE-DIVE • support@luxedive.com</p>
                        <p className="text-xs text-gray-500">LUXEDIVE Tower, Vastral, Ahmedabad - 382418</p>
                    </div>
                </div>

                {/* Important Notes */}
                <div className="mt-10 pt-6 border-t border-dashed border-gray-200">
                    <h5 className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em] mb-2">Terms & Conditions</h5>
                    <p className="text-[9px] text-gray-400 leading-relaxed">
                        * Please present a valid Aadhaar/Drivers License at pickup. • Fuel Policy: Vehicle is provided with a full tank and must be returned full. • A security deposit of ₹25,000 is held but not charged. • Cancellation 24h prior to pickup is required for full refund. • Self-drive age limit: 21+.
                    </p>
                </div>
            </div>

            {/* Back to Fleet (Web Only) */}
            <div className="max-w-[210mm] mx-auto mt-12 flex justify-center no-print">
                <button
                    onClick={() => {
                        resetBooking();
                        navigate('/fleet');
                    }}
                    className="flex items-center gap-2 text-luxe-gold hover:text-white transition-colors py-2 px-4 rounded-full border border-luxe-gold/20 hover:border-luxe-gold"
                >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Return to Fleet Listing
                </button>
            </div>
        </div>
    )
}
