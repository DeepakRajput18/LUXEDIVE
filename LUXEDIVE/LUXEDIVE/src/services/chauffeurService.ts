import { publicSupabase } from '../lib/supabaseClient'

export interface SupabaseChauffeur {
  id: string; // UUID
  legacy_id: number;
  full_name: string;
  first_name: string;
  profile_photo: string;
  age: number;
  experience_years: number;
  total_trips_completed: number;
  price_per_day: number;
  languages: string[];
  availability_status: string;
  is_top_chauffeur: boolean;
  bio: string;
  driving_style: string;
  specializations: string[];
  uniform_style: string;
  certifications: string[];
  background_verified: boolean;
  police_verification_status: string;
  driving_license_number: string;
  top_trips: string[];
  previous_work: string[];
  preferred_car_types: string[];
  rating: number;
  review_count: number;
  special_training: string[];
}

export interface SupabaseReview {
  id: string;
  chauffeur_id: string;
  full_name: string;
  initials: string;
  city: string;
  rating: number;
  comment: string;
  is_verified_trip: boolean;
  created_at: string;
}

export const chauffeurService = {
  /**
   * Fetch all chauffeurs summarized for the directory
   */
  async getChauffeurs() {
    const { data, error } = await publicSupabase
      .from('chauffeurs')
      .select('*')
      .order('is_top_chauffeur', { ascending: false })
      .order('rating', { ascending: false })

    if (error) {
      console.error('Error fetching chauffeurs:', error)
      return []
    }

    return (data || []).map(this.mapChauffeur)
  },

  /**
   * Fetch a single chauffeur by their UUID or Legacy ID
   */
  async getChauffeurById(id: string | number) {
    let query = publicSupabase
      .from('chauffeurs')
      .select('*')

    if (typeof id === 'string' && id.includes('-')) {
      query = query.eq('id', id)
    } else {
      query = query.eq('legacy_id', id)
    }

    const { data, error } = await query.single()

    if (error || !data) {
      console.error('Chauffeur not found:', id, error)
      return null
    }

    return this.mapChauffeur(data)
  },

  /**
   * Fetch persistent reviews for a chauffeur
   */
  async getChauffeurReviews(chauffeurId: string) {
    const { data, error } = await publicSupabase
      .from('chauffeur_reviews')
      .select('*')
      .eq('chauffeur_id', chauffeurId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching reviews:', error)
      return []
    }

    return (data || []) as SupabaseReview[]
  },

  /**
   * Calculates the dynamic price breakdown based on rules
   */
  calculateDynamicPrice(db: any, options?: { isHighDemand?: boolean, isWeekend?: boolean }) {
    const basePrice = db.base_price ? Number(db.base_price) : 4000;
    let finalPrice = basePrice;
    const breakdown: { type: string, amount: number, label: string }[] = [];

    // Experience
    const exp = db.experience_years || 0;
    let expBonus = 0;
    if (exp > 20) expBonus = 10000;
    else if (exp > 12) expBonus = 7000;
    else if (exp > 7) expBonus = 4000;
    else if (exp > 3) expBonus = 2000;
    
    if (expBonus > 0) {
      finalPrice += expBonus;
      breakdown.push({ type: 'experience', amount: expBonus, label: `${exp} Years Experience` });
    }

    // Rating
    const rating = Number(db.rating) || 0;
    let ratingBonus = 0;
    if (rating >= 4.8) ratingBonus = 4000;
    else if (rating >= 4.5) ratingBonus = 2500;
    else if (rating >= 4.0) ratingBonus = 1000;

    if (ratingBonus > 0) {
      finalPrice += ratingBonus;
      breakdown.push({ type: 'rating', amount: ratingBonus, label: `Rating ${rating.toFixed(1)}` });
    }

    // Specialities
    let specBonus = 0;
    const specs = db.specializations || [];
    specs.forEach((spec: string) => {
      let val = 0;
      if (spec.toLowerCase().includes('vip escort')) val = 3000;
      else if (spec.toLowerCase().includes('wedding')) val = 2000;
      else if (spec.toLowerCase().includes('airport')) val = 1000;
      else if (spec.toLowerCase().includes('luxury fleet')) val = 2000;
      
      if (val > 0) {
         specBonus += val;
         breakdown.push({ type: 'speciality', amount: val, label: spec });
      }
    });
    finalPrice += specBonus;

    // Languages
    let langBonus = 0;
    const langs = db.languages || [];
    const standardLangs = ['english', 'hindi', 'gujarati'];
    langs.forEach((lang: string) => {
      const isStd = standardLangs.some(l => lang.toLowerCase().includes(l));
      const val = isStd ? 500 : 2000; // Foreign language
      langBonus += val;
    });
    if (langBonus > 0) {
      finalPrice += langBonus;
      breakdown.push({ type: 'language', amount: langBonus, label: `Languages (${langs.length})` });
    }

    // Demand
    let demandBonus = 0;
    if (options?.isHighDemand) demandBonus += 2000;
    if (options?.isWeekend) demandBonus += 1500;
    if (demandBonus > 0) {
      finalPrice += demandBonus;
      breakdown.push({ type: 'demand', amount: demandBonus, label: 'High Demand / Peak' });
    }

    // Elite
    const isElite = db.is_top_chauffeur;
    if (isElite) {
      finalPrice += 3000;
      breakdown.push({ type: 'elite', amount: 3000, label: 'Elite Chauffeur Status' });
    }

    // Clamp
    if (finalPrice < 4000) finalPrice = 4000;
    if (finalPrice > 20000) finalPrice = 20000;

    // Admin Multiplier
    const multiplier = db.admin_multiplier ? Number(db.admin_multiplier) : 1.0;
    if (multiplier !== 1) {
      finalPrice = Math.round(finalPrice * multiplier);
    }

    return {
      basePrice,
      finalPrice,
      breakdown
    }
  },

  /**
   * Maps Supabase snake_case columns to the frontend's camelCase interface
   */
  mapChauffeur(db: any): any {
    const pricing = chauffeurService.calculateDynamicPrice(db);

    return {
      id: db.id,
      legacy_id: db.legacy_id,
      fullName: db.full_name,
      firstName: db.first_name,
      profilePhoto: db.profile_photo,
      age: db.age,
      experienceYears: db.experience_years,
      totalTripsCompleted: db.total_trips_completed,
      pricePerDay: pricing.finalPrice, // Replaced static price
      priceBreakdown: pricing.breakdown, // Attached explicitly for UI
      basePrice: pricing.basePrice,
      languages: db.languages || [],
      availabilityStatus: db.availability_status,
      isTopChauffeur: db.is_top_chauffeur,
      bio: db.bio,
      drivingStyle: db.driving_style,
      specializations: db.specializations || [],
      uniformStyle: db.uniform_style,
      certifications: db.certifications || [],
      backgroundVerified: db.background_verified,
      policeVerificationStatus: db.police_verification_status,
      drivingLicenseNumber: db.driving_license_number,
      topTrips: db.top_trips || [],
      previousWork: db.previous_work || [],
      preferredCarTypes: db.preferred_car_types || [],
      rating: Number(db.rating) || 0,
      reviewCount: db.review_count || 0,
      specialTraining: db.special_training || []
    }
  }
}
