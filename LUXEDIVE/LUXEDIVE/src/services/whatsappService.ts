import { supabase } from '../lib/supabaseClient'

export const whatsappService = {
  // Send transactional message
  async sendMessage(to: string, template: 'booking_confirmation' | 'payment_link' | 'otp', variables: any) {
      const { data, error } = await supabase.functions.invoke('send-notification', {
          body: {
              channel: 'whatsapp',
              to,
              template,
              variables
          }
      })
      
      if (error) console.error("WA Send Failed", error)
      return data
  },

  // Helper for specific actions
  async sendBookingConfirmation(to: string, bookingDetails: any) {
      return this.sendMessage(to, 'booking_confirmation', {
          car_model: bookingDetails.carModel,
          date: bookingDetails.date
      })
  }
}
