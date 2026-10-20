import assert from "node:assert/strict";
import test from "node:test";
import { overlaps, packLanes, type KosmosMember } from "../src/lib/kosmos";

const m = (id: string, start: number, end: number | null): KosmosMember => ({ id, name: id, degreeProgram: null, start, end });
const NOW = 2026.8;

test("Überlappung: angrenzende Zeiträume zählen nicht, laufende Studien reichen bis heute", () => {
  assert.equal(overlaps(m("a", 2008, 2012), m("b", 2011, 2015), NOW), true);
  assert.equal(overlaps(m("a", 2008, 2012), m("b", 2012, 2015), NOW), false);
  assert.equal(overlaps(m("a", 2020, null), m("b", 2025, null), NOW), true);
});

test("Bahnen: kein Streifen liegt samt Abstand über einem anderen derselben Bahn", () => {
  const spans: Array<[number, number]> = [[2008, 2012], [2009, 2014], [2013, 2018], [2012.5, NOW]];
  const { lane, count } = packLanes(spans, 1);
  assert.deepEqual(lane, [0, 1, 0, 2]);
  assert.equal(count, 3);
});
