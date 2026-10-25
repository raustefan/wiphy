import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, CheckmarkCircle01Icon, Clock01Icon, Mail01Icon, Tick01Icon, UserCircleIcon, UserIcon } from "@hugeicons/core-free-icons";
import { formatStatus, getStatusTone } from "@/lib/statusLabels";
import type { MemberStatus } from "@prisma/client";
import { Badge } from "@/components/ui";

function getStatusIcon(status?: MemberStatus | string) {
    switch (status) {
        case "HONORARY_MEMBER":
        case "REGULAR_MEMBER":
            return <HugeiconsIcon icon={CheckmarkCircle01Icon} size={14} />;
        case "NON_MEMBER":
        default:
            return <HugeiconsIcon icon={Clock01Icon} size={14} />;
    }
}

export type ProfileSummaryUser = {
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: string;
    status: MemberStatus | string;
    emailVerified: boolean;
    loginDisabled: boolean;
};

/**
 * Die eigenen Stammdaten auf dem Dashboard — für Mitglieder und Admins gleich.
 * Die Übersicht aller Konten steht in der Benutzerverwaltung.
 *
 * Eine Beschreibungsliste statt einer Tabelle: sie bricht um und passt auf
 * jeden Bildschirm, eine Kopfzeile für einen einzigen Datensatz hieß auf dem
 * Telefon seitwärts scrollen.
 */
export function ProfileSummary({ user }: { user: ProfileSummaryUser }) {
    return (
        <dl className="grid gap-3 sm:grid-cols-2">
            <ProfileRow
                icon={<HugeiconsIcon icon={UserIcon} size={15} aria-hidden="true" />}
                label="Name"
                value={[user.firstName, user.lastName].filter(Boolean).join(" ") || "—"}
            />
            <ProfileRow
                icon={<HugeiconsIcon icon={Mail01Icon} size={15} aria-hidden="true" />}
                label="E-Mail"
                value={
                    <span
                        className={`flex items-center gap-2 break-all ${
                            user.emailVerified ? "text-positive" : "text-negative"
                        }`}
                    >
                        {user.emailVerified ? <HugeiconsIcon icon={Tick01Icon} size={15} /> : <HugeiconsIcon icon={Cancel01Icon} size={15} />}
                        {user.email}
                    </span>
                }
            />
            {user.role === "ADMIN" && (
                <ProfileRow
                    icon={<HugeiconsIcon icon={UserCircleIcon} size={15} aria-hidden="true" />}
                    label="Rolle"
                    value={<Badge tone="market">Admin</Badge>}
                />
            )}
            <ProfileRow
                icon={<HugeiconsIcon icon={CheckmarkCircle01Icon} size={15} aria-hidden="true" />}
                label="Mitgliedschaft"
                value={
                    <span className="flex flex-wrap gap-1.5">
                        <Badge tone={getStatusTone(user.status)}>
                            {getStatusIcon(user.status)}
                            {formatStatus(user.status)}
                        </Badge>
                        {user.loginDisabled && <Badge>Login gesperrt</Badge>}
                    </span>
                }
            />
        </dl>
    );
}

/**
 * Eine Zeile der Beschreibungsliste: Beschriftung mit Symbol über dem Wert,
 * damit lange E-Mail-Adressen umbrechen können statt die Spalte zu sprengen.
 */
function ProfileRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="grid gap-1 rounded-[3px] border border-line bg-raised/50 px-4 py-3">
            <dt className="flex items-center gap-2 text-sm text-muted">
                <span className="text-faint">{icon}</span>
                {label}
            </dt>
            <dd className="text-sm font-semibold text-foreground">{value}</dd>
        </div>
    );
}
