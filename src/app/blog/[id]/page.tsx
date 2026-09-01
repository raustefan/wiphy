import { notFound } from "next/navigation";
import { Container, Heading, Text, Card, Button, Box, Flex, Separator } from "@radix-ui/themes";
import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import MarkdownViewer from "@/components/MarkdownViewer";
import { getPublishedPost } from "@/lib/server/services/blogService";
import { readingTimeMinutes } from "@/lib/readingTime";

export default async function PublicBlogPost({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;

    const post = await getPublishedPost(resolvedParams.id);

    if (!post) return notFound();

    const minutes = readingTimeMinutes(post.content);
    const published = post.publishedAt.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <Container size="4" px="0" py={{ initial: "4", sm: "6" }}>
            <Button variant="soft" radius="full" mb="4" asChild>
                <Link href="/blog">← Zurück zur Übersicht</Link>
            </Button>

            {/* Kopfbereich: Titel und Vorspann links, Steckbrief rechts daneben —
                fest an dieser Stelle, nicht sticky, und stapelt auf dem Telefon. */}
            <Box className="article-header">
                <Box className="article-intro">
                    <Text className="post-kicker" as="div" mb="2">
                        Vereins-Blog
                    </Text>
                    <Heading as="h1" size={{ initial: "7", sm: "9" }} className="display-title">
                        {post.title}
                    </Heading>
                    {post.preview && (
                        <Text as="div" size={{ initial: "3", sm: "4" }} className="post-lede" mt="3">
                            {post.preview}
                        </Text>
                    )}
                </Box>

                <Separator size="4" orientation="vertical" className="article-header-separator" />

                <Box asChild>
                    <aside className="article-aside">
                        <Card size="3" className="panel panel-ticks article-meta-card">
                            <Flex direction="column" gap="4">
                                {post.imageUrl && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={post.imageUrl}
                                        alt=""
                                        className="article-meta-image"
                                    />
                                )}

                                <Box>
                                    <Text className="post-kicker" as="div" mb="1">
                                        Autor
                                    </Text>
                                    <Flex gap="2" align="center">
                                        <User size={16} style={{ color: "var(--gray-10)" }} />
                                        <Text size="2" weight="bold">
                                            {post.author || "Redaktion"}
                                        </Text>
                                    </Flex>
                                </Box>

                                <Separator size="4" />

                                <Box>
                                    <Text className="post-kicker" as="div" mb="1">
                                        Veröffentlicht
                                    </Text>
                                    <Flex gap="2" align="center">
                                        <Calendar size={16} style={{ color: "var(--gray-10)" }} />
                                        <Text size="2">{published}</Text>
                                    </Flex>
                                </Box>

                                <Separator size="4" />

                                <Box>
                                    <Text className="post-kicker" as="div" mb="1">
                                        Lesedauer
                                    </Text>
                                    <Flex gap="2" align="center">
                                        <Clock size={16} style={{ color: "var(--gray-10)" }} />
                                        <Text size="2">ca. {minutes} Min.</Text>
                                    </Flex>
                                </Box>
                            </Flex>
                        </Card>
                    </aside>
                </Box>
            </Box>

            <Separator size="4" my={{ initial: "4", sm: "5" }} />

            <Box asChild>
                <article className="article-body article-body--full">
                    <MarkdownViewer content={post.content} />
                </article>
            </Box>
        </Container>
    );
}
