import { NextResponse } from "next/server";
import { getOptionalUser } from "@/lib/server/authz";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // Checked before the try/catch, and via the non-redirecting variant: an API
  // route should answer with a status code, and wrapping `requireAdmin` in a
  // try/catch would swallow its NEXT_REDIRECT and report a misleading 500.
  const currentUser = await getOptionalUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
  }
  if (currentUser.role !== "ADMIN") {
    return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 });
  }

  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, status: true },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
