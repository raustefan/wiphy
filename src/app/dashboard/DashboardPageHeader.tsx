import { Box, Flex, Heading, Text, Button } from "@radix-ui/themes";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type DashboardPageHeaderProps = {
    eyebrow: string;
    title: string;
    description?: string;
    backHref: string;
    backLabel?: string;
    /** Plain anchor instead of next/link — needed when a beforeunload guard must fire. */
    backAsPlainAnchor?: boolean;
    children?: React.ReactNode;
};

export function DashboardPageHeader({
    eyebrow,
    title,
    description,
    backHref,
    backLabel = "Zurück zum Dashboard",
    backAsPlainAnchor = false,
    children,
}: DashboardPageHeaderProps) {
    return (
        <Flex
            justify={{ initial: "start", sm: "between" }}
            align={{ initial: "start", sm: "center" }}
            direction={{ initial: "column", sm: "row" }}
            gap="4"
            mb={{ initial: "5", sm: "6" }}
        >
            <Box>
                <Text size="2" color="gray">
                    {eyebrow}
                </Text>
                <Heading as="h1" size={{ initial: "6", sm: "7" }}>
                    {title}
                </Heading>
                {description && (
                    <Text size="2" color="gray">
                        {description}
                    </Text>
                )}
            </Box>
            <Flex gap="3" direction={{ initial: "column", xs: "row" }} width={{ initial: "100%", sm: "auto" }}>
                <Button
                    size="3"
                    variant="soft"
                    color="gray"
                    asChild
                    style={{ width: 220, justifyContent: "center", whiteSpace: "nowrap", flexShrink: 0, cursor: "pointer" }}
                >
                    {backAsPlainAnchor ? (
                        <a href={backHref}>
                            <ArrowLeftIcon width={16} height={16} /> {backLabel}
                        </a>
                    ) : (
                        <Link href={backHref}>
                            <ArrowLeftIcon width={16} height={16} /> {backLabel}
                        </Link>
                    )}
                </Button>
                {children}
            </Flex>
        </Flex>
    );
}
