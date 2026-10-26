"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { AddCircleIcon, Calendar01Icon } from "@hugeicons/core-free-icons";
import { usePathname, useRouter } from "next/navigation";
import { Button, Card, Select } from "@/components/ui";
import { useActionForm } from "@/lib/client/useActionForm";
import { formatEuro } from "@/lib/format";
import { initializeBillingYear } from "./feeActions";

/**
 * Steht für ein Beitragsjahr ohne jede Zeile anstelle der Tabelle: Erst mit
 * „Jahr hinzufügen“ gibt es etwas zu verwalten. Die Beträge rechnet die App
 * selbst aus Standardsatz (§ 5 Abs. 2), Sonderstatus und Lastschrift-Aufschlag
 * (§ 5 Abs. 5) — die Karte nennt nur die Grundlage.
 */
export function AddFeeYearCard({
    year,
    availableYears,
    members,
    students,
    annualRegular,
    annualStudent,
    ratesFromYear,
}: {
    year: number;
    availableYears: number[];
    members: number;
    students: number;
    annualRegular: number;
    annualStudent: number;
    /** Jahr, dessen Beitragssätze gelten — ungleich `year`, wenn für `year` keiner beschlossen ist. */
    ratesFromYear: number | null;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const form = useActionForm(initializeBillingYear, { featureLabel: "Beitragsänderungen" });

    return (
        <Card className="grid justify-items-center gap-5 px-5 py-10 text-center sm:py-14">
            <div className="flex items-center gap-2">
                <HugeiconsIcon icon={Calendar01Icon} size={16} className="text-faint" aria-hidden="true" />
                <label htmlFor="add-year-select" className="text-sm font-medium">
                    Beitragsjahr
                </label>
                <Select
                    id="add-year-select"
                    value={String(year)}
                    onChange={(e) => router.push(`${pathname}?year=${e.target.value}`)}
                    className="py-1.5"
                >
                    {availableYears.map((y) => (
                        <option key={y} value={String(y)}>
                            {y}
                        </option>
                    ))}
                </Select>
            </div>

            <div className="grid max-w-prose gap-2">
                <h2 className="headline text-3xl">{year} ist noch nicht angelegt</h2>
                <p className="text-sm text-muted text-pretty">
                    „Jahr hinzufügen“ legt für {members} {members === 1 ? "Mitglied" : "Mitglieder"} den
                    Beitrag {year} an, davon {students} mit Sonderstatus. Es gelten{" "}
                    {formatEuro(annualRegular)} regulär und {formatEuro(annualStudent)} ermäßigt im
                    Jahr, ohne Lastschrift 10 % mehr (§ 5 Abs. 5).
                </p>
                {ratesFromYear !== year && (
                    <p className="text-sm text-warning text-pretty">
                        Für {year} ist noch kein eigener Beitragssatz eingetragen —
                        {ratesFromYear ? ` es gelten die Sätze von ${ratesFromYear}` : " es gilt 0 €"}. Ändern
                        über „Beitragssätze“ oben; nicht festgelegte Beträge folgen automatisch.
                    </p>
                )}
            </div>

            <Button size="lg" loading={form.pending} onClick={() => void form.run({ year: String(year) })}>
                <HugeiconsIcon icon={AddCircleIcon} size={18} aria-hidden="true" />
                Jahr {year} hinzufügen
            </Button>
            {form.feedback}
        </Card>
    );
}
