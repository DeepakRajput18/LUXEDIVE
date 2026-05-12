import { useEffect, useState } from 'react'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { MapPin, Navigation, Phone, ShieldAlert } from 'lucide-react'

export default function ActiveRental() {
  // Mock active rental state
  const [location, setLocation] = useState({ lat: 23.0225, lng: 72.5714 }) // Ahmedabad Coords

  // Simulate movement
  useEffect(() => {
    const interval = setInterval(() => {
        setLocation(prev => ({
            lat: prev.lat + (Math.random() - 0.5) * 0.001,
            lng: prev.lng + (Math.random() - 0.5) * 0.001
        }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
       <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif text-luxe-white">Live Tracking</h1>
          <div className="flex gap-2">
             <Button variant="destructive" size="sm">
                <ShieldAlert className="w-4 h-4 mr-2" /> SOS / Support
             </Button>
          </div>
       </div>

       <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* MAP CONTAINER */}
          <div className="lg:col-span-2 bg-luxe-gray/20 rounded-xl overflow-hidden relative">
              {/* This would be Google Maps / Mapbox */}
              <div className="absolute inset-0 flex items-center justify-center bg-luxe-dark/80">
                  <div className="text-center">
                       <MapPin className="w-12 h-12 text-luxe-gold mx-auto mb-4 animate-bounce" />
                       <p className="text-luxe-white font-medium">Map Simulation Active</p>
                       <p className="text-xs text-luxe-gray mt-1">Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}</p>
                  </div>
              </div>
          </div>

          {/* CONTROL PANEL */}
          <Card className="h-full">
              <CardContent className="p-6 space-y-6">
                  <div>
                      <h3 className="text-lg font-medium text-luxe-white mb-1">Lamborghini Huracán</h3>
                      <p className="text-luxe-gold font-mono">GJ-01-LUXE-007</p>
                  </div>

                  <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-luxe-gray/5 rounded border border-luxe-gray/10">
                          <span className="text-luxe-gray text-sm">Status</span>
                          <span className="text-emerald-400 font-medium text-sm flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              Moving
                          </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-luxe-gray/5 rounded border border-luxe-gray/10">
                          <span className="text-luxe-gray text-sm">Fuel Level</span>
                          <span className="text-luxe-white font-medium text-sm">85%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-luxe-gray/5 rounded border border-luxe-gray/10">
                          <span className="text-luxe-gray text-sm">Distance Remaining</span>
                          <span className="text-luxe-white font-medium text-sm">120 km (Limit)</span>
                      </div>
                  </div>

                  <div className="pt-6 border-t border-luxe-gray/10 space-y-3">
                      <Button className="w-full" variant="outline">
                          <Navigation className="w-4 h-4 mr-2" /> Navigate to Car
                      </Button>
                      <Button className="w-full" variant="outline">
                          <Phone className="w-4 h-4 mr-2" /> Call Driver
                      </Button>
                  </div>
              </CardContent>
          </Card>
       </div>
    </div>
  )
}
