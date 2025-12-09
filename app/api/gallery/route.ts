import { NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const supabase = getServiceSupabase()
    
    console.log('Service role key exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)

    // Fetch photos from database
    const { data: photos, error, count } = await supabase
      .from('gallery_photos')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(10)

    console.log('Query result:', { photos, error, count, photosLength: photos?.length })
    if (error) throw error

    // Get public URLs for each photo
    const photosWithUrls = photos?.map(photo => ({
      id: photo.id,
      url: supabase.storage
        .from('gallery')
        .getPublicUrl(photo.storage_path).data.publicUrl,
      created_at: photo.created_at,
    })) || []

    return NextResponse.json({ photos: photosWithUrls })

  } catch (error: any) {
    console.error('Gallery fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    )
  }
}

