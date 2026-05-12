import React from 'react'
import { Check, ShieldCheck } from 'lucide-react'

// Define types based on existing interfaces
export interface InvoiceBookingData {
    id: string
    created_at: string
    status: string
    pickup_datetime: string
    dropoff_datetime: string
    delivery_address: string | null
    delivery_type: string
    base_price: number // Daily rate
    total_price: number
    payment_status: string
    payment_method?: string // e.g. 'upi', 'card'
    has_chauffeur?: boolean
    chauffeur_name?: string
    chauffeur_cost_per_day?: number
    total_chauffeur_cost?: number
}

export interface InvoiceCarData {
    brand: string
    model: string
    category: string
    transmission: string
    fuel_type: string
    license_plate?: string
}

export interface InvoiceCustomerData {
    name: string
    phone: string
    email?: string
}

interface InvoiceTemplateProps {
    booking: InvoiceBookingData;
    car: InvoiceCarData;
    customer: InvoiceCustomerData;
}

export const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ booking, car, customer }) => {

    // Formatting helpers
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Calculate days
    const pickup = new Date(booking.pickup_datetime);
    const dropoff = new Date(booking.dropoff_datetime);
    const diffTime = Math.abs(dropoff.getTime() - pickup.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const subtotal = booking.base_price * totalDays;

    return (
        <div id="invoice-print-container" className="bg-white text-black font-sans box-border mx-auto">
            {/* 
               Print Styles Injection 
               - A4 Size strictness
               - No standard headers/footers
            */}
            <style>
                {`
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    #invoice-print-container {
                        width: 210mm;
                        min-height: 297mm;
                        padding: 0;
                        margin: 0;
                        border: none;
                        box-shadow: none;
                    }
                }
                /* Screen preview wrapper */
                @media screen {
                    #invoice-print-container {
                        width: 210mm;
                        min-height: 297mm;
                        padding: 0; /* Content padding handled by inner div */
                        margin: 2rem auto;
                        border: 1px solid #e5e7eb;
                        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    }
                }
                `}
            </style>

            {/* A4 Page Content Wrapper with padding */}
            <div className="w-full h-full p-[12mm] md:p-[20mm] relative flex flex-col justify-between min-h-[297mm]">

                {/* --- HEADER --- */}
                <header className="mb-8 border-b-2 border-luxe-gold/20 pb-6">
                    <div className="flex justify-between items-start">
                        {/* Logo & Brand */}
                        <div>
                            <h1 className="text-3xl font-serif text-luxe-gold font-bold tracking-wide uppercase mb-2">LUXEDIVE</h1>
                            <p className="text-xs text-gray-500 tracking-wider">PREMIUM CAR RENTALS</p>
                        </div>

                        {/* Booking Badge */}
                        <div className="text-right">
                            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200 mb-2">
                                <Check size={14} className="stroke-[3]" />
                                <span className="text-xs font-bold uppercase tracking-wide">Booking Confirmed</span>
                            </div>
                            <p className="text-xs text-gray-500">Invoice Date: {new Date().toLocaleDateString('en-IN')}</p>
                            <p className="text-xs text-gray-500 font-mono mt-1">ID: {booking.id.slice(0, 8).toUpperCase()}</p>
                        </div>
                    </div>
                </header>

                {/* --- MAIN CONTENT --- */}
                <main className="flex-grow">

                    {/* CUSTOMER & VEHICLE GRID */}
                    <div className="grid grid-cols-2 gap-12 mb-10">
                        {/* Customer Column */}
                        <div>
                            <div className="space-y-1.5 mt-2">
                                <div className="flex gap-2">
                                    <span className="text-sm font-bold text-gray-500 w-20 uppercase tracking-tighter">name</span>
                                    <span className="text-sm font-bold text-gray-900">- {customer.name}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-sm font-bold text-gray-500 w-20 uppercase tracking-tighter">Email id</span>
                                    <span className="text-sm text-gray-700">- {customer.email || 'N/A'}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-sm font-bold text-gray-500 w-20 uppercase tracking-tighter">phone no.</span>
                                    <span className="text-sm text-gray-700">- {customer.phone}</span>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Vehicle Details</h3>
                                <p className="text-lg font-bold text-gray-900 font-serif">{car.brand} {car.model}</p>
                                <p className="text-sm text-gray-600">{car.category} • {car.transmission} • {car.fuel_type}</p>
                                {car.license_plate && <p className="text-xs text-gray-500 mt-1 uppercase bg-gray-100 inline-block px-2 py-0.5 rounded">{car.license_plate}</p>}
                            </div>

                            {booking.has_chauffeur && (
                                <div className="mt-8 bg-luxe-gold/5 p-4 rounded-xl border border-luxe-gold/20">
                                    <h3 className="text-[10px] font-black text-luxe-gold uppercase tracking-widest mb-3">Chauffeur Service Added</h3>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-gray-900">{booking.chauffeur_name || 'Professional Chauffeur'}</p>
                                        <div className="flex justify-between text-[11px] text-gray-600 font-medium">
                                            <span>Per Day Rate:</span>
                                            <span>{formatCurrency(booking.chauffeur_cost_per_day || 0)}</span>
                                        </div>
                                        <div className="flex justify-between text-xs font-bold text-gray-900 pt-1 border-t border-luxe-gold/10">
                                            <span>Total Chauffeur Pay:</span>
                                            <span>{formatCurrency(booking.total_chauffeur_cost || 0)}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Trip Dates Column */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Trip Itinerary</h3>

                            {/* Pickup */}
                            <div className="mb-5 relative pl-4 border-l-2 border-luxe-gold">
                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Pickup</p>
                                <p className="text-sm font-semibold text-gray-900">{formatDate(booking.pickup_datetime)}</p>
                                <p className="text-sm text-gray-700">{formatTime(booking.pickup_datetime)}</p>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-[250px]">
                                    {booking.delivery_type === 'delivery'
                                        ? booking.delivery_address
                                        : 'LuxeDive HQ, Ahmedabad'}
                                </p>
                            </div>

                            {/* Dropoff */}
                            <div className="relative pl-4 border-l-2 border-gray-200">
                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Dropoff</p>
                                <p className="text-sm font-semibold text-gray-900">{formatDate(booking.dropoff_datetime)}</p>
                                <p className="text-sm text-gray-700">{formatTime(booking.dropoff_datetime)}</p>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-[250px]">
                                    {booking.delivery_type === 'delivery'
                                        ? booking.delivery_address
                                        : 'LuxeDive HQ, Ahmedabad'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* INVOICE TABLE (No Flexbox for rows) */}
                    <div className="mb-10">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Invoice Summary</h3>

                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b-2 border-gray-900">
                                    <th className="text-left py-3 text-xs font-bold text-gray-900 uppercase tracking-wider w-1/2">Description</th>
                                    <th className="text-right py-3 text-xs font-bold text-gray-900 uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-gray-800">
                                {/* Row 1 */}
                                <tr className="border-b border-gray-100">
                                    <td className="py-4">
                                        <span className="font-medium">Daily Rental Rate</span>
                                        <div className="text-xs text-gray-500 mt-0.5">{car.brand} {car.model}</div>
                                    </td>
                                    <td className="py-4 text-right font-mono">
                                        {formatCurrency(booking.base_price)}
                                    </td>
                                </tr>

                                {/* Row 2 */}
                                <tr className="border-b border-gray-100">
                                    <td className="py-4">
                                        <span className="font-medium">Duration</span>
                                    </td>
                                    <td className="py-4 text-right">
                                        {totalDays} {totalDays === 1 ? 'Day' : 'Days'}
                                    </td>
                                </tr>

                                {/* Row 3: Chauffeur (Conditional) */}
                                {booking.has_chauffeur && (
                                    <tr className="border-b border-gray-100">
                                        <td className="py-4">
                                            <span className="font-medium">Chauffeur Service</span>
                                            <div className="text-xs text-gray-500 mt-0.5">Professional Driver Assignment</div>
                                        </td>
                                        <td className="py-4 text-right font-mono">
                                            {formatCurrency(booking.total_chauffeur_cost || 0)}
                                        </td>
                                    </tr>
                                )}

                                {/* Row 4: Subtotal */}
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <td className="py-3 pl-2 text-gray-600 font-medium">Subtotal</td>
                                    <td className="py-3 pr-2 text-right font-mono text-gray-900">
                                        {formatCurrency(subtotal + (booking.total_chauffeur_cost || 0))}
                                    </td>
                                </tr>

                                {/* Row 4: Taxes */}
                                <tr className="border-b border-gray-100">
                                    <td className="py-3 pl-2 text-gray-600">Taxes & Fees (0%)</td>
                                    <td className="py-3 pr-2 text-right font-mono text-gray-500">
                                        ₹0
                                    </td>
                                </tr>

                                {/* Total Row */}
                                <tr>
                                    <td className="py-6 pt-8 text-lg font-bold text-gray-900 uppercase tracking-tight">Final Total Amount</td>
                                    <td className="py-6 pt-8 text-right">
                                        <span className="text-3xl font-serif font-bold text-gray-900 border-b-4 border-luxe-gold/30 pb-1">
                                            {formatCurrency(booking.total_price)}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* NOTES */}
                    <div className="bg-gray-50 rounded p-6 border border-gray-100">
                        <h4 className="text-xs font-bold text-gray-900 uppercase mb-3">Important Notes</h4>
                        <ul className="text-xs text-gray-600 space-y-2 list-none m-0 p-0">
                            <li className="flex gap-2">
                                <span className="text-luxe-gold">•</span>
                                <span>Please carry a valid government ID (License/AADHAR) at pickup.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-luxe-gold">•</span>
                                <span>Vehicle handover process takes ~15 minutes. Arrival time may vary ±15 minutes via traffic.</span>
                            </li>
                            {booking.payment_status === 'pending' && (
                                <li className="flex gap-2">
                                    <span className="text-luxe-gold font-bold">•</span>
                                    <span className="font-semibold text-gray-900">For Cash on Delivery, full payment is due at vehicle handover.</span>
                                </li>
                            )}
                            <li className="flex gap-2">
                                <span className="text-luxe-gold">•</span>
                                <span>Security deposit will be refunded within 24-48 hours after vehicle return.</span>
                            </li>
                        </ul>
                    </div>

                </main>

                {/* --- FOOTER --- */}
                <footer className="mt-12 pt-8 border-t border-gray-200 text-center">
                    <div className="flex justify-center items-center gap-2 text-green-700 mb-3">
                        <ShieldCheck size={16} />
                        <span className="text-xs font-bold uppercase tracking-wide">Secure Booking</span>
                    </div>

                    <h5 className="text-sm font-serif text-gray-900 mb-1">Thank you for choosing LUXEDIVE</h5>
                    <p className="text-xs text-gray-500">
                        Need help? Call <span className="text-gray-900 font-medium">+91 98765 43210</span> or email <span className="text-gray-900 font-medium">support@luxedive.com</span>
                    </p>
                    <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-widest">
                        LuxeDive Private Limited • Ahmedabad, India • www.luxedive.com
                    </p>
                </footer>

            </div>
        </div>
    )
}
