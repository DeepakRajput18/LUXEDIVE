import { Separator } from '../../components/ui/Separator'

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-white mb-4">Privacy Policy</h1>
        <p className="text-luxe-gray">Last Updated: October 2024</p>
      </div>

      <div className="bg-luxe-dark/50 border border-white/5 rounded-2xl p-8 md:p-12">
        <div className="prose prose-invert prose-gold max-w-none">
          <h3>1. Information We Collect</h3>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul>
            <li>Name, email address, phone number, and postal address.</li>
            <li>Driving license details and government ID documents (KYC).</li>
            <li>Payment information and transaction history.</li>
            <li>Preferences and feedback.</li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Process your bookings and payments.</li>
            <li>Verify your identity and eligibility to rent.</li>
            <li>Communicate with you about your rental and our services.</li>
            <li>Improve our fleet and customer experience.</li>
            <li>Comply with legal obligations.</li>
          </ul>

          <Separator className="my-8 bg-white/10" />

          <h3>3. Data Security</h3>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h3>4. Location Tracking</h3>
          <p>
            Our vehicles are equipped with GPS tracking devices for security and asset management purposes. We track vehicle location during rental periods.
          </p>

          <h3>5. Cookie Policy</h3>
          <p>
            We use cookies to enhance your browsing experience. You can control cookie preferences through your browser settings.
          </p>

          <Separator className="my-8 bg-white/10" />

          <h3>6. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact our Data Protection Officer at privacy@luxedive.com.
          </p>
        </div>
      </div>
    </div>
  )
}
