export default function TermsPage() {
    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="container-custom max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold font-display mb-12 text-center text-white">
                    Terms & Conditions
                </h1>

                <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-8 md:p-12">
                    <div className="space-y-8 text-gray-300 leading-relaxed">
                        <p>
                            Welcome to <strong className="text-white">Property360ng</strong>.<br />
                            By accessing or using this website, you agree to the following Terms and Conditions. If you do not agree, please do not use the website.
                        </p>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">1. Use of the Website</h3>
                            <p>Property360ng provides real estate information, listings, and related services.</p>
                            <p className="mt-2">All content is for informational purposes only and does not constitute legal or financial advice.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">2. Property Listings</h3>
                            <p className="mb-3">All listings are provided based on information available at the time of posting.</p>
                            <ul className="space-y-2 ml-6">
                                <li className="flex items-start gap-2"><span className="text-green-500">•</span> While we verify properties before listing, Property360ng does not guarantee final transaction outcomes.</li>
                                <li className="flex items-start gap-2"><span className="text-green-500">•</span> Prices, availability, and details may change without notice.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">3. Inspections & Transactions</h3>
                            <p className="mb-3">Property360ng may assist with inspections and introductions but is not a party to final rental, purchase, or investment agreements, unless expressly stated.</p>
                            <p>Payments, agreements, and documentation should always be confirmed properly by users.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">4. User Responsibilities</h3>
                            <p className="mb-3">By using this website, you agree to:</p>
                            <ul className="space-y-2 ml-6">
                                <li className="flex items-start gap-2"><span className="text-green-500">•</span> Provide accurate and truthful information</li>
                                <li className="flex items-start gap-2"><span className="text-green-500">•</span> Not misuse the platform for fraudulent or illegal activities</li>
                                <li className="flex items-start gap-2"><span className="text-green-500">•</span> Respect intellectual property and platform rules</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">5. Limitation of Liability</h3>
                            <p className="mb-3">Property360ng shall not be held liable for:</p>
                            <ul className="space-y-2 ml-6">
                                <li className="flex items-start gap-2"><span className="text-green-500">•</span> Losses arising from third-party transactions</li>
                                <li className="flex items-start gap-2"><span className="text-green-500">•</span> Decisions made based on information provided on the website</li>
                                <li className="flex items-start gap-2"><span className="text-green-500">•</span> Delays, errors, or omissions beyond our reasonable control</li>
                            </ul>
                            <p className="mt-4 text-gray-400">Users are encouraged to carry out due diligence and seek professional advice where necessary.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">6. Intellectual Property</h3>
                            <p className="mb-2">All website content, including text, images, videos, and branding, belongs to Property360ng unless otherwise stated.</p>
                            <p>Unauthorized use or reproduction is prohibited.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">7. Changes to Terms</h3>
                            <p>We reserve the right to update these Terms & Conditions at any time. Continued use of the website implies acceptance of any changes.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">8. Governing Law</h3>
                            <p>These Terms & Conditions are governed by the laws of the Federal Republic of Nigeria.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">9. Contact</h3>
                            <p>For questions or concerns regarding these terms, please contact us via the website.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
