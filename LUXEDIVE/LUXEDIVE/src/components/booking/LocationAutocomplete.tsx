import React, { useState, useEffect, useCallback, useRef } from 'react'
import { MapPin, Loader2, AlertCircle } from 'lucide-react'
import ahmedabadDB from '../../data/ahmedabad_locations.json'

interface LocationAutocompleteProps {
    label: string
    placeholder: string
    value: string
    onChange: (address: string, details?: { lat: number; lng: number; placeId: string }) => void
    error?: string
}

// Configuration
const AHMEDABAD_CENTER = { lat: 23.0225, lng: 72.5714 }
const CACHE_LIMIT = 5
const MAX_SUGGESTIONS = 8
const DEBOUNCE_MS = 300

// Results cache: stores the results of the last 5 unique searches
const searchCache: Map<string, any[]> = new Map()

export default function LocationAutocomplete({ label, placeholder, value, onChange, error }: LocationAutocompleteProps) {
    const [inputValue, setInputValue] = useState(value)
    const [suggestions, setSuggestions] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null)
    const debounceTimer = useRef<any>(null)

    const fetchSuggestions = useCallback(async (input: string) => {
        const query = input.trim()
        if (!query || query.length < 3) {
            setSuggestions([])
            setShowSuggestions(false)
            return
        }

        // Check cache first
        if (searchCache.has(query.toLowerCase())) {
            setSuggestions(searchCache.get(query.toLowerCase())!)
            setShowSuggestions(true)
            return
        }

        setIsLoading(true)
        setApiError(null)

        try {
            // LAYER 1: Search Local Master DB (High Priority)
            const localMatches = ahmedabadDB
                .filter(item => 
                    item.name.toLowerCase().includes(query.toLowerCase()) || 
                    item.full.toLowerCase().includes(query.toLowerCase())
                )
                .map(item => ({
                    display_name: item.full,
                    lat: item.lat.toString(),
                    lon: item.lon.toString(),
                    place_id: `master-${item.name.replace(/\s+/g, '-')}`,
                    isMasterDB: true
                }))

            // LAYER 2: Call LocationIQ API (Secondary)
            let apiResults: any[] = []
            try {
                const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY
                const refinedQuery = `${query}, Ahmedabad`
                const response = await fetch(
                    `https://api.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${encodeURIComponent(refinedQuery)}&limit=10&countrycodes=in&normalizecity=1`
                )
                if (response.ok) {
                    const data = await response.json()
                    apiResults = data.filter((item: any) => {
                        const nameLower = (item.display_name || '').toLowerCase()
                        return nameLower.includes('ahmedabad')
                    })
                }
            } catch (err) {
                console.warn('API Offline - Using Master DB fallback')
            }

            // LAYER 3: Merge & Deduplicate (Master DB Priority)
            const combined = [...localMatches, ...apiResults]
            const seen = new Set()
            const uniqueResults = combined.filter(item => {
                const name = item.display_name.toLowerCase()
                if (seen.has(name)) return false
                seen.add(name)
                return true
            })

            const finalSuggestions = uniqueResults.slice(0, MAX_SUGGESTIONS)

            if (finalSuggestions.length === 0) {
                setApiError('No location found in Ahmedabad')
            }

            // Update cache
            if (searchCache.size >= CACHE_LIMIT) {
                const firstKey = searchCache.keys().next().value
                if (firstKey !== undefined) searchCache.delete(firstKey)
            }
            searchCache.set(query.toLowerCase(), finalSuggestions)

            setSuggestions(finalSuggestions)
            setShowSuggestions(true)
        } catch (err) {
            console.error('Hybrid System Error:', err)
            setApiError('Search service unavailable')
        } finally {
            setIsLoading(false)
        }
    }, [])

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setInputValue(val)
        
        // Critical: Clear selection details on typing to force re-selection
        onChange(val, undefined)
        if (apiError) setApiError(null)

        // Debounce search (300ms)
        if (debounceTimer.current) clearTimeout(debounceTimer.current)
        debounceTimer.current = setTimeout(() => {
            fetchSuggestions(val)
        }, DEBOUNCE_MS)
    }

    const handleSelect = (item: any) => {
        const address = item.display_name
        setInputValue(address)
        setShowSuggestions(false)
        setSuggestions([])
        
        // Store selected location details
        onChange(address, {
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon),
            placeId: item.place_id
        })
    }

    const clearInput = () => {
        setInputValue('')
        setSuggestions([])
        setShowSuggestions(false)
        onChange('', undefined)
    }

    useEffect(() => {
        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current)
        }
    }, [])

    return (
        <div className="space-y-4 relative w-full">
            <div className="flex justify-between items-end px-1">
                <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black block">{label}</label>
                {inputValue && (
                    <button onClick={clearInput} className="text-[8px] text-gray-600 hover:text-amber-500 uppercase tracking-widest font-bold font-serif transition-colors mb-0.5">Clear Address</button>
                )}
            </div>
            <div className="relative group">
                <input 
                    type="text" 
                    value={inputValue}
                    onChange={handleInput}
                    onFocus={() => {
                        if (inputValue.length >= 3 && suggestions.length > 0) setShowSuggestions(true)
                    }}
                    placeholder={placeholder}
                    className={`w-full h-14 bg-black/40 border ${error || apiError ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-12 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-gray-700 font-medium`}
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" /> : <MapPin className="w-4 h-4" />}
                </div>

                {(error || apiError) && (
                    <div className="absolute -bottom-6 left-1 flex items-center gap-2">
                        <AlertCircle className="w-3 h-3 text-red-500" />
                        <span className="text-[10px] text-red-500 font-black uppercase tracking-widest leading-none">
                            {apiError || error}
                        </span>
                    </div>
                )}

                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-[60] left-0 right-0 top-full mt-2 bg-[#111] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="p-3 bg-zinc-900/50 border-b border-white/5 flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black">Verified Ahmedabad Locations</span>
                            {isLoading && <Loader2 className="w-3 h-3 animate-spin text-[#D4AF37]" />}
                        </div>
                        <div className="max-h-72 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800/40 scrollbar-track-transparent">
                            {suggestions.map((s, i) => {
                                const parts = s.display_name.split(',')
                                const mainText = parts[0]
                                const subText = parts.slice(1).join(',').trim()
                                
                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleSelect(s)}
                                        type="button"
                                        className="w-full text-left px-6 py-4 hover:bg-[#D4AF37] group/item transition-all duration-200 border-b border-white/5 last:border-0"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 p-1.5 rounded-lg bg-zinc-800/10 group-hover/item:bg-black/20 text-[#D4AF37]">
                                                <MapPin className="w-3.5 h-3.5 group-hover/item:text-black" />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-sm text-white group-hover/item:text-black font-bold line-clamp-1 truncate">{mainText}</p>
                                                <p className="text-[10px] text-gray-500 group-hover/item:text-black/60 uppercase tracking-widest line-clamp-1 truncate mt-0.5">{subText}</p>
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
            
            {showSuggestions && (
                <div 
                    className="fixed inset-0 z-[50] bg-black/5" 
                    onClick={() => setShowSuggestions(false)}
                />
            )}
        </div>
    )
}
