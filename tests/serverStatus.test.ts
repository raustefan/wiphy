import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { cpuPercent, parseMemAvailable, readTail } from "../src/lib/server/serverStatus";

test("cpuPercent measures busy share between two samples", () => {
  assert.equal(cpuPercent({ idle: 100, total: 200 }, { idle: 150, total: 400 }), 75);
  assert.equal(cpuPercent({ idle: 100, total: 200 }, { idle: 100, total: 200 }), 0);
});

test("parseMemAvailable reads MemAvailable, not MemFree", () => {
  const meminfo = "MemTotal:        4000000 kB\nMemFree:          100000 kB\nMemAvailable:    2000000 kB\n";
  assert.equal(parseMemAvailable(meminfo), 2000000 * 1024);
  assert.equal(parseMemAvailable(""), null);
});

test("readTail returns the end of a file without the cut-off first line", async () => {
  const file = path.join(await mkdtemp(path.join(os.tmpdir(), "tail-")), "app.log");
  await writeFile(file, "first line\nsecond\nthird\n");
  assert.equal(await readTail(file, 10), "third\n");
  assert.equal(await readTail(file, 1000), "first line\nsecond\nthird\n");
});
