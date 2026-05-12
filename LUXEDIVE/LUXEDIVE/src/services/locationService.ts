import { supabase } from '../lib/supabaseClient';

export const locationService = {
    async getServiceableAreas() {
        // Assuming all locations in DB are serviceable or we should filter by another method
        // For now, return all locations
        const { data, error } = await supabase
            .from('locations')
            .select('*');

        if (error) throw error;
        return data;
    },

    async validatePincode(pincode: string) {
        const { data, error } = await supabase
            .from('locations')
            .select('*')
            .eq('pincode', pincode)
            .single();

        if (error) throw error;
        return data;
    }
};
