
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useCloudinaryUpload } from '@/lib/hooks/useCloudinaryUpload'
import type { Listing } from '@/types'

interface ListingFormProps {
    initialData?: Partial<Listing>
    isEditing?: boolean
}

export default function ListingForm({ initialData, isEditing = false }: ListingFormProps) {
    const router = useRouter()
    const supabase = createClient()
    const { uploadImage: uploadToCloudinary, uploading: cloudinaryUploading } = useCloudinaryUpload()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        price: initialData?.price || '',
        location: initialData?.location || '',
        description: initialData?.description || '',
        cover_image: initialData?.cover_image || null,
        video_url: initialData?.video_url || null,
        property_title: initialData?.property_title || '',
        published: initialData?.published || false,
        whatsapp_number: initialData?.whatsapp_number || '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleToggle = () => {
        setFormData((prev) => ({ ...prev, published: !prev.published }))
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0]
            if (!file) return

            const result = await uploadToCloudinary(file, 'property-images')
            if (result) {
                setFormData((prev) => ({ ...prev, cover_image: result.url }))
            }
        } catch (err) {
            console.error('Upload failed:', err)
            setError('Failed to upload image')
        }
    }

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0]
            if (!file) return

            // Basic validation
            if (file.size > 50 * 1024 * 1024) { // 50MB limit
                setError('Video file is too large (max 50MB)')
                return
            }

            const result = await uploadToCloudinary(file, 'property-videos')
            if (result) {
                setFormData((prev) => ({ ...prev, video_url: result.url }))
            }
        } catch (err) {
            console.error('Video upload failed:', err)
            setError('Failed to upload video')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const listingData = {
                title: formData.title,
                price: formData.price ? parseFloat(formData.price.toString()) : null,
                location: formData.location,
                description: formData.description,
                cover_image: formData.cover_image,
                video_url: formData.video_url,
                property_title: formData.property_title || null,
                published: formData.published,
                whatsapp_number: formData.whatsapp_number || null,
            }

            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('Not authenticated')

            if (isEditing && initialData?.id) {
                const { error } = await supabase
                    .from('listings')
                    .update({ ...listingData, updated_at: new Date().toISOString() })
                    .eq('id', initialData.id)

                if (error) throw error
            } else {
                const { error } = await supabase
                    .from('listings')
                    .insert([listingData])

                if (error) throw error
            }

            router.push('/admin/listings')
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column - Main Info */}
                <div className="md:col-span-2 space-y-6">
                    <div className="card bg-gray-900 border-gray-800">
                        <h3 className="text-lg font-medium mb-4">Property Details</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="label" htmlFor="title">Property Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="e.g. Modern Beachfront Villa"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label" htmlFor="price">Price (₦)</label>
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="25000000"
                                    />
                                </div>
                                <div>
                                    <label className="label" htmlFor="location">Location</label>
                                    <input
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="e.g. Lekki Phase 1, Lagos"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="label" htmlFor="property_title">Property Title / Document Type</label>
                                <select
                                    id="property_title"
                                    name="property_title"
                                    value={formData.property_title}
                                    onChange={handleChange}
                                    className="input"
                                >
                                    <option value="">Select document type...</option>
                                    <option value="Certificate of Occupancy (C of O)">Certificate of Occupancy (C of O)</option>
                                    <option value="Governor's Consent">Governor's Consent</option>
                                    <option value="Deed of Assignment">Deed of Assignment</option>
                                    <option value="Registered Survey">Registered Survey</option>
                                    <option value="Excision">Excision</option>
                                    <option value="Gazette">Gazette</option>
                                    <option value="Receipt & Survey Plan">Receipt & Survey Plan</option>
                                    <option value="Power of Attorney">Power of Attorney</option>
                                    <option value="Letter of Allocation">Letter of Allocation</option>
                                    <option value="Deed of Sublease">Deed of Sublease</option>
                                    <option value="Deed of Lease">Deed of Lease</option>
                                    <option value="Family Receipt">Family Receipt</option>
                                    <option value="Community Receipt">Community Receipt</option>
                                    <option value="In Process">In Process</option>
                                    <option value="Other">Other</option>
                                </select>
                                <p className="text-xs text-gray-400 mt-1">
                                    Select the legal documentation status of this property
                                </p>
                            </div>

                            <div>
                                <label className="label" htmlFor="whatsapp_number">WhatsApp Number (with country code)</label>
                                <input
                                    id="whatsapp_number"
                                    name="whatsapp_number"
                                    value={formData.whatsapp_number}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="e.g. 2348012345678"
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                    Include country code (e.g., 234 for Nigeria). No '+' or spaces.
                                </p>
                            </div>

                            <div>
                                <label className="label" htmlFor="description">Description (Markdown)</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="input min-h-[150px] resize-y"
                                    placeholder="Describe the property features..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Media & Settings */}
                <div className="space-y-6">
                    {/* Publish Status */}
                    <div className="card bg-gray-900 border-gray-800">
                        <h3 className="text-lg font-medium mb-4">Status</h3>
                        <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                            <span className={`text-sm font-medium ${formData.published ? 'text-green-400' : 'text-gray-400'}`}>
                                {formData.published ? 'Published' : 'Draft'}
                            </span>
                            <button
                                type="button"
                                onClick={handleToggle}
                                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${formData.published ? 'bg-green-500' : 'bg-gray-700'}
                `}
                            >
                                <span
                                    className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${formData.published ? 'translate-x-6' : 'translate-x-1'}
                  `}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div className="card bg-gray-900 border-gray-800">
                        <h3 className="text-lg font-medium mb-4">Cover Image</h3>

                        <div className="space-y-4">
                            {formData.cover_image && (
                                <div className="aspect-video relative rounded-lg overflow-hidden border border-gray-700">
                                    <img
                                        src={formData.cover_image}
                                        alt="Cover preview"
                                        className="object-cover w-full h-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, cover_image: null }))}
                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            )}

                            {!formData.cover_image && (
                                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-gray-500 transition-colors group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={cloudinaryUploading}
                                        className="hidden"
                                        id="cover-upload"
                                    />
                                    <label
                                        htmlFor="cover-upload"
                                        className="cursor-pointer block"
                                    >
                                        {cloudinaryUploading ? (
                                            <span className="text-gray-400 animate-pulse">Uploading...</span>
                                        ) : (
                                            <>
                                                <span className="text-4xl block mb-2 group-hover:scale-110 transition-transform">📷</span>
                                                <span className="text-sm text-gray-400">Upload Cover Image</span>
                                            </>
                                        )}
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Property Video */}
                    <div className="card bg-gray-900 border-gray-800">
                        <h3 className="text-lg font-medium mb-4">Property Video</h3>

                        <div className="space-y-4">
                            {formData.video_url && (
                                <div className="aspect-video relative rounded-lg overflow-hidden border border-gray-700 bg-black">
                                    <video
                                        src={formData.video_url}
                                        controls
                                        className="w-full h-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, video_url: null }))}
                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            )}

                            {!formData.video_url && (
                                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-gray-500 transition-colors group">
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={handleVideoUpload}
                                        disabled={cloudinaryUploading}
                                        className="hidden"
                                        id="video-upload"
                                    />
                                    <label
                                        htmlFor="video-upload"
                                        className="cursor-pointer block"
                                    >
                                        {cloudinaryUploading ? (
                                            <span className="text-gray-400 animate-pulse">Uploading...</span>
                                        ) : (
                                            <>
                                                <span className="text-4xl block mb-2 group-hover:scale-110 transition-transform">🎥</span>
                                                <span className="text-sm text-gray-400">Upload Walkthrough Video</span>
                                            </>
                                        )}
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg flex items-center gap-3">
                    <span className="text-xl">⚠️</span>
                    {error}
                </div>
            )}

            <div className="flex justify-end gap-4 sticky bottom-4 bg-[#0a0a0a]/90 backdrop-blur-md p-4 rounded-xl border border-white/5 shadow-2xl z-50">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="btn-outline px-6"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading || cloudinaryUploading}
                    className="btn-primary px-8"
                >
                    {loading ? 'Saving...' : (isEditing ? 'Update Listing' : 'Create Listing')}
                </button>
            </div>
        </form>
    )
}
