import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Tabs } from '../../components/ui/Tabs'
import { PlayCircle, BookOpen, AlertCircle } from 'lucide-react'

// Mock Data - In real app, fetch from Supabase Storage or YouTube/Vimeo
const MANUALS = {
    'start': { title: 'How to Start', video: 'https://example.com/start.mp4', desc: 'Keyless entry and ignition sequence.' },
    'roof': { title: 'Convertible Roof', video: 'https://example.com/roof.mp4', desc: 'Operating the soft top safely.' },
    'media': { title: 'Infotainment', video: 'https://example.com/media.mp4', desc: 'Connecting Bluetooth and Apple CarPlay.' },
    'fuel': { title: 'Refueling', video: 'https://example.com/fuel.mp4', desc: 'Opening fuel cap and correct fuel type.' },
}

export default function QuickStartManual() {
    const { bookingId } = useParams()
    const [activeTab, setActiveTab] = useState('start')

    const currentManual = MANUALS[activeTab as keyof typeof MANUALS]

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-serif text-luxe-white mb-2">Vehicle Guide</h1>
                <p className="text-luxe-gray">Master your machine with these quick video tutorials.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card className="bg-black border-luxe-gold/20 overflow-hidden">
                        <div className="aspect-video bg-luxe-dark relative flex items-center justify-center group cursor-pointer">
                            {/* Placeholder for Video Player */}
                            <PlayCircle className="w-16 h-16 text-luxe-gold opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white font-medium">{currentManual.title}</p>
                            </div>
                        </div>
                        <CardContent className="p-6">
                            <h3 className="font-serif text-xl text-luxe-white mb-2">{currentManual.title}</h3>
                            <p className="text-luxe-gray text-sm">{currentManual.desc}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    <h3 className="font-medium text-luxe-white uppercase text-xs tracking-wider">Chapters</h3>
                    <div className="space-y-2">
                        {Object.entries(MANUALS).map(([key, data]) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`w-full text-left p-4 rounded-lg border transition-all flex items-center gap-3 ${activeTab === key ? 'bg-luxe-gold/10 border-luxe-gold text-luxe-white' : 'bg-luxe-dark border-luxe-gray/10 text-luxe-gray hover:bg-luxe-gray/5'}`}
                            >
                                <PlayCircle className={`w-5 h-5 ${activeTab === key ? 'text-luxe-gold' : 'text-luxe-gray'}`} />
                                <span className="font-medium">{data.title}</span>
                            </button>
                        ))}
                    </div>

                    <div className="p-4 bg-luxe-gray/10 rounded-lg mt-8">
                        <div className="flex items-start gap-3">
                            <BookOpen className="w-5 h-5 text-luxe-gold" />
                            <div>
                                <p className="text-luxe-white font-medium text-sm">Owner's PDF</p>
                                <p className="text-luxe-gray text-xs mb-2">Full technical manual (24MB)</p>
                                <Button variant="ghost" size="sm" className="p-0 h-auto text-luxe-gold">Download</Button>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-lg">
                        <div className="flex items-center gap-2 text-red-400 mb-1">
                            <AlertCircle className="w-4 h-4" />
                            <span className="font-bold text-xs uppercase">Emergency</span>
                        </div>
                        <p className="text-luxe-gray text-xs mb-3">Breakdown or accident?</p>
                        <Button variant="destructive" size="sm" className="w-full">Call Roadside Assist</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
