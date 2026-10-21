import { HugeiconsIcon } from "@hugeicons/react";
import { AtIcon, Clock01Icon, InformationCircleIcon, Key02Icon, Login01Icon, MailValidation01Icon, ShieldCheckIcon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/server/authz";
import { getEditableUser, getPendingEmailChange } from "@/lib/server/services/userService";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { formatDateTime } from "@/lib/format";
import { Badge, Callout, Card, Container } from "@/components/ui";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { SectionHeader } from "../SectionHeader";
import { EmailChangeForm, PasswordChangeButton } from "./AccessForms";

export const metadata: Metadata = { title: "Login & Sicherheit" };

export const dynamic = "force-dynamic";

function Fact({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
    return (
        <div className="flex min-w-0 items-start gap-3 px-5 py-4 sm:px-6">
            <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-[3px] bg-physics/10 text-physics" aria-hidden="true">
                {icon}
            </span>
            <div className="grid min-w-0 gap-0.5">
                <dt className="font-serif text-sm text-muted italic">{label}</dt>
                <dd className="min-w-0 text-sm font-semibold text-foreground">{children}</dd>
            </div>
        </div>
    );
}

/** Drei Schritte, die beide Abläufe gemeinsam haben: anfordern, bestätigen, neu anmelden. */
function Steps({ steps }: { steps: string[] }) {
    return (
        <ol className="grid gap-3">
            {steps.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm text-muted">
                    <span className="grid size-6 shrink-0 place-items-center rounded-[3px] border border-line bg-raised font-mono text-xs font-bold text-foreground tabular-nums">
                        {i + 1}
                    </span>
                    <span className="pt-0.5 text-pretty">{step}</span>
                </li>
            ))}
        </ol>
    );
}

export default async function KontoPage() {
    const currentUser = await requireUser();
    const [user, pending, passwordResetEnabled, emailChangeEnabled] = await Promise.all([
        getEditableUser(currentUser.id),
        getPendingEmailChange(currentUser.id),
        isFeatureEnabled("PASSWORD_RESET"),
        isFeatureEnabled("EMAIL_CHANGE"),
    ]);
    if (!user) redirect("/login");

    return (
        <Container size="3" className="py-8 sm:py-12">
            <DashboardPageHeader
                eyebrow="Mitgliederbereich"
                title="Login & Sicherheit"
                description="Passwort und E-Mail-Adresse deines Kontos ändern. Beides bestätigst du über einen Link per E-Mail."
                backHref="/dashboard"
            />

            <div className="grid gap-6">
                <Card className="overflow-hidden">
                    <dl className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                        <Fact icon={<HugeiconsIcon icon={AtIcon} size={17} />} label="E-Mail-Adresse">
                            <span className="block truncate">{user.email}</span>
                            <Badge tone={user.emailVerified ? "positive" : "warning"} className="mt-1">
                                {user.emailVerified ? "Bestätigt" : "Unbestätigt"}
                            </Badge>
                        </Fact>
                        <Fact icon={<HugeiconsIcon icon={Key02Icon} size={17} />} label="Passwort geändert">
                            {formatDateTime(user.passwordChangedAt)}
                        </Fact>
                        <Fact icon={<HugeiconsIcon icon={Login01Icon} size={17} />} label="Letzte Anmeldung">
                            {formatDateTime(user.lastLoginAt)}
                        </Fact>
                    </dl>
                </Card>

                <Callout tone="info" title="Danach meldest du dich neu an">
                    Sobald du eine Änderung über den Link bestätigst, wirst du auf allen Geräten
                    abgemeldet — auch hier. Wer sich ohne dein Wissen angemeldet hatte, verliert so
                    den Zugang.
                </Callout>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
                    <Card className="grid gap-5 p-5 sm:p-6">
                        <SectionHeader
                            icon={<HugeiconsIcon icon={ShieldCheckIcon} size={16} />}
                            eyebrow="Zugang"
                            title="Passwort ändern"
                            description="Wir schicken dir einen Link an deine aktuelle Adresse. Dort legst du das neue Passwort fest."
                        />
                        <Steps
                            steps={[
                                "Link anfordern",
                                `In der E-Mail an ${user.email} auf „Neues Passwort vergeben“ klicken (30 Minuten gültig)`,
                                "Mit dem neuen Passwort wieder anmelden",
                            ]}
                        />
                        <PasswordChangeButton enabled={passwordResetEnabled} />
                    </Card>

                    <Card className="grid gap-5 p-5 sm:p-6">
                        <SectionHeader
                            icon={<HugeiconsIcon icon={MailValidation01Icon} size={16} />}
                            eyebrow="Kontakt & Login"
                            title="E-Mail-Adresse ändern"
                            description="Die neue Adresse gilt erst, wenn du sie über den Link bestätigt hast. Bis dahin bleibt alles beim Alten."
                        />
                        {pending && (
                            <Callout tone="warning" title="Änderung ausstehend">
                                <span className="flex items-start gap-2">
                                    <HugeiconsIcon icon={Clock01Icon} size={15} aria-hidden="true" className="mt-0.5 shrink-0" />
                                    <span>
                                        Bestätigungslink an <strong className="break-all">{pending.email}</strong>{" "}
                                        gesendet, gültig bis {formatDateTime(pending.expires)}. Eine neue
                                        Anfrage ersetzt diesen Link.
                                    </span>
                                </span>
                            </Callout>
                        )}
                        <EmailChangeForm enabled={emailChangeEnabled} />
                        <p className="flex items-start gap-2 text-xs text-faint">
                            <HugeiconsIcon icon={InformationCircleIcon} size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                            Deine bisherige Adresse erhält nach der Änderung einen Hinweis.
                        </p>
                    </Card>
                </div>
            </div>
        </Container>
    );
}
