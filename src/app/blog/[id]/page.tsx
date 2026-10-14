import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Cta, Frame } from "@/components/Site";
import { eventPath, formatEventShort } from "@/lib/events";
import MarkdownViewer from "@/components/MarkdownViewer";
import { BlogGallery } from "@/components/BlogGallery";
import { getPublishedPost } from "@/lib/server/services/blogService";
import { readingTimeMinutes } from "@/lib/readingTime";
import { formatDate } from "@/lib/format";
import { blogImageUrl } from "@/lib/blogImages";
import { absoluteUrl } from "@/lib/siteUrl";
import { blogPostPath, idFromSegment } from "@/lib/slug";
import { pageMetadata } from "@/lib/metadata";
import { BlogPostingJsonLd } from "@/components/JsonLd";

type Props = { params: Promise<{ id: string }> };

/**
 * Ohne das hier trägt jeder geteilte Beitrag den Seitentitel des Vereins und
 * dessen Beschreibung — in LinkedIn und WhatsApp sehen zehn verschiedene
 * Beiträge dann identisch aus. Als Vorschaubild dient das Titelbild des
 * Beitrags; hat er keines, greift das Standardbild aus `opengraph-image.tsx`.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id: segment } = await params;
    const post = await getPublishedPost(idFromSegment(segment));

    if (!post) return { title: "Beitrag nicht gefunden", robots: { index: false } };

    const description =
        post.preview || "Beitrag im Vereins-Blog der WirtschaftsPhysik Alumni e.V.";

    return pageMetadata({
        title: post.title,
        description,
        path: blogPostPath(post),
        type: "article",
        // Ohne Titelbild greift das gezeichnete Standardbild des Vereins.
        images: post.cover
            ? [
                  {
                      url: absoluteUrl(blogImageUrl(post.cover.id)),
                      alt: post.cover.alt || post.title,
                      width: post.cover.width,
                      height: post.cover.height,
                  },
              ]
            : undefined,
        article: {
            publishedTime: post.publishedAt.toISOString(),
            modifiedTime: post.updatedAt.toISOString(),
            authors: post.author ? [post.author] : undefined,
        },
    });
}

export default async function PublicBlogPost({ params }: Props) {
    const { id: segment } = await params;

    const post = await getPublishedPost(idFromSegment(segment));

    if (!post) return notFound();

    // Alte Links (`/blog/<id>`) und Adressen mit veraltetem Titelteil landen
    // auf der aktuellen Adresse — so gibt es für Suchmaschinen nur eine.
    const canonicalPath = blogPostPath(post);
    if (`/blog/${segment}` !== canonicalPath) permanentRedirect(canonicalPath);

    const minutes = readingTimeMinutes(post.content);
    const published = formatDate(post.publishedAt);

    return (
        <article>
            <BlogPostingJsonLd
                id={post.id}
                title={post.title}
                preview={post.preview}
                author={post.author}
                publishedAt={post.publishedAt}
                updatedAt={post.updatedAt}
                imageUrl={post.cover ? absoluteUrl(blogImageUrl(post.cover.id)) : undefined}
            />

            <header className="relative isolate">
                <div aria-hidden="true" className="decor paper paper-fade absolute inset-0 -z-10" />
                <Frame className="pt-8 pb-10 sm:pt-12 sm:pb-14">
                    <Link
                        href="/blog"
                        className="inline-flex min-h-10 items-center gap-2 rounded-sm text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-physics"
                    >
                        <ArrowLeft size={16} aria-hidden="true" />
                        Alle Beiträge
                    </Link>
                    <div className="mt-8 max-w-4xl">
                        <h1 className="display text-[clamp(2.5rem,7vw,5rem)]">{post.title}</h1>
                        {post.preview && (
                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty sm:text-xl">
                                {post.preview}
                            </p>
                        )}
                    </div>
                </Frame>
            </header>

            <Frame className="pb-20 sm:pb-28">
                {post.images.length > 0 && (
                    <div className="mb-12">
                        <BlogGallery images={post.images} />
                    </div>
                )}

                <div className="grid gap-8 border-t border-line pt-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-14">
                    {/* Randspalte: wer, wann, wie lange. Auf dem Telefon eine Zeile. */}
                    <dl className="flex flex-wrap gap-x-6 gap-y-3 text-sm lg:sticky lg:top-28 lg:grid lg:self-start">
                        <div className="grid gap-0.5">
                            <dt className="font-serif text-muted italic">Autor</dt>
                            <dd className="font-medium">{post.author || "Redaktion"}</dd>
                        </div>
                        <div className="grid gap-0.5">
                            <dt className="font-serif text-muted italic">Veröffentlicht</dt>
                            <dd>
                                <time dateTime={post.publishedAt.toISOString()}>{published}</time>
                            </dd>
                        </div>
                        <div className="grid gap-0.5">
                            <dt className="font-serif text-muted italic">Lesedauer</dt>
                            <dd>ca. {minutes} Min.</dd>
                        </div>
                    </dl>

                    <div className="min-w-0">
                        <div className="reading">
                            <MarkdownViewer content={post.content} />
                        </div>

                        {post.event?.published && (
                            /* Nur veröffentlichte Termine: ein Entwurf hätte keine
                               Seite, auf die der Link führen könnte. */
                            <aside className="mt-12 grid max-w-[38rem] gap-4 border-t border-foreground pt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                                <div className="min-w-0">
                                    <p className="font-serif text-muted italic">Zugehöriger Termin</p>
                                    <p className="headline mt-1 text-2xl">{post.event.title}</p>
                                    <p className="mt-1 text-sm text-muted">{formatEventShort(post.event)}</p>
                                </div>
                                <Cta href={eventPath(post.event)} variant="line" arrow>
                                    Zum Termin
                                </Cta>
                            </aside>
                        )}
                    </div>
                </div>
            </Frame>
        </article>
    );
}
