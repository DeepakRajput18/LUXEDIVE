import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Textarea } from '../../components/ui/Textarea'
import { FileUpload } from '../../components/ui/FileUpload'
import { toast } from 'sonner'

export default function DamageReview() {
  const navigate = useNavigate()

  const handleSubmit = () => {
      toast.success("Dispute raised. Our team will review within 48 hours.")
      navigate('/dashboard')
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4 space-y-6">
        <h1 className="text-2xl font-serif text-luxe-white">Raise a Dispute</h1>
        <p className="text-luxe-gray">Please explain why the charges are incorrect. Providing video/photo evidence increases approval chance.</p>

        <Card>
            <CardContent className="p-6 space-y-4">
                <Textarea placeholder="Describe the issue... (e.g., The scratch was present during pickup)" className="h-32" />
                
                <div>
                   <label className="text-sm font-medium text-luxe-white block mb-2">Supporting Evidence</label>
                   <FileUpload bucket="disputes" label="Upload Photos/Video" />
                </div>
            </CardContent>
        </Card>

        <Button className="w-full" onClick={handleSubmit}>Submit for Review</Button>
    </div>
  )
}
