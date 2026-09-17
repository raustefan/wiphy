import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowRight, Calendar, CalendarDays, Clock, Newspaper, User } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ButtonLink, Eyebrow } from "@/components/ui";
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
        <Container size="3" className="py-8 sm:py-12">
            <BlogPostingJsonLd
                id={post.id}
                title={post.title}
                preview={post.preview}
                author={post.author}
                publishedAt={post.publishedAt}
                updatedAt={post.updatedAt}
                imageUrl={post.cover ? absoluteUrl(blogImageUrl(post.cover.id)) : undefined}
            />
            <Link
                href="/blog"
                className="mb-6 inline-flex h-9 items-center rounded-full bg-raised px-4 text-sm font-semibold text-foreground transition-colors hover:bg-line"
            >
                ← Zurück zur Übersicht
            </Link>

            <header className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
                <div className="min-w-0">
                    <Eyebrow className="mb-3">
                        <Newspaper size={14} aria-hidden="true" />
                        Vereins-Blog
                    </Eyebrow>
                    <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl">
                        {post.title}
                    </h1>
                    {post.preview && (
                        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                            {post.preview}
                        </p>
                    )}
                    {/* Unterhalb von `lg` eine Zeile statt der Karte: die Karte
                        füllte auf dem Telefon den ersten Bildschirm, bevor der
                        Artikel überhaupt anfing. */}
                    <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted lg:hidden">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                            <User size={15} aria-hidden="true" className="text-faint" />
                            {post.author || "Redaktion"}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Calendar size={15} aria-hidden="true" className="text-faint" />
                            {published}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Clock size={15} aria-hidden="true" className="text-faint" />
                            ca. {minutes} Min.
                        </span>
                    </p>
                </div>

                <Card className="hidden h-fit p-5 lg:sticky lg:top-24 lg:block">
                    <dl className="grid gap-4">
                        <div className="grid gap-1">
                            <dt className="font-mono text-[0.75rem] tracking-[0.14em] text-faint uppercase">
                                Autor
                            </dt>
                            <dd className="flex items-center gap-2 text-sm font-semibold">
                                <User size={15} aria-hidden="true" className="text-faint" />
                                {post.author || "Redaktion"}
                            </dd>
                        </div>
                        <div className="grid gap-1 border-t border-line pt-4">
                            <dt className="font-mono text-[0.75rem] tracking-[0.14em] text-faint uppercase">
                                Veröffentlicht
                            </dt>
                            <dd className="flex items-center gap-2 text-sm">
                                <Calendar size={15} aria-hidden="true" className="text-faint" />
                                {published}
                            </dd>
                        </div>
                        <div className="grid gap-1 border-t border-line pt-4">
                            <dt className="font-mono text-[0.75rem] tracking-[0.14em] text-faint uppercase">
                                Lesedauer
                            </dt>
                            <dd className="flex items-center gap-2 text-sm">
                                <Clock size={15} aria-hidden="true" className="text-faint" />
                                ca. {minutes} Min.
                            </dd>
                        </div>
                    </dl>
                </Card>
            </header>

            {post.images.length > 0 && (
                <div className="mt-8 sm:mt-10">
                    <BlogGallery images={post.images} />
                </div>
            )}

            <div className="my-8 h-px bg-line sm:my-10" aria-hidden="true" />

            <article className="max-w-[70ch] text-[1.05rem]">
                <MarkdownViewer content={post.content} />
            </article>

            {post.event?.published && (
                <Card className="mt-8 grid gap-3 p-5 sm:mt-10 sm:p-6">
                    {/* Nur veröffentlichte Termine: ein Entwurf hätte keine
                        Seite, auf die der Link führen könnte. Der Termin steht
                        bewusst nur hier und nicht zusätzlich in der Infokarte. */}
                    <p className="flex items-center gap-2 font-mono text-[0.75rem] font-semibold tracking-[0.16em] text-faint uppercase">
                        <CalendarDays size={14} aria-hidden="true" />
                        Zugehöriger Termin
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                            <p className="text-lg font-bold tracking-tight text-balance">
                                {post.event.title}
                            </p>
                            <p className="font-mono text-xs text-faint">
                                {formatEventShort(post.event)}
                            </p>
                        </div>
                        <ButtonLink
                            href={eventPath(post.event)}
                            variant="soft"
                            color="neutral"
                            className="shrink-0"
                        >
                            Zum Termin <ArrowRight size={16} aria-hidden="true" />
                        </ButtonLink>
                    </div>
                </Card>
            )}
        </Container>
    );
}
