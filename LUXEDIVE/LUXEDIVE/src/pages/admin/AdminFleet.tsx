import { useState, useEffect, useRef, useCallback } from 'react'
import type { DragEvent, ClipboardEvent } from 'react'
import { supabase } from '../../lib/supabaseClient'
import {
    Car, Plus, Edit2, Trash2, X, Check, Star, RotateCw,
    Search, Upload, Image, RefreshCw, Loader2,
    Zap, Settings, DollarSign, ChevronDown, Eye, Layers, Box, Maximize2, AlertCircle, CheckCircle
} from 'lucide-react'
import { toast } from 'sonner'
import { PriceInput } from '../../components/forms/PriceInput'

/* ─── Types ─────────────────────────────────────────────────────────── */
interface CarRow {
    id: string
    model: string
    brand?: string
    category: string
    daily_rate: number
    status: string
    is_featured?: boolean
    images?: string[]
    image_url?: string
    seating?: number
    transmission?: string
    fuel_type?: string
    specifications?: { acceleration?: string; engine?: string; hp?: string }
    year?: number
}

const EMPTY_CAR: Partial<CarRow> = {
    model: '', brand: '', category: 'LUXURY', daily_rate: 0,
    status: 'available', is_featured: false,
    images: [], seating: 4, transmission: 'automatic',
    fuel_type: 'petrol', specifications: { acceleration: '', engine: '', hp: '' },
    year: new Date().getFullYear()
}

/* ─── Image helpers ──────────────────────────────────────────────────── */

const isValidStorageUrl = (url: string | undefined): boolean =>
    !!url && url.startsWith('https://')

const toDisplayImage = (car: Partial<CarRow>): string | undefined => {
    if (isValidStorageUrl(car.image_url)) return car.image_url
    const imgs = car.images
    if (Array.isArray(imgs)) {
        const first = imgs.find(u => isValidStorageUrl(u))
        if (first) return first
    }
    if (typeof imgs === 'string') {
        try {
            const parsed = JSON.parse(imgs)
            if (Array.isArray(parsed)) return parsed.find(isValidStorageUrl)
        } catch { /* not JSON */ }
        if ((imgs as string).startsWith('{')) {
            const url = (imgs as string)
                .replace(/^\{|\}$/g, '').split(',')[0]
                .replace(/^"|"$/g, '').trim()
            if (isValidStorageUrl(url)) return url
        }
    }
    return undefined
}

const normalizeRow = (row: any): CarRow => {
    let images: string[] = row.images || []
    if (typeof images === 'string') {
        try { images = JSON.parse(images) } catch {
            if ((images as unknown as string).startsWith('{')) {
                images = (images as unknown as string)
                    .replace(/^\{|\}$/g, '').split(',')
                    .map((s: string) => s.replace(/^"|"$/g, '').trim())
                    .filter(Boolean)
            } else {
                images = []
            }
        }
    }
    return { ...row, images }
}

async function optimiseImage(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img')
        const objUrl = URL.createObjectURL(file)
        img.onload = () => {
            URL.revokeObjectURL(objUrl)
            const MAX = 1600
            let { width, height } = img
            if (width > MAX) { height = Math.round(height * MAX / width); width = MAX }
            const canvas = document.createElement('canvas')
            canvas.width = width; canvas.height = height
            canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
            canvas.toBlob(blob => {
                if (blob) resolve(blob)
                else reject(new Error('Canvas WebP conversion failed'))
            }, 'image/webp', 0.82)
        }
        img.onerror = () => { URL.revokeObjectURL(objUrl); reject(new Error('Image failed to load for optimisation')) }
        img.src = objUrl
    })
}



const INPUT = 'w-full bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all duration-200'
const LABEL = 'block text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-medium'
const CARD = 'bg-[#111111] border border-[#1E1E1E] rounded-2xl p-6'

async function deleteStorageFolder(bucket: string, prefixPath: string) {
    if (!prefixPath) return
    console.log(`[Storage Cleanup] Clearing ${bucket}/${prefixPath}...`)
    try {
        const { data: files, error: listError } = await supabase.storage.from(bucket).list(prefixPath)
        if (listError) throw listError
        if (files && files.length > 0) {
            const paths = files.map(f => `${prefixPath}/${f.name}`)
            const { error: removeError } = await supabase.storage.from(bucket).remove(paths)
            if (removeError) throw removeError
            console.log(`[Storage Cleanup] Successfully removed ${files.length} files.`)
        }
    } catch (e) {
        console.warn("[Storage Cleanup] Non-fatal error during cleanup:", e)
    }
}

function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className={CARD}>
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-[#1E1E1E]">
                <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                    {icon}
                </div>
                <span className="text-white font-semibold text-sm tracking-wide">{title}</span>
            </div>
            {children}
        </div>
    )
}

function ImageUploader({ imageUrl, uploading, onFile, onRemove }:
    { imageUrl?: string; uploading: boolean; onFile: (f: File) => void; onRemove: () => void }) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [dragging, setDragging] = useState(false)

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault(); e.stopPropagation(); setDragging(false)
        const file = Array.from(e.dataTransfer.files).find(f => f.type.startsWith('image/'))
        if (file) { onFile(file) }
    }

    const handleZonePaste = useCallback((e: ClipboardEvent<HTMLDivElement>) => {
        const item = Array.from(e.clipboardData.items).find(i => i.type.startsWith('image/'))
        if (item) {
            const file = item.getAsFile()
            if (file) { onFile(file) }
        }
    }, [onFile])

    return (
        <div className="space-y-3">
            {imageUrl ? (
                <div className="relative rounded-2xl overflow-hidden border border-[#1E1E1E] group">
                    <img
                        src={imageUrl}
                        alt="Vehicle preview"
                        className="w-full h-52 object-cover"
                        onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-[2px] z-20">
                        <button type="button" onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white text-xs rounded-xl hover:bg-[#D4AF37] hover:text-black hover:border-transparent transition-all font-bold shadow-xl">
                            <RefreshCw className="w-3.5 h-3.5" /> Replace
                        </button>
                        <button type="button" onClick={(e) => { e.stopPropagation(); onRemove(); }}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-500 text-xs rounded-xl hover:bg-red-500 hover:text-white hover:border-transparent transition-all font-bold shadow-xl">
                            <X className="w-3.5 h-3.5" /> Remove
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onDragOver={e => { e.preventDefault(); e.stopPropagation(); setDragging(true) }}
                    onDragLeave={e => { e.stopPropagation(); setDragging(false) }}
                    onDrop={handleDrop}
                    onPaste={handleZonePaste}
                    tabIndex={0}
                    className={`relative w-full h-52 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 outline-none
                        ${dragging
                            ? 'border-[#D4AF37] bg-[#D4AF37]/5 scale-[1.01]'
                            : 'border-[#2A2A2A] bg-[#0A0A0A] hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5'}`}
                    onClick={() => !uploading && inputRef.current?.click()}
                >
                    {uploading ? (
                        <>
                            <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
                            <span className="text-[#D4AF37] text-sm font-medium">Uploading to storage…</span>
                        </>
                    ) : (
                        <>
                            <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center">
                                <Image className="w-6 h-6 text-gray-500" />
                            </div>
                            <div className="text-center space-y-1 px-6">
                                <p className="text-white text-sm font-medium">Drag &amp; drop vehicle image</p>
                                <p className="text-gray-600 text-xs text-center">
                                    or <span className="text-[#D4AF37]">Ctrl+V</span> to paste
                                    &nbsp;·&nbsp; <span className="text-[#D4AF37]">click</span> to browse
                                </p>
                            </div>
                        </>
                    )}
                </div>
            )}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                    const f = e.target.files?.[0]
                    if (f) { onFile(f) }
                    e.target.value = ''
                }}
            />
        </div>
    )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className={LABEL}>{label}</label>
            {children}
        </div>
    )
}

function SelectField({ label, value, onChange, options }: {
    label: string; value: string
    onChange: (v: string) => void
    options: { label: string; value: string }[]
}) {
    return (
        <Field label={label}>
            <div className="relative">
                <select
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className={INPUT + ' appearance-none pr-10 cursor-pointer'}
                    style={{ colorScheme: 'dark' }}
                >
                    {options.map(o => (
                        <option key={o.value} value={o.value} style={{ background: '#111111', color: '#fff' }}>
                            {o.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
        </Field>
    )
}

export default function AdminFleet() {
    const [cars, setCars] = useState<CarRow[]>([])
    const [filtered, setFiltered] = useState<CarRow[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [editCar, setEditCar] = useState<Partial<CarRow>>(EMPTY_CAR)
    const [isEditing, setIsEditing] = useState(false)
    const [saving, setSaving] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)

    const fetchCars = async () => {
        const { data, error } = await supabase.from('cars').select('*').order('brand')
        if (error) toast.error("Failed to fetch vehicles: " + error.message)
        const normalized = (data ?? []).map(normalizeRow)
        setCars(normalized)
        setFiltered(normalized)
        setLoading(false)
    }
    useEffect(() => { fetchCars() }, [])

    useEffect(() => {
        const q = search.toLowerCase()
        setFiltered(cars.filter(c =>
            c.model?.toLowerCase().includes(q) ||
            c.brand?.toLowerCase().includes(q) ||
            c.category?.toLowerCase().includes(q)
        ))
    }, [search, cars])

    useEffect(() => {
        if (!showForm) return
        const handler = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); handleSave() }
            if (e.key === 'Escape') setShowForm(false)
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [showForm, editCar])

    useEffect(() => {
        if (!showForm) return
        const handleGlobalPaste = (e: globalThis.ClipboardEvent) => {
            const item = Array.from(e.clipboardData?.items ?? []).find(i => i.type.startsWith('image/'))
            if (!item) return
            const active = document.activeElement
            if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return
            e.preventDefault()
            const file = item.getAsFile()
            if (file) handleImageFile(file)
        }
        window.addEventListener('paste', handleGlobalPaste)
        return () => window.removeEventListener('paste', handleGlobalPaste)
    }, [showForm])

    const uploadImageFile = async (file: File): Promise<string | null> => {
        if (!file.type.startsWith('image/')) { toast.error('Please provide an image file'); return null }
        setUploadingImage(true)
        try {
            const optimised = await optimiseImage(file)
            const fileName = `vehicle_${Date.now()}_${Math.random().toString(36).slice(2)}.webp`
            const { error: uploadError } = await supabase.storage.from('vehicles').upload(fileName, optimised, { contentType: 'image/webp' })
            if (uploadError) throw uploadError
            const { data } = supabase.storage.from('vehicles').getPublicUrl(fileName)
            return data.publicUrl
        } catch (err: any) {
            toast.error('Upload failed: ' + err.message)
            return null
        } finally {
            setUploadingImage(false)
        }
    }

    const handleImageFile = async (file: File) => {
        const url = await uploadImageFile(file)
        if (url) setEditCar(p => ({ ...p, image_url: url }))
    }

    const handleSave = async () => {
        if (!editCar.model || !editCar.brand) { toast.error('Required fields missing'); return }
        setSaving(true)
        const { id, images, ...dbPayload } = editCar as any
        let targetId = id;
        
        if (dbPayload.image_url) {
            const existing = Array.isArray(images) ? images : []
            dbPayload.images = [dbPayload.image_url, ...existing.filter((u: string) => u !== dbPayload.image_url)]
        } else {
            dbPayload.images = images
        }

        if (dbPayload.transmission) dbPayload.transmission = dbPayload.transmission.toLowerCase()
        if (dbPayload.fuel_type) dbPayload.fuel_type = dbPayload.fuel_type.toLowerCase()

        if (isEditing && id) {
            await supabase.from('cars').update(dbPayload).eq('id', id)
        } else {
            const { data } = await supabase.from('cars').insert(dbPayload).select().single()
            if (data) targetId = data.id 
        }

        setSaving(false)
        setShowForm(false)
        fetchCars()
        if (isEditing) toast.success('Updated vehicle')
        else toast.success('Added vehicle')
    }

    const deleteCar = async (id: string, model: string) => {
        if (!confirm(`Delete ${model}?`)) return
        await supabase.from('cars').delete().eq('id', id)
        fetchCars()
    }

    const toggleStatus = async (id: string, cur: string) => {
        const next = cur === 'available' ? 'maintenance' : 'available'
        await supabase.from('cars').update({ status: next }).eq('id', id)
        fetchCars()
    }

    const openAdd = () => { 
        setEditCar({ ...EMPTY_CAR }); 
        setIsEditing(false); 
        setShowForm(true); 
    }

    const openEdit = (car: CarRow) => { 
        setEditCar({ ...car }); 
        setIsEditing(true); 
        setShowForm(true); 
    }

    const set = (key: string, value: unknown) => setEditCar(p => ({ ...p, [key]: value }))

    return (
        <div style={{ fontFamily: "'Inter', sans-serif", background: '#0A0A0A', minHeight: '100vh', padding: '2rem' }}>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Fleet Management</h1>
                    <p className="text-gray-600 text-sm mt-1">{cars.length} vehicles</p>
                </div>
                <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-[#D4AF37] text-black"><Plus className="w-4 h-4" /> Add Vehicle</button>
            </div>

            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-full pl-11 pr-4 py-3 bg-[#111111] border border-[#1E1E1E] rounded-xl text-white text-sm" />
            </div>

            <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[#1E1E1E]">
                            {['Vehicle', 'Category', 'Price/Day', 'Status', 'Actions'].map(h => (
                                <th key={h} className="text-left px-5 py-4 text-[10px] text-gray-600 uppercase font-semibold">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A1A1A]">
                        {filtered.map(car => (
                            <tr key={car.id} className="hover:bg-white/[0.015]">
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-9 rounded-lg bg-[#1A1A1A] overflow-hidden flex items-center justify-center">
                                            {toDisplayImage(car) ? <img src={toDisplayImage(car)} className="w-full h-full object-cover" /> : <Car className="w-5 h-5 text-gray-700" />}
                                        </div>
                                        <div className="text-white font-medium">{car.brand} {car.model}</div>
                                    </div>
                                </td>
                                <td className="px-5 py-4 text-gray-400">{car.category}</td>
                                <td className="px-5 py-4 text-white">₹{car.daily_rate?.toLocaleString()}</td>
                                <td className="px-5 py-4">
                                    <button onClick={() => toggleStatus(car.id, car.status)} className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${car.status === 'available' ? 'text-green-400 border-green-400/30' : 'text-orange-400 border-orange-400/30'}`}>{car.status}</button>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex gap-2">

                                        <button onClick={() => openEdit(car)} className="p-2 text-gray-500 hover:text-white" title="Edit"><Edit2 className="w-4 h-4" /></button>
                                        <button onClick={() => deleteCar(car.id, car.model)} className="p-2 text-gray-500 hover:text-red-400" title="Delete"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/75" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
                    <div className="w-full max-w-2xl bg-[#0A0A0A] border-l border-[#1E1E1E] flex flex-col h-screen">
                        <div className="flex items-center justify-between px-8 py-5 border-b border-[#1E1E1E]">
                            <div className="flex items-center gap-3">
                                <h3 className="text-white font-bold">{isEditing ? 'Editing' : 'New Vehicle'}</h3>
                            </div>
                            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                            <SectionCard title="Photo" icon={<Image className="w-4 h-4" />}>
                                <ImageUploader 
                                    imageUrl={toDisplayImage(editCar)} 
                                    uploading={uploadingImage} 
                                    onFile={handleImageFile} 
                                    onRemove={() => setEditCar(p => ({ ...p, image_url: '', images: [] }))} 
                                />
                            </SectionCard>



                            <SectionCard title="Details" icon={<Car className="w-4 h-4" />}>
                                <div className="grid grid-cols-2 gap-4">
                                    <Field label="Brand"><input value={editCar.brand || ''} onChange={e => set('brand', e.target.value)} className={INPUT} /></Field>
                                    <Field label="Model"><input value={editCar.model || ''} onChange={e => set('model', e.target.value)} className={INPUT} /></Field>
                                    <Field label="Year"><input type="number" value={editCar.year || ''} onChange={e => set('year', +e.target.value)} className={INPUT} /></Field>
                                    <SelectField label="Category" value={editCar.category || 'LUXURY'} onChange={v => set('category', v)} options={[{label:'Luxury',value:'LUXURY'},{label:'Sports',value:'SPORTS'},{label:'SUV',value:'SUV'}]} />
                                </div>
                            </SectionCard>

                            <SectionCard title="Pricing" icon={<DollarSign className="w-4 h-4" />}>
                                <PriceInput
                                    label="Daily Rental Rate"
                                    type="car"
                                    value={editCar.daily_rate || ''}
                                    onChange={(v) => set('daily_rate', v)}
                                    required={true}
                                />
                            </SectionCard>
                        </div>
                        <div className="p-8 border-t border-[#1E1E1E] flex gap-4">
                            <button onClick={() => setShowForm(false)} className="px-6 py-3 rounded-xl border border-white/10 text-gray-400">Cancel</button>
                            <button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-[#D4AF37] text-black font-bold">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}
