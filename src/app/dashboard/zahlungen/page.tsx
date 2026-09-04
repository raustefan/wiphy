import { CreditCard, Download, Rows3 } from "lucide-react";
import { requireUser } from "@/lib/server/authz";
import { getEditableUser } from "@/lib/server/services/userService";
import { getFeeDashboardData } from "@/lib/server/services/feeService";
import { Badge, Card, Container, Separator, buttonClasses } from "@/components/ui";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { SectionHeader } from "../SectionHeader";
import { PaymentHistoryTable } from "./PaymentHistoryTable";
import { BankDetailsForm } from "./BankDetailsForm";

export const dynamic = "force-dynamic";

export default async function ZahlungenPage() {
    const currentUser = await requireUser();

    const currentYear = new Date().getFullYear();
    const [profile, feeUsers] = await Promise.all([
        getEditableUser(currentUser.id),
        getFeeDashboardData(currentUser.id, "MEMBER", currentYear),
    ]);

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
                        description="Nur hier kannst du als Mitglied deine Bankverbindung ändern. Dabei bestätigst du das SEPA-Mandat erneut, genau wie bei der Beantragung der Mitgliedschaft."
                    />
                    <Separator className="my-4" />
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
