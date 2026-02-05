'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { uploadImage } from '@/lib/utils/image-upload'
import { useRouter } from 'next/navigation'

interface BannerFormProps {
    initialData?: any
}

export default function BannerForm({ initialData }: BannerFormProps) {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        subtitle: initialData?.subtitle || '',
        image_url: initialData?.image_url || null,
        cta_text: initialData?.cta_text || 'Explore Properties',
        cta_link: initialData?.cta_link || '/listings',
        active: initialData?.active ?? true
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }))
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file')
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image must be less than 5MB')
            return
        }

        try {
            setLoading(true)

            // Create unique filename
            const fileExt = file.name.split('.').pop()
            const fileName = `banner_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

            // Upload to Supabase storage
            const { data, error: uploadError } = await supabase.storage
                .from('property-images')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (uploadError) {
                console.error('Upload error:', uploadError)
                throw uploadError
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('property-images')
                .getPublicUrl(fileName)

            setFormData(prev => ({ ...prev, image_url: publicUrl }))
            alert('Image uploaded successfully!')
        } catch (error: any) {
            console.error('Upload failed:', error)
            alert(`Failed to upload image: ${error.message || 'Unknown error'}`)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (initialData) {
                // Update
                const { error } = await supabase
                    .from('homepage_banner')
                    .update(formData)
                    .eq('id', initialData.id)

                if (error) throw error
            } else {
                // Create
                const { error } = await supabase
                    .from('homepage_banner')
                    .insert([formData])

                if (error) throw error
            }

            router.push('/admin')
            router.refresh()
        } catch (error) {
            console.error('Error saving banner:', error)
            alert('Failed to save banner')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="card">
                <h2 className="text-2xl font-bold mb-6">
                    {initialData ? 'Edit Banner' : 'Create Banner'}
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="label" htmlFor="title">Title *</label>
                        <input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="input"
                            placeholder="Experience Properties in 360°"
                        />
                    </div>

                    <div>
                        <label className="label" htmlFor="subtitle">Subtitle</label>
                        <textarea
                            id="subtitle"
                            name="subtitle"
                            value={formData.subtitle}
                            onChange={handleChange}
                            className="input min-h-[100px]"
                            placeholder="Step inside your dream home from anywhere..."
                        />
                    </div>

                    <div>
                        <label className="label">Banner Image</label>
                        {formData.image_url && (
                            <div className="mb-4">
                                <img
                                    src={formData.image_url}
                                    alt="Banner preview"
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="input"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label" htmlFor="cta_text">Button Text</label>
                            <input
                                id="cta_text"
                                name="cta_text"
                                value={formData.cta_text}
                                onChange={handleChange}
                                className="input"
                                placeholder="Explore Properties"
                            />
                        </div>

                        <div>
                            <label className="label" htmlFor="cta_link">Button Link</label>
                            <input
                                id="cta_link"
                                name="cta_link"
                                value={formData.cta_link}
                                onChange={handleChange}
                                className="input"
                                placeholder="/listings"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="active"
                            name="active"
                            checked={formData.active}
                            onChange={handleChange}
                            className="w-4 h-4"
                        />
                        <label htmlFor="active" className="text-sm">Active (show on homepage)</label>
                    </div>
                </div>

                <div className="flex gap-4 mt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Banner'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/admin')}
                        className="btn-outline"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    )
}
