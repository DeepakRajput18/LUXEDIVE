import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Calendar as CalendarIcon, Video } from 'lucide-react'
import { Calendar } from '../../components/ui/Calendar'
import { useState } from 'react'
import { toast } from 'sonner'

export default function VIPConsultation() {
  const navigate = useNavigate()
  const [date, setDate] = useState<Date | null>(null)

  const handleBook = () => {
      if (!date) return
      toast.success("Consultation Confirmed! Check email for Google Meet link.")
      navigate('/weddings')
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
                <h1 className="text-4xl font-serif text-luxe-white mb-6">Expert Guidance</h1>
                <p className="text-luxe-gray text-lg mb-8">
                    Schedule a 30-minute video call with our Wedding Fleet Specialist. We will help you coordinate your logistics, pick the right ribbons, and handle the timeline.
                </p>
                <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-luxe-white">
                        <div className="p-2 bg-luxe-gold/20 rounded-full text-luxe-gold"><Video className="w-5 h-5" /></div>
                        Google Meet / Zoom
                    </li>
                    <li className="flex items-center gap-3 text-luxe-white">
                        <div className="p-2 bg-luxe-gold/20 rounded-full text-luxe-gold"><CalendarIcon className="w-5 h-5" /></div>
                        Available 7 Days a Week
                    </li>
                </ul>
            </div>

            <Card className="bg-luxe-dark border-luxe-gray/10">
                <CardContent className="p-6">
                    <h3 className="text-xl font-serif text-luxe-white mb-6 text-center">Select a Date</h3>
                    <div className="flex justify-center mb-6">
                        <Calendar selected={date} onSelect={setDate} className="bg-black/50" />
                    </div>
                    {date && (
                        <div className="mb-6 grid grid-cols-3 gap-2">
                            {['10:00', '14:00', '16:00'].map(t => (
                                <Button key={t} variant="outline" size="sm">{t}</Button>
                            ))}
                        </div>
                    )}
                    <Button className="w-full h-12" disabled={!date} onClick={handleBook}>Confirm Booking</Button>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
