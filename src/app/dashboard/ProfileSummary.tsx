import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Cancel01Icon, CheckmarkCircle01Icon, Clock01Icon, Mail01Icon, PencilIcon, Tick01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { formatStatus, getStatusTone } from "@/lib/statusLabels";
import type { MemberStatus } from "@prisma/client";
import Link from "next/link";
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
 *
 * Der Bearbeiten-Knopf sitzt als vierte Zelle im selben Raster und ist so groß
 * wie die Angaben daneben. `contents` auf der Liste: der Link gehört nicht in
 * das `<dl>`, soll aber in derselben Rasterspur stehen.
 */
export function ProfileSummary({ user, editHref }: { user: ProfileSummaryUser; editHref: string }) {
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            <dl className="contents">
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
            <Link
                href={editHref}
                className="group flex items-center gap-3 rounded-[3px] bg-physics px-4 py-3 text-on-physics transition-colors hover:bg-physics/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
            >
                <HugeiconsIcon icon={PencilIcon} size={18} aria-hidden="true" className="shrink-0" />
                <span className="grid min-w-0 flex-1 gap-0.5">
                    <span className="text-sm font-semibold">Stammdaten bearbeiten</span>
                    <span className="text-xs opacity-90">Name, Kontakt, Studium und Beruf</span>
                </span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} aria-hidden="true" className="cta-arrow shrink-0 group-hover:translate-x-[5px]" />
            </Link>
        </div>
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
