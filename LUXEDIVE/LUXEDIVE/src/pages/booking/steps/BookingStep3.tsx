import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../../../contexts/BookingContext'
import { useAuth } from '../../../contexts/AuthContext'
import { Button } from '../../../components/ui/Button'
import { Card, CardContent } from '../../../components/ui/Card'
import { FileUpload } from '../../../components/ui/FileUpload'
import { ArrowLeft, ArrowRight, ShieldCheck, Lock as LockIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function BookingStep3() {
  const { user } = useAuth()
  const { setCurrentStep } = useBooking()
  const navigate = useNavigate()

  useEffect(() => {
    // If not logged in, redirect to login with return param
    // Ideally this check happens earlier or we show a login form inline
    if (!user) {
      toast.info("Please login to proceed with verification")
      // For this demo, we can assume the user logs in via a modal or separate page
      // Real implementation would handle redirect flow
    }
  }, [user])

  const handleNext = () => {
    if (!user) {
      toast.error("You must be logged in to continue")
      return
    }
    // Check if documents uploaded (mock check or check profile status)

    setCurrentStep(4)
    navigate('/booking/payment')
  }

  const handleBack = () => {
    setCurrentStep(2)
    navigate(-1)
  }

  const handleUploadSuccess = (url: string) => {
    console.log("Uploaded:", url)
    // Here we would link this doc to the user's profile or booking draft
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif text-luxe-white mb-2">Digital Verification</h2>
        <p className="text-luxe-gray">Securely verify your identity to insure your ride.</p>
      </div>

      <div className="grid gap-6">
        {!user ? (
          <Card className="border-luxe-gold/50 bg-luxe-gold/5">
            <CardContent className="p-8 text-center space-y-4">
              <LockIcon className="w-12 h-12 text-luxe-gold mx-auto" />
              <h3 className="text-xl font-medium text-luxe-white">Account Required</h3>
              <p className="text-luxe-gray">Please sign in or create an account to verify your documents.</p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => navigate('/login?redirect=/booking/verification')}>Log In</Button>
                <Button variant="outline" onClick={() => navigate('/signup?redirect=/booking/verification')}>Sign Up</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <div className="p-4 border-b border-luxe-gray/10 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-luxe-gold" />
                <h3 className="font-medium text-luxe-white">Required Documents</h3>
              </div>
              <CardContent className="p-6 space-y-6">
                <div>
                  <p className="text-sm font-medium text-luxe-white mb-2">Driving License (Front)</p>
                  <FileUpload
                    bucket="documents"
                    onUploadComplete={handleUploadSuccess}
                    label="Upload DL Front"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-luxe-white mb-2">Driving License (Back)</p>
                  <FileUpload
                    bucket="documents"
                    onUploadComplete={handleUploadSuccess}
                    label="Upload DL Back"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-luxe-white mb-2">AADHAR / ID Proof</p>
                  <FileUpload
                    bucket="documents"
                    onUploadComplete={handleUploadSuccess}
                    label="Upload ID Proof"
                  />
                </div>

                <div className="bg-luxe-dark p-4 rounded text-xs text-luxe-gray flex gap-2">
                  <LockIcon className="w-4 h-4 flex-shrink-0" />
                  <p>Your documents are encrypted and stored securely. They are only viewed by our verification team.</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button className="flex-[2]" onClick={handleNext}>
                Proceed to Payment <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
