import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Navigation, Building, FileText, CheckCircle2 } from 'lucide-react'
import { useBooking } from '../../../contexts/BookingContext'
import BookingLayout from '../../../components/layout/BookingLayout'
import LocationAutocomplete from '../../../components/booking/LocationAutocomplete'

export default function AddressDetails() {
    const { carId } = useParams()
    const { bookingState, updateBooking } = useBooking()

    // Form states
    const [pickupLocation, setPickupLocation] = useState(bookingState.pickupLocation || '')
    const [dropoffLocation, setDropoffLocation] = useState(bookingState.dropoffLocation || '')
    const [pickupDetails, setPickupDetails] = useState(bookingState.pickupLocationDetails)
    const [dropoffDetails, setDropoffDetails] = useState(bookingState.dropoffLocationDetails)
    const [city, setCity] = useState(bookingState.city || 'Ahmedabad')
    const [notes, setNotes] = useState(bookingState.notes || '')

    // SMART FIX: Collect all validation errors
    const blockedReasons = React.useMemo(() => {
        const errors: string[] = []
        if (!pickupLocation || !pickupDetails) errors.push("Select a specific pickup address from suggestions")
        if (!dropoffLocation || !dropoffDetails) errors.push("Select a specific dropoff address from suggestions")
        if (city !== 'Ahmedabad') errors.push("Service only available in Ahmedabad")
        return errors
    }, [pickupLocation, pickupDetails, dropoffLocation, dropoffDetails, city])

    useEffect(() => {
        updateBooking({ 
            pickupLocation, 
            dropoffLocation, 
            pickupLocationDetails: pickupDetails,
            dropoffLocationDetails: dropoffDetails,
            city, 
            notes 
        })
    }, [pickupLocation, dropoffLocation, pickupDetails, dropoffDetails, city, notes, updateBooking])

    const handlePickupChange = (address: string, details?: { lat: number; lng: number; placeId: string }) => {
        setPickupLocation(address)
        setPickupDetails(details)
        if (details) setCity('Ahmedabad')
    }

    const handleDropoffChange = (address: string, details?: { lat: number; lng: number; placeId: string }) => {
        setDropoffLocation(address)
        setDropoffDetails(details)
        if (details) setCity('Ahmedabad')
    }

    return (
        <BookingLayout 
            step={4} 
            title="Logistics & Location" 
            subtitle="Specify the coordinates for your luxury delivery."
            nextDisabled={blockedReasons.length > 0}
            blockedReasons={blockedReasons}
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
                {/* ADDRESS FORM */}
                <div className="lg:col-span-8 space-y-10">
                    <div className="p-10 bg-zinc-900/50 border border-white/5 rounded-[2.5rem] backdrop-blur-sm space-y-8">
                        
                        <div className="flex items-center gap-4 mb-2">
                             <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                                <Navigation className="w-5 h-5 text-amber-500" />
                             </div>
                             <h3 className="text-xl font-serif text-white uppercase tracking-wider">Precision Locations</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <LocationAutocomplete 
                                label="Pickup Address" 
                                placeholder="E.g. Terminal 2, Ahmedabad Airport"
                                value={pickupLocation}
                                onChange={handlePickupChange}
                                error={pickupLocation.length > 5 && !pickupDetails ? 'Please select from suggestions' : undefined}
                            />
                            <LocationAutocomplete 
                                label="Dropoff Address" 
                                placeholder="E.g. Le Meridien, SG Highway"
                                value={dropoffLocation}
                                onChange={handleDropoffChange}
                                error={dropoffLocation.length > 5 && !dropoffDetails ? 'Please select from suggestions' : undefined}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black block ml-1">Assigned City</label>
                                <div className="relative">
                                    <div className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-12 flex items-center text-sm text-amber-500 font-bold tracking-widest uppercase">
                                        {city}
                                    </div>
                                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black block ml-1">Special Logistics Notes</label>
                            <div className="relative">
                                <textarea 
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Arrival flight number, specific gate instructions, or custom requests..."
                                    className="w-full h-32 bg-black/40 border border-white/10 rounded-[2rem] p-6 pl-12 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                                />
                                <FileText className="absolute left-4 top-6 w-4 h-4 text-gray-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* LOGISTICS SIDEBAR */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="p-8 bg-amber-500/5 border border-amber-500/10 rounded-[2rem]">
                        <h4 className="text-sm font-black text-amber-500 uppercase tracking-[0.2em] mb-4">Service Protocol</h4>
                        <ul className="space-y-4">
                            <ProtocolItem text="Complimentary Sanitization" />
                            <ProtocolItem text="GPS-Tracked Delivery" />
                            <ProtocolItem text="Identity Verified Personnel" />
                            <ProtocolItem text="Real-time ETA Updates" />
                        </ul>
                    </div>

                    <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-[2rem] flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-500">
                             <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
                            Addresses are strictly encrypted and only shared with the assigned logistics captain 30 minutes prior to pickup.
                        </p>
                    </div>
                </div>
            </div>
        </BookingLayout>
    )
}

function ProtocolItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
            <span className="text-[10px] text-white uppercase tracking-widest font-bold">{text}</span>
        </li>
    )
}
