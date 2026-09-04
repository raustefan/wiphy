import type { Metadata } from "next";
import { Scale } from "lucide-react";
import { ButtonLink, Card, Prose, SectionTitle, Separator } from "@/components/ui";
import { LegalPage, LegalSections } from "@/components/LegalPage";
import { getFeeDefaults } from "@/lib/server/services/feeDefaultService";
import { resolveFeeDefault } from "@/lib/feeDefaults";
import { annualFee, withSurcharge } from "@/lib/feeCalculation";
import { formatEuro } from "@/lib/format";
import { SATZUNG } from "./satzungstext";

export const metadata: Metadata = {
    title: "Satzung & Ziele",
    description:
        "Satzung und Beitragsordnung des Wirtschaftsphysik Alumni e.V. — Vereinszweck, Mitgliedschaft, Organe und Mitgliedsbeiträge.",
};

export const dynamic = "force-dynamic";

export default async function SatzungPage() {
    // Die Beitragstabelle zieht die tatsächlich hinterlegten Sätze, damit sie
    // nicht auseinanderläuft, sobald die Mitgliederversammlung sie anpasst.
    const currentYear = new Date().getFullYear();
    const monthly = resolveFeeDefault(await getFeeDefaults(), currentYear);

    const rows = [
        {
            label: "Ordentliches Mitglied",
            monthly: monthly.regular,
            annual: annualFee(monthly.regular),
        },
        {
            label: "Ordentliches Mitglied (ohne Teilnahme am Lastschriftverfahren)",
            hint: "2,- € pro Monat + 10 % Aufschlag, aufgerundet gemäß § 5 Abs. 5",
            monthly: monthly.regular,
            annual: withSurcharge(annualFee(monthly.regular)),
        },
        {
            label: "Ordentliches Mitglied mit Sonderstatus (z. B. Studierende)",
            monthly: monthly.student,
            annual: annualFee(monthly.student),
        },
        {
            label: "Ordentliches Mitglied mit Sonderstatus (ohne Teilnahme am Lastschriftverfahren)",
            hint: "1,- € pro Monat + 10 % Aufschlag, aufgerundet gemäß § 5 Abs. 5",
            monthly: monthly.student,
            annual: withSurcharge(annualFee(monthly.student)),
        },
    ];

    return (
        <LegalPage
            title="Satzung & Ziele"
            eyebrow={
                <>
                    <Scale size={16} aria-hidden="true" />
                    Verein
                </>
            }
        >
            <Prose className="mb-8 max-w-prose">
                Die Satzung des Wirtschaftsphysik Alumni e.V. im Wortlaut. Sie regelt Zweck,
                Mitgliedschaft, Beiträge und Organe des Vereins.
            </Prose>

            {/* ---------- Beitragsordnung ---------- */}
            <Card className="mb-10 grid gap-4 p-5 sm:p-6">
                <div>
                    <SectionTitle>Mitgliedsbeiträge für ordentliche Mitglieder</SectionTitle>
                    <p className="mt-1 text-sm text-muted">
                        Beschlossen von der Mitgliederversammlung, Stand {currentYear}.
                    </p>
                </div>

                <dl className="grid gap-3">
                    {rows.map((row) => (
                        <div
                            key={row.label}
                            className="flex flex-col justify-between gap-1 border-t border-line pt-3 sm:flex-row sm:items-baseline sm:gap-6"
                        >
                            <dt className="min-w-0 text-sm text-pretty">
                                {row.label}
                                {row.hint && (
                                    <span className="block text-sm text-faint">{row.hint}</span>
                                )}
                            </dt>
                            <dd className="shrink-0 text-sm font-bold tabular-nums sm:text-right">
                                {formatEuro(row.monthly)} pro Monat
                                <span className="block font-medium text-muted">
                                    {formatEuro(row.annual)} im Jahr
                                </span>
                            </dd>
                        </div>
                    ))}
                </dl>

                <Separator />

                <p className="text-sm text-muted text-pretty">
                    Bei Eintritt im laufenden Jahr wird der Beitrag um die bereits vergangenen
                    Monate gekürzt, die jeweils mit einem Zwölftel des Jahresbeitrages bewertet
                    werden (§ 5 Abs. 3). Die Beiträge sind in vollem Umfang steuerlich
                    anrechenbar.
                </p>

                <ButtonLink href="/register" className="justify-self-start">
                    Mitglied werden
                </ButtonLink>
            </Card>

            {/* ---------- Satzungstext ---------- */}
            <LegalSections document={SATZUNG} />
        </LegalPage>
    );
}
