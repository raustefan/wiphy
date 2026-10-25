import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LegalPage, LegalSections } from "@/components/LegalPage";
import LogoutButton from "@/components/LogoutButton";
import { Button } from "@/components/ui";
import { getOptionalUser, needsPrivacyConsent } from "@/lib/server/authz";
import { internalPath } from "@/lib/internalPath";
import { DATENSCHUTZ } from "../datenschutztext";
import { confirmPrivacyPolicy } from "./actions";

export const metadata: Metadata = {
    title: "Datenschutzerklärung bestätigen",
    robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ next?: string }> };

/** Ziel von `requireUser`, solange die aktuelle Fassung nicht bestätigt ist. */
export default async function ConfirmPrivacyPolicyPage({ searchParams }: Props) {
    const [{ next }, user] = await Promise.all([searchParams, getOptionalUser()]);
    const target = internalPath(next);
    if (!user) redirect("/login");
    if (!needsPrivacyConsent(user)) redirect(target ?? "/dashboard");

    return (
        <LegalPage
            title="Datenschutz"
            description="Unsere Datenschutzerklärung hat sich geändert oder du meldest dich zum ersten Mal an. Bitte lies sie und bestätige am Ende der Seite, dass du sie zur Kenntnis genommen hast."
        >
            <LegalSections document={DATENSCHUTZ} />
            <div className="sticky bottom-0 mt-12 flex flex-wrap items-center justify-end gap-3 border-t border-line bg-background py-4">
                <LogoutButton />
                <form action={confirmPrivacyPolicy}>
                    {target && <input type="hidden" name="next" value={target} />}
                    <Button type="submit">Zur Kenntnis genommen, weiter</Button>
                </form>
            </div>
        </LegalPage>
    );
}
