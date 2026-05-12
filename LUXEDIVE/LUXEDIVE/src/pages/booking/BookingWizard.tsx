import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useBooking } from '../../contexts/BookingContext'
import { Check } from 'lucide-react'
import { cn } from '../../lib/utils'

// Step Components (Placeholders for now)
import BookingStep1 from './steps/BookingStep1'
import BookingStep2 from './steps/BookingStep2'
import BookingStep3 from './steps/BookingStep3'
import BookingStep4 from './steps/BookingStep4'

export default function BookingWizard() {
  const { currentStep, setCurrentStep } = useBooking()
  const navigate = useNavigate()
  const location = useLocation()

  const steps = [
    { id: 1, label: 'Itinerary' },
    { id: 2, label: 'Add-ons' },
    { id: 3, label: 'Verification' },
    { id: 4, label: 'Payment' }
  ]

  // Sync route with step state
  useEffect(() => {
    const path = location.pathname
    if (path.includes('/new/')) setCurrentStep(1)
    else if (path.includes('/addons')) setCurrentStep(2)
    else if (path.includes('/verification')) setCurrentStep(3)
    else if (path.includes('/payment')) setCurrentStep(4)
  }, [location, setCurrentStep])

  return (
    <div className="min-h-screen bg-luxe-black pt-20 pb-20">
      <div className="container mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-12">
           <div className="relative flex justify-between max-w-3xl mx-auto">
             {/* Line */}
             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-luxe-gray/20 -z-0"></div>
             
             {steps.map((step) => {
               const isCompleted = currentStep > step.id
               const isActive = currentStep === step.id
               
               return (
                 <div key={step.id} className="relative z-10 flex flex-col items-center bg-luxe-black px-2">
                   <div 
                     className={cn(
                       "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                       isActive ? "border-luxe-gold bg-luxe-gold text-luxe-black" : 
                       isCompleted ? "border-luxe-gold bg-luxe-black text-luxe-gold" : "border-luxe-gray/30 bg-luxe-black text-luxe-gray"
                     )}
                   >
                     {isCompleted ? <Check className="w-6 h-6" /> : <span className="font-semibold">{step.id}</span>}
                   </div>
                   <span className={cn(
                     "mt-2 text-xs font-medium uppercase tracking-wider transition-colors",
                     isActive ? "text-luxe-gold" : "text-luxe-gray"
                   )}>
                     {step.label}
                   </span>
                 </div>
               )
             })}
           </div>
        </div>

        {/* Wizard Steps */}
        <div className="max-w-5xl mx-auto">
          <Routes>
            <Route path="new/:carId" element={<BookingStep1 />} />
            <Route path="addons" element={<BookingStep2 />} />
            <Route path="verification" element={<BookingStep3 />} />
            <Route path="payment" element={<BookingStep4 />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
