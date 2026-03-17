 "use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function toggleFee(formData: FormData) {
  const session = await auth();
  if (!session) redirect("/login");

  const currentUser = session.user as any;
  if (currentUser.role !== "ADMIN") {
    throw new Error("Keine Berechtigung");
  }

  const userId = formData.get("userId") as string;
  const yearRaw = formData.get("year") as string;
  const paidRaw = formData.get("paid") as string;

  const year = Number(yearRaw);
  const paid = paidRaw === "true";

  if (!userId || Number.isNaN(year)) {
    throw new Error("Ungültige Daten");
  }

  await prisma.memberFee.upsert({
    where: {
      userId_jahr: {
        userId,
        jahr: year,
      },
    },
    update: {
      bezahlt: paid,
    },
    create: {
      userId,
      jahr: year,
      bezahlt: paid,
    },
  });

  revalidatePath("/dashboard/fees");
}

export async function updateFeeComment(formData: FormData) {
  const session = await auth();
  if (!session) redirect("/login");

  const currentUser = session.user as any;
  if (currentUser.role !== "ADMIN") {
    throw new Error("Keine Berechtigung");
  }

  const userId = formData.get("userId") as string;
  const comment = (formData.get("comment") as string) || null;

  if (!userId) {
    throw new Error("Ungültige Daten");
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      zahlungsKommentar: comment,
    },
  });

  revalidatePath("/dashboard/fees");
}

