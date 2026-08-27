import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const isAuthenticated = !!(accessToken || refreshToken);

  const isPublicRoute =
    pathname === "/login" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register-tenant") ||
    pathname.startsWith("/suspended") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico";

  // Root / path handling
  if (pathname === "/") {
    const search = request.nextUrl.search;
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(`/dashboard${search}`, request.url));
    }
    return NextResponse.redirect(new URL(`/login${search}`, request.url));
  }

  // If unauthenticated user attempts to access any protected route, redirect to /login
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If authenticated user visits /login, redirect to /dashboard
  if (isAuthenticated && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

