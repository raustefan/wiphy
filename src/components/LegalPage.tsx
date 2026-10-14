import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Frame, PageHead } from "@/components/Site";
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
    return <p className="text-pretty">{renderInline(block)}</p>;
  }

  if ("items" in block) {
    return (
      <ul className="grid list-disc gap-1.5 pl-5 marker:text-physics">
        {block.items.map((item) => (
          <li key={item} className="text-pretty">
            {renderInline(item)}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p>
      {block.lines.map((line, index) => (
        <Fragment key={line}>
          {index > 0 && <br />}
          {renderInline(line)}
        </Fragment>
      ))}
    </p>
  );
}

/** Ankerziel eines Abschnitts: das gepflegte `id`, sonst die laufende Nummer. */
const anchorOf = (section: LegalSection, index: number) =>
  section.id ? `paragraph-${section.id}` : `abschnitt-${index + 1}`;

/**
 * Der Text in der Lesespalte, links daneben ein klebendes Inhaltsverzeichnis
 * — bei Satzung und Datenschutzerklärung mit ihren zwanzig Abschnitten ist
 * das der schnellste Weg zum gesuchten Paragrafen.
 */
export function LegalSections({ document }: { document: LegalDocument }) {
  const titled = document
    .map((section, index) => ({ section, anchor: anchorOf(section, index) }))
    .filter(({ section }) => section.title);

  return (
    <div className="grid gap-10 border-t border-line pt-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-14">
      {titled.length > 3 ? (
        <nav aria-label="Inhalt" className="lg:sticky lg:top-28 lg:max-h-[calc(100dvh-8rem)] lg:self-start lg:overflow-y-auto">
          <p className="font-serif text-lg italic">Inhalt</p>
          <ol className="mt-3 grid gap-1 border-l border-line text-sm">
            {titled.map(({ section, anchor }) => (
              <li key={anchor}>
                <a
                  href={`#${anchor}`}
                  className="-ml-px block border-l border-transparent py-1 pl-3 text-muted transition-colors hover:border-physics hover:text-foreground focus-visible:outline-2 focus-visible:outline-physics"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : (
        <span aria-hidden="true" className="hidden lg:block" />
      )}

      <div className="reading grid gap-12">
        {document.map((section, index) => (
          <Section key={anchorOf(section, index)} section={section} anchor={anchorOf(section, index)} />
        ))}
      </div>
    </div>
  );
}

function Section({ section, anchor }: { section: LegalSection; anchor: string }) {
  return (
    <section className="grid gap-4">
      {section.title && (
        <h2 id={anchor} className="headline scroll-mt-28 text-2xl sm:text-3xl">
          {section.title}
        </h2>
      )}
      {section.blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </section>
  );
}

/**
 * Seitengerüst für Satzung, Impressum und Datenschutz: Kopf mit Titel und
 * Einleitung, darunter der Inhaltsbereich.
 */
export function LegalPage({
  title,
  description,
  note,
  children,
}: {
  title: string;
  description?: React.ReactNode;
  note?: React.ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <PageHead title={title} note={note}>
        {description}
      </PageHead>
      <Frame className="pb-20 sm:pb-28">{children}</Frame>
    </>
  );
}
