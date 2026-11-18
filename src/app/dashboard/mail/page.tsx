import type { Metadata } from "next";
import { requireAdmin } from "@/lib/server/authz";
import { getEventForEdit, getUpcomingEvents } from "@/lib/server/services/eventService";
import { getAnnounceablePosts } from "@/lib/server/services/blogService";
import { getSepaCandidates } from "@/lib/server/services/feeService";
import { formatEventShort } from "@/lib/events";
import { getSentMails } from "@/lib/server/email/mailHistory";
import { formatDateShort, formatDateTime } from "@/lib/format";
import { formatStatus } from "@/lib/statusLabels";
import { isMailTarget, MAIL_TARGET_INFO } from "@/lib/mailTargets";
import { MailDashboard, type MailHistoryEntry } from "./MailDashboard";
import type { MailEventOption, MailPostOption } from "./MailForm";

export const metadata: Metadata = { title: "Rundmail" };

export const dynamic = "force-dynamic";

function groupLabel(group: string): string {
    return isMailTarget(group) ? MAIL_TARGET_INFO[group].title : formatStatus(group);
}

export default async function MailDashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ termin?: string; beitrag?: string }>;
}) {
    // The composer is a client component, so without this gate the whole admin
    // mail UI rendered for anyone who knew the URL — including logged-out
    // visitors. The send actions were already protected; this stops the page
    // itself from being reachable.
    const admin = await requireAdmin();

    const { termin, beitrag } = await searchParams;
    const year = new Date().getFullYear();
    const [selected, upcoming, posts, sentMails, payersNow, payersNext] = await Promise.all([
        termin ? getEventForEdit(termin) : null,
        getUpcomingEvents(new Date(), 20),
        getAnnounceablePosts(),
        getSentMails(),
        getSepaCandidates(admin.id, year),
        getSepaCandidates(admin.id, year + 1),
    ]);

    const events: MailEventOption[] = upcoming.map((event) => ({
        id: event.id,
        title: event.title,
        when: formatEventShort(event),
        published: true,
    }));
    // Ein Entwurf oder vergangener Termin aus `?termin=` steht nicht in der
    // Liste — mit Warnung zeigen statt stillschweigend ignorieren.
    if (selected && !events.some((event) => event.id === selected.id)) {
        events.unshift({
            id: selected.id,
            title: selected.title,
            when: formatEventShort(selected),
            published: selected.published,
        });
    }

    const postOptions: MailPostOption[] = posts.map((post) => ({
        id: post.id,
        title: post.title,
        when: formatDateShort(post.publishedAt),
    }));

    // Wer im jeweiligen Jahr tatsächlich eingezogen wird — für die Vorzählung
    // im Formular. Die Beträge setzt erst der Server beim Versand ein.
    const payerIds = (list: typeof payersNow) => list.filter((c) => !c.problem).map((c) => c.id);
    const sepaPayers = { [year]: payerIds(payersNow), [year + 1]: payerIds(payersNext) };

    const history: MailHistoryEntry[] = sentMails.map((mail) => ({
        id: mail.id,
        subject: mail.subject,
        sentAt: formatDateTime(mail.createdAt),
        recipients:
            mail.recipientEmail ??
            (mail.recipientGroup
                ? groupLabel(mail.recipientGroup)
                : mail.recipientCount === 1
                  ? "Gelöschtes Konto"
                  : "Auswahl"),
        count: mail.recipientCount,
    }));

    const initial = selected
        ? { template: "EVENT" as const, eventId: selected.id }
        : beitrag && postOptions.some((post) => post.id === beitrag)
          ? { template: "BLOG" as const, postId: beitrag }
          : {};

    return (
        <MailDashboard
            events={events}
            posts={postOptions}
            sepaPayers={sepaPayers}
            adminEmail={admin.email ?? null}
            initial={initial}
            history={history}
        />
    );
}
