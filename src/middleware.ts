import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Catatan: Firebase Client Auth tidak bisa dibaca langsung di Middleware via Cookie 
  // kecuali Anda melakukan session management manual.
  // Cara termudah adalah pengecekan di level Layout (Client Side).
  
  const session = request.cookies.get('__session'); // Jika menggunakan Firebase Session Cookies

  if (!session && request.nextUrl.pathname.startsWith('/')) {
    if (['/login', '/register', '/forgot-password'].includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }
    // return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
