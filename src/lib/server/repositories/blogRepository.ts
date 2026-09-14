import { prisma } from "@/lib/prisma";
import type { BlogImageVariant } from "@/lib/blogImages";
import type { ImageBytes } from "@/lib/server/images/blogImageProcessing";

/**
 * Alles außer den Bytes.
 *
 * `BlogImage.data` und `.thumbnail` sind jeweils Hunderte Kilobyte; würde eine
 * Beitragsliste sie über die Relation mitladen, holte die Blog-Übersicht
 * mehrere Megabyte aus der Datenbank, um daraus sechs `<img src>` zu bauen. Die
 * Bytes gehen deshalb ausschließlich einzeln über die Bild-Route raus.
 */
const imageMetaSelect = {
  id: true,
  alt: true,
  width: true,
  height: true,
  byteSize: true,
  fileName: true,
  position: true,
  coverForPostId: true,
} as const;

/**
 * Der verknüpfte Termin, auf den ein Beitrag zurückblickt. `published` ist
 * dabei: die öffentliche Beitragsseite darf nicht auf einen Entwurf verlinken.
 */
const eventLinkSelect = {
  id: true,
  title: true,
  start: true,
  end: true,
  allDay: true,
  published: true,
} as const;

const withImages = {
  images: {
    select: imageMetaSelect,
    orderBy: { position: "asc" },
  },
  event: { select: eventLinkSelect },
} as const;

export type BlogImageRow = {
  id: string;
  alt: string;
  width: number;
  height: number;
  byteSize: number;
  fileName: string;
  position: number;
  coverForPostId: string | null;
};

export function findAllPosts() {
  return prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: withImages,
  });
}

export function findPublishedPosts() {
  return prisma.blogPost.findMany({
    where: { published: true, publishedAt: { lte: new Date() } },
    orderBy: { publishedAt: "desc" },
    include: withImages,
  });
}

/**
 * Eine Seite der öffentlichen Beitragsliste, wahlweise auf einen Suchbegriff
 * eingegrenzt.
 *
 * Die Übersicht hat früher *alle* Beiträge geladen — inklusive `content`, also
 * dem vollständigen Markdown jedes Beitrags, nur um daraus eine Lesedauer zu
 * schätzen. Das skaliert mit der Zahl der Beiträge und nicht mit dem, was auf
 * dem Bildschirm steht. `count` und `findMany` laufen parallel; die Gesamtzahl
 * braucht die Seite ohnehin für die Blätter-Navigation.
 *
 * Gesucht wird in Titel, Vorschautext und Inhalt. `mode: "insensitive"` ist
 * nötig, weil Postgres `LIKE` sonst auf Groß-/Kleinschreibung achtet.
 */
export async function findPublishedPostsPage({
  query,
  skip,
  take,
}: {
  query?: string;
  skip: number;
  take: number;
}) {
  const where = {
    published: true,
    publishedAt: { lte: new Date() },
    ...(query
      ? {
          OR: [
            { title: { contains: query, mode: "insensitive" as const } },
            { preview: { contains: query, mode: "insensitive" as const } },
            { content: { contains: query, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip,
      take,
      include: withImages,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return { posts, total };
}

export async function postExists(id: string) {
  return (await prisma.blogPost.count({ where: { id } })) > 0;
}

export function findPostById(id: string) {
  return prisma.blogPost.findUnique({ where: { id }, include: withImages });
}

export function findPublishedPostById(id: string) {
  return prisma.blogPost.findFirst({
    where: { id, published: true, publishedAt: { lte: new Date() } },
    include: withImages,
  });
}

export function createPost(data: {
  title: string;
  content: string;
  preview: string;
  author: string;
  publishedAt: Date;
  published: boolean;
}) {
  return prisma.blogPost.create({ data });
}

export type BlogPostWriteData = {
  title: string;
  content: string;
  preview: string;
  author: string;
  publishedAt: Date;
  published: boolean;
  /** `null` löst eine bestehende Verknüpfung mit einem Termin. */
  eventId: string | null;
};

export function updatePost(id: string, data: BlogPostWriteData) {
  return prisma.blogPost.update({
    where: { id },
    data,
  });
}

export function deletePostById(id: string) {
  return prisma.blogPost.delete({ where: { id } });
}

// ─────────────────────────── Bilder ───────────────────────────

export function countImagesForPost(postId: string) {
  return prisma.blogImage.count({ where: { postId } });
}

export function findImagesForPost(postId: string): Promise<BlogImageRow[]> {
  return prisma.blogImage.findMany({
    where: { postId },
    orderBy: { position: "asc" },
    select: imageMetaSelect,
  });
}

export function findImageForPost(postId: string, imageId: string) {
  return prisma.blogImage.findFirst({
    where: { id: imageId, postId },
    select: imageMetaSelect,
  });
}

/**
 * Die Bytes einer Variante samt Sichtbarkeit des Beitrags — was die Bild-Route
 * braucht, in einer Abfrage. Sie lädt nur die angeforderte Variante: die andere
 * mitzuziehen hieße, jedes Vorschaubild mit dem Vollbild im Schlepptau zu
 * beantworten.
 */
export async function findImageBytes(id: string, variant: BlogImageVariant) {
  const common = {
    mimeType: true,
    updatedAt: true,
    post: { select: { published: true, publishedAt: true } },
  } as const;

  const image =
    variant === "thumb"
      ? await prisma.blogImage.findUnique({
          where: { id },
          select: { ...common, thumbnail: true },
        })
      : await prisma.blogImage.findUnique({
          where: { id },
          select: { ...common, data: true },
        });

  if (!image) return null;

  return {
    bytes: "thumbnail" in image ? image.thumbnail : image.data,
    mimeType: image.mimeType,
    updatedAt: image.updatedAt,
    post: image.post,
  };
}

export function insertImage(data: {
  postId: string;
  position: number;
  isCover: boolean;
  alt: string;
  fileName: string;
  mimeType: string;
  width: number;
  height: number;
  byteSize: number;
  data: ImageBytes;
  thumbnail: ImageBytes;
}) {
  const { isCover, ...rest } = data;
  return prisma.blogImage.create({
    data: { ...rest, coverForPostId: isCover ? data.postId : null },
    select: imageMetaSelect,
  });
}

export function updateImageAlt(postId: string, imageId: string, alt: string) {
  return prisma.blogImage.updateMany({ where: { id: imageId, postId }, data: { alt } });
}

export function deleteImage(postId: string, imageId: string) {
  return prisma.blogImage.deleteMany({ where: { id: imageId, postId } });
}

/**
 * Schreibt Reihenfolge und Titelbild in einem Rutsch: das erste Bild der Liste
 * ist das Titelbild.
 *
 * Beides gehört zusammen und in eine Transaktion. Der Unique-Constraint auf
 * `coverForPostId` lässt zwischendurch kein zweites Titelbild zu — die alte
 * Markierung muss also fallen, bevor die neue gesetzt wird. Bräche der Vorgang
 * dazwischen ab, stünde der Beitrag ohne Titelbild da.
 */
export function applyImageOrder(postId: string, orderedIds: readonly string[]) {
  return prisma.$transaction([
    prisma.blogImage.updateMany({
      where: { postId, coverForPostId: { not: null } },
      data: { coverForPostId: null },
    }),
    ...orderedIds.map((id, index) =>
      prisma.blogImage.updateMany({
        where: { id, postId },
        data: { position: index, coverForPostId: index === 0 ? postId : null },
      }),
    ),
  ]);
}
