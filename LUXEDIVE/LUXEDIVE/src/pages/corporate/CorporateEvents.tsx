
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, Car, CheckCircle, ShieldCheck } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Textarea } from '../../components/ui/Textarea'
import { Checkbox } from '../../components/ui/Checkbox'
import { Label } from '../../components/ui/Label'

export default function CorporateEvents() {
   const [submitted, setSubmitted] = useState(false)

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      setSubmitted(true)
   }

   if (submitted) {
      return (
         <div className="min-h-screen bg-luxe-black flex items-center justify-center p-4">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-luxe-dark border border-luxe-gold/20 p-12 rounded-2xl max-w-lg text-center"
            >
               <div className="w-20 h-20 bg-luxe-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-luxe-gold" />
               </div>
               <h2 className="text-3xl font-serif text-white mb-4">Request Received</h2>
               <p className="text-luxe-gray mb-8">
                  Your priority consultation request has been forwarded to our VIP Events Team. A dedicated account manager will contact you within 2 hours.
               </p>
               <Button onClick={() => setSubmitted(false)} variant="outline">Back to Home</Button>
            </motion.div>
         </div>
      )
   }

   return (
      <div className="min-h-screen bg-luxe-black pt-24 pb-20 px-4">
         <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
               <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">CORPORATE & EVENTS</h1>
               <p className="text-xl text-luxe-gray max-w-2xl mx-auto font-light leading-relaxed">
                  Bespoke mobility solutions for VIP delegations, grand arrivals, and high-profile corporate events in Ahmedabad.
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               {/* Form Section */}
               <div className="lg:col-span-2 bg-luxe-dark border border-white/5 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                  {/* Decorative gradient */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-luxe-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                  <h3 className="text-2xl font-serif text-white mb-8">Request Priority Consultation</h3>

                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <Label>Event Type</Label>
                           <Select className="bg-luxe-black border-white/10 text-white h-12">
                              <option>Corporate Delegation</option>
                              <option>Wedding Procession</option>
                              <option>VIP Airport Transfer</option>
                              <option>Brand Launch</option>
                              <option>Other</option>
                           </Select>
                        </div>
                        <div className="space-y-2">
                           <Label>Vehicle Quantity</Label>
                           <Input type="number" placeholder="Min. 2 vehicles" min={2} className="bg-luxe-black border-white/10 h-12" />
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <Label>Start Date</Label>
                           <div className="relative">
                              <Input type="date" className="pl-10 bg-luxe-black border-white/10 h-12 text-white" />
                              <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-luxe-gray" />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <Label>Duration (Days)</Label>
                           <Input type="number" placeholder="e.g. 3" min={1} className="bg-luxe-black border-white/10 h-12" />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label>Concierge Requirements</Label>
                        <Textarea
                           placeholder="Describe your specific needs (e.g., security detail, flower decorations, branded branding)..."
                           className="h-32 bg-luxe-black border-white/10 pt-3"
                        />
                     </div>

                     <div className="space-y-6 pt-6 border-t border-white/5">
                        <div className="flex items-center gap-2">
                           <Checkbox id="terms" />
                           <label htmlFor="terms" className="text-sm text-luxe-gray">I agree to the <span className="text-white underline cursor-pointer">Corporate Terms of Service</span></label>
                        </div>

                        <Button type="submit" className="w-full bg-luxe-gold text-black hover:bg-white transition-colors h-14 text-lg font-medium tracking-wide">
                           Request Priority Consultation
                        </Button>

                        <div className="flex items-center justify-center gap-2 text-xs text-luxe-gray/60">
                           <ShieldCheck className="w-3 h-3" />
                           <span>Enterprise-grade security & confidentiality guaranteed</span>
                        </div>
                     </div>
                  </form>
               </div>

               {/* Sidebar Info */}
               <div className="space-y-6">
                  <div className="bg-luxe-blue/10 border border-luxe-blue/20 p-8 rounded-2xl">
                     <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-luxe-blue/20 rounded-xl text-luxe-blue">
                           <Users className="w-6 h-6" />
                        </div>
                        <div>
                           <h4 className="text-white font-medium text-lg">Trusted by 500+ Enterprises</h4>
                           <div className="flex text-luxe-gold text-xs mt-1">★★★★★</div>
                        </div>
                     </div>
                     <p className="text-sm text-luxe-gray/80 leading-relaxed font-light">
                        From Fortune 500 delegations to royal weddings, LUXEDIVE handles complex logistics with precision.
                     </p>
                  </div>

                  <div className="bg-luxe-dark border border-white/5 p-8 rounded-2xl">
                     <h4 className="text-white font-medium mb-6 text-lg">Enterprise Benefits</h4>
                     <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-sm text-luxe-gray">
                           <CheckCircle className="w-5 h-5 text-luxe-gold shrink-0 mt-0.5" />
                           <span>Dedicated Account Manager available 24/7</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-luxe-gray">
                           <CheckCircle className="w-5 h-5 text-luxe-gold shrink-0 mt-0.5" />
                           <span>GST Compliant Invoicing & Reporting</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-luxe-gray">
                           <CheckCircle className="w-5 h-5 text-luxe-gold shrink-0 mt-0.5" />
                           <span>On-site Coordinator Support for fleets 10+</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-luxe-gray">
                           <CheckCircle className="w-5 h-5 text-luxe-gold shrink-0 mt-0.5" />
                           <span>Custom Vehicle Branding & Decor</span>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
