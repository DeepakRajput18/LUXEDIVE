import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Star, ShieldCheck, Trash2, CheckCircle, Plus, X } from 'lucide-react'
import { toast } from 'sonner'

interface Review {
    id: string
    user_name: string
    car_name?: string
    rating: number
    comment: string
    is_approved: boolean
    is_featured: boolean
    created_at: string
}

export default function AdminReviews() {
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState(true)
    const [showAddForm, setShowAddForm] = useState(false)
    const [newReview, setNewReview] = useState({
        user_name: '', car_name: '', rating: 5, comment: '',
    })

    const fetchReviews = async () => {
        setLoading(true)
        const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false })
        setReviews(data ?? [])
        setLoading(false)
    }

    useEffect(() => { fetchReviews() }, [])

    const approve = async (id: string, val: boolean) => {
        await supabase.from('reviews').update({ is_approved: val }).eq('id', id)
        setReviews(r => r.map(x => x.id === id ? { ...x, is_approved: val } : x))
        toast.success(val ? 'Review approved' : 'Review hidden')
    }

    const feature = async (id: string, val: boolean) => {
        await supabase.from('reviews').update({ is_featured: val }).eq('id', id)
        setReviews(r => r.map(x => x.id === id ? { ...x, is_featured: val } : x))
        toast.success(val ? 'Marked as featured' : 'Unfeatured')
    }

    const remove = async (id: string) => {
        if (!confirm('Delete this review?')) return
        await supabase.from('reviews').delete().eq('id', id)
        setReviews(r => r.filter(x => x.id !== id))
        toast.success('Deleted')
    }

    const addManual = async () => {
        if (!newReview.user_name || !newReview.comment) {
            toast.error('Name and comment required'); return
        }
        const { error } = await supabase.from('reviews').insert({
            ...newReview,
            is_approved: true,
            is_featured: false,
        })
        if (error) { toast.error('Failed to add review'); return }
        toast.success('Review added')
        setShowAddForm(false)
        setNewReview({ user_name: '', car_name: '', rating: 5, comment: '' })
        fetchReviews()
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-semibold text-white">Reviews</h1>
                    <p className="text-gray-600 text-sm mt-0.5">Manage and feature client testimonials</p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-luxe-gold text-black text-sm font-medium rounded-lg hover:bg-yellow-400 transition"
                >
                    <Plus className="w-4 h-4" /> Add Testimonial
                </button>
            </div>

            {showAddForm && (
                <div className="bg-white/3 border border-white/8 rounded-xl p-5 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white text-sm font-medium">Add Manual Testimonial</h3>
                        <button onClick={() => setShowAddForm(false)}><X className="w-4 h-4 text-gray-500" /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input placeholder="Client Name *" value={newReview.user_name}
                            onChange={e => setNewReview(p => ({ ...p, user_name: e.target.value }))}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-luxe-gold/40" />
                        <input placeholder="Car Name" value={newReview.car_name}
                            onChange={e => setNewReview(p => ({ ...p, car_name: e.target.value }))}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-luxe-gold/40" />
                        <select value={newReview.rating}
                            onChange={e => setNewReview(p => ({ ...p, rating: +e.target.value }))}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none">
                            {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                        </select>
                    </div>
                    <textarea placeholder="Review text *" value={newReview.comment}
                        onChange={e => setNewReview(p => ({ ...p, comment: e.target.value }))}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-luxe-gold/40 mb-4 resize-none" />
                    <button onClick={addManual}
                        className="px-4 py-2 bg-luxe-gold text-black text-sm font-medium rounded-lg hover:bg-yellow-400 transition">
                        Save Review
                    </button>
                </div>
            )}

            {loading ? (
                <p className="text-gray-600 text-sm">Loading reviews…</p>
            ) : reviews.length === 0 ? (
                <div className="text-center py-16 text-gray-700">
                    <Star className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No reviews yet. Add one manually or wait for user submissions.</p>
                </div>
            ) : (
                <div className="grid gap-3">
                    {reviews.map(r => (
                        <div key={r.id} className="bg-white/3 border border-white/8 rounded-xl p-4 flex flex-col md:flex-row md:items-start gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-white text-sm font-semibold">{r.user_name}</span>
                                    {r.car_name && <span className="text-luxe-gold text-xs">{r.car_name}</span>}
                                    <div className="flex gap-0.5 ml-auto">
                                        {Array(r.rating).fill(0).map((_, i) => <Star key={i} className="w-3 h-3 fill-luxe-gold text-luxe-gold" />)}
                                    </div>
                                </div>
                                <p className="text-gray-400 text-xs leading-relaxed italic">"{r.comment}"</p>
                                <p className="text-gray-700 text-[10px] mt-1">{new Date(r.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                {r.is_featured && <span className="text-[10px] text-luxe-gold border border-luxe-gold/30 px-2 py-0.5 rounded-full">Featured</span>}
                                {r.is_approved
                                    ? <span className="text-[10px] text-green-400 border border-green-400/30 px-2 py-0.5 rounded-full">Approved</span>
                                    : <span className="text-[10px] text-yellow-400 border border-yellow-400/30 px-2 py-0.5 rounded-full">Pending</span>
                                }
                                <button onClick={() => approve(r.id, !r.is_approved)} title="Toggle approval"
                                    className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-green-400 transition">
                                    <CheckCircle className="w-4 h-4" />
                                </button>
                                <button onClick={() => feature(r.id, !r.is_featured)} title="Toggle featured"
                                    className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-luxe-gold transition">
                                    <Star className="w-4 h-4" />
                                </button>
                                <button onClick={() => remove(r.id)} title="Delete"
                                    className="p-1.5 rounded-lg hover:bg-red-900/20 text-gray-500 hover:text-red-400 transition">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
