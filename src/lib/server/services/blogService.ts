import {
  applyImageOrder,
  countImagesForPost,
  createPost,
  deleteImage,
  deletePostById,
  findAllPosts,
  findImageForPost,
  findImagesForPost,
  findPostById,
  findPublishedPostById,
  findPublishedPosts,
  insertImage,
  postExists as postExistsInDb,
  updateImageAlt,
  updatePost,
  type BlogImageRow,
} from "@/lib/server/repositories/blogRepository";
import { AppError } from "@/lib/server/errors";
import { processBlogImage } from "@/lib/server/images/blogImageProcessing";
import {
  MAX_BLOG_IMAGES,
  MAX_BLOG_IMAGE_UPLOAD_BYTES,
  moveInOrder,
  type BlogImageMeta,
} from "@/lib/blogImages";

/** Termin, auf den ein Beitrag zurückblickt. */
export type LinkedEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date | null;
  allDay: boolean;
  published: boolean;
};

export type BlogPostWithImages = {
  id: string;
  title: string;
  content: string;
  preview: string;
  author: string;
  publishedAt: Date;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  /** Nach Position sortiert; das Titelbild steht immer vorn. */
  images: BlogImageMeta[];
  /** Kurzform für `images[0]` — spart den Seiten die Fallunterscheidung. */
  cover: BlogImageMeta | null;
  /** Verknüpfter Termin, falls der Beitrag über einen berichtet. */
  event: LinkedEvent | null;
};

function toImageMeta(row: BlogImageRow): BlogImageMeta {
  return {
    id: row.id,
    alt: row.alt,
    width: row.width,
    height: row.height,
    byteSize: row.byteSize,
    fileName: row.fileName,
    position: row.position,
    isCover: row.coverForPostId !== null,
  };
}

function toPost<T extends { images: BlogImageRow[] }>(
  post: T,
): Omit<T, "images"> & { images: BlogImageMeta[]; cover: BlogImageMeta | null } {
  const images = post.images.map(toImageMeta);
  return { ...post, images, cover: images[0] ?? null };
}

/** Existiert der Beitrag? Ohne dafür Inhalt und Bilder zu laden. */
export function postExists(id: string) {
  return postExistsInDb(id);
}

export async function getAdminPosts(): Promise<BlogPostWithImages[]> {
  return (await findAllPosts()).map(toPost);
}

export async function getPostForEdit(id: string): Promise<BlogPostWithImages | null> {
  const post = await findPostById(id);
  return post ? toPost(post) : null;
}

export async function getPublishedPosts(): Promise<BlogPostWithImages[]> {
  return (await findPublishedPosts()).map(toPost);
}

export async function getPublishedPost(id: string): Promise<BlogPostWithImages | null> {
  const post = await findPublishedPostById(id);
  return post ? toPost(post) : null;
}

/**
 * Legt einen leeren, unveröffentlichten Beitrag an und liefert seine ID.
 *
 * „Neuer Beitrag“ erzeugt damit sofort eine Zeile, statt erst beim Speichern.
 * Der Grund sind die Bilder: sie hängen an einer Beitrags-ID, und ohne die
 * gäbe es beim Anlegen ein Formular, in dem die halbe Seite noch nicht
 * benutzbar ist. Ein verworfener Entwurf bleibt als Zeile in der Übersicht
 * stehen und lässt sich dort löschen — sichtbar wird er nie, `published` ist
 * false.
 */
export async function createDraftPost(author: string): Promise<string> {
  const post = await createPost({
    title: "Unbenannter Entwurf",
    content: "",
    preview: "",
    author,
    publishedAt: new Date(),
    published: false,
  });
  return post.id;
}

export async function saveAdminPost(input: {
  id: string;
  title: string;
  content: string;
  preview: string;
  author: string;
  publishedAt: Date;
  published: boolean;
  eventId: string | null;
}) {
  await updatePost(input.id, {
    title: input.title,
    content: input.content,
    preview: input.preview,
    author: input.author,
    publishedAt: input.publishedAt,
    published: input.published,
    eventId: input.eventId,
  });
}

export function removeAdminPost(id: string) {
  return deletePostById(id);
}

// ─────────────────────────── Bilder ───────────────────────────

async function requireImage(postId: string, imageId: string) {
  const image = await findImageForPost(postId, imageId);
  if (!image) {
    throw new AppError("NOT_FOUND", "Das Bild gehört nicht zu diesem Beitrag.");
  }
  return image;
}

async function orderedIds(postId: string) {
  return (await findImagesForPost(postId)).map((image) => image.id);
}

/**
 * Nimmt eine hochgeladene Datei an und hängt sie hinten an die Galerie.
 *
 * Das erste Bild eines Beitrags wird automatisch zum Titelbild — ohne das
 * stünde ein frisch bebilderter Beitrag ohne Vorschaubild in der Übersicht,
 * bis jemand daran denkt, eines auszuwählen.
 */
export async function addPostImage(input: {
  postId: string;
  fileName: string;
  bytes: Uint8Array;
}): Promise<BlogImageMeta> {
  if (input.bytes.byteLength > MAX_BLOG_IMAGE_UPLOAD_BYTES) {
    throw new AppError(
      "VALIDATION_ERROR",
      `Die Datei ist größer als ${Math.round(MAX_BLOG_IMAGE_UPLOAD_BYTES / (1024 * 1024))} MB.`,
    );
  }

  const existing = await countImagesForPost(input.postId);
  if (existing >= MAX_BLOG_IMAGES) {
    throw new AppError(
      "VALIDATION_ERROR",
      `Ein Beitrag kann höchstens ${MAX_BLOG_IMAGES} Bilder haben (1 Titelbild + ${MAX_BLOG_IMAGES - 1} weitere).`,
    );
  }

  const processed = await processBlogImage(input.bytes);

  const created = await insertImage({
    postId: input.postId,
    position: existing,
    isCover: existing === 0,
    alt: "",
    fileName: input.fileName.slice(0, 200),
    mimeType: processed.mimeType,
    width: processed.width,
    height: processed.height,
    byteSize: processed.byteSize,
    data: processed.data,
    thumbnail: processed.thumbnail,
  });

  return toImageMeta(created);
}

/**
 * Löscht ein Bild und schließt die Lücke in der Reihenfolge. War es das
 * Titelbild, rückt das nächste nach — ein Beitrag mit Bildern hat immer eines.
 */
export async function removePostImage(postId: string, imageId: string) {
  await requireImage(postId, imageId);
  await deleteImage(postId, imageId);
  await applyImageOrder(postId, await orderedIds(postId));
}

/** Macht ein Bild zum Titelbild, indem es an den Anfang der Galerie rückt. */
export async function setPostCoverImage(postId: string, imageId: string) {
  await requireImage(postId, imageId);
  const ids = await orderedIds(postId);
  await applyImageOrder(postId, [imageId, ...ids.filter((id) => id !== imageId)]);
}

/**
 * Verschiebt ein weiteres Bild um eine Position. Das Titelbild bleibt dabei
 * vorn: seine Auswahl ist eine eigene Entscheidung und soll nicht als
 * Nebenwirkung eines Pfeilklicks kippen.
 */
export async function movePostImage(postId: string, imageId: string, direction: "up" | "down") {
  await requireImage(postId, imageId);
  const ids = await orderedIds(postId);
  await applyImageOrder(postId, moveInOrder(ids, imageId, direction, { lockFirst: true }));
}

export async function setPostImageAlt(postId: string, imageId: string, alt: string) {
  await requireImage(postId, imageId);
  await updateImageAlt(postId, imageId, alt);
}
