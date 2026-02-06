'use client'

import { useState, useEffect } from 'react'

interface MediaViewerProps {
    images: string[]
    videoUrl?: string | null
}

export default function MediaViewer({ images, videoUrl }: MediaViewerProps) {
    const [activeTab, setActiveTab] = useState<'images' | 'video'>('images')
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)

    // Keyboard navigation
    useEffect(() => {
        if (!isFullscreen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsFullscreen(false)
            } else if (e.key === 'ArrowLeft') {
                goToPrevious()
            } else if (e.key === 'ArrowRight') {
                goToNext()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isFullscreen, selectedImageIndex, images.length])

    // Prevent body scroll when fullscreen
    useEffect(() => {
        if (isFullscreen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isFullscreen])

    const goToNext = () => {
        setSelectedImageIndex((prev) => (prev + 1) % images.length)
    }

    const goToPrevious = () => {
        setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const openFullscreen = (index: number) => {
        setSelectedImageIndex(index)
        setIsFullscreen(true)
    }

    if (images.length === 0 && !videoUrl) {
        return null
    }

    return (
        <>
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
                            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Images ({images.length})
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
                            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Video
                        </button>
                    )}
                </div>

                {/* Content */}
                {activeTab === 'images' && images.length > 0 && (
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div
                            className="aspect-video rounded-xl overflow-hidden border border-gray-800 bg-black cursor-pointer group relative"
                            onClick={() => openFullscreen(selectedImageIndex)}
                        >
                            <img
                                src={images[selectedImageIndex]}
                                alt={`Property image ${selectedImageIndex + 1}`}
                                className="w-full h-full object-contain"
                            />
                            {/* Fullscreen hint overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="text-white text-center">
                                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                    <p className="text-lg font-medium">Click to view fullscreen</p>
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail Grid */}
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                                {images.map((url, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${selectedImageIndex === index
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

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-4 right-4 z-50 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all backdrop-blur-sm"
                        aria-label="Close fullscreen"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Image Counter */}
                    <div className="absolute top-4 left-4 z-50 px-4 py-2 bg-black/50 text-white rounded-full backdrop-blur-sm">
                        {selectedImageIndex + 1} / {images.length}
                    </div>

                    {/* Previous Button */}
                    {images.length > 1 && (
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all backdrop-blur-sm"
                            aria-label="Previous image"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Main Image */}
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                        <img
                            src={images[selectedImageIndex]}
                            alt={`Property image ${selectedImageIndex + 1}`}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>

                    {/* Next Button */}
                    {images.length > 1 && (
                        <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all backdrop-blur-sm"
                            aria-label="Next image"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {/* Thumbnail Strip at Bottom */}
                    {images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-4xl w-full px-4">
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                                {images.map((url, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImageIndex === index
                                            ? 'border-blue-500 ring-2 ring-blue-500/50 scale-110'
                                            : 'border-white/20 hover:border-white/50'
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
                        </div>
                    )}

                    {/* Keyboard Hint */}
                    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/50 text-sm">
                        Use arrow keys or click buttons to navigate • ESC to close
                    </div>
                </div>
            )}
        </>
    )
}
