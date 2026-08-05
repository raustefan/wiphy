import { Container, Heading, Text, Card, Flex, Button } from "@radix-ui/themes";
import { Calendar, User } from "lucide-react";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/server/services/blogService";

export default async function BlogIndexPage() {
    const posts = await getPublishedPosts();

    return (
        <Container size="3" mt="6" mb="6">
            <Flex justify="between" mb="6" align="center">
                <Heading size="8">Vereins-Blog</Heading>
                <Link href="/">
                    <Button variant="soft">← Zurück zur Startseite</Button>
                </Link>
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
                            size={{ initial: "3", sm: "4" }}
                            className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <Link
                                href={`/blog/${post.id}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <Flex direction="column" gap="4">
                                    <Flex
                                        direction={{ initial: "column", sm: "row" }}
                                        justify="between"
                                        align={{ initial: "start", sm: "center" }}
                                        gap="3"
                                    >
                                        <Heading size={{ initial: "4", sm: "5" }}>
                                            {post.title}
                                        </Heading>

                                        <Flex gap="4" align="center" className="flex-shrink-0">
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
                                        size="3"
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