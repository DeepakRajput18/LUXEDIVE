import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { TrendingUp, Save, ToggleLeft, ToggleRight } from 'lucide-react'
import { toast } from 'sonner'

interface CarPricing {
    id: string
    name: string
    daily_rate: number
    pricing_multiplier?: number
    dynamic_pricing?: boolean
}

export default function AdminPricing() {
    const [cars, setCars] = useState<CarPricing[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState<string | null>(null)

    useEffect(() => {
        supabase
            .from('cars')
            .select('id, name, daily_rate, pricing_multiplier, dynamic_pricing')
            .order('name')
            .then(({ data }) => {
                setCars(data ?? [])
                setLoading(false)
            })
    }, [])

    const update = (id: string, field: keyof CarPricing, value: unknown) => {
        setCars(cars.map(c => c.id === id ? { ...c, [field]: value } : c))
    }

    const save = async (car: CarPricing) => {
        setSaving(car.id)
        const { error } = await supabase
            .from('cars')
            .update({
                daily_rate: car.daily_rate,
                pricing_multiplier: car.pricing_multiplier ?? 1.0,
                dynamic_pricing: car.dynamic_pricing ?? false,
            })
            .eq('id', car.id)
        setSaving(null)
        if (error) toast.error('Save failed')
        else toast.success(`${car.name} pricing updated`)
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-white">Pricing Control</h1>
                <p className="text-gray-600 text-sm mt-0.5">Override prices, set multipliers, enable dynamic pricing</p>
            </div>

            {loading ? (
                <p className="text-gray-600 text-sm">Loading fleet pricing…</p>
            ) : (
                <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left px-5 py-3 text-gray-600 text-xs uppercase tracking-wider font-medium">Vehicle</th>
                                <th className="text-left px-5 py-3 text-gray-600 text-xs uppercase tracking-wider font-medium">Base Price/Day</th>
                                <th className="text-left px-5 py-3 text-gray-600 text-xs uppercase tracking-wider font-medium">Multiplier</th>
                                <th className="text-left px-5 py-3 text-gray-600 text-xs uppercase tracking-wider font-medium">Dynamic</th>
                                <th className="text-left px-5 py-3 text-gray-600 text-xs uppercase tracking-wider font-medium">Effective</th>
                                <th className="px-5 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {cars.map(car => {
                                const multiplier = car.pricing_multiplier ?? 1.0
                                const effective = Math.round(car.daily_rate * multiplier)
                                return (
                                    <tr key={car.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-5 py-3 text-white font-medium">{car.name}</td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-1">
                                                <span className="text-gray-500 text-xs">₹</span>
                                                <input
                                                    type="number"
                                                    value={car.daily_rate}
                                                    onChange={e => update(car.id, 'daily_rate', +e.target.value)}
                                                    className="w-24 bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-luxe-gold/40"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <input
                                                type="number"
                                                step="0.1"
                                                min="0.5"
                                                max="5"
                                                value={multiplier}
                                                onChange={e => update(car.id, 'pricing_multiplier', +e.target.value)}
                                                className="w-20 bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-luxe-gold/40"
                                            />
                                        </td>
                                        <td className="px-5 py-3">
                                            <button
                                                onClick={() => update(car.id, 'dynamic_pricing', !car.dynamic_pricing)}
                                                className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${car.dynamic_pricing ? 'text-green-400' : 'text-gray-600'
                                                    }`}
                                            >
                                                {car.dynamic_pricing
                                                    ? <ToggleRight className="w-5 h-5" />
                                                    : <ToggleLeft className="w-5 h-5" />
                                                }
                                                {car.dynamic_pricing ? 'On' : 'Off'}
                                            </button>
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className={`text-xs font-semibold ${multiplier > 1 ? 'text-luxe-gold' : 'text-white'}`}>
                                                ₹{effective.toLocaleString()}
                                            </span>
                                            {multiplier !== 1.0 && (
                                                <span className="text-gray-700 text-[10px] ml-1">
                                                    ({multiplier > 1 ? '+' : ''}{((multiplier - 1) * 100).toFixed(0)}%)
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3">
                                            <button
                                                onClick={() => save(car)}
                                                disabled={saving === car.id}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-luxe-gold/10 hover:bg-luxe-gold text-luxe-gold hover:text-black text-xs font-medium rounded-lg transition-all disabled:opacity-40"
                                            >
                                                <Save className="w-3.5 h-3.5" />
                                                {saving === car.id ? 'Saving…' : 'Save'}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="mt-4 flex items-start gap-2 text-gray-700 text-xs">
                <TrendingUp className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <p>Multiplier × base price = effective daily rate. Dynamic pricing enables AI-driven adjustments based on demand score.</p>
            </div>
        </div>
    )
}
