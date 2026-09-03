import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonClasses } from "@/components/ui";

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
    const backClass = buttonClasses({
        variant: "soft",
        color: "neutral",
        size: "md",
        className: "w-full sm:w-auto",
    });
    const backContent = (
        <>
            <ArrowLeft size={16} aria-hidden="true" />
            {backLabel}
        </>
    );

    return (
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
            <div className="min-w-0">
                <p className="text-sm text-muted">{eyebrow}</p>
                <h1 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                    {title}
                </h1>
                {description && (
                    <p className="mt-1 max-w-prose text-sm text-muted text-pretty">
                        {description}
                    </p>
                )}
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                {backAsPlainAnchor ? (
                    <a href={backHref} className={backClass}>
                        {backContent}
                    </a>
                ) : (
                    <Link href={backHref} className={backClass}>
                        {backContent}
                    </Link>
                )}
                {children}
            </div>
        </div>
    );
}
