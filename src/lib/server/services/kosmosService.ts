import "server-only";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { toYear, type KosmosMember } from "@/lib/kosmos";

/**
 * Wer im Kosmos erscheint und hineinsehen darf: Mitglieder mit Einwilligung.
 * Gesperrte Zugänge fallen heraus — wer sich nicht mehr anmelden kann, kann
 * seine Einwilligung hier auch nicht mehr widerrufen.
 */
const PARTICIPANT = {
    kosmosSichtbar: true,
    loginDisabled: false,
    status: { in: ["ORDENTLICHES_MITGLIED", "EHRENMITGLIED"] },
} satisfies Prisma.UserWhereInput;

export async function getKosmosViewer(userId: string) {
    return prisma.user.findUnique({
        where: { id: userId },
        select: { status: true, kosmosSichtbar: true, studienbeginn: true },
    });
}

export async function isKosmosParticipant(userId: string): Promise<boolean> {
    return (await prisma.user.count({ where: { id: userId, ...PARTICIPANT } })) > 0;
}

/** Ohne E-Mail-Adresse: die gibt es nur einzeln auf Klick (`getKosmosEmail`). */
export async function getKosmosMembers(): Promise<KosmosMember[]> {
    const users = await prisma.user.findMany({
        where: { ...PARTICIPANT, studienbeginn: { not: null } },
        select: { id: true, vorname: true, name: true, studiengang: true, studienbeginn: true, studienende: true },
    });
    const now = new Date();
    // Ein Studienende in der Zukunft heißt: studiert noch.
    return users.map((u) => ({
        id: u.id,
        name: `${u.vorname} ${u.name}`.trim(),
        studiengang: u.studiengang,
        start: toYear(u.studienbeginn!),
        end: u.studienende && u.studienende <= now ? toYear(u.studienende) : null,
    }));
}

export async function countKosmosMembers(): Promise<number> {
    return prisma.user.count({ where: { ...PARTICIPANT, studienbeginn: { not: null } } });
}

export async function getKosmosEmail(userId: string): Promise<string | null> {
    const user = await prisma.user.findFirst({ where: { id: userId, ...PARTICIPANT }, select: { email: true } });
    return user?.email ?? null;
}

export async function setKosmosVisibility(userId: string, visible: boolean) {
    await prisma.user.update({ where: { id: userId }, data: { kosmosSichtbar: visible } });
}
