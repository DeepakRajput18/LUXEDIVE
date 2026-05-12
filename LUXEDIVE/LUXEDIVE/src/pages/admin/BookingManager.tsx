import { useEffect, useState } from 'react'
import { adminService } from '../../services/adminService'
import { Button } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Skeleton } from '../../components/ui/Skeleton'
import { toast } from 'sonner'
import { Check, X, Eye } from 'lucide-react'

export default function BookingManager() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminService.getAllBookings().then((data) => {
        setBookings(data || [])
        setLoading(false)
    }).catch(console.error)
  }, [])

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
      try {
          // Map to DB status values
          const statusMap = { 'approve': 'confirmed', 'reject': 'cancelled' }
          await adminService.updateBookingStatus(id, statusMap[action])
          
          setBookings(prev => prev.map(b => b.id === id ? { ...b, status: statusMap[action] } : b))
          toast.success(`Booking ${action}d`)
      } catch (e) {
          toast.error("Action Failed")
      }
  }

  if (loading) return <Skeleton className="h-96" />

  return (
    <div className="space-y-8">
        <h1 className="text-3xl font-serif text-luxe-white">Booking Requests</h1>
        
        <Card className="overflow-hidden">
             <div className="overflow-x-auto">
                 <table className="w-full text-left">
                     <thead className="bg-luxe-dark text-luxe-gray text-xs uppercase">
                         <tr>
                             <th className="p-4">ID</th>
                             <th className="p-4">Customer</th>
                             <th className="p-4">Vehicle</th>
                             <th className="p-4">Dates</th>
                             <th className="p-4">Status</th>
                             <th className="p-4">Total</th>
                             <th className="p-4">Actions</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-luxe-gray/10">
                         {bookings.map((booking) => (
                             <tr key={booking.id} className="hover:bg-luxe-gray/5 transition-colors">
                                 <td className="p-4 font-mono text-xs text-luxe-gray">{booking.id.slice(0,8)}</td>
                                 <td className="p-4 text-luxe-white">{booking.profile?.full_name || booking.user_id.slice(0,5)}</td>
                                 <td className="p-4 text-luxe-white font-medium">{booking.car?.brand} {booking.car?.model}</td>
                                 <td className="p-4 text-sm text-luxe-gray">
                                     {new Date(booking.pickup_datetime).toLocaleDateString()}
                                 </td>
                                 <td className="p-4"><Badge variant={booking.status}>{booking.status}</Badge></td>
                                 <td className="p-4 text-luxe-gold font-medium">₹{booking.total_price?.toLocaleString()}</td>
                                 <td className="p-4">
                                     <div className="flex gap-2">
                                         <Button size="icon" variant="outline" title="View"><Eye className="w-4 h-4" /></Button>
                                         {booking.status === 'pending' || booking.status === 'pending_payment' ? (
                                             <>
                                                 <Button size="icon" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleAction(booking.id, 'approve')}><Check className="w-4 h-4" /></Button>
                                                 <Button size="icon" variant="destructive" onClick={() => handleAction(booking.id, 'reject')}><X className="w-4 h-4" /></Button>
                                             </>
                                         ) : null}
                                     </div>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
        </Card>
    </div>
  )
}
