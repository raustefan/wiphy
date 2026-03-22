import { auth } from "@/auth";
import { redirect } from "next/navigation";
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

export async function requireUser(): Promise<UserContext> {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user as { id?: string; role?: string; email?: string | null; name?: string | null; status?: string };
  if (!user.id) {
    redirect("/login");
  }

  return {
    id: user.id,
    role: normalizeRole(user.role),
    email: user.email ?? null,
    name: user.name ?? null,
    status: user.status ?? null,
  };
}

export async function requireAdmin(): Promise<UserContext> {
  const user = await requireUser();
  if (user.role !== "ADMIN") {
    redirect("/dashboard");
  }
  return user;
}

export function assertCanEditUser(currentUser: UserContext, targetUserId: string) {
  if (currentUser.role !== "ADMIN" && currentUser.id !== targetUserId) {
    throw new Error("Keine Berechtigung");
  }
}
