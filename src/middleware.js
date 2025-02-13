import { NextResponse } from 'next/server';

export function middleware(request) {
  // Permettre l'accès à toutes les routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/addskill/:path*',
    '/api/getskills/:path*',
    '/api/deleteskill/:path*',
    '/api/tasks/:path*',
    '/skills/:path*'
  ],
};
