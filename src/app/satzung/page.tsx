import type { Metadata } from "next";
import { Cta } from "@/components/Site";
import { LegalPage, LegalSections } from "@/components/LegalPage";
import { getFeeDefaults } from "@/lib/server/services/feeDefaultService";
import { resolveFeeDefault } from "@/lib/feeDefaults";
import { annualFee, withSurcharge } from "@/lib/feeCalculation";
import { formatEuro } from "@/lib/format";
import { SATZUNG } from "./satzungstext";
import { pageMetadata } from "@/lib/metadata";
import { MEMBERSHIP_APPLICATION_PATH } from "@/lib/membership";

export const metadata: Metadata = pageMetadata({
    title: "Satzung & Ziele",
    description:
        "Satzung und Beitragsordnung des Wirtschaftsphysik Alumni e.V. — Vereinszweck, Mitgliedschaft, Organe und Mitgliedsbeiträge.",
    path: "/satzung",
});

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
            description="Die Satzung des Wirtschaftsphysik Alumni e. V. im Wortlaut: wozu es den Verein gibt, wer Mitglied werden kann, was es kostet und wer entscheidet."
            note={
                <>
                    Schnell zum{" "}
                    <a href="#paragraph-2" className="link">
                        Vereinszweck
                    </a>{" "}
                    oder zur{" "}
                    <a href="#paragraph-4" className="link">
                        Mitgliedschaft
                    </a>
                    .
                </>
            }
        >
            {/* ---------- Beitragsordnung ---------- */}
            <section
                aria-labelledby="fees-title"
                className="mb-20 grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-14"
            >
                <div>
                    <h2 id="fees-title" className="headline text-3xl">
                        Beiträge
                    </h2>
                    <p className="mt-3 text-sm text-muted text-pretty">
                        Beschlossen von der Mitgliederversammlung, Stand {currentYear}.
                    </p>
                </div>

                <div className="min-w-0">
                    <dl className="border-t border-foreground">
                        {rows.map((row) => (
                            <div
                                key={row.label}
                                className="grid gap-2 border-b border-line py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-10"
                            >
                                <dt className="min-w-0 text-pretty">
                                    {row.label}
                                    {row.hint && (
                                        <span className="mt-1 block text-sm text-muted">{row.hint}</span>
                                    )}
                                </dt>
                                <dd className="grid shrink-0 tabular-nums sm:text-right">
                                    <span className="font-serif text-2xl">
                                        {formatEuro(row.annual)}
                                        <span className="text-base text-muted"> im Jahr</span>
                                    </span>
                                    <span className="text-sm text-muted">{formatEuro(row.monthly)} pro Monat</span>
                                </dd>
                            </div>
                        ))}
                    </dl>

                    <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted text-pretty">
                        Wer im laufenden Jahr eintritt, zahlt nur die verbleibenden Monate — jeder
                        bereits vergangene Monat wird mit einem Zwölftel des Jahresbeitrags
                        abgezogen (§ 5 Abs. 3). Die Beiträge sind in vollem Umfang steuerlich
                        anrechenbar.
                    </p>

                    <div className="mt-8">
                        <Cta href={MEMBERSHIP_APPLICATION_PATH} arrow>
                            Mitglied werden
                        </Cta>
                    </div>
                </div>
            </section>

            {/* ---------- Satzungstext ---------- */}
            <LegalSections document={SATZUNG} />
        </LegalPage>
    );
}
