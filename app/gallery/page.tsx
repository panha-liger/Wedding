'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getBrowserId } from '@/lib/browser-id'
import { supabase } from '@/lib/supabase'

type Photo = {
  id: string
  url: string
  created_at: string
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [userName, setUserName] = useState('')
  const [myPhotoCount, setMyPhotoCount] = useState(0)

  const fetchPhotos = async () => {
    try {
      const res = await fetch('/api/gallery')
      const data = await res.json()
      setPhotos(data.photos || [])
      
      // Get user's photo count
      const userId = getBrowserId()
      const countRes = await fetch(`/api/gallery/count?user_id=${userId}`)
      const countData = await countRes.json()
      setMyPhotoCount(countData.count || 0)
    } catch (err) {
      console.error('Failed to fetch photos:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPhotos()
    // Get saved name from localStorage
    const savedName = localStorage.getItem('wedding_user_name')
    if (savedName) setUserName(savedName)

    // Subscribe to real-time updates
    const channel = supabase
      .channel('gallery_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'gallery_photos',
        },
        (payload) => {
          console.log('Gallery update:', payload)
          fetchPhotos()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const userId = getBrowserId()
    
    // Save name if provided
    if (userName.trim()) {
      localStorage.setItem('wedding_user_name', userName.trim())
    }

    setUploading(true)
    setError('')
    setUploadProgress(0)

    const formData = new FormData()
    Array.from(files).forEach(file => {
      formData.append('images', file)
    })
    formData.append('user_id', userId)
    formData.append('user_name', userName.trim())

    try {
      const res = await fetch('/api/gallery/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setUploadProgress(100)
      await fetchPhotos()
      e.target.value = '' // Reset input
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
      setTimeout(() => setUploadProgress(0), 1000)
    }
  }

  const isLimitReached = myPhotoCount >= 10

  const handlePrevious = () => {
    if (selectedPhoto !== null && selectedPhoto > 0) {
      setSelectedPhoto(selectedPhoto - 1)
    }
  }

  const handleNext = () => {
    if (selectedPhoto !== null && selectedPhoto < photos.length - 1) {
      setSelectedPhoto(selectedPhoto + 1)
    }
  }

  return (
    <>
      <div className="min-h-screen max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-serif text-gray-800">Gallery</h1>
            <span className="text-lg text-gray-600 font-medium">
              Your photos: {myPhotoCount}/10
            </span>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <label
              className={`${
                isLimitReached || uploading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-rose-500 hover:bg-rose-600 cursor-pointer'
              } text-white px-6 py-2.5 rounded-full font-medium transition-colors text-sm`}
            >
              {uploading ? 'Uploading...' : 'Upload Photos'}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                disabled={isLimitReached || uploading}
                className="hidden"
              />
            </label>
            {isLimitReached && (
              <span className="text-sm text-rose-600 font-medium">
                You've reached your 10 photo limit
              </span>
            )}
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-rose-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          {error && (
            <div className="mt-3 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Body */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-500" />
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No photos yet</p>
            <p className="text-sm mt-2">Upload your first photo to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {photos.map((photo, idx) => (
              <button
                key={photo.id}
                onClick={() => setSelectedPhoto(idx)}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity"
              >
                <Image
                  src={photo.url}
                  alt={`Photo ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Full-screen Preview */}
      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
          >
            ×
          </button>

          {selectedPhoto > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
              className="absolute left-4 text-white text-4xl hover:text-gray-300 z-10"
            >
              ‹
            </button>
          )}

          <div
            className="relative w-full h-full max-w-5xl max-h-[90vh] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[selectedPhoto].url}
              alt={`Photo ${selectedPhoto + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {selectedPhoto < photos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-4 text-white text-4xl hover:text-gray-300 z-10"
            >
              ›
            </button>
          )}

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {selectedPhoto + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  )
}

