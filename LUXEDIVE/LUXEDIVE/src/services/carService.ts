import { supabase, publicSupabase } from '../lib/supabaseClient'
import type { Car } from '../types/app.types'

export type { Car }

function normalizeCar(car: any): Car {
  let images = car.images || []
  if (car.image_url && !images.includes(car.image_url)) {
    images = [car.image_url, ...images]
  }

  return { ...car, images }
}

export const carService = {
  async getFleet(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    wedding_edition?: boolean;
    search?: string;
    sort?: string;
    includeUnavailable?: boolean;
    limit?: number;
    offset?: number;
  }) {
    let query = publicSupabase
      .from('cars')
      .select('id, brand, model, category, daily_rate, images, image_url, year, seating_capacity, transmission, fuel_type, is_available, status')

    if (!filters?.includeUnavailable) {
      query = query.eq('is_available', true)
    }
    if (filters?.category) {
      query = query.ilike('category', filters.category)
    }
    if (filters?.minPrice) {
      query = query.gte('daily_rate', filters.minPrice)
    }
    if (filters?.maxPrice) {
      query = query.lte('daily_rate', filters.maxPrice)
    }
    if (filters?.search) {
      query = query.ilike('model', `%${filters.search}%`)
    }

    if (filters?.sort === 'price_desc') {
      query = query.order('daily_rate', { ascending: false })
    } else if (filters?.sort === 'year_desc') {
      query = query.order('year', { ascending: false })
    } else {
      query = query.order('daily_rate', { ascending: true })
    }

    if (filters?.limit) {
      const from = filters.offset || 0;
      const to = from + filters.limit - 1;
      query = query.range(from, to)
    }

    const { data, error } = await query
    if (error) {
      console.error('Error fetching fleet:', error)
      return []
    }
    return (data || []).map(normalizeCar)
  },

  async getCarById(id: string) {
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!UUID_REGEX.test(id)) {
      throw new Error(`Invalid UUID: ${id}`)
    }

    const { data, error } = await publicSupabase
      .from('cars')
      .select('id, brand, model, category, daily_rate, images, image_url, year, seating_capacity, transmission, fuel_type, features, specs, description, is_available, status')
      .eq('id', id)
      .single()

    if (error || !data) {
      throw new Error(`Car with ID ${id} not found`)
    }
    return normalizeCar(data)
  },

  async getFeaturedCars() {
    const { data, error } = await publicSupabase
      .from('cars')
      .select('id, brand, model, category, daily_rate, images, image_url, is_available, seating_capacity, transmission, fuel_type')
      .eq('is_available', true)
      .eq('is_featured', true)
      .order('daily_rate', { ascending: false })
      .limit(4)

    if (error) {
      console.error('Error fetching featured cars:', error)
      return []
    }
    return (data || []).map(normalizeCar)
  },

  async getCarsByIds(ids: string[]) {
    if (!ids || !ids.length) return []
    const { data, error } = await publicSupabase
      .from('cars')
      .select('*, reviews(*)')
      .in('id', ids)

    if (error) {
      console.error('Error fetching cars by IDs:', error)
      return []
    }
    return (data || []).map(normalizeCar)
  },

  async checkAvailability(carId: string, startDate: string, endDate: string) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('id')
        .eq('car_id', carId)
        .neq('status', 'cancelled')
        .neq('status', 'completed')
        .lt('pickup_datetime', endDate)
        .gt('dropoff_datetime', startDate)

      if (error) throw error
      return { available: !data || data.length === 0, conflicts: data || [] }
    } catch (e) {
      console.error('Availability check error:', e)
      return { available: false, conflicts: [] }
    }
  },

  async getCategoryCounts() {
    try {
      const { data, error } = await publicSupabase
        .from('cars')
        .select('category, is_available')
        .eq('is_available', true)
      if (error || !data) return {}
      return data.reduce((acc, car) => {
        const cat = car.category?.toLowerCase() || 'unknown'
        acc[cat] = (acc[cat] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    } catch (e) {
      console.error('Error fetching category counts:', e)
      return {}
    }
  },

  async getCarsByCategory(category: string) {
    const normalizedCategory = category.toUpperCase()
    const { data, error } = await publicSupabase
      .from('cars')
      .select('*')
      .eq('category', normalizedCategory)
      .eq('is_available', true)
    if (error) {
      console.error('Error fetching category cars:', error)
      return []
    }
    return (data || []).map(normalizeCar)
  }
}

export const getAllCars = carService.getFleet
