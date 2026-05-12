import { ScrollArea } from '../../components/ui/ScrollArea'
import { Separator } from '../../components/ui/Separator'

export default function Terms() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-serif text-white mb-4">Terms of Service</h1>
                <p className="text-luxe-gray">Last Updated: October 2024</p>
            </div>

            <div className="bg-luxe-dark/50 border border-white/5 rounded-2xl p-8 md:p-12">
                <div className="prose prose-invert prose-gold max-w-none">
                    <h3>1. Agreement to Terms</h3>
                    <p>
                        By accessing our website and using our services, you agree to be bound by these Terms of Service. If you do not agree to any part of these terms, you may not access the service.
                    </p>

                    <h3>2. Eligibility & Verification</h3>
                    <p>
                        To rent a vehicle from LUXEDIVE, you must:
                    </p>
                    <ul>
                        <li>Be at least 25 years of age.</li>
                        <li>Possess a valid driving license held for at least 2 years.</li>
                        <li>Pass our identity and security verification process.</li>
                    </ul>

                    <h3>3. Booking & Payments</h3>
                    <p>
                        All bookings are subject to availability. A security deposit is required for all rentals. Full payment must be made prior to vehicle handover. We accept major credit cards and bank transfers.
                    </p>

                    <Separator className="my-8 bg-white/10" />

                    <h3>4. Vehicle Usage</h3>
                    <p>
                        Vehicles must not be used for:
                    </p>
                    <ul>
                        <li>Racing, rallying, or speed testing.</li>
                        <li>Carrying passengers or cargo for hire or reward (unless chauffeur-driven).</li>
                        <li>Driving under the influence of alcohol or drugs.</li>
                        <li>Driving on unpaved roads or off-road terrain.</li>
                    </ul>

                    <h3>5. Insurance & Liability</h3>
                    <p>
                        All vehicles are covered by comprehensive insurance. However, the renter is liable for the deductible amount in case of damage. Negligence or breach of terms voids insurance coverage.
                    </p>

                    <h3>6. Cancellation Policy</h3>
                    <p>
                        Cancellations made 24 hours prior to booking are eligible for a full refund. Cancellations within 24 hours incur a 50% fee. No-shows are charged 100%.
                    </p>

                    <Separator className="my-8 bg-white/10" />

                    <h3>7. Governing Law</h3>
                    <p>
                        These terms shall be governed by the laws of India, specifically the jurisdiction of Ahmedabad, Gujarat courts.
                    </p>
                </div>
            </div>
        </div>
    )
}
