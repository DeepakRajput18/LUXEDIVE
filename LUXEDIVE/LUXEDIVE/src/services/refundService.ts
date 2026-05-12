import { supabase } from '../lib/supabaseClient'

export const refundService = {
  // Calculate potential refund
  async calculateRefund(bookingId: string) {
      // Mock calculation logic. Real logic would query tolls, fines, damages tables.
      const deposit = 50000
      const deductions = [
          { type: 'toll', amount: 450, desc: 'FastTag Usage' },
          { type: 'fuel', amount: 2000, desc: 'Refueling Charge (20L shortfall)' }
      ]
      
      const totalDeduction = deductions.reduce((acc, curr) => acc + curr.amount, 0)
      
      return {
          original_deposit: deposit,
          deductions,
          final_refund: deposit - totalDeduction
      }
  },

  async requestRefund(bookingId: string, bankDetails?: any) {
      const { data, error } = await supabase
        .from('refunds')
        .insert({
            booking_id: bookingId,
            status: 'processing',
            amount: 0 // placeholder, backend calculates
        })
        .select()
        
      if (error) throw error
      return data
  }
}
