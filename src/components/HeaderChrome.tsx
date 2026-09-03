"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import ThemeToggle from "@/components/ThemeToggle";
import { ButtonLink } from "@/components/ui/Button";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/geschichte", label: "Geschichte" },
  { href: "/vorstand", label: "Vorstand" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function HeaderChrome({ signedIn }: { signedIn: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Neuen Pfad anzeigen → Drawer schließen (z. B. nach Browser-Back).
     Anpassung während des Renderns statt im Effekt: so wird das offene Drawer
     nie für einen Frame auf der neuen Seite gezeigt. */
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  /* Scroll-Sperre und Esc-Handling, solange das Drawer offen ist. */
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const memberHref = signedIn ? "/dashboard" : "/login";
  const memberLabel = signedIn ? "Dashboard" : "Mitgliederbereich";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background/95 backdrop-blur-sm transition-shadow",
        scrolled ? "border-line shadow-sm" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* Wortmarke */}
        <Link
          href="/"
          aria-label="Zur Startseite"
          className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-physics"
        >
          <Image
            src="/logo-plain.png"
            alt=""
            width={48}
            height={25}
            style={{ objectFit: "contain" }}
            className="shrink-0"
            priority
          />
          <span className="hidden min-w-0 flex-col border-l border-line pl-3 leading-tight sm:flex">
            <span className="truncate text-[15px] font-bold tracking-tight">
              WirtschaftsPhysik Alumni
            </span>
            <span className="font-mono text-[0.62rem] tracking-[0.16em] text-faint uppercase">
              Universität Ulm · e.V.
            </span>
          </span>
        </Link>

        {/* Navigation (Desktop) */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Hauptnavigation">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics",
                  active
                    ? "bg-raised text-foreground"
                    : "text-muted hover:bg-raised hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="ml-2 flex items-center gap-2">
            <ThemeToggle />
            <ButtonLink href={memberHref} size="sm">
              {memberLabel}
            </ButtonLink>
          </div>
        </nav>

        {/* Navigation (Mobil) */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Menü öffnen"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
            className="grid size-10 cursor-pointer place-items-center rounded-full text-foreground transition-colors hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          menuOpen ? "visible" : "pointer-events-none invisible",
        )}
      >
        <div
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-black/45 transition-opacity duration-200",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-full max-w-xs flex-col bg-surface shadow-2xl transition-transform duration-250 ease-out motion-reduce:transition-none",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-4">
            <span className="font-mono text-xs tracking-[0.16em] text-faint uppercase">
              Menü
            </span>
            <button
              type="button"
              aria-label="Menü schließen"
              onClick={() => setMenuOpen(false)}
              className="grid size-10 cursor-pointer place-items-center rounded-full text-foreground transition-colors hover:bg-raised focus-visible:outline-2 focus-visible:outline-physics"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3" aria-label="Mobile Navigation">
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics",
                    active ? "bg-physics/12 text-physics" : "text-foreground hover:bg-raised",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-line p-4">
            <ButtonLink
              href={memberHref}
              className="w-full"
              onClick={() => setMenuOpen(false)}
            >
              {memberLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
