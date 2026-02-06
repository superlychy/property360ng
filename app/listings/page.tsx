import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function ListingsPage() {
    const supabase = await createClient()

    // Fetch only published listings
    const { data: listings, error } = await supabase
        .from('listings')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
                    Error loading listings: {error.message}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen">



            {/* Main Content */}
            <main className="container-custom py-32 min-h-screen">
                <div className="mb-16 text-center">
                    <span className="inline-block px-3 py-1 mb-4 bg-green-500/10 rounded-full text-xs font-bold tracking-wider text-green-500 uppercase border border-green-500/20">
                        Listings
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display">
                        Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Listings</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                        Browse verified properties with full 360° virtual tours from the comfort of your device.
                    </p>
                </div>

                {/* Listings Grid */}
                {!listings || listings.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-gray-800 rounded-2xl bg-gray-900/30">
                        <div className="text-6xl mb-6 opacity-50">🏙️</div>
                        <h3 className="text-2xl font-medium mb-3 font-display">No properties available yet</h3>
                        <p className="text-gray-400">Our team is verifying new listings. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listings.map((listing) => (
                            <Link
                                key={listing.id}
                                href={`/listings/${listing.id}`}
                                className="group relative block rounded-2xl overflow-hidden bg-gray-900 border border-white/5 hover:border-green-500/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                            >
                                {/* Image */}
                                <div className="aspect-video bg-gray-800 relative overflow-hidden">
                                    {listing.cover_image ? (
                                        <img
                                            src={listing.cover_image}
                                            alt={listing.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-700 bg-gray-900">
                                            <span className="text-4xl">📷</span>
                                        </div>
                                    )}

                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="bg-green-600/90 backdrop-blur-md text-white px-3 py-1 rounded-sm text-xs font-bold tracking-wider uppercase shadow-lg">
                                            Verified
                                        </span>
                                    </div>

                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border border-white/10">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                        <span>360° Tour</span>
                                    </div>

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-xl font-bold mb-1 group-hover:text-green-400 transition-colors font-display text-white line-clamp-1">
                                                {listing.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm flex items-center gap-1.5">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                {listing.location}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                                        {listing.price && (
                                            <span className="text-xl font-bold text-white tracking-tight">
                                                ₦{listing.price.toLocaleString()}
                                            </span>
                                        )}
                                        <span className="text-green-500 text-sm font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                            View Details <span className="text-lg">→</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>


        </div>
    )
}
