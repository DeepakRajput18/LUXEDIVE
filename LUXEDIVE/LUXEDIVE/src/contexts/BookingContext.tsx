import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { Car } from '../services/carService'

interface BookingState {
  carId: string | null
  carDetails: Car | null
  rentalType: 'daily'
  pickupDate: Date | null
  dropoffDate: Date | null
  pickupLocation: string
  dropoffLocation: string
  pickupLocationDetails?: { lat: number; lng: number; placeId: string }
  dropoffLocationDetails?: { lat: number; lng: number; placeId: string }
  city: string
  notes: string
  chauffeurDetails: { 
    id?: string;
    name?: string; 
    fullName?: string;
    price: number;
    price_per_day?: number;
    image?: string;
    profilePhoto?: string;
    rank?: string;
    rating?: number;
    experience?: string;
  } | null
  chauffeurDate?: Date | null
  carPrice: number
  totalPrice: number
  duration: number
  baseDays: number
  insurance?: 'basic' | 'zero_dep'
  bookingId?: string | null
  chauffeurRequired?: boolean
  deliveryType?: 'self_pickup' | 'delivery'
  addOns?: string[]
}

interface BookingContextType {
  bookingState: BookingState
  setBookingState: React.Dispatch<React.SetStateAction<BookingState>>
  updateBooking: (updates: Partial<BookingState>) => void
  resetBooking: () => void
  currentStep: number
  setCurrentStep: (step: number) => void
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

const INITIAL_STATE: BookingState = {
  carId: null,
  carDetails: null,
  rentalType: 'daily',
  pickupDate: null,
  dropoffDate: null,
  pickupLocation: '',
  dropoffLocation: '',
  pickupLocationDetails: undefined,
  dropoffLocationDetails: undefined,
  city: 'Ahmedabad',
  notes: '',
  chauffeurDetails: null,
  chauffeurDate: null,
  carPrice: 0,
  totalPrice: 0,
  duration: 1,
  baseDays: 1,
  insurance: 'basic',
  bookingId: null
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingState, setBookingState] = useState<BookingState>(() => {
    const saved = localStorage.getItem('luxedive_booking_state')
    if (saved) {
        const parsed = JSON.parse(saved, (key, value) => {
            if (key === 'pickupDate' || key === 'dropoffDate' || key === 'chauffeurDate') return value ? new Date(value) : null
            return value
        })
        return { ...INITIAL_STATE, ...parsed }
    }
    return INITIAL_STATE
  })

  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem('luxedive_booking_step')
    return saved ? parseInt(saved) : 1
  })

  useEffect(() => {
    localStorage.setItem('luxedive_booking_state', JSON.stringify(bookingState))
  }, [bookingState])

  useEffect(() => {
    localStorage.setItem('luxedive_booking_step', currentStep.toString())
  }, [currentStep])

  const updateBooking = useCallback((updates: Partial<BookingState>) => {
    setBookingState(prev => ({ ...prev, ...updates }))
  }, [])

  const resetBooking = useCallback(() => {
    setBookingState(INITIAL_STATE)
    setCurrentStep(1)
    localStorage.removeItem('luxedive_booking_state')
    localStorage.removeItem('luxedive_booking_step')
  }, [])


  return (
    <BookingContext.Provider value={{
      bookingState,
      setBookingState,
      updateBooking,
      resetBooking,
      currentStep,
      setCurrentStep
    }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
