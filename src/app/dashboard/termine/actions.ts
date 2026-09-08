"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/server/authz";
import { AppError, executeAction } from "@/lib/server/errors";
import { requireFeatureEnabled, requireFeatureEnabledOrRedirect } from "@/lib/server/featureGate";
import { eventDeleteSchema, eventSaveSchema } from "@/lib/server/validation/schemas";
import { createDraftEvent, removeEvent, saveEvent } from "@/lib/server/services/eventService";

/**
 * Was ein geänderter Termin alles frisch machen muss: die Liste, die
 * Detailseite, die Startseite (Aufmacher) und das Dashboard (Hinweis auf den
 * nächsten Termin).
 */
function revalidateEvent(id?: string) {
  revalidatePath("/termine");
  if (id) revalidatePath(`/termine/${id}`);
  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/termine");
  // Die Sitemap wird statisch erzeugt — ohne diesen Aufruf fehlte ein neuer
  // Termin darin bis zum nächsten Deployment.
  revalidatePath("/sitemap.xml");
}

/**
 * Legt einen leeren Termin an und springt in seine Bearbeitung — dieselbe
 * Mechanik wie „Neuer Beitrag“ im Blog: erst mit einer ID lässt sich der Termin
 * verlinken, ankündigen und mit Beiträgen verknüpfen.
 */
export async function createEventDraft() {
  await requireAdmin();
  await requireFeatureEnabledOrRedirect("EVENT_MANAGEMENT", "/dashboard/termine");

  const id = await createDraftEvent();
  revalidatePath("/dashboard/termine");
  redirect(`/dashboard/termine/${id}`);
}

export async function saveEventAction(formData: FormData) {
  return executeAction(async () => {
    await requireAdmin();
    await requireFeatureEnabled("EVENT_MANAGEMENT");

    const raw = {
      id: String(formData.get("id") ?? ""),
      title: String(formData.get("title") ?? ""),
      summary: String(formData.get("summary") ?? ""),
      description: String(formData.get("description") ?? ""),
      start: String(formData.get("start") ?? ""),
      end: String(formData.get("end") ?? ""),
      allDay: formData.get("allDay") === "on",
      location: String(formData.get("location") ?? ""),
      address: String(formData.get("address") ?? ""),
      onlineUrl: String(formData.get("onlineUrl") ?? ""),
      published: formData.get("published") === "on",
    };

    const parsed = eventSaveSchema.safeParse(raw);
    if (!parsed.success) {
      throw new AppError(
        "VALIDATION_ERROR",
        parsed.error.issues[0]?.message ?? "Bitte alle Pflichtfelder ausfüllen.",
      );
    }

    const { id, ...data } = parsed.data;
    await saveEvent(id, data);
    revalidateEvent(id);
    redirect("/dashboard/termine");
  });
}

export async function deleteEventAction(formData: FormData) {
  await executeAction(async () => {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("EVENT_MANAGEMENT", "/dashboard/termine");

    const parsed = eventDeleteSchema.safeParse({ id: String(formData.get("id") ?? "") });
    if (!parsed.success) {
      throw new AppError("VALIDATION_ERROR", "Ungültige Termin-ID.");
    }

    // Verknüpfte Blogbeiträge überleben das (`onDelete: SetNull`) — sie
    // verlieren nur ihren Bezug zum Termin.
    await removeEvent(parsed.data.id);
    revalidateEvent(parsed.data.id);
    revalidatePath("/blog");
  });
}
