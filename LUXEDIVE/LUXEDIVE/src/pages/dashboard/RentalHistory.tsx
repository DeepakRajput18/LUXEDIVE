import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../contexts/AuthContext'
import { History, Calendar, Car, User, Clock, Search, Filter, Printer, Download } from 'lucide-react'
import { Skeleton } from '../../components/ui/Skeleton'
import { Badge } from '../../components/ui/Badge'
import { toast } from 'sonner'
import BookingReceipt from '../../components/dashboard/BookingReceipt'
import type { BookingReceiptData } from '../../components/dashboard/BookingReceipt'

interface BookingHistory {
  id: string
  carBrand: string
  carModel: string
  carImage: string
  startDate: string
  endDate: string
  totalAmount: number
  status: string
  bookingCode: string
  chauffeurName?: string
}

export default function RentalHistory() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<BookingHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [printingBooking, setPrintingBooking] = useState<BookingReceiptData | null>(null)
  const [isPrinting, setIsPrinting] = useState(false)

  useEffect(() => {
    if (user) loadHistory()
  }, [user])

  const loadHistory = async () => {
    try {
      setLoading(true)
      // Fetch completed or cancelled bookings
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          car_id,
          start_date,
          end_date,
          total_price,
          status,
          booking_code,
          cars (brand, model, main_image),
          chauffeur_id,
          chauffeurs (full_name)
        `)
        .eq('user_id', user?.id)
        .in('status', ['completed', 'cancelled', 'refunded'])
        .order('start_date', { ascending: false })

      if (error) throw error

      const formatted = data.map((b: any) => ({
        id: b.id,
        carBrand: b.cars?.brand || 'Unknown',
        carModel: b.cars?.model || 'Vehicle',
        carImage: b.cars?.main_image || '',
        startDate: b.start_date,
        endDate: b.end_date,
        totalAmount: b.total_price,
        status: b.status,
        bookingCode: b.booking_code,
        chauffeurName: b.chauffeurs?.full_name
      }))

      setBookings(formatted)
    } catch (err) {
      console.error('History load error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePrintReceipt = async (bookingId: string) => {
    try {
      setIsPrinting(true)
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          booking_number,
          pickup_datetime,
          dropoff_datetime,
          base_price,
          addons_price,
          tax_amount,
          total_price,
          delivery_address,
          cars (brand, model, category),
          profiles (full_name, email, phone),
          chauffeurs (full_name, experience_years, price_per_day)
        `)
        .eq('id', bookingId)
        .single()

      if (error) throw error

      const pickupDate = new Date(data.pickup_datetime)
      const dropoffDate = new Date(data.dropoff_datetime)
      const durationDays = Math.ceil((dropoffDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24))

      const receiptData: BookingReceiptData = {
        bookingNumber: data.booking_number || data.id.slice(0, 8).toUpperCase(),
        customer: {
          name: data.profiles?.full_name || 'Guest Customer',
          phone: data.profiles?.phone || 'N/A',
          email: data.profiles?.email || 'N/A'
        },
        car: {
          brand: data.cars?.brand || 'Premium',
          model: data.cars?.model || 'Vehicle',
          category: data.cars?.category || 'Luxury',
          image: data.cars?.images?.[0]
        },
        chauffeur: data.chauffeurs ? {
          name: data.chauffeurs.full_name,
          experience: data.chauffeurs.experience_years,
          charges: data.chauffeurs.price_per_day * durationDays
        } : undefined,
        trip: {
          pickup: data.delivery_address || 'LUXEDIVE Main Branch',
          dropoff: data.delivery_address || 'LUXEDIVE Main Branch',
          pickupDate: pickupDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          pickupTime: pickupDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          dropoffDate: dropoffDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          dropoffTime: dropoffDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          duration: `${durationDays} Day(s)`
        },
        payment: {
          basePrice: data.base_price,
          chauffeurCharge: data.chauffeurs ? data.chauffeurs.price_per_day * durationDays : 0,
          taxes: data.tax_amount || 0,
          totalPrice: data.total_price
        }
      }

      setPrintingBooking(receiptData)
      
      // Allow specialized print component to mount
      setTimeout(() => {
        window.print()
        setPrintingBooking(null)
      }, 500)

    } catch (err: any) {
      console.error('Print Error:', err)
      toast.error('Failed to generate receipt. Please try again.')
    } finally {
      setIsPrinting(false)
    }
  }

  const filteredBookings = bookings.filter(b => 
    b.carBrand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.carModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Rental History</h1>
          <p className="text-sm text-gray-400 mt-1 font-light italic">Your heritage of luxury experiences.</p>
        </div>

        <div className="relative group max-w-sm w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-luxe-gold transition-colors" />
          <input 
            type="text"
            placeholder="Search bookings, cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-luxe-gold/50 focus:border-luxe-gold/50 transition-all font-bold tracking-wider uppercase"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => <Skeleton key={i} className="h-32 bg-white/5 rounded-2xl w-full" />)}
        </div>
      ) : filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map(item => (
            <div key={item.id} className="bg-[#121212] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 group hover:border-white/10 transition-all">
              <div className="w-full md:w-40 aspect-[16/10] rounded-xl overflow-hidden bg-zinc-900 border border-white/5">
                <img 
                  src={item.carImage} 
                  alt={item.carBrand} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.bookingCode}</span>
                  <StatusBadge status={item.status} />
                </div>
                <h3 className="text-xl font-serif text-white">{item.carBrand} {item.carModel}</h3>
                <div className="flex flex-wrap items-center gap-6 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {new Date(item.startDate).toLocaleDateString()}</span>
                  <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {new Date(item.endDate).toLocaleDateString()}</span>
                  {item.chauffeurName && (
                    <span className="flex items-center gap-2"><User className="w-3 h-3" /> Chauffeur: {item.chauffeurName}</span>
                  )}
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-3">
                <div className="text-right">
                  <div className="text-2xl font-serif text-white">₹{item.totalAmount.toLocaleString()}</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Total Paid</div>
                </div>
                
                <button 
                  onClick={() => handlePrintReceipt(item.id)}
                  disabled={isPrinting}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-luxe-gold/20 border border-white/10 hover:border-luxe-gold/50 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest transition-all disabled:opacity-50"
                >
                  <Printer className="w-3.5 h-3.5 text-luxe-gold" />
                  Print Receipt
                </button>
              </div>
            </div>
          ))}
          
          {/* Hidden Print Container */}
          {printingBooking && (
            <div className="hidden">
              <BookingReceipt data={printingBooking} />
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
          <History className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500 font-light italic">No past bookings found matching your search.</p>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
    const config = {
        completed: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        cancelled: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
        refunded: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    }[status] || 'bg-gray-500/10 text-gray-500 border-gray-500/20'

    return (
        <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-widest ${config}`}>
            {status}
        </span>
    )
}
