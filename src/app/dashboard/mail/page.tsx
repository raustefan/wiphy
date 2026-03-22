import { requireAdmin } from "@/lib/server/authz";
import { prisma } from "@/lib/prisma";
import { Container, Card, Heading } from "@radix-ui/themes";
import { MailForm } from "./MailForm";

export default async function MailDashboardPage() {
    await requireAdmin();

    const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true },
        orderBy: { name: "asc" },
    });

    return (
        <Container size="2" mt="6" mb="6">
            <Card size="4">
                <Heading mb="4">Rundmail verschicken</Heading>
                <MailForm users={users} />
            </Card>
        </Container>
    );
}
