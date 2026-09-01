import { notFound } from "next/navigation";
import { Container, Heading, Text, Card, Button } from "@radix-ui/themes";
import Link from "next/link";
import MarkdownViewer from "@/components/MarkdownViewer";
import { getPublishedPost } from "@/lib/server/services/blogService";

export default async function PublicBlogPost({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;

    const post = await getPublishedPost(resolvedParams.id);

    if (!post) return notFound();

    return (
        <Container size="3" px="0" py={{ initial: "4", sm: "6" }}>
            <Button variant="soft" radius="full" mb="4" asChild>
                <Link href="/blog">← Zurück zur Übersicht</Link>
            </Button>

            <Card size={{ initial: "2", sm: "4" }} className="panel">
                <Heading as="h1" size={{ initial: "6", sm: "8" }} mb="2" className="display-title">
                    {post.title}
                </Heading>
                <Text color="gray" size="2" mb="6" as="div">
                    Veröffentlicht {post.author ? `von ${post.author}` : ""} am {post.publishedAt.toLocaleDateString('de-DE')}
                </Text>

                {/* Hier rufen wir unsere neue Client-Komponente auf */}
                <MarkdownViewer content={post.content} />
            </Card>
        </Container>
    );
}
