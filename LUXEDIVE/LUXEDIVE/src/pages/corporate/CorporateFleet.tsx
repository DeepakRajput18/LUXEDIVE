import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import { Building, TrendingUp, Users, Shield } from 'lucide-react'

export default function CorporateFleet() {
  return (
    <div className="pb-20">
       {/* HERO */}
       <div className="bg-luxe-dark border-b border-luxe-gray/10 py-20">
           <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-serif text-luxe-white">
                        Drive Your Business Forward
                    </h1>
                    <p className="text-xl text-luxe-gray">
                        Premium mobility solutions for executives and teams. 
                        GST Compliant billing, flexible leases, and dedicated account management.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/corporate/inquiry">
                            <Button size="lg" className="px-8">Get Corporate Rates</Button>
                        </Link>
                        <Link to="/corporate/employees">
                             <Button size="lg" variant="outline">Employee Login</Button>
                        </Link>
                    </div>
               </div>
               <div className="relative h-80 bg-luxe-black rounded-xl overflow-hidden border border-luxe-gold/20">
                   <img 
                     src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop" 
                     className="absolute inset-0 w-full h-full object-cover opacity-80"
                   />
               </div>
           </div>
       </div>

       {/* BENEFITS */}
       <div className="container mx-auto px-4 py-20">
           <h2 className="text-3xl font-serif text-luxe-white text-center mb-12">The Corporate Advantage</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <Card className="bg-luxe-dark/50 border-luxe-gray/5 hover:border-luxe-gold/30 transition-colors">
                   <CardContent className="p-6">
                       <Building className="w-10 h-10 text-luxe-gold mb-4" />
                       <h3 className="text-lg font-medium text-luxe-white mb-2">GST Benefits</h3>
                       <p className="text-luxe-gray text-sm">Save up to 18% with input tax credit on all rentals and leases.</p>
                   </CardContent>
               </Card>
               <Card className="bg-luxe-dark/50 border-luxe-gray/5 hover:border-luxe-gold/30 transition-colors">
                   <CardContent className="p-6">
                       <TrendingUp className="w-10 h-10 text-luxe-gold mb-4" />
                       <h3 className="text-lg font-medium text-luxe-white mb-2">OpEx Model</h3>
                       <p className="text-luxe-gray text-sm">Zero dominance on balance sheet. Pay as you use without depreciation worries.</p>
                   </CardContent>
               </Card>
               <Card className="bg-luxe-dark/50 border-luxe-gray/5 hover:border-luxe-gold/30 transition-colors">
                   <CardContent className="p-6">
                       <Users className="w-10 h-10 text-luxe-gold mb-4" />
                       <h3 className="text-lg font-medium text-luxe-white mb-2">Scalable Fleet</h3>
                       <p className="text-luxe-gray text-sm">From 1 car to 100. Scale your fleet based on project needs.</p>
                   </CardContent>
               </Card>
               <Card className="bg-luxe-dark/50 border-luxe-gray/5 hover:border-luxe-gold/30 transition-colors">
                   <CardContent className="p-6">
                       <Shield className="w-10 h-10 text-luxe-gold mb-4" />
                       <h3 className="text-lg font-medium text-luxe-white mb-2">Priority Support</h3>
                       <p className="text-luxe-gray text-sm">24/7 dedicated relationship manager for instant resolution.</p>
                   </CardContent>
               </Card>
           </div>
       </div>
    </div>
  )
}
