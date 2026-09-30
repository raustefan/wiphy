import { prisma } from "@/lib/prisma";

/**
 * Recipients for the notification mail. Unverified admin addresses are excluded
 * so a half-finished account cannot silently swallow enquiries.
 */
export async function getAdminNotificationEmails(): Promise<string[]> {
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN", emailVerified: true },
    select: { email: true },
  });
  return admins.map((admin) => admin.email);
}

export async function getContactRequests(limit = 200) {
  return prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function setContactRequestHandled(id: string, handled: boolean) {
  await prisma.contactRequest.update({
    where: { id },
    data: { handledAt: handled ? new Date() : null },
  });
}

export async function deleteContactRequest(id: string) {
  await prisma.contactRequest.delete({ where: { id } });
}
