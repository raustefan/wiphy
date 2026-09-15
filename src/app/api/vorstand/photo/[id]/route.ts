import { NextResponse } from "next/server";
import { getOptionalUser } from "@/lib/server/authz";
import { findPhotoBytes } from "@/lib/server/repositories/boardRepository";

/**
 * Liefert die Bytes eines Vorstandsfotos aus der Datenbank aus — wie
 * `/api/blog/images/[id]`: kein Dateisystem, jedes `<img src>` landet hier.
 * Fotos unveröffentlichter Mitglieder (Entwürfe) sind nur für Admins abrufbar.
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const photo = await findPhotoBytes(id);
  if (!photo) {
    return new NextResponse(null, { status: 404 });
  }

  const isPublic = photo.member.published;
  if (!isPublic) {
    const user = await getOptionalUser();
    if (user?.role !== "ADMIN") {
      return new NextResponse(null, { status: 404 });
    }
  }

  const etag = `"${id}-${photo.updatedAt.getTime()}"`;
  const cacheControl = isPublic
    ? "public, max-age=86400, must-revalidate"
    : "private, no-store";

  if (request.headers.get("if-none-match") === etag) {
    return new NextResponse(null, {
      status: 304,
      headers: { ETag: etag, "Cache-Control": cacheControl },
    });
  }

  return new NextResponse(photo.bytes, {
    status: 200,
    headers: {
      "Content-Type": photo.mimeType,
      "Content-Length": String(photo.bytes.byteLength),
      "Content-Disposition": "inline",
      "Cache-Control": cacheControl,
      ETag: etag,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
