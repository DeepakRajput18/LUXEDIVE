import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import { Checkbox } from '../../components/ui/Checkbox'
import { toast } from 'sonner'

const CHECKLIST_ITEMS = [
    "Vehicle Registration Certificate (RC) Original",
    "Insurance Policy Copy",
    "Spare Key",
    "Spare Tyre & Jack",
    "Full Tank Fuel (Verified Gauge)"
]

export default function DigitalHandover() {
  const navigate = useNavigate()
  const [checkedItems, setCheckedItems] = useState<string[]>([])

  const toggle = (item: string) => {
      setCheckedItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])
  }

  const handleComplete = () => {
      if (checkedItems.length !== CHECKLIST_ITEMS.length) {
          toast.error("Please verify all items")
          return
      }
      toast.success("Handover Complete! Enjoy the ride.")
      navigate('/dashboard')
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-8">
        <div className="text-center">
            <h1 className="text-2xl font-serif text-luxe-white mb-2">Vehicle Handoff</h1>
            <p className="text-luxe-gray">Please verify the following items are present before accepting keys.</p>
        </div>

        <Card>
            <CardContent className="p-6 space-y-4">
                {CHECKLIST_ITEMS.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-3 rounded hover:bg-luxe-gray/5 pointer-events-none-auto" onClick={() => toggle(item)}>
                        <Checkbox checked={checkedItems.includes(item)} onCheckedChange={() => toggle(item)} />
                        <span className="text-luxe-white text-sm">{item}</span>
                    </div>
                ))}
            </CardContent>
        </Card>

        <Button className="w-full h-12" onClick={handleComplete}>
            Accept Vehicle & Start Rental
        </Button>
    </div>
  )
}
