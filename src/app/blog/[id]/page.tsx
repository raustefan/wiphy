import { notFound } from "next/navigation";
import { ArrowRight, Calendar, CalendarDays, Clock, User } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui";
import { eventPath, formatEventShort } from "@/lib/events";
import MarkdownViewer from "@/components/MarkdownViewer";
import { BlogGallery } from "@/components/BlogGallery";
import { getPublishedPost } from "@/lib/server/services/blogService";
import { readingTimeMinutes } from "@/lib/readingTime";
import { formatDate } from "@/lib/format";

export default async function PublicBlogPost({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;

    const post = await getPublishedPost(resolvedParams.id);

    if (!post) return notFound();

    const minutes = readingTimeMinutes(post.content);
    const published = formatDate(post.publishedAt);

    return (
        <Container size="3" className="py-8 sm:py-12">
            <Link
                href="/blog"
                className="mb-6 inline-flex h-9 items-center rounded-full bg-raised px-4 text-sm font-semibold text-foreground transition-colors hover:bg-line"
            >
                ← Zurück zur Übersicht
            </Link>

            <header className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
                <div className="min-w-0">
                    <p className="mb-3 font-mono text-xs font-semibold tracking-[0.16em] text-physics uppercase">
                        Vereins-Blog
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl">
                        {post.title}
                    </h1>
                    {post.preview && (
                        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                            {post.preview}
                        </p>
                    )}
                </div>

                <Card className="h-fit p-5 lg:sticky lg:top-24">
                    <dl className="grid gap-4">
                        <div className="grid gap-1">
                            <dt className="font-mono text-[0.68rem] tracking-[0.14em] text-faint uppercase">
                                Autor
                            </dt>
                            <dd className="flex items-center gap-2 text-sm font-semibold">
                                <User size={15} aria-hidden="true" className="text-faint" />
                                {post.author || "Redaktion"}
                            </dd>
                        </div>
                        <div className="grid gap-1 border-t border-line pt-4">
                            <dt className="font-mono text-[0.68rem] tracking-[0.14em] text-faint uppercase">
                                Veröffentlicht
                            </dt>
                            <dd className="flex items-center gap-2 text-sm">
                                <Calendar size={15} aria-hidden="true" className="text-faint" />
                                {published}
                            </dd>
                        </div>
                        <div className="grid gap-1 border-t border-line pt-4">
                            <dt className="font-mono text-[0.68rem] tracking-[0.14em] text-faint uppercase">
                                Lesedauer
                            </dt>
                            <dd className="flex items-center gap-2 text-sm">
                                <Clock size={15} aria-hidden="true" className="text-faint" />
                                ca. {minutes} Min.
                            </dd>
                        </div>
                        {/* Nur veröffentlichte Termine: ein Entwurf hätte keine
                            Seite, auf die der Link führen könnte. */}
                        {post.event?.published && (
                            <div className="grid gap-1 border-t border-line pt-4">
                                <dt className="font-mono text-[0.68rem] tracking-[0.14em] text-faint uppercase">
                                    Gehört zum Termin
                                </dt>
                                <dd className="grid gap-1 text-sm">
                                    <Link
                                        href={eventPath(post.event.id)}
                                        className="font-semibold text-physics underline-offset-4 hover:underline"
                                    >
                                        {post.event.title}
                                    </Link>
                                    <span className="font-mono text-xs text-faint">
                                        {formatEventShort(post.event)}
                                    </span>
                                </dd>
                            </div>
                        )}
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
                    <p className="flex items-center gap-2 font-mono text-[0.68rem] font-semibold tracking-[0.16em] text-faint uppercase">
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
                            href={eventPath(post.event.id)}
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
