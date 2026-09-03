import type { Status, Role } from "@prisma/client";

export function formatStatus(status?: Status | string | null): string {
    switch (status) {
        case "KEIN_MITGLIED":
            return "Kein Mitglied";
        case "ORDENTLICHES_MITGLIED":
            return "Ordentliches Mitglied";
        case "EHRENMITGLIED":
            return "Ehrenmitglied";
        default:
            return "Unbekannt";
    }
}

/** Badge-Farbton des Mitgliedsstatus — die Werte sind `BadgeTone` des UI-Kits. */
export function getStatusTone(
    status?: Status | string | null,
): "negative" | "info" | "positive" {
    switch (status) {
        case "EHRENMITGLIED":
            return "positive";
        case "ORDENTLICHES_MITGLIED":
            return "info";
        case "KEIN_MITGLIED":
        default:
            return "negative";
    }
}

export const STATUS_OPTIONS: { value: Status; label: string }[] = [
    { value: "ORDENTLICHES_MITGLIED", label: "Ordentliches Mitglied" },
    { value: "EHRENMITGLIED", label: "Ehrenmitglied" },
    { value: "KEIN_MITGLIED", label: "Kein Mitglied" },
];

export function formatRole(role?: Role | string | null): string {
    switch (role) {
        case "ADMIN":
            return "Administrator";
        case "MEMBER":
            return "Mitglied";
        default:
            return "Unbekannt";
    }
}

export const ROLE_OPTIONS: { value: Role; label: string }[] = [
    { value: "MEMBER", label: "Mitglied" },
    { value: "ADMIN", label: "Administrator" },
];
