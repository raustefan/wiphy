import {
  applyMemberOrder,
  countMembers,
  createMember,
  deleteMemberById,
  deletePhoto,
  findAllMembers,
  findMemberById,
  findPublishedMembers,
  findSignatureMembers,
  memberExists as memberExistsInDb,
  updateMember,
  upsertPhoto,
  type BoardMemberRow,
} from "@/lib/server/repositories/boardRepository";
import { AppError } from "@/lib/server/errors";
import { processBoardPhoto } from "@/lib/server/images/boardPhotoProcessing";
import { MAX_BOARD_PHOTO_UPLOAD_BYTES, moveMemberOrder } from "@/lib/boardImages";

export type BoardMemberPhotoMeta = {
  id: string;
  width: number;
  height: number;
  byteSize: number;
};

export type BoardMember = {
  id: string;
  name: string;
  role: string;
  linkedin: string;
  position: number;
  published: boolean;
  inSignature: boolean;
  photo: BoardMemberPhotoMeta | null;
};

function toBoardMember(row: BoardMemberRow): BoardMember {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    linkedin: row.linkedin,
    position: row.position,
    published: row.published,
    inSignature: row.inSignature,
    photo: row.photo,
  };
}

export function memberExists(id: string) {
  return memberExistsInDb(id);
}

export async function getAdminMembers(): Promise<BoardMember[]> {
  return (await findAllMembers()).map(toBoardMember);
}

export async function getMemberForEdit(id: string): Promise<BoardMember | null> {
  const member = await findMemberById(id);
  return member ? toBoardMember(member) : null;
}

export async function getPublicMembers(): Promise<BoardMember[]> {
  return (await findPublishedMembers()).map(toBoardMember);
}

/**
 * Die Vorstandsmitglieder, die für den Verein zeichnen — dieselbe Auswahl wie
 * in der Mail-Signatur (`inSignature`). Das Mitgliedschaftszertifikat braucht
 * Name und Rolle getrennt, weil beide auf verschiedenen Zeilen der
 * Unterschriftenleiste stehen.
 */
export function getSignatureBoardMembers(): Promise<{ name: string; role: string }[]> {
  return findSignatureMembers();
}

/**
 * Zeile für die Mail-Signatur, z. B. „Nikolas Tomek (1. Vorsitzender) ·
 * Jannes Weghake (2. Vorsitzender)“. Leer, wenn niemand markiert ist —
 * `layout.ts` fällt dann auf eine Signatur ohne Namensliste zurück.
 */
export async function getSignatureBoardLine(): Promise<string> {
  const members = await getSignatureBoardMembers();
  return members.map((member) => `${member.name} (${member.role})`).join(" · ");
}

/**
 * Legt ein leeres, unveröffentlichtes Mitglied an und liefert seine ID.
 *
 * Wie beim Blog: „Neues Mitglied“ ist ein Knopf und kein Link, damit ein Foto
 * an eine echte ID gehängt werden kann, sobald die Bearbeitungsseite geöffnet
 * ist.
 */
export async function createDraftMember(): Promise<string> {
  const position = await countMembers();
  const member = await createMember({
    name: "Neues Mitglied",
    role: "",
    linkedin: "",
    position,
    published: false,
    inSignature: false,
  });
  return member.id;
}

export async function saveAdminMember(input: {
  id: string;
  name: string;
  role: string;
  linkedin: string;
  published: boolean;
  inSignature: boolean;
}) {
  await updateMember(input.id, {
    name: input.name,
    role: input.role,
    linkedin: input.linkedin,
    published: input.published,
    inSignature: input.inSignature,
  });
}

export function removeAdminMember(id: string) {
  return deleteMemberById(id);
}

export async function moveMember(id: string, direction: "up" | "down") {
  const members = await findAllMembers();
  const ids = members.map((member) => member.id);
  await applyMemberOrder(moveMemberOrder(ids, id, direction));
}

// ─────────────────────────── Foto ───────────────────────────

export async function setMemberPhoto(input: {
  memberId: string;
  bytes: Uint8Array;
}): Promise<BoardMemberPhotoMeta> {
  if (input.bytes.byteLength > MAX_BOARD_PHOTO_UPLOAD_BYTES) {
    throw new AppError(
      "VALIDATION_ERROR",
      `Die Datei ist größer als ${Math.round(MAX_BOARD_PHOTO_UPLOAD_BYTES / (1024 * 1024))} MB.`,
    );
  }

  const processed = await processBoardPhoto(input.bytes);

  return upsertPhoto(input.memberId, {
    mimeType: processed.mimeType,
    width: processed.width,
    height: processed.height,
    byteSize: processed.byteSize,
    data: processed.data,
  });
}

export async function removeMemberPhoto(memberId: string) {
  await deletePhoto(memberId);
}
