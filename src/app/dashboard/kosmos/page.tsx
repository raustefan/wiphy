import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/server/authz";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import {
    countKosmosMembers,
    getKosmosMembers,
    getKosmosViewer,
} from "@/lib/server/services/kosmosService";
import { STAGE_CLASS, toYear } from "@/lib/kosmos";
import { Callout, Container } from "@/components/ui";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { KosmosTimeline, KosmosVisibility, Sky } from "./KosmosTimeline";

export const metadata: Metadata = { title: "Alumni-Kosmos" };

export const dynamic = "force-dynamic";

export default async function KosmosPage() {
    const currentUser = await requireUser();
    const viewer = await getKosmosViewer(currentUser.id);
    if (!viewer) redirect("/login");

    if (!(await isFeatureEnabled("KOSMOS"))) {
        return (
            <Container size="3" className="py-8 sm:py-12">
                <DashboardPageHeader eyebrow="Mitgliederbereich" title="Alumni-Kosmos" backHref="/dashboard" />
                <Callout tone="info" title="Derzeit deaktiviert">
                    Der Alumni-Kosmos wurde von einem Administrator vorübergehend abgeschaltet.
                    {viewer.kosmosVisible && " Deine Sichtbarkeit kannst du trotzdem ausschalten."}
                </Callout>
                {viewer.kosmosVisible && (
                    <div className="mt-4">
                        <KosmosVisibility visible />
                    </div>
                )}
            </Container>
        );
    }

    if (viewer.status === "NON_MEMBER") {
        return (
            <Container size="3" className="py-8 sm:py-12">
                <DashboardPageHeader eyebrow="Mitgliederbereich" title="Alumni-Kosmos" backHref="/dashboard" />
                <Callout tone="info" title="Nur für Vereinsmitglieder">
                    Der Alumni-Kosmos steht Mitgliedern des Vereins offen. Sobald deine Mitgliedschaft
                    besteht, kannst du hier mitmachen.
                </Callout>
            </Container>
        );
    }

    if (!viewer.kosmosVisible) return <JoinStage count={await countKosmosMembers()} />;

    return (
        <>
            <KosmosTimeline
                members={await getKosmosMembers()}
                meId={currentUser.id}
                now={toYear(new Date())}
                actions={<KosmosVisibility visible />}
                notice={
                    !viewer.studyStart && (
                        <Link href={`/dashboard/users/${currentUser.id}`} className="link w-fit text-sm font-semibold">
                            Du fehlst noch: Studienbeginn im Profil eintragen →
                        </Link>
                    )
                }
            />
            <Container size="4" className="py-6">
                <p className="text-xs text-faint text-pretty">
                    Spur = Studienzeit · Kopf = Abschluss · Ring = studiert noch. Sichtbar sind Name,
                    Studiengang und Studienzeit; E-Mail-Adresse und LinkedIn-Profil erst auf Klick. Schaltest du deine
                    Sichtbarkeit aus, verschwindest du sofort — und siehst den Kosmos selbst nicht mehr.
                </p>
            </Container>
        </>
    );
}

/** Einwilligung vor dem ersten Blick: wer andere sehen will, zeigt sich selbst. */
function JoinStage({ count }: { count: number }) {
    return (
        <section aria-label="Alumni-Kosmos" className={`${STAGE_CLASS} grid place-items-center p-4`}>
            <Sky />
            <Link
                href="/dashboard"
                className="absolute top-4 left-5 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium opacity-75 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-physics sm:top-6 sm:left-8"
            >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={14} aria-hidden="true" />
                Dashboard
            </Link>
            <div className="k-card grid max-w-xl gap-4 rounded-[10px] border p-5 sm:p-7">
                <p className="font-mono text-xs tracking-wider uppercase opacity-80">
                    {count === 1 ? "1 Mitglied ist" : `${count} Mitglieder sind`} schon im Kosmos
                </p>
                <h1 className="display text-[clamp(1.75rem,4vw,2.5rem)]">Mach mit und sieh, wer mit dir studiert hat</h1>
                <ul className="grid list-disc gap-1 pl-5 text-sm">
                    <li>Andere Mitglieder, die ebenfalls mitmachen, sehen deinen Namen, Studiengang und deine Studienzeit.</li>
                    <li>Deine E-Mail-Adresse und, falls im Profil hinterlegt, dein LinkedIn-Profil sehen sie erst, wenn sie dich anklicken.</li>
                    <li>Du kannst das jederzeit hier wieder ausschalten.</li>
                </ul>
                <KosmosVisibility visible={false} />
                <p className="text-xs opacity-80">
                    Mehr dazu in der{" "}
                    <Link href="/datenschutz#paragraph-alumni-kosmos" className="link">
                        Datenschutzerklärung
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
}
