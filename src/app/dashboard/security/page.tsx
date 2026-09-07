import Link from "next/link";
import { Activity, AlertTriangle, Filter, Info, ShieldAlert, UserX } from "lucide-react";
import { requireAdmin } from "@/lib/server/authz";
import {
    getActivityHeatmap,
    getRegistrationFunnel,
    getSecurityOverview,
    parseWindowDays,
    WINDOW_DAYS,
    type TypeStat,
} from "@/lib/server/services/securityEventService";
import { getRateLimitEntries, summarizeByBucket } from "@/lib/server/services/rateLimitService";
import {
    getPendingRegistrationStats,
    pruneUnverifiedRegistrations,
    UNVERIFIED_TTL_HOURS,
} from "@/lib/server/registrationCleanup";
import { formatDateTime, formatNumber } from "@/lib/format";
import {
    Badge,
    Callout,
    Card,
    Container,
    SectionTitle,
    Table,
    TableWrap,
    Td,
    Th,
    buttonClasses,
} from "@/components/ui";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { OutcomeTimeline } from "./OutcomeTimeline";
import { TypeSparklines } from "./TypeSparklines";
import { StatTile } from "./StatTiles";
import { ReasonBars } from "./ReasonBars";
import { ActivityHeatmap } from "./ActivityHeatmap";
import { RegistrationFunnel } from "./RegistrationFunnel";
import { RateLimitTable } from "./RateLimitTable";
import { OUTCOME_LABELS, OUTCOME_TONES, reasonLabel, TYPE_ORDER, typeLabel } from "./securityLabels";

export const dynamic = "force-dynamic";

/**
 * Kopfzeile der scrollbaren Ereignisliste. Deckend, nicht `bg-raised/60` wie
 * sonst: durch eine durchscheinende Kopfzeile würden die durchlaufenden Zeilen
 * sichtbar. `sticky` sitzt an jeder Zelle statt an `<thead>`, weil das in allen
 * Browsern trägt.
 */
const STICKY_TH = "sticky top-0 z-10 bg-raised";

export default async function SecurityPage({
    searchParams,
}: {
    searchParams?: Promise<{ tage?: string }>;
}) {
    await requireAdmin();

    const resolvedParams = searchParams ? await searchParams : undefined;
    const days = parseWindowDays(resolvedParams?.tage);

    // Dritter Aufhänger für den Aufräumlauf (neben Registrierung und
    // Bestätigungslink) — und der einzige, den ein Admin selbst auslösen kann:
    // ein Neuladen dieser Seite zeigt damit einen aktuellen Stand, nicht einen,
    // der auf die nächste Registrierung wartet.
    await pruneUnverifiedRegistrations();

    const [overview, rateLimitEntries, pendingRegistrations, funnel, heatmap] =
        await Promise.all([
            getSecurityOverview(days),
            getRateLimitEntries(),
            getPendingRegistrationStats(),
            getRegistrationFunnel(days),
            getActivityHeatmap(days),
        ]);
    const rateLimitSummary = summarizeByBucket(rateLimitEntries);

    // Auch Vorgangsarten ohne einen einzigen Eintrag bekommen eine Kachel: „hier
    // ist nichts passiert“ ist auf einer Sicherheitsseite eine Aussage, eine
    // fehlende Kachel dagegen sieht aus wie ein Fehler.
    const statsByType = new Map(overview.byType.map((stat) => [stat.type, stat]));
    const typeStats: TypeStat[] = TYPE_ORDER.map(
        (type) =>
            statsByType.get(type) ?? {
                type,
                success: 0,
                failure: 0,
                blocked: 0,
                total: 0,
                series: new Array(overview.dayKeys.length).fill(0),
            },
    );

    const blockedNow = rateLimitSummary.reduce((sum, bucket) => sum + bucket.blockedCount, 0);
    const expiredRegistrations =
        typeStats.find((stat) => stat.type === "REGISTRATION_EXPIRED")?.total ?? 0;

    return (
        <Container size="4" className="py-8 sm:py-12">
            <DashboardPageHeader
                eyebrow="Admin"
                title="Sicherheit"
                description="Anmeldungen, Registrierungen, Kontaktanfragen und Passwort-Zurücksetzungen im Zeitverlauf — dazu die aktuell greifenden Rate Limits."
                backHref="/dashboard"
            />

            {/* Ein Zeitraumfilter für die ganze Seite, nicht einer je Grafik:
                sonst vergleicht man versehentlich Zahlen aus zwei Zeiträumen. */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-sm text-muted">Zeitraum</span>
                {WINDOW_DAYS.map((option) => (
                    <Link
                        key={option}
                        href={`/dashboard/security?tage=${option}`}
                        aria-current={option === days ? "page" : undefined}
                        className={buttonClasses({
                            size: "sm",
                            variant: option === days ? "solid" : "soft",
                            color: option === days ? "accent" : "neutral",
                        })}
                    >
                        {option} Tage
                    </Link>
                ))}
            </div>

            {overview.totals.total === 0 && (
                <Callout tone="info" icon={<Info size={16} />} className="mb-6">
                    Für diesen Zeitraum liegen noch keine Einträge vor. Das Protokoll füllt sich ab
                    dem ersten Anmelde- oder Formularvorgang von selbst.
                </Callout>
            )}

            {/* ---------- Kennzahlen ---------- */}
            <Card className="mb-6 p-5 sm:p-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <p className="text-sm text-muted">Vorgänge insgesamt</p>
                        <p className="text-5xl font-semibold tracking-tight">
                            {formatNumber(overview.totals.total)}
                        </p>
                        <p className="mt-1 text-xs text-faint">in den letzten {days} Tagen</p>
                    </div>
                    <StatTile
                        label="Erfolgreich"
                        tone="success"
                        value={overview.totals.success}
                        previous={overview.previous.success}
                    />
                    <StatTile
                        label="Abgewehrt"
                        tone="blocked"
                        value={overview.totals.blocked}
                        previous={overview.previous.blocked}
                        hint="Rate Limit, Captcha, Honeypot oder abgeschaltete Funktion."
                    />
                    <StatTile
                        label="Fehlgeschlagen"
                        tone="failure"
                        value={overview.totals.failure}
                        previous={overview.previous.failure}
                        moreIsWorse
                        hint="Falsche Zugangsdaten, ungültige Links, belegte Adressen."
                    />
                </div>
            </Card>

            {/* ---------- Trichter ---------- */}
            <Card className="mb-6 p-5 sm:p-6">
                <SectionTitle>
                    <span className="inline-flex items-center gap-2">
                        <Filter size={20} aria-hidden="true" />
                        Vom Formular zur Mitgliedschaft
                    </span>
                </SectionTitle>
                <p className="mt-1 mb-5 text-sm text-muted">
                    Wie weit neue Interessierte kommen — und wo sie unterwegs abspringen.
                    Bricht eine Stufe plötzlich ein, liegt es meist an ihr und nicht an den
                    Leuten: eine Bestätigungsmail im Spam-Ordner sieht genau so aus.
                </p>
                <RegistrationFunnel data={funnel} days={days} />
            </Card>

            {/* ---------- Unbestätigte Registrierungen ---------- */}
            <Card className="mb-6 p-5 sm:p-6">
                <SectionTitle>
                    <span className="inline-flex items-center gap-2">
                        <UserX size={20} aria-hidden="true" />
                        Unbestätigte Registrierungen
                    </span>
                </SectionTitle>
                <p className="mt-1 mb-5 text-sm text-muted">
                    Wer sich selbst registriert, hat {UNVERIFIED_TTL_HOURS} Stunden Zeit, die
                    E-Mail-Adresse zu bestätigen. Danach wird das Konto automatisch gelöscht — so
                    bleiben erfundene Adressen aus der Nutzerliste, und die Admin-Benachrichtigung
                    geht ohnehin erst nach der Bestätigung raus. Von Admins angelegte Konten und
                    Konten von vor Einführung dieser Regel sind ausgenommen.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="grid gap-1">
                        <p className="text-sm text-muted">Automatisch gelöscht</p>
                        <p className="text-3xl font-semibold tracking-tight">
                            {formatNumber(expiredRegistrations)}
                        </p>
                        <p className="text-xs leading-relaxed text-faint">
                            in den letzten {days} Tagen — jede Löschung steht als eigener Eintrag
                            im Protokoll.
                        </p>
                    </div>
                    <div className="grid gap-1">
                        <p className="text-sm text-muted">Zurzeit offen</p>
                        <p className="text-3xl font-semibold tracking-tight">
                            {formatNumber(pendingRegistrations.pending)}
                        </p>
                        <p className="text-xs leading-relaxed text-faint">
                            {pendingRegistrations.nextDeletionAt
                                ? `Nächste Löschung am ${formatDateTime(pendingRegistrations.nextDeletionAt)}.`
                                : "Keine Registrierung wartet auf eine Bestätigung."}
                        </p>
                    </div>
                </div>
                {!pendingRegistrations.enabled && (
                    <Callout tone="warning" icon={<AlertTriangle size={16} />} className="mt-5">
                        Das automatische Löschen ist über die Funktionsschalter abgeschaltet.
                        Unbestätigte Konten bleiben bis auf Weiteres stehen.
                    </Callout>
                )}
            </Card>

            {/* ---------- Verlauf ---------- */}
            <Card className="mb-6 p-5 sm:p-6">
                <SectionTitle>Tagesverlauf</SectionTitle>
                <p className="mt-1 mb-4 text-sm text-muted">
                    Alle protokollierten Vorgänge je Tag, gestapelt nach Ergebnis. Zeiger auf einen
                    Tag halten zeigt die genauen Zahlen.
                </p>
                <OutcomeTimeline daily={overview.daily} />
            </Card>

            {/* ---------- Wochenraster ---------- */}
            <Card className="mb-6 p-5 sm:p-6">
                <SectionTitle>Wochenraster</SectionTitle>
                <p className="mt-1 mb-5 text-sm text-muted">
                    Alle Vorgänge nach Wochentag und Stunde, in deutscher Zeit. Menschen sind
                    abends und am Wochenende unterwegs; ein gleichmäßig durchgefärbtes Raster
                    — besonders nachts — spricht für automatisierte Zugriffe.
                </p>
                <ActivityHeatmap data={heatmap} />
            </Card>

            {/* ---------- Verlauf je Vorgangsart ---------- */}
            <section className="mb-6">
                <SectionTitle>Nach Vorgangsart</SectionTitle>
                <p className="mt-1 mb-4 text-sm text-muted">
                    Jede Grafik hat ihre eigene Skala — die Höhen sind zwischen den Kacheln nicht
                    vergleichbar, die beschriftete Tagesspitze schon.
                </p>
                <TypeSparklines stats={typeStats} dayKeys={overview.dayKeys} />
            </section>

            {/* ---------- Zahlen zu den Grafiken ---------- */}
            <Card className="mb-6 p-5 sm:p-6">
                <SectionTitle>Versuche und Erfolge im Detail</SectionTitle>
                <p className="mt-1 text-sm text-muted">
                    Dieselben Daten wie oben als Tabelle — jeder Wert der Grafiken ist hier
                    nachzulesen.
                </p>
                <TableWrap className="mt-4">
                    <Table className="min-w-[640px]">
                        <thead>
                            <tr className="bg-raised/60">
                                <Th>Vorgang</Th>
                                <Th className="text-right">Versuche</Th>
                                <Th className="text-right">Erfolgreich</Th>
                                <Th className="text-right">Abgewehrt</Th>
                                <Th className="text-right">Fehlgeschlagen</Th>
                                <Th className="text-right">Erfolgsquote</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {typeStats.map((stat) => (
                                <tr key={stat.type}>
                                    <Td className="font-medium">{typeLabel(stat.type)}</Td>
                                    <Td className="text-right tabular-nums">{formatNumber(stat.total)}</Td>
                                    <Td className="text-right tabular-nums">{formatNumber(stat.success)}</Td>
                                    <Td className="text-right tabular-nums">{formatNumber(stat.blocked)}</Td>
                                    <Td className="text-right tabular-nums">{formatNumber(stat.failure)}</Td>
                                    <Td className="text-right tabular-nums text-muted">
                                        {stat.total > 0
                                            ? `${Math.round((stat.success / stat.total) * 100)} %`
                                            : "—"}
                                    </Td>
                                </tr>
                            ))}
                            <tr className="bg-raised/40 font-semibold">
                                <Td>Gesamt</Td>
                                <Td className="text-right tabular-nums">{formatNumber(overview.totals.total)}</Td>
                                <Td className="text-right tabular-nums">{formatNumber(overview.totals.success)}</Td>
                                <Td className="text-right tabular-nums">{formatNumber(overview.totals.blocked)}</Td>
                                <Td className="text-right tabular-nums">{formatNumber(overview.totals.failure)}</Td>
                                <Td className="text-right tabular-nums text-muted">
                                    {overview.totals.total > 0
                                        ? `${Math.round((overview.totals.success / overview.totals.total) * 100)} %`
                                        : "—"}
                                </Td>
                            </tr>
                        </tbody>
                    </Table>
                </TableWrap>
            </Card>

            {/* ---------- Gründe ---------- */}
            <Card className="mb-6 p-5 sm:p-6">
                <SectionTitle>Warum Vorgänge abgewiesen wurden</SectionTitle>
                <p className="mt-1 mb-4 text-sm text-muted">
                    Häufigste Gründe für abgewehrte und fehlgeschlagene Vorgänge im Zeitraum.
                </p>
                {overview.reasons.length === 0 ? (
                    <p className="py-6 text-center text-sm text-muted">
                        Keine abgewiesenen Vorgänge im Zeitraum.
                    </p>
                ) : (
                    <ReasonBars reasons={overview.reasons} />
                )}
            </Card>

            {/* ---------- Einzelne Ereignisse ---------- */}
            <Card className="mb-6 p-5 sm:p-6">
                <SectionTitle>Letzte Ereignisse</SectionTitle>
                <p className="mt-1 text-sm text-muted">
                    Die 60 jüngsten Einträge, unabhängig vom gewählten Zeitraum — in der Liste
                    scrollbar.
                </p>
                {overview.recent.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted">Noch keine Einträge.</p>
                ) : (
                    /* Eigener Rahmen statt `TableWrap`: hier wird in beide
                       Richtungen gescrollt. Ohne die Höhenbegrenzung schiebt die
                       Liste alles Nachfolgende — Rate Limits, Hinweise — um zwei
                       Bildschirmseiten nach unten. */
                    <div className="mt-4 max-h-[26rem] overflow-auto">
                        <Table className="min-w-[780px]">
                            <thead>
                                <tr>
                                    <Th className={STICKY_TH}>Zeitpunkt</Th>
                                    <Th className={STICKY_TH}>Vorgang</Th>
                                    <Th className={STICKY_TH}>Ergebnis</Th>
                                    <Th className={STICKY_TH}>Grund</Th>
                                    <Th className={STICKY_TH}>Konto / Kennung</Th>
                                    <Th className={STICKY_TH}>IP-Pseudonym</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {overview.recent.map((event) => (
                                    <tr key={event.id}>
                                        <Td className="whitespace-nowrap tabular-nums text-muted">
                                            {formatDateTime(event.createdAt)}
                                        </Td>
                                        <Td className="font-medium">{typeLabel(event.type)}</Td>
                                        <Td>
                                            <Badge tone={OUTCOME_TONES[event.outcome]}>
                                                {OUTCOME_LABELS[event.outcome]}
                                            </Badge>
                                        </Td>
                                        <Td className="text-muted">{reasonLabel(event.reason)}</Td>
                                        <Td className="text-muted">
                                            {event.account ? (
                                                <Link
                                                    href={`/dashboard/users/${event.account.id}`}
                                                    className="underline underline-offset-2 hover:text-foreground"
                                                >
                                                    {event.account.email}
                                                </Link>
                                            ) : event.subjectHash ? (
                                                <span className="font-mono text-xs" title="Pseudonym der E-Mail-Adresse — nicht rückrechenbar">
                                                    {event.subjectHash.slice(0, 10)}…
                                                </span>
                                            ) : (
                                                "—"
                                            )}
                                        </Td>
                                        <Td className="font-mono text-xs text-muted">
                                            {event.ipHash ? `${event.ipHash.slice(0, 10)}…` : "—"}
                                        </Td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </Card>

            {/* ---------- Rate Limits ---------- */}
            <section className="mb-6">
                <SectionTitle>
                    <span className="inline-flex items-center gap-2">
                        <ShieldAlert size={20} aria-hidden="true" />
                        Rate Limits
                    </span>
                </SectionTitle>
                <p className="mt-1 mb-4 text-sm text-muted">
                    Der aktuelle Stand der Zähler, nicht ihre Geschichte: abgelaufene Einträge
                    werden laufend gelöscht.
                    {blockedNow > 0
                        ? ` Zurzeit sind ${formatNumber(blockedNow)} Einträge blockiert.`
                        : " Zurzeit ist nichts blockiert."}
                </p>
                {rateLimitEntries.length === 0 ? (
                    <Card className="p-6">
                        <p className="py-8 text-center text-sm text-muted">
                            Aktuell keine aktiven Rate-Limit-Einträge.
                        </p>
                    </Card>
                ) : (
                    <RateLimitTable summary={rateLimitSummary} entries={rateLimitEntries} />
                )}
            </section>

            <Callout tone="info" icon={<Activity size={16} />} title="Was hier gespeichert ist">
                <p className="leading-relaxed">
                    Das Protokoll enthält weder Passwörter noch Nachrichteninhalte oder Links.
                    E-Mail- und IP-Adressen stehen ausschließlich als nicht rückrechenbares
                    Pseudonym. IP-Pseudonym und Browserkennung werden nach{" "}
                    {overview.retention.pseudonym} Tagen entfernt, der ganze Eintrag nach{" "}
                    {overview.retention.event} Tagen. Aktuell gespeichert:{" "}
                    {formatNumber(overview.storedTotal)} Einträge
                    {overview.oldestEvent
                        ? `, ältester vom ${formatDateTime(overview.oldestEvent)}`
                        : ""}
                    .
                </p>
            </Callout>
        </Container>
    );
}
