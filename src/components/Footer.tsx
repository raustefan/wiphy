import Image from "next/image";
import Link from "next/link";
import { MEMBERSHIP_APPLICATION_PATH } from "@/lib/membership";

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];

const columns: Array<{ heading: string; links: Array<{ href: string; label: string }> }> = [
  {
    heading: "Verein",
    links: [
      { href: "/termine", label: "Termine" },
      { href: "/geschichte", label: "Geschichte" },
      { href: "/vorstand", label: "Vorstand" },
      { href: "/satzung", label: "Satzung & Ziele" },
      { href: "/blog", label: "Blog" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
  {
    heading: "Mitglieder",
    links: [
      { href: "/login", label: "Anmelden" },
      { href: MEMBERSHIP_APPLICATION_PATH, label: "Mitglied werden" },
      { href: "/forgot-password", label: "Passwort vergessen" },
    ],
  },
  {
    heading: "Rechtliches",
    links: legalLinks,
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      {/* Telefon: nur das Pflichtprogramm. Die Navigation steckt dort schon in
          Daumenleiste und „Mehr“-Menü — eine volle Linkliste darunter ließe
          die Seite wie eine Website statt wie eine App wirken. */}
      <div className="flex flex-col items-center px-4 pt-4 text-xs text-faint md:hidden">
        <p>© {new Date().getFullYear()} WirtschaftsPhysik Alumni e.V.</p>
        <div className="flex gap-4">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-12 items-center rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto hidden w-full max-w-6xl px-6 py-14 md:block">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-10">
          <div className="flex flex-col gap-3">
            <Image
              src="/logo-plain.png"
              alt="WirtschaftsPhysik Alumni e.V."
              width={56}
              height={30}
              style={{ objectFit: "contain" }}
              className="h-[30px] w-14"
            />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Gemeinnütziger Verein für Physik- und Wirtschaftsphysik-Alumni
              sowie Studierende der Universität Ulm.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-1.5">
              <p className="mb-1 font-mono text-[0.75rem] font-semibold tracking-[0.16em] text-faint uppercase">
                {column.heading}
              </p>
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-9 items-center text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics rounded-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="text-sm text-faint">
            © {new Date().getFullYear()} WirtschaftsPhysik Alumni e.V.
          </p>
        </div>
      </div>
    </footer>
  );
}
