import { supabase, publicSupabase } from '../lib/supabaseClient'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface DemandPrediction {
    id: string
    car_id: string
    prediction_date: string
    demand_score: number
    predicted_bookings: number
    confidence_level: 'low' | 'medium' | 'high'
    peak_start_date: string | null
    peak_end_date: string | null
    factors: {
        is_weekend: boolean
        month: number
        category: string
        events: string[]
        base_score: number
    }
    created_at: string
}

export interface TrendingCar {
    car_id: string
    demand_score: number
    predicted_bookings: number
    confidence_level: 'low' | 'medium' | 'high'
    prediction_date: string
    factors: DemandPrediction['factors']
    cars: {
        id: string
        brand: string
        model: string
        category: string
        daily_rate: number
        images: string[]
        specs?: {
            engine: string
            hp: string
            acceleration: string
        }
    }
}

export interface AhmedabadEvent {
    id: string
    event_name: string
    event_type: 'wedding_season' | 'festival' | 'holiday' | 'ipl' | 'corporate_event' | 'other'
    start_date: string
    end_date: string
    impact_level: 'low' | 'medium' | 'high' | 'very_high'
    affected_categories: string[]
}

// ─────────────────────────────────────────────────────────────────────────────
// Demand Service
// ─────────────────────────────────────────────────────────────────────────────

export const demandService = {
    /**
     * Get top trending cars by demand score for the next 7 days.
     * De-duped: one entry per car (highest score in the window).
     */
    async getTrendingCars(limit = 8): Promise<TrendingCar[]> {
        const today = new Date().toISOString().split('T')[0]
        const in7Days = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]

        const { data, error } = await publicSupabase
            .from('demand_predictions')
            .select(`
        car_id,
        demand_score,
        predicted_bookings,
        confidence_level,
        prediction_date,
        factors,
        cars (
          id,
          brand,
          model,
          category,
          daily_rate,
          images\r\n        )
      `)
            .gte('prediction_date', today)
            .lte('prediction_date', in7Days)
            .gte('demand_score', 0.10)
            .order('demand_score', { ascending: false })
            .limit(limit * 3) // fetch more to de-dup

        if (error) {
            console.error('[demandService] getTrendingCars error:', error)
            return []
        }

        // De-duplicate: keep highest-score entry per car
        const seen = new Set<string>()
        const deduped: TrendingCar[] = []
        for (const row of (data as unknown as TrendingCar[])) {
            if (!seen.has(row.car_id) && row.cars) {
                seen.add(row.car_id)
                deduped.push(row)
            }
            if (deduped.length >= limit) break
        }

        return deduped
    },

    /**
     * Get demand predictions for a specific car over the next 30 days.
     */
    async getCarDemand(carId: string): Promise<DemandPrediction[]> {
        // Non-UUID car IDs (mock only) have no DB record — return empty
        const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        if (!UUID_REGEX.test(carId)) return []

        const today = new Date().toISOString().split('T')[0]
        const in30Days = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]

        const { data, error } = await publicSupabase
            .from('demand_predictions')
            .select('*')
            .eq('car_id', carId)
            .gte('prediction_date', today)
            .lte('prediction_date', in30Days)
            .order('prediction_date', { ascending: true })

        if (error) {
            console.error('[demandService] getCarDemand error:', error)
            return []
        }

        return (data || []) as DemandPrediction[]
    },

    /**
     * Get the single highest demand score for a car in the next 30 days.
     * Use this for the "demand badge" display on car cards/details.
     */
    async getPeakDemand(carId: string): Promise<DemandPrediction | null> {
        const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        if (!UUID_REGEX.test(carId)) return null

        const today = new Date().toISOString().split('T')[0]
        const in30Days = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]

        const { data, error } = await publicSupabase
            .from('demand_predictions')
            .select('*')
            .eq('car_id', carId)
            .gte('prediction_date', today)
            .lte('prediction_date', in30Days)
            .order('demand_score', { ascending: false })
            .limit(1)
            .maybeSingle()

        if (error) return null
        return data as DemandPrediction | null
    },

    /**
     * Get all upcoming Ahmedabad events (from today onwards).
     */
    async getUpcomingEvents(limit = 10): Promise<AhmedabadEvent[]> {
        const today = new Date().toISOString().split('T')[0]

        const { data, error } = await publicSupabase
            .from('ahmedabad_events')
            .select('*')
            .gte('end_date', today)
            .order('start_date', { ascending: true })
            .limit(limit)

        if (error) {
            console.error('[demandService] getUpcomingEvents error:', error)
            return []
        }

        return (data || []) as AhmedabadEvent[]
    },

    /**
     * Record a car page view for analytics.
     * Uses UPSERT: increments view_count for today's date.
     */
    async recordCarView(carId: string): Promise<void> {
        const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        if (!UUID_REGEX.test(carId)) return

        const today = new Date().toISOString().split('T')[0]

        // Try to increment existing row
        const { data: existing } = await publicSupabase
            .from('car_search_analytics')
            .select('id, view_count')
            .eq('car_id', carId)
            .eq('search_date', today)
            .maybeSingle()

        if (existing) {
            await publicSupabase
                .from('car_search_analytics')
                .update({ view_count: existing.view_count + 1 })
                .eq('id', existing.id)
        } else {
            await publicSupabase
                .from('car_search_analytics')
                .insert({ car_id: carId, search_date: today, view_count: 1 })
        }
    },

    /**
     * Record a "View Details" click for analytics.
     */
    async recordCarClick(carId: string): Promise<void> {
        const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        if (!UUID_REGEX.test(carId)) return

        const today = new Date().toISOString().split('T')[0]

        const { data: existing } = await publicSupabase
            .from('car_search_analytics')
            .select('id, click_count')
            .eq('car_id', carId)
            .eq('search_date', today)
            .maybeSingle()

        if (existing) {
            await publicSupabase
                .from('car_search_analytics')
                .update({ click_count: (existing.click_count || 0) + 1 })
                .eq('id', existing.id)
        } else {
            await publicSupabase
                .from('car_search_analytics')
                .insert({ car_id: carId, search_date: today, click_count: 1 })
        }
    },

    /**
     * Get all predictions across all cars, sorted by score.
     * Used by admin dashboard.
     */
    async getAllPredictions(limit = 100): Promise<TrendingCar[]> {
        const today = new Date().toISOString().split('T')[0]

        const { data, error } = await publicSupabase
            .from('demand_predictions')
            .select(`
        car_id,
        demand_score,
        predicted_bookings,
        confidence_level,
        prediction_date,
        factors,
        cars (
          id,
          brand,
          model,
          category,
          daily_rate,
          images\r\n        )
      `)
            .eq('prediction_date', today)
            .order('demand_score', { ascending: false })
            .limit(limit)

        if (error) {
            console.error('[demandService] getAllPredictions error:', error)
            return []
        }

        return (data as unknown as TrendingCar[])
            .filter((d: TrendingCar) => d.cars)
    },

    /**
     * Get demand summary stats for admin overview.
     */
    async getDemandStats() {
        const today = new Date().toISOString().split('T')[0]

        const { data, error } = await publicSupabase
            .from('demand_predictions')
            .select('demand_score, confidence_level')
            .eq('prediction_date', today)

        if (error || !data) {
            return { avgScore: 0, highDemandCount: 0, totalCars: 0 }
        }

        const avgScore = data.reduce((s, d) => s + Number(d.demand_score), 0) / data.length
        const highDemandCount = data.filter(d => Number(d.demand_score) >= 0.7).length

        return {
            avgScore: Math.round(avgScore * 100),
            highDemandCount,
            totalCars: data.length
        }
    }
}
