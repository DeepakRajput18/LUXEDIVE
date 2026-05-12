import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { bookingService } from '../../services/bookingService'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Skeleton } from '../../components/ui/Skeleton'
import { Car, Calendar, CreditCard, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export default function DashboardOverview() {
    const { user } = useAuth()
    const [bookings, setBookings] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) return
        async function loadData() {
            try {
                const data = await bookingService.getUserBookings(user!.id)
                setBookings(data)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [user])

    const activeBooking = bookings.find(b => ['confirmed', 'active'].includes(b.status))
    const upcomingBookings = bookings.filter(b => b.status === 'confirmed' && new Date(b.pickup_datetime) > new Date())
    const totalRentals = bookings.length

    if (loading) return <div className="space-y-4"><Skeleton className="h-40 w-full" /><Skeleton className="h-64 w-full" /></div>

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif text-luxe-white mb-2">Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'Member'}</h1>
                <p className="text-luxe-gray">Here is what's happening with your LUXEDIVE experience.</p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-luxe-gray text-xs uppercase tracking-wider">Total Rentals</p>
                            <p className="text-2xl font-serif text-luxe-gold">{totalRentals}</p>
                        </div>
                        <Car className="w-8 h-8 text-luxe-gray/20" />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-luxe-gray text-xs uppercase tracking-wider">Upcoming Trips</p>
                            <p className="text-2xl font-serif text-luxe-gold">{upcomingBookings.length}</p>
                        </div>
                        <Calendar className="w-8 h-8 text-luxe-gray/20" />
                    </CardContent>
                </Card>
            </div>

            {/* ACTIVE RENTAL BANNER */}
            {activeBooking ? (
                <Card className="border-luxe-gold/30 bg-luxe-gold/5">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-luxe-white flex items-center gap-2">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                </span>
                                Active Rental
                            </h3>
                            <Link to="/dashboard/active-rental">
                                <Button size="sm" variant="outline">Track Vehicle</Button>
                            </Link>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="w-24 h-16 bg-luxe-black rounded overflow-hidden">
                                {/* Img placeholder */}
                                <img src={activeBooking.car?.images?.[0] || 'https://placehold.co/100x60'} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-xl font-serif text-luxe-white mb-1">{activeBooking.car?.model}</p>
                                <p className="text-sm text-luxe-gray">Return due: {new Date(activeBooking.dropoff_datetime).toLocaleString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card className="border-dashed border-luxe-gray/20">
                    <CardContent className="p-8 text-center">
                        <p className="text-luxe-gray mb-4">You have no active rentals at the moment.</p>
                        <Link to="/fleet">
                            <Button>Book your next drive</Button>
                        </Link>
                    </CardContent>
                </Card>
            )}

            {/* RECENT ACTIVITY */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-serif text-luxe-white">Recent Activity</h3>
                    <Link to="/dashboard/bookings" className="text-sm text-luxe-gold hover:underline">View All</Link>
                </div>
                <div className="space-y-4">
                    {bookings.slice(0, 3).map(booking => (
                        <div key={booking.id} className="flex items-center justify-between p-4 bg-luxe-dark/40 rounded-lg border border-luxe-gray/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded bg-luxe-gray/10 flex items-center justify-center text-luxe-gray">
                                    <Car className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-medium text-luxe-white">{booking.car?.brand} {booking.car?.model}</p>
                                    <p className="text-xs text-luxe-gray">{new Date(booking.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-luxe-white">₹{booking.total_price.toLocaleString()}</p>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${booking.status === 'completed' ? 'bg-emerald-900/30 text-emerald-400' :
                                        booking.status === 'cancelled' ? 'bg-red-900/30 text-red-400' :
                                            'bg-blue-900/30 text-blue-400'
                                    }`}>
                                    {booking.status}
                                </span>
                            </div>
                        </div>
                    ))}
                    {bookings.length === 0 && <p className="text-luxe-gray text-center py-4">No booking history found.</p>}
                </div>
            </div>
        </div>
    )
}
