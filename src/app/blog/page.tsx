import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getPublishedPosts } from "@/lib/server/services/blogService";
import { readingTimeMinutes } from "@/lib/readingTime";

const dateFormat: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
};

function MetaLine({
    author,
    date,
    minutes,
}: {
    author: string | null;
    date: Date;
    minutes: number;
}) {
    return (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-faint">
            <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} aria-hidden="true" />
                {date.toLocaleDateString("de-DE", dateFormat)}
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
        </div>
    );
}

export default async function BlogIndexPage() {
    const posts = await getPublishedPosts();
    const [lead, ...rest] = posts;

    return (
        <Container size="4" className="py-8 sm:py-12">
            <div className="mb-8 flex flex-col gap-4 sm:mb-10 min-[480px]:flex-row min-[480px]:items-end min-[480px]:justify-between">
                <div>
                    <p className="mb-2 font-mono text-xs font-semibold tracking-[0.16em] text-physics uppercase">
                        Aus dem Verein
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                        Vereins-Blog
                    </h1>
                    <p className="mt-3 text-base text-muted sm:text-lg">
                        Berichte, Ankündigungen und Notizen aus der Wirtschaftsphysik.
                    </p>
                </div>
                <Link
                    href="/"
                    className="inline-flex h-9 w-fit shrink-0 items-center rounded-full bg-raised px-4 text-sm font-semibold text-foreground transition-colors hover:bg-line"
                >
                    ← Zurück zur Startseite
                </Link>
            </div>

            {posts.length === 0 ? (
                <Card className="p-6 text-muted sm:p-8">
                    Es gibt noch keine veröffentlichten Beiträge.
                </Card>
            ) : (
                <div className="grid gap-5">
                    {/* Neuester Beitrag */}
                    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                        <Link
                            href={`/blog/${lead.id}`}
                            className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
                        >
                            {lead.imageUrl && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={lead.imageUrl}
                                    alt=""
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
                                />
                                <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                                    {lead.preview}
                                </p>
                                <span className="text-sm font-bold text-physics">
                                    Weiterlesen →
                                </span>
                            </div>
                        </Link>
                    </Card>

                    {/* Weitere Beiträge */}
                    {rest.length > 0 && (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {rest.map((post) => (
                                <Card
                                    key={post.id}
                                    className="group overflow-hidden transition-shadow hover:shadow-lg"
                                >
                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
                                    >
                                        {post.imageUrl && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={post.imageUrl}
                                                alt=""
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
                            ))}
                        </div>
                    )}
                </div>
            )}
        </Container>
    );
}
