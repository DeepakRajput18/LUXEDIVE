import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient'; // Mock client or real
import { useAuth } from '../../contexts/AuthContext';
import { FileUpload } from '../../components/ui/FileUpload';
import { toast } from 'sonner';
import {
    Shield,
    FileText,
    CheckCircle,
    Clock,
    AlertCircle,
    Eye,
    Trash2
} from 'lucide-react';

interface Document {
    id: string;
    type: 'license' | 'passport' | 'id_card' | 'insurance';
    name: string;
    url: string;
    status: 'verified' | 'pending' | 'rejected';
    uploaded_at: string;
    notes?: string;
}

const DocumentVault: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [documents, setDocuments] = useState<Document[]>([]);

    useEffect(() => {
        if (!user) return;
        const fetchDocs = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('user_documents')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('uploaded_at', { ascending: false });

                if (error) throw error;
                if (data) setDocuments(data as Document[]);
            } catch (err: any) {
                console.error("Error fetching docs", err);
                toast.error("Failed to load documents.");
            } finally {
                setLoading(false);
            }
        };
        fetchDocs();
    }, [user]);

    const handleUpload = async (url: string, originalName: string) => {
        try {
            const { data, error } = await supabase.from('user_documents').insert({
                user_id: user?.id,
                name: originalName,
                url: url,
                type: 'license',
                status: 'pending'
            }).select().single();

            if (error) throw error;

            setDocuments([data as Document, ...documents]);
            toast.success("Document uploaded successfully! Sent for verification.");
        } catch (err: any) {
            console.error(err);
            toast.error("Failed to save document record: " + err.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this document?')) {
            try {
                const { error } = await supabase.from('user_documents').delete().eq('id', id);
                if (error) throw error;

                setDocuments(documents.filter(d => d.id !== id));
                toast.success("Document removed.");
            } catch (err: any) {
                console.error(err);
                toast.error("Failed to delete document: " + err.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <header className="bg-[#12141a] border-b border-white/5 p-6">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                            <Shield className="w-6 h-6 text-[#D4AF37]" /> Document Vault
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Securely manage your identity documents and licenses.</p>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:text-[#C4A030] transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </header>

            <div className="max-w-4xl mx-auto p-6 space-y-8">

                {/* Status Overview */}
                <div className="bg-[#1A1D24] text-white p-6 rounded-xl shadow-lg flex items-center justify-between border border-white/5">
                    <div>
                        <h3 className="font-bold text-lg mb-1 text-white">Verification Status</h3>
                        {documents.some(d => d.status === 'verified') ? (
                            <p className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" /> Account Verified
                            </p>
                        ) : (
                            <p className="text-yellow-400 font-bold text-sm flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Pending Verification
                            </p>
                        )}
                    </div>
                    <div className="text-right text-xs text-gray-400">
                        <p>Access Level</p>
                        <p className="text-[#D4AF37] font-bold uppercase tracking-widest">
                            {documents.some(d => d.status === 'verified') ? 'Platinum Access' : 'Guest Access'}
                        </p>
                    </div>
                </div>

                {/* Upload Section */}
                <div className="bg-[#12141A] border border-white/5 rounded-xl p-8 text-center">
                    <h3 className="font-bold text-lg mb-4 text-white">Add New Document</h3>
                    <div className="max-w-md mx-auto">
                        <FileUpload
                            bucket="documents"
                            label="Upload Passport or License"
                            onUploadComplete={handleUpload}
                            userId={user?.id}
                        />
                        <p className="text-xs text-gray-400 mt-4">
                            Supported formats: JPG, PNG, PDF. Max size 5MB.<br />
                            Documents are encrypted and stored securely.
                        </p>
                    </div>
                </div>

                {/* Document List */}
                <div className="space-y-4">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400">Your Documents</h3>

                    {documents.length === 0 && (
                        <p className="text-center text-gray-500 py-10 bg-[#12141A] rounded-xl border border-white/5">No documents uploaded yet.</p>
                    )}

                    {documents.map((doc) => (
                        <div key={doc.id} className="bg-[#12141A] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-[#D4AF37]/30 hover:shadow-lg transition-all shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg ${doc.type === 'license' ? 'bg-blue-900/30 text-blue-400 border border-blue-900/50' :
                                    doc.type === 'passport' ? 'bg-purple-900/30 text-purple-400 border border-purple-900/50' :
                                        'bg-white/5 text-gray-300 border border-white/10'
                                    }`}>
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-white">{doc.name}</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs text-gray-400 uppercase tracking-wider">{doc.type.replace('_', ' ')}</span>
                                        <span className="text-xs text-gray-600">•</span>
                                        <span className="text-xs text-gray-500">{new Date(doc.uploaded_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                {/* Status Badge */}
                                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${doc.status === 'verified' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-900/50' :
                                    doc.status === 'pending' ? 'bg-amber-900/30 text-amber-400 border border-amber-900/50' :
                                        'bg-red-900/30 text-red-400 border border-red-900/50'
                                    }`}>
                                    {doc.status === 'verified' && <CheckCircle className="w-3 h-3" />}
                                    {doc.status === 'pending' && <Clock className="w-3 h-3" />}
                                    {doc.status === 'rejected' && <AlertCircle className="w-3 h-3" />}
                                    {doc.status}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-gray-500 hover:text-white transition-colors" title="View">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(doc.id)}
                                        className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                        title="Remove"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default DocumentVault;
