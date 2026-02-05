
export type Listing = {
    id: string
    title: string
    price: number | null
    location: string
    description: string | null
    cover_image: string | null
    published: boolean
    whatsapp_number: string | null
    gallery_images: string[] | null
    video_url: string | null
    created_at: string
    updated_at: string
}

export type Scene = {
    id: string
    listing_id: string
    name: string
    order: number
    image_360_url: string
    created_at: string
}

export type Hotspot = {
    id: string
    scene_id: string
    yaw: number
    pitch: number
    target_scene_id: string
    label: string | null
    created_at: string
}

// Helper type for full listing with scenes and hotspots
export type ListingWithScenes = Listing & {
    scenes: (Scene & {
        hotspots: Hotspot[]
    })[]
}
