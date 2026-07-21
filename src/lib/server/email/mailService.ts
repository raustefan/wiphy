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
    select: { id: true, email: true, vorname: true, name: true },
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
    return prisma.user.findMany({ select: { email: true, vorname: true, name: true } });
  }
  return prisma.user.findMany({
    where: { role: target },
    select: { email: true, vorname: true, name: true },
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

function replacePlaceholders(template: string, user: { vorname: string | null; name: string | null }): string {
  let result = template;
  result = result.replace(/\$Vorname/g, user.vorname || "");
  result = result.replace(/\$Nachname/g, user.name || "");
  result = result.replace(/\$Name/g, `${user.vorname || ""} ${user.name || ""}`.trim());
  return result;
}

export async function sendMailToUsers(input: {
  recipientEmails: string[];
  subject: string;
  message: string;
  bccToSelf: boolean;
  adminEmail?: string | null;
  htmlMessage?: string;
  users?: { email: string; vorname: string | null; name: string | null }[];
}) {
  const transporter = createMailTransporter();
  const { from } = getSmtpConfig();

  // If users are provided, send personalized individual emails
  if (input.users && input.users.length > 0) {
    for (const user of input.users) {
      const personalizedSubject = replacePlaceholders(input.subject, user);
      const personalizedMessage = replacePlaceholders(input.message, user);
      const personalizedHtml = input.htmlMessage ? replacePlaceholders(input.htmlMessage, user) : undefined;

      await transporter.sendMail({
        from,
        to: user.email,
        subject: personalizedSubject,
        text: personalizedMessage,
        html: personalizedHtml || personalizedMessage,
        encoding: "utf-8",
      });
    }

    // Send copy to admin if requested
    if (input.bccToSelf) {
      const selfEmail = input.adminEmail?.trim();
      if (!selfEmail) {
        throw new AppError(
          "VALIDATION_ERROR",
          "Keine E-Mail in der Session. Bitte neu einloggen oder 'Kopie an mich' deaktivieren.",
        );
      }
      await transporter.sendMail({
        from,
        to: selfEmail,
        subject: input.subject + " (Kopie)",
        text: input.message,
        html: input.htmlMessage || input.message,
        encoding: "utf-8",
      });
    }
    return;
  }

  // Fallback to BCC for backward compatibility
  const bccAddresses = new Set(
    input.recipientEmails.map((e) => e.trim()).filter((e) => e.length > 0),
  );

  if (input.bccToSelf) {
    const selfEmail = input.adminEmail?.trim();
    if (!selfEmail) {
      throw new AppError(
        "VALIDATION_ERROR",
        "Keine E-Mail in der Session. Bitte neu einloggen oder 'BCC an mich' deaktivieren.",
      );
    }
    bccAddresses.add(selfEmail);
  }

  const emails = Array.from(bccAddresses).join(",");
  if (!emails) {
    throw new AppError("NOT_FOUND", "Keine Empfänger gefunden.");
  }

  await transporter.sendMail({
    from,
    bcc: emails,
    subject: input.subject,
    text: input.message,
    html: input.htmlMessage || input.message,
    encoding: "utf-8",
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
  htmlMessage?: string;
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
    htmlMessage: input.htmlMessage,
    users,
  });
}
