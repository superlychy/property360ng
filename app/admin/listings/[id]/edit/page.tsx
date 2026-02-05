
import { createClient } from '@/lib/supabase/server'
import ListingForm from '@/components/admin/ListingForm'
import MediaGalleryManager from '@/components/admin/MediaGalleryManager'
import { notFound } from 'next/navigation'

type Props = {
    params: Promise<{ id: string }>
}

export default async function EditListingPage({ params }: Props) {
    const { id } = await params
    const supabase = await createClient()

    // Fetch existing listing data
    const { data: listing, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !listing) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Edit Listing</h1>
                <p className="text-gray-400">Update property details and settings.</p>
            </div>

            <ListingForm initialData={listing} isEditing={true} />

            <div>
                <h2 className="text-2xl font-bold mb-4">Media Gallery</h2>
                <p className="text-gray-400 mb-6">Upload images and video to showcase your property</p>
                <MediaGalleryManager
                    listingId={listing.id}
                    initialImages={listing.gallery_images || []}
                    initialVideo={listing.video_url}
                />
            </div>
        </div>
    )
}
