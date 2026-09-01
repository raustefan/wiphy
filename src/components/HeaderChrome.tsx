"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Button,
  Container,
  DropdownMenu,
  Flex,
  IconButton,
  Text,
} from "@radix-ui/themes";
import { Menu } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/geschichte", label: "Geschichte" },
  { href: "/vorstand", label: "Vorstand" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function HeaderChrome({ signedIn }: { signedIn: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 8);
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const memberHref = signedIn ? "/dashboard" : "/login";
  const memberLabel = signedIn ? "Dashboard" : "Mitgliederbereich";

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <Container size="4" px="0">
        <div className="header-bar">
          {/* Wortmarke */}
          <Link
            href="/"
            aria-label="Zur Startseite"
            style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}
          >
            <Image
              src="/logo-plain.png"
              alt="WirtschaftsPhysik Alumni e.V."
              width={54}
              height={28}
              style={{ objectFit: "contain", flexShrink: 0 }}
              priority
            />
            <Flex
              direction="column"
              display={{ initial: "none", sm: "flex" }}
              style={{
                borderLeft: "1px solid var(--hairline)",
                paddingLeft: 12,
                lineHeight: 1.15,
              }}
            >
              <Text
                size="2"
                weight="bold"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
              >
                WirtschaftsPhysik Alumni
              </Text>
              <Text
                size="1"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.64rem",
                  letterSpacing: "0.14em",
                  color: "var(--gray-10)",
                }}
              >
                UNIVERSITÄT ULM · e.V.
              </Text>
            </Flex>
          </Link>

          {/* Navigation (Desktop) */}
          <Flex
            className="site-nav"
            gap="5"
            align="center"
            display={{ initial: "none", sm: "flex" }}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                data-active={pathname.startsWith(link.href)}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="solid" radius="full" asChild>
              <Link href={memberHref}>{memberLabel}</Link>
            </Button>
            <ThemeToggle />
          </Flex>

          {/* Navigation (Mobil) */}
          <Flex gap="2" align="center" display={{ initial: "flex", sm: "none" }}>
            <ThemeToggle />
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <IconButton variant="soft" radius="full" aria-label="Menü öffnen">
                  <Menu size={18} />
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end" size="2" className="mobile-menu">
                {links.map((link) => (
                  <DropdownMenu.Item key={link.href} asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Separator />
                <DropdownMenu.Item asChild>
                  <Link href={memberHref}>{memberLabel}</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>
        </div>
      </Container>

      <div
        className="scroll-progress"
        aria-hidden="true"
        style={{ ["--progress" as string]: progress }}
      />
    </header>
  );
}
