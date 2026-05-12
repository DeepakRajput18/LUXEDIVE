import { supabase } from '../lib/supabaseClient';

export interface DynamicPriceResult {
    vehicleId: string;
    basePrice: number;
    recommendedPrice: number;
    multiplier: string;
    factors: {
        totalDemandScore: number;
        isWeekend: boolean;
        isHighDemandMonth: boolean;
    };
    date: string;
}

export const getDynamicPrice = async (vehicleId: string, targetDate?: string): Promise<DynamicPriceResult | null> => {
    try {
        const queryParams = new URLSearchParams({ vehicle_id: vehicleId });
        if (targetDate) queryParams.append('date', targetDate);

        const { data, error } = await supabase.functions.invoke(`predict-pricing?${queryParams.toString()}`, {
            method: 'GET'
        });

        if (error) {
            console.warn("Could not fetch dynamic pricing:", error);
            return null;
        }

        return data as DynamicPriceResult;
    } catch (err) {
        console.error("Pricing Service error:", err);
        return null;
    }
};
