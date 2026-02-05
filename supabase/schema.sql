-- Real Estate 360° Virtual Tour Application
-- Database Schema for Supabase (PostgreSQL)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- LISTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    price NUMERIC(12, 2),
    location TEXT NOT NULL,
    description TEXT,
    cover_image TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_listings_published ON listings(published);
CREATE INDEX idx_listings_created_at ON listings(created_at DESC);

-- ============================================
-- SCENES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS scenes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    image_360_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for faster queries
CREATE INDEX idx_scenes_listing_id ON scenes(listing_id);
CREATE INDEX idx_scenes_order ON scenes(listing_id, "order");

-- ============================================
-- HOTSPOTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS hotspots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scene_id UUID NOT NULL REFERENCES scenes(id) ON DELETE CASCADE,
    yaw NUMERIC(6, 2) NOT NULL,
    pitch NUMERIC(6, 2) NOT NULL,
    target_scene_id UUID NOT NULL REFERENCES scenes(id) ON DELETE CASCADE,
    label TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for faster queries
CREATE INDEX idx_hotspots_scene_id ON hotspots(scene_id);
CREATE INDEX idx_hotspots_target_scene_id ON hotspots(target_scene_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotspots ENABLE ROW LEVEL SECURITY;

-- LISTINGS POLICIES
-- Public can read published listings
CREATE POLICY "Public can view published listings"
    ON listings FOR SELECT
    USING (published = true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Authenticated users can manage listings"
    ON listings FOR ALL
    USING (auth.role() = 'authenticated');

-- SCENES POLICIES
-- Public can read scenes of published listings
CREATE POLICY "Public can view scenes of published listings"
    ON scenes FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM listings
            WHERE listings.id = scenes.listing_id
            AND listings.published = true
        )
    );

-- Authenticated users can manage all scenes
CREATE POLICY "Authenticated users can manage scenes"
    ON scenes FOR ALL
    USING (auth.role() = 'authenticated');

-- HOTSPOTS POLICIES
-- Public can read hotspots of scenes in published listings
CREATE POLICY "Public can view hotspots of published listings"
    ON hotspots FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM scenes
            JOIN listings ON listings.id = scenes.listing_id
            WHERE scenes.id = hotspots.scene_id
            AND listings.published = true
        )
    );

-- Authenticated users can manage all hotspots
CREATE POLICY "Authenticated users can manage hotspots"
    ON hotspots FOR ALL
    USING (auth.role() = 'authenticated');

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for listings table
CREATE TRIGGER update_listings_updated_at
    BEFORE UPDATE ON listings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STORAGE BUCKET SETUP
-- ============================================
-- Run this in Supabase Dashboard > Storage

-- Create bucket for property images
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('property-images', 'property-images', true);

-- Storage policy: Public can read
-- CREATE POLICY "Public can view property images"
--     ON storage.objects FOR SELECT
--     USING (bucket_id = 'property-images');

-- Storage policy: Authenticated users can upload
-- CREATE POLICY "Authenticated users can upload property images"
--     ON storage.objects FOR INSERT
--     WITH CHECK (
--         bucket_id = 'property-images'
--         AND auth.role() = 'authenticated'
--     );

-- Storage policy: Authenticated users can update
-- CREATE POLICY "Authenticated users can update property images"
--     ON storage.objects FOR UPDATE
--     USING (
--         bucket_id = 'property-images'
--         AND auth.role() = 'authenticated'
--     );

-- Storage policy: Authenticated users can delete
-- CREATE POLICY "Authenticated users can delete property images"
--     ON storage.objects FOR DELETE
--     USING (
--         bucket_id = 'property-images'
--         AND auth.role() = 'authenticated'
--     );
