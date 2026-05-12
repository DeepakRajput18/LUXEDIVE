import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../../../contexts/BookingContext'
import { Card, CardContent } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { Checkbox } from '../../../components/ui/Checkbox'
import { ScrollArea } from '../../../components/ui/ScrollArea' // We don't have this yet, using div overflow
import { FileText, AlertTriangle } from 'lucide-react'

export default function DigitalAgreement() {
  const navigate = useNavigate()
  // const { bookingState } = useBooking() // Not strictly needed unless we store acceptance
  const [accepted, setAccepted] = useState(false)

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-serif text-luxe-white mb-6">Rental Agreement</h2>
      
      <Card className="mb-6 bg-luxe-dark">
          <CardContent className="p-0">
             <div className="p-4 bg-luxe-gray/5 border-b border-luxe-gray/10 flex items-center justify-between">
                 <div className="flex items-center gap-2 text-luxe-white font-medium">
                     <FileText className="w-5 h-5 text-luxe-gold" />
                     <span>Digital Contract #DRAFT</span>
                 </div>
                 <Button variant="outline" size="sm">Download PDF</Button>
             </div>
             
             {/* SCROLLABLE CONTRACT AREA */}
             <div className="h-[400px] overflow-y-auto p-6 space-y-4 text-sm text-luxe-gray custom-scrollbar">
                 <h3 className="text-lg font-bold text-luxe-white">1. VEHICLE RENTAL AGREEMENT</h3>
                 <p>This agreement is made between LUXEDIVE (Lessor) and the Client (Lessee) identified in the booking details...</p>
                 
                 <h4 className="font-bold text-luxe-white mt-4">2. USE OF VEHICLE</h4>
                 <p>The Lessee agrees to use the vehicle solely for personal or business transportation. Prohibited uses include: racing, off-roading, towing, or transport of hazardous materials. Speed limit is capped at 120 km/h via GPS governor.</p>

                 <h4 className="font-bold text-luxe-white mt-4">3. LIABILITY & INSURANCE</h4>
                 <p>Lessor provides comprehensive insurance. Lessee acts as custodian and is liable for the "Deductible Amount" in case of damage. If "Zero Dep" service is purchased, this liability is waived except in cases of gross negligence (DUI, etc).</p>

                 <h4 className="font-bold text-luxe-white mt-4">4. SECURITY DEPOSIT</h4>
                 <p>A refundable security deposit will be blocked on the Lessee's credit card. This will be released 24-48 hours after vehicle return, subject to traffic fine/toll clearance.</p>

                 <div className="p-4 bg-amber-900/10 border border-amber-900/30 rounded mt-4 text-amber-200">
                     <div className="flex items-center gap-2 mb-2 font-bold">
                         <AlertTriangle className="w-4 h-4" /> IMPORTANT NOTICE
                     </div>
                     <p>Traffic violations will be charged to the Lessee with an additional ₹500 processing fee per challan.</p>
                 </div>
                 
                 {/* Imagine 20 more paragraphs */}
                 <p className="opacity-50">---------------- End of Document ----------------</p>
             </div>

             <div className="p-6 border-t border-luxe-gray/10 bg-luxe-gray/5">
                 <div className="flex items-start gap-3 cursor-pointer" onClick={() => setAccepted(!accepted)}>
                     <Checkbox checked={accepted} className="mt-1" />
                     <div className="flex-1">
                         <label className="text-luxe-white font-medium block cursor-pointer">I accept the Terms & Conditions</label>
                         <p className="text-xs text-luxe-gray mt-1">
                             By checking this box, I electronically sign this agreement and acknowledge that I meet all eligibility criteria (Age 25+, Valid License).
                         </p>
                     </div>
                 </div>
             </div>
          </CardContent>
      </Card>

      <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
          <Button onClick={() => navigate('/booking/verification')} disabled={!accepted}>Agree & Continue</Button>
      </div>
    </div>
  )
}
