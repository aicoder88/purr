import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const ADMIN_ONLY_ROUTES = ['/admin/blog/categories', '/admin/blog/tags'];
const ADMIN_LOGIN_PATH = '/admin/login';
const ADMIN_HOME_PATH = '/admin/blog';
const ADMIN_LOGIN_ROUTE = /^\/admin\/login(?:\/|$)/;

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  const nextWithPathnameHeader = () =>
    NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  if (!pathname.startsWith('/admin')) {
    return nextWithPathnameHeader();
  }

  // Login page is intentionally public.
  if (ADMIN_LOGIN_ROUTE.test(pathname)) {
    return nextWithPathnameHeader();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = ADMIN_LOGIN_PATH;
    loginUrl.search = '';
    loginUrl.searchParams.set('callbackUrl', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = token.role as string | undefined;
  if (ADMIN_ONLY_ROUTES.some((route) => pathname.startsWith(route)) && userRole !== 'admin') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = ADMIN_HOME_PATH;
    redirectUrl.search = '';
    return NextResponse.redirect(redirectUrl);
  }

  return nextWithPathnameHeader();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|js|css)$).*)',
  ],
};
