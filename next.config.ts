import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  /**
   * Handy-Test im WLAN: Next blockiert Dev-Anfragen von fremden Hostnamen.
   * Die Seite lädt dann zwar, React startet aber nie — Links gehen, Knöpfe
   * nicht. Nur für `next dev` relevant.
   */
  allowedDevOrigins: ["192.168.178.196", "MacBook-Pro-4.local"],

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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Reset-/Bestätigungslinks tragen ihr Token in der URL — nie an Dritte weiterreichen.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          // ponytail: kein script-src — Next- und Theme-Inline-Skripte bräuchten Nonces
          // (Middleware, alle Seiten dynamisch). Nachziehen, wenn XSS-Härtung ansteht.
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
          },
        ],
      },
    ];
  },

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
