import { Container, Heading, Text, Card, Flex, Button } from "@radix-ui/themes";
import { Calendar, User } from "lucide-react";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/server/services/blogService";

export default async function BlogIndexPage() {
    const posts = await getPublishedPosts();

    return (
        <Container size="3" px="0" py={{ initial: "4", sm: "6" }}>
            <Flex
                direction={{ initial: "column", xs: "row" }}
                justify="between"
                align={{ initial: "start", xs: "center" }}
                gap="3"
                mb={{ initial: "5", sm: "6" }}
            >
                <Heading as="h1" size={{ initial: "7", sm: "8" }} className="display-title">
                    Vereins-Blog
                </Heading>
                <Button variant="soft" radius="full" asChild>
                    <Link href="/">← Zurück zur Startseite</Link>
                </Button>
            </Flex>

            <Flex direction="column" gap="4">
                {posts.length === 0 ? (
                    <Text color="gray">
                        Es gibt noch keine veröffentlichten Beiträge.
                    </Text>
                ) : (
                    posts.map((post) => (
                        <Card
                            key={post.id}
                            size={{ initial: "2", sm: "4" }}
                            className="post-card panel"
                        >
                            <Link
                                href={`/blog/${post.id}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <Flex direction="column" gap="3">
                                    <Flex
                                        direction={{ initial: "column", sm: "row" }}
                                        justify="between"
                                        align={{ initial: "start", sm: "center" }}
                                        gap="3"
                                    >
                                        <Heading as="h2" size={{ initial: "4", sm: "5" }}>
                                            {post.title}
                                        </Heading>

                                        <Flex gap="4" align="center" wrap="wrap" className="post-meta">
                                            <Flex gap="1" align="center">
                                                <Calendar
                                                    size={16}
                                                    style={{ color: "var(--gray-10)" }}
                                                />
                                                <Text color="gray" size="2">
                                                    {post.publishedAt.toLocaleDateString("de-DE")}
                                                </Text>
                                            </Flex>

                                            {post.author && (
                                                <Flex gap="1" align="center">
                                                    <User size={16} style={{ color: "var(--gray-10)" }} />
                                                    <Text color="gray" size="2">
                                                        {post.author}
                                                    </Text>
                                                </Flex>
                                            )}
                                        </Flex>
                                    </Flex>

                                    <Text
                                        color="gray"
                                        size={{ initial: "2", sm: "3" }}
                                        style={{ lineHeight: 1.7 }}
                                        as="div"
                                    >
                                        {post.preview}
                                    </Text>

                                    <Flex justify="end">
                                        <Text color="blue" size="2" weight="bold">
                                            Weiterlesen →
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Link>
                        </Card>
                    ))
                )}
            </Flex>
        </Container>
    );
}