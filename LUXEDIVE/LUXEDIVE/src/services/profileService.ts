import { supabase } from '../lib/supabaseClient'

export const profileService = {
  async getProfile() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.access_token) throw new Error('Not authenticated')

    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/user-data/profile`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    })

    if (!response.ok) throw new Error('Failed to fetch profile')
    const result = await response.json()
    return result.profile
  },

  // Dashboard Stats Aggregation
  async getDashboardStats() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.access_token) throw new Error('Not authenticated')

    // Since we simplified the endpoints, we'll fetch from the isolated bookings route
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/user-data/bookings`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    })

    if (!response.ok) throw new Error('Failed to fetch stats context')
    const result = await response.json()
    const bookings = result.bookings || []

    return {
      total_rentals: bookings.length,
      active_rentals: bookings.filter((b: any) => ['active', 'confirmed'].includes(b.status)).length,
      reward_points: 0 // placeholder
    }
  }
}
