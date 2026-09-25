import type { Metadata } from "next";
import { createAltchaChallenge } from "@/lib/server/altcha";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Anmelden" };

// A fresh challenge must be minted on every request, never cached.
export const dynamic = "force-dynamic";

/**
 * Nur seiteneigene Pfade sind als Ziel zugelassen. Ein `next`, das irgendwo
 * herkommt, ist sonst eine offene Weiterleitung: `?next=https://…` schickte
 * frisch Angemeldete auf eine fremde Seite. `//host` zählt dabei als absolute
 * URL und muss deshalb mit ausgeschlossen werden.
 */
function internalPath(value: string | undefined): string | null {
    if (!value || !value.startsWith("/") || value.startsWith("//")) return null;
    return value;
}

/** Rückmeldung nach dem Sperren oder Löschen des eigenen Kontos. */
const NOTICES: Record<string, string> = {
    "zugang=deaktiviert":
        "Dein Zugang wurde deaktiviert. Deine Mitgliedschaft besteht weiter; zum Reaktivieren wende dich an den Vorstand.",
    "konto=geloescht": "Dein Konto wurde vollständig gelöscht.",
};

type Props = { searchParams: Promise<{ next?: string; zugang?: string; konto?: string }> };

export default async function LoginPage({ searchParams }: Props) {
    // Generate the ALTCHA challenge on the server and embed it directly in the
    // page, exactly like the membership form does — the widget solves it
    // locally, so there's no challenge endpoint that can fail.
    const [{ next, zugang, konto }, challenge] = await Promise.all([
        searchParams,
        createAltchaChallenge(),
    ]);

    const notice = NOTICES[`zugang=${zugang}`] ?? NOTICES[`konto=${konto}`] ?? null;

    return (
        <LoginForm
            challengeJson={JSON.stringify(challenge)}
            next={internalPath(next)}
            notice={notice}
        />
    );
}
