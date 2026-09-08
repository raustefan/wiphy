import { NextResponse } from "next/server";
import { getOptionalUser } from "@/lib/server/authz";
import { findImageBytes } from "@/lib/server/repositories/blogRepository";

/**
 * Liefert die Bytes eines Blog-Bildes aus der Datenbank aus.
 *
 * Es gibt keine Datei im Dateisystem und damit auch nichts, was der Webserver
 * selbst ausliefern könnte — jedes `<img src>` im Blog landet hier. Deshalb
 * zwei Dinge:
 *
 * - **Sichtbarkeit.** Bilder eines unveröffentlichten Beitrags sind nur für
 *   Admins abrufbar. Sonst wäre ein Entwurf über die geratene Bild-URL vorab
 *   einsehbar, obwohl die Beitragsseite noch 404 liefert.
 * - **Zwischenspeichern.** Mit `ETag` beantwortet ein zweiter Abruf sich
 *   normalerweise als 304, ohne dass die Datenbank die Bytes noch einmal
 *   herausgibt.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const variant =
    new URL(request.url).searchParams.get("variant") === "thumb" ? "thumb" : "full";

  const image = await findImageBytes(id, variant);
  if (!image) {
    return new NextResponse(null, { status: 404 });
  }

  const isPublic = image.post.published && image.post.publishedAt <= new Date();
  if (!isPublic) {
    const user = await getOptionalUser();
    if (user?.role !== "ADMIN") {
      return new NextResponse(null, { status: 404 });
    }
  }

  const etag = `"${id}-${variant}-${image.updatedAt.getTime()}"`;
  const cacheControl = isPublic
    ? "public, max-age=86400, must-revalidate"
    : "private, no-store";

  if (request.headers.get("if-none-match") === etag) {
    return new NextResponse(null, {
      status: 304,
      headers: { ETag: etag, "Cache-Control": cacheControl },
    });
  }

  return new NextResponse(image.bytes, {
    status: 200,
    headers: {
      "Content-Type": image.mimeType,
      "Content-Length": String(image.bytes.byteLength),
      "Content-Disposition": "inline",
      "Cache-Control": cacheControl,
      ETag: etag,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
