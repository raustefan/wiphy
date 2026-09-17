import assert from "node:assert/strict";
import test from "node:test";
import { blogPostPath, idFromSegment, slugify, slugSegment } from "../src/lib/slug";

const ID = "cmtsmpqwa0004pw05w0af328p";

test("titles become lowercase ASCII with German letters spelled out", () => {
  assert.equal(slugify("Jubiläumsfeier: 20 Jahre Wirtschaftsphysik!"), "jubilaeumsfeier-20-jahre-wirtschaftsphysik");
  assert.equal(slugify("Größe & Straße"), "groesse-strasse");
  assert.equal(slugify("Café Crème"), "cafe-creme");
  assert.equal(slugify("  --Test--  "), "test");
});

test("long titles are cut at a word boundary", () => {
  const slug = slugify("Ein sehr langer Titel ".repeat(6));
  assert.ok(slug.length <= 60);
  // „titel“ passte nicht mehr ganz hinein und fällt weg, statt halbiert zu werden.
  assert.equal(slug, "ein-sehr-langer-titel-ein-sehr-langer-titel-ein-sehr-langer");
});

test("the id is always recoverable from the segment", () => {
  assert.equal(idFromSegment(slugSegment({ id: ID, title: "Vereinsfeier 2024" })), ID);
  assert.equal(idFromSegment(ID), ID);
  assert.equal(idFromSegment(slugSegment({ id: ID, title: "!!!" })), ID);
});

test("a title without usable characters falls back to the bare id", () => {
  assert.equal(slugSegment({ id: ID, title: "???" }), ID);
  assert.equal(blogPostPath({ id: ID, title: "Vereinsfeier 2024" }), `/blog/vereinsfeier-2024-${ID}`);
});
