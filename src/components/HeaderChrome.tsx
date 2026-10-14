"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

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

  /* Nadel auf der Skala: steht unter dem aktiven Punkt und läuft beim
     Überfahren oder Fokussieren federnd zum jeweiligen Link. Die erste
     Platzierung springt — sonst flöge sie bei jedem Seitenaufruf von links
     herein. */
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [needle, setNeedle] = useState({ x: 0, on: false, animate: false });

  const placeNeedle = useCallback((target: HTMLElement | null) => {
    const header = headerRef.current;
    const link = target ?? navRef.current?.querySelector<HTMLElement>("a[data-active]");
    if (!header || !link) {
      setNeedle((n) => ({ ...n, on: false }));
      return;
    }
    const h = header.getBoundingClientRect();
    const l = link.getBoundingClientRect();
    setNeedle((n) => ({ x: l.left - h.left + l.width / 2, on: true, animate: n.on }));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- misst das Layout nach dem Seitenwechsel
    placeNeedle(null);
    const header = headerRef.current;
    if (!header) return;
    const ro = new ResizeObserver(() => placeNeedle(null));
    ro.observe(header);
    return () => ro.disconnect();
  }, [pathname, placeNeedle]);

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
        ref={headerRef}
        className={cn(
          // Deckende Fläche statt `backdrop-blur`: Der Filter wäre nicht nur
          // teuer, er erzeugt auch einen Containing Block — das Drawer mit
          // `position: fixed` würde dann auf Kopfzeilenhöhe zusammenschrumpfen.
          "sticky top-0 z-40 bg-background",
          // Als installierte App übernimmt auf dem Telefon die Daumenleiste die
          // Navigation; die Kopfzeile wäre nur doppelter Fensterrahmen.
          "standalone:max-md:hidden",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[80rem] items-center justify-between gap-4 px-5 sm:px-8">
          {/* Wortmarke */}
          <Link
            href="/"
            aria-label="Zur Startseite"
            className="flex min-w-0 items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-physics"
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
            <span className="font-serif text-[1.0625rem] leading-none font-medium tracking-tight whitespace-nowrap">
              WirtschaftsPhysik <span className="hidden min-[380px]:inline">Alumni</span>
            </span>
          </Link>

          {/* Navigation (Desktop) */}
          <nav
            ref={navRef}
            className="hidden items-center gap-6 md:flex lg:gap-8"
            aria-label="Hauptnavigation"
            onPointerLeave={() => placeNeedle(null)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) placeNeedle(null);
            }}
          >
            <ul className="flex items-center gap-4 lg:gap-6">
              {links.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      data-active={active || undefined}
                      aria-current={active ? "page" : undefined}
                      onPointerEnter={(event) => placeNeedle(event.currentTarget)}
                      onFocus={(event) => placeNeedle(event.currentTarget)}
                      className={cn(
                        "inline-flex h-16 items-center text-sm font-medium transition-colors",
                        "focus-visible:outline-2 focus-visible:-outline-offset-8 focus-visible:outline-physics",
                        active ? "text-foreground" : "text-muted hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-2 border-l border-line pl-4 lg:pl-6">
              <ThemeToggle />
              {signedIn ? (
                <Link href={signedInAction.href} className="cta cta-solid min-h-10 px-4 text-sm">
                  {signedInAction.label}
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="inline-flex h-10 items-center px-2 text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-physics"
                  >
                    Anmelden
                  </Link>
                  <Link
                    href={MEMBERSHIP_APPLICATION_PATH}
                    className="cta cta-solid min-h-10 px-4 text-sm"
                  >
                    Mitglied werden
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobil: Navigation sitzt unten in der Daumenleiste */}
          <ThemeToggle className="md:hidden" />
        </div>

        {/* Skala als Unterkante: Feinstriche, eine Grundlinie, die sich mit dem
            Scrollen füllt, und eine Nadel, die federnd dem Zeiger folgt. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0">
          <div className="ruler" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-line-strong" />
          <div className="scroll-fill absolute inset-x-0 bottom-0 h-px bg-physics" />
          <span
            className="needle absolute bottom-0 left-0 hidden h-[15px] w-0.5 bg-physics md:block"
            style={{
              transform: `translateX(${needle.x - 1}px)`,
              opacity: needle.on ? 1 : 0,
              transition: needle.animate ? undefined : "none",
            }}
          />
        </div>
      </header>

      {/* Daumenleiste (Mobil) */}
      <nav
        aria-label="Schnellnavigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line-strong bg-background pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] md:hidden"
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
                  // Die aktive Station trägt oben einen Strich — dieselbe
                  // Nadel wie auf der Skala der Desktop-Kopfzeile.
                  "relative flex flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors",
                  "focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-physics",
                  active
                    ? "text-physics before:absolute before:inset-x-5 before:top-0 before:h-0.5 before:bg-physics"
                    : "text-muted",
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
            "absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col rounded-t-lg bg-surface pb-[env(safe-area-inset-bottom)] shadow-2xl transition-transform duration-250 ease-out motion-reduce:transition-none",
            menuOpen ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div
            {...swipe}
            className="flex h-16 shrink-0 touch-none items-center justify-between border-b border-line px-4"
          >
            <span className="font-serif text-lg font-medium">Menü</span>
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
                    "flex min-h-12 items-center border-l-2 px-4 py-2 font-serif text-2xl transition-colors",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics",
                    active
                      ? "border-physics text-physics"
                      : "border-transparent text-foreground hover:border-line-strong",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="grid gap-2 border-t border-line p-4">
            {signedIn ? (
              <Link
                href={signedInAction.href}
                className="cta cta-solid w-full"
                onClick={() => setMenuOpen(false)}
              >
                {signedInAction.label}
              </Link>
            ) : (
              <>
                <Link
                  href={MEMBERSHIP_APPLICATION_PATH}
                  className="cta cta-solid w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Mitglied werden
                </Link>
                <Link
                  href="/login"
                  className="cta cta-line w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Anmelden
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
