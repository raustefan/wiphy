import type { Metadata } from "next";
import { Calendar, CalendarDays, Clock, Newspaper, Search, User } from "lucide-react";
import { Eyebrow, Lead } from "@/components/ui";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getPublishedPostPage } from "@/lib/server/services/blogService";
import type { BlogPostWithImages } from "@/lib/server/services/blogService";
import { readingTimeMinutes } from "@/lib/readingTime";
import { formatDate } from "@/lib/format";
import { blogImageSrcSet, blogImageUrl } from "@/lib/blogImages";
import { SITE_NAME } from "@/lib/siteUrl";
import { pageMetadata } from "@/lib/metadata";
import { blogPostPath } from "@/lib/slug";

const TITLE = "Vereins-Blog";
const DESCRIPTION =
    "Berichte, Ankündigungen und Notizen aus der Wirtschaftsphysik — Rückblicke auf Vereinstermine und Themen aus Physik und Wirtschaft.";

type Props = { searchParams: Promise<{ q?: string; seite?: string }> };

/**
 * Titel und `canonical` hängen an Seitenzahl und Suchbegriff.
 *
 * Ohne das trüge jede Blätterseite dieselbe kanonische Adresse wie Seite 1 —
 * Suchmaschinen würfen Seite 2 ff. als Dublette weg und erfassten die älteren
 * Beiträge nie. Trefferlisten gehören umgekehrt *nicht* in den Index: beliebig
 * viele URLs mit demselben Inhalt. Sie bekommen deshalb `noindex` und
 * verweisen kanonisch auf die Übersicht.
 */
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { q, seite } = await searchParams;
    const query = q?.trim();
    const page = Math.max(1, Number(seite) || 1);

    const title = query
        ? `Suche „${query}“ — ${TITLE}`
        : page > 1
          ? `${TITLE}, Seite ${page}`
          : TITLE;
    const path = !query && page > 1 ? `/blog?seite=${page}` : "/blog";

    return {
        ...pageMetadata({ title, description: DESCRIPTION, path }),
        robots: query ? { index: false, follow: true } : undefined,
        alternates: {
            canonical: path,
            types: {
                "application/rss+xml": [{ url: "/blog/feed.xml", title: `${SITE_NAME} — Blog` }],
            },
        },
    };
}

function MetaLine({
    author,
    date,
    minutes,
    eventTitle,
}: {
    author: string | null;
    date: Date;
    minutes: number;
    /* Kein Link, sondern nur ein Hinweis: die ganze Karte ist bereits einer. */
    eventTitle?: string;
}) {
    return (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-faint">
            <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} aria-hidden="true" />
                {formatDate(date)}
            </span>
            {author && (
                <span className="inline-flex items-center gap-1.5">
                    <User size={13} aria-hidden="true" />
                    {author}
                </span>
            )}
            <span className="inline-flex items-center gap-1.5">
                <Clock size={13} aria-hidden="true" />
                {minutes} Min. Lesezeit
            </span>
            {eventTitle && (
                <span className="inline-flex min-w-0 items-center gap-1.5 text-market">
                    <CalendarDays size={13} aria-hidden="true" className="shrink-0" />
                    <span className="truncate">Rückblick: {eventTitle}</span>
                </span>
            )}
        </div>
    );
}

/** Eine Karte im Raster — der Aufmacher hat sein eigenes, größeres Markup. */
function PostCard({ post }: { post: BlogPostWithImages }) {
    return (
        <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
            <Link
                href={blogPostPath(post)}
                className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
            >
                {post.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={blogImageUrl(post.cover.id, "thumb")}
                        srcSet={blogImageSrcSet(post.cover.id)}
                        sizes="(min-width: 768px) 460px, 100vw"
                        alt={post.cover.alt}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/9] w-full border-b border-line object-cover"
                    />
                )}
                <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
                    <MetaLine
                        author={post.author}
                        date={post.publishedAt}
                        minutes={readingTimeMinutes(post.content)}
                        eventTitle={post.event?.published ? post.event.title : undefined}
                    />
                    <h3 className="text-lg font-bold tracking-tight text-balance sm:text-xl">
                        {post.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted">
                        {post.preview}
                    </p>
                    <span className="mt-auto pt-2 text-sm font-bold text-physics">
                        Weiterlesen →
                    </span>
                </div>
            </Link>
        </Card>
    );
}

/**
 * Blätter-Navigation als Links, nicht als Knöpfe: jede Seite bekommt so eine
 * eigene URL, die sich teilen und von Suchmaschinen abrufen lässt.
 */
function Pagination({ page, pageCount, query }: { page: number; pageCount: number; query: string }) {
    if (pageCount <= 1) return null;

    const href = (target: number) => {
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        if (target > 1) params.set("seite", String(target));
        const search = params.toString();
        return search ? `/blog?${search}` : "/blog";
    };

    const step =
        "inline-flex h-10 items-center rounded-full bg-raised px-4 text-sm font-semibold text-foreground transition-colors hover:bg-line";

    return (
        <nav aria-label="Seiten des Blogs" className="mt-8 flex items-center justify-between gap-4">
            {page > 1 ? (
                <Link href={href(page - 1)} rel="prev" className={step}>
                    ← Neuere
                </Link>
            ) : (
                <span />
            )}
            <span className="font-mono text-xs text-faint">
                Seite {page} von {pageCount}
            </span>
            {page < pageCount ? (
                <Link href={href(page + 1)} rel="next" className={step}>
                    Ältere →
                </Link>
            ) : (
                <span />
            )}
        </nav>
    );
}

export default async function BlogIndexPage({ searchParams }: Props) {
    const { q, seite } = await searchParams;
    const query = q?.trim() ?? "";
    const { posts, total, page, pageCount } = await getPublishedPostPage({
        query,
        page: Number(seite) || 1,
    });

    /* Der große Aufmacher gilt dem neuesten Beitrag. In einer Trefferliste oder
       auf Seite 2 wäre er eine Behauptung, die nicht stimmt — dort alles im
       gleichen Raster. */
    const showLead = !query && page === 1 && posts.length > 0;
    const [lead, ...rest] = posts;
    const gridPosts = showLead ? rest : posts;

    return (
        <Container size="4" className="py-8 sm:py-12">
            {/* Kein eigener „Zurück zur Startseite“-Knopf: Logo und Navigation
                führen ohnehin dorthin. */}
            <div className="mb-8 sm:mb-10">
                <Eyebrow className="mb-2">
                    <Newspaper size={14} aria-hidden="true" />
                    Aus dem Verein
                </Eyebrow>
                <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                    {TITLE}
                </h1>
                <p className="mt-3 text-base text-muted sm:text-lg">
                    Berichte, Ankündigungen und Notizen aus der Wirtschaftsphysik.
                </p>
            </div>

            {/* Ein gewöhnliches GET-Formular: die Suche funktioniert damit auch
                ohne JavaScript und hinterlässt eine teilbare URL. */}
            <form method="get" action="/blog" className="mb-6 flex flex-wrap gap-2 sm:mb-8">
                <div className="relative min-w-0 flex-1">
                    <Search
                        size={16}
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-faint"
                    />
                    <input
                        type="search"
                        name="q"
                        defaultValue={query}
                        placeholder="Beiträge durchsuchen …"
                        aria-label="Beiträge durchsuchen"
                        className="h-11 w-full rounded-full border border-line bg-surface pr-4 pl-11 text-sm text-foreground placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex h-11 shrink-0 items-center rounded-full bg-physics px-5 text-sm font-semibold text-on-physics transition-opacity hover:opacity-90"
                >
                    Suchen
                </button>
                {query && (
                    <Link
                        href="/blog"
                        className="inline-flex h-11 shrink-0 items-center rounded-full bg-raised px-5 text-sm font-semibold text-foreground transition-colors hover:bg-line"
                    >
                        Zurücksetzen
                    </Link>
                )}
            </form>

            {query && (
                <p className="mb-5 text-sm text-muted" aria-live="polite">
                    {total === 1 ? "1 Treffer" : `${total} Treffer`} für „{query}“
                </p>
            )}

            {posts.length === 0 ? (
                <Card className="p-6 text-muted sm:p-8">
                    {query
                        ? "Zu dieser Suche gibt es keine Beiträge."
                        : "Es gibt noch keine veröffentlichten Beiträge."}
                </Card>
            ) : (
                <div className="grid gap-5">
                    {showLead && (
                        <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                            <Link
                                href={blogPostPath(lead)}
                                className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
                            >
                                {lead.cover && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={blogImageUrl(lead.cover.id)}
                                        srcSet={blogImageSrcSet(lead.cover.id)}
                                        sizes="(min-width: 1024px) 900px, 100vw"
                                        alt={lead.cover.alt}
                                        loading="eager"
                                        decoding="async"
                                        className="aspect-[16/7] w-full border-b border-line object-cover"
                                    />
                                )}
                                <div className="grid gap-3 p-5 sm:gap-4 sm:p-8">
                                    <Badge tone="physics" className="w-fit">
                                        Neuester Beitrag
                                    </Badge>
                                    <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-4xl">
                                        {lead.title}
                                    </h2>
                                    <MetaLine
                                        author={lead.author}
                                        date={lead.publishedAt}
                                        minutes={readingTimeMinutes(lead.content)}
                                        eventTitle={
                                            lead.event?.published ? lead.event.title : undefined
                                        }
                                    />
                                    <Lead className="max-w-2xl">{lead.preview}</Lead>
                                    <span className="text-sm font-bold text-physics">
                                        Weiterlesen →
                                    </span>
                                </div>
                            </Link>
                        </Card>
                    )}

                    {gridPosts.length > 0 && (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {gridPosts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            )}

            <Pagination page={page} pageCount={pageCount} query={query} />

            <p className="mt-8 text-sm text-muted">
                Neue Beiträge automatisch bekommen?{" "}
                <a
                    href="/blog/feed.xml"
                    className="font-semibold text-physics underline-offset-4 hover:underline"
                >
                    RSS-Feed abonnieren
                </a>
            </p>
        </Container>
    );
}
