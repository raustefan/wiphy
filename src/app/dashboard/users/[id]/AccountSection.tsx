"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DoorOpen, LogOut, Trash2 } from "lucide-react";
import type { MembershipTerminationStatus } from "@prisma/client";
import {
    Button,
    Callout,
    Card,
    Checkbox,
    Dialog,
    DialogFooter,
    Field,
    Input,
} from "@/components/ui";
import { formatDate, formatDateTime } from "@/lib/format";
import { VEREIN } from "@/lib/email/branding";
import {
    deleteOwnAccount,
    disableOwnAccount,
    terminateMembership,
    withdrawMembershipTermination,
} from "./accountActions";

export type OwnTermination = {
    id: string;
    status: MembershipTerminationStatus;
    submittedAt: string;
    effectiveAt: string;
    keepAccount: boolean;
};

type Mode = "terminate" | "disable" | "delete" | "withdraw";

type ActionResult = { ok: true } | { ok: false; message: string };

/**
 * Selbstverwaltung des eigenen Kontos: Kündigen, Zugang sperren, Löschen.
 *
 * Was angeboten wird, hängt an der Mitgliedschaft: Mitglieder können kündigen
 * und ihren Zugang sperren (die Daten braucht der Verein weiter), Konten ohne
 * Mitgliedschaft lassen sich restlos löschen. Alles außer der Rücknahme
 * verlangt das Passwort erneut.
 */
export function AccountSection({
    isMember,
    isAdmin,
    termination,
    terminationPreview,
    terminationEnabled,
    contactFormEnabled,
}: {
    isMember: boolean;
    isAdmin: boolean;
    termination: OwnTermination | null;
    /** Austrittsdatum bei Eingang heute, vom Server berechnet. */
    terminationPreview: string;
    /** Feature-Flag MEMBERSHIP_TERMINATION — aus: Hinweis auf den Weg über den Vorstand. */
    terminationEnabled: boolean;
    contactFormEnabled: boolean;
}) {
    const router = useRouter();
    const [mode, setMode] = useState<Mode | null>(null);
    const [password, setPassword] = useState("");
    const [keepAccount, setKeepAccount] = useState(false);
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    const canTerminate = isMember && !termination && terminationEnabled;
    const terminateOffline = isMember && !termination && !terminationEnabled;
    const canDisable = isMember && !isAdmin;
    const canDelete = !isMember && !isAdmin;
    if (!canTerminate && !terminateOffline && !canDisable && !canDelete && !termination) {
        return null;
    }

    function open(next: Mode) {
        setPassword("");
        setKeepAccount(false);
        setError("");
        setMode(next);
    }

    function submit() {
        const fd = new FormData();
        fd.set("password", password);
        let action: (fd: FormData) => Promise<ActionResult>;
        if (mode === "terminate") {
            fd.set("keepAccount", keepAccount ? "on" : "");
            action = terminateMembership;
        } else if (mode === "disable") {
            action = disableOwnAccount;
        } else if (mode === "delete") {
            action = deleteOwnAccount;
        } else {
            fd.set("id", termination?.id ?? "");
            action = withdrawMembershipTermination;
        }
        setError("");
        startTransition(async () => {
            // Sperren und Löschen enden mit einer Weiterleitung auf den Login.
            const result = await action(fd);
            if (!result.ok) {
                setError(result.message);
                return;
            }
            setMode(null);
            router.refresh();
        });
    }

    const needsPassword = mode !== "withdraw";

    return (
        <Card className="mt-8 grid gap-4 p-5 sm:p-6">
            <div className="grid gap-1">
                <p className="font-semibold">Mitgliedschaft & Konto</p>
                <p className="text-sm text-muted text-pretty">
                    Kündigen, Zugang sperren oder Konto löschen.
                </p>
            </div>

            {termination?.status === "EINGEREICHT" && (
                <Callout tone="info" title="Deine Kündigung ist eingegangen">
                    Eingegangen am {formatDateTime(termination.submittedAt)}. Du bleibst Mitglied
                    bis einschließlich {formatDate(termination.effectiveAt)}. Der Vorstand
                    bestätigt den Austritt in Kürze; bis dahin kannst du die Kündigung
                    zurücknehmen.
                    <div className="mt-3">
                        <Button
                            size="sm"
                            variant="soft"
                            color="neutral"
                            onClick={() => open("withdraw")}
                        >
                            Kündigung zurücknehmen
                        </Button>
                    </div>
                </Callout>
            )}

            {termination?.status === "BESTAETIGT" && (
                <Callout tone="info" title="Austritt bestätigt">
                    Deine Mitgliedschaft endet mit Ablauf des{" "}
                    {formatDate(termination.effectiveAt)}.{" "}
                    {termination.keepAccount
                        ? "Dein Konto bleibt danach ohne Mitgliedschaft bestehen."
                        : "Danach wird dein Login gesperrt."}{" "}
                    Möchtest du doch bleiben, wende dich bitte an den Vorstand.
                </Callout>
            )}

            {terminateOffline && (
                <Callout tone="info" title="Mitgliedschaft kündigen">
                    Die Online-Kündigung ist derzeit nicht verfügbar. Du kannst deine Mitgliedschaft{" "}
                    {contactFormEnabled && (
                        <>
                            über das{" "}
                            <Link href="/kontakt" className="font-semibold underline underline-offset-2">
                                Kontaktformular
                            </Link>{" "}
                            oder{" "}
                        </>
                    )}
                    per E-Mail an den Vorstand unter{" "}
                    <a
                        href={`mailto:${VEREIN.email}`}
                        className="font-semibold underline underline-offset-2"
                    >
                        {VEREIN.email}
                    </a>{" "}
                    beenden. Nach § 6 der Satzung ist das mit vier Wochen Frist zum Jahresende
                    möglich; maßgeblich ist der Eingang beim Vorstand.
                </Callout>
            )}

            <div className="flex flex-wrap gap-2">
                {canTerminate && (
                    <Button variant="soft" color="danger" onClick={() => open("terminate")}>
                        <DoorOpen size={16} aria-hidden="true" /> Mitgliedschaft kündigen
                    </Button>
                )}
                {canDisable && (
                    <Button variant="soft" color="neutral" onClick={() => open("disable")}>
                        <LogOut size={16} aria-hidden="true" /> Zugang deaktivieren
                    </Button>
                )}
                {canDelete && (
                    <Button variant="soft" color="danger" onClick={() => open("delete")}>
                        <Trash2 size={16} aria-hidden="true" /> Konto löschen
                    </Button>
                )}
            </div>

            <Dialog
                open={mode != null}
                onClose={() => setMode(null)}
                title={
                    mode === "terminate"
                        ? "Mitgliedschaft kündigen"
                        : mode === "disable"
                          ? "Zugang deaktivieren"
                          : mode === "delete"
                            ? "Konto endgültig löschen"
                            : "Kündigung zurücknehmen?"
                }
            >
                <div className="grid gap-4 text-sm leading-relaxed text-muted text-pretty">
                    {mode === "terminate" && (
                        <>
                            <p>
                                Nach § 6 der Satzung ist ein Austritt mit einer Frist von vier
                                Wochen zum Ende des Geschäftsjahres möglich. Geht deine Kündigung
                                heute ein, bist du Mitglied bis einschließlich{" "}
                                <span className="font-semibold text-foreground">
                                    {formatDate(terminationPreview)}
                                </span>
                                . Bis dahin bleiben Rechte und Beitragspflicht bestehen.
                            </p>
                            <label className="flex cursor-pointer items-start gap-2">
                                <Checkbox
                                    checked={keepAccount}
                                    onChange={(event) => setKeepAccount(event.target.checked)}
                                />
                                <span className="text-foreground">
                                    Konto nach dem Austritt behalten (ohne Mitgliedschaft). Sonst
                                    wird der Login zum Austrittsdatum gesperrt.
                                </span>
                            </label>
                        </>
                    )}
                    {mode === "disable" && (
                        <p>
                            Du kannst dich danach nicht mehr anmelden, alle Sitzungen werden
                            beendet.{" "}
                            <span className="font-semibold text-foreground">
                                Deine Mitgliedschaft besteht weiter
                            </span>{" "}
                            — der Verein behält deshalb deine Daten und erreicht dich per E-Mail
                            oder Post. Zum Reaktivieren genügt eine Nachricht an den Vorstand.
                            Wenn du austreten möchtest, kündige bitte zusätzlich.
                        </p>
                    )}
                    {mode === "delete" && (
                        <p>
                            Dein Konto wird mit allen zugehörigen Daten{" "}
                            <span className="font-semibold text-foreground">
                                sofort und unwiderruflich
                            </span>{" "}
                            gelöscht, einschließlich eventueller Anträge. Hast du früher Beiträge
                            gezahlt, bewahren wir nur diese Buchungen mit Name und Mitgliedsnummer
                            wegen der steuerlichen Aufbewahrungspflicht gesperrt auf.
                        </p>
                    )}
                    {mode === "withdraw" && (
                        <p>Deine Mitgliedschaft läuft dann unverändert weiter.</p>
                    )}

                    {needsPassword && (
                        <Field label="Passwort zur Bestätigung">
                            <Input
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </Field>
                    )}

                    {error && (
                        <p role="alert" className="text-negative">
                            {error}
                        </p>
                    )}
                </div>
                <DialogFooter>
                    <Button
                        variant="soft"
                        color="neutral"
                        onClick={() => setMode(null)}
                        disabled={isPending}
                    >
                        Abbrechen
                    </Button>
                    <Button
                        color={mode === "withdraw" ? "accent" : "danger"}
                        onClick={submit}
                        loading={isPending}
                        disabled={needsPassword && !password}
                    >
                        {mode === "terminate"
                            ? "Verbindlich kündigen"
                            : mode === "disable"
                              ? "Zugang deaktivieren"
                              : mode === "delete"
                                ? "Endgültig löschen"
                                : "Zurücknehmen"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </Card>
    );
}
