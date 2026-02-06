
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import ListingList from '@/components/admin/ListingList'

export default async function ListingsPage() {
    const supabase = await createClient()

    // Fetch listings ordered by creation date
    const { data: listings, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return (
            <div className="p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
                Error loading listings: {error.message}
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Listings</h1>
                    <p className="text-gray-400">Manage your property listings ({listings?.length || 0})</p>
                </div>

                <Link href="/admin/listings/new" className="btn-primary whitespace-nowrap">
                    + New Listing
                </Link>
            </div>

            <ListingList listings={listings || []} />
        </div>
    )
}
