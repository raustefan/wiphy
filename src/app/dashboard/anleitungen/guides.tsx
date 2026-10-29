import { readFile } from "node:fs/promises";
import path from "node:path";
import { isValidElement } from "react";
import Link from "next/link";
import type { Components } from "react-markdown";
import { CodeIcon, ContactIcon, CreditCardIcon, FileAttachmentIcon, LayoutThreeRowIcon, SentIcon } from "@hugeicons/core-free-icons";
import MarkdownViewer from "@/components/MarkdownViewer";

/**
 * Die Anleitungen liegen als Markdown im Repo (`anleitungen/`) und werden hier
 * nur angezeigt — eine Quelle für GitHub und Dashboard. Nur Slugs aus dieser
 * Liste werden gelesen, ein beliebiger Pfad aus der URL nie.
 */
export const GUIDES = [
    { slug: "konten", title: "Konten", description: "Benutzerverwaltung, Konto anlegen, bearbeiten, sperren, löschen", Icon: ContactIcon },
    { slug: "mitgliedschaft", title: "Mitgliedschaft", description: "Anträge, Austritte, Studierendenstatus", Icon: FileAttachmentIcon },
    { slug: "beitraege", title: "Beiträge", description: "Beitragssätze, Beitragsjahr, Zahlungen, Erinnerung, SEPA", Icon: CreditCardIcon },
    { slug: "inhalte", title: "Inhalte", description: "Termine, Blog, Vorstand und Signatur", Icon: LayoutThreeRowIcon },
    { slug: "kommunikation", title: "Kommunikation", description: "Rundmail, Newsletter, Einladungen, Kontaktanfragen", Icon: SentIcon },
    { slug: "technik", title: "Technik", description: "Debug-Modus, Feature Flags, Sicherheit, Server, Backup", Icon: CodeIcon },
] as const;

export function findGuide(slug: string) {
    return GUIDES.find((guide) => guide.slug === slug);
}

/** Inhalt ohne die `# Titel`-Zeile — den trägt der Seitenkopf. */
export async function readGuide(file: string) {
    const raw = await readFile(path.join(process.cwd(), "anleitungen", `${file}.md`), "utf8");
    return raw.replace(/^# .*\n+/, "");
}

/** Wie GitHub: so treffen die Anker der Querverweise (`beitraege.md#…`) auch hier. */
function slugify(text: string) {
    return text.trim().toLowerCase().replace(/[^\p{L}\p{N}\- ]/gu, "").replace(/ /g, "-");
}

function textOf(node: React.ReactNode): string {
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(textOf).join("");
    if (isValidElement<{ children?: React.ReactNode }>(node)) return textOf(node.props.children);
    return "";
}

function anchoredHeading(Tag: "h2" | "h3" | "h4") {
    return function AnchoredHeading({ children }: { children?: React.ReactNode }) {
        return (
            <Tag id={slugify(textOf(children))} className="scroll-mt-24">
                {children}
            </Tag>
        );
    };
}

/** Der Titel steht als h1 im Kopf, also bleibt `##` hier h2 — ohne die Verschiebung des Viewers. */
const components: Components = {
    h2: anchoredHeading("h2"),
    h3: anchoredHeading("h3"),
    h4: anchoredHeading("h4"),
    a({ href = "", children }) {
        const guideLink = /^([a-z]+)\.md(#.*)?$/.exec(href);
        if (guideLink) return <Link href={`/dashboard/anleitungen/${guideLink[1]}${guideLink[2] ?? ""}`}>{children}</Link>;
        return <a href={href}>{children}</a>;
    },
};

export function GuideMarkdown({ content }: { content: string }) {
    return <MarkdownViewer content={content} components={components} />;
}
