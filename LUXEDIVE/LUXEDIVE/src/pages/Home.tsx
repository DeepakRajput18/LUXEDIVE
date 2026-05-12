import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, ShieldCheck, Zap, TrendingUp, Flame } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { carService } from '../services/carService'
import { demandService, type TrendingCar } from '../services/demandService'
import { publicSupabase } from '../lib/supabaseClient'
import { useAuth } from '../contexts/AuthContext'


interface CategoryData {
  name: string
  slug: string
  count: number
  image: string
  gradient: string
}

// Curated backgrounds and styles for each possible category
const CATEGORY_META: Record<string, { image: string; gradient: string; label: string }> = {
  EXOTIC: {
    image: 'https://images.unsplash.com/photo-1586430660697-61769a59e739?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEV4b3RpYyUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D',
    gradient: 'from-red-950/80 via-black/60 to-black/90',
    label: 'Exotic',
  },
  LUXURY: {
    image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&q=80&w=900',
    gradient: 'from-yellow-950/80 via-black/60 to-black/90',
    label: 'Luxury',
  },
  SPORTS: {
    image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&q=80&w=900',
    gradient: 'from-blue-950/80 via-black/60 to-black/90',
    label: 'Sports',
  },
  WEDDING: {
    image: '/wedding-car.jpg',
    gradient: 'from-rose-950/80 via-black/60 to-black/90',
    label: 'Wedding',
  },
  SUV: {
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U1VWfGVufDB8fDB8fHww',
    gradient: 'from-emerald-950/80 via-black/60 to-black/90',
    label: 'SUV',
  },
  HYPERCAR: {
    image: 'https://images.unsplash.com/photo-1573074617613-fc8ef27eaa2f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEh5cGVyJTIwY2FyfGVufDB8fDB8fHww',
    gradient: 'from-purple-950/80 via-black/60 to-black/90',
    label: 'Hypercar',
  },
  CONVERTIBLE: {
    image: 'https://images.unsplash.com/photo-1598654605094-8b52bb6fea29?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvbnZlcnRpYmFsJTIwY2FyfGVufDB8fDB8fHww',
    gradient: 'from-sky-950/80 via-black/60 to-black/90',
    label: 'Convertible',
  },
  ELECTRIC: {
    image: 'https://images.unsplash.com/photo-1615829386703-e2bb66a7cb7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlY3RyaWNhbGNhcnxlbnwwfHwwfHx8MA%3D%3D',
    gradient: 'from-teal-950/80 via-black/60 to-black/90',
    label: 'Electric',
  },
}

export default function Home() {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [trendingCars, setTrendingCars] = useState<TrendingCar[]>([])
  const [trendingLoading, setTrendingLoading] = useState(true)

  // Load trending cars from AI demand predictions
  useEffect(() => {
    demandService.getTrendingCars(10).then(data => {
      setTrendingCars(data)
      setTrendingLoading(false)
    }).catch(() => setTrendingLoading(false))
  }, [])

  // Build category list from counts map
  function buildCategoryList(counts: Record<string, number>): CategoryData[] {
    return Object.entries(counts)
      .filter(([, count]) => count > 0)
      .map(([key, count]) => {
        const upperKey = key.toUpperCase()
        const meta = CATEGORY_META[upperKey] || {
          image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=900',
          gradient: 'from-gray-950/80 via-black/60 to-black/90',
          label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
        }
        return {
          name: meta.label,
          slug: key.toLowerCase(),
          count,
          image: meta.image,
          gradient: meta.gradient,
        }
      })
      .sort((a, b) => b.count - a.count) // Show most-stocked categories first
  }

  // Fetch category counts (single efficient query) + subscribe to realtime changes
  useEffect(() => {
    let isMounted = true

    async function loadCounts() {
      try {
        const counts = await carService.getCategoryCounts()
        if (isMounted) setCategories(buildCategoryList(counts))
      } catch (e) {
        console.error('Error loading category counts:', e)
      }
    }

    loadCounts()

    // Realtime subscription — auto-refresh counts when a car row changes
    const channel = publicSupabase
      .channel('home-category-counts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'cars' },
        () => { loadCounts() }
      )
      .subscribe()

    return () => {
      isMounted = false
      publicSupabase.removeChannel(channel)
    }
  }, [])

  const { user, isNewUser } = useAuth()
  const heroRef = useRef<HTMLElement>(null)

  // Parallax and fade effects tied to scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  // Car scales up slowly as you scroll down
  const carScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  // Text fades out gently as you scroll away
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100])

  // A deeply shadowed, single car image for the "dark luxury" vibe
  const DARK_LUXURY_HERO = "https://images.pexels.com/photos/29112742/pexels-photo-29112742.jpeg"

  return (
    <div className="divide-y divide-white/5">
      {/* LUXURY ENTRY HERO SECTION */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050505]">

        {/* Animated Background Car */}
        <motion.div
          className="absolute inset-0 z-0 origin-center"
          style={{ scale: carScale }}
          initial={{ opacity: 0, filter: 'brightness(0)' }}
          animate={{ opacity: 1, filter: 'brightness(1)' }}
          transition={{ duration: 4, ease: "easeOut" }} // Slow reveal
        >
          <div className="absolute inset-0 bg-gradient-to-t from-luxe-black via-luxe-black/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-luxe-black/40 to-luxe-black z-10" />
          <img
            src={DARK_LUXURY_HERO}
            alt="Private Automotive Society"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="relative z-20 text-center max-w-4xl px-4 mt-20"
          style={{ opacity: textOpacity, y: textY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1.5, ease: "easeOut" }} // Delays text until car reveals
        >
          <h2 className="text-luxe-gold uppercase tracking-[0.3em] font-light mb-6 text-sm md:text-base">
            {isNewUser 
              ? "Your Journey Into Distinction Begins Here." 
              : `Welcome Back, ${user?.user_metadata?.full_name?.split(' ')[0] || 'Member'}.`}
          </h2>

          <h1 className="text-5xl md:text-8xl font-serif text-luxe-white mb-6 leading-tight tracking-tight">
            {isNewUser ? (
              <>Arrive <span className="text-luxe-gold italic font-light">Differently.</span></>
            ) : (
              <>Your <span className="text-luxe-gold italic font-light">Fleet</span> Awaits.</>
            )}
          </h1>

          <p className="text-lg md:text-xl text-luxe-gray/80 mb-12 max-w-2xl mx-auto font-light tracking-wide">
            {isNewUser 
              ? "Private Luxury Mobility for the Few." 
              : "Resume your journey with the world's most curated automotive collection."}
          </p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
          >
            {isNewUser ? (
              <Link to="/fleet">
                <Button size="lg" className="w-full sm:w-auto h-14 text-sm tracking-widest uppercase px-12 bg-luxe-gold text-black hover:bg-white transition-colors duration-500">
                  Explore The Fleet
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/bookings">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 text-sm tracking-widest uppercase px-12 border-white/20 text-white hover:bg-white/5 transition-colors duration-500">
                    My Bookings
                  </Button>
                </Link>
                <Link to="/fleet">
                  <Button size="lg" className="w-full sm:w-auto h-14 text-sm tracking-widest uppercase px-12 bg-luxe-gold text-black hover:bg-white transition-colors duration-500">
                    Book New Experience
                  </Button>
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>
      </section>


      {/* CATEGORIES SHOWCASE — Premium Dynamic Grid */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#060606]">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-luxe-gold text-[11px] font-bold uppercase tracking-[0.3em] mb-3">
            Private Collection
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-4">
            Explore by Category
          </h2>
          <p className="text-gray-500 text-sm font-light tracking-wide">
            Curated for distinction · Live availability
          </p>
        </div>

        {/* Category Cards — single scrolling row */}
        <div className="relative">
          {/* Left fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-black to-transparent" />
          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-black to-transparent" />

        {categories.length === 0 ? (
          // Skeleton placeholders while loading
          <div className="flex gap-5 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 rounded-2xl bg-white/5 animate-pulse"
                style={{ width: '280px', height: '340px' }}
              />
            ))}
          </div>
        ) : (
          <div
            className="flex gap-5 overflow-x-auto pb-2 px-2 [&::-webkit-scrollbar]:hidden"
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/fleet?category=${cat.slug}`}
                className="group relative flex-shrink-0 block overflow-hidden rounded-2xl cursor-pointer"
                style={{
                  width: '280px',
                  height: '340px',
                  scrollSnapAlign: 'start',
                  transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'scale(1.03) translateY(-6px)'
                  el.style.boxShadow = '0 32px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.2), 0 0 40px rgba(212,175,55,0.05)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'scale(1) translateY(0)'
                  el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)'
                }}
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement
                    t.onerror = null
                    t.src = 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=900'
                  }}
                />

                {/* Multi-layer gradient for luxury depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />

                {/* Live count badge — top right */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/80 text-[11px] font-medium tracking-wide">
                    {cat.count} {cat.count === 1 ? 'Vehicle' : 'Vehicles'}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {/* Category label */}
                  <p className="text-luxe-gold text-[10px] font-bold uppercase tracking-[0.25em] mb-2 opacity-80">
                    Fleet Collection
                  </p>

                  {/* Category name */}
                  <h3 className="font-serif text-white text-2xl font-semibold leading-tight mb-4 group-hover:text-luxe-gold transition-colors duration-300">
                    {cat.name}
                  </h3>

                  {/* CTA row */}
                  <div className="flex items-center justify-between">
                    <span className="text-white/40 text-xs tracking-widest uppercase font-medium group-hover:text-white/70 transition-colors duration-300">
                      Browse fleet
                    </span>
                    <span className="flex items-center justify-center w-9 h-9 rounded-full border border-luxe-gold/30 text-luxe-gold bg-black/40 backdrop-blur-sm group-hover:bg-luxe-gold group-hover:text-black group-hover:border-luxe-gold transition-all duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Subtle gold border glow on hover */}
                <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-luxe-gold/20 transition-colors duration-400" />
              </Link>
            ))}
          </div>
        )}
        </div>{/* end .relative scroll wrapper */}

        {/* View All link */}
        {categories.length > 0 && (
          <div className="text-center mt-10">
            <Link
              to="/fleet"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-luxe-gold/70 hover:text-luxe-gold transition-colors duration-300"
            >
              View Entire Fleet <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </section>

      {/* ───────────────────────────────────────────────── */}
      {/* TRENDING IN AHMEDABAD — Premium Scroll Strip */}
      {/* ──────────────────────────────────────────── */}
      {!trendingLoading && trendingCars.length > 0 && (
        <section className="py-20 bg-[#050505]">

          {/* Header */}
          <div className="container mx-auto px-4 flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Flame className="w-4 h-4 text-orange-400" />
              <div>
                <h2 className="text-xl font-serif text-white tracking-wide">Trending in Ahmedabad</h2>
                <p className="text-gray-600 text-xs mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-orange-400/70" />
                  AI-predicted · Next 7 days
                </p>
              </div>
            </div>
            <Link
              to="/fleet"
              className="hidden md:flex items-center gap-1.5 text-xs text-amber-500/70 hover:text-amber-400 transition-colors font-medium tracking-widest uppercase"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Scroll strip wrapper — position relative for gradient fades */}
          <div className="relative">

            {/* LEFT fade gradient */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#050505] to-transparent" />
            {/* RIGHT fade gradient */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#050505] to-transparent" />

            {/* Scroll container */}
            <div
              className="flex gap-4 overflow-x-auto pb-2 px-6 [&::-webkit-scrollbar]:hidden"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {/* Hide scrollbar for Chrome/Safari via inline pseudo approach — handled by global class or style tag */}
              {trendingCars.map((item) => {
                const car = item.cars
                if (!car) return null
                const score = Number(item.demand_score)
                const badgeLabel = score >= 0.75 ? '🔥 Very High' : score >= 0.6 ? '↑ High' : '↗ Rising'
                const badgeColor = score >= 0.75 ? 'bg-red-500/90' : 'bg-orange-500/90'

                return (
                  <Link
                    key={item.car_id}
                    to={`/booking/${item.car_id}`}
                    className="group flex-shrink-0 relative overflow-hidden rounded-xl"
                    style={{
                      width: '280px',
                      aspectRatio: '5/3',
                      scrollSnapAlign: 'start',
                      transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                    }}
                  >
                    {/* Image with zoom on hover */}
                    <div className="absolute inset-0 overflow-hidden rounded-xl">
                      <img
                        src={(car.images && car.images[0]) || `https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=600`}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement
                          t.src = 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=600'
                        }}
                      />
                      {/* Dark gradient overlay — bottom heavy */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    </div>

                    {/* Hover lift shadow */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(251,146,60,0.15)' }}
                    />

                    {/* Demand badge — top right */}
                    <div className={`absolute top-2.5 right-2.5 ${badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm`}>
                      {badgeLabel}
                    </div>

                    {/* Info overlay — bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-white font-serif text-sm font-semibold leading-tight group-hover:text-amber-300 transition-colors truncate">
                        {car.brand} {car.model}
                      </h3>
                      <p className="text-amber-400 text-xs font-medium mt-0.5">
                        ₹{Number(car.daily_rate || 0).toLocaleString()}<span className="text-white/40 font-normal">/day</span>
                      </p>
                    </div>
                  </Link>
                )
              })}

              {/* Spacer at end for fade effect clearance */}
              <div className="flex-shrink-0 w-6" />
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section className="py-24 bg-[#060606]">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <p className="text-luxe-gold text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Simple Process</p>
          <h2 className="text-4xl md:text-5xl font-serif text-luxe-white mb-4">How It Works</h2>
          <p className="text-luxe-gray font-light">Three simple steps to your dream drive</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Choose Your Dream', desc: 'Browse our curated fleet and select your perfect luxury vehicle', icon: '🚗' },
            { step: '02', title: 'Instant Booking', desc: 'Paperless KYC and instant confirmation in minutes', icon: '⚡' },
            { step: '03', title: 'Doorstep Delivery', desc: 'White-glove concierge handover at your location', icon: '🎯' }
          ].map((item, idx) => (
            <div key={idx} className="relative bg-white/[0.03] border border-white/8 rounded-2xl p-10 group hover:border-luxe-gold/30 transition-all duration-300">
              <div className="text-7xl font-serif text-luxe-gold/10 mb-5 leading-none">{item.step}</div>
              <div className="text-4xl mb-5">{item.icon}</div>
              <h3 className="text-xl font-bold text-luxe-white mb-3">{item.title}</h3>
              <p className="text-luxe-gray text-sm leading-relaxed">{item.desc}</p>
              {idx < 2 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-luxe-gold/20"></div>}
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* STATISTICS BANNER */}
      <section className="bg-luxe-gold/5 border-y border-luxe-gold/10 py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { value: '50+', label: 'Premium Vehicles' },
              { value: '12K+', label: 'Happy Customers' },
              { value: '4.9★', label: 'Average Rating' },
              { value: '24/7', label: 'Concierge Support' }
            ].map((stat, idx) => (
              <div key={idx} className="group">
                <div className="text-5xl md:text-6xl font-serif text-luxe-gold mb-3 group-hover:scale-105 transition-transform duration-300">{stat.value}</div>
                <div className="text-xs text-luxe-gray uppercase tracking-[0.2em] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — Infinite Marquee Strip */}
      <section className="py-24 overflow-hidden" style={{ background: 'var(--theme-bg-base, #050505)' }}>

        {/* Keyframe injection */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes testimonial-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .testimonial-track {
            animation: testimonial-scroll 54s linear infinite;
            will-change: transform;
          }
          .testimonial-track:hover {
            animation-play-state: paused;
          }
        `}} />

        {/* Heading */}
        <div className="text-center mb-12 px-4">
          <p className="text-luxe-gold text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Social Proof</p>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-3">What Our Clients Say</h2>
          <p className="text-gray-500 text-sm font-light">Verified experiences from elite members</p>
        </div>

        {/* Marquee wrapper — overflow hidden, gradient fades */}
        <div className="relative">
          {/* Left fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
            style={{ background: 'linear-gradient(to right, var(--theme-bg-base, #050505), transparent)' }} />
          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
            style={{ background: 'linear-gradient(to left, var(--theme-bg-base, #050505), transparent)' }} />

          {/* Scrolling track — cards duplicated for seamless loop */}
          <div className="testimonial-track flex gap-4" style={{ width: 'max-content' }}>
            {[...Array(2)].flatMap(() => [
              { name: 'Rajesh Mehta', title: 'Entrepreneur', car: 'Rolls Royce Ghost', quote: 'The Ghost for my wedding was immaculate. White-glove service from start to finish. Will never use anyone else.' },
              { name: 'Priya Shah', title: 'Startup Founder', car: 'Ferrari F8 Tributo', quote: 'Ferrari F8 delivered to my office on time. Paperless process was incredibly smooth — premium experience.' },
              { name: 'Arjun Patel', title: 'Finance Director', car: 'Lamborghini Huracán', quote: 'First time renting a Lamborghini. The concierge team made it completely stress-free. Outstanding.' },
              { name: 'Meera Kapoor', title: 'Creative Director', car: 'Porsche 911 Turbo S', quote: 'Every detail was handled perfectly. The Porsche was spotless and on time. Truly luxurious experience.' },
              { name: 'Vikram Nair', title: 'CEO', car: 'Bentley Continental GT', quote: 'Booked for our annual gala. The Bentley arrived with a chauffeur and champagne. Simply unmatched.' },
              { name: 'Ananya Singh', title: 'Business Analyst', car: 'Mercedes S-Class AMG', quote: 'Smooth from booking to return. The online process is seamless and the car was absolutely pristine.' },
              { name: 'Rohan Mehta', title: 'Architect', car: 'Aston Martin DBX', quote: 'Our weekend getaway was elevated by the DBX. Incredible performance, incredible service.' },
              { name: 'Simran Ahuja', title: 'Marketing Head', car: 'Bugatti Chiron', quote: 'I rented the Chiron for one day. It redefined my standard for everything. Ethereal experience.' },
              { name: 'Karan Desai', title: 'Real Estate Developer', car: 'Ferrari SF90 Stradale', quote: 'Showed up to negotiations in the SF90. The impression was priceless. Closed the deal that day.' },
              { name: 'Neha Gupta', title: 'Event Planner', car: 'Rolls Royce Phantom', quote: 'Our bridal convoy was impeccable. LUXEDIVE handled 4 cars flawlessly. Absolute professionals.' },
              { name: 'Dhruv Sharma', title: 'Tech Entrepreneur', car: 'McLaren 720S', quote: 'Fastest car I\'ve ever sat in. The 720S was delivered in perfect condition. Will book again.' },
              { name: 'Kavya Reddy', title: 'Luxury Consultant', car: 'Lamborghini Urus', quote: 'The Urus was perfect for our Navratri event. Presence, power, and impeccable service. Loved it.' },
            ].map((review, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 rounded-xl border"
                style={{
                  width: '300px',
                  padding: '20px',
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(212,175,55,0.18)',
                }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-luxe-gold text-luxe-gold" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/75 text-xs leading-relaxed italic mb-4">
                  "{review.quote}"
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-xs font-semibold">{review.name}</p>
                    <p className="text-white/35 text-[10px]">{review.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-luxe-gold text-[10px] font-medium">{review.car}</p>
                    <div className="flex items-center gap-1 text-[9px] text-white/30 justify-end mt-0.5">
                      <ShieldCheck className="w-2.5 h-2.5 text-luxe-gold/50" />
                      Verified
                    </div>
                  </div>
                </div>
              </div>
            )))}
          </div>
        </div>
      </section>

      {/* BRAND PARTNERSHIPS */}
      <section className="bg-luxe-gold/5 border-y border-luxe-gold/10 py-20 overflow-hidden">
        <div className="container mx-auto px-6 text-center mb-10">
          <p className="text-luxe-gold text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Partners</p>
          <h2 className="text-3xl font-serif text-luxe-white">Official Partners of Excellence</h2>
        </div>
        <div className="relative">
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes scroll-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll {
              animation: scroll-left 30s linear infinite;
            }
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}} />
          <div className="flex animate-scroll">
            {[
              { name: 'Rolls Royce', img: '/rolls-royce.png' },
              { name: 'Ferrari', img: '/ferrari.png' },
              { name: 'Lamborghini', img: '/lamborghini.png' },
              { name: 'Porsche', img: '/porsche.png' },
              { name: 'Mercedes', img: '/mercedes.png' },
              { name: 'BMW', img: '/bmw.png' },
              { name: 'Bentley', img: '/bentley.png' },
              { name: 'Rolls Royce', img: '/rolls-royce.png' },
              { name: 'Ferrari', img: '/ferrari.png' },
              { name: 'Lamborghini', img: '/lamborghini.png' },
              { name: 'Porsche', img: '/porsche.png' },
              { name: 'Mercedes', img: '/mercedes.png' },
              { name: 'BMW', img: '/bmw.png' },
              { name: 'Bentley', img: '/bentley.png' }
            ].map((brand, idx) => (
              <div key={idx} className="flex-shrink-0 px-8 w-48 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                <img
                  src={brand.img}
                  alt={brand.name}
                  className="w-full h-24 object-contain mb-2"
                />
                <p className="text-luxe-gray text-xs font-medium uppercase tracking-wider">{brand.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* TRUST INDICATORS */}
      <section className="bg-luxe-gold/5 border-y border-luxe-gold/10 py-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
          <p className="text-luxe-gold text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Our Commitment</p>
          <h2 className="text-4xl md:text-5xl font-serif text-luxe-white mb-16">The LUXEDIVE Promise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6">
              <div className="w-16 h-16 bg-luxe-black rounded-full flex items-center justify-center mx-auto mb-6 text-luxe-gold border border-luxe-gold/20 shadow-lg shadow-luxe-gold/10">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-luxe-white mb-3">100% Verifiable Fleet</h3>
              <p className="text-luxe-gray text-sm leading-relaxed">
                Every vehicle is owned by us or verified partners. No bait-and-switch. What you book is what you drive.
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-luxe-black rounded-full flex items-center justify-center mx-auto mb-6 text-luxe-gold border border-luxe-gold/20 shadow-lg shadow-luxe-gold/10">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-luxe-white mb-3">Concierge Service</h3>
              <p className="text-luxe-gray text-sm leading-relaxed">
                24/7 roadside assistance and personal booking manager for every client. We handle the logistics.
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-luxe-black rounded-full flex items-center justify-center mx-auto mb-6 text-luxe-gold border border-luxe-gold/20 shadow-lg shadow-luxe-gold/10">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-luxe-white mb-3">Instant Confirmation</h3>
              <p className="text-luxe-gray text-sm leading-relaxed">
                Paperless KYC and instant booking confirmation. Get behind the wheel in minutes, not hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE GALLERY -> NAVIGATION CARDS */}
      <section className="py-24 bg-[#060606]">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-14">
            <p className="text-luxe-gold text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Explore</p>
            <h2 className="text-4xl md:text-5xl font-serif text-luxe-white mb-4">The LUXEDIVE Experience</h2>
            <p className="text-luxe-gray font-light">Direct access to our most premium offerings</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Wedding Collection",
                subtitle: "Luxury for your special day",
                image: "https://images.unsplash.com/photo-1561100966-f6aa0145e8e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdlZGRpbmclMjBkZWNvcmF0ZWQlMjBjYXJ8ZW58MHx8MHx8fDA%3D",
                route: "/events/wedding"
              },
              {
                title: "Services",
                subtitle: "Explore premium offerings",
                image: "https://plus.unsplash.com/premium_photo-1661779699361-2f55e745d9c2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNlcnZpY2UlMjBwb3N0ZXIlMjBpbiUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D",
                route: "/services"
              },
              {
                title: "Add Vehicle",
                subtitle: "List your car & earn",
                image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800",
                route: "/add-vehicle"
              },
              {
                title: "Chauffeur",
                subtitle: "Professional drivers",
                image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800",
                route: "/chauffeurs"
              }
            ].map((card, idx) => (
              <Link
                key={idx}
                to={card.route}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] sm:aspect-square flex items-center justify-center transition-all duration-700 hover:scale-[1.05] hover:shadow-[0_0_50px_rgba(212,175,55,0.25)] border border-white/5 hover:border-luxe-gold/40"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-[0.7] group-hover:brightness-[0.9]"
                  />
                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-6 py-8 transform transition-all duration-500 group-hover:-translate-y-2">
                  <h3 className="text-2xl font-serif font-bold text-white mb-2 tracking-wide group-hover:text-luxe-gold transition-colors duration-300">
                    {card.title}
                  </h3>
                  <div className="w-8 h-[1px] bg-luxe-gold/50 mx-auto mb-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <p className="text-luxe-gold/90 text-[10px] font-bold uppercase tracking-[0.25em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    {card.subtitle}
                  </p>
                </div>

                {/* Hover Glow Edge Effect */}
                <div className="absolute inset-0 border border-luxe-gold/0 group-hover:border-luxe-gold/20 rounded-2xl transition-colors duration-700 pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE LOCATIONS */}
      <section className="py-24 bg-luxe-gold/5 border-y border-luxe-gold/10">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-14">
          <p className="text-luxe-gold text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Coverage</p>
          <h2 className="text-4xl md:text-5xl font-serif text-luxe-white mb-4">Where We Serve</h2>
          <p className="text-luxe-gray font-light">Premium service across India</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-luxe-dark/40 border border-luxe-gray/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-luxe-gold mb-6">🎯 Active Locations</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-luxe-gold/10 rounded-full flex items-center justify-center text-luxe-gold flex-shrink-0">📍</div>
                <div>
                  <h4 className="font-bold text-luxe-white">Ahmedabad (HQ)</h4>
                  <p className="text-sm text-luxe-gray">S.G. Highway, Bodakdev</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-luxe-dark/40 border border-luxe-gray/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-luxe-gray mb-6">🚀 Coming Soon</h3>
            <div className="space-y-3 text-luxe-gray text-sm">
              <div>• Mumbai (Q2 2026)</div>
              <div>• Delhi NCR (Q3 2026)</div>
              <div>• Bangalore (Q4 2026)</div>
            </div>
            <Link to="/contact" className="mt-6 inline-block">
              <Button size="sm" variant="outline">Request Your City</Button>
            </Link>
          </div>
        </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="py-24 bg-[#060606]">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-14">
          <p className="text-luxe-gold text-[11px] font-bold uppercase tracking-[0.3em] mb-3">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-serif text-luxe-white mb-4">Frequently Asked Questions</h2>
          <p className="text-luxe-gray font-light">Everything you need to know</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { q: 'What documents do I need?', a: 'Valid driving license, Aadhaar/Passport, and a security deposit.' },
            { q: 'Is fuel included in the rental?', a: 'No, fuel is the responsibility of the renter. Vehicles are delivered with a full tank.' },
            { q: 'What\'s your cancellation policy?', a: 'Free cancellation up to 24 hours before pickup. 50% refund within 24 hours.' },
            { q: 'Do you offer airport pickup?', a: 'Yes, we offer complimentary airport delivery for bookings over 3 days.' },
            { q: 'Are there mileage limits?', a: 'Standard rentals include 200km/day. Unlimited mileage available for premium plans.' }
          ].map((faq, idx) => (
            <details key={idx} className="bg-luxe-dark/40 border border-luxe-gray/10 rounded-xl p-6 group hover:border-luxe-gold/30 transition-all">
              <summary className="font-bold text-luxe-white cursor-pointer list-none flex items-center justify-between">
                {faq.q}
                <span className="text-luxe-gold">+</span>
              </summary>
              <p className="mt-4 text-sm text-luxe-gray leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/contact" className="text-luxe-gold hover:text-white transition-colors inline-flex items-center gap-2">
            View All FAQs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        </div>
      </section>
    </div>
  )
}
