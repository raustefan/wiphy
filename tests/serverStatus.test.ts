import assert from "node:assert/strict";
import test from "node:test";
import { cpuPercent, parseMemAvailable } from "../src/lib/server/serverStatus";

test("cpuPercent measures busy share between two samples", () => {
  assert.equal(cpuPercent({ idle: 100, total: 200 }, { idle: 150, total: 400 }), 75);
  assert.equal(cpuPercent({ idle: 100, total: 200 }, { idle: 100, total: 200 }), 0);
});

test("parseMemAvailable reads MemAvailable, not MemFree", () => {
  const meminfo = "MemTotal:        4000000 kB\nMemFree:          100000 kB\nMemAvailable:    2000000 kB\n";
  assert.equal(parseMemAvailable(meminfo), 2000000 * 1024);
  assert.equal(parseMemAvailable(""), null);
});
