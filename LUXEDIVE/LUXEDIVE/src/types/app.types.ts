export interface CarSpecs {
    engine?: string;
    hp?: string;
    acceleration?: string;
    topSpeed?: string;
    [key: string]: any;
}

export interface Car {
    id: string;
    created_at?: string;
    brand: string;
    model: string;
    category: string;
    daily_rate: number;
    images: string[];
    features: string[];
    specs: CarSpecs;
    description?: string;
    is_available: boolean;
    status: string;
    deposit_amount?: number;
    transmission?: string;
    seats?: number;
    license_plate?: string;
    year?: number;

    fuel_type?: string;
    seating_capacity?: number;
    specifications?: any;
}

export interface Booking {
    id: string;
    created_at: string;
    user_id: string;
    car_id: string;
    pickup_datetime: string;
    dropoff_datetime: string;
    status: 'draft' | 'pending_payment' | 'pending_approval' | 'confirmed' | 'cancelled' | 'completed';
    total_price: number;
    delivery_type: 'self' | 'delivery';
    pickup_location?: string;
    dropoff_location?: string;
    car?: Car;
    profile?: any;
    add_ons?: string[];
}

export interface Profile {
    id: string;
    created_at?: string;
    updated_at?: string;
    username?: string;
    full_name?: string;
    avatar_url?: string;
    website?: string;
    role?: 'user' | 'admin' | 'driver';
    email?: string;
    phone?: string;
    phone_verified?: boolean;
    address?: string;
    membership_tier?: 'silver' | 'gold' | 'platinum' | 'diamond';
    wallet_balance?: number;
}
