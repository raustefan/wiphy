import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { Role } from "@prisma/client";

export type UserContext = {
  id: string;
  role: Role;
  email?: string | null;
  name?: string | null;
  status?: string | null;
};

function normalizeRole(value: unknown): Role {
  return value === "ADMIN" ? "ADMIN" : "MEMBER";
}

/** Die Sitzung, wie sie ist — ohne die Mitgliederansicht des Debug-Modus. */
async function sessionUser(): Promise<UserContext | null> {
  const session = await auth();
  const user = session?.user as
    | { id?: string; role?: string; email?: string | null; name?: string | null; status?: string }
    | undefined;

  if (!user?.id) {
    return null;
  }

  return {
    id: user.id,
    role: normalizeRole(user.role),
    email: user.email ?? null,
    name: user.name ?? null,
    status: user.status ?? null,
  };
}

/**
 * Debug-Modus: schaltet für Admins die riskanten Werkzeuge frei (Feature Flags,
 * Sicherheit, Server). Ein Sitzungs-Cookie statt eines DB-Felds — er gilt nur
 * für diesen Browser und erlischt mit ihm, damit niemand die Seiten dauerhaft
 * offen stehen lässt. Kein Sicherheitsmerkmal: die Rolle prüft `requireAdmin`.
 */
export const DEBUG_COOKIE = "wiphy_debug";

/**
 * Mitgliederansicht: ein Admin sieht und darf im Debug-Modus nur, was ein
 * Mitglied sieht und darf. Wirkt nur zusammen mit dem Debug-Cookie — wer den
 * Debug-Modus beendet, ist automatisch wieder Admin.
 */
export const AS_MEMBER_COOKIE = "wiphy_as_member";

export async function isDebugMode(): Promise<boolean> {
  return (await cookies()).get(DEBUG_COOKIE)?.value === "1";
}

export async function isViewingAsMember(): Promise<boolean> {
  const store = await cookies();
  return store.get(DEBUG_COOKIE)?.value === "1" && store.get(AS_MEMBER_COOKIE)?.value === "1";
}

/**
 * Nur herabstufen, nie heraufstufen: das Cookie kann aus einem Mitglied keinen
 * Admin machen, egal wer es setzt.
 */
async function withViewOverride(user: UserContext | null): Promise<UserContext | null> {
  if (user?.role === "ADMIN" && (await isViewingAsMember())) {
    return { ...user, role: "MEMBER" };
  }
  return user;
}

/**
 * Session lookup that reports "not signed in" as `null` instead of redirecting.
 *
 * Route handlers need this: `requireUser`/`requireAdmin` signal failure by
 * throwing Next's NEXT_REDIRECT, which is right for pages but wrong for an API
 * that should answer with a status code.
 */
export async function getOptionalUser(): Promise<UserContext | null> {
  return withViewOverride(await sessionUser());
}

export async function requireUser(): Promise<UserContext> {
  const user = await getOptionalUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function requireAdmin(): Promise<UserContext> {
  const user = await requireUser();
  if (user.role !== "ADMIN") {
    redirect("/dashboard");
  }
  return user;
}

/**
 * Admin laut Sitzung, auch während der Mitgliederansicht. Nur für die
 * Debug-Schalter selbst — sonst käme man aus der Ansicht nicht mehr heraus.
 */
export async function requireRealAdmin(): Promise<UserContext> {
  const user = await sessionUser();
  if (!user) {
    redirect("/login");
  }
  if (user.role !== "ADMIN") {
    redirect("/dashboard");
  }
  return user;
}

export async function requireDebugAdmin(): Promise<UserContext> {
  const user = await requireAdmin();
  if (!(await isDebugMode())) {
    redirect("/dashboard");
  }
  return user;
}

export function assertCanEditUser(currentUser: UserContext, targetUserId: string) {
  if (currentUser.role !== "ADMIN" && currentUser.id !== targetUserId) {
    throw new Error("Keine Berechtigung");
  }
}
