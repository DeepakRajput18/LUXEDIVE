import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarImage } from '../../lib/placeholders';
import { carService } from '../../services/carService';
import { logCarView } from '../../services/activityLogger';
import { trackEvent } from '../../services/analyticsService';
import { toast } from 'sonner';
import {
    Heart,
    Share2,
    MapPin,
    Gauge,
    Fuel,
    Users,
    Settings,
    Shield,
    Calendar,
    ChevronRight,
    ChevronDown,
    Check,
    Info,
    ArrowLeft,
    TrendingUp,
    Bell
} from 'lucide-react';
import WaitlistModal from '../../components/booking/WaitlistModal';
import { demandService, type DemandPrediction } from '../../services/demandService';
import { getDynamicPrice, type DynamicPriceResult } from '../../services/pricingService';

// Mock Data Interface (would match Supabase schema in real app)
interface CarDetails {
    id: string;
    make: string;
    model: string;
    year: number;
    category: 'PREMIUM' | 'EXOTIC' | 'SUPERCAR' | 'LUXURY';
    price_per_day: number;
    image_urls: string[];
    specs: {
        acceleration: string;
        engine: string;
        horsepower: string;
        transmission: string;
        seats: number;
        fuel_type: string;
    };
    features: string[];
    description: string;
    location: string;
}

const CarDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [car, setCar] = useState<CarDetails | null>(null);
    const [activeImage, setActiveImage] = useState(0);
    const [peakDemand, setPeakDemand] = useState<DemandPrediction | null>(null);
    const [dynamicPrice, setDynamicPrice] = useState<DynamicPriceResult | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchCarData = async () => {
            setLoading(true);
            try {
                const carData = await carService.getCarById(id);
                if (carData) {
                    setCar({
                        id: carData.id,
                        make: carData.brand,
                        model: carData.model,
                        year: carData.year || 2024,
                        category: carData.category as any,
                        price_per_day: carData.daily_rate,
                        image_urls: carData.images && carData.images.length > 0
                            ? carData.images
                            : [getCarImage(carData.brand, carData.model)],
                        specs: {
                            acceleration: carData.specs?.acceleration || 'N/A',
                            engine: carData.specs?.engine || 'Engine',
                            horsepower: carData.specs?.hp || 'HP',
                            transmission: carData.transmission || 'Automatic',
                            seats: carData.seats || 4,
                            fuel_type: carData.fuel_type || 'Petrol'
                        },
                        features: carData.features || [],
                        description: carData.description || '',
                        location: 'Ahmedabad, Gujarat'
                    });
                }
            } catch (error) {
                console.error('Failed to fetch car:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCarData();
    }, [id]);


    // Load demand prediction and dynamic price for this car + log view
    useEffect(() => {
        if (!id) return;
        demandService.getPeakDemand(id).then(d => setPeakDemand(d));
        getDynamicPrice(id).then(p => setDynamicPrice(p));

        demandService.recordCarView(id).catch(() => { }); // fire-and-forget analytics
        // Log car view to activity_logs + car_views table
        logCarView(id, car?.make + ' ' + car?.model).catch(() => { });

        // Track analytics view
        trackEvent({ eventType: 'vehicle_view', vehicleId: id, page: `/fleet/${id}` });
    }, [id, car?.make]);

    const [showWaitlist, setShowWaitlist] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [dropoffDate, setDropoffDate] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

    const todayStr = new Date().toISOString().split('T')[0];

    const checkDates = async () => {
        if (!car || !pickupDate || !dropoffDate) return;

        setIsChecking(true);
        try {
            const { available } = await carService.checkAvailability(car.id, pickupDate, dropoffDate);
            setIsAvailable(available);
        } catch (error) {
            console.error(error);
            setIsAvailable(false);
        } finally {
            setIsChecking(false);
        }
    };

    // Check when dates change
    useEffect(() => {
        if (pickupDate && dropoffDate) {
            checkDates();
        } else {
            setIsAvailable(null);
        }
    }, [pickupDate, dropoffDate]);

    const handleBookNow = async () => {
        if (!isAvailable) return;

        if (pickupDate < todayStr) {
            toast.error("Pickup date cannot be in the past.");
            return;
        }

        // Final verification before nav
        setIsChecking(true);
        const { available } = await carService.checkAvailability(car!.id, pickupDate, dropoffDate);
        setIsChecking(false);

        if (available) {
            trackEvent({
                eventType: 'booking_start',
                vehicleId: car!.id,
                page: `/fleet/${car!.id}`,
                metadata: { pickupDate, dropoffDate, dynamicPrice: dynamicPrice?.recommendedPrice }
            });

            navigate(`/booking/${car!.id}`, {
                state: {
                    pickupDate,
                    dropoffDate,
                    location: car!.location,
                    lockedPriceRate: dynamicPrice?.recommendedPrice || car!.price_per_day
                }
            });
        } else {
            setIsAvailable(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!car) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Car not found</div>;

    return (
        <>
        <div className="min-h-screen bg-black font-sans text-white pb-20 selection:bg-amber-500/30">
            {/* Waitlist Modal */}
            {showWaitlist && (
                <WaitlistModal
                    carId={car.id}
                    carName={`${car.make} ${car.model}`}
                    onClose={() => setShowWaitlist(false)}
                />
            )}

            {/* Sticky Header */}
            <header className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 md:px-12 h-20 transition-all">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/fleet')} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-serif font-bold tracking-wide text-white hidden md:block">{car.make} {car.model}</h1>
                </div>

                <div className="flex items-center gap-4">
                    <button className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" /> Share
                    </button>
                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" /> Save
                    </button>
                </div>
            </header>

            {/* Hero Gallery */}
            <section className="pt-20">
                <div className="h-[60vh] md:h-[80vh] bg-zinc-900 relative group overflow-hidden">
                    <img
                        src={car.image_urls[activeImage]}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                        alt={`${car.make} ${car.model}`}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = '/car-placeholder.svg';
                        }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />

                    {/* Gallery Controls */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10">
                        {car.image_urls.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeImage === idx ? 'bg-amber-500 w-8' : 'bg-white/50 hover:bg-white'}`}
                                aria-label={`View image ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-32 relative z-10">
                <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-t-3xl shadow-2xl p-8 md:p-12 flex flex-col lg:flex-row gap-16">

                    {/* Left Column: Details */}
                    <div className="flex-1">

                        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="bg-amber-500 text-black text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full inline-flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                                        {car.category}
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-2 text-white">{car.make} <span className="text-gray-400">{car.model}</span></h1>
                                <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                                    <MapPin className="w-4 h-4 text-amber-500" /> {car.location} • {car.year}
                                </div>
                            </div>
                            <div className="hidden md:block text-right">
                                <p className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-1">Daily Rate</p>
                                <div className="flex items-baseline justify-end gap-1">
                                    <span className="text-lg font-medium text-amber-500">₹</span>
                                    <p className="text-4xl font-serif font-medium text-white">
                                        {(dynamicPrice?.recommendedPrice || car.price_per_day).toLocaleString()}
                                    </p>
                                </div>
                                {dynamicPrice && dynamicPrice.recommendedPrice !== car.price_per_day && (
                                    <p className="text-xs text-amber-500/80 mt-1 justify-end flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" /> Dynamic Pricing Active
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 mb-10">
                            <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-xl border border-white/5">
                                <Gauge className="w-5 h-5 text-amber-500" />
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">0-60 MPH</p>
                                    <p className="font-bold text-white text-lg">{car.specs.acceleration}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-xl border border-white/5">
                                <Settings className="w-5 h-5 text-amber-500" />
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Transmission</p>
                                    <p className="font-bold whitespace-nowrap text-white text-lg">{car.specs.transmission}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-xl border border-white/5">
                                <Users className="w-5 h-5 text-amber-500" />
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Seats</p>
                                    <p className="font-bold text-white text-lg">{car.specs.seats} Persons</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-xl border border-white/5">
                                <Fuel className="w-5 h-5 text-amber-500" />
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Fuel</p>
                                    <p className="font-bold text-white text-lg">{car.specs.fuel_type}</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-serif font-medium mb-6 text-white border-l-2 border-amber-500 pl-4">The Driving Experience</h3>
                            <p className="text-gray-300 leading-loose text-lg font-light">
                                {car.description}
                            </p>
                        </div>

                        {/* Features */}
                        <div className="mb-12">
                            <h3 className="text-xl font-serif font-medium mb-6 text-white">Key Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {car.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                                        <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-500 flex-shrink-0 border border-amber-500/30">
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Insurance Note */}
                        <div className="bg-gradient-to-r from-amber-900/20 to-transparent border border-amber-500/20 p-6 rounded-xl flex items-start gap-4">
                            <Shield className="w-8 h-8 text-amber-500 mt-1" />
                            <div>
                                <h4 className="font-bold text-base mb-2 text-white">Comprehensive Insurance Included</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Every booking comes with LUXEDIVE Shield protection. Zero-depreciation insurance with 24/7 roadside assistance at no extra cost.
                                    <a href="#" className="ml-1 text-amber-500 underline hover:text-amber-400">View Policy</a>
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Booking Card (Sticky) */}
                    <div className="lg:w-[400px] flex-shrink-0">
                        <div className="sticky top-24 bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-8">

                            <div className="flex items-center justify-between mb-8 md:hidden border-b border-white/5 pb-6">
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-bold tracking-widest">Daily Rate</p>
                                    <p className="text-3xl font-mono font-bold text-amber-500">₹{(dynamicPrice?.recommendedPrice || car.price_per_day).toLocaleString()}</p>
                                </div>
                            </div>

                            {/* AI Demand Alert Banner */}
                            {peakDemand && Number(peakDemand.demand_score) >= 0.60 && (
                                <div className="mb-6 bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="w-4 h-4 text-orange-400 flex-shrink-0" />
                                        <span className="text-orange-400 font-bold text-sm">
                                            {Number(peakDemand.demand_score) >= 0.75 ? '🔥 Very High Demand' : '📈 High Demand'} in Ahmedabad
                                        </span>
                                    </div>
                                    <p className="text-gray-300 text-xs leading-relaxed mb-2">
                                        This vehicle is trending! ~{peakDemand.predicted_bookings} bookings predicted this week. Book now to secure your dates.
                                    </p>
                                    {peakDemand.factors?.events && (peakDemand.factors.events as string[]).length > 0 && (
                                        <div className="flex gap-1 flex-wrap">
                                            {(peakDemand.factors.events as string[]).slice(0, 3).map((ev: string, i: number) => (
                                                <span key={i} className="text-[10px] bg-orange-500/15 text-orange-300 border border-orange-500/20 px-2 py-0.5 rounded-full">
                                                    {ev.replace(/_/g, ' ')}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] text-gray-500">Demand Score</span>
                                            <span className="text-[10px] font-bold text-orange-400">{Math.round(Number(peakDemand.demand_score) * 100)}%</span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                                            <div
                                                className="h-full bg-orange-500 rounded-full"
                                                style={{ width: `${Math.round(Number(peakDemand.demand_score) * 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                                <Calendar className="w-5 h-5 text-amber-500" /> Select Dates
                            </h3>

                            {/* Date Inputs */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Pick-up</label>
                                    <input
                                        type="date"
                                        min={todayStr}
                                        value={pickupDate}
                                        onChange={(e) => setPickupDate(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder-gray-600 appearance-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Drop-off</label>
                                    <input
                                        type="date"
                                        min={pickupDate || todayStr}
                                        value={dropoffDate}
                                        onChange={(e) => setDropoffDate(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder-gray-600 appearance-none"
                                    />
                                </div>
                            </div>

                            {/* Pick up location */}
                            <div className="space-y-2 mb-8">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Pick-up Location</label>
                                <div className="relative">
                                    <select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 appearance-none cursor-pointer">
                                        <option>Showroom (S.G. Highway)</option>
                                        <option>Airport Delivery (+₹1500)</option>
                                        <option>Home Delivery (Ahmedabad)</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                </div>
                            </div>

                            {/* Price Breakdown Preview */}
                            <div className="border-t border-white/10 pt-6 mb-8 space-y-3">
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>₹{car.price_per_day.toLocaleString()} x 3 Days</span>
                                    <span>₹{(car.price_per_day * 3).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Service Fee & Tax</span>
                                    <span>₹2,500</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-4 border-t border-white/10 text-white">
                                    <span>Total (Est.)</span>
                                    <span className="text-amber-500">₹{((car.price_per_day * 3) + 2500).toLocaleString()}</span>
                                </div>
                            </div>

                            {isAvailable === false ? (
                                <div className="mb-6 p-4 bg-amber-500/10 text-amber-500 text-xs font-bold text-center rounded-xl border border-amber-500/20 flex flex-col items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <Info className="w-4 h-4" /> Vehicle unavailable for selected dates
                                    </div>
                                    <button 
                                        onClick={() => setShowWaitlist(true)}
                                        className="w-full py-2.5 bg-amber-500 text-black rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest"
                                    >
                                        <Bell className="w-3 h-3" /> Notify Me
                                    </button>
                                </div>
                            ) : null}

                            <button
                                onClick={handleBookNow}
                                disabled={!pickupDate || !dropoffDate || isChecking}
                                className={`w-full py-4 font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg ${(!pickupDate || !dropoffDate) ? 'bg-zinc-800 text-gray-500 cursor-not-allowed border border-white/5' :
                                    isAvailable === false ? 'bg-zinc-800 text-gray-500 opacity-50 cursor-not-allowed' :
                                        'bg-white text-black hover:bg-amber-400 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] border border-transparent'
                                    }`}
                            >
                                {isChecking ? (
                                    <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Checking Availability...</span>
                                ) : (
                                    <>Proceed to Book <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>

                            <p className="text-[10px] text-gray-500 text-center mt-4 flex items-center justify-center gap-1">
                                <Shield className="w-3 h-3" />
                                {isAvailable !== false ? "Secure checkout • No charge until confirmation" : "Try different dates"}
                            </p>

                        </div>
                    </div>

                </div>
            </div>

        </div>

        </>
    );
};

export default CarDetails;
