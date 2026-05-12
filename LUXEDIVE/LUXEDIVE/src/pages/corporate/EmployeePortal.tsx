import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardContent } from '../../components/ui/Card'
import { Building } from 'lucide-react'

export default function EmployeePortal() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-luxe-dark border-luxe-gray/20">
            <CardContent className="p-8 space-y-6">
                <div className="text-center">
                    <div className="w-16 h-16 bg-luxe-gold/10 text-luxe-gold rounded-full flex items-center justify-center mx-auto mb-4">
                        <Building className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-serif text-luxe-white mb-2">Employee Portal</h1>
                    <p className="text-luxe-gray text-sm">Access your company's exclusive rates and bookings.</p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-luxe-gray">Corporate Email</label>
                        <Input type="email" placeholder="name@company.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-luxe-gray">Passcode / SSO</label>
                        <Input type="password" />
                    </div>
                    
                    <Button className="w-full h-12">SSO Login</Button>
                    
                    <p className="text-xs text-center text-luxe-gray">
                        Not registered? Contact your HR or Admin.
                    </p>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}
