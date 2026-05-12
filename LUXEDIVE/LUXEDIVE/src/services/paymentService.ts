import { supabase } from '../lib/supabaseClient';

interface CreateOrderParams {
    bookingId: string;
    amount: number;
    currency?: string;
    gateway?: string;
}

export const paymentService = {
    /**
     * Calls the create-payment-order edge function
     */
    async createOrder(params: CreateOrderParams) {
        const { data, error } = await supabase.functions.invoke('create-payment-order', {
            body: params
        });

        if (error) throw new Error(error.message);
        if (!data.success) throw new Error(data.error || 'Failed to create payment order');

        return data; // returns { order_id, amount, currency, payment_record_id, gateway_data }
    },

    /**
     * Calls the verify-payment edge function
     */
    async verifyPayment(params: any) {
        const { data, error } = await supabase.functions.invoke('verify-payment', {
            body: params
        });

        if (error) throw new Error(error.message);
        if (!data.success) throw new Error(data.error || 'Payment verification failed');

        return data;
    },

    /**
     * Admin only: Trigger a refund
     */
    async requestRefund(paymentId: string, amount?: number, reason?: string) {
        const { data, error } = await supabase.functions.invoke('process-refund', {
            body: { payment_id: paymentId, amount, reason }
        });

        if (error) throw new Error(error.message);
        if (!data.success) throw new Error(data.error || 'Refund processing failed');

        return data;
    }
};
