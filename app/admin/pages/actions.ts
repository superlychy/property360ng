'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updatePage(id: string, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const content = formData.get('content') as string

    if (!title || !content) {
        throw new Error('Title and Content are required')
    }

    const { error } = await supabase
        .from('pages')
        .update({ title, content, updated_at: new Date().toISOString() })
        .eq('id', id)

    if (error) {
        console.error('Error updating page:', error)
        throw new Error('Failed to update page')
    }

    revalidatePath(`/admin/pages/${id}`)
    revalidatePath('/about')
    revalidatePath('/privacy')
    revalidatePath('/terms') // Revalidate all possible public facing pages
}
