import { supabase } from '../lib/supabaseClient'
import type { Booking } from '../types/app.types'

export type { Booking }


export const bookingService = {
  // Create new booking
  async createBooking(bookingData: {
    user_id: string
    car_id: string
    pickup_datetime: string
    dropoff_datetime: string
    total_price: number
    status?: string
    payment_status?: string
    delivery_type: 'self_pickup' | 'delivery'
    pickup_location?: any
    dropoff_location?: any
    metadata?: any
  }) {
    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select()
      .single()

    if (error) throw error

    // Trigger notification (fire and forget)
    supabase.functions.invoke('send-notification', {
      body: {
        type: 'booking_confirmation',
        bookingId: data.id,
        userId: bookingData.user_id
      }
    }).catch(console.error)

    return data
  },

  // Get user history
  async getUserBookings() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.access_token) throw new Error('Not authenticated')

    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/user-data/bookings`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch bookings')
    }

    const result = await response.json()
    return result.bookings
  },

  // Get single booking
  async getBookingById(bookingId: string) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.access_token) throw new Error('Not authenticated')

    // Using the isolated endpoint that verifies ownership
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/user-data/bookings`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    })

    if (!response.ok) throw new Error('Failed to fetch booking context')
    
    const result = await response.json()
    // Find the specific booking in the isolated result set
    const booking = result.bookings.find((b: any) => b.id === bookingId)
    
    if (!booking) {
      throw new Error('Access denied or booking not found')
    }

    return booking
  },

  // Update helpers
  async updateStatus(bookingId: string, status: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select()

    if (error) throw error
    return data
  },

  async checkAvailability(carId: string, startDate: Date, endDate: Date): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('id')
        .eq('car_id', carId)
        .neq('status', 'cancelled')
        .neq('status', 'completed')
        .lt('pickup_datetime', endDate.toISOString())
        .gt('dropoff_datetime', startDate.toISOString())

      if (error) {
        console.error('Availability check failed:', error)
        return true
      }

      return !data || data.length === 0
    } catch (e) {
      console.error('Availability check error:', e)
      return true
    }
  }
}
