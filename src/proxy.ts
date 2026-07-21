import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

import { auth } from 'auth';
import type { NextAuthRequest } from 'next-auth';

const publicRoutes = ['/login', '/register'];

const withAuth = auth((request: NextAuthRequest, _event: NextFetchEvent) => {
  const { nextUrl } = request;
  const isLoggedIn = !!request.auth;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  return NextResponse.next();
});

export function proxy(request: NextRequest, event: NextFetchEvent) {
  return withAuth(request, event);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
