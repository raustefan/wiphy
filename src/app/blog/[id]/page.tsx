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
        <Container size="3" mt="6" mb="6">
            <Link href="/blog">
                <Button variant="soft" mb="4">← Zurück zur Übersicht</Button>
            </Link>

            <Card size="4">
                <Heading size="8" mb="2">{post.title}</Heading>
                <Text color="gray" size="2" mb="6" as="div">
                    Veröffentlicht am {post.createdAt.toLocaleDateString('de-DE')}
                </Text>

                {/* Hier rufen wir unsere neue Client-Komponente auf */}
                <MarkdownViewer content={post.content} />
            </Card>
        </Container>
    );
}
