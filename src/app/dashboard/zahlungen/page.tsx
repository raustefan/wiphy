import { redirect } from "next/navigation";
import { CreditCard, Download, Rows3 } from "lucide-react";
import { requireUser } from "@/lib/server/authz";
import { getEditableUser } from "@/lib/server/services/userService";
import { getFeeDashboardData } from "@/lib/server/services/feeService";
import { getFeeRatesForYear } from "@/lib/server/services/feeDefaultService";
import { annualFee, withSurcharge } from "@/lib/feeCalculation";
import { formatEuro } from "@/lib/format";
import { Badge, Card, Container, Separator, buttonClasses } from "@/components/ui";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { SectionHeader } from "../SectionHeader";
import { PaymentHistoryTable } from "./PaymentHistoryTable";
import { BankDetailsForm } from "./BankDetailsForm";

export const dynamic = "force-dynamic";

export default async function ZahlungenPage() {
    const currentUser = await requireUser();

    const currentYear = new Date().getFullYear();
    const [profile, feeUsers, rates] = await Promise.all([
        getEditableUser(currentUser.id),
        getFeeDashboardData(currentUser.id, "MEMBER", currentYear),
        getFeeRatesForYear(currentYear),
    ]);

    /*
     * Beitragshistorie und SEPA-Mandat setzen eine Mitgliedschaft voraus: Wer
     * nur ein Konto hat, schuldet keinen Beitrag und erteilt dem Verein auch
     * kein Mandat. Die Seite gibt es für ihn deshalb gar nicht.
     *
     * Der Status kommt aus der Datenbank, nicht aus der Session: Im Token steht
     * er seit der Anmeldung fest, ein frisch aufgenommenes Mitglied wäre sonst
     * bis zum nächsten Login ausgesperrt.
     */
    const status = profile?.status ?? currentUser.status ?? "KEIN_MITGLIED";
    if (status === "KEIN_MITGLIED") redirect("/dashboard");

    const myRecord = feeUsers.find((u) => u.id === currentUser.id);
    const fees = (myRecord?.fees ?? []).slice().sort((a, b) => b.jahr - a.jahr);

    return (
        <Container size="3" className="py-8 sm:py-12">
            <DashboardPageHeader
                eyebrow="Mitgliederbereich"
                title="Zahlungen verwalten"
                description="Deine vollständige Beitragshistorie und deine Bankverbindung für den Mitgliedsbeitrag."
                backHref="/dashboard"
            >
                <a href="/api/dashboard/zahlungen/pdf" className={buttonClasses({ variant: "soft", color: "neutral" })}>
                    <Download size={16} aria-hidden="true" />
                    Als PDF herunterladen
                </a>
            </DashboardPageHeader>

            <div className="grid gap-6">
                <Card className="p-5 sm:p-6">
                    <SectionHeader
                        icon={<CreditCard size={16} />}
                        eyebrow="Beitragshistorie"
                        title="Deine Beitragsjahre im Überblick"
                        aside={
                            <Badge className="self-start">
                                <Rows3 size={14} aria-hidden="true" />
                                {fees.length} {fees.length === 1 ? "Jahr" : "Jahre"}
                            </Badge>
                        }
                    />
                    <Separator className="my-4" />
                    <PaymentHistoryTable fees={fees} />
                </Card>

                <Card className="p-5 sm:p-6">
                    <SectionHeader
                        icon={<CreditCard size={16} />}
                        eyebrow="SEPA-Lastschriftmandat"
                        title="Bankverbindung"
                        description="Hier kannst du deine Bankverbindung für den Mitgliedsbeitrag hinterlegen oder ändern. Wir ziehen den Beitrag dann automatisch per SEPA-Lastschrift ein."
                    />
                    <Separator className="my-4" />

                    {/* Dieselbe Rechnung wie im Aufnahmeantrag, hier fürs
                        laufende Jahr: Wer die Lastschrift widerruft, soll den
                        Aufschlag nicht erst beim nächsten Beitragsbescheid
                        erfahren, sondern schon hier, wo er die Wahl trifft. */}
                    <div className="mb-4 grid gap-1.5 rounded-xl border border-line bg-raised/60 p-4 text-sm">
                        <p className="font-semibold">Mitgliedsbeitrag {currentYear}</p>
                        <p className="text-muted text-pretty">
                            Regulär {formatEuro(annualFee(rates.regular))} im Jahr, mit
                            Studierendenstatus ermäßigt auf{" "}
                            {formatEuro(annualFee(rates.student))} im Jahr. Ohne
                            SEPA-Lastschrift erhöht sich der Beitrag nach § 5 Abs. 5 um 10 % auf{" "}
                            {formatEuro(withSurcharge(annualFee(rates.regular)))} bzw.{" "}
                            {formatEuro(withSurcharge(annualFee(rates.student)))} im Jahr.
                        </p>
                    </div>

                    <BankDetailsForm
                        initial={{
                            bank: profile?.bank ?? "",
                            BLZ: profile?.BLZ ?? "",
                            KTO: profile?.KTO ?? "",
                            IBAN: profile?.IBAN ?? "",
                            BIC: profile?.BIC ?? "",
                            bankeinzug: Boolean(profile?.bankeinzug),
                        }}
                        mandatserteilung={profile?.mandatserteilung ?? null}
                    />
                </Card>
            </div>
        </Container>
    );
}
