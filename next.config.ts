import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  /**
   * Die Registrierung und der Aufnahmeantrag sind in der öffentlichen Seite
   * „Mitglied werden“ aufgegangen. Beide alten Pfade stehen in Lesezeichen,
   * alten E-Mails und Suchergebnissen und leiten deshalb dauerhaft dorthin
   * weiter — hier in der Konfiguration statt als Seite mit `redirect()`, weil
   * nur so ein echter 308 herauskommt und nicht eine gerenderte Seite mit
   * Meta-Refresh.
   *
   * Der Pfad steht bewusst wörtlich da: `next.config` wird außerhalb des
   * Anwendungs-Bundles ausgewertet und kennt den `@/`-Alias nicht.
   */
  async redirects() {
    return [
      { source: "/register", destination: "/mitglied-werden", permanent: true },
      {
        source: "/dashboard/mitgliedschaft",
        destination: "/mitglied-werden",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
