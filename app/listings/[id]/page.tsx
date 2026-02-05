import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import MediaViewer from '@/components/MediaViewer'

type Props = {
    params: Promise<{ id: string }>
}

export default async function ListingDetailPage({ params }: Props) {
    const { id } = await params
    const supabase = await createClient()

    // Fetch listing details
    const { data: listing, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single()

    if (error || !listing) {
        notFound()
    }

    // Fetch scenes count
    const { count: sceneCount } = await supabase
        .from('scenes')
        .select('*', { count: 'exact', head: true })
        .eq('listing_id', id)

    return (
        <div className="min-h-screen">


            {/* Hero Section */}
            <div className="relative h-[85vh] min-h-[500px]">
                {listing.cover_image ? (
                    <img
                        src={listing.cover_image}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                        <span className="text-9xl opacity-20">🏠</span>
                    </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-black/30" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 pb-20">
                    <div className="container-custom">
                        <div className="mb-6 flex gap-3">
                            {sceneCount && sceneCount > 0 && (
                                <span className="bg-red-600 text-white px-3 py-1 rounded-sm text-xs font-bold tracking-wider uppercase animate-pulse">
                                    Live 360° Tour
                                </span>
                            )}
                            <span className="bg-green-600 text-white px-3 py-1 rounded-sm text-xs font-bold tracking-wider uppercase">
                                Verified
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-display leading-tight">{listing.title}</h1>

                        <div className="flex flex-wrap items-center gap-8 text-lg mb-8 text-gray-300">
                            <div className="flex items-center gap-2">
                                <span className="opacity-70">📍</span>
                                <span>{listing.location}</span>
                            </div>
                            {listing.price && (
                                <div className="flex items-center gap-2">
                                    <span className="opacity-70">💰</span>
                                    <span className="text-white font-bold text-2xl">
                                        ₦{listing.price.toLocaleString()}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            {sceneCount && sceneCount > 0 && (
                                <Link
                                    href={`/listings/${id}/tour`}
                                    className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.5)] flex items-center gap-2"
                                >
                                    <span>🌐</span>
                                    Start 360° Tour
                                </Link>
                            )}

                            {listing.whatsapp_number && (
                                <a
                                    href={`https://wa.me/${listing.whatsapp_number}?text=${encodeURIComponent(`Hi! I'm interested in ${listing.title} located in ${listing.location}. Price: ₦${listing.price?.toLocaleString()}. I saw it on Property360ng.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-[#25D366] text-white rounded-full font-bold text-lg hover:bg-[#20bd5a] transition-all shadow-lg flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                                    Chat on WhatsApp
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <main className="container-custom py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Content */}
                    <div className="lg:col-span-2">
                        {listing.description && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-bold mb-6 font-display border-l-4 border-green-500 pl-4">Property Overview</h2>
                                <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                                    <p className="whitespace-pre-wrap leading-relaxed">{listing.description}</p>
                                </div>
                            </div>
                        )}

                        {/* Media Gallery & Video */}
                        {((listing.gallery_images && listing.gallery_images.length > 0) || listing.video_url) && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-bold mb-8 font-display border-l-4 border-blue-500 pl-4">Media Gallery</h2>
                                <div className="rounded-2xl overflow-hidden border border-white/5 bg-black">
                                    <MediaViewer
                                        images={listing.gallery_images || []}
                                        videoUrl={listing.video_url}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-8">
                        {/* Features Card */}
                        <div className="p-8 rounded-2xl bg-gray-900 border border-white/5 sticky top-32">
                            <h3 className="text-xl font-bold mb-6 font-display">Viewing Experience</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                                        🌐
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">360° Immersion</h4>
                                        <p className="text-sm text-gray-400">Full panoramic details from floor to ceiling.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                        ⚡
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Interactive Walkthrough</h4>
                                        <p className="text-sm text-gray-400">Move freely between rooms and spaces.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                                        📱
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Device Optimized</h4>
                                        <p className="text-sm text-gray-400">Perfect fidelity on mobile, tablet, and desktop.</p>
                                    </div>
                                </div>
                            </div>

                            {sceneCount && sceneCount > 0 && (
                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <Link href={`/listings/${id}/tour`} className="btn-primary w-full justify-center">
                                        Launch Tour
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>


        </div>
    )
}
