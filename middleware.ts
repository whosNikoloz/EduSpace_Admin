import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "@/i18n.config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly

  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  // If locale is undefined, return the default locale
  return locale || i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isVideoRequest = pathname.endsWith(".mp4") || pathname.endsWith(".avi");
  const isIcoRequest = pathname.endsWith(".ico");
  const isSvgRequest = pathname.endsWith(".svg");
  const isPngRequest = pathname.endsWith(".png");
  if (isVideoRequest || isPngRequest || isIcoRequest || isSvgRequest) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  const locale = getLocale(request);

  if (pathnameIsMissingLocale) {
    if (
      (pathname === `/${locale}/login` || pathname === `/${locale}/register`) &&
      request.cookies.has("userAuth")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (
      (pathname === "/" || pathname === "/accounts") &&
      !request.cookies.has("userAuth")
    ) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  if (
    (pathname === `/${locale}/login` || pathname === `/${locale}/register`) &&
    request.cookies.has("userAuth")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    (pathname === `/${locale}` || pathname === `/${locale}/accounts`) &&
    !request.cookies.has("userAuth")
  ) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
