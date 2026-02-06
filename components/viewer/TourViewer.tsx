'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Scene, Hotspot } from '@/types'

interface TourViewerProps {
    scenes: (Scene & { hotspots: Hotspot[] })[]
    listingTitle: string
    listingId: string
}

declare global {
    interface Window {
        pannellum: any
    }
}

export default function TourViewer({ scenes, listingTitle, listingId }: TourViewerProps) {
    const viewerRef = useRef<HTMLDivElement>(null)
    const pannellumInstance = useRef<any>(null)
    const router = useRouter()

    const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
    const [pannellumLoaded, setPannellumLoaded] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [showSceneMenu, setShowSceneMenu] = useState(false)

    const currentScene = scenes[currentSceneIndex]

    // Load Pannellum library
    useEffect(() => {
        if (typeof window === 'undefined') return

        if (window.pannellum) {
            setPannellumLoaded(true)
            return
        }

        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css'
        document.head.appendChild(link)

        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js'
        script.async = true
        script.onload = () => setPannellumLoaded(true)
        document.body.appendChild(script)

        return () => {
            if (document.head.contains(link)) document.head.removeChild(link)
            if (document.body.contains(script)) document.body.removeChild(script)
        }
    }, [])

    // Initialize/update viewer when scene changes
    useEffect(() => {
        if (!pannellumLoaded || !viewerRef.current || !currentScene) return


        // Destroy existing viewer
        if (pannellumInstance.current) {
            try {
                pannellumInstance.current.destroy()
            } catch (e) {
                console.error('Error destroying viewer:', e)
            }
            pannellumInstance.current = null
        }

        // Create hotspots for Pannellum
        const hotspots = currentScene.hotspots.map(h => {
            const targetScene = scenes.find(s => s.id === h.target_scene_id)
            const targetIndex = scenes.findIndex(s => s.id === h.target_scene_id)

            return {
                id: h.id,
                pitch: h.pitch,
                yaw: h.yaw,
                type: 'custom',
                cssClass: 'tour-hotspot',
                createTooltipFunc: (hotSpotDiv: HTMLElement) => {
                    hotSpotDiv.innerHTML = `
                        <div class="tour-hotspot-tooltip">
                            <span class="tour-hotspot-icon">→</span>
                            <span class="tour-hotspot-label">${h.label || targetScene?.name || 'Go'}</span>
                        </div>
                    `
                },
                clickHandlerFunc: () => {
                    if (targetIndex !== -1) {
                        setCurrentSceneIndex(targetIndex)
                    }
                }
            }
        })

        // Initialize viewer
        try {
            const viewer = window.pannellum.viewer(viewerRef.current, {
                type: 'equirectangular',
                panorama: currentScene.image_360_url,
                autoLoad: true,
                showControls: false,
                mouseZoom: true,
                draggable: true,
                hotSpots: hotspots,
                compass: false,
                autoRotate: -2,
                autoRotateInactivityDelay: 3000,
            })

            pannellumInstance.current = viewer
        } catch (error) {
            console.error('[TourViewer] Error initializing viewer:', error)
        }

        return () => {
            if (pannellumInstance.current) {
                try {
                    pannellumInstance.current.destroy()
                } catch (e) {
                    // Ignore cleanup errors
                }
                pannellumInstance.current = null
            }
        }
    }, [pannellumLoaded, currentSceneIndex, scenes])

    // Fullscreen handling
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }
        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }, [])

    const handleExit = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen()
        }
        router.push(`/listings/${listingId}`)
    }

    if (!currentScene) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">📷</div>
                    <h2 className="text-2xl font-bold mb-2">No scenes available</h2>
                    <p className="text-gray-400">This tour doesn't have any scenes yet.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black">
            {/* Viewer */}
            <div ref={viewerRef} className="w-full h-full" />

            {/* Loading Overlay */}
            {!pannellumLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <div className="text-center">
                        <div className="animate-spin text-6xl mb-4">⏳</div>
                        <p className="text-xl text-gray-400">Loading virtual tour...</p>
                    </div>
                </div>
            )}

            {/* UI Overlay */}
            {pannellumLoaded && (
                <>
                    {/* Top Bar */}
                    <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-20">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-xl font-bold">{listingTitle}</h1>
                                <p className="text-sm text-gray-400">{currentScene.name}</p>
                            </div>
                            <button
                                onClick={handleExit}
                                className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                                title="Exit tour"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
                        <div className="flex items-center justify-between gap-4">
                            {/* Scene Navigation */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentSceneIndex(Math.max(0, currentSceneIndex - 1))}
                                    disabled={currentSceneIndex === 0}
                                    className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Previous scene"
                                >
                                    ←
                                </button>

                                <button
                                    onClick={() => setShowSceneMenu(!showSceneMenu)}
                                    className="px-4 py-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors text-sm"
                                >
                                    {currentSceneIndex + 1} / {scenes.length}
                                </button>

                                <button
                                    onClick={() => setCurrentSceneIndex(Math.min(scenes.length - 1, currentSceneIndex + 1))}
                                    disabled={currentSceneIndex === scenes.length - 1}
                                    className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Next scene"
                                >
                                    →
                                </button>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleFullscreen}
                                    className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors text-sm"
                                    title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                                >
                                    {isFullscreen ? '⊡' : '⛶'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Scene Menu */}
                    {showSceneMenu && (
                        <div className="absolute bottom-20 left-4 right-4 md:left-auto md:w-80 bg-black/90 backdrop-blur-lg rounded-xl p-4 z-30 max-h-96 overflow-y-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold">All Scenes</h3>
                                <button
                                    onClick={() => setShowSceneMenu(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="space-y-2">
                                {scenes.map((scene, index) => (
                                    <button
                                        key={scene.id}
                                        onClick={() => {
                                            setCurrentSceneIndex(index)
                                            setShowSceneMenu(false)
                                        }}
                                        className={`
                      w-full text-left p-3 rounded-lg transition-colors
                      ${index === currentSceneIndex
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-white/5 hover:bg-white/10'
                                            }
                    `}
                                    >
                                        <div className="font-medium">{scene.name}</div>
                                        <div className="text-xs text-gray-400 mt-1">
                                            {scene.hotspots.length} hotspot{scene.hotspots.length !== 1 ? 's' : ''}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                </>
            )}

            {/* Custom Styles */}
            <style jsx global>{`
        .tour-hotspot {
          width: 50px;
          height: 50px;
          background: rgba(14, 165, 233, 0.95);
          border: 4px solid white;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(14, 165, 233, 0.5);
          animation: pulse-hotspot 2s infinite;
        }
        
        @keyframes pulse-hotspot {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 4px 20px rgba(14, 165, 233, 0.5);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 6px 30px rgba(14, 165, 233, 0.8);
          }
        }
        
        .tour-hotspot:hover {
          transform: scale(1.3) !important;
          background: rgba(217, 70, 239, 0.95);
          box-shadow: 0 6px 30px rgba(217, 70, 239, 0.8);
        }
        
        .tour-hotspot-tooltip {
          background: rgba(0, 0, 0, 0.95);
          color: white;
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 15px;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 15px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
          font-weight: 500;
        }
        
        .tour-hotspot-icon {
          font-size: 18px;
        }
        
        .pnlm-container {
          font-family: inherit !important;
        }
      `}</style>
        </div>
    )
}
