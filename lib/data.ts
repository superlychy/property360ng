import { createClient } from '@/lib/supabase/server'

export async function getPage(slug: string) {
    const supabase = await createClient()

    const { data: page, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error || !page) {
        console.error(`Error fetching page ${slug}:`, error)
        return null
    }

    return page
}
