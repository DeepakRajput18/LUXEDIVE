import { supabase } from '../lib/supabaseClient'

export interface UserAddress {
    id: string
    user_id: string
    label: string
    address_line1: string
    address_line2?: string
    city: string
    state: string
    zip: string
    is_default: boolean
    created_at?: string
}

export const addressService = {
    async getAddresses() {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.access_token) throw new Error('Not authenticated')

        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/user-data/addresses`, {
            headers: {
                'Authorization': `Bearer ${session.access_token}`
            }
        })

        if (!response.ok) throw new Error('Failed to fetch addresses')
        const result = await response.json()
        return result.addresses as UserAddress[]
    },

    async addAddress(address: Omit<UserAddress, 'id' | 'created_at'>) {
        const { data, error } = await supabase
            .from('user_addresses')
            .insert(address)
            .select()
            .single()
            
        if (error) throw error
        return data as UserAddress
    },

    async deleteAddress(id: string) {
        const { error } = await supabase
            .from('user_addresses')
            .delete()
            .eq('id', id)
            
        if (error) throw error
    },
    
    async setDefault(userId: string, addressId: string) {
        // Transaction-like update: Unset all others, set this one
        // Supabase doesn't support transactions in JS client easily without RPC
        // Doing two-step update
        
        await supabase
            .from('user_addresses')
            .update({ is_default: false })
            .eq('user_id', userId)
            
        const { error } = await supabase
            .from('user_addresses')
            .update({ is_default: true })
            .eq('id', addressId)
            
        if (error) throw error
    }
}
