import Image from "next/image";
import Link from "next/link";

const columns: Array<{ heading: string; links: Array<{ href: string; label: string }> }> = [
  {
    heading: "Verein",
    links: [
      { href: "/geschichte", label: "Geschichte" },
      { href: "/vorstand", label: "Vorstand" },
      { href: "/blog", label: "Blog" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
  {
    heading: "Mitglieder",
    links: [
      { href: "/login", label: "Anmelden" },
      { href: "/register", label: "Mitglied werden" },
      { href: "/forgot-password", label: "Passwort vergessen" },
    ],
  },
  {
    heading: "Rechtliches",
    links: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid grid-cols-1 gap-8 min-[480px]:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-10">
          <div className="flex flex-col gap-3 min-[480px]:col-span-2 md:col-span-1">
            <Image
              src="/logo-plain.png"
              alt="WirtschaftsPhysik Alumni e.V."
              width={56}
              height={30}
              style={{ objectFit: "contain" }}
            />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Gemeinnütziger Verein für Physik- und Wirtschaftsphysik-Alumni
              sowie Studierende der Universität Ulm.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-1.5">
              <p className="mb-1 font-mono text-[0.68rem] font-semibold tracking-[0.16em] text-faint uppercase">
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
