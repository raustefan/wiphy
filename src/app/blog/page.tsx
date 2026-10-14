import type { Metadata } from "next";
import { Search } from "lucide-react";
import Link from "next/link";
import { Cta, Frame, PageHead } from "@/components/Site";
import { getPublishedPostPage } from "@/lib/server/services/blogService";
import type { BlogPostWithImages } from "@/lib/server/services/blogService";
import { readingTimeMinutes } from "@/lib/readingTime";
import { formatDate } from "@/lib/format";
import { blogImageSrcSet, blogImageUrl } from "@/lib/blogImages";
import { SITE_NAME } from "@/lib/siteUrl";
import { pageMetadata } from "@/lib/metadata";
import { blogPostPath } from "@/lib/slug";

const TITLE = "Blog";
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

/** Datum, Autor, Lesezeit — und ob der Beitrag zu einem Termin gehört. */
function MetaLine({
    author,
    date,
    minutes,
    eventTitle,
}: {
    author: string | null;
    date: Date;
    minutes: number;
    /* Kein Link, sondern nur ein Hinweis: der Titel ist bereits einer. */
    eventTitle?: string;
}) {
    return (
        <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
            <time dateTime={date.toISOString()}>{formatDate(date)}</time>
            {author && <span>von {author}</span>}
            <span>{minutes} Min. Lesezeit</span>
            {eventTitle && <span className="text-market">Rückblick auf „{eventTitle}“</span>}
        </p>
    );
}

/**
 * Eine Zeile im Inhaltsverzeichnis. Der Titel ist der Link; das Vorschaubild
 * ist reine Zierde und deshalb nicht noch einmal verlinkt.
 */
function PostRow({ post }: { post: BlogPostWithImages }) {
    return (
        <li className="grid gap-4 border-b border-line py-8 sm:grid-cols-[minmax(0,1fr)_10rem] sm:gap-10">
            <div className="grid min-w-0 content-start gap-2">
                <MetaLine
                    author={post.author}
                    date={post.publishedAt}
                    minutes={readingTimeMinutes(post.content)}
                    eventTitle={post.event?.published ? post.event.title : undefined}
                />
                <h3 className="headline text-2xl sm:text-3xl">
                    <Link
                        href={blogPostPath(post)}
                        className="rounded-sm transition-colors hover:text-physics focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-physics"
                    >
                        {post.title}
                    </Link>
                </h3>
                {post.preview && (
                    <p className="line-clamp-3 max-w-2xl leading-relaxed text-muted text-pretty">
                        {post.preview}
                    </p>
                )}
            </div>
            {post.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={blogImageUrl(post.cover.id, "thumb")}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="hidden aspect-[4/3] w-full rounded-[3px] object-cover sm:block"
                />
            )}
        </li>
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

    return (
        <nav aria-label="Seiten des Blogs" className="mt-10 flex items-center justify-between gap-4">
            {page > 1 ? (
                <Cta href={href(page - 1)} rel="prev" variant="line">
                    Neuere Beiträge
                </Cta>
            ) : (
                <span />
            )}
            <span className="font-serif text-muted italic">
                Seite {page} von {pageCount}
            </span>
            {page < pageCount ? (
                <Cta href={href(page + 1)} rel="next" variant="line">
                    Ältere Beiträge
                </Cta>
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
       auf Seite 2 wäre er eine Behauptung, die nicht stimmt — dort alles in
       derselben Liste. */
    const showLead = !query && page === 1 && posts.length > 0;
    const [lead, ...rest] = posts;
    const listPosts = showLead ? rest : posts;

    return (
        <>
            <PageHead
                title="Blog"
                note={
                    <>
                        Neue Beiträge automatisch bekommen?{" "}
                        <a href="/blog/feed.xml" className="link">
                            RSS-Feed abonnieren
                        </a>
                    </>
                }
            >
                Berichte von Stammtischen und Exkursionen, Ankündigungen aus dem Vorstand und
                Notizen aus der Wirtschaftsphysik.
            </PageHead>

            <Frame className="pb-20 sm:pb-28">
                {/* Ein gewöhnliches GET-Formular: die Suche funktioniert damit auch
                    ohne JavaScript und hinterlässt eine teilbare URL. */}
                <form
                    method="get"
                    action="/blog"
                    role="search"
                    className="flex flex-wrap items-end gap-x-4 gap-y-3 border-b border-line-strong pb-2 focus-within:border-physics focus-within:shadow-[0_1px_0_var(--physics)]"
                >
                    <label className="flex min-w-0 flex-1 items-center gap-3">
                        <Search size={20} aria-hidden="true" className="shrink-0 text-muted" />
                        <span className="sr-only">Beiträge durchsuchen</span>
                        <input
                            type="search"
                            name="q"
                            defaultValue={query}
                            placeholder="Beiträge durchsuchen"
                            className="h-12 min-w-0 flex-1 bg-transparent font-serif text-xl text-foreground placeholder:text-muted focus:outline-none"
                        />
                    </label>
                    {query && (
                        <Link href="/blog" className="link mb-3 text-sm font-medium">
                            Suche zurücksetzen
                        </Link>
                    )}
                    <button type="submit" className="cta cta-solid mb-1 min-h-10">
                        Suchen
                    </button>
                </form>

                {query && (
                    <p className="mt-6 font-serif text-lg text-muted italic" aria-live="polite">
                        {total === 1 ? "1 Treffer" : `${total} Treffer`} für „{query}“
                    </p>
                )}

                {posts.length === 0 ? (
                    <p className="mt-10 max-w-xl leading-relaxed text-muted">
                        {query
                            ? "Zu dieser Suche gibt es keine Beiträge. Versuch es mit einem kürzeren oder allgemeineren Begriff."
                            : "Es gibt noch keine veröffentlichten Beiträge."}
                    </p>
                ) : (
                    <>
                        {showLead && <LeadPost post={lead} />}

                        {listPosts.length > 0 && (
                            <section aria-labelledby="list-title" className="mt-16 grid gap-2 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-14">
                                <h2 id="list-title" className="headline text-3xl lg:sticky lg:top-28 lg:self-start">
                                    {showLead ? "Ältere Beiträge" : query ? "Treffer" : `Seite ${page}`}
                                </h2>
                                <ul className="border-t border-line">
                                    {listPosts.map((post) => (
                                        <PostRow key={post.id} post={post} />
                                    ))}
                                </ul>
                            </section>
                        )}
                    </>
                )}

                <Pagination page={page} pageCount={pageCount} query={query} />
            </Frame>
        </>
    );
}

/** Der neueste Beitrag als Text-Bild-Komposition. */
function LeadPost({ post }: { post: BlogPostWithImages }) {
    return (
        <article
            className={`mt-12 grid gap-10 lg:gap-16 ${
                post.cover ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center" : ""
            }`}
        >
            {post.cover && (
                <div className="relative">
                    <div aria-hidden="true" className="decor paper absolute inset-0 translate-x-4 translate-y-4 sm:translate-x-6 sm:translate-y-6" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={blogImageUrl(post.cover.id)}
                        srcSet={blogImageSrcSet(post.cover.id)}
                        sizes="(min-width: 1024px) 720px, 100vw"
                        alt={post.cover.alt}
                        loading="eager"
                        decoding="async"
                        className="relative aspect-[3/2] w-full rounded-[3px] object-cover"
                    />
                </div>
            )}
            <div className="grid min-w-0 content-start gap-4">
                <p className="font-serif text-lg text-muted italic">Neuester Beitrag</p>
                <h2 className="display text-[clamp(2.25rem,5vw,3.75rem)]">
                    <Link
                        href={blogPostPath(post)}
                        className="rounded-sm transition-colors hover:text-physics focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-physics"
                    >
                        {post.title}
                    </Link>
                </h2>
                <MetaLine
                    author={post.author}
                    date={post.publishedAt}
                    minutes={readingTimeMinutes(post.content)}
                    eventTitle={post.event?.published ? post.event.title : undefined}
                />
                {post.preview && (
                    <p className="max-w-2xl text-lg leading-relaxed text-muted text-pretty">{post.preview}</p>
                )}
                <div className="mt-2">
                    <Cta href={blogPostPath(post)} arrow>
                        Weiterlesen
                    </Cta>
                </div>
            </div>
        </article>
    );
}
