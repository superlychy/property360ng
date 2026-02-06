-- Migration: Add property_title column to listings table
-- Date: 2026-02-06

-- Add property_title column
ALTER TABLE listings ADD COLUMN IF NOT EXISTS property_title TEXT;

-- Add comment for documentation
COMMENT ON COLUMN listings.property_title IS 'Legal documentation type (C of O, Governor''s Consent, etc.)';
