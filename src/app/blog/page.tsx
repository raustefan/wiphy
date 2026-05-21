import { Container, Heading, Text, Card, Flex, Button } from "@radix-ui/themes";
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
                    <Text color="gray">Es gibt noch keine veröffentlichten Beiträge.</Text>
                ) : (
                    posts.map((post) => (
                        // Die Card normal rendern, aber mit hover-Effekt
                        <Card
                            key={post.id}
                            size="3"
                            style={{
                                cursor: "pointer",
                                transition: "transform 0.2s, box-shadow 0.2s",
                            }}
                            className="hover:shadow-md hover:-translate-y-1" // Tailwind-ähnliche Utility (falls aktiv)
                        >
                            {/* Der Link füllt die ganze Karte aus */}
                            <Link
                                href={`/blog/${post.id}`}
                                style={{ textDecoration: "none", color: "inherit", display: "block" }}
                            >
                                <Heading size="5" mb="2">{post.title}</Heading>

                                <Text color="gray" size="2" mb="3" as="div">
                                    {post.createdAt.toLocaleDateString("de-DE")}
                                </Text>

                                <Text color="gray" size="3" style={{ display: "block" }}>
                                    {post.content.length > 150
                                        ? post.content.substring(0, 150) + "..."
                                        : post.content}
                                </Text>

                                <Flex mt="3">
                                    <Text color="blue" size="2" weight="bold">
                                        Weiterlesen →
                                    </Text>
                                </Flex>
                            </Link>
                        </Card>
                    ))
                )}
            </Flex>
        </Container>
    );
}
