'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { uploadImage } from '@/lib/utils/image-upload'

interface MediaGalleryManagerProps {
    listingId: string
    initialImages?: string[]
    initialVideo?: string | null
}

export default function MediaGalleryManager({
    listingId,
    initialImages = [],
    initialVideo = null
}: MediaGalleryManagerProps) {
    const supabase = createClient()
    const [images, setImages] = useState<string[]>(initialImages)
    const [videoUrl, setVideoUrl] = useState<string | null>(initialVideo)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)
            setError(null)
            const files = e.target.files
            if (!files || files.length === 0) return

            const uploadPromises = Array.from(files).map(file =>
                uploadImage(file, 'property-images')
            )

            const urls = await Promise.all(uploadPromises)
            const newImages = [...images, ...urls]
            setImages(newImages)

            // Save to database
            const { error: updateError } = await supabase
                .from('listings')
                .update({ gallery_images: newImages })
                .eq('id', listingId)

            if (updateError) throw updateError
        } catch (err) {
            console.error('Upload failed:', err)
            setError('Failed to upload images')
        } finally {
            setUploading(false)
        }
    }

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)
            setError(null)
            const file = e.target.files?.[0]
            if (!file) return

            const url = await uploadImage(file, 'property-images')
            setVideoUrl(url)

            // Save to database
            const { error: updateError } = await supabase
                .from('listings')
                .update({ video_url: url })
                .eq('id', listingId)

            if (updateError) throw updateError
        } catch (err) {
            console.error('Upload failed:', err)
            setError('Failed to upload video')
        } finally {
            setUploading(false)
        }
    }

    const handleRemoveImage = async (urlToRemove: string) => {
        const newImages = images.filter(url => url !== urlToRemove)
        setImages(newImages)

        // Update database
        const { error: updateError } = await supabase
            .from('listings')
            .update({ gallery_images: newImages })
            .eq('id', listingId)

        if (updateError) {
            console.error('Failed to remove image:', updateError)
            setError('Failed to remove image')
        }
    }

    const handleRemoveVideo = async () => {
        setVideoUrl(null)

        // Update database
        const { error: updateError } = await supabase
            .from('listings')
            .update({ video_url: null })
            .eq('id', listingId)

        if (updateError) {
            console.error('Failed to remove video:', updateError)
            setError('Failed to remove video')
        }
    }

    return (
        <div className="space-y-6">
            {/* Image Gallery */}
            <div className="card bg-gray-900 border-gray-800">
                <h3 className="text-lg font-medium mb-4">Image Gallery</h3>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {images.map((url, index) => (
                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-gray-700 group">
                            <img
                                src={url}
                                alt={`Gallery ${index + 1}`}
                                className="object-cover w-full h-full"
                            />
                            <button
                                onClick={() => handleRemoveImage(url)}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove image"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="hidden"
                        id="gallery-upload"
                    />
                    <label htmlFor="gallery-upload" className="cursor-pointer block">
                        {uploading ? (
                            <span className="text-gray-400">Uploading...</span>
                        ) : (
                            <>
                                <span className="text-4xl block mb-2">🖼️</span>
                                <span className="text-sm text-gray-400">
                                    Click to upload images (multiple)
                                </span>
                                <span className="text-xs text-gray-500 block mt-1">
                                    {images.length} image(s) uploaded
                                </span>
                            </>
                        )}
                    </label>
                </div>
            </div>

            {/* Video Upload */}
            <div className="card bg-gray-900 border-gray-800">
                <h3 className="text-lg font-medium mb-4">Property Video</h3>

                {videoUrl ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-700 mb-4">
                        <video
                            src={videoUrl}
                            controls
                            className="w-full h-full"
                        />
                        <button
                            onClick={handleRemoveVideo}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                            title="Remove video"
                        >
                            ×
                        </button>
                    </div>
                ) : (
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            disabled={uploading}
                            className="hidden"
                            id="video-upload"
                        />
                        <label htmlFor="video-upload" className="cursor-pointer block">
                            {uploading ? (
                                <span className="text-gray-400">Uploading...</span>
                            ) : (
                                <>
                                    <span className="text-4xl block mb-2">🎥</span>
                                    <span className="text-sm text-gray-400">
                                        Click to upload video
                                    </span>
                                    <span className="text-xs text-gray-500 block mt-1">
                                        MP4, WebM, or other video formats
                                    </span>
                                </>
                            )}
                        </label>
                    </div>
                )}
            </div>
        </div>
    )
}
