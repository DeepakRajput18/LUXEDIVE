import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Clock, CheckCircle } from 'lucide-react'

export default function ExtensionStatus() {
    const navigate = useNavigate()

    // Mock State
    const status = 'pending' as string

    return (
        <div className="min-h-screen flex items-center justify-center bg-luxe-black px-4">
            <Card className="max-w-md w-full">
                <CardContent className="p-8 text-center space-y-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-luxe-gold/10 flex items-center justify-center">
                        {status === 'pending' && <Clock className="w-10 h-10 text-luxe-gold animate-pulse" />}
                        {status === 'approved' && <CheckCircle className="w-10 h-10 text-emerald-400" />}
                    </div>

                    <div>
                        <h1 className="text-2xl font-serif text-luxe-white mb-2">Extension Request Sent</h1>
                        <p className="text-luxe-gray">We are checking fleet availability for your requested dates. You will receive a notification shortly.</p>
                    </div>

                    <div className="bg-luxe-gray/10 p-4 rounded text-left text-sm space-y-2">
                        <div className="flex justify-between">
                            <span className="text-luxe-gray">New Return Date</span>
                            <span className="text-luxe-white font-medium">Jan 30, 2026</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-luxe-gray">Est. Extra Charge</span>
                            <span className="text-luxe-white font-medium">₹25,000</span>
                        </div>
                    </div>

                    <Button className="w-full" onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
                </CardContent>
            </Card>
        </div>
    )
}
