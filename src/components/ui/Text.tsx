import { cn } from "@/lib/cn";

/**
 * Typografie-Primitiven.
 *
 * Die drei Klassenketten hier standen vorher rund sechzig Mal wörtlich im
 * Markup. Als Komponenten sind sie an einer Stelle änderbar — und eine Seite
 * kann nicht mehr versehentlich eine halbe Variante davon benutzen.
 */

/**
 * Titel in Seitengröße. Standardmäßig ein `h1`; Abschnitte einer Seite, die
 * denselben Schriftgrad tragen, setzen `as="h2"` — pro Seite darf es nur eine
 * `h1` geben.
 */
export function PageTitle({
  as: Tag = "h1",
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: "h1" | "h2" }) {
  return (
    <Tag
      className={cn(
        "text-3xl font-bold tracking-tight text-balance sm:text-4xl",
        className,
      )}
      {...props}
    />
  );
}

/** Abschnittsüberschrift (`h2`). */
export function SectionTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-xl font-bold tracking-tight text-balance", className)}
      {...props}
    />
  );
}

/** Fließtext in Lesegröße. */
export function Prose({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-sm leading-relaxed text-muted text-pretty sm:text-base",
        className,
      )}
      {...props}
    />
  );
}

/** Einleitungstext unter einem Seitentitel — eine Stufe größer als `Prose`. */
export function Lead({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-base leading-relaxed text-muted text-pretty sm:text-lg",
        className,
      )}
      {...props}
    />
  );
}

/** Kleine Auszeichnung über einem Titel („Verein“, „Mitgliederbereich“ …). */
export function Eyebrow({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-sm font-medium text-physics",
        className,
      )}
      {...props}
    />
  );
}
