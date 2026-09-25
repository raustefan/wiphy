import assert from "node:assert/strict";
import test from "node:test";
import { evaluatePassword, generatePassword, PASSWORD_MIN_LENGTH } from "../src/lib/passwordStrength";

/**
 * Der Balken im Registrierungsformular soll die Wahl lenken, nicht nur bunt
 * sein. Geprüft wird deshalb vor allem, dass er in genau den Fällen *nicht*
 * grün wird, in denen ein Wörterbuchangriff sofort durchkäme.
 */

test("zu kurz ist immer Stufe 0", () => {
  assert.equal(evaluatePassword("Ab1!").score, 0);
  assert.equal(evaluatePassword("A".repeat(PASSWORD_MIN_LENGTH - 1)).score, 0);
});

test("leeres Feld meldet keine unerfüllten Kriterien als erfüllt", () => {
  const { score, criteria } = evaluatePassword("");
  assert.equal(score, 0);
  assert.deepEqual(
    criteria.map((criterion) => criterion.met),
    [false, false, false, false],
  );
});

test("Länge zählt auch ohne Sonderzeichen", () => {
  // Vier Wörter, nur Kleinbuchstaben — kostet mehr Versuche als „Aa1!xyzq“.
  assert.ok(evaluatePassword("gartenzaunblauwolke").score >= 3);
});

test("alle Zeichenklassen bei großer Länge ergeben die Höchststufe", () => {
  assert.equal(evaluatePassword("Korrekt-Pferd7Batterie!").score, 4);
});

test("Wörterbuchmuster deckeln die Bewertung", () => {
  // Erfüllt alle vier Kriterien und wäre ohne Deckel „sehr stark“.
  assert.ok(evaluatePassword("Passwort2024!").score <= 1);
  assert.ok(evaluatePassword("Qwertz123!xyz").score <= 1);
});

test("aufgefüllte Wiederholungen kommen nicht über die Mitte hinaus", () => {
  assert.ok(evaluatePassword("Ab1!aaaaaaaaaa").score <= 2);
});

test("Kriterien spiegeln die tatsächlich verwendeten Zeichen", () => {
  const criteria = Object.fromEntries(
    evaluatePassword("abcdefgh1").criteria.map((c) => [c.id, c.met]),
  );
  assert.deepEqual(criteria, { length: true, case: false, digit: true, symbol: false });
});

test("Umlaute gelten als Buchstaben, nicht als Sonderzeichen", () => {
  const criteria = Object.fromEntries(
    evaluatePassword("Ärgerlich9").criteria.map((c) => [c.id, c.met]),
  );
  assert.equal(criteria.case, true);
  assert.equal(criteria.symbol, false);
});

test("generated passwords are always rated very strong and differ", () => {
  const a = generatePassword();
  assert.equal(evaluatePassword(a).score, 4);
  assert.equal(a.length, 20);
  assert.notEqual(a, generatePassword());
});
