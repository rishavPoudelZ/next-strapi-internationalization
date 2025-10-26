import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ko"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the path already has a locale, continue
  if (locales.some((locale) => pathname.startsWith(`/${locale}`))) {
    return;
  }

  // Otherwise redirect to default locale
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

export const config = {
  matcher: [
    /*
    Match all routes except:
    - API routes
    - Next.js internals
    */
    "/((?!api|_next|.*\\..*).*)",
  ],
};
