import type { Metadata } from "next";
import { requireAdmin } from "@/lib/server/authz";
import { getEventForEdit, getUpcomingEvents } from "@/lib/server/services/eventService";
import { escapeHtml } from "@/lib/email/escapeHtml";
import { formatEventRange, formatEventShort } from "@/lib/events";
import { getSentMails } from "@/lib/server/email/mailHistory";
import { formatDateTime } from "@/lib/format";
import { formatStatus } from "@/lib/statusLabels";
import {
    MailDashboard,
    type MailAnnouncement,
    type MailEventOption,
    type MailHistoryEntry,
} from "./MailDashboard";

export const metadata: Metadata = { title: "Rundmail" };

export const dynamic = "force-dynamic";

/**
 * Textvorlage einer Terminankündigung.
 *
 * Bewusst nur der Fließtext: Eckdaten, Knopf und Kontakt-Hinweis hängt der
 * Versand als Bausteine an (siehe `eventBlocks` im Mailservice). Sie stehen
 * damit nicht doppelt in der Mail, und ein Admin, der den Text umschreibt, kann
 * sie nicht versehentlich löschen.
 *
 * `$Anrede` ersetzt der Versand pro Empfänger — die Rundmail geht ohnehin
 * einzeln raus.
 */
function announcementHtml(event: { title: string; summary: string }): string {
    const paragraphs = [
        "$Anrede,",
        "wir laden dich herzlich zu unserem nächsten Termin ein:",
        `<strong>${escapeHtml(event.title)}</strong>`,
        ...(event.summary.trim() ? [escapeHtml(event.summary.trim())] : []),
        "Alle Einzelheiten, die Kalenderdatei zum Eintragen in den eigenen Kalender und ein Formular für Rückfragen findest du auf der Terminseite — der Knopf unten führt direkt dorthin.",
        "Wir freuen uns auf dich!",
    ];
    return paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");
}

export default async function MailDashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ termin?: string }>;
}) {
    // The composer is a client component, so without this gate the whole admin
    // mail UI rendered for anyone who knew the URL — including logged-out
    // visitors. The send actions were already protected; this stops the page
    // itself from being reachable.
    await requireAdmin();

    const { termin } = await searchParams;
    const [selected, upcoming, sentMails] = await Promise.all([
        termin ? getEventForEdit(termin) : null,
        getUpcomingEvents(new Date(), 8),
        getSentMails(),
    ]);

    const announcement: MailAnnouncement | null = selected
        ? {
              id: selected.id,
              title: selected.title,
              when: formatEventRange(selected),
              published: selected.published,
              subject: `Einladung: ${selected.title}`,
              html: announcementHtml(selected),
          }
        : null;

    const options: MailEventOption[] = upcoming.map((event) => ({
        id: event.id,
        title: event.title,
        when: formatEventShort(event),
    }));

    const history: MailHistoryEntry[] = sentMails.map((mail) => ({
        id: mail.id,
        subject: mail.subject,
        sentAt: formatDateTime(mail.createdAt),
        recipients:
            mail.recipientEmail ??
            (mail.recipientGroup === "ALL"
                ? "Alle Nutzer"
                : mail.recipientGroup
                  ? formatStatus(mail.recipientGroup)
                  : mail.recipientCount === 1
                    ? "Gelöschtes Konto"
                    : "Auswahl"),
        count: mail.recipientCount,
    }));

    return (
        <MailDashboard announcement={announcement} upcomingEvents={options} history={history} />
    );
}
