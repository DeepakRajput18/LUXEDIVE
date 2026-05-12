import { supabase } from '../lib/supabaseClient'
import type { Booking } from '../types/app.types'

export const adminService = {
  // Stats for Admin Dashboard
  async getStats() {
    // Aggregate stats via RPC for efficiency
    try {
      const { data, error } = await supabase.rpc('get_admin_stats')
      if (!error && data) return data
    } catch (e) {
      console.warn("RPC get_admin_stats not available, falling back")
    }

    // Fallback: Manual aggregation (slower)
    const { count: pending } = await supabase.from('bookings').select('id', { count: 'exact', head: true }).in('status', ['draft', 'pending_payment', 'pending_approval'])
    const { count: active } = await supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'confirmed')
    const { data: revenueData } = await supabase.from('bookings').select('total_price').eq('status', 'completed')

    const totalRevenue = revenueData?.reduce((acc, curr) => acc + (curr.total_price || 0), 0) || 0

    return {
      total_revenue: totalRevenue,
      active_rentals: active || 0,
      pending_approvals: pending || 0,
      fleet_utilization: 65 // Hardcoded for now till sophisticated logic
    }
  },

  // Fleet Management
  async getAllCars() {
    const { data, error } = await supabase
      .from('cars')
      .select('id, brand, model, category, daily_rate, status, is_available, created_at, year, license_plate')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async updateCarStatus(carId: string, isAvailable: boolean) {
    const { error } = await supabase
      .from('cars')
      .update({ is_available: isAvailable })
      .eq('id', carId)

    if (error) throw error
  },

  // Booking Management
  async getAllBookings() {
    const { data, error } = await supabase
      .from('bookings')
      .select('id, user_id, car_id, delivery_type, pickup_datetime, dropoff_datetime, total_price, status, payment_status, created_at, car:cars(id, brand, model, license_plate), profile:profiles(id, full_name, email, phone)')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as any as Booking[]
  },

  async updateBookingStatus(bookingId: string, status: string) {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)

    if (error) throw error
  }
}
