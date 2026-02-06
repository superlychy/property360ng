import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = await createClient()
    const baseUrl = 'https://property360ng.com'

    // Fetch all published listings
    const { data: listings } = await supabase
        .from('listings')
        .select('id, updated_at')
        .eq('published', true)

    const listingUrls = (listings || []).map((listing) => ({
        url: `${baseUrl}/listings/${listing.id}`,
        lastModified: new Date(listing.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/listings`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...listingUrls,
    ]
}
