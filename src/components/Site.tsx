import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { cn } from "@/lib/cn";

/** Satzspiegel: breiter als `Container`, damit die Randspalte Platz hat. */
export function Frame({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-[80rem] px-5 sm:px-8", className)} {...props} />;
}

type CtaProps = Omit<React.ComponentProps<typeof Link>, "children"> & {
  children: React.ReactNode;
  /** `invert`/`invert-line` für gefüllte Flächen (Blaupause). */
  variant?: "solid" | "line" | "invert" | "invert-line";
  /** Pfeil mit Feder — nur für die eine Hauptaktion eines Abschnitts. */
  arrow?: boolean;
};

export function Cta({ variant = "solid", arrow = false, className, children, ...props }: CtaProps) {
  return (
    <Link className={cn("cta", `cta-${variant}`, className)} {...props}>
      {children}
      {arrow && <HugeiconsIcon icon={ArrowRight01Icon} size={17} aria-hidden="true" className="cta-arrow shrink-0" />}
    </Link>
  );
}

/**
 * Seitenkopf: großer Serifentitel auf auslaufendem Millimeterpapier, darunter
 * die Einleitung; rechts optional eine Randnotiz.
 */
export function PageHead({
  title,
  children,
  note,
  className,
}: {
  title: React.ReactNode;
  children?: React.ReactNode;
  note?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("relative isolate", className)}>
      <div aria-hidden="true" className="decor paper paper-fade absolute inset-0 -z-10" />
      <Frame className="grid gap-8 pt-12 pb-10 sm:pt-20 sm:pb-14 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
        <div className="min-w-0">
          <h1 className="display text-[clamp(2.75rem,9vw,5.75rem)] [overflow-wrap:anywhere] sm:[overflow-wrap:normal]">
            {title}
          </h1>
          {children && (
            <div className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground text-pretty sm:text-xl">
              {children}
            </div>
          )}
        </div>
        {note && <aside className="marginal self-end border-l-2 border-physics pl-4">{note}</aside>}
      </Frame>
    </header>
  );
}

/** LinkedIn-Zeichen, gefüllt — Hugeicons free hat Marken-Icons nur als Umriss. */
export function LinkedInGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.25 8.4h3.5V21h-3.5V8.4Zm6.06 0h3.35v1.72h.05c.47-.85 1.6-1.75 3.3-1.75 3.53 0 4.19 2.2 4.19 5.07V21h-3.5v-6.16c0-1.47-.03-3.36-2.09-3.36-2.09 0-2.41 1.6-2.41 3.25V21h-3.5V8.4Z" />
    </svg>
  );
}
