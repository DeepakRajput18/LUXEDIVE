import { supabase } from '../lib/supabaseClient';

// Minimal type definition or any to bypass missing generated types
type TicketInsert = any;

export const supportService = {
    async getFAQs(category?: string) {
        let query = supabase.from('faqs').select('*');

        if (category) {
            query = query.eq('category', category);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    async createTicket(ticketData: any) {
        const ticketNumber = `TKT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

        // Cast to any or partial to avoid strict overlap issues if fields are optional but mapped differently
        const payload = { ...ticketData, ticket_number: ticketNumber };

        const { data, error } = await supabase
            .from('support_tickets')
            .insert(payload)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};
