'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useCloudinaryUpload } from '@/lib/hooks/useCloudinaryUpload'
import type { Scene } from '@/types'
import Link from 'next/link'

interface SceneListProps {
    scenes: Scene[]
    listingId: string
}

export default function SceneList({ scenes, listingId }: SceneListProps) {
    const router = useRouter()
    const supabase = createClient()
    const { uploadImage: uploadToCloudinary, uploading: cloudinaryUploading } = useCloudinaryUpload()
    const [newSceneName, setNewSceneName] = useState('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            if (!newSceneName) {
                setNewSceneName(file.name.replace(/\.[^/.]+$/, ''))
            }
        }
    }

    const handleAddScene = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedFile || !newSceneName.trim()) return

        try {
            const result = await uploadToCloudinary(selectedFile, 'property-360-scenes')
            if (!result) {
                throw new Error('Upload failed')
            }

            const maxOrder = Math.max(...scenes.map(s => s.order), -1)

            const { error } = await supabase
                .from('scenes')
                .insert({
                    listing_id: listingId,
                    name: newSceneName.trim(),
                    image_360_url: result.url,
                    order: maxOrder + 1,
                })

            if (error) throw error

            setNewSceneName('')
            setSelectedFile(null)
            router.refresh()
        } catch (err) {
            console.error('Failed to add scene:', err)
            alert('Failed to add scene')
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this scene? This will also remove all hotspots.')) return

        try {
            setDeletingId(id)
            const { error } = await supabase
                .from('scenes')
                .delete()
                .eq('id', id)

            if (error) throw error
            router.refresh()
        } catch (err) {
            console.error('Failed to delete scene:', err)
            alert('Failed to delete scene')
        } finally {
            setDeletingId(null)
        }
    }

    const handleReorder = async (id: string, direction: 'up' | 'down') => {
        const index = scenes.findIndex(s => s.id === id)
        if (index === -1) return
        if (direction === 'up' && index === 0) return
        if (direction === 'down' && index === scenes.length - 1) return

        const otherIndex = direction === 'up' ? index - 1 : index + 1
        const scene = scenes[index]
        const otherScene = scenes[otherIndex]

        try {
            await supabase
                .from('scenes')
                .update({ order: otherScene.order })
                .eq('id', scene.id)

            await supabase
                .from('scenes')
                .update({ order: scene.order })
                .eq('id', otherScene.id)

            router.refresh()
        } catch (err) {
            console.error('Failed to reorder:', err)
            alert('Failed to reorder scenes')
        }
    }

    return (
        <div className="space-y-8">
            {/* Add New Scene Form */}
            <div className="card bg-gray-900 border-gray-800">
                <h3 className="text-lg font-medium mb-4">Add New Scene</h3>
                <form onSubmit={handleAddScene} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label" htmlFor="scene-name">Scene Name</label>
                            <input
                                id="scene-name"
                                type="text"
                                value={newSceneName}
                                onChange={(e) => setNewSceneName(e.target.value)}
                                className="input"
                                placeholder="e.g. Living Room, Kitchen"
                                required
                            />
                        </div>
                        <div>
                            <label className="label" htmlFor="scene-file">360° Image</label>
                            <input
                                id="scene-file"
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="input"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={cloudinaryUploading || !selectedFile || !newSceneName.trim()}
                        className="btn-primary"
                    >
                        {cloudinaryUploading ? 'Uploading...' : '+ Add Scene'}
                    </button>
                </form>
            </div>

            {/* Scenes List */}
            {scenes.length === 0 ? (
                <div className="text-center py-20 bg-gray-900 border border-gray-800 rounded-xl border-dashed">
                    <div className="text-4xl mb-4">📷</div>
                    <h3 className="text-xl font-medium mb-2">No scenes yet</h3>
                    <p className="text-gray-400">Upload your first 360° image to get started.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Scenes ({scenes.length})</h3>
                    {scenes.map((scene, index) => (
                        <div key={scene.id} className="card bg-gray-900 border-gray-800 group hover:border-gray-600">
                            <div className="flex gap-4">
                                {/* Thumbnail */}
                                <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                                    <img
                                        src={scene.image_360_url}
                                        alt={scene.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h4 className="text-lg font-medium truncate">{scene.name}</h4>
                                            <p className="text-sm text-gray-400">Order: {scene.order + 1}</p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <Link
                                            href={`/admin/listings/${listingId}/scenes/${scene.id}/hotspots`}
                                            className="btn-primary text-sm py-2 px-4"
                                        >
                                            🎯 Edit Hotspots
                                        </Link>

                                        <button
                                            onClick={() => handleReorder(scene.id, 'up')}
                                            disabled={index === 0}
                                            className="btn-outline text-sm py-2 px-3 disabled:opacity-30"
                                            title="Move up"
                                        >
                                            ↑
                                        </button>

                                        <button
                                            onClick={() => handleReorder(scene.id, 'down')}
                                            disabled={index === scenes.length - 1}
                                            className="btn-outline text-sm py-2 px-3 disabled:opacity-30"
                                            title="Move down"
                                        >
                                            ↓
                                        </button>

                                        <button
                                            onClick={() => handleDelete(scene.id)}
                                            disabled={deletingId === scene.id}
                                            className="btn-outline text-sm py-2 px-3 text-red-400 border-red-500/30 hover:bg-red-500/10"
                                        >
                                            {deletingId === scene.id ? '...' : '🗑'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
