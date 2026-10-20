import type { MemberStatus, Role } from "@prisma/client";

export function formatStatus(status?: MemberStatus | string | null): string {
    switch (status) {
        case "NON_MEMBER":
            return "Kein Mitglied";
        case "REGULAR_MEMBER":
            return "Ordentliches Mitglied";
        case "HONORARY_MEMBER":
            return "Ehrenmitglied";
        default:
            return "Unbekannt";
    }
}

/** Badge-Farbton des Mitgliedsstatus — die Werte sind `BadgeTone` des UI-Kits. */
export function getStatusTone(
    status?: MemberStatus | string | null,
): "negative" | "info" | "positive" {
    switch (status) {
        case "HONORARY_MEMBER":
            return "positive";
        case "REGULAR_MEMBER":
            return "info";
        case "NON_MEMBER":
        default:
            return "negative";
    }
}

export const STATUS_OPTIONS: { value: MemberStatus; label: string }[] = [
    { value: "REGULAR_MEMBER", label: "Ordentliches Mitglied" },
    { value: "HONORARY_MEMBER", label: "Ehrenmitglied" },
    { value: "NON_MEMBER", label: "Kein Mitglied" },
];

export const ROLE_OPTIONS: { value: Role; label: string }[] = [
    { value: "MEMBER", label: "Mitglied" },
    { value: "ADMIN", label: "Administrator" },
];
