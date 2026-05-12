import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod' // Blueprint asked for this
import * as z from 'zod'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { weddingService } from '../../services/weddingService'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

// Simple schema (skipping Zod import if not working, but assuming it is)
// If Zod fails, I'll fallback to basic verification
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  date: z.string().min(1),
  venue: z.string().optional(),
  requirements: z.string().optional()
})

export default function BespokeInquiry() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
       resolver: zodResolver(schema)
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
      setLoading(true)
      try {
          await weddingService.submitInquiry({
              name: data.name,
              email: data.email,
              phone: data.phone,
              wedding_date: data.date,
              venue: data.venue,
              requirements: data.requirements
          })
          toast.success("Inquiry Sent! A wedding specialist will call you shortly.")
          navigate('/weddings')
      } catch (e) {
          toast.error("Submission failed. Please try again.")
      } finally {
          setLoading(false)
      }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
            <h1 className="text-3xl font-serif text-luxe-white mb-2">Plan Your Dream Drive</h1>
            <p className="text-luxe-gray">Tell us your vision, and we will curate the perfect fleet for your big day.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-luxe-dark/50 p-8 rounded-xl border border-luxe-gray/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-luxe-gray">Full Name</label>
                    <Input {...register('name')} placeholder="Raj Malhotra" />
                    {errors.name && <span className="text-red-400 text-xs">Required</span>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-luxe-gray">Event Date</label>
                    <Input type="date" {...register('date')} />
                    {errors.date && <span className="text-red-400 text-xs">Required</span>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-luxe-gray">Email</label>
                    <Input type="email" {...register('email')} placeholder="raj@example.com" />
                    {errors.email && <span className="text-red-400 text-xs">Invalid Email</span>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-luxe-gray">Phone</label>
                    <Input type="tel" {...register('phone')} placeholder="+91 98765 00000" />
                    {errors.phone && <span className="text-red-400 text-xs">Invalid Phone</span>}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-luxe-gray">Venue (Optional)</label>
                <Input {...register('venue')} placeholder="e.g., The Taj Palace, Ahmedabad" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-luxe-gray">Special Requirements</label>
                <Textarea {...register('requirements')} placeholder="Looking for a vintage Rolls Royce for Baraat and 2 BMWs for guests..." className="h-32" />
            </div>

            <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                {loading ? <Loader2 className="animate-spin mr-2" /> : 'Send Inquiry'}
            </Button>
        </form>
    </div>
  )
}
