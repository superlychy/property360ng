export default function AboutPage() {
    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="container-custom max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold font-display mb-12 text-center text-white">
                    About Us
                </h1>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <p className="text-lg">
                        <strong className="text-white">Property360ng</strong> is a Nigerian real estate platform built to bring clarity, trust, and transparency to property transactions.
                    </p>

                    <p>
                        We help Nigerians rent, buy, and invest in property by providing verified listings, real inspections, and immersive property views, so users can make confident decisions without unnecessary stress or risk.
                    </p>

                    <p>
                        The Nigerian real estate market is full of opportunities, but also confusion, misinformation, and scams. Property360ng was created to fix that gap by focusing on visibility, verification, and honest information.
                    </p>

                    <p>
                        Every property listed on our platform goes through a verification process that includes physical inspection, location confirmation, and real photo or video capture. Where available, we also provide 360° property tours to help users understand a property fully before scheduling an inspection or making payment.
                    </p>

                    <p className="pb-8">
                        We currently operate in Lagos, with a long-term vision to expand across Nigeria.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 my-12">
                        <div className="bg-gray-900/50 p-8 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold mb-4 font-display text-green-500">Our Mission</h2>
                            <p>To make property transactions in Nigeria safer, clearer, and more accessible for everyone.</p>
                        </div>
                        <div className="bg-gray-900/50 p-8 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold mb-4 font-display text-blue-500">Our Vision</h2>
                            <p>To become Nigeria's most trusted real estate platform, built on transparency and full property visibility.</p>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 p-8 rounded-2xl border border-white/5">
                        <h2 className="text-2xl font-bold mb-6 font-display text-white">What We Stand For</h2>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Verified listings only</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Honest property information</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Reduced risk and stress</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Education against scams</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Clear processes for buyers, renters, investors, and diaspora Nigerians</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
