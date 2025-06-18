// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { pb } from './lib/pocketbase'

// This assumes you have POCKETBASE_URL in your .env.local


export function middleware(request: NextRequest) {
  // Load cookies into PocketBase
  const cookieHeader = request.headers.get('cookie') || ''
  pb.authStore.loadFromCookie(cookieHeader)

  const isAuthenticated = pb.authStore.isValid
  const pathname = request.nextUrl.pathname

  // List of routes you want to protect
  const protectedRoutes = ['/dashboard', '/generation', '/settings',"/"]

  if (protectedRoutes.includes(pathname) && !isAuthenticated) {
    const redirectUrl = new URL('/auth/login', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}
