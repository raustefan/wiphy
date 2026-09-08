import assert from "node:assert/strict";
import test from "node:test";
import { formatBytes, moveInOrder } from "../src/lib/blogImages";

test("ein weiteres Bild tauscht mit seinem Nachbarn", () => {
  assert.deepEqual(moveInOrder(["a", "b", "c"], "c", "up"), ["a", "c", "b"]);
  assert.deepEqual(moveInOrder(["a", "b", "c"], "b", "down"), ["a", "c", "b"]);
});

test("mit gesperrter erster Position bleibt das Titelbild vorn", () => {
  // Ohne die Sperre würde ein Klick auf „nach vorne“ beim zweiten Bild das
  // Titelbild verdrängen — die Wahl des Titelbilds soll aber eine eigene
  // Entscheidung bleiben.
  assert.deepEqual(moveInOrder(["cover", "b", "c"], "b", "up", { lockFirst: true }), [
    "cover",
    "b",
    "c",
  ]);
  assert.deepEqual(moveInOrder(["cover", "b", "c"], "cover", "down", { lockFirst: true }), [
    "cover",
    "b",
    "c",
  ]);
});

test("Bewegungen über die Ränder hinaus ändern nichts", () => {
  assert.deepEqual(moveInOrder(["a", "b"], "a", "up"), ["a", "b"]);
  assert.deepEqual(moveInOrder(["a", "b"], "b", "down"), ["a", "b"]);
  assert.deepEqual(moveInOrder(["a", "b"], "unbekannt", "down"), ["a", "b"]);
});

test("Dateigrößen erscheinen in der Einheit, die zur Zahl passt", () => {
  assert.equal(formatBytes(512), "512 B");
  assert.equal(formatBytes(214 * 1024), "214 KB");
  assert.equal(formatBytes(2 * 1024 * 1024), "2,0 MB");
});
