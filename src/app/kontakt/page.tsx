import type { Metadata } from "next";
import { ALTCHA_COMPLEXITY, createAltchaChallenge } from "@/lib/server/altcha";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
    title: "Kontakt | WirtschaftsPhysik Alumni e.V.",
    description:
        "Nimm Kontakt zum Vorstand des WirtschaftsPhysik Alumni e.V. auf — für Fragen zur Mitgliedschaft, zum Verein oder zu Veranstaltungen.",
};

// A fresh challenge must be minted on every request, never cached.
export const dynamic = "force-dynamic";

export default async function KontaktPage() {
    const [challenge, enabled] = await Promise.all([
        // Public endpoint: worth paying for a harder proof-of-work here.
        createAltchaChallenge(ALTCHA_COMPLEXITY.unauthenticated),
        isFeatureEnabled("CONTACT_FORM"),
    ]);

    return (
        <ContactForm
            challengeJson={JSON.stringify(challenge)}
            enabled={enabled}
        />
    );
}
