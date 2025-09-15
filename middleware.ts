import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })

  // Check if this is a premium algorithm route
  const isPremiumRoute = request.nextUrl.searchParams.get('premium') === 'true' ||
                        request.nextUrl.pathname.includes('/algorithms/avl-tree')

  if (isPremiumRoute) {
    if (!token) {
      // Redirect to sign in if not authenticated
      const signInUrl = new URL('/api/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', request.url)
      return NextResponse.redirect(signInUrl)
    }

    // Check subscription status (this is a simplified check)
    // In a real app, you'd verify the subscription from the database
    const pricingUrl = new URL('/pricing', request.url)
    pricingUrl.searchParams.set('reason', 'premium_required')
    
    // For now, redirect to pricing for demonstration
    // TODO: Implement proper subscription check
    if (request.nextUrl.pathname.includes('/algorithms/avl-tree')) {
      return NextResponse.redirect(pricingUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/algorithms/:path*',
    '/account/:path*'
  ]
}