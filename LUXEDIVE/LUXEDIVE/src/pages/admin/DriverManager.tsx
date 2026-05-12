import { useState, useEffect } from 'react'
import { User, Phone, MapPin, Star, Calendar, Clock, MoreVertical, Plus, Search, X } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { supabase } from '../../lib/supabaseClient'
import { PriceInput } from '../../components/forms/PriceInput'
import { toast } from 'sonner'

interface Chauffeur {
    id: string
    full_name: string
    phone: string
    experience_years: number
    price_per_day: number
    status?: string
}

export default function DriverManager() {
    const [filter, setFilter] = useState('all')
    const [drivers, setDrivers] = useState<Chauffeur[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [formData, setFormData] = useState({
        id: '',
        full_name: '',
        phone: '',
        experience_years: '',
        price_per_day: ''
    })

    useEffect(() => {
        fetchDrivers()
    }, [])

    const fetchDrivers = async () => {
        setLoading(true)
        const { data, error } = await supabase.from('chauffeurs').select('*')
        if (!error && data) {
            setDrivers(data)
        }
        setLoading(false)
    }

    const handleSave = async () => {
        try {
            if (editMode) {
                const { error } = await supabase.from('chauffeurs').update({
                    full_name: formData.full_name,
                    phone: formData.phone,
                    experience_years: Number(formData.experience_years),
                    price_per_day: Number(formData.price_per_day)
                }).eq('id', formData.id)
                if (error) throw error
                toast.success('Chauffeur updated!')
            } else {
                const { error } = await supabase.from('chauffeurs').insert({
                    full_name: formData.full_name,
                    phone: formData.phone,
                    experience_years: Number(formData.experience_years),
                    price_per_day: Number(formData.price_per_day)
                })
                if (error) throw error
                toast.success('Chauffeur added!')
            }
            setIsModalOpen(false)
            fetchDrivers()
        } catch (err: any) {
            toast.error(err.message)
        }
    }

    const openAddModal = () => {
        setEditMode(false)
        setFormData({ id: '', full_name: '', phone: '', experience_years: '', price_per_day: '' })
        setIsModalOpen(true)
    }

    const openEditModal = (driver: Chauffeur) => {
        setEditMode(true)
        setFormData({
            id: driver.id,
            full_name: driver.full_name,
            phone: driver.phone || '',
            experience_years: driver.experience_years ? driver.experience_years.toString() : '',
            price_per_day: driver.price_per_day ? driver.price_per_day.toString() : ''
        })
        setIsModalOpen(true)
    }

    return (
        <div className="space-y-8 text-white h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-serif text-white">Driver Management</h1>
                    <p className="text-luxe-gray mt-2">Manage chauffeur profiles, schedules, and live status.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="border-white/10 hover:bg-white hover:text-black">
                        <Calendar className="w-4 h-4 mr-2" /> Schedule
                    </Button>
                    <Button onClick={openAddModal} className="bg-luxe-gold text-black hover:bg-luxe-gold/90">
                        <Plus className="w-4 h-4 mr-2" /> Add Driver
                    </Button>
                </div>
            </div>

            {/* Filter & Search */}
            <div className="flex items-center justify-between">
                <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                    {['all', 'available', 'on trip'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${filter === tab ? 'bg-white text-black shadow-lg' : 'text-luxe-gray hover:text-white'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxe-gray" />
                    <input
                        type="text"
                        placeholder="Search drivers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-luxe-gold/50"
                    />
                </div>
            </div>

            {/* Drivers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drivers.filter(d => d.full_name.toLowerCase().includes(search.toLowerCase())).map((driver) => (
                    <div key={driver.id} className="bg-white/5 border border-white/10 rounded-xl p-6 group hover:border-luxe-gold/30 transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border border-white/10 overflow-hidden">
                                    <User className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-lg text-white">{driver.full_name}</h3>
                                    <div className="flex items-center gap-1 text-xs text-luxe-gold">
                                        <Star className="w-3 h-3 fill-current" />
                                        <span className="font-bold">5.0</span>
                                    </div>
                                </div>
                            </div>
                            <span className="px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                Available
                            </span>
                        </div>

                        <div className="space-y-3 border-t border-white/5 pt-4">
                            <div className="flex items-center gap-3 text-sm text-luxe-gray">
                                <Phone className="w-4 h-4" />
                                <span>{driver.phone || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-luxe-gray">
                                <Star className="w-4 h-4" />
                                <span>Exp: <span className="text-white">{driver.experience_years || 0} Years</span></span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-luxe-gray">
                                <span className="font-bold text-white">₹{driver.price_per_day?.toLocaleString()}/Day</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Button onClick={() => openEditModal(driver)} variant="outline" size="sm" className="w-full border-white/10 text-xs">Edit</Button>
                            <Button size="sm" className="w-full bg-white text-black hover:bg-luxe-gold text-xs">View Trips</Button>
                        </div>
                    </div>
                ))}

                <button onClick={openAddModal} className="bg-black/20 border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-white/5 hover:border-white/20 transition-all group cursor-pointer h-full min-h-[250px]">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-luxe-gold group-hover:text-black transition-colors">
                        <Plus className="w-6 h-6" />
                    </div>
                    <span className="font-serif text-luxe-gray group-hover:text-white">Register New Driver</span>
                </button>
            </div>

            {/* Add / Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl w-full max-w-lg overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-[#1E1E1E]">
                            <h2 className="text-xl font-serif text-white">{editMode ? 'Edit Chauffeur' : 'Add Chauffeur'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">Full Name</label>
                                    <input 
                                        type="text"
                                        value={formData.full_name}
                                        onChange={e => setFormData(p => ({ ...p, full_name: e.target.value }))}
                                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">Phone</label>
                                    <input 
                                        type="text"
                                        value={formData.phone}
                                        onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">Experience (Years)</label>
                                    <input 
                                        type="number"
                                        value={formData.experience_years}
                                        onChange={e => setFormData(p => ({ ...p, experience_years: e.target.value }))}
                                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                    />
                                </div>

                                <PriceInput
                                    label="Price Per Day"
                                    type="chauffeur"
                                    value={formData.price_per_day === '' ? '' : Number(formData.price_per_day)}
                                    onChange={(v) => setFormData(p => ({ ...p, price_per_day: v.toString() }))}
                                    required={true}
                                />
                            </div>

                            <Button onClick={handleSave} className="w-full bg-[#D4AF37] text-black hover:bg-[#C5A030] py-4 rounded-xl font-bold">
                                {editMode ? 'Save Changes' : 'Add Chauffeur'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
