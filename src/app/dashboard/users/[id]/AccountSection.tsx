"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon, Door01Icon, Logout01Icon } from "@hugeicons/core-free-icons";
import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Button,
    Callout,
    Card,
    Dialog,
    DialogFooter,
    Field,
    Input,
} from "@/components/ui";
import { formatDate, formatEuro } from "@/lib/format";
import { VEREIN } from "@/lib/email/branding";
import { deleteOwnAccount, disableOwnAccount, terminateMembership } from "./accountActions";

type Mode = "terminate" | "disable" | "delete";

type ActionResult = { ok: true } | { ok: false; message: string };

/**
 * Selbstverwaltung des eigenen Kontos: Austreten, Zugang sperren, Löschen.
 *
 * Mitglieder treten mit sofortiger Wirkung aus: ohne offene Beiträge ist das
 * Konto danach gelöscht, sonst bleibt es bis zur Zahlung bestehen. Konten ohne
 * Mitgliedschaft und ohne offene Beiträge lassen sich restlos löschen. Alles
 * verlangt das Passwort erneut.
 */
export function AccountSection({
    isMember,
    isAdmin,
    exitedAt,
    openFees,
    terminationEnabled,
    contactFormEnabled,
}: {
    isMember: boolean;
    isAdmin: boolean;
    /** Austrittsdatum, solange das Konto auf die Begleichung offener Beiträge wartet. */
    exitedAt: string | null;
    /** Offene Beiträge bis einschließlich des laufenden Jahres. */
    openFees: { year: number; amount: number }[];
    /** Feature-Flag MEMBERSHIP_TERMINATION — aus: Hinweis auf den Weg über den Vorstand. */
    terminationEnabled: boolean;
    contactFormEnabled: boolean;
}) {
    const router = useRouter();
    const [mode, setMode] = useState<Mode | null>(null);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    const owesFees = openFees.length > 0;
    const canTerminate = isMember && !isAdmin && terminationEnabled;
    const terminateOffline = isMember && !isAdmin && !terminationEnabled;
    const canDisable = isMember && !isAdmin;
    const canDelete = !isMember && !isAdmin && !owesFees;
    if (!canTerminate && !terminateOffline && !canDisable && !canDelete && !exitedAt) {
        return null;
    }

    function open(next: Mode) {
        setPassword("");
        setError("");
        setMode(next);
    }

    function submit() {
        const fd = new FormData();
        fd.set("password", password);
        let action: (fd: FormData) => Promise<ActionResult>;
        if (mode === "terminate") {
            action = terminateMembership;
        } else if (mode === "disable") {
            action = disableOwnAccount;
        } else {
            action = deleteOwnAccount;
        }
        setError("");
        startTransition(async () => {
            // Sperren, Löschen und Austritt ohne offene Beiträge enden mit
            // einer Weiterleitung auf den Login.
            const result = await action(fd);
            if (!result.ok) {
                setError(result.message);
                return;
            }
            setMode(null);
            router.refresh();
        });
    }

    const feeList = (
        <ul className="list-disc pl-5">
            {openFees.map((fee) => (
                <li key={fee.year}>
                    Beitrag {fee.year}: {formatEuro(fee.amount)}
                </li>
            ))}
        </ul>
    );

    return (
        <Card className="mt-8 grid gap-4 p-5 sm:p-6">
            <div className="grid gap-1">
                <p className="font-semibold">Mitgliedschaft & Konto</p>
                <p className="text-sm text-muted text-pretty">
                    Austreten, Zugang sperren oder Konto löschen.
                </p>
            </div>

            {exitedAt && (
                <Callout tone="info" title="Du bist ausgetreten">
                    Deine Mitgliedschaft endete am {formatDate(exitedAt)}.{" "}
                    {owesFees ? (
                        <>
                            Die Zahlungspflicht für diese Beiträge besteht weiter:
                            {feeList}
                            Bis sie beglichen sind, bleiben dein Konto und deine Zahlungsdaten
                            bestehen. Danach löschen wir dein Konto automatisch.
                        </>
                    ) : (
                        "Deine Beiträge sind beglichen; dein Konto wird in Kürze automatisch gelöscht."
                    )}
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
                    beenden.
                </Callout>
            )}

            <div className="flex flex-wrap gap-2">
                {canTerminate && (
                    <Button variant="soft" color="danger" onClick={() => open("terminate")}>
                        <HugeiconsIcon icon={Door01Icon} size={16} aria-hidden="true" /> Austreten
                    </Button>
                )}
                {canDisable && (
                    <Button variant="soft" color="neutral" onClick={() => open("disable")}>
                        <HugeiconsIcon icon={Logout01Icon} size={16} aria-hidden="true" /> Zugang deaktivieren
                    </Button>
                )}
                {canDelete && (
                    <Button variant="soft" color="danger" onClick={() => open("delete")}>
                        <HugeiconsIcon icon={Delete02Icon} size={16} aria-hidden="true" /> Konto löschen
                    </Button>
                )}
            </div>

            <Dialog
                open={mode != null}
                onClose={() => setMode(null)}
                title={
                    mode === "terminate"
                        ? "Aus dem Verein austreten"
                        : mode === "disable"
                          ? "Zugang deaktivieren"
                          : "Konto endgültig löschen"
                }
            >
                <div className="grid gap-4 text-sm leading-relaxed text-muted text-pretty">
                    {mode === "terminate" &&
                        (owesFees ? (
                            <>
                                <p>
                                    Deine Mitgliedschaft endet{" "}
                                    <span className="font-semibold text-foreground">sofort</span>.
                                    Bei uns sind aber noch Beiträge offen:
                                </p>
                                {feeList}
                                <p>
                                    Die Zahlungspflicht dafür besteht weiter. Deshalb bleiben dein
                                    Konto und deine Zahlungsdaten bestehen, bis die Beiträge
                                    beglichen sind; danach löschen wir dein Konto automatisch und
                                    vollständig.
                                </p>
                            </>
                        ) : (
                            <p>
                                Deine Mitgliedschaft endet{" "}
                                <span className="font-semibold text-foreground">sofort</span>, und
                                dein Konto wird mit allen zugehörigen Daten unwiderruflich gelöscht.
                                Bereits gezahlte Beiträge werden nicht erstattet.
                            </p>
                        ))}
                    {mode === "disable" && (
                        <p>
                            Du kannst dich danach nicht mehr anmelden, alle Sitzungen werden
                            beendet.{" "}
                            <span className="font-semibold text-foreground">
                                Deine Mitgliedschaft besteht weiter
                            </span>{" "}
                            — der Verein behält deshalb deine Daten und erreicht dich per E-Mail
                            oder Post. Zum Reaktivieren genügt eine Nachricht an den Vorstand.
                            Wenn du austreten möchtest, nutze stattdessen „Austreten“.
                        </p>
                    )}
                    {mode === "delete" && (
                        <p>
                            Dein Konto wird mit allen zugehörigen Daten{" "}
                            <span className="font-semibold text-foreground">
                                sofort und unwiderruflich
                            </span>{" "}
                            gelöscht, einschließlich eventueller Anträge und Beitragsdaten.
                        </p>
                    )}
                    <Field label="Passwort zur Bestätigung">
                        <Input
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Field>

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
                        color="danger"
                        onClick={submit}
                        loading={isPending}
                        disabled={!password}
                    >
                        {mode === "terminate"
                            ? owesFees
                                ? "Verbindlich austreten"
                                : "Austreten und Konto löschen"
                            : mode === "disable"
                              ? "Zugang deaktivieren"
                              : "Endgültig löschen"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </Card>
    );
}
