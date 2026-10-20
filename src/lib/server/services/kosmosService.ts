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
    kosmosVisible: true,
    loginDisabled: false,
    status: { in: ["REGULAR_MEMBER", "HONORARY_MEMBER"] },
} satisfies Prisma.UserWhereInput;

export async function getKosmosViewer(userId: string) {
    return prisma.user.findUnique({
        where: { id: userId },
        select: { status: true, kosmosVisible: true, studyStart: true },
    });
}

export async function isKosmosParticipant(userId: string): Promise<boolean> {
    return (await prisma.user.count({ where: { id: userId, ...PARTICIPANT } })) > 0;
}

/** Ohne E-Mail-Adresse: die gibt es nur einzeln auf Klick (`getKosmosEmail`). */
export async function getKosmosMembers(): Promise<KosmosMember[]> {
    const users = await prisma.user.findMany({
        where: { ...PARTICIPANT, studyStart: { not: null } },
        select: { id: true, firstName: true, lastName: true, degreeProgram: true, studyStart: true, studyEnd: true },
    });
    const now = new Date();
    // Ein Studienende in der Zukunft heißt: studiert noch.
    return users.map((u) => ({
        id: u.id,
        name: `${u.firstName} ${u.lastName}`.trim(),
        degreeProgram: u.degreeProgram,
        start: toYear(u.studyStart!),
        end: u.studyEnd && u.studyEnd <= now ? toYear(u.studyEnd) : null,
    }));
}

export async function countKosmosMembers(): Promise<number> {
    return prisma.user.count({ where: { ...PARTICIPANT, studyStart: { not: null } } });
}

export async function getKosmosEmail(userId: string): Promise<string | null> {
    const user = await prisma.user.findFirst({ where: { id: userId, ...PARTICIPANT }, select: { email: true } });
    return user?.email ?? null;
}

export async function setKosmosVisibility(userId: string, visible: boolean) {
    await prisma.user.update({ where: { id: userId }, data: { kosmosVisible: visible } });
}
