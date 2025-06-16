import { pb } from '@/lib/pocketbase'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password } = body

  try {
    const authData = await pb.collection('users').authWithPassword(email, password)

    const cookie = pb.authStore.exportToCookie({
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })

    const res = NextResponse.json({ user: authData.record })
    res.headers.set('Set-Cookie', cookie)
    return res
  } catch (err) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}
