export default function CareersPage() {
    return (
        <div className="pt-24 pb-20">
            {/* Hero Section */}
            <div className="container-custom mb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">Careers at Property<span className="text-green-500">360ng</span></h1>
                    <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">
                        At Property360ng, we’re building more than a real estate platform — we’re creating opportunities for people to find homes, make smart property investments, and grow professionally. We are passionate about innovation, integrity, and delivering excellent property experiences across Nigeria.
                    </p>
                    <p className="text-lg text-gray-300">
                        If you’re driven, creative, and interested in real estate, technology, or customer service, we’d love to hear from you.
                    </p>
                </div>
            </div>

            {/* Why Work With Us */}
            <section className="py-16 bg-white/5 border-y border-white/5 mb-20">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold mb-12 text-center font-display">Why Work With Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: 'Growth Opportunity', desc: 'Opportunity to grow with a fast-growing property platform.' },
                            { title: 'Hands-on Experience', desc: 'Hands-on experience in real estate, sales, marketing, and technology.' },
                            { title: 'Great Culture', desc: 'Supportive and collaborative work environment.' },
                            { title: 'Real Impact', desc: 'Exposure to real-world property projects and clients.' },
                            { title: 'Flexible Work', desc: 'Flexible and performance-based opportunities.' },
                            { title: 'Innovation', desc: 'At Property360ng, we value ideas, dedication, and people who are willing to learn and grow.' },
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-black border border-white/10 hover:border-green-500/50 transition-colors">
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Column: Positions & Info */}
                    <div className="lg:col-span-2 space-y-16">

                        {/* Open Positions */}
                        <section>
                            <h2 className="text-3xl font-bold mb-8 font-display">Open Positions</h2>
                            <p className="text-gray-400 mb-8">
                                We are currently accepting applications for present and future opportunities in the following roles:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    'Real Estate Agent / Realtor',
                                    'Property Listing Manager',
                                    'Sales Executive',
                                    'Customer Support / Client Relations',
                                    'Digital Marketer / Social Media',
                                    'Content Writer (Property & Lifestyle)',
                                    'Photographer / Videographer',
                                    'Web / Technical Support'
                                ].map((role, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-gray-900 border border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className="font-medium text-gray-200">{role}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-6 text-sm text-gray-500 italic">
                                Some roles may be commission-based, remote, or hybrid depending on the position.
                            </p>
                        </section>

                        {/* Internship */}
                        <section className="bg-gradient-to-br from-green-900/20 to-blue-900/20 p-8 rounded-2xl border border-white/10">
                            <h2 className="text-2xl font-bold mb-4 font-display text-white">Internship & NYSC Opportunities</h2>
                            <p className="text-gray-300 mb-4">
                                We welcome interns and NYSC members who are interested in gaining practical experience in real estate, digital marketing, sales, content creation, and platform operations.
                            </p>
                            <p className="text-gray-300 font-medium">
                                This is a great opportunity to learn, build skills, and gain industry exposure.
                            </p>
                        </section>

                        {/* Life at Property360ng */}
                        <section>
                            <h2 className="text-3xl font-bold mb-4 font-display">Life at Property360ng</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Working at Property360ng means being part of a growing team that values creativity, learning, and impact. We collaborate closely, embrace new ideas, and focus on delivering real value to property owners, agents, and clients.
                            </p>
                        </section>

                        {/* Equal Opportunity */}
                        <section>
                            <h2 className="text-xl font-bold mb-2 font-display text-gray-200">Equal Opportunity Statement</h2>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Property360ng is an equal-opportunity platform. We welcome applications from all qualified individuals regardless of background, gender, or experience level.
                            </p>
                        </section>
                    </div>

                    {/* Right Column: Application Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 sticky top-32">
                            <h3 className="text-2xl font-bold mb-6">Apply Now</h3>
                            <p className="text-gray-400 mb-6 text-sm">
                                Interested candidates should send a brief introduction, CV/portfolio, and the role you're applying for.
                            </p>

                            <div className="mb-8 p-4 bg-black/50 rounded-lg border border-white/5 text-sm">
                                <p className="text-gray-400 mb-1">Email applications to:</p>
                                <a href="mailto:careers@property360ng.com" className="text-green-400 font-bold hover:underline">careers@property360ng.com</a>
                            </div>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-gray-900 text-gray-500">Or use this form</span>
                                </div>
                            </div>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Full Name</label>
                                    <input type="text" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-green-500 outline-none text-sm" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Email Address</label>
                                    <input type="email" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-green-500 outline-none text-sm" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Role Applying For</label>
                                    <select className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-green-500 outline-none text-sm">
                                        <option>Real Estate Agent / Realtor</option>
                                        <option>Property Listing Manager</option>
                                        <option>Sales Executive</option>
                                        <option>Customer Support</option>
                                        <option>Digital Marketer</option>
                                        <option>Content Writer</option>
                                        <option>Photographer / Videographer</option>
                                        <option>Web / Technical Support</option>
                                        <option>Internship / NYSC</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Introduction / Cover Letter</label>
                                    <textarea className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-green-500 outline-none h-32 text-sm" placeholder="Tell us about yourself and include links to your CV/Portfolio..."></textarea>
                                </div>
                                <button type="submit" className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                                    Submit Application
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
