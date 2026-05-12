import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-luxe-black border-t border-luxe-gray/20 pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-serif text-luxe-gold tracking-tight">
              LUXE<span className="text-luxe-white">DIVE</span>
            </Link>
            <p className="text-luxe-gray text-sm leading-relaxed">
              Ahmedabad's premier luxury car rental service. Experience the thrill of engineering excellence.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-luxe-gray hover:text-luxe-gold transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-luxe-gray hover:text-luxe-gold transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-luxe-gray hover:text-luxe-gold transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-luxe-gray hover:text-luxe-gold transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-luxe-white font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/fleet" className="text-luxe-gray hover:text-luxe-gold text-sm transition-colors">Our Fleet</Link></li>
              <li><Link to="/how-it-works" className="text-luxe-gray hover:text-luxe-gold text-sm transition-colors">How It Works</Link></li>
              <li><Link to="/membership" className="text-luxe-gray hover:text-luxe-gold text-sm transition-colors">Membership</Link></li>
              <li><Link to="/blog" className="text-luxe-gray hover:text-luxe-gold text-sm transition-colors">Journal</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-luxe-white font-medium mb-6">Support</h4>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-luxe-gray hover:text-luxe-gold text-sm transition-colors">Contact Concierge</Link></li>
              <li><Link to="/faq" className="text-luxe-gray hover:text-luxe-gold text-sm transition-colors">FAQ</Link></li>
              <li><Link to="/legal" className="text-luxe-gray hover:text-luxe-gold text-sm transition-colors">Legal & Privacy</Link></li>
              <li><a href="#" className="text-luxe-gray hover:text-luxe-gold text-sm transition-colors">Sitemap</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-luxe-white font-medium mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-luxe-gray">
                <MapPin className="h-5 w-5 text-luxe-gold shrink-0" />
                <span>
                  Sapphire Complex, C.G Road,<br />
                  Ahmedabad, Gujarat 380009
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-luxe-gray">
                <Phone className="h-5 w-5 text-luxe-gold shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-luxe-gray">
                <Mail className="h-5 w-5 text-luxe-gold shrink-0" />
                <span>concierge@luxedive.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-luxe-gray/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-luxe-gray/60">
            © {new Date().getFullYear()} LUXEDIVE. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-luxe-gray/60 hover:text-luxe-gold">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-luxe-gray/60 hover:text-luxe-gold">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
