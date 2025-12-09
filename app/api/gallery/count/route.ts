import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('user_id')

    if (!userId) {
      return NextResponse.json({ count: 0 })
    }

    const supabase = getServiceSupabase()

    const { count, error } = await supabase
      .from('gallery_photos')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    if (error) throw error

    return NextResponse.json({ count: count || 0 })

  } catch (error: any) {
    console.error('Count error:', error)
    return NextResponse.json({ count: 0 })
  }
}

