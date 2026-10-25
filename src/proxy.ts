import { NextResponse, type NextRequest } from "next/server";
import { getDisabledPages } from "@/lib/server/services/featureFlagService";

/**
 * Abgeschaltete Seiten (Feature Flags unter „Öffentliche Seiten“) samt Unterseiten,
 * Feed und Kalenderdateien liefern echtes 404. Das muss hier passieren: In der Seite
 * selbst wäre `notFound()` zu spät — wegen app/loading.tsx steht der Status 200
 * schon fest, bevor sie rendert.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const disabled = await getDisabledPages();
  if (disabled.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    // `_`-Ordner sind nie routbar → Next antwortet mit app/not-found.tsx und 404.
    return NextResponse.rewrite(new URL("/_disabled", request.url));
  }
  return NextResponse.next();
}

// Muss zu PAGE_FLAGS in lib/featureFlags.ts passen (Next verlangt hier Literale).
export const config = {
  matcher: ["/termine/:path*", "/blog/:path*", "/geschichte/:path*", "/vorstand/:path*", "/satzung/:path*"],
};
