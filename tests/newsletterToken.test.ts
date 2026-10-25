import assert from "node:assert/strict";
import test from "node:test";
import { createNewsletterToken, verifyNewsletterToken } from "../src/lib/server/newsletterToken";

// Der Schlüssel wird erst beim Aufruf gelesen.
process.env.NEXTAUTH_SECRET = "test-secret";

// Der Abmeldelink ist die einzige Berechtigung ohne Login — er darf nur für
// genau das Konto gelten, für das er ausgestellt wurde.
test("newsletter token only verifies for its own, untampered user id", () => {
  const token = createNewsletterToken("cmabc123");
  assert.equal(verifyNewsletterToken(token), "cmabc123");

  const [, signature] = token.split(".");
  assert.equal(verifyNewsletterToken(`cmabc124.${signature}`), null, "fremde ID mit fremder Signatur");
  assert.equal(verifyNewsletterToken(`${token}x`), null, "angehängtes Zeichen");
  assert.equal(verifyNewsletterToken(`${token}!`), null, "Zeichen, das base64url überlesen würde");
  assert.equal(verifyNewsletterToken(`${token}.x`), null, "zusätzlicher Abschnitt");
  assert.equal(verifyNewsletterToken("cmabc123"), null, "ohne Signatur");
  assert.equal(verifyNewsletterToken(null), null);

  process.env.NEXTAUTH_SECRET = "other-secret";
  assert.equal(verifyNewsletterToken(token), null, "anderes Server-Secret");
  process.env.NEXTAUTH_SECRET = "test-secret";
});
