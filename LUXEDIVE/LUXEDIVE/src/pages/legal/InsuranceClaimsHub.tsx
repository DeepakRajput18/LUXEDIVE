import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import {
    Shield,
    FileText,
    AlertTriangle,
    CheckCircle,
    Clock,
    ChevronRight,
    Download,
    Search,
    ArrowUpRight,
    Phone
} from 'lucide-react';

interface Claim {
    id: string;
    created_at: string; // Date
    incident_type: string;
    claim_id: string;
    status: 'under_review' | 'resolved' | 'rejected' | 'processing';
    vehicle_model: string;
    vehicle_image: string;
}

interface Policy {
    policy_number: string;
    provider: string;
    coverage_amount: string;
    deductible: string;
    valid_until: string;
    status: 'active' | 'expired';
    vehicle_model: string;
    vehicle_image: string;
    location: string;
}

const InsuranceClaimsHub: React.FC = () => {
    const navigate = useNavigate();
    const [activePolicy, setActivePolicy] = useState<Policy | null>(null);
    const [claims, setClaims] = useState<Claim[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            // Mock Data for Active Policy (since insurance_policies might be missing)
            // In production, fetch from: supabase.from('insurance_policies').select('*').eq('status', 'active').single();
            setActivePolicy({
                policy_number: 'POL-8842-AX',
                provider: 'Allianz Luxe',
                coverage_amount: '₹50,00,000',
                deductible: '₹50,000',
                valid_until: 'Oct 25, 2024',
                status: 'active',
                vehicle_model: 'Rolls Royce Ghost',
                vehicle_image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&q=80',
                location: 'Ahmedabad HQ'
            });

            // Fetch Claims from damage_disputes
            const { data: claimsData, error } = await supabase
                .from('damage_disputes')
                .select('*')
                .order('created_at', { ascending: false });

            if (claimsData) {
                // Map to display structure
                // Note: Real app would join with cars table for vehicle details
                const mappedClaims: Claim[] = claimsData.map(c => ({
                    id: c.id,
                    created_at: c.created_at,
                    incident_type: c.severity || 'General Damage',
                    claim_id: `CLM - ${c.id.slice(0, 6).toUpperCase()} `,
                    status: c.status === 'reported' ? 'under_review' : c.status,
                    vehicle_model: 'Rolls Royce Ghost', // Placeholder join
                    vehicle_image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&q=80'
                }));
                setClaims(mappedClaims);
            } else {
                // Mock claims if no data
                setClaims([
                    {
                        id: '1',
                        created_at: '2023-10-12T10:00:00Z',
                        incident_type: 'Minor Scratch',
                        claim_id: 'CLM-0921B',
                        status: 'under_review',
                        vehicle_model: 'Ferrari Roma',
                        vehicle_image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80'
                    },
                    {
                        id: '2',
                        created_at: '2023-08-05T14:30:00Z',
                        incident_type: 'Glass Chip',
                        claim_id: 'CLM-8821X',
                        status: 'resolved',
                        vehicle_model: 'BMW 7 Series',
                        vehicle_image: 'https://images.unsplash.com/photo-1555215695-3004980adade?auto=format&fit=crop&q=80'
                    }
                ]);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: Claim['status']) => {
        switch (status) {
            case 'resolved':
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20"><CheckCircle className="w-3 h-3" /> Resolved</span>;
            case 'rejected':
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20"><AlertTriangle className="w-3 h-3" /> Rejected</span>;
            case 'under_review':
            case 'processing':
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"><Clock className="w-3 h-3" /> Under Review</span>;
            default:
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-500 border border-gray-500/20">Unknown</span>;
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-900 selection:text-white pb-20">

            {/* Header */}
            <div className="bg-[#0F1218] border-b border-white/5 py-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <span className="cursor-pointer hover:text-white" onClick={() => navigate('/')}>Home</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="cursor-pointer hover:text-white" onClick={() => navigate('/dashboard')}>Dashboard</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Insurance & Claims Archive</span>
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-serif text-white mb-2">INSURANCE & CLAIMS HUB</h1>
                            <p className="text-gray-400 max-w-2xl">Manage your active protection plans, file new claims, and track the status of ongoing disputes in real-time.</p>
                        </div>
                        <button className="hidden md:flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-sm">
                            <Phone className="w-4 h-4" />
                            Contact Insurance Support
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">

                {/* Active Policy Card */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <Shield className="w-5 h-5 text-blue-500" />
                        <h2 className="text-lg font-medium tracking-wide">ACTIVE PROTECTION PLAN</h2>
                    </div>

                    {activePolicy ? (
                        <div className="bg-[#1A1F2E] rounded-xl border border-white/5 overflow-hidden grid grid-cols-1 lg:grid-cols-3">
                            {/* Image Section */}
                            <div className="relative h-64 lg:h-auto">
                                <img src={activePolicy.vehicle_image} alt={activePolicy.vehicle_model} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2E] via-transparent to-transparent lg:bg-gradient-to-r" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-green-500 text-black text-xs font-bold px-3 py-1 rounded shadow-lg flex items-center gap-1">
                                        <Shield className="w-3 h-3 fill-current" /> LIVE POLICY
                                    </span>
                                </div>
                                <div className="absolute bottom-4 left-4 lg:hidden">
                                    <h3 className="text-xl font-serif">{activePolicy.vehicle_model}</h3>
                                    <p className="text-sm text-gray-300">{activePolicy.location}</p>
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="lg:col-span-2 p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-8 hidden lg:flex">
                                        <div>
                                            <h3 className="text-2xl font-serif mb-1">{activePolicy.vehicle_model}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <MapPin className="w-4 h-4" />
                                                {activePolicy.location}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 uppercase">Valid Until</p>
                                            <p className="text-white font-mono">{activePolicy.valid_until}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6 border-t border-b border-white/5">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase mb-1">Coverage Amount</p>
                                            <p className="text-lg font-medium text-white">{activePolicy.coverage_amount}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase mb-1">Deductible</p>
                                            <p className="text-lg font-medium text-white">{activePolicy.deductible}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase mb-1">Policy Number</p>
                                            <p className="text-lg font-medium font-mono text-white">{activePolicy.policy_number}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase mb-1">Provider</p>
                                            <p className="text-lg font-medium text-white">{activePolicy.provider}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                    <button
                                        onClick={() => navigate('/support/report-issue')}
                                        className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]"
                                    >
                                        <AlertTriangle className="w-4 h-4" />
                                        Report New Incident
                                    </button>
                                    <button className="px-6 py-3 border border-white/20 text-white font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                                        <FileText className="w-4 h-4" />
                                        View Full Policy
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-12 text-center border border-white/10 rounded-xl bg-[#1A1F2E]">
                            <p className="text-gray-500">No active insurance policies found.</p>
                        </div>
                    )}
                </section>

                {/* Claims History */}
                <section>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <h2 className="text-lg font-medium tracking-wide">CLAIMS HISTORY</h2>
                        <div className="relative">
                            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search claims..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-[#1A1F2E] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 transition-colors w-full sm:w-64"
                            />
                        </div>
                    </div>

                    <div className="bg-[#1A1F2E] border border-white/5 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/5">
                                        <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Asset / Date</th>
                                        <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Claim ID</th>
                                        <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Incident Type</th>
                                        <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {claims.length > 0 ? (
                                        claims.map((claim) => (
                                            <tr key={claim.id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={claim.vehicle_image} alt={claim.vehicle_model} className="w-12 h-8 object-cover rounded" />
                                                        <div>
                                                            <p className="text-sm font-medium text-white">{claim.vehicle_model}</p>
                                                            <p className="text-xs text-gray-500">{new Date(claim.created_at).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="font-mono text-sm text-gray-300">{claim.claim_id}</span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-sm text-white">{claim.incident_type}</span>
                                                </td>
                                                <td className="p-4">
                                                    {getStatusBadge(claim.status)}
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white" title="Download Report">
                                                            <Download className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 hover:bg-white/10 rounded-lg text-blue-400 hover:text-blue-300 flex items-center gap-1 text-xs font-medium border border-transparent hover:border-blue-500/30">
                                                            Details <ArrowUpRight className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-gray-500">
                                                No claims found matching your criteria.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                            <span>Showing {claims.length} records</span>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 hover:bg-white/5 rounded disabled:opacity-50" disabled>Previous</button>
                                <button className="px-3 py-1 hover:bg-white/5 rounded disabled:opacity-50" disabled>Next</button>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

function MapPin({ className, ...props }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    )
}

export default InsuranceClaimsHub;
