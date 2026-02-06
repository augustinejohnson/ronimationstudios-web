import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only run on /admin routes
    if (!pathname.startsWith('/admin')) {
        return NextResponse.next();
    }

    // Check for session
    const sessionCookie = request.cookies.get('session')?.value;
    const session = sessionCookie ? await verifySession(sessionCookie) : null;

    // If trying to access login page while logged in, redirect to admin home
    if (pathname === '/admin/login' && session) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    // If trying to access protected admin routes while not logged in, redirect to login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !session) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
