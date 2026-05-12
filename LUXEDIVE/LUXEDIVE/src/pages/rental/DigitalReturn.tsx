import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import StarRating from '../../components/ui/StarRating'
import { Textarea } from '../../components/ui/Textarea'
import { Camera } from 'lucide-react'

export default function DigitalReturn() {
  const navigate = useNavigate()
  const [rating, setRating] = useState(0)

  const handleReturn = () => {
      // API call to finish booking
      navigate('/refund/estimator')
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4 space-y-8">
       <div className="text-center">
           <h1 className="text-3xl font-serif text-luxe-white mb-2">Trip Complete</h1>
           <p className="text-luxe-gray">We hope you enjoyed the experience. Please complete the handover.</p>
       </div>

       <Card>
           <CardContent className="p-6 space-y-6">
               <div>
                   <label className="text-sm font-medium text-luxe-white block mb-2">Vehicle Condition Proof</label>
                   <Button variant="outline" className="w-full h-24 border-dashed border-2 flex flex-col gap-2">
                       <Camera className="w-6 h-6 text-luxe-gray" />
                       <span className="text-xs text-luxe-gray">Upload final odometer & exterior photos</span>
                   </Button>
               </div>

               <div>
                   <label className="text-sm font-medium text-luxe-white block mb-2">Rate your Experience</label>
                   <div className="flex justify-center p-4 bg-luxe-gray/5 rounded-lg">
                       <StarRating rating={rating} onChange={setRating} size="lg" />
                   </div>
               </div>

               <Textarea placeholder="Any feedback or issues with the car?" className="h-32" />
           </CardContent>
       </Card>

       <Button className="w-full h-14 text-lg" onClick={handleReturn}>
           Complete Handover & Calculate Refund
       </Button>
    </div>
  )
}
