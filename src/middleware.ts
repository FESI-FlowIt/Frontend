import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  const publicPaths = ['/', '/auth/login', '/auth/signup', '/oauth/callback'];
  const pathname = req.nextUrl.pathname;
  const isPublicPath = publicPaths.includes(pathname);
  const isFile = pathname.match(/\.(.*)$/);

  if (isFile) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/oauth/callback')
  ) {
    return NextResponse.next();
  }

  if (refreshToken) {
    return NextResponse.next();
  }

  if (isPublicPath && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!isPublicPath && !accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
