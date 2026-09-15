import { prisma } from "@/lib/prisma";
import type { ImageBytes } from "@/lib/server/images/boardPhotoProcessing";

/**
 * Alles außer den Foto-Bytes — dieselbe Begründung wie bei `blogRepository`'s
 * `imageMetaSelect`: eine Mitgliederliste soll nicht mehrere hundert KB Bytes
 * mitschleppen, nur um Namen und Rollen anzuzeigen.
 */
const memberSelect = {
  id: true,
  name: true,
  role: true,
  linkedin: true,
  position: true,
  published: true,
  inSignature: true,
  createdAt: true,
  updatedAt: true,
  photo: { select: { id: true, width: true, height: true, byteSize: true } },
} as const;

export type BoardMemberRow = {
  id: string;
  name: string;
  role: string;
  linkedin: string;
  position: number;
  published: boolean;
  inSignature: boolean;
  createdAt: Date;
  updatedAt: Date;
  photo: { id: string; width: number; height: number; byteSize: number } | null;
};

export function findAllMembers(): Promise<BoardMemberRow[]> {
  return prisma.boardMember.findMany({
    orderBy: { position: "asc" },
    select: memberSelect,
  });
}

export function findPublishedMembers(): Promise<BoardMemberRow[]> {
  return prisma.boardMember.findMany({
    where: { published: true },
    orderBy: { position: "asc" },
    select: memberSelect,
  });
}

export function findMemberById(id: string): Promise<BoardMemberRow | null> {
  return prisma.boardMember.findUnique({ where: { id }, select: memberSelect });
}

export async function memberExists(id: string) {
  return (await prisma.boardMember.count({ where: { id } })) > 0;
}

export async function countMembers() {
  return prisma.boardMember.count();
}

export function createMember(data: {
  name: string;
  role: string;
  linkedin: string;
  position: number;
  published: boolean;
  inSignature: boolean;
}) {
  return prisma.boardMember.create({ data, select: memberSelect });
}

export type BoardMemberWriteData = {
  name: string;
  role: string;
  linkedin: string;
  published: boolean;
  inSignature: boolean;
};

export function updateMember(id: string, data: BoardMemberWriteData) {
  return prisma.boardMember.update({ where: { id }, data, select: memberSelect });
}

export function deleteMemberById(id: string) {
  return prisma.boardMember.delete({ where: { id } });
}

/**
 * Vorstandsmitglieder, die in der Mail-Signatur genannt werden — nur die
 * Felder, die `layout.ts` daraus baut.
 */
export function findSignatureMembers() {
  return prisma.boardMember.findMany({
    where: { published: true, inSignature: true },
    orderBy: { position: "asc" },
    select: { name: true, role: true },
  });
}

/** Schreibt die Reihenfolge aller Mitglieder in einem Rutsch neu. */
export function applyMemberOrder(orderedIds: readonly string[]) {
  return prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.boardMember.updateMany({ where: { id }, data: { position: index } }),
    ),
  );
}

// ─────────────────────────── Foto ───────────────────────────

export function upsertPhoto(
  memberId: string,
  data: { mimeType: string; width: number; height: number; byteSize: number; data: ImageBytes },
) {
  return prisma.boardMemberPhoto.upsert({
    where: { memberId },
    create: { memberId, ...data },
    update: data,
    select: { id: true, width: true, height: true, byteSize: true },
  });
}

export function deletePhoto(memberId: string) {
  return prisma.boardMemberPhoto.deleteMany({ where: { memberId } });
}

/** Die Bytes eines Fotos samt Sichtbarkeit des zugehörigen Mitglieds. */
export async function findPhotoBytes(id: string) {
  const photo = await prisma.boardMemberPhoto.findUnique({
    where: { id },
    select: {
      data: true,
      mimeType: true,
      updatedAt: true,
      member: { select: { published: true } },
    },
  });
  if (!photo) return null;

  return {
    bytes: photo.data,
    mimeType: photo.mimeType,
    updatedAt: photo.updatedAt,
    member: photo.member,
  };
}
