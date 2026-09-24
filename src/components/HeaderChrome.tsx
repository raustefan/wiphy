"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  House,
  LayoutDashboard,
  LogIn,
  Menu,
  Newspaper,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useSwipeToClose } from "@/lib/client/useSwipeToClose";
import ThemeToggle from "@/components/ThemeToggle";
import { ButtonLink } from "@/components/ui/Button";
import { MEMBERSHIP_APPLICATION_PATH } from "@/lib/membership";

const links = [
  { href: "/termine", label: "Termine" },
  { href: "/blog", label: "Blog" },
  { href: "/geschichte", label: "Geschichte" },
  { href: "/vorstand", label: "Vorstand" },
  { href: "/satzung", label: "Satzung" },
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

  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const swipe = useSwipeToClose(() => setMenuOpen(false));

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

  /* Fokusführung. Das Drawer trägt `aria-modal="true"`, war aber keines: der
     Fokus blieb beim Öffnen auf dem Menüknopf hinter der Abdeckung liegen, und
     ein Tastaturbesuch tabbte aus dem offenen Menü heraus in die verdeckte
     Seite. Anders als beim nativen `<dialog>` (siehe `ui/Dialog.tsx`) nimmt
     einem das hier niemand ab. */
  const hadFocusInside = useRef(false);
  useEffect(() => {
    if (menuOpen) {
      hadFocusInside.current = true;
      // `preventScroll`: Das Panel steht beim Fokussieren noch off-canvas —
      // ohne die Option scrollt der Browser den Container seitwärts zum Knopf,
      // und das Panel ruckelt, bis die Einfahr-Transition vorbei ist.
      closeButtonRef.current?.focus({ preventScroll: true });
      return;
    }
    if (!hadFocusInside.current) return;
    hadFocusInside.current = false;
    // Nur zurückholen, wenn der Fokus noch im geschlossenen Drawer steckte —
    // sonst würde ein Klick irgendwo auf der Seite den Fokus wegreißen.
    if (drawerRef.current?.contains(document.activeElement)) {
      openButtonRef.current?.focus();
    }
  }, [menuOpen]);

  /* Tab hält im Drawer: vom letzten Element zurück zum ersten und umgekehrt. */
  const trapTab = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  /* Für Gäste sind das zwei verschiedene Absichten, die vorher unter einer
     Schaltfläche („Mitgliederbereich“) lagen: anmelden kann nur, wer schon ein
     Konto hat — der Weg in den Verein beginnt woanders. Er steht deshalb als
     gefüllte Schaltfläche daneben, die Anmeldung als ruhiger Link. */
  const signedInAction = { href: "/dashboard", label: "Dashboard" };

  /* Daumenleiste (Telefon): die häufigsten Ziele direkt, alles Weitere im
     Bottom Sheet hinter „Mehr“. */
  const tabs = [
    { href: "/", label: "Start", icon: House },
    { href: "/termine", label: "Termine", icon: CalendarDays },
    { href: "/blog", label: "Blog", icon: Newspaper },
    signedIn
      ? {
          href: signedInAction.href,
          label: signedInAction.label,
          icon: LayoutDashboard,
        }
      : { href: "/login", label: "Anmelden", icon: LogIn },
  ];

  return (
    <>
      <header
        className={cn(
          // Deckende Fläche statt `backdrop-blur`: Der Filter wäre nicht nur
          // teuer, er erzeugt auch einen Containing Block — das Drawer mit
          // `position: fixed` würde dann auf Kopfzeilenhöhe zusammenschrumpfen.
          "sticky top-0 z-40 border-b bg-background transition-shadow",
          // Als installierte App übernimmt auf dem Telefon die Daumenleiste die
          // Navigation; die Kopfzeile wäre nur doppelter Fensterrahmen.
          "standalone:max-md:hidden",
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
              // Feste Höhe statt Preflight-`height: auto`: 48 × 25 trifft das
              // Seitenverhältnis nicht exakt, auf 3×-Displays würden daraus
              // 25,5 px — und Next warnt, weil nur eine Kante abweicht.
              className="h-[25px] w-12 shrink-0"
              priority
            />
            <span className="hidden min-w-0 flex-col border-l border-line pl-3 leading-tight sm:flex">
              <span className="truncate text-[15px] font-bold tracking-tight">
                WirtschaftsPhysik Alumni
              </span>
              <span className="font-mono text-[0.7rem] tracking-[0.14em] text-faint uppercase">
                Universität Ulm · e.V.
              </span>
            </span>
          </Link>

          {/* Navigation (Desktop) */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Hauptnavigation"
          >
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
              {signedIn ? (
                <ButtonLink href={signedInAction.href} size="sm">
                  {signedInAction.label}
                </ButtonLink>
              ) : (
                <>
                  <ButtonLink
                    href="/login"
                    size="sm"
                    variant="ghost"
                    color="neutral"
                  >
                    Anmelden
                  </ButtonLink>
                  <ButtonLink href={MEMBERSHIP_APPLICATION_PATH} size="sm">
                    Mitglied werden
                  </ButtonLink>
                </>
              )}
            </div>
          </nav>

          {/* Mobil: Navigation sitzt unten in der Daumenleiste */}
          <ThemeToggle className="md:hidden" />
        </div>
      </header>

      {/* Daumenleiste (Mobil) */}
      <nav
        aria-label="Schnellnavigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] md:hidden"
      >
        <div className="grid h-16 grid-cols-5">
          {tabs.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors",
                  "focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-physics",
                  active ? "text-physics" : "text-muted",
                )}
              >
                <Icon size={22} aria-hidden="true" />
                {label}
              </Link>
            );
          })}
          <button
            ref={openButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors",
              "focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-physics",
              menuOpen ? "text-physics" : "text-muted",
            )}
          >
            <Menu size={22} aria-hidden="true" />
            Mehr
          </button>
        </div>
      </nav>

      {/* Bottom Sheet (Mobil) */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
        className={cn(
          // `overflow-hidden` klammert das ausgefahrene Panel ein: sonst
          // meldet das Dokument im geschlossenen Zustand die Breite des
          // off-canvas geschobenen Drawers. `clip` statt `hidden`, damit der
          // Container auch per Fokus nicht seitwärts gescrollt werden kann.
          "fixed inset-0 z-50 overflow-clip md:hidden",
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
          ref={drawerRef}
          onKeyDown={trapTab}
          className={cn(
            "absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col rounded-t-2xl bg-surface pb-[env(safe-area-inset-bottom)] shadow-2xl transition-transform duration-250 ease-out motion-reduce:transition-none",
            menuOpen ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div
            {...swipe}
            className="flex h-16 shrink-0 touch-none items-center justify-between border-b border-line px-4"
          >
            <span className="font-mono text-xs tracking-[0.16em] text-faint uppercase">
              Menü
            </span>
            <div className="flex items-center gap-1">
              {/* Hier statt nur in der Kopfzeile: die fehlt in der installierten App. */}
              <ThemeToggle />
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Menü schließen"
                onClick={() => setMenuOpen(false)}
                className="grid size-10 cursor-pointer place-items-center rounded-full text-foreground transition-colors hover:bg-raised focus-visible:outline-2 focus-visible:outline-physics"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <nav
            className="flex flex-1 flex-col gap-1 overflow-y-auto p-3"
            aria-label="Mobile Navigation"
          >
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-12 items-center rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics",
                    active
                      ? "bg-physics/12 text-physics"
                      : "text-foreground hover:bg-raised",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="grid gap-2 border-t border-line p-4">
            {signedIn ? (
              <ButtonLink
                href={signedInAction.href}
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                {signedInAction.label}
              </ButtonLink>
            ) : (
              <>
                <ButtonLink
                  href={MEMBERSHIP_APPLICATION_PATH}
                  className="w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Mitglied werden
                </ButtonLink>
                <ButtonLink
                  href="/login"
                  variant="soft"
                  color="neutral"
                  className="w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Anmelden
                </ButtonLink>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
