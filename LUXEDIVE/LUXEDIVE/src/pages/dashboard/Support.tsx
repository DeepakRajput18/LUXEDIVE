import { Mail, Phone, MessageSquare, ShieldCheck, Clock, ExternalLink } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Link } from 'react-router-dom'

export default function Support() {
  const supportOptions = [
    {
      title: 'Concierge Chat',
      desc: '24/7 dedicated assistance for your premium bookings.',
      icon: MessageSquare,
      action: 'Start Chat',
      link: '/contact'
    },
    {
      title: 'Emergency Response',
      desc: 'Immediate roadside assistance and vehicle support.',
      icon: Phone,
      action: 'Call Now',
      link: 'tel:+1234567890'
    },
    {
      title: 'Insurance & Safety',
      desc: 'Review your coverage and safety guidelines.',
      icon: ShieldCheck,
      action: 'Read Terms',
      link: '/terms'
    }
  ]

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
          <h1 className="text-4xl font-serif text-white mb-2">Support Hub</h1>
          <p className="text-luxe-gray font-light">Elegance in assistance. Our team is here to ensure your experience is flawless.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {supportOptions.map((opt, i) => (
          <Card key={i} className="bg-[#121212] border-white/5 p-8 flex flex-col items-center text-center group hover:border-[#D4AF37]/30 transition-all duration-500 hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/20 transition-all">
              <opt.icon className="w-6 h-6 text-luxe-gold" />
            </div>
            <h3 className="text-xl font-serif text-white mb-3">{opt.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-8 flex-1">{opt.desc}</p>
            {opt.link.startsWith('http') || opt.link.startsWith('tel') ? (
              <a href={opt.link} className="w-full">
                <Button variant="outline" className="w-full border-white/10 text-xs font-bold uppercase tracking-widest hover:border-luxe-gold hover:text-luxe-gold">
                  {opt.action}
                </Button>
              </a>
            ) : (
                <Link to={opt.link} className="w-full">
                    <Button variant="outline" className="w-full border-white/10 text-xs font-bold uppercase tracking-widest hover:border-luxe-gold hover:text-luxe-gold">
                    {opt.action}
                    </Button>
                </Link>
            )}
          </Card>
        ))}
      </div>

      <div className="bg-[#0D0F14] border border-white/5 rounded-3xl p-10 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-luxe-gold/5 blur-[100px] rounded-full" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl">
                  <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-luxe-gold" />
                      <span className="text-[10px] font-bold text-luxe-gold uppercase tracking-[0.2em]">Priority Service</span>
                  </div>
                  <h2 className="text-3xl font-serif text-white mb-4">Luxury Concierge</h2>
                  <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
                      For our platinum members, experience the pinnacle of service with a dedicated concierge assigned to your profile. Manage special requests, event coordination, and unique vehicle modifications with a single point of contact.
                  </p>
                  <div className="flex flex-wrap gap-4">
                      <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-[10px] font-bold uppercase tracking-widest shadow-xl">Speak to Concierge</Button>
                      <Button variant="ghost" className="text-luxe-gold hover:bg-luxe-gold/5 text-[10px] font-bold uppercase tracking-widest">Reference Guide <ExternalLink className="w-3 h-3 ml-2" /></Button>
                  </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                    {[
                        { label: 'Avg Voice Response', val: '45 sec' },
                        { label: 'Chat SLA', val: 'Instant' },
                        { label: 'Resolution Rate', val: '99.8%' },
                        { label: 'Client Satisfaction', val: '5.0/5.0' }
                    ].map((stat, i) => (
                        <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                            <div className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-1">{stat.label}</div>
                            <div className="text-xl font-serif text-luxe-gold">{stat.val}</div>
                        </div>
                    ))}
              </div>
          </div>
      </div>
    </div>
  )
}
