import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import HotspotEditor from '@/components/admin/HotspotEditor'

type Props = {
    params: Promise<{ id: string; sceneId: string }>
}

export default async function HotspotsPage({ params }: Props) {
    const { id: listingId, sceneId } = await params
    const supabase = await createClient()

    // Fetch the current scene
    const { data: scene, error: sceneError } = await supabase
        .from('scenes')
        .select('*')
        .eq('id', sceneId)
        .single()

    if (sceneError || !scene) {
        notFound()
    }

    // Fetch all scenes for this listing (for target scene dropdown)
    const { data: allScenes, error: scenesError } = await supabase
        .from('scenes')
        .select('*')
        .eq('listing_id', listingId)
        .order('order', { ascending: true })

    if (scenesError || !allScenes) {
        return (
            <div className="p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
                Error loading scenes: {scenesError?.message}
            </div>
        )
    }

    // Fetch existing hotspots for this scene
    const { data: hotspots, error: hotspotsError } = await supabase
        .from('hotspots')
        .select('*')
        .eq('scene_id', sceneId)

    if (hotspotsError) {
        return (
            <div className="p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
                Error loading hotspots: {hotspotsError.message}
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Hotspot Editor</h1>
                <p className="text-gray-400">
                    {scene.name} • {hotspots?.length || 0} hotspot{hotspots?.length !== 1 ? 's' : ''}
                </p>
            </div>

            <HotspotEditor
                scene={scene}
                allScenes={allScenes}
                initialHotspots={hotspots || []}
                listingId={listingId}
            />
        </div>
    )
}
