import assert from "node:assert/strict";
import test from "node:test";
import { describeRateLimit } from "../src/lib/rateLimits";

test("die Grenze im Erklärtext kommt aus den Zahlen der Tabelle", () => {
  assert.equal(
    describeRateLimit("contact-ip"),
    "Kontaktformular-Anfragen pro IP-Adresse. Grenze: 3 pro Stunde, danach 6 Stunden gesperrt.",
  );
  assert.match(describeRateLimit("login-account"), /Grenze: 50 pro Stunde, danach 15 Minuten gesperrt\.$/);
  assert.match(describeRateLimit("contact-email"), /Grenze: 3 pro Tag, danach 1 Tag gesperrt\.$/);
  assert.match(describeRateLimit("login"), /Grenze: 5 pro 10 Minuten, danach 10 Minuten gesperrt\.$/);
});

test("unbekannte oder geerbte Bucket-Namen fallen auf den Hinweistext zurück", () => {
  assert.equal(describeRateLimit("gibt-es-nicht"), "Keine Beschreibung für dieses Rate Limit hinterlegt.");
  assert.equal(describeRateLimit("toString"), "Keine Beschreibung für dieses Rate Limit hinterlegt.");
});
