import { useEffect, useState } from 'react'
import { carService, type Car } from '../../services/carService'
import { adminService } from '../../services/adminService'
import { Button } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import { Loader2, Plus } from 'lucide-react'
import { Skeleton } from '../../components/ui/Skeleton'
import { ToggleSwitch } from '../../components/ui/ToggleSwitch'
import { toast } from 'sonner'

export default function FleetManager() {
    const [cars, setCars] = useState<Car[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        carService.getFleet().then((data) => { // Using generic get
            setCars(data || [])
            setLoading(false)
        })
    }, [])

    const handleToggle = async (id: string, currentStatus: boolean | null | undefined) => {
        try {
            // If status is undefined, treat as false
            const newStatus = !(currentStatus || false);
            await adminService.updateCarStatus(id, newStatus)
            setCars(prev => prev.map(c => c.id === id ? { ...c, is_available: newStatus } : c))
            toast.success("Updated Successfully")
        } catch (e) {
            toast.error("Update Failed")
        }
    }

    if (loading) return <Skeleton className="h-96" />

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif text-luxe-white">Fleet Manager</h1>
                <Button><Plus className="w-4 h-4 mr-2" /> Add Vehicle</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map(car => (
                    <Card key={car.id} className="bg-luxe-dark border-luxe-gray/10 overflow-hidden">
                        <img src={Array.isArray(car.images) ? car.images[0] : ''} className="h-48 w-full object-cover" />
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-luxe-white font-medium">{car.brand} {car.model}</h3>
                                    <p className="text-luxe-gray text-xs">{car.license_plate}</p>
                                </div>
                                <ToggleSwitch
                                    checked={!!car.is_available}
                                    onChange={() => handleToggle(car.id, car.is_available)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs text-luxe-gray">
                                <div className="p-2 bg-luxe-black rounded">
                                    Status: {car.is_available ? <span className="text-emerald-400">Active</span> : <span className="text-red-400">Maintenance</span>}
                                </div>
                                <div className="p-2 bg-luxe-black rounded">
                                    Rate: ₹{car.daily_rate}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
