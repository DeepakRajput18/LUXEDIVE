import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
import { MapPin, Phone, Mail, Clock, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { toast } from 'sonner'

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
            toast.error("Please fill in all fields")
            return
        }

        setIsSubmitting(true)
        try {
            const { error } = await supabase
                .from('contact_submissions')
                .insert([{
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    message: formData.message
                }])

            if (error) throw error

            toast.success("Message sent successfully! Our concierge will contact you soon.")
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                message: ''
            })
        } catch (error: any) {
            console.error('Error submitting inquiry:', error)
            toast.error("Failed to send message. Please try again later.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-luxe-black min-h-screen">
            <div className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif text-luxe-white mb-4">Get in Touch</h1>
                    <p className="text-luxe-gray text-lg max-w-2xl mx-auto">
                        Whether you need a bespoke wedding package or 24/7 roadside assistance, our concierge team is at your service.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <Card className="bg-luxe-dark/50">
                            <CardContent className="p-8 space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-luxe-gold/10 rounded-lg text-luxe-gold">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium text-luxe-white mb-1">HQ Experience Center</h3>
                                        <p className="text-luxe-gray">
                                            Privilon, Ambli-Bopal Road,<br /> Iscon Crossroads, Ahmedabad, Gujarat 380054
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-luxe-gold/10 rounded-lg text-luxe-gold">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium text-luxe-white mb-1">24/7 Concierge</h3>
                                        <p className="text-luxe-gray">+91 999 888 7777</p>
                                        <p className="text-luxe-gray text-sm mt-1">Whatapp Available</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-luxe-gold/10 rounded-lg text-luxe-gold">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium text-luxe-white mb-1">Email</h3>
                                        <p className="text-luxe-gray">bookings@luxedive.com</p>
                                        <p className="text-luxe-gray">support@luxedive.com</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Form */}
                    <Card>
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-serif text-luxe-white mb-6">Send an Inquiry</h2>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>First Name</Label>
                                        <Input 
                                            placeholder="John" 
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Last Name</Label>
                                        <Input 
                                            placeholder="Doe" 
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input 
                                        type="email" 
                                        placeholder="john@example.com" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Message</Label>
                                    <textarea
                                        className="flex min-h-[120px] w-full rounded-md border border-luxe-gray/30 bg-luxe-black px-3 py-2 text-sm text-luxe-white placeholder:text-luxe-gray focus:outline-none focus:ring-1 focus:ring-luxe-gold disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="How can we help you?"
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>
                                <Button className="w-full text-lg h-12" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        'SendMessage'
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    )
}
