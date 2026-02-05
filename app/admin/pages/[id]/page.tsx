'use client'

import { createClient } from '@/lib/supabase/client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminPageEditor() {
    const params = useParams()
    const id = params.id as string
    const [page, setPage] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const router = useRouter()

    useEffect(() => {
        async function fetchPage() {
            setLoading(true)
            const supabase = createClient()
            const { data, error } = await supabase
                .from('pages')
                .select('*')
                .eq('id', id)
                .single()

            if (data) {
                setPage(data)
                setTitle(data.title)
                setContent(data.content)
            }
            setLoading(false)
        }

        if (id) {
            fetchPage()
        }
    }, [id])

    const handleSave = async () => {
        setSaving(true)
        const supabase = createClient()

        try {
            const { error } = await supabase
                .from('pages')
                .update({
                    title,
                    content,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id)

            if (error) throw error

            alert('Page updated successfully!')
            router.refresh()
        } catch (error: any) {
            alert('Failed to update page: ' + error.message)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        )
    }

    if (!page) {
        return <div className="p-8 text-white">Page not found</div>
    }

    return (
        <div className="p-8 bg-black min-h-screen text-white">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold font-display">Edit Content: {page.slug}</h1>
                        <p className="text-gray-500 text-sm">Last updated: {new Date(page.updated_at).toLocaleString()}</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center gap-2 ${saving ? 'opacity-70 cursor-wait' : ''}`}
                    >
                        {saving ? (
                            <>
                                <span className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></span>
                                Saving...
                            </>
                        ) : (
                            <>
                                <span>💾</span> Save Changes
                            </>
                        )}
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Page Title</label>
                        <input
                            type="text"
                            className="w-full bg-gray-900 border border-white/10 rounded-lg p-4 text-white focus:ring-2 focus:ring-green-500 outline-none transition-all text-lg font-bold"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 flex justify-between">
                            <span>Content (Markdown Supported)</span>
                            <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" className="text-green-500 hover:text-green-400 text-xs">Markdown Help</a>
                        </label>
                        <textarea
                            className="w-full h-[600px] bg-gray-900 border border-white/10 rounded-lg p-4 text-gray-300 font-mono text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all resize-y leading-relaxed"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="# Heading 1&#10;## Heading 2&#10;Write your content here..."
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
