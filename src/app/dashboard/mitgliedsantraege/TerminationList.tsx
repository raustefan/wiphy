import Link from "next/link";
import type { MembershipTerminationStatus } from "@prisma/client";
import { Badge, Card } from "@/components/ui";
import { formatDate } from "@/lib/format";

export type TerminationItem = {
    id: string;
    status: MembershipTerminationStatus;
    effectiveAt: string;
    decisionNote: string | null;
    completedAt: string | null;
    deleteWhenSettled: boolean;
    member: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        memberNumber: number | null;
        loginDisabled: boolean;
    };
};

function statusMeta(item: TerminationItem): {
    label: string;
    tone: "warning" | "positive" | "neutral";
} {
    if (item.deleteWhenSettled) return { label: "Beiträge offen", tone: "warning" };
    if (item.completedAt) return { label: "Ausgetreten", tone: "neutral" };
    if (item.status === "CONFIRMED") return { label: "Austritt zum Jahresende", tone: "positive" };
    return { label: "Zurückgenommen", tone: "neutral" };
}

/**
 * Austritte, die noch ein Konto haben: Ausgetretene mit offenen Beiträgen,
 * Austritte durch den Vorstand und Kündigungen zum Jahresende aus der Zeit
 * vor dem sofortigen Austritt. Wer ohne offene Beiträge austritt, ist samt
 * Konto gelöscht und taucht hier nicht auf.
 */
export function TerminationList({ terminations }: { terminations: TerminationItem[] }) {
    return (
        <div className="grid gap-3">
            {terminations.map((item) => {
                const meta = statusMeta(item);
                return (
                    <Card key={item.id} className="grid gap-1 p-5">
                        <div className="flex flex-wrap items-center gap-2">
                            <Link
                                href={`/dashboard/users/${item.member.id}`}
                                className="font-semibold underline-offset-2 hover:underline"
                            >
                                {item.member.firstName} {item.member.lastName}
                            </Link>
                            {item.member.memberNumber != null && (
                                <span className="text-sm text-muted">
                                    Nr. {item.member.memberNumber}
                                </span>
                            )}
                            <Badge tone={meta.tone}>{meta.label}</Badge>
                            {item.member.loginDisabled && <Badge>Login gesperrt</Badge>}
                        </div>
                        <p className="text-sm break-words text-muted">
                            {item.member.email} · Austritt zum{" "}
                            <span className="font-semibold text-foreground">
                                {formatDate(item.effectiveAt)}
                            </span>
                            {item.decisionNote ? ` · ${item.decisionNote}` : ""}
                        </p>
                        {item.deleteWhenSettled && (
                            <p className="text-sm text-muted text-pretty">
                                Das Konto wird automatisch gelöscht, sobald die offenen Beiträge
                                als bezahlt markiert sind.
                            </p>
                        )}
                    </Card>
                );
            })}
        </div>
    );
}
