import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { useBooking } from '../../../contexts/BookingContext'
import { documentService } from '../../../services/documentService'
import { FileUpload } from '../../../components/ui/FileUpload'
import { Button } from '../../../components/ui/Button'
import { Card, CardContent } from '../../../components/ui/Card'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function PreCheckInVerification() {
  const navigate = useNavigate()
  const { user } = useAuth()
//   const { bookingState } = useBooking()
  const [verifying, setVerifying] = useState(false)
  const [licenseFront, setLicenseFront] = useState<string | null>(null)
  
  const handleVerify = async () => {
      if (!licenseFront) {
          toast.error("Please upload your Driving License")
          return
      }

      setVerifying(true)
      try {
          // 1. Simulate OCR Check
          const ocrResult = await documentService.extractDetails(licenseFront)
          console.log("OCR Result", ocrResult)

          // 2. Artificial Delay for UX
          await new Promise(r => setTimeout(r, 1500))

          toast.success("Identity Verified Successfully")
          navigate('/booking/summary') // Go to payment summary
      } catch (e) {
          toast.error("Verification failed. Please try a clearer photo.")
      } finally {
          setVerifying(false)
      }
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
       <div className="text-center mb-8">
           <h2 className="text-2xl font-serif text-luxe-white mb-2">Identity Verification</h2>
           <p className="text-luxe-gray">For your security and insurance compliance, we need to verify your driving license.</p>
       </div>

       <div className="space-y-6">
           <Card>
               <CardContent className="p-6 space-y-4">
                   <h3 className="font-medium text-luxe-white">Driving License (Front)</h3>
                   <FileUpload 
                      bucket="documents" 
                      label="Upload License Front"
                      onUploadComplete={(url) => setLicenseFront(url)}
                   />
                   <p className="text-xs text-luxe-gray flex items-center gap-1">
                       🔒 Your data is encrypted and deleted after trip completion (Subject to laws).
                   </p>
               </CardContent>
           </Card>

           {/* We could add Back side and Selfie here too */}

           <div className="flex gap-4 pt-4">
               <Button variant="outline" className="flex-1" onClick={() => navigate(-1)}>Back</Button>
               <Button className="flex-1" onClick={handleVerify} disabled={verifying || !licenseFront}>
                   {verifying ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Verifying...</> : 'Verify & Proceed'}
               </Button>
           </div>
       </div>
    </div>
  )
}
