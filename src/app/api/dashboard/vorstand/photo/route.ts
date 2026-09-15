import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getOptionalUser } from "@/lib/server/authz";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { FEATURE_FLAG_LABELS } from "@/lib/featureFlags";
import { AppError } from "@/lib/server/errors";
import { memberExists, setMemberPhoto } from "@/lib/server/services/boardService";
import { MAX_BOARD_PHOTO_UPLOAD_BYTES } from "@/lib/boardImages";

/**
 * Nimmt ein hochgeladenes Vorstandsfoto entgegen.
 *
 * Route statt Serveraktion aus demselben Grund wie beim Blog: Serveraktionen
 * haben in Next eine Größengrenze für den Request-Body (Standard 1 MB), an der
 * ein Foto scheitern würde, bevor die Verkleinerung überhaupt zum Zug kommt.
 */
export async function POST(request: Request) {
  const user = await getOptionalUser();
  if (!user) {
    return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
  }
  if (user.role !== "ADMIN") {
    return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 });
  }

  if (!(await isFeatureEnabled("BOARD_MANAGEMENT"))) {
    return NextResponse.json(
      {
        error: `${FEATURE_FLAG_LABELS.BOARD_MANAGEMENT} wurde von einem Administrator deaktiviert.`,
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

  const memberId = String(form.get("memberId") ?? "");
  const file = form.get("file");

  if (!memberId || !(file instanceof File)) {
    return NextResponse.json({ error: "Mitglied oder Datei fehlt." }, { status: 400 });
  }
  if (file.size > MAX_BOARD_PHOTO_UPLOAD_BYTES) {
    return NextResponse.json(
      {
        error: `„${file.name}“ ist größer als ${Math.round(
          MAX_BOARD_PHOTO_UPLOAD_BYTES / (1024 * 1024),
        )} MB.`,
      },
      { status: 413 },
    );
  }

  if (!(await memberExists(memberId))) {
    return NextResponse.json({ error: "Mitglied nicht gefunden." }, { status: 404 });
  }

  try {
    const photo = await setMemberPhoto({
      memberId,
      bytes: new Uint8Array(await file.arrayBuffer()),
    });

    revalidatePath("/vorstand");
    revalidatePath(`/dashboard/vorstand/${memberId}`);
    revalidatePath("/dashboard/vorstand");

    return NextResponse.json({ photo }, { status: 201 });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.code === "VALIDATION_ERROR" ? 400 : 500 },
      );
    }
    console.error("Vorstandsfoto konnte nicht gespeichert werden:", error);
    return NextResponse.json(
      { error: "Das Foto konnte nicht gespeichert werden." },
      { status: 500 },
    );
  }
}
