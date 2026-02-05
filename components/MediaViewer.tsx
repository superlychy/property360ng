'use client'

import { useState } from 'react'

interface MediaViewerProps {
    images: string[]
    videoUrl?: string | null
}

export default function MediaViewer({ images, videoUrl }: MediaViewerProps) {
    const [activeTab, setActiveTab] = useState<'images' | 'video'>('images')
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    if (images.length === 0 && !videoUrl) {
        return null
    }

    return (
        <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex gap-2 border-b border-gray-800">
                {images.length > 0 && (
                    <button
                        onClick={() => setActiveTab('images')}
                        className={`px-6 py-3 font-medium transition-colors border-b-2 ${activeTab === 'images'
                                ? 'border-blue-500 text-blue-400'
                                : 'border-transparent text-gray-400 hover:text-gray-300'
                            }`}
                    >
                        📷 Images ({images.length})
                    </button>
                )}
                {videoUrl && (
                    <button
                        onClick={() => setActiveTab('video')}
                        className={`px-6 py-3 font-medium transition-colors border-b-2 ${activeTab === 'video'
                                ? 'border-blue-500 text-blue-400'
                                : 'border-transparent text-gray-400 hover:text-gray-300'
                            }`}
                    >
                        🎥 Video
                    </button>
                )}
            </div>

            {/* Content */}
            {activeTab === 'images' && images.length > 0 && (
                <div className="space-y-4">
                    {/* Main Image */}
                    <div className="aspect-video rounded-xl overflow-hidden border border-gray-800 bg-black">
                        <img
                            src={images[selectedImageIndex]}
                            alt={`Property image ${selectedImageIndex + 1}`}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Thumbnail Grid */}
                    {images.length > 1 && (
                        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                            {images.map((url, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImageIndex === index
                                            ? 'border-blue-500 ring-2 ring-blue-500/50'
                                            : 'border-gray-700 hover:border-gray-500'
                                        }`}
                                >
                                    <img
                                        src={url}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Image Counter */}
                    <div className="text-center text-sm text-gray-400">
                        Image {selectedImageIndex + 1} of {images.length}
                    </div>
                </div>
            )}

            {activeTab === 'video' && videoUrl && (
                <div className="aspect-video rounded-xl overflow-hidden border border-gray-800 bg-black">
                    <video
                        src={videoUrl}
                        controls
                        className="w-full h-full"
                        controlsList="nodownload"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    )
}
