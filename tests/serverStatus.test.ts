import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { cpuPercent, parseBackupLog, parseMemAvailable, pgEnv, readTail } from "../src/lib/server/serverStatus";

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

test("pgEnv turns Prisma's DATABASE_URL into libpq variables without ?schema", () => {
  assert.deepEqual(pgEnv("postgresql://wiphy%40admin:p%40ss%2Fword@db.local:6543/wiphy?schema=public&sslmode=require"), {
    PGHOST: "db.local",
    PGPORT: "6543",
    PGUSER: "wiphy@admin",
    PGPASSWORD: "p@ss/word",
    PGDATABASE: "wiphy",
    PGSSLMODE: "require",
  });
  assert.equal(pgEnv("postgresql://u:p@localhost/wiphy?schema=public").PGPORT, "5432");
});

test("parseBackupLog reads backup.sh lines newest first and marks deleted dumps", () => {
  const log = [
    "2026-10-21T03:30:01+00:00\tok\twiphy-backup-2026-10-21-03-30.dump\t2408470",
    "2026-10-22T03:30:01+00:00\tfail\tpg_dump: error: connection failed",
    "garbage",
    "2026-10-23T03:30:01+00:00\tok\twiphy-backup-2026-10-23-03-30.dump\t2500000",
    "",
  ].join("\n");
  assert.deepEqual(parseBackupLog(log, new Set(["wiphy-backup-2026-10-23-03-30.dump"])), [
    { at: "2026-10-23T03:30:01+00:00", ok: true, file: "wiphy-backup-2026-10-23-03-30.dump", bytes: 2500000, kept: true },
    { at: "2026-10-22T03:30:01+00:00", ok: false, error: "pg_dump: error: connection failed" },
    { at: "2026-10-21T03:30:01+00:00", ok: true, file: "wiphy-backup-2026-10-21-03-30.dump", bytes: 2408470, kept: false },
  ]);
});
