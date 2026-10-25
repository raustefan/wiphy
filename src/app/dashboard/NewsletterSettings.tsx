"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Mail01Icon, MailRemove01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useState } from "react";
import { Badge, Button, Card, Switch } from "@/components/ui";
import { cn } from "@/lib/cn";
import { useActionForm } from "@/lib/client/useActionForm";
import { setOwnNewsletterAction } from "./actions";

const SCOPE_NOTE =
    "Mails zu deiner Mitgliedschaft, etwa Einladungen zur Mitgliederversammlung, bekommst du unabhängig davon.";

/** Eigener Newsletter-Schalter; der Zustand folgt dem Server erst nach Erfolg. */
function useOwnNewsletter(initial: boolean) {
    const [subscribed, setSubscribed] = useState(initial);
    const form = useActionForm((formData) => setOwnNewsletterAction(formData.get("subscribed") === "1"), {
        onSuccess: (value) => setSubscribed(value === true),
    });
    const set = (value: boolean) => form.run({ subscribed: value ? "1" : "0" });
    return { subscribed, set, form };
}

/**
 * Zeile in der Konto-Karte des Dashboards. Abbestellt wird sie farbig und
 * bietet das Wiederabonnieren direkt an — abbestellen geht über das Profil
 * oder den Link in der Mail.
 */
export function NewsletterRow({ initial, profileHref }: { initial: boolean; profileHref: string }) {
    const { subscribed, set, form } = useOwnNewsletter(initial);

    return (
        <li className={cn("grid gap-2 py-3", !subscribed && "-mx-3 rounded-[3px] bg-warning/8 px-3")}>
            <div className="flex items-center gap-3">
                <HugeiconsIcon
                    icon={subscribed ? Mail01Icon : MailRemove01Icon}
                    size={18}
                    aria-hidden="true"
                    className={cn("shrink-0", subscribed ? "text-physics" : "text-warning")}
                />
                <span className="min-w-0 flex-1 font-medium">Newsletter</span>
                <Badge tone={subscribed ? "positive" : "warning"}>
                    {subscribed ? "Abonniert" : "Abbestellt"}
                </Badge>
            </div>
            {subscribed ? (
                <Link
                    href={profileHref}
                    className="ml-[30px] flex w-fit items-center gap-1.5 text-xs font-semibold text-physics focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
                >
                    Einstellung ändern
                    <HugeiconsIcon icon={ArrowRight01Icon} size={14} aria-hidden="true" />
                </Link>
            ) : (
                <div className="ml-[30px] grid gap-2">
                    <p className="text-xs text-pretty text-muted">{SCOPE_NOTE}</p>
                    <div>
                        <Button size="sm" loading={form.pending} onClick={() => void set(true)}>
                            Wieder abonnieren
                        </Button>
                    </div>
                </div>
            )}
            {form.feedback}
        </li>
    );
}

/**
 * Abschnitt in der Selbstverwaltung. Admins sehen bei fremden Konten nur den
 * Stand — umschalten kann ihn ausschließlich das Mitglied selbst.
 */
export function NewsletterSection({ initial, editable }: { initial: boolean; editable: boolean }) {
    const { subscribed, set, form } = useOwnNewsletter(initial);

    return (
        <Card id="newsletter" className="mt-8 grid scroll-mt-24 gap-4 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
                <div className="grid gap-1">
                    <h2 className="font-semibold">Newsletter</h2>
                    <p className="text-sm text-pretty text-muted">
                        {editable
                            ? `Allgemeine Neuigkeiten aus dem Verein per Mail. ${SCOPE_NOTE}`
                            : subscribed
                              ? "Bekommt Rundmails, die als Newsletter gekennzeichnet sind."
                              : "Hat den Newsletter abbestellt. Nur das Mitglied selbst kann ihn wieder abonnieren."}
                    </p>
                </div>
                {editable ? (
                    <Switch
                        checked={subscribed}
                        disabled={form.pending}
                        onCheckedChange={(value) => void set(value)}
                        aria-label="Newsletter erhalten"
                    />
                ) : (
                    <Badge tone={subscribed ? "positive" : "warning"}>
                        {subscribed ? "Abonniert" : "Abbestellt"}
                    </Badge>
                )}
            </div>
            {form.feedback}
        </Card>
    );
}
