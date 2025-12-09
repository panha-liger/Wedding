-- Run this in your Supabase SQL Editor

-- Create gallery_photos table
CREATE TABLE IF NOT EXISTS gallery_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_gallery_photos_created_at ON gallery_photos(created_at DESC);

-- Enable Row Level Security
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read photos (public gallery)
CREATE POLICY "Public read access" ON gallery_photos
  FOR SELECT
  USING (true);

-- Policy: No direct inserts (only via API with service role)
-- This prevents direct DB writes
CREATE POLICY "No public inserts" ON gallery_photos
  FOR INSERT
  WITH CHECK (false);

-- Create storage bucket (if not exists via UI, run this or create manually)
-- Note: You'll need to create the bucket in Supabase Dashboard > Storage
-- Bucket name: gallery
-- Public: Yes
-- File size limit: 5MB
-- Allowed MIME types: image/jpeg, image/png, image/webp, image/gif

-- Storage policies (apply in Supabase Dashboard > Storage > gallery bucket > Policies)
-- 1. Allow public reads: Anyone can view
-- 2. Block all uploads: Only service role can upload (via API)
-- 3. Block all deletes: Only service role can delete

