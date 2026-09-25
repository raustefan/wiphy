/**
 * Ermittlung der Besucheradresse aus den Proxy-Headern.
 *
 * Eigene Datei ohne jede Abhängigkeit, weil an dieser Funktion die Rate Limits
 * *und* die Pseudonyme im Sicherheitsprotokoll hängen: sie soll ohne laufenden
 * Request und ohne Datenbank testbar sein.
 */

import { isIPv6 } from "node:net";

type HeaderBag = Pick<Headers, "get">;

/**
 * IPv6-Adressen zählen als ihr /64-Netz. Ein gewöhnlicher Anschluss bekommt ein
 * ganzes /64 zugeteilt und kann daraus beliebig viele Adressen ziehen — pro
 * Einzeladresse gezählt, stünde für jeden Versuch ein frischer Zähler bereit.
 * IPv4 (auch als `::ffff:1.2.3.4`) und Unlesbares bleiben unverändert.
 */
export function addressKey(ip: string): string {
  if (!isIPv6(ip) || ip.includes(".")) return ip;
  const [head, tail] = ip.split("%")[0].split("::");
  const left = head ? head.split(":") : [];
  const right = tail ? tail.split(":") : [];
  const groups =
    tail === undefined ? left : [...left, ...Array(8 - left.length - right.length).fill("0"), ...right];
  return `${groups.slice(0, 4).map((g) => parseInt(g, 16).toString(16)).join(":")}::/64`;
}

/**
 * Die Adresse, unter der ein Zugriff gezählt wird — oder `"unknown"`.
 *
 * Welcher Header gewinnt, ist eine Sicherheitsentscheidung und keine
 * Geschmacksfrage. nginx steht als einziger Vermittler direkt am Netz und setzt
 * beide Header selbst (siehe README, Abschnitt „nginx als Reverse Proxy“).
 * Damit wird alles überschrieben, was ein Client unter denselben Namen
 * mitschickt — und genau das ist nötig: unbekannte Request-Header reicht nginx
 * sonst unverändert an die Anwendung durch.
 *
 * `x-real-ip` hat deshalb Vorrang: den setzt der Proxy als einzelnen Wert, er
 * ist nicht zusammengesetzt und kann keine fremden Einträge enthalten.
 *
 * Bei `x-forwarded-for` wird der **letzte** Eintrag genommen, nicht der erste.
 * Die Liste wächst von links nach rechts, der letzte Eintrag stammt also vom
 * nächstgelegenen Vermittler — dem einzigen, dem wir trauen. Der erste Eintrag
 * ist der, den ein Angreifer selbst hineinschreiben kann; ihn zu benutzen hieße,
 * sich die Zählschlüssel vom Angreifer diktieren zu lassen.
 */
export function extractClientIp(headerBag: HeaderBag) {
  const realIp = headerBag.get("x-real-ip")?.trim();
  if (realIp) {
    return addressKey(realIp);
  }

  const forwardedFor = headerBag.get("x-forwarded-for");
  if (forwardedFor) {
    const hops = forwardedFor
      .split(",")
      .map((hop) => hop.trim())
      .filter((hop) => hop.length > 0);
    const nearest = hops[hops.length - 1];
    if (nearest) {
      return addressKey(nearest);
    }
  }

  // Kein verwertbarer Header. Alle solchen Zugriffe teilen sich denselben
  // Zählschlüssel — das begrenzt zu streng statt zu lax und ist damit die
  // richtige Richtung, sollte hinter dem Proxy aber nie vorkommen.
  return "unknown";
}
