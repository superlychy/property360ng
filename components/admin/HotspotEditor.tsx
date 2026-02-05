'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Scene, Hotspot } from '@/types'

// Extend Window type for Pannellum
declare global {
    interface Window {
        pannellum: any
    }
}

interface HotspotEditorProps {
    scene: Scene
    allScenes: Scene[]
    initialHotspots: Hotspot[]
    listingId: string
}

export default function HotspotEditor({ scene, allScenes, initialHotspots, listingId }: HotspotEditorProps) {
    const viewerRef = useRef<HTMLDivElement>(null)
    const pannellumInstance = useRef<any>(null)
    const router = useRouter()
    const supabase = createClient()

    const [hotspots, setHotspots] = useState<Hotspot[]>(initialHotspots)
    const [editMode, setEditMode] = useState(false) // Toggle between view and edit mode
    const [isPlacingHotspot, setIsPlacingHotspot] = useState(false)
    const [newHotspot, setNewHotspot] = useState<{
        yaw: number
        pitch: number
        targetSceneId: string
        label: string
    } | null>(null)
    const [editingHotspot, setEditingHotspot] = useState<Hotspot | null>(null)
    const [loading, setLoading] = useState(false)
    const [pannellumLoaded, setPannellumLoaded] = useState(false)

    // Load Pannellum library
    useEffect(() => {
        if (typeof window === 'undefined') return

        // Check if already loaded
        if (window.pannellum) {
            setPannellumLoaded(true)
            return
        }

        // Load CSS
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css'
        document.head.appendChild(link)

        // Load JS
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js'
        script.async = true
        script.onload = () => setPannellumLoaded(true)
        document.body.appendChild(script)
    }, [])

    // Initialize Pannellum viewer (only once)
    useEffect(() => {
        if (!pannellumLoaded || !viewerRef.current || pannellumInstance.current) return

        try {
            const viewer = window.pannellum.viewer(viewerRef.current, {
                type: 'equirectangular',
                panorama: scene.image_360_url,
                autoLoad: true,
                showControls: true,
                mouseZoom: true,
                draggable: true,
                hotSpots: hotspots.map(h => ({
                    id: h.id,
                    pitch: h.pitch,
                    yaw: h.yaw,
                    type: 'custom',
                    cssClass: 'custom-hotspot',
                    createTooltipFunc: (hotSpotDiv: HTMLElement) => {
                        const targetScene = allScenes.find(s => s.id === h.target_scene_id)
                        hotSpotDiv.innerHTML = `
                            <div class="hotspot-tooltip">
                                <span class="hotspot-icon">→</span>
                                <span class="hotspot-label">${h.label || targetScene?.name || 'Go'}</span>
                            </div>
                        `
                    },
                    clickHandlerFunc: () => {
                        if (!isPlacingHotspot && editMode) {
                            setEditingHotspot(h)
                        }
                    }
                }))
            })

            pannellumInstance.current = viewer
        } catch (error) {
            console.error('Error initializing Pannellum:', error)
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
    }, [pannellumLoaded, scene.image_360_url])

    // Update hotspots when they change
    useEffect(() => {
        if (!pannellumInstance.current) return

        try {
            // Remove all existing hotspots
            const currentHotspots = pannellumInstance.current.getConfig().hotSpots || []
            currentHotspots.forEach((h: any) => {
                try {
                    pannellumInstance.current.removeHotSpot(h.id)
                } catch (e) {
                    // Ignore if hotspot doesn't exist
                }
            })

            // Add updated hotspots
            hotspots.forEach(h => {
                const targetScene = allScenes.find(s => s.id === h.target_scene_id)
                pannellumInstance.current.addHotSpot({
                    id: h.id,
                    pitch: h.pitch,
                    yaw: h.yaw,
                    type: 'custom',
                    cssClass: 'custom-hotspot',
                    createTooltipFunc: (hotSpotDiv: HTMLElement) => {
                        hotSpotDiv.innerHTML = `
                            <div class="hotspot-tooltip">
                                <span class="hotspot-icon">→</span>
                                <span class="hotspot-label">${h.label || targetScene?.name || 'Go'}</span>
                            </div>
                        `
                    },
                    clickHandlerFunc: () => {
                        if (!isPlacingHotspot && editMode) {
                            setEditingHotspot(h)
                        }
                    }
                })
            })
        } catch (error) {
            console.error('Error updating hotspots:', error)
        }
    }, [hotspots, editMode, isPlacingHotspot, allScenes])

    // Handle clicks for placing hotspots
    useEffect(() => {
        if (!viewerRef.current || !editMode || !isPlacingHotspot) return

        const handleClick = (e: MouseEvent) => {
            if (!pannellumInstance.current) return

            try {
                const coords = pannellumInstance.current.mouseEventToCoords(e)

                setNewHotspot({
                    yaw: coords[1],
                    pitch: coords[0],
                    targetSceneId: allScenes.filter(s => s.id !== scene.id)[0]?.id || '',
                    label: ''
                })
                setIsPlacingHotspot(false)
            } catch (e) {
                console.error('Error placing hotspot:', e)
            }
        }

        viewerRef.current.addEventListener('click', handleClick)

        return () => {
            if (viewerRef.current) {
                viewerRef.current.removeEventListener('click', handleClick)
            }
        }
    }, [editMode, isPlacingHotspot, allScenes, scene.id])

    const handleSaveNewHotspot = async () => {
        if (!newHotspot || !newHotspot.targetSceneId) return

        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('hotspots')
                .insert({
                    scene_id: scene.id,
                    yaw: newHotspot.yaw,
                    pitch: newHotspot.pitch,
                    target_scene_id: newHotspot.targetSceneId,
                    label: newHotspot.label || null
                })
                .select()
                .single()

            if (error) throw error

            setHotspots([...hotspots, data])
            setNewHotspot(null)
            router.refresh()
        } catch (error) {
            console.error('Error saving hotspot:', error)
            alert('Failed to save hotspot')
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateHotspot = async () => {
        if (!editingHotspot) return

        setLoading(true)
        try {
            const { error } = await supabase
                .from('hotspots')
                .update({
                    target_scene_id: editingHotspot.target_scene_id,
                    label: editingHotspot.label
                })
                .eq('id', editingHotspot.id)

            if (error) throw error

            setHotspots(hotspots.map(h =>
                h.id === editingHotspot.id ? editingHotspot : h
            ))
            setEditingHotspot(null)
            router.refresh()
        } catch (error) {
            console.error('Error updating hotspot:', error)
            alert('Failed to update hotspot')
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteHotspot = async (id: string) => {
        if (!confirm('Delete this hotspot?')) return

        setLoading(true)
        try {
            const { error } = await supabase
                .from('hotspots')
                .delete()
                .eq('id', id)

            if (error) throw error

            setHotspots(hotspots.filter(h => h.id !== id))
            setEditingHotspot(null)
            router.refresh()
        } catch (error) {
            console.error('Error deleting hotspot:', error)
            alert('Failed to delete hotspot')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Instructions */}
            <div className="card bg-blue-500/10 border-blue-500/20">
                <h3 className="font-medium mb-2">📍 Hotspot Editor</h3>
                <div className="text-sm text-gray-300 space-y-1">
                    <p>• <strong>View Mode:</strong> Navigate the 360° view freely</p>
                    <p>• <strong>Edit Mode:</strong> Navigation is disabled, click to place hotspots</p>
                    <p>• Hotspots allow users to navigate between scenes in the virtual tour</p>
                </div>
            </div>

            {/* 360° Viewer */}
            <div className="relative">
                <div
                    ref={viewerRef}
                    className="w-full rounded-xl overflow-hidden border border-gray-800 bg-black"
                    style={{
                        height: '600px',
                        minHeight: '600px',
                        cursor: isPlacingHotspot ? 'crosshair' : editMode ? 'not-allowed' : 'grab'
                    }}
                />

                {!pannellumLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-xl">
                        <div className="text-center">
                            <div className="animate-spin text-4xl mb-4">⏳</div>
                            <p className="text-gray-400">Loading 360° viewer...</p>
                        </div>
                    </div>
                )}

                {/* Mode Indicator */}
                {editMode && (
                    <div className="absolute top-4 left-4 bg-orange-500/90 text-white px-4 py-2 rounded-lg shadow-lg font-medium z-20">
                        ✏️ Edit Mode - Navigation Disabled
                    </div>
                )}
                {!editMode && (
                    <div className="absolute top-4 left-4 bg-blue-500/90 text-white px-4 py-2 rounded-lg shadow-lg font-medium z-20">
                        👁️ View Mode - Navigate Freely
                    </div>
                )}

                {/* Overlay to block navigation in edit mode (but allow clicks for placing hotspots) */}
                {editMode && !isPlacingHotspot && (
                    <div
                        className="absolute inset-0 z-10"
                        style={{
                            cursor: 'not-allowed',
                            background: 'transparent'
                        }}
                    />
                )}

                {isPlacingHotspot && (
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse z-20">
                        Click anywhere in the panorama to place a hotspot
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4">
                {/* Edit/View Mode Toggle */}
                <button
                    onClick={() => {
                        setEditMode(!editMode)
                        if (editMode) {
                            setIsPlacingHotspot(false)
                        }
                    }}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${editMode
                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                >
                    {editMode ? '👁️ Switch to View Mode' : '✏️ Switch to Edit Mode'}
                </button>

                <button
                    onClick={() => setIsPlacingHotspot(true)}
                    disabled={
                        !editMode ||
                        isPlacingHotspot ||
                        !!newHotspot ||
                        !!editingHotspot ||
                        allScenes.filter(s => s.id !== scene.id).length === 0
                    }
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    title={!editMode ? 'Switch to Edit Mode first' : allScenes.filter(s => s.id !== scene.id).length === 0 ? 'Add more scenes first' : ''}
                >
                    + Place New Hotspot
                </button>

                <button
                    onClick={() => router.push(`/admin/listings/${listingId}/scenes`)}
                    className="btn-outline"
                >
                    ← Back to Scenes
                </button>
            </div>

            {/* Warning if only one scene */}
            {allScenes.filter(s => s.id !== scene.id).length === 0 && (
                <div className="card bg-yellow-500/10 border-yellow-500/20">
                    <p className="text-yellow-400">
                        ⚠️ You need at least 2 scenes to create hotspots. Add more scenes first.
                    </p>
                </div>
            )}

            {/* New Hotspot Form */}
            {newHotspot && (
                <div className="card bg-green-500/10 border-green-500/20">
                    <h3 className="font-medium mb-4">New Hotspot</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">Yaw</label>
                                <input
                                    type="number"
                                    value={newHotspot.yaw.toFixed(2)}
                                    readOnly
                                    className="input bg-gray-800"
                                />
                            </div>
                            <div>
                                <label className="label">Pitch</label>
                                <input
                                    type="number"
                                    value={newHotspot.pitch.toFixed(2)}
                                    readOnly
                                    className="input bg-gray-800"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label">Target Scene *</label>
                            <select
                                value={newHotspot.targetSceneId}
                                onChange={(e) => setNewHotspot({ ...newHotspot, targetSceneId: e.target.value })}
                                className="input"
                            >
                                <option value="">Select a scene</option>
                                {allScenes.filter(s => s.id !== scene.id).map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="label">Label (optional)</label>
                            <input
                                type="text"
                                value={newHotspot.label}
                                onChange={(e) => setNewHotspot({ ...newHotspot, label: e.target.value })}
                                placeholder="e.g., Go to Kitchen"
                                className="input"
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleSaveNewHotspot}
                                disabled={loading || !newHotspot.targetSceneId}
                                className="btn-primary disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Save Hotspot'}
                            </button>
                            <button
                                onClick={() => setNewHotspot(null)}
                                className="btn-outline"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Hotspot Form */}
            {editingHotspot && (
                <div className="card bg-blue-500/10 border-blue-500/20">
                    <h3 className="font-medium mb-4">Edit Hotspot</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="label">Target Scene *</label>
                            <select
                                value={editingHotspot.target_scene_id}
                                onChange={(e) => setEditingHotspot({ ...editingHotspot, target_scene_id: e.target.value })}
                                className="input"
                            >
                                {allScenes.filter(s => s.id !== scene.id).map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="label">Label (optional)</label>
                            <input
                                type="text"
                                value={editingHotspot.label || ''}
                                onChange={(e) => setEditingHotspot({ ...editingHotspot, label: e.target.value })}
                                placeholder="e.g., Go to Kitchen"
                                className="input"
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleUpdateHotspot}
                                disabled={loading}
                                className="btn-primary disabled:opacity-50"
                            >
                                {loading ? 'Updating...' : 'Update Hotspot'}
                            </button>
                            <button
                                onClick={() => handleDeleteHotspot(editingHotspot.id)}
                                disabled={loading}
                                className="btn-outline border-red-500/30 text-red-400 hover:bg-red-500/10"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setEditingHotspot(null)}
                                className="btn-outline"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Hotspots List */}
            <div className="card">
                <h3 className="font-medium mb-4">Existing Hotspots ({hotspots.length})</h3>
                {hotspots.length === 0 ? (
                    <p className="text-gray-400 text-sm">No hotspots yet. Place one to get started!</p>
                ) : (
                    <div className="space-y-2">
                        {hotspots.map(h => {
                            const targetScene = allScenes.find(s => s.id === h.target_scene_id)
                            return (
                                <div
                                    key={h.id}
                                    className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
                                >
                                    <div>
                                        <div className="font-medium">
                                            {h.label || `Hotspot to ${targetScene?.name || 'Unknown'}`}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            → {targetScene?.name || 'Unknown scene'}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setEditingHotspot(h)}
                                        className="text-sm text-blue-400 hover:text-blue-300"
                                    >
                                        Edit
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
