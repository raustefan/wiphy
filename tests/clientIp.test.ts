import assert from "node:assert/strict";
import test from "node:test";
import { extractClientIp } from "../src/lib/server/clientIp";

/** Minimaler Header-Beutel, wie ihn `Request.headers` liefert. */
function headers(values: Record<string, string>) {
  const lower = new Map(Object.entries(values).map(([k, v]) => [k.toLowerCase(), v]));
  return { get: (name: string) => lower.get(name.toLowerCase()) ?? null };
}

test("x-real-ip wins over x-forwarded-for", () => {
  const ip = extractClientIp(
    headers({ "x-real-ip": "203.0.113.7", "x-forwarded-for": "198.51.100.1" }),
  );
  assert.equal(ip, "203.0.113.7");
});

test("a forged first x-forwarded-for entry is ignored in favour of the nearest hop", () => {
  // Was ein Angreifer selbst schickt, landet links; der Proxy hängt die echte
  // Adresse rechts an. Würde der erste Eintrag gewinnen, könnte er sich mit
  // jeder Anfrage einen frischen Rate-Limit-Zähler aussuchen.
  const ip = extractClientIp(headers({ "x-forwarded-for": "127.0.0.1, 203.0.113.7" }));
  assert.equal(ip, "203.0.113.7");
});

test("a single x-forwarded-for entry is used as is", () => {
  assert.equal(extractClientIp(headers({ "x-forwarded-for": "203.0.113.7" })), "203.0.113.7");
});

test("whitespace and empty entries do not produce an empty key", () => {
  assert.equal(extractClientIp(headers({ "x-forwarded-for": "203.0.113.7 , " })), "203.0.113.7");
});

test("without any proxy header the address stays unknown", () => {
  assert.equal(extractClientIp(headers({})), "unknown");
});
