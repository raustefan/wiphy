import { Container, Heading, Text, Card, Flex, Button, Box, Separator, Badge } from "@radix-ui/themes";
import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
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
    imageUrl,
}: {
    author: string | null;
    date: Date;
    minutes: number;
    imageUrl?: string | null;
}) {
    return (
        <Flex gap="3" align="center" wrap="wrap" className="post-meta">
            {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="" className="post-meta-thumb" />
            )}
            <Flex gap="4" align="center" wrap="wrap">
                <Flex gap="1" align="center">
                    <Calendar size={14} />
                    <span>{date.toLocaleDateString("de-DE", dateFormat)}</span>
                </Flex>
                {author && (
                    <Flex gap="1" align="center">
                        <User size={14} />
                        <span>{author}</span>
                    </Flex>
                )}
                <Flex gap="1" align="center">
                    <Clock size={14} />
                    <span>{minutes} Min. Lesezeit</span>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default async function BlogIndexPage() {
    const posts = await getPublishedPosts();
    const [lead, ...rest] = posts;

    return (
        <Container size="4" px="0" py={{ initial: "4", sm: "6" }}>
            <Flex
                direction={{ initial: "column", xs: "row" }}
                justify="between"
                align={{ initial: "start", xs: "end" }}
                gap="3"
                mb="4"
            >
                <Box>
                    <Text className="post-kicker" as="div" mb="1">
                        Aus dem Verein
                    </Text>
                    <Heading as="h1" size={{ initial: "7", sm: "9" }} className="display-title">
                        Vereins-Blog
                    </Heading>
                    <Text color="gray" size={{ initial: "2", sm: "3" }} as="div" mt="2">
                        Berichte, Ankündigungen und Notizen aus der Wirtschaftsphysik.
                    </Text>
                </Box>
                <Button variant="soft" radius="full" asChild>
                    <Link href="/">← Zurück zur Startseite</Link>
                </Button>
            </Flex>

            <Separator size="4" mb={{ initial: "5", sm: "6" }} />

            {posts.length === 0 ? (
                <Card size="3" className="panel">
                    <Text color="gray">Es gibt noch keine veröffentlichten Beiträge.</Text>
                </Card>
            ) : (
                <Flex direction="column" gap={{ initial: "4", sm: "5" }}>
                    <Card size={{ initial: "3", sm: "4" }} className="post-card post-card--lead panel">
                        <Link
                            href={`/blog/${lead.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            {lead.imageUrl && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={lead.imageUrl} alt="" className="post-card-lead-image" />
                            )}
                            <Flex direction="column" gap="3">
                                <Badge color="mint" radius="full" variant="soft" style={{ width: "fit-content" }}>
                                    Neuester Beitrag
                                </Badge>
                                <Heading as="h2" size={{ initial: "6", sm: "8" }} className="display-title">
                                    {lead.title}
                                </Heading>
                                <MetaLine
                                    author={lead.author}
                                    date={lead.publishedAt}
                                    minutes={readingTimeMinutes(lead.content)}
                                    imageUrl={null}
                                />
                                <Text
                                    size={{ initial: "3", sm: "4" }}
                                    as="div"
                                    className="post-lede"
                                >
                                    {lead.preview}
                                </Text>
                                <Text color="blue" size="2" weight="bold">
                                    Weiterlesen →
                                </Text>
                            </Flex>
                        </Link>
                    </Card>

                    {rest.length > 0 && (
                        <Box className="post-grid">
                            {rest.map((post) => (
                                <Card
                                    key={post.id}
                                    size={{ initial: "2", sm: "3" }}
                                    className="post-card panel"
                                >
                                    <Link
                                        href={`/blog/${post.id}`}
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        {post.imageUrl && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={post.imageUrl} alt="" className="post-card-image" />
                                        )}
                                        <Flex direction="column" gap="2" height="100%">
                                            <MetaLine
                                                author={post.author}
                                                date={post.publishedAt}
                                                minutes={readingTimeMinutes(post.content)}
                                            />
                                            <Heading as="h2" size={{ initial: "4", sm: "5" }}>
                                                {post.title}
                                            </Heading>
                                            <Text
                                                color="gray"
                                                size="2"
                                                as="div"
                                                className="post-excerpt"
                                            >
                                                {post.preview}
                                            </Text>
                                            <Box mt="auto" pt="2">
                                                <Text color="blue" size="2" weight="bold">
                                                    Weiterlesen →
                                                </Text>
                                            </Box>
                                        </Flex>
                                    </Link>
                                </Card>
                            ))}
                        </Box>
                    )}
                </Flex>
            )}
        </Container>
    );
}
