-- Run this in Supabase SQL Editor to update schema

-- Add user_id column to track uploads per browser
ALTER TABLE gallery_photos ADD COLUMN IF NOT EXISTS user_id TEXT;

-- Add name column (optional, for display)
ALTER TABLE gallery_photos ADD COLUMN IF NOT EXISTS uploaded_by TEXT;

-- Create index for faster queries by user_id
CREATE INDEX IF NOT EXISTS idx_gallery_photos_user_id ON gallery_photos(user_id);

