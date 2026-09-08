import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getOptionalUser } from "@/lib/server/authz";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { FEATURE_FLAG_LABELS } from "@/lib/featureFlags";
import { AppError } from "@/lib/server/errors";
import { addPostImage, postExists } from "@/lib/server/services/blogService";
import { MAX_BLOG_IMAGE_UPLOAD_BYTES } from "@/lib/blogImages";

/**
 * Nimmt ein hochgeladenes Bild für einen Beitrag entgegen.
 *
 * Bewusst eine Route und keine Serveraktion: Serveraktionen haben in Next eine
 * Größengrenze für den Request-Body (Standard 1 MB), an der ein Foto scheitern
 * würde, bevor die Verkleinerung überhaupt zum Zug kommt. Die Antwort folgt
 * demselben Schema wie `/api/auth/*`, damit `postJson`-artige Aufrufer den
 * abgeschalteten Feature-Flag als `FEATURE_DISABLED` wiedererkennen.
 */
export async function POST(request: Request) {
  const user = await getOptionalUser();
  if (!user) {
    return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
  }
  if (user.role !== "ADMIN") {
    return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 });
  }

  if (!(await isFeatureEnabled("BLOG_MANAGEMENT"))) {
    return NextResponse.json(
      {
        error: `${FEATURE_FLAG_LABELS.BLOG_MANAGEMENT} wurde von einem Administrator deaktiviert.`,
        code: "FEATURE_DISABLED",
      },
      { status: 403 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Ungültiger Upload." }, { status: 400 });
  }

  const postId = String(form.get("postId") ?? "");
  const file = form.get("file");

  if (!postId || !(file instanceof File)) {
    return NextResponse.json({ error: "Beitrag oder Datei fehlt." }, { status: 400 });
  }
  if (file.size > MAX_BLOG_IMAGE_UPLOAD_BYTES) {
    return NextResponse.json(
      {
        error: `„${file.name}“ ist größer als ${Math.round(
          MAX_BLOG_IMAGE_UPLOAD_BYTES / (1024 * 1024),
        )} MB.`,
      },
      { status: 413 },
    );
  }

  if (!(await postExists(postId))) {
    return NextResponse.json({ error: "Beitrag nicht gefunden." }, { status: 404 });
  }

  try {
    const image = await addPostImage({
      postId,
      fileName: file.name,
      bytes: new Uint8Array(await file.arrayBuffer()),
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${postId}`);
    revalidatePath("/dashboard/blog");

    return NextResponse.json({ image }, { status: 201 });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.code === "VALIDATION_ERROR" ? 400 : 500 },
      );
    }
    console.error("Blog-Bild konnte nicht gespeichert werden:", error);
    return NextResponse.json(
      { error: "Das Bild konnte nicht gespeichert werden." },
      { status: 500 },
    );
  }
}
