import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import {
  ButtonLink,
  Container,
  Eyebrow,
  PageTitle,
  Prose,
  SectionTitle,
  Separator,
} from "@/components/ui";
import type { LegalBlock, LegalDocument, LegalSection } from "@/lib/legal";

const INLINE = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
const LINK_CLASS = "text-physics underline underline-offset-2";

/** Löst `[Text](Ziel)` und `**fett**` in echte Elemente auf. */
function renderInline(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(INLINE)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));

    const [, label, href, bold] = match;
    if (bold) {
      nodes.push(<strong key={index}>{bold}</strong>);
    } else if (href.startsWith("/")) {
      // Interne Ziele über next/link, damit kein voller Seitenwechsel nötig ist.
      nodes.push(
        <Link key={index} href={href} className={LINK_CLASS}>
          {label}
        </Link>,
      );
    } else {
      const external = href.startsWith("http");
      nodes.push(
        <a
          key={index}
          href={href}
          className={LINK_CLASS}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </a>,
      );
    }
    last = index + match[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes.length === 1 ? nodes[0] : nodes;
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") {
    return <Prose>{renderInline(block)}</Prose>;
  }

  if ("items" in block) {
    return (
      <ul className="ml-5 grid list-disc gap-1.5 text-sm leading-relaxed text-muted marker:text-faint sm:text-base">
        {block.items.map((item) => (
          <li key={item} className="text-pretty">
            {renderInline(item)}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Prose>
      {block.lines.map((line, index) => (
        <Fragment key={line}>
          {index > 0 && <br />}
          {renderInline(line)}
        </Fragment>
      ))}
    </Prose>
  );
}

export function LegalSections({
  document,
  separators = false,
}: {
  document: LegalDocument;
  /** Haarlinie zwischen den Abschnitten — so wie Impressum und Datenschutz es zeigen. */
  separators?: boolean;
}) {
  return (
    <div className={separators ? "grid gap-4" : "grid gap-8"}>
      {document.map((section, index) => (
        <Fragment key={section.id ?? section.title ?? index}>
          {separators && index > 0 && <Separator className="my-2" />}
          <Section section={section} />
        </Fragment>
      ))}
    </div>
  );
}

function Section({ section }: { section: LegalSection }) {
  return (
    <section className="grid gap-3">
      {section.title && (
        <SectionTitle id={section.id && `paragraph-${section.id}`} className="scroll-mt-24">
          {section.title}
        </SectionTitle>
      )}
      {section.blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </section>
  );
}

/**
 * Seitengerüst für Satzung, Impressum und Datenschutz: Titel, Zurück-Link und
 * der Inhaltsbereich. Vorher stand das in jeder der drei Seiten einzeln.
 */
export function LegalPage({
  title,
  eyebrow,
  description,
  children,
}: {
  title: string;
  eyebrow?: ReactNode;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Container size="2" className="pt-6 pb-16 sm:pt-10">
      <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:mb-8 sm:flex-row sm:items-center">
        <div>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <PageTitle>{title}</PageTitle>
        </div>
        <ButtonLink href="/" variant="soft" color="neutral" size="sm">
          ← Zurück zur Startseite
        </ButtonLink>
      </div>

      {description && <Prose className="mb-8 max-w-prose">{description}</Prose>}

      {children}
    </Container>
  );
}
