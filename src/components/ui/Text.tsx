import { cn } from "@/lib/cn";

/**
 * Typografie-Primitiven.
 *
 * Die Klassenketten hier standen vorher vielfach wörtlich im Markup. Als
 * Komponenten sind sie an einer Stelle änderbar — und eine Seite kann nicht
 * mehr versehentlich eine halbe Variante davon benutzen.
 */

/** Abschnittsüberschrift (`h2`). */
export function SectionTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("headline text-2xl", className)}
      {...props}
    />
  );
}

/**
 * Kleine Auszeichnung über einem Titel („Verein“, „Mitgliederbereich“ …).
 *
 * Stand vorher in vier Varianten im Markup — Mono-Versalien mit und ohne
 * Symbol, normale Schrift mit Symbol, schlichtes Grau im Dashboard. Jetzt
 * überall dieselbe: kursive Serife in der Akzentfarbe, Symbol optional
 * (`size={14}`). Zentriert wird über `justify-center`.
 */
export function Eyebrow({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 font-serif text-base text-physics italic",
        className,
      )}
      {...props}
    />
  );
}
