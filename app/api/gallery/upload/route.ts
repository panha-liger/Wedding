import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase'

// Rate limiting
const uploadLimitMap = new Map<string, { count: number; resetTime: number }>()
const UPLOAD_RATE_LIMIT = 20 // uploads per window
const UPLOAD_RATE_WINDOW = 60 * 60 * 1000 // 1 hour

function checkUploadRateLimit(identifier: string): boolean {
  const now = Date.now()
  const record = uploadLimitMap.get(identifier)

  if (!record || now > record.resetTime) {
    uploadLimitMap.set(identifier, { count: 1, resetTime: now + UPLOAD_RATE_WINDOW })
    return true
  }

  if (record.count >= UPLOAD_RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    
    // Rate limiting
    if (!checkUploadRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Upload limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    const formData = await req.formData()
    const images = formData.getAll('images') as File[]
    const userId = formData.get('user_id') as string
    const userName = formData.get('user_name') as string

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    if (images.length === 0) {
      return NextResponse.json(
        { error: 'No images provided' },
        { status: 400 }
      )
    }

    const supabase = getServiceSupabase()

    // Check current count for this user
    const { count, error: countError } = await supabase
      .from('gallery_photos')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    if (countError) throw countError

    if (count && count >= 10) {
      return NextResponse.json(
        { error: 'You have reached your limit of 10 photos' },
        { status: 400 }
      )
    }

    // Check if upload would exceed limit
    const remainingSlots = 10 - (count || 0)
    if (images.length > remainingSlots) {
      return NextResponse.json(
        { error: `You can only upload ${remainingSlots} more photo${remainingSlots === 1 ? '' : 's'}` },
        { status: 400 }
      )
    }

    const uploadedPhotos = []

    for (const image of images) {
      // Validate file type
      if (!ALLOWED_TYPES.includes(image.type)) {
        return NextResponse.json(
          { error: `Invalid file type: ${image.name}. Only images allowed.` },
          { status: 400 }
        )
      }

      // Validate file size
      if (image.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File too large: ${image.name}. Max 5MB per image.` },
          { status: 400 }
        )
      }

      // Generate unique filename
      const fileExt = image.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `uploads/${fileName}`

      // Upload to Supabase Storage
      const arrayBuffer = await image.arrayBuffer()
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, arrayBuffer, {
          contentType: image.type,
          upsert: false,
        })

      if (uploadError) throw uploadError

      // Save to database
      const { data: photo, error: dbError } = await supabase
        .from('gallery_photos')
        .insert({
          storage_path: filePath,
          user_id: userId,
          uploaded_by: userName || null,
        })
        .select()
        .single()

      if (dbError) {
        // Clean up uploaded file if DB insert fails
        await supabase.storage.from('gallery').remove([filePath])
        throw dbError
      }

      uploadedPhotos.push(photo)
    }

    return NextResponse.json({ 
      success: true, 
      count: uploadedPhotos.length 
    })

  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    )
  }
}

