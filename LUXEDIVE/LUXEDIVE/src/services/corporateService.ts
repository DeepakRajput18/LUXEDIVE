import { supabase } from '../lib/supabaseClient'

export const corporateService = {
  async submitLeaseInquiry(data: any) {
      const { error } = await supabase
        .from('cms_inquiries')
        .insert({
            type: 'corporate_lease',
            payload: data,
            status: 'new'
        })
      if (error) throw error
  },

  async verifyCorporateEmail(email: string) {
      // Check if domain is whitelist
      // Mock check
      const forbiddenDomains = ['gmail.com', 'yahoo.com', 'hotmail.com']
      const domain = email.split('@')[1]
      return !forbiddenDomains.includes(domain)
  }
}
