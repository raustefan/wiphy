import type { MailSendReport } from "@/lib/server/email/sendReport";
import { Callout } from "@/components/ui";

/** Wer eine Rundmail nicht bekommen hat — nichts, wenn alles rausging. */
export function MailSendNotice({ report }: { report: MailSendReport }) {
    const { failed } = report;
    return (
        <>
            {failed.length > 0 && (
                <Callout
                    tone="warning"
                    className="text-left"
                    title={`${failed.length} ${failed.length === 1 ? "Person hat" : "Personen haben"} die Mail nicht bekommen`}
                >
                    <div className="grid gap-2">
                        <p>{report.reason}</p>
                        <ul className="max-h-48 overflow-y-auto rounded-[3px] bg-surface p-2">
                            {failed.map((user) => (
                                <li key={user.email} className="truncate text-xs">
                                    {user.name ? `${user.name} · ` : ""}
                                    {user.email}
                                </li>
                            ))}
                        </ul>
                        <p>
                            Für einen zweiten Versand nur diese Personen auswählen — alle anderen
                            haben die Mail schon und stehen im Versandprotokoll.
                        </p>
                    </div>
                </Callout>
            )}
            {report.copyFailed && (
                <Callout tone="warning" className="text-left" title="Kopie an dich nicht verschickt">
                    Die Rundmail selbst ist raus, nur die Kopie an deine Adresse ließ sich nicht
                    zustellen.
                </Callout>
            )}
        </>
    );
}
