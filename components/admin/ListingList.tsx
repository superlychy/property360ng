
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Listing } from '@/types'
import { useRouter } from 'next/navigation'

export default function ListingList({ listings }: { listings: Listing[] }) {
    const router = useRouter()
    const supabase = createClient()
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this listing? This will remove all scenes and hotspots.')) {
            return
        }

        try {
            setDeletingId(id)
            const { error } = await supabase
                .from('listings')
                .delete()
                .eq('id', id)

            if (error) throw error
            router.refresh()
        } catch (err) {
            alert('Failed to delete listing')
            console.error(err)
        } finally {
            setDeletingId(null)
        }
    }

    if (listings.length === 0) {
        return (
            <div className="text-center py-20 bg-gray-900 border border-gray-800 rounded-xl border-dashed">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-medium mb-2">No listings yet</h3>
                <p className="text-gray-400 mb-6">Create your first property listing to get started.</p>
                <Link href="/admin/listings/new" className="btn-primary">
                    + Create Listing
                </Link>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
                <div key={listing.id} className="card group hover:border-gray-600">
                    {/* Image */}
                    <div className="aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
                        {listing.cover_image ? (
                            <img
                                src={listing.cover_image}
                                alt={listing.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600">
                                No Image
                            </div>
                        )}

                        <div className="absolute top-2 right-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${listing.published ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-300'
                                }`}>
                                {listing.published ? 'Published' : 'Draft'}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-1 truncate">{listing.title}</h3>
                        <div className="flex justify-between items-center text-sm text-gray-400">
                            <span>{listing.location}</span>
                            <span>{listing.price ? `₦${listing.price.toLocaleString()}` : 'Price TBD'}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2 border-t border-gray-800 pt-4">
                        <Link
                            href={`/admin/listings/${listing.id}/scenes`}
                            className="btn-secondary text-sm py-2"
                        >
                            📷 Scenes
                        </Link>
                        <div className="flex gap-2 justify-end">
                            <Link
                                href={`/admin/listings/${listing.id}/edit`}
                                className="btn-outline text-sm py-2 px-3"
                            >
                                ✎
                            </Link>
                            <button
                                onClick={() => handleDelete(listing.id)}
                                disabled={deletingId === listing.id}
                                className="btn-outline text-sm py-2 px-3 text-red-400 border-red-500/30 hover:bg-red-500/10"
                            >
                                {deletingId === listing.id ? '...' : '🗑'}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
