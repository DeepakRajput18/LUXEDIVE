import { useState } from 'react'
import { FileText, Plus, Edit3, Trash2, Eye, Globe, Search, Filter, Image as ImageIcon } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export default function ContentManager() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('blogs')

    // Mock Data
    const blogs = [
        { id: 1, title: 'The Art of Chauffeured Travel', author: 'Luxe Team', status: 'Published', date: 'Oct 24, 2024', views: 1240 },
        { id: 2, title: 'Top 5 Wedding Cars for 2025', author: 'Editorial', status: 'Draft', date: 'Oct 28, 2024', views: 0 },
        { id: 3, title: 'Experience the Lamborghini Urus', author: 'Fleet Mgmt', status: 'Published', date: 'Oct 15, 2024', views: 3500 },
    ]

    const faqs = [
        { id: 1, question: 'What is the security deposit policy?', category: 'Payments', status: 'Active' },
        { id: 2, question: 'Can I extend my rental mid-trip?', category: 'Bookings', status: 'Active' },
        { id: 3, question: 'Do you offer airport delivery?', category: 'Services', status: 'Review' },
    ]

    const policies = [
        { id: 1, name: 'Privacy Policy', version: 'v2.4', updated: '2 days ago', status: 'Live' },
        { id: 2, name: 'Terms of Service', version: 'v3.0', updated: '1 month ago', status: 'Live' },
        { id: 3, name: 'Rental Agreement', version: 'v2.1', updated: '1 week ago', status: 'Draft' },
    ]

    const handleDelete = (id: number) => {
        toast.success("Item deleted successfully")
    }

    return (
        <div className="space-y-8 text-white h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-serif text-white">Content Manager</h1>
                    <p className="text-luxe-gray mt-2">Manage website content, blog posts, FAQs, and legal policies.</p>
                </div>
                <Button className="bg-luxe-gold text-black hover:bg-luxe-gold/90 h-10 px-6">
                    <Plus className="w-4 h-4 mr-2" /> Create New
                </Button>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center gap-4 py-2">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxe-gray" />
                    <input
                        type="text"
                        placeholder="Search content..."
                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-luxe-gold/50"
                    />
                </div>
                <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                    <button
                        onClick={() => setActiveTab('blogs')}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'blogs' ? 'bg-luxe-gold text-black shadow-lg' : 'text-luxe-gray hover:text-white'}`}
                    >
                        Journal
                    </button>
                    <button
                        onClick={() => setActiveTab('faqs')}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'faqs' ? 'bg-luxe-gold text-black shadow-lg' : 'text-luxe-gray hover:text-white'}`}
                    >
                        FAQs
                    </button>
                    <button
                        onClick={() => setActiveTab('policies')}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'policies' ? 'bg-luxe-gold text-black shadow-lg' : 'text-luxe-gray hover:text-white'}`}
                    >
                        Policies
                    </button>
                </div>
            </div>

            {/* Content Table */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden flex-1">
                <table className="w-full text-left text-sm">
                    <thead className="bg-black/40 text-luxe-gray font-bold uppercase text-xs tracking-wider border-b border-white/10">
                        <tr>
                            <th className="px-6 py-4">{activeTab === 'blogs' ? 'Title' : activeTab === 'faqs' ? 'Question' : 'Document Name'}</th>
                            {activeTab === 'blogs' && <th className="px-6 py-4">Author</th>}
                            {activeTab === 'faqs' && <th className="px-6 py-4">Category</th>}
                            {activeTab === 'policies' && <th className="px-6 py-4">Version</th>}
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {activeTab === 'blogs' && blogs.map((item) => (
                            <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center">
                                        <ImageIcon className="w-4 h-4 text-gray-500" />
                                    </div>
                                    {item.title}
                                </td>
                                <td className="px-6 py-4 text-gray-400">{item.author}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${item.status === 'Published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white"><Eye className="w-4 h-4" /></Button>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-400 hover:bg-blue-400/10"><Edit3 className="w-4 h-4" /></Button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {activeTab === 'faqs' && faqs.map((item) => (
                            <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-4 font-medium text-white">{item.question}</td>
                                <td className="px-6 py-4 text-gray-400">{item.category}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-400 hover:bg-blue-400/10"><Edit3 className="w-4 h-4" /></Button>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:bg-red-400/10"><Trash2 className="w-4 h-4" /></Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {activeTab === 'policies' && policies.map((item) => (
                            <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                    <FileText className="w-4 h-4 text-luxe-gold" />
                                    {item.name}
                                </td>
                                <td className="px-6 py-4 text-gray-400">{item.version}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${item.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white"><Globe className="w-4 h-4" /></Button>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-400 hover:bg-blue-400/10"><Edit3 className="w-4 h-4" /></Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination / Footer */}
            <div className="flex justify-between items-center text-xs text-luxe-gray px-2">
                <span>Showing 3 of 3 items</span>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled className="h-7 text-xs border-white/10 opacity-50">Previous</Button>
                    <Button variant="outline" size="sm" disabled className="h-7 text-xs border-white/10 opacity-50">Next</Button>
                </div>
            </div>
        </div>
    )
}
