import { User, UserCircle, CheckCircle2, Clock, Mail, Check, X } from "lucide-react";
import { formatStatus, getStatusTone } from "@/lib/statusLabels";
import type { Status } from "@prisma/client";
import { Badge } from "@/components/ui";

function getStatusIcon(status?: Status | string) {
    switch (status) {
        case "EHRENMITGLIED":
        case "ORDENTLICHES_MITGLIED":
            return <CheckCircle2 size={14} />;
        case "KEIN_MITGLIED":
        default:
            return <Clock size={14} />;
    }
}

export type ProfileSummaryUser = {
    email: string;
    vorname: string | null;
    name: string | null;
    role: string;
    status: Status | string;
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
                icon={<User size={15} aria-hidden="true" />}
                label="Name"
                value={[user.vorname, user.name].filter(Boolean).join(" ") || "—"}
            />
            <ProfileRow
                icon={<Mail size={15} aria-hidden="true" />}
                label="E-Mail"
                value={
                    <span
                        className={`flex items-center gap-2 break-all ${
                            user.emailVerified ? "text-positive" : "text-negative"
                        }`}
                    >
                        {user.emailVerified ? <Check size={15} /> : <X size={15} />}
                        {user.email}
                    </span>
                }
            />
            <ProfileRow
                icon={<UserCircle size={15} aria-hidden="true" />}
                label="Rolle"
                value={
                    <Badge tone={user.role === "ADMIN" ? "market" : "info"}>
                        {user.role === "ADMIN" ? "Admin" : "Member"}
                    </Badge>
                }
            />
            <ProfileRow
                icon={<CheckCircle2 size={15} aria-hidden="true" />}
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
        <div className="grid gap-1 rounded-xl border border-line bg-raised/50 px-4 py-3">
            <dt className="flex items-center gap-2 text-sm text-muted">
                <span className="text-faint">{icon}</span>
                {label}
            </dt>
            <dd className="text-sm font-semibold text-foreground">{value}</dd>
        </div>
    );
}
