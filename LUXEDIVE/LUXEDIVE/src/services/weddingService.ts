import { supabase } from '../lib/supabaseClient'

export const weddingService = {
  async submitInquiry(data: {
      name: string
      email: string
      phone: string
      wedding_date: string
      venue?: string
      requirements?: string
      budget_range?: string
  }) {
      const { error } = await supabase
        .from('cms_inquiries') // Assuming a generic inquiry table or specific
        .insert({
            type: 'wedding',
            payload: data,
            status: 'new'
        })
      
      if (error) throw error
  },

  async bookConsultation(slotId: string, userId: string) {
      // Logic to book a calendar slot
      return { success: true, link: 'https://meet.google.com/abc-defg-hij' }
  },

  async getWeddingFleet() {
      // Filter cars by 'wedding_friendly' flag
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('is_available', true)
        // .eq('tags', 'wedding') // Hypothetical
      
      if (error) throw error
      return data
  }
}
