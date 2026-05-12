import { useEffect, useState } from 'react'
import type { Booking } from '../../types/app.types'
import { useAuth } from '../../contexts/AuthContext'
import { bookingService } from '../../services/bookingService'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Skeleton } from '../../components/ui/Skeleton'
import { Calendar, MapPin, Clock } from 'lucide-react'

export default function MyBookings() {
    const { user } = useAuth()
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) return
        async function loadData() {
            try {
                const data = await bookingService.getUserBookings(user!.id)
                setBookings(data as any)
            } catch (e: unknown) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [user])

    if (loading) return <div className="space-y-4"><Skeleton className="h-32 w-full" /><Skeleton className="h-32 w-full" /></div>

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-serif text-luxe-white">Booking History</h1>

            <div className="grid gap-4">
                {bookings.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            {/* Car Image (Left) */}
                            <div className="md:col-span-1 h-48 md:h-auto bg-luxe-gray/10 relative">
                                <img
                                    src={booking.car?.images?.[0] || 'https://placehold.co/400x300/1e1e1e/d4af37'}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 left-2">
                                    <Badge className={`${booking.status === 'completed' ? 'bg-emerald-900/80 text-emerald-200' :
                                        booking.status === 'cancelled' ? 'bg-red-900/80 text-red-200' :
                                            'bg-blue-900/80 text-blue-200'
                                        }`}>
                                        {booking.status}
                                    </Badge>
                                </div>
                            </div>

                            {/* Details (Right) */}
                            <div className="md:col-span-3 p-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-serif text-luxe-white">{booking.car?.brand} {booking.car?.model}</h3>
                                        <p className="font-serif text-luxe-gold text-lg">₹{booking.total_price.toLocaleString()}</p>
                                    </div>
                                    <p className="text-sm text-luxe-gray mb-4">Ref: {booking.id.slice(0, 8).toUpperCase()}</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-luxe-gray/80">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-luxe-gold" />
                                            <span>
                                                {new Date(booking.pickup_datetime).toLocaleDateString()} - {new Date(booking.dropoff_datetime).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-luxe-gold" />
                                            <span>
                                                {new Date(booking.pickup_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Pickup
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-luxe-gold" />
                                            <span className="truncate max-w-[200px]">{booking.pickup_location || 'Self Pickup at HQ'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                    <Button variant="outline" size="sm">Download Invoice</Button>
                                    {booking.status === 'confirmed' && <Button size="sm">Track Vehicle</Button>}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
                {bookings.length === 0 && (
                    <div className="text-center py-20 bg-luxe-dark/30 rounded-lg border border-dashed border-luxe-gray/20">
                        <p className="text-luxe-gray">No bookings found in your history.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
