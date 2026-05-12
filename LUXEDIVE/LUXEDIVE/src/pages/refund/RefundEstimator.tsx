import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { refundService } from '../../services/refundService'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Skeleton } from '../../components/ui/Skeleton'
import { Separator } from '../../components/ui/Separator' // Assuming exists or using hr
import { AlertCircle, ArrowDown } from 'lucide-react'

export default function RefundEstimator() {
  const navigate = useNavigate()
  const [estimate, setEstimate] = useState<any>(null)
  
  useEffect(() => {
    refundService.calculateRefund('mock-id').then(setEstimate)
  }, [])

  if (!estimate) return <div className="p-20"><Skeleton className="h-96" /></div>

  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-8">
        <h1 className="text-2xl font-serif text-luxe-white text-center">Settlement Summary</h1>

        <Card className="bg-luxe-dark border-luxe-gray/10">
            <CardContent className="p-6 space-y-4">
                <div className="flex justify-between">
                    <span className="text-luxe-gray">Security Deposit Paid</span>
                    <span className="text-luxe-white font-medium">₹{estimate.original_deposit.toLocaleString()}</span>
                </div>

                <div className="py-2">
                    <p className="text-xs uppercase text-luxe-gray mb-2 font-bold tracking-wider">Deductions</p>
                    {estimate.deductions.map((d: any, i: number) => (
                        <div key={i} className="flex justify-between text-sm text-red-300 mb-1">
                            <span>{d.desc}</span>
                            <span>- ₹{d.amount.toLocaleString()}</span>
                        </div>
                    ))}
                    {estimate.deductions.length === 0 && <p className="text-xs text-luxe-gray italic">None</p>}
                </div>

                <div className="border-t border-luxe-gray/10 pt-4">
                    <div className="flex justify-between items-end">
                        <span className="text-luxe-white font-serif text-lg">Net Refund</span>
                        <span className="text-emerald-400 font-bold text-2xl">₹{estimate.final_refund.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-luxe-gray text-right mt-1">Processed within 24 hours</p>
                </div>
            </CardContent>
        </Card>

        <div className="bg-luxe-gray/5 p-4 rounded text-xs text-luxe-gray flex gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>If you disagree with any deductions (e.g., fuel charges), you can raise a dispute in the next step.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => navigate('/refund/dispute')}>Dispute Charges</Button>
            <Button onClick={() => navigate('/refund/success')}>Accept & Refund</Button>
        </div>
    </div>
  )
}
