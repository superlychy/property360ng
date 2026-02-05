import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import SceneList from '@/components/admin/SceneList'

type Props = {
    params: Promise<{ id: string }>
}

export default async function ScenesPage({ params }: Props) {
    const { id } = await params
    const supabase = await createClient()

    // Fetch listing details
    const { data: listing, error: listingError } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single()

    if (listingError || !listing) {
        notFound()
    }

    // Fetch scenes for this listing
    const { data: scenes, error: scenesError } = await supabase
        .from('scenes')
        .select('*')
        .eq('listing_id', id)
        .order('order', { ascending: true })

    if (scenesError) {
        return (
            <div className="p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
                Error loading scenes: {scenesError.message}
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
                <Link href="/admin/listings" className="text-gray-400 hover:text-white text-sm">
                    ← Back to Listings
                </Link>
            </div>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Manage Scenes</h1>
                <p className="text-gray-400">
                    {listing.title} • {scenes?.length || 0} scene{scenes?.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Scene List */}
            <SceneList scenes={scenes || []} listingId={id} />
        </div>
    )
}
