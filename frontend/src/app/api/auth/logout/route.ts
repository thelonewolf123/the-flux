import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' })
  res.headers.set('Set-Cookie', 'pb_auth=; Path=/; Max-Age=0; HttpOnly')
  return res
}
