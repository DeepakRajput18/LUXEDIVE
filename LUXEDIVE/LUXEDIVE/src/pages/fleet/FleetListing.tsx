import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { getCarImage } from '../../lib/placeholders';
import { normalizeDailyRate } from '../../lib/pricingUtils';
import { supabase } from '../../lib/supabaseClient';
import { carService } from '../../services/carService';
import { logSearch } from '../../services/activityLogger';
import { useBooking } from '../../contexts/BookingContext';
import { useAuth } from '../../contexts/AuthContext';
import CarCard from '../../components/car/CarCard';
import {
    Heart,
    MapPin,
    ChevronDown,
    Users,
    Gauge,
    Fuel,
    ArrowRight,
    Search,
    X,
    Check
} from 'lucide-react';

interface Car {
    id: string;
    make?: string;
    brand?: string;
    model: string;
    year?: number; // Made optional to match potential data
    category: string; // Loosened from literal union for easier compatibility
    price_per_day?: number;
    daily_rate?: number;
    image_url?: string;
    images?: string[];
    transmission?: string;
    fuel_type?: string;
    seats?: number;
    seating_capacity?: number;
    acceleration_0_60?: string;
}

const FleetListing: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const { user } = useAuth();
    const { updateBooking } = useBooking();
    
    // Check if we came with a pre-selected chauffeur
    const [preSelectedChauffeur, setPreSelectedChauffeur] = useState<any>(location.state?.preSelectedChauffeur || null);
    const [chauffeurConfirmed, setChauffeurConfirmed] = useState(false);

    // Initialize state from URL
    const [priceRange, setPriceRange] = useState<number>(
        searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 2500000
    );
    const [selectedBrands, setSelectedBrands] = useState<string[]>(
        searchParams.get('brands') ? searchParams.get('brands')!.split(',') : []
    );
    const [selectedTransmission, setSelectedTransmission] = useState<string | null>(
        searchParams.get('transmission') || null
    );
    const [selectedFuel, setSelectedFuel] = useState<string | null>(
        searchParams.get('fuel') || null
    );
    const [selectedSeats, setSelectedSeats] = useState<number | null>(
        searchParams.get('seats') ? Number(searchParams.get('seats')) : null
    );
    const [sortBy, setSortBy] = useState<string>(
        searchParams.get('sort') || 'price_asc'
    );
    const [searchQuery, setSearchQuery] = useState<string>(
        searchParams.get('q') || ''
    );

    const [cars, setCars] = useState<Car[]>([]);
    const [allCars, setAllCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    const [compareList, setCompareList] = useState<string[]>([]);
    const MAX_COMPARE = 3;
    const [favorites, setFavorites] = useState<string[]>([]);
    const [togglingFavorite, setTogglingFavorite] = useState<string | null>(null);
    const [notifiedCarIds, setNotifiedCarIds] = useState<Record<string, string>>({}); // carId -> waitlistId
    const categoryFilter = searchParams.get('category');

    useEffect(() => {
        // Update URL when filters change
        const params = new URLSearchParams(searchParams);

        if (priceRange !== 2500000) params.set('maxPrice', priceRange.toString());
        else params.delete('maxPrice');

        if (selectedBrands.length > 0) params.set('brands', selectedBrands.join(','));
        else params.delete('brands');

        if (selectedTransmission) params.set('transmission', selectedTransmission);
        else params.delete('transmission');

        if (selectedFuel) params.set('fuel', selectedFuel);
        else params.delete('fuel');

        if (selectedSeats) params.set('seats', selectedSeats.toString());
        else params.delete('seats');

        if (sortBy !== 'price_asc') params.set('sort', sortBy);
        else params.delete('sort');

        if (searchQuery.trim()) params.set('q', searchQuery.trim());
        else params.delete('q');

        setSearchParams(params, { replace: true });
    }, [priceRange, selectedBrands, selectedTransmission, selectedFuel, selectedSeats, sortBy, searchQuery]);

    useEffect(() => {
        fetchCars();
        if (user) {
            fetchFavorites();
            fetchWaitlistIds();
        }
    }, [categoryFilter, user]); // Only re-fetch if category changes. Filtering is client-side for speed.

    useEffect(() => {
        applyFilters();
    }, [allCars, priceRange, selectedBrands, selectedTransmission, selectedFuel, selectedSeats, sortBy, searchQuery]);

    const fetchCars = async () => {
        setLoading(true);
        try {
            // Use carService with includeUnavailable: true to fetch the full collection (69 items)
            const filters = { 
                ...(categoryFilter ? { category: categoryFilter } : {}),
                includeUnavailable: true 
            };
            const carsData = await carService.getFleet(filters);

            const normalizeBrand = (brandStr: string) => {
                if (!brandStr) return '';
                const b = brandStr.trim();
                const lower = b.toLowerCase();
                if (lower.startsWith('mercedes')) return 'Mercedes-Benz';
                if (lower === 'rolls royce' || lower === 'rolls-royce') return 'Rolls-Royce';
                return b;
            };

            // Normalize images and cast to Car type
            const validatedCars: Car[] = carsData.map((car: any) => {
                const normalizedBrand = normalizeBrand(car.brand);
                const normalizedMake = normalizeBrand(car.make || car.brand);

                return {
                    ...car, // Preserve all base fields (including is_available and status)
                    brand: normalizedBrand,
                    make: normalizedMake,
                    price_per_day: car.daily_rate,
                    seats: car.seats || car.seating_capacity,
                    seating_capacity: car.seats || car.seating_capacity,
                    acceleration_0_60: car.acceleration_0_60 || car.specs?.acceleration,
                    image_url: (car.images && car.images.length > 0) ? car.images[0] : getCarImage(car.brand || car.make || '', car.model, car.category, car.id),
                    images: (car.images && car.images.length > 0) ? car.images : [getCarImage(car.brand || car.make || '', car.model, car.category, car.id)]
                };
            });

            setAllCars(validatedCars);
        } catch (error) {
            console.error('Error fetching cars:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchFavorites = async () => {
        if (!user) return;
        try {
            const { data, error } = await supabase
                .rpc('get_user_favorites', { p_user_id: user.id });
            if (error) throw error;
            setFavorites(data?.map((f: any) => f.car_id) || []);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    const toggleFavorite = async (carId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user) {
            navigate('/login', { state: { from: location.pathname } });
            return;
        }

        try {
            setTogglingFavorite(carId);
            const { data, error } = await supabase
                .rpc('toggle_favorite_car', {
                    p_user_id: user.id,
                    p_car_id: carId
                });

            if (error) throw error;

            if (data.action === 'added') {
                setFavorites(prev => [...prev, carId]);
            } else {
                setFavorites(prev => prev.filter(id => id !== carId));
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        } finally {
            setTogglingFavorite(null);
        }
    };

    const fetchWaitlistIds = async () => {
        if (!user) return;
        try {
            const { data, error } = await supabase
                .from('waitlist')
                .select('id, car_id')
                .eq('user_id', user.id)
                .in('status', ['pending', 'notified']);
            if (error) throw error;
            const map: Record<string, string> = {};
            (data || []).forEach((row: any) => { map[row.car_id] = row.id; });
            setNotifiedCarIds(map);
        } catch (err) {
            console.error('fetchWaitlistIds error:', err);
        }
    };

    const toggleNotify = async (carId: string) => {
        if (!user) { navigate('/login', { state: { from: location.pathname } }); return; }
        const existingId = notifiedCarIds[carId];
        if (existingId) {
            // Remove from waitlist
            await supabase.from('waitlist').update({ status: 'expired' }).eq('id', existingId);
            setNotifiedCarIds(prev => { const n = { ...prev }; delete n[carId]; return n; });
        } else {
            // Add to waitlist
            const { data, error } = await supabase.from('waitlist').insert({
                car_id: carId,
                user_id: user.id,
                status: 'pending',
                created_at: new Date().toISOString()
            }).select('id').single();
            if (!error && data) {
                setNotifiedCarIds(prev => ({ ...prev, [carId]: data.id }));
            }
        }
    };

    const applyFilters = () => {
        let filtered = [...allCars];

        // 0. Search query (brand, model, category)
        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            filtered = filtered.filter(car =>
                (car.brand || car.make || '').toLowerCase().includes(q) ||
                (car.model || '').toLowerCase().includes(q) ||
                (car.category || '').toLowerCase().includes(q)
            );
        }

        // 1. Price filter
        filtered = filtered.filter(car => (car.daily_rate || car.price_per_day || 0) <= priceRange);

        if (selectedBrands.length > 0) {
            filtered = filtered.filter(car => {
                const b = car.brand || car.make || '';
                return selectedBrands.includes(b);
            });
        }
        if (selectedTransmission) {
            filtered = filtered.filter(car => car.transmission?.toLowerCase() === selectedTransmission.toLowerCase());
        }
        if (selectedFuel) {
            filtered = filtered.filter(car => car.fuel_type?.toLowerCase() === selectedFuel.toLowerCase());
        }
        if (selectedSeats) {
            filtered = filtered.filter(car => (car.seats || car.seating_capacity) === selectedSeats);
        }

        // 2. Sort
        filtered.sort((a, b) => {
            const priceA = a.daily_rate || a.price_per_day || 0;
            const priceB = b.daily_rate || b.price_per_day || 0;
            const yearA = a.year || 0;
            const yearB = b.year || 0;

            switch (sortBy) {
                case 'price_asc': return priceA - priceB;
                case 'price_desc': return priceB - priceA;
                case 'year_desc': return yearB - yearA;
                default: return 0;
            }
        });

        setCars(filtered);

        // Log search when any active filter or search term is applied
        const hasActiveFilter = searchQuery.trim() || selectedBrands.length > 0 || selectedTransmission || selectedFuel || selectedSeats || priceRange < 2500000;
        if (hasActiveFilter) {
            logSearch(searchQuery, {
                brands: selectedBrands,
                transmission: selectedTransmission,
                fuel: selectedFuel,
                seats: selectedSeats,
                maxPrice: priceRange,
                sort: sortBy,
                category: categoryFilter,
            }, filtered.length)
        }
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev => {
            const newBrands = prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand];
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return newBrands;
        });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPriceRange(Number(e.target.value));
        // Debouncing scroll to top on slider might be better, but doing it here ensures user sees effect.
        // For slider, maybe don't scroll to top immediately as it might be annoying while dragging?
        // Check requirement: "maintain scroll position at top... after filter adjustments" 
        // Let's scroll only when other filters are clicked, not on slider drag.
    };

    const clearFilters = () => {
        setPriceRange(2500000);
        setSelectedBrands([]);
        setSelectedTransmission(null);
        setSelectedFuel(null);
        setSelectedSeats(null);
        setSortBy('price_asc');
        setSearchQuery('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleCompare = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setCompareList(prev => {
            if (prev.includes(id)) {
                return prev.filter(cid => cid !== id);
            }
            if (prev.length >= MAX_COMPARE) {
                return prev;
            }
            return [...prev, id];
        });
    };

    const validateAndFixCarImage = (car: any) => {
        // Logic moved to fetchCars for simplicity
        return car;
    };


    return (
        <div className="min-h-screen bg-black text-white font-sans pb-20 selection:bg-amber-500/30">

            {/* Compare Floating Bar */}
            {compareList.length > 0 && (
                <div className="fixed bottom-8 inset-x-0 z-[100] px-4 animate-fade-in-up pointer-events-none">
                    <div className="pointer-events-auto max-w-xl mx-auto bg-zinc-900/90 backdrop-blur-xl text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between border border-white/10 ring-1 ring-white/5">
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-2">
                                {compareList.map(id => {
                                    const car = cars.find(c => c.id === id);
                                    return (
                                        <div key={id} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 overflow-hidden relative">
                                            <img src={car?.image_url} className="w-full h-full object-cover" alt="Car Thumbnail" />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="text-sm">
                                <span className="font-bold text-amber-400">{compareList.length}</span>
                                <span className="text-gray-400">/{MAX_COMPARE} Selected</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setCompareList([])}
                                className="text-xs text-gray-400 hover:text-white px-3 py-2 transition-colors"
                            >
                                Clear
                            </button>
                            <button
                                onClick={() => navigate(`/fleet/compare?ids=${compareList.join(',')}`)}
                                className="bg-white text-black px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-amber-400 transition-all border border-transparent hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                            >
                                Compare Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sticky top bar: search (mobile) */}
            <div className="sticky top-[80px] z-40 bg-black/90 backdrop-blur-md border-b border-white/5 px-4 py-3 lg:hidden">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    <input
                        id="fleet-search-mobile"
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search brand, model…"
                        className="w-full pl-10 pr-9 py-2.5 bg-zinc-900 border border-white/10 rounded-full text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500/60 transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>


            <div className="flex pt-20 lg:pt-24">

                {/* Left Sidebar Filters */}
                <aside className="w-80 border-r border-white/5 p-8 h-[calc(100vh-100px)] sticky top-[100px] overflow-y-auto hidden lg:block scrollbar-hide custom-scrollbar">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-lg font-serif font-medium text-amber-500">Filters</h2>
                        <button onClick={clearFilters} className="text-xs text-gray-500 font-medium hover:text-white transition-colors">RESET ALL</button>
                    </div>

                    <div className="space-y-10">
                        {/* Price Range */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 block">Price Range (Daily)</label>
                            <input
                                type="range"
                                min="5000"
                                max="2500000"
                                step="5000"
                                value={priceRange}
                                onChange={handlePriceChange}
                                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                            <div className="flex justify-between mt-2 text-sm font-medium text-gray-300">
                                <span>₹5k</span>
                                <span className="text-amber-400">₹{priceRange > 99999 ? (priceRange / 100000).toFixed(1) + 'L' : (priceRange / 1000).toFixed(0) + 'k'}</span>
                            </div>
                        </div>

                        {/* Brands */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 block">Brands</label>
                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                                {Array.from(new Set(allCars.map(car => car.make || car.brand || ''))).filter(Boolean).sort().map((brandName) => {
                                    const count = allCars.filter(car => (car.make || car.brand) === brandName).length;
                                    if (count === 0) return null;
                                    return (
                                        <label key={brandName} className="flex items-center justify-between cursor-pointer group">
                                            <div className="flex items-center gap-3 w-[80%]">
                                                <div className={`flex-shrink-0 w-4 h-4 border rounded flex items-center justify-center transition-all duration-300 ${selectedBrands.includes(brandName) ? 'bg-amber-500 border-amber-500' : 'border-zinc-700 bg-zinc-900 group-hover:border-zinc-500'}`}>
                                                    {selectedBrands.includes(brandName) && <div className="w-2 h-2 bg-black rounded-sm" />}
                                                </div>
                                                <input type="checkbox" className="hidden" onChange={() => toggleBrand(brandName)} checked={selectedBrands.includes(brandName)} />
                                                <span className={`text-sm truncate transition-colors ${selectedBrands.includes(brandName) ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{brandName}</span>
                                            </div>
                                            <span className="text-xs text-zinc-600">({count})</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Transmission */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 block">Transmission</label>
                            <div className="flex gap-2">
                                {['Automatic', 'Manual'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => {
                                            setSelectedTransmission(selectedTransmission === type ? null : type);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${selectedTransmission === type
                                            ? 'bg-amber-500 text-black border-amber-500'
                                            : 'bg-zinc-900 text-gray-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
                                            } `}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Fuel Type */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 block">Fuel Type</label>
                            <div className="flex flex-wrap gap-2">
                                {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => {
                                            setSelectedFuel(selectedFuel === type ? null : type);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${selectedFuel === type
                                            ? 'bg-amber-500 text-black border-amber-500'
                                            : 'bg-zinc-900 text-gray-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
                                            } `}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 p-6 md:p-12">

                    <div className="flex flex-col gap-6 mb-12">
                        {preSelectedChauffeur && !chauffeurConfirmed && (
                            <div className="bg-zinc-900 border border-amber-500/30 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent pointer-events-none" />
                                <div className="z-10">
                                    <p className="text-amber-500 font-bold mb-1 text-sm uppercase tracking-widest">Chauffeur Pre-selected</p>
                                    <h3 className="text-2xl font-serif text-white">{preSelectedChauffeur.firstName} {preSelectedChauffeur.fullName?.split(' ').slice(1).join(' ')}</h3>
                                    <p className="text-gray-400 text-sm mt-1">You navigated here from {preSelectedChauffeur.firstName}'s profile. Would you like to continue with them?</p>
                                </div>
                                <div className="flex items-center gap-3 z-10 w-full md:w-auto">
                                    <button 
                                        onClick={() => {
                                            setPreSelectedChauffeur(null);
                                        }} 
                                        className="flex-1 md:flex-none px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-lg transition-colors hover:border-white/30"
                                    >
                                        Change Chauffeur
                                    </button>
                                    <button 
                                        onClick={() => {
                                            updateBooking({
                                                chauffeurDetails: { 
                                                    ...preSelectedChauffeur, 
                                                    price: preSelectedChauffeur.pricePerDay || 2500, 
                                                    price_per_day: preSelectedChauffeur.pricePerDay || 2500 
                                                }
                                            });
                                            setChauffeurConfirmed(true);
                                        }}
                                        className="flex-1 md:flex-none px-6 py-2 text-sm text-black bg-amber-500 font-bold rounded-lg hover:bg-white transition-colors uppercase tracking-wider"
                                    >
                                        Continue with {preSelectedChauffeur.firstName}
                                    </button>
                                </div>
                            </div>
                        )}
                        {preSelectedChauffeur && chauffeurConfirmed && (
                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 flex justify-between items-center">
                                <p className="text-amber-500 text-sm"><span className="font-bold">Booking with:</span> {preSelectedChauffeur.fullName}</p>
                                <button className="text-xs text-gray-400 hover:text-white underline" onClick={() => { setPreSelectedChauffeur(null); setChauffeurConfirmed(false); updateBooking({ chauffeurDetails: null }); }}>Cancel Selection</button>
                            </div>
                        )}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">
                                    <MapPin className="w-3 h-3" /> Ahmedabad, India
                                </div>
                                <h1 className="text-4xl font-serif font-medium text-white mb-2">
                                    {categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1).toLowerCase()} Collection` : 'Premium Fleet'}
                                </h1>
                                <p className="text-gray-400 text-sm max-w-lg">
                                    Discover our exclusive collection of luxury vehicles, curated for the most demanding journeys.
                                </p>
                            </div>

                            {/* Sort — desktop */}
                            <div className="relative hidden md:block z-30 flex-shrink-0">
                                <select
                                    value={sortBy}
                                    onChange={(e) => {
                                        setSortBy(e.target.value);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="appearance-none bg-zinc-900 border border-white/10 rounded-lg pl-4 pr-10 py-2 text-sm font-medium text-white focus:outline-none hover:border-white/20 transition-all cursor-pointer"
                                >
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="year_desc">Newest First</option>
                                </select>
                                <ChevronDown className="w-4 h-4 text-amber-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>

                        {/* Desktop Search Bar */}
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                            <input
                                id="fleet-search-desktop"
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search by brand, model or category — e.g. Ferrari, Lamborghini, Exotic…"
                                className="w-full pl-11 pr-12 py-3.5 bg-zinc-900/60 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500/60 focus:border-amber-500/40 transition-all"
                            />
                            {searchQuery ? (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            ) : null}
                        </div>

                        {/* Active filter chips */}
                        {(selectedBrands.length > 0 || searchQuery) && (
                            <div className="flex items-center gap-2 flex-wrap">
                                {searchQuery && (
                                    <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-medium text-amber-400 flex items-center gap-1">
                                        "{searchQuery}"
                                        <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
                                    </span>
                                )}
                                {selectedBrands.map(brand => (
                                    <span key={brand} className="px-3 py-1 bg-zinc-900 border border-white/10 rounded-full text-xs font-medium text-gray-300 flex items-center gap-1 hover:border-red-500/50 group transition-colors">
                                        {brand} <button onClick={() => toggleBrand(brand)}><X className="w-3 h-3 group-hover:text-red-500" /></button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RESULTS COUNTER */}
                    <div className="mb-8 flex items-center gap-4">
                        <span className="text-[10px] text-gray-500 font-mono font-bold tracking-[0.2em] uppercase">
                            Showing {cars.length} of {allCars.length} Fleet Items
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                    </div>

                    {/* Vehicle Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center py-40">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-10 h-10 border-2 border-zinc-800 border-t-amber-500 rounded-full animate-spin"></div>
                                <span className="text-gray-500 text-sm animate-pulse">Retrieving Fleet...</span>
                            </div>
                        </div>
                    ) : cars.length === 0 ? (
                        <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-white/5 mx-auto max-w-2xl">
                            <div className="max-w-md mx-auto px-6">
                                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-8 h-8 text-gray-600" />
                                </div>
                                <h3 className="text-2xl font-serif mb-4 text-white">No vehicles found</h3>
                                <p className="text-gray-500 mb-8">
                                    {searchQuery
                                        ? <>No cars match <span className="text-amber-400 font-medium">"{searchQuery}"</span>. Try a different search term or clear your filters.</>
                                        : "We couldn't find any cars matching your current filters. Try adjusting your price range or clearing some filters."
                                    }
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-amber-400 hover:text-black transition-all"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {cars.map((car) => (
                                <CarCard 
                                    key={car.id}
                                    car={car as any}
                                    isFavorite={favorites.includes(car.id)}
                                    onToggleFavorite={toggleFavorite}
                                    isCompareSelected={compareList.includes(car.id)}
                                    onToggleCompare={toggleCompare}
                                    isToggling={togglingFavorite === car.id}
                                    isNotified={!!notifiedCarIds[car.id]}
                                    onToggleNotify={toggleNotify}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </div>

            {/* 360 Viewer Modal removed */}
        </div>
    );
};

export default FleetListing;
