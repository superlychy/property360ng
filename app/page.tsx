import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
    const supabase = await createClient()

    // Fetch active banner
    const { data: banner } = await supabase
        .from('homepage_banner')
        .select('*')
        .eq('active', true)
        .single()

    // Fetch featured listings (published, with cover image, limit 6)
    const { data: featuredListings } = await supabase
        .from('listings')
        .select('*')
        .eq('published', true)
        .not('cover_image', 'is', null)
        .order('created_at', { ascending: false })
        .limit(6)

    return (
        <div className="min-h-screen font-sans bg-[#0a0a0a] text-white selection:bg-blue-500/30">
            {/* Custom Banner Section (if active) - ONLY banner content */}
            {banner && (
                <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
                    {/* Banner Background */}
                    <div className="absolute inset-0">
                        {banner.image_url && (
                            <img
                                src={banner.image_url}
                                alt={banner.title}
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[20s]"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
                    </div>

                    {/* Banner Content - ONLY what's in the banner */}
                    <div className="relative z-10 container-custom text-center px-6 animate-fade-in-up">
                        <span className="inline-block px-3 py-1 mb-4 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold tracking-widest uppercase text-blue-300 border border-white/10">Featured Collection</span>
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white font-display drop-shadow-2xl">
                            {banner.title}
                        </h2>

                        {banner.subtitle && (
                            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                                {banner.subtitle}
                            </p>
                        )}

                        {banner.cta_text && banner.cta_link && (
                            <Link
                                href={banner.cta_link}
                                className="inline-flex items-center gap-2 btn-primary text-lg px-8 py-4 rounded-full shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_-5px_rgba(59,130,246,0.7)] transition-all transform hover:-translate-y-1"
                            >
                                {banner.cta_text}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Link>
                        )}
                    </div>
                </section>
            )}

            {/* Original Hero Section - Always shows with original content but updated copy */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black">
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/30 rounded-full filter blur-[128px] animate-pulse"></div>
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-900/30 rounded-full filter blur-[128px] animate-pulse delay-1000"></div>
                    </div>
                    {/* Add a subtle grid pattern for a tech/modern feel */}
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
                </div>

                {/* Original Hero Content with Pro Copy */}
                <div className="relative z-10 container-custom text-center px-6 mt-20 md:mt-32">
                    <div className="inline-flex items-center gap-2 mb-8 px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md shadow-2xl animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        <span className="text-gray-300 text-sm font-medium tracking-wide uppercase">Verified Nigerian Properties</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight font-display animate-fade-in-up delay-100">
                        See Nigerian Properties Clearly
                        <span className="block mt-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">From Every Angle</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up delay-200">
                        Property360ng helps you rent, buy, and invest in verified Nigerian properties with immersive 360° tours, transparent pricing, and zero agent drama.
                    </p>

                    <div className="flex flex-wrap gap-6 justify-center animate-fade-in-up delay-300">
                        <Link href="/listings" className="group relative px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                            <span className="relative z-10 flex items-center gap-2">
                                Browse Verified Listings
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </span>
                        </Link>
                        <Link href="/contact" className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-semibold text-lg hover:bg-white/5 transition-all backdrop-blur-sm">
                            Book an Inspection
                        </Link>
                    </div>

                    {/* Pro Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-24 max-w-5xl mx-auto border-t border-white/5 pt-12 animate-fade-in-up delay-500">
                        {[
                            { number: 'Verified', label: 'Properties Only' },
                            { number: '360°', label: 'Virtual Tours' },
                            { number: '0%', label: 'Hidden Fees' },
                            { number: '100%', label: 'Transparent' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center group">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors font-display">{stat.number}</div>
                                <div className="text-gray-500 text-sm tracking-widest uppercase font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent"></div>
                </div>
            </section>

            {/* Why Trust Us Badge Section */}
            <section className="py-20 bg-gray-900 border-y border-white/5">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-display">
                            Why Nigerians Trust <span className="text-green-400">Property360ng</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center">
                        {[
                            { icon: <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: 'Verified properties only' },
                            { icon: <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>, text: '360° video & virtual tours' },
                            { icon: <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: 'Transparent fees' },
                            { icon: <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>, text: 'No fake listings' },
                            { icon: <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: 'Diaspora-friendly process' }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-3">
                                <div className="text-green-400">{item.icon}</div>
                                <p className="font-medium text-gray-300">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Listings */}
            {featuredListings && featuredListings.length > 0 && (
                <section className="py-32 bg-black relative">
                    <div className="container-custom">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white font-display">
                                    Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Listings</span>
                                </h2>
                                <p className="text-xl text-gray-400 max-w-xl font-light">
                                    Browse verified properties with full 360° virtual tours from the comfort of your device.
                                </p>
                            </div>
                            <Link href="/listings" className="text-white border-b border-green-500 pb-1 hover:text-green-400 transition-colors flex items-center gap-2">
                                View All Properties <span className="text-xl">→</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredListings.map((listing) => (
                                <Link
                                    key={listing.id}
                                    href={`/listings/${listing.id}`}
                                    className="group relative block h-[500px] rounded-2xl overflow-hidden"
                                >
                                    <img
                                        src={listing.cover_image || '/placeholder.jpg'}
                                        alt={listing.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="mb-4">
                                            <span className="inline-block px-3 py-1 bg-green-600/90 backdrop-blur-md text-white text-xs font-bold tracking-wider uppercase rounded-sm mb-3">
                                                Verified
                                            </span>
                                            <h3 className="text-2xl font-bold text-white mb-2 leading-tight font-display">
                                                {listing.title}
                                            </h3>
                                            <p className="text-gray-300 text-sm flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                {listing.location}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-white/20 pt-4">
                                            {listing.price && (
                                                <p className="text-xl font-bold text-white">
                                                    ₦{listing.price.toLocaleString()}
                                                </p>
                                            )}
                                            <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* How It Works */}
            <section className="py-32 bg-[#050505] border-t border-white/5">
                <div className="container-custom">
                    <div className="text-center mb-24">
                        <span className="text-green-500 font-bold tracking-widest uppercase text-sm mb-4 block">The Process</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-display">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                            Finding your dream property has never been easier or safer.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: '1', title: 'We Verify', desc: 'Physical inspection & document check.', icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
                            { step: '2', title: 'We Capture', desc: 'Real photos, videos & 360° tours.', icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
                            { step: '3', title: 'You Explore', desc: 'View properties remotely from anywhere.', icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
                            { step: '4', title: 'You Decide', desc: 'Inspect, pay, and move with confidence.', icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg> }
                        ].map((item, i) => (
                            <div key={i} className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-green-500/30 transition-all duration-300 relative">
                                <div className="text-green-400 mb-6">{item.icon}</div>
                                <div className="text-xs font-bold text-green-500 tracking-widest uppercase mb-3">Step {item.step}</div>
                                <h3 className="text-xl font-bold mb-3 text-white font-display">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 360 & Diaspora Info Grid */}
            <section className="py-32 bg-gray-900 border-t border-white/5">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* 360 Info */}
                        <div>
                            <h3 className="text-3xl font-bold mb-6 text-white font-display">Explore Properties in <span className="text-green-400">Full 360° View</span></h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Walk through homes virtually before stepping outside. Our 360° tours help you inspect space, layout, lighting, and condition—no surprises.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-gray-300"><span className="text-green-400">✓</span> Perfect for busy professionals</li>
                                <li className="flex items-center gap-3 text-gray-300"><span className="text-green-400">✓</span> Ideal for Diaspora buyers</li>
                                <li className="flex items-center gap-3 text-gray-300"><span className="text-green-400">✓</span> Must-have for serious investors</li>
                            </ul>
                            <Link href="/listings" className="btn-primary">Try a Virtual Tour</Link>
                        </div>

                        {/* Diaspora Info */}
                        <div>
                            <h3 className="text-3xl font-bold mb-6 text-white font-display">Buying From <span className="text-blue-400">Abroad?</span></h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Property360ng helps you inspect, verify, and secure properties remotely. You don't need to be in Nigeria to own property here.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-gray-300"><span className="text-blue-400">✓</span> Virtual inspections & 360 tours</li>
                                <li className="flex items-center gap-3 text-gray-300"><span className="text-blue-400">✓</span> Legal & ownership verification</li>
                                <li className="flex items-center gap-3 text-gray-300"><span className="text-blue-400">✓</span> Trusted local representation</li>
                            </ul>
                            <Link href="/diaspora" className="btn-outline">Learn More</Link>
                        </div>
                    </div>
                </div>
            </section>


            {/* CTA Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-blue-900/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-900/90 mix-blend-multiply"></div>
                    {/* Fallback pattern instead of image to ensure load */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
                </div>

                <div className="container-custom text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white tracking-tight">
                        Ready to Find Your <br />Perfect Sanctuary?
                    </h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
                        Join hundreds of satisfied homeowners who found their dream property through Property360ng.
                    </p>
                    <Link
                        href="/listings"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-900 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl transform hover:-translate-y-1"
                    >
                        <span>Start Your Search</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                </div>
            </section>
        </div>
    )
}


