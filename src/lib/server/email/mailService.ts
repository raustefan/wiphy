import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { AppError } from "@/lib/server/errors";
import { getSmtpConfig } from "@/lib/server/env";

export function createMailTransporter() {
  return nodemailer.createTransport(getSmtpConfig().transport);
}

export async function resolveUsersByIds(userIds: string[]) {
  const uniqueIds = [...new Set(userIds)];
  if (uniqueIds.length === 0) {
    throw new AppError("VALIDATION_ERROR", "Bitte mindestens einen Empfänger auswählen.");
  }

  const found = await prisma.user.findMany({
    where: { id: { in: uniqueIds } },
    select: { id: true, email: true },
  });

  if (found.length !== uniqueIds.length) {
    throw new AppError(
      "VALIDATION_ERROR",
      "Ein oder mehrere ausgewählte Nutzer existieren nicht.",
    );
  }

  return found;
}

export async function resolveUsersByTarget(target: "ALL" | "MEMBER" | "ADMIN") {
  if (target === "ALL") {
    return prisma.user.findMany({ select: { email: true } });
  }
  return prisma.user.findMany({
    where: { role: target },
    select: { email: true },
  });
}

export async function resolveRecipientEmails(input: {
  target: "ALL" | "MEMBER" | "ADMIN" | "SELECTED";
  selectedUserIds: string[];
}) {
  if (input.target === "SELECTED") {
    return resolveUsersByIds(input.selectedUserIds);
  }
  return resolveUsersByTarget(input.target);
}

export async function sendMailToUsers(input: {
  recipientEmails: string[];
  subject: string;
  message: string;
  bccToSelf: boolean;
  adminEmail?: string | null;
}) {
  const bccAddresses = new Set(
    input.recipientEmails.map((e) => e.trim()).filter((e) => e.length > 0),
  );

  if (input.bccToSelf) {
    const selfEmail = input.adminEmail?.trim();
    if (!selfEmail) {
      throw new AppError(
        "VALIDATION_ERROR",
        "Keine E-Mail in der Session. Bitte neu einloggen oder „BCC an mich“ deaktivieren.",
      );
    }
    bccAddresses.add(selfEmail);
  }

  const emails = Array.from(bccAddresses).join(",");
  if (!emails) {
    throw new AppError("NOT_FOUND", "Keine Empfänger gefunden.");
  }

  const transporter = createMailTransporter();
  const { from } = getSmtpConfig();
  await transporter.sendMail({
    from,
    bcc: emails,
    subject: input.subject,
    text: input.message,
  });
}

export type MailTarget = "ALL" | "MEMBER" | "ADMIN" | "SELECTED";

export async function sendMailForTarget(input: {
  target: MailTarget;
  selectedUserIds: string[];
  subject: string;
  message: string;
  bccToSelf: boolean;
  adminEmail?: string | null;
}) {
  const users = await resolveRecipientEmails({
    target: input.target,
    selectedUserIds: input.selectedUserIds,
  });
  await sendMailToUsers({
    recipientEmails: users.map((u) => u.email),
    subject: input.subject,
    message: input.message,
    bccToSelf: input.bccToSelf,
    adminEmail: input.adminEmail,
  });
}
