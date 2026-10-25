import { NextResponse, type NextRequest } from "next/server";
import { NEWSLETTER_UNSUBSCRIBE_PATH, verifyNewsletterToken } from "@/lib/server/newsletterToken";
import { setNewsletter } from "@/lib/server/services/userService";
import { siteUrl } from "@/lib/server/siteUrl";

/**
 * Ziel des Mailkopfs `List-Unsubscribe`: der „Abbestellen“-Knopf von Gmail
 * und Apple Mail schickt hierher ein POST (RFC 8058). Linkprüfer der
 * Mailfilter öffnen nur per GET — das landet auf der Seite.
 */
export async function POST(request: NextRequest) {
    const userId = verifyNewsletterToken(request.nextUrl.searchParams.get("t"));
    if (!userId) return new NextResponse("Ungültiger Abmeldelink.", { status: 400 });
    // Ein inzwischen gelöschtes Konto ist auch „abgemeldet“ — kein Fehler.
    await setNewsletter(userId, false);
    return new NextResponse("Newsletter abbestellt.");
}

export function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get("t") ?? "";
    return NextResponse.redirect(siteUrl(`${NEWSLETTER_UNSUBSCRIBE_PATH}?t=${encodeURIComponent(token)}`));
}
