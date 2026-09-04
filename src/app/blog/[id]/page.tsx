import { notFound } from "next/navigation";
import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import MarkdownViewer from "@/components/MarkdownViewer";
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
                    {post.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={post.imageUrl}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="mb-5 aspect-[4/3] w-full rounded-lg border border-line object-cover"
                        />
                    )}
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
                    </dl>
                </Card>
            </header>

            <div className="my-8 h-px bg-line sm:my-10" aria-hidden="true" />

            <article className="max-w-[70ch] text-[1.05rem]">
                <MarkdownViewer content={post.content} />
            </article>
        </Container>
    );
}
