import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import {
    ArrowLeft,
    MapPin,
    Calendar,
    AlertTriangle,
    Camera,
    Upload,
    X,
    CheckCircle,
    Phone,
    Info
} from 'lucide-react';

interface VehiclePart {
    id: string;
    name: string;
    label: string;
}

interface DamageReport {
    parts: string[];
    severity: 'minor' | 'moderate' | 'major';
    description: string;
    incidentTime: string;
    files: File[];
}

const IncidentSupport: React.FC = () => {
    const navigate = useNavigate();
    const { rentalId } = useParams<{ rentalId: string }>();
    const [activeTab, setActiveTab] = useState<'front' | 'driver' | 'passenger' | 'rear'>('front');
    const [selectedParts, setSelectedParts] = useState<string[]>([]);
    const [severity, setSeverity] = useState<'minor' | 'moderate' | 'major'>('minor');
    const [description, setDescription] = useState('');
    const [incidentTime, setIncidentTime] = useState(new Date().toISOString().slice(0, 16));
    const [files, setFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Mock vehicle parts for the diagram
    const vehicleParts: Record<string, VehiclePart[]> = {
        front: [
            { id: 'front_bumper', name: 'front_bumper', label: 'Front Bumper' },
            { id: 'hood', name: 'hood', label: 'Hood' },
            { id: 'headlights', name: 'headlights', label: 'Headlights' },
            { id: 'windshield', name: 'windshield', label: 'Windshield' },
        ],
        driver: [
            { id: 'driver_door', name: 'driver_door', label: 'Driver Door' },
            { id: 'driver_window', name: 'driver_window', label: 'Driver Window' },
            { id: 'driver_fender', name: 'driver_fender', label: 'Front Fender' },
            { id: 'rear_door_driver', name: 'rear_door_driver', label: 'Rear Door' },
        ],
        passenger: [
            { id: 'passenger_door', name: 'passenger_door', label: 'Passenger Door' },
            { id: 'passenger_window', name: 'passenger_window', label: 'Passenger Window' },
            { id: 'passenger_fender', name: 'passenger_fender', label: 'Front Fender' },
            { id: 'rear_door_pass', name: 'rear_door_pass', label: 'Rear Door' },
        ],
        rear: [
            { id: 'rear_bumper', name: 'rear_bumper', label: 'Rear Bumper' },
            { id: 'trunk', name: 'trunk', label: 'Trunk / Boot' },
            { id: 'taillights', name: 'taillights', label: 'Taillights' },
            { id: 'rear_windshield', name: 'rear_windshield', label: 'Rear Glass' },
        ],
    };

    const togglePart = (partId: string) => {
        setSelectedParts(prev =>
            prev.includes(partId)
                ? prev.filter(p => p !== partId)
                : [...prev, partId]
        );
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            if (files.length + newFiles.length > 5) {
                alert('Maximum 5 files allowed');
                return;
            }
            setFiles([...files, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (selectedParts.length === 0) {
            alert('Please select at least one damaged area.');
            return;
        }
        if (!description) {
            alert('Please provide a description of the incident.');
            return;
        }

        setIsSubmitting(true);
        setUploadProgress(10);

        try {
            // 1. Upload images to 'damage-dispute-evidence' bucket
            const uploadedUrls: string[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileExt = file.name.split('.').pop();
                const fileName = `${rentalId}_${Date.now()}_${i}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('damage-dispute-evidence')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('damage-dispute-evidence')
                    .getPublicUrl(filePath);

                uploadedUrls.push(publicUrl);
                setUploadProgress(10 + ((i + 1) / files.length) * 40);
            }

            // 2. Create damage dispute record
            const { data: { user } } = await supabase.auth.getUser();

            const { error: insertError } = await supabase
                .from('damage_disputes')
                .insert({
                    booking_id: rentalId || 'unknown', // Ideally fetched from context or URL
                    user_id: user?.id,
                    status: 'reported',
                    severity: severity,
                    description: description,
                    damage_locations: selectedParts, // Requires JSON column update as per PRD
                    evidence_urls: uploadedUrls,
                    incident_time: incidentTime,
                    reported_at: new Date().toISOString()
                });

            if (insertError) throw insertError;

            setUploadProgress(100);
            // Navigate to success or active rental page
            alert('Incident report submitted successfully.');
            navigate('/dashboard/rentals'); // Or Page 72 (Insurance Hub)

        } catch (error) {
            console.error('Error submitting report:', error);
            alert('Failed to submit report. Please try again.');
        } finally {
            setIsSubmitting(false);
            setUploadProgress(0);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-red-900 selection:text-white pb-20">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-400" />
                        </button>
                        <div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span>Active Rentals</span>
                                <span>/</span>
                                <span>Rolls Royce Ghost</span>
                                <span>/</span>
                                <span className="text-white">Report Issue</span>
                            </div>
                            <h1 className="text-xl font-serif text-white tracking-wide mt-1">INCIDENT REPORT</h1>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Rental ID</p>
                        <p className="font-mono text-blue-400">#{rentalId || 'RUN-4920'}</p>
                    </div>
                </div>
            </header>

            <main className="pt-28 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Panel: Vehicle Diagram */}
                <div className="lg:col-span-7 bg-[#1A1F2E] rounded-xl border border-white/5 overflow-hidden flex flex-col h-[calc(100vh-140px)] sticky top-28">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <h2 className="text-lg font-medium">Damage Locator</h2>
                        <div className="flex gap-2 bg-black/40 p-1 rounded-lg">
                            {(['front', 'driver', 'passenger', 'rear'] as const).map((view) => (
                                <button
                                    key={view}
                                    onClick={() => setActiveTab(view)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === view
                                        ? 'bg-white/10 text-white shadow-sm'
                                        : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    {view.charAt(0).toUpperCase() + view.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 relative bg-[#0F1218] flex items-center justify-center p-8">
                        <div className="relative w-full max-w-lg aspect-[16/9] border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center">
                            {/* Simulated Car Diagram Layer */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-gray-700 font-bold text-6xl opacity-20 uppercase">{activeTab} VIEW</span>
                            </div>

                            {/* Interactive Zones */}
                            <div className="grid grid-cols-2 gap-4 w-3/4 relative z-10">
                                {vehicleParts[activeTab].map((part) => (
                                    <button
                                        key={part.id}
                                        onClick={() => togglePart(part.id)}
                                        className={`
                      relative p-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center group
                      ${selectedParts.includes(part.id)
                                                ? 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                                                : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/10'
                                            }
                    `}
                                    >
                                        <span className="font-medium text-sm">{part.label}</span>
                                        {selectedParts.includes(part.id) && (
                                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-0 right-0 text-center">
                            <p className="text-sm text-gray-500">Tap parts to mark damage points</p>
                        </div>
                    </div>

                    <div className="p-4 bg-white/5 border-t border-white/5">
                        <div className="flex justify-between items-center text-xs text-gray-400 uppercase tracking-wider">
                            <span>Rolls Royce Ghost 2024</span>
                            <span>GJ-01-WB-9999</span>
                            <span>Obsidian Black</span>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Incident Form */}
                <div className="lg:col-span-5 flex flex-col gap-6">

                    {/* Form Context */}
                    <div className="bg-[#1A1F2E] p-6 rounded-xl border border-white/5">
                        <h3 className="text-white font-medium mb-6 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            Incident Details
                        </h3>

                        <div className="space-y-6">
                            {/* Time */}
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Time of Incident</label>
                                <div className="relative">
                                    <input
                                        type="datetime-local"
                                        value={incidentTime}
                                        onChange={(e) => setIncidentTime(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors [&::-webkit-calendar-picker-indicator]:invert"
                                    />
                                </div>
                            </div>

                            {/* Severity */}
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Severity Assessment</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { level: 'minor', label: 'Minor', color: 'green' },
                                        { level: 'moderate', label: 'Moderate', color: 'yellow' },
                                        { level: 'major', label: 'Major', color: 'red' }
                                    ].map((lvl) => (
                                        <button
                                            key={lvl.level}
                                            onClick={() => setSeverity(lvl.level as any)}
                                            className={`
                        py-3 px-2 rounded-lg border text-sm font-medium transition-all flex flex-col items-center gap-1
                        ${severity === lvl.level
                                                    ? `bg-${lvl.color}-500/10 border-${lvl.color}-500 text-${lvl.color}-500`
                                                    : 'bg-black/20 border-white/10 text-gray-500 hover:bg-white/5'
                                                }
                      `}
                                        >
                                            {lvl.level === 'minor' && <CheckCircle className="w-4 h-4" />}
                                            {lvl.level === 'moderate' && <AlertTriangle className="w-4 h-4" />}
                                            {lvl.level === 'major' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                                            {lvl.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Description of Event</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Please describe how the damage occurred..."
                                    className="w-full h-32 bg-black/40 border border-white/10 rounded-lg p-4 text-sm text-white focus:outline-none focus:border-red-500 transition-colors resize-none placeholder:text-gray-600"
                                />
                            </div>

                            {/* Photos */}
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 flex justify-between">
                                    <span>Evidence Photos</span>
                                    <span className="text-xs text-gray-600">{files.length}/5 files</span>
                                </label>

                                <div className="grid grid-cols-4 gap-2">
                                    {files.map((file, idx) => (
                                        <div key={idx} className="relative group aspect-square bg-gray-800 rounded-lg overflow-hidden border border-white/10">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt="preview"
                                                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                                            />
                                            <button
                                                onClick={() => removeFile(idx)}
                                                className="absolute top-1 right-1 bg-black/80 p-1 rounded-full text-white hover:bg-red-500 transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}

                                    {files.length < 5 && (
                                        <label className="aspect-square border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-white/30 hover:bg-white/5 transition-all text-gray-500 hover:text-white group">
                                            <Camera className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                            <span className="text-[10px] uppercase font-medium">Add Photo</span>
                                            <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="pt-4">
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className={`w-full py-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(220,38,60,0.3)] hover:shadow-[0_0_30px_rgba(220,38,60,0.5)] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? (
                                        'Submitting Report...'
                                    ) : (
                                        <>
                                            <AlertTriangle className="w-5 h-5 fill-current" />
                                            SUBMIT DAMAGE REPORT
                                        </>
                                    )}
                                </button>
                                <div className="mt-4 flex items-start gap-2 p-3 bg-red-900/10 border border-red-500/20 rounded-lg">
                                    <Info className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                    <p className="text-xs text-red-200/60 leading-relaxed">
                                        By submitting this report, you declare that the information provided is accurate.
                                        False reporting may result in immediate membership suspension and legal action.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="bg-[#1A1F2E] p-5 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-white">Emergency Assistance</p>
                            <p className="text-xs text-gray-500">24/7 Priority Support Line</p>
                        </div>
                        <button className="px-4 py-2 bg-white text-black font-medium rounded-lg text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors">
                            <Phone className="w-4 h-4" />
                            Call Now
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default IncidentSupport;
