import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;

  const publicPaths = ['/', '/auth/login', '/auth/signup'];
  const pathname = req.nextUrl.pathname;
  const isPublicPath = publicPaths.includes(pathname);
  const isFile = pathname.match(/\.(.*)$/);

  if (isFile) {
    return NextResponse.next();
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
