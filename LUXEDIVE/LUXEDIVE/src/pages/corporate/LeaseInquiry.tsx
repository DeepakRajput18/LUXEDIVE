import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Textarea } from '../../components/ui/Textarea'
import { corporateService } from '../../services/corporateService'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

const schema = z.object({
  companyName: z.string().min(2),
  contactPerson: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  fleetSize: z.string(),
  duration: z.string(),
})

export default function LeaseInquiry() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
       resolver: zodResolver(schema)
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
      setLoading(true)
      try {
            const isCorporate = await corporateService.verifyCorporateEmail(data.email)
            if (!isCorporate) {
                toast.warning("Please use an official company email address.")
                setLoading(false)
                return
            }

            await corporateService.submitLeaseInquiry(data)
            toast.success("Request Received. Our B2B team will contact you.")
            navigate('/corporate')
      } catch (e) {
            toast.error("Submission failed.")
      } finally {
            setLoading(false)
      }
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
            <h1 className="text-3xl font-serif text-luxe-white mb-2">Corporate Lease Inquiry</h1>
            <p className="text-luxe-gray">Long-term mobility solutions tailored for your organization.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-luxe-dark/50 p-8 rounded-xl border border-luxe-gray/10">
            <div className="space-y-2">
                <label className="text-sm font-medium text-luxe-gray">Company Name</label>
                <Input {...register('companyName')} placeholder="Acme Corp Pvt Ltd" />
                {errors.companyName && <span className="text-red-400 text-xs">Required</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-luxe-gray">Contact Person</label>
                    <Input {...register('contactPerson')} />
                    {errors.contactPerson && <span className="text-red-400 text-xs">Required</span>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-luxe-gray">Work Email</label>
                    <Input type="email" {...register('email')} placeholder="you@company.com" />
                    {errors.email && <span className="text-red-400 text-xs">Invalid Email</span>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-luxe-gray">Fleet Size Needed</label>
                    <Select {...register('fleetSize')}>
                        <option value="1-5">1-5 Cars</option>
                        <option value="6-20">6-20 Cars</option>
                        <option value="20+">20+ Cars</option>
                    </Select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-luxe-gray">Lease Duration</label>
                    <Select {...register('duration')}>
                        <option value="1-3">1-3 Months</option>
                        <option value="3-12">3-12 Months</option>
                        <option value="1year+">1 Year+</option>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-luxe-gray">Phone</label>
                <Input type="tel" {...register('phone')} />
                {errors.phone && <span className="text-red-400 text-xs">Required</span>}
            </div>

            <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                {loading ? <Loader2 className="animate-spin mr-2" /> : 'Request Proposal'}
            </Button>
        </form>
    </div>
  )
}
