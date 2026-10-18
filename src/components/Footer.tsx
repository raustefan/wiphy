import Image from "next/image";
import Link from "next/link";
import { MEMBERSHIP_APPLICATION_PATH } from "@/lib/membership";
import GravityTrigger from "@/components/GravityTrigger";
import ContrastToggle from "@/components/ContrastToggle";
import PluckedString from "@/components/PluckedString";

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
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      <PluckedString />

      {/* Telefon: nur das Pflichtprogramm. Die Navigation steckt dort schon in
          Daumenleiste und „Mehr“-Menü — eine volle Linkliste darunter ließe
          die Seite wie eine Website statt wie eine App wirken. */}
      <div className="flex flex-col items-center gap-2 px-4 pt-2 pb-4 text-xs text-muted lg:hidden">
        <p>© {year} WirtschaftsPhysik Alumni e. V.</p>
        <div className="flex flex-wrap justify-center gap-2">
          <GravityTrigger />
          <ContrastToggle />
        </div>
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

      <div className="mx-auto hidden w-full max-w-[80rem] px-8 pt-10 pb-12 lg:block">
        <div className="grid grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))] gap-10">
          <div className="grid content-start gap-5">
            <Image
              src="/logo-plain.png"
              alt="WirtschaftsPhysik Alumni e. V."
              width={56}
              height={30}
              style={{ objectFit: "contain" }}
              className="h-[30px] w-14"
            />
            <p className="max-w-sm font-serif text-xl leading-snug text-pretty">
              Physik und Wirtschaftsphysik an der Universität Ulm — seit 2004 als
              gemeinnütziger Verein organisiert.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading} className="grid content-start gap-1">
              <p className="mb-2 font-serif text-sm text-muted italic">{column.heading}</p>
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-8 w-fit items-center rounded-sm text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="text-sm text-muted">© {year} WirtschaftsPhysik Alumni e. V., Ulm</p>
          <div className="flex flex-wrap items-center gap-2">
            <GravityTrigger />
            <ContrastToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
