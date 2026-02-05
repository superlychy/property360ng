import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import TourViewer from '@/components/viewer/TourViewer'

type Props = {
    params: Promise<{ id: string }>
}

export default async function TourPage({ params }: Props) {
    const { id } = await params
    const supabase = await createClient()

    // Fetch listing
    const { data: listing, error: listingError } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single()

    if (listingError || !listing) {
        notFound()
    }

    // Fetch scenes with hotspots
    const { data: scenes, error: scenesError } = await supabase
        .from('scenes')
        .select(`
            *,
            hotspots!hotspots_scene_id_fkey (*)
        `)
        .eq('listing_id', id)
        .order('order', { ascending: true })

    if (scenesError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
                    Error loading tour: {scenesError.message}
                </div>
            </div>
        )
    }

    if (!scenes || scenes.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">📷</div>
                    <h2 className="text-2xl font-bold mb-2">No virtual tour available</h2>
                    <p className="text-gray-400 mb-6">This property doesn't have any scenes yet.</p>
                    <a href={`/listings/${id}`} className="btn-primary">
                        Back to Listing
                    </a>
                </div>
            </div>
        )
    }

    return (
        <TourViewer
            scenes={scenes}
            listingTitle={listing.title}
            listingId={id}
        />
    )
}
