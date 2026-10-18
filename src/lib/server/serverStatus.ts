import os from "node:os";
import path from "node:path";
import { execFile, spawn } from "node:child_process";
import { open, readFile, stat, unlink, writeFile } from "node:fs/promises";
import { AppError } from "@/lib/server/errors";

/**
 * Auslastung des Servers und Deploy per Knopfdruck für das Admin-Dashboard.
 *
 * Einen Verlauf speichert der Server nicht: das Dashboard fragt alle paar
 * Sekunden nach und sammelt die Messpunkte selbst, solange die Seite offen ist.
 */

/* ------------------------------------------------------------------ *
 * Auslastung                                                          *
 * ------------------------------------------------------------------ */

export type CpuTimes = { idle: number; total: number };

export function cpuTimes(cpus: os.CpuInfo[] = os.cpus()): CpuTimes {
  let idle = 0;
  let total = 0;
  for (const cpu of cpus) {
    idle += cpu.times.idle;
    total += cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.irq + cpu.times.idle;
  }
  return { idle, total };
}

/** CPU-Auslastung in Prozent zwischen zwei Messungen, über alle Kerne. */
export function cpuPercent(previous: CpuTimes, next: CpuTimes): number {
  const total = next.total - previous.total;
  if (total <= 0) return 0;
  const busy = 1 - (next.idle - previous.idle) / total;
  return Math.min(100, Math.max(0, Math.round(busy * 100)));
}

/**
 * `MemAvailable` aus `/proc/meminfo` in Bytes. `os.freemem()` zählt unter
 * Linux den Seitencache als belegt, und der Server sähe dauerhaft fast voll aus.
 */
export function parseMemAvailable(meminfo: string): number | null {
  const match = /^MemAvailable:\s+(\d+)\s+kB/m.exec(meminfo);
  return match ? Number(match[1]) * 1024 : null;
}

export type SystemStats = {
  at: number;
  cpuPercent: number;
  cores: number;
  /** 1-, 5- und 15-Minuten-Mittel der Systemlast. */
  load: [number, number, number];
  memTotal: number;
  memUsed: number;
  /** Speicher des Next-Prozesses selbst. */
  appRss: number;
  uptimeSeconds: number;
};

// Bezugspunkt der CPU-Messung: jede Abfrage misst die Zeit seit der vorigen.
let lastCpu = cpuTimes();
let lastCpuAt = Date.now();
/** Kürzere Messfenster zeigen nur Rauschen — die erste Abfrage nach dem Start käme sonst auf 100 %. */
const MIN_CPU_WINDOW_MS = 500;

export async function getSystemStats(): Promise<SystemStats> {
  const elapsed = Date.now() - lastCpuAt;
  if (elapsed < MIN_CPU_WINDOW_MS) {
    await new Promise((resolve) => setTimeout(resolve, MIN_CPU_WINDOW_MS - elapsed));
  }
  const nextCpu = cpuTimes();
  lastCpuAt = Date.now();
  const cpu = cpuPercent(lastCpu, nextCpu);
  lastCpu = nextCpu;

  const memTotal = os.totalmem();
  const meminfo = await readFile("/proc/meminfo", "utf8").catch(() => "");
  const available = parseMemAvailable(meminfo) ?? os.freemem();
  const [load1, load5, load15] = os.loadavg();

  return {
    at: Date.now(),
    cpuPercent: cpu,
    cores: os.cpus().length,
    load: [load1, load5, load15],
    memTotal,
    memUsed: memTotal - available,
    appRss: process.memoryUsage().rss,
    uptimeSeconds: Math.round(os.uptime()),
  };
}

/* ------------------------------------------------------------------ *
 * PM2-Logs                                                            *
 * ------------------------------------------------------------------ */

/** Pro Log und Abfrage — die Seite fragt jede Sekunde, also knapp halten. */
const APP_LOG_TAIL_BYTES = 16 * 1024;

function stripAnsi(text: string) {
  return text.replace(/\x1b\[[0-9;]*[A-Za-z]/g, "");
}

/**
 * Das Ende einer Datei, ohne sie ganz zu lesen: PM2-Logs wachsen ohne
 * `pm2-logrotate` unbegrenzt. Die erste, angeschnittene Zeile fällt weg.
 */
export async function readTail(file: string, bytes: number): Promise<string> {
  const handle = await open(file, "r");
  try {
    const { size } = await handle.stat();
    const length = Math.min(size, bytes);
    const buffer = Buffer.alloc(length);
    await handle.read(buffer, 0, length, size - length);
    const text = buffer.toString("utf8");
    return length < size ? text.slice(text.indexOf("\n") + 1) : text;
  } finally {
    await handle.close();
  }
}

export type AppLogs = {
  /** false, wenn die Website nicht unter PM2 läuft (z. B. lokal). */
  available: boolean;
  out: string;
  err: string;
};

/**
 * Die letzten Zeilen aus `pm2 logs wiphy`. PM2 gibt jedem Prozess die Pfade
 * seiner Logdateien als Umgebungsvariablen mit — kein Raten in `~/.pm2/logs`.
 */
export async function getAppLogs(): Promise<AppLogs> {
  const outPath = process.env.pm_out_log_path;
  const errPath = process.env.pm_err_log_path;
  const read = async (file: string | undefined) =>
    file ? stripAnsi(await readTail(file, APP_LOG_TAIL_BYTES).catch(() => "")).trimEnd() : "";
  const [out, err] = await Promise.all([read(outPath), read(errPath)]);
  return { available: Boolean(outPath || errPath), out, err };
}

/* ------------------------------------------------------------------ *
 * Deploy                                                              *
 * ------------------------------------------------------------------ */

const ROOT = process.cwd();
const DEPLOY_SCRIPT = path.join(ROOT, "deploy.sh");
const DEPLOY_LOG = path.join(ROOT, ".deploy.log");
const DEPLOY_LOCK = path.join(ROOT, ".deploy.lock");
const EXIT_MARKER = "__DEPLOY_EXIT__";
const LOG_TAIL_CHARS = 20_000;

/**
 * Nur diese Variablen bekommt `deploy.sh` mit. Die Umgebung des laufenden
 * Servers enthält u. a. `NODE_ENV=production` — damit ließe `pnpm install`
 * die devDependencies weg und der Build scheiterte.
 */
const DEPLOY_ENV_KEYS = ["PATH", "HOME", "USER", "LOGNAME", "SHELL", "LANG", "LC_ALL", "PM2_HOME", "NVM_DIR", "PNPM_HOME"];

function deployEnv() {
  const env: Record<string, string> = {};
  for (const key of DEPLOY_ENV_KEYS) {
    if (process.env[key] !== undefined) env[key] = process.env[key];
  }
  return env as NodeJS.ProcessEnv;
}

/** Ein Deploy startet `pnpm install` und `pm2 restart` — lokal hätte das nichts verloren. */
export function deployAvailable() {
  return process.env.NODE_ENV === "production";
}

async function deployRunning(): Promise<boolean> {
  let content: string;
  let mtimeMs: number;
  try {
    [content, { mtimeMs }] = await Promise.all([readFile(DEPLOY_LOCK, "utf8"), stat(DEPLOY_LOCK)]);
  } catch {
    return false;
  }

  const pid = Number(content.trim());
  // Leere Sperre: der Start läuft gerade, die PID steht gleich drin. Ist sie
  // nach einer Minute noch leer, ist der Start gescheitert.
  if (!pid) return Date.now() - mtimeMs < 60_000;

  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EPERM") return true;
    // Prozess weg, Sperre liegengeblieben (z. B. Server-Neustart mitten im Deploy).
    await unlink(DEPLOY_LOCK).catch(() => {});
    return false;
  }
}

export type DeployStatus = {
  available: boolean;
  running: boolean;
  /** Exit-Code des letzten abgeschlossenen Laufs, `null` wenn keiner vorliegt oder er noch läuft. */
  exitCode: number | null;
  log: string;
};

export async function getDeployStatus(): Promise<DeployStatus> {
  const [raw, running] = await Promise.all([
    readFile(DEPLOY_LOG, "utf8").catch(() => ""),
    deployRunning(),
  ]);

  const match = new RegExp(`${EXIT_MARKER} (\\d+)`).exec(raw);
  const log = stripAnsi(raw)
    .replace(new RegExp(`^${EXIT_MARKER} .*$`, "m"), "")
    .trimEnd();

  return {
    available: deployAvailable(),
    running,
    exitCode: match && !running ? Number(match[1]) : null,
    log: log.slice(-LOG_TAIL_CHARS),
  };
}

/**
 * Startet `deploy.sh` losgelöst vom Server-Prozess.
 *
 * Das Skript endet mit `pm2 restart wiphy` und beendet damit genau den Prozess,
 * der es gestartet hat — PM2 räumt dabei auch dessen Kindprozesse ab. Deshalb
 * startet `sh` das Skript im Hintergrund und beendet sich sofort: der Deploy
 * hängt danach an init statt an Next und überlebt den Neustart.
 */
export async function startDeploy(): Promise<void> {
  if (!deployAvailable()) {
    throw new AppError("FORBIDDEN", "Deploys sind nur auf dem Produktionsserver möglich.");
  }
  if (await deployRunning()) {
    throw new AppError("CONFLICT", "Es läuft bereits ein Deploy.");
  }

  // `wx` schlägt fehl, wenn die Datei schon existiert: zwei gleichzeitige
  // Klicks starten nicht zwei Deploys.
  try {
    await writeFile(DEPLOY_LOCK, "", { flag: "wx" });
  } catch {
    throw new AppError("CONFLICT", "Es läuft bereits ein Deploy.");
  }

  const startedAt = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
  await writeFile(DEPLOY_LOG, `Deploy gestartet am ${startedAt}\n\n`);

  const env = { ...deployEnv(), DEPLOY_SCRIPT, DEPLOY_LOG, DEPLOY_LOCK };

  const inner = `echo $$ > "$DEPLOY_LOCK"; bash "$DEPLOY_SCRIPT"; code=$?; echo; echo "${EXIT_MARKER} $code"; rm -f "$DEPLOY_LOCK"`;
  const child = spawn("sh", ["-c", `nohup bash -c '${inner}' >> "$DEPLOY_LOG" 2>&1 &`], {
    cwd: ROOT,
    env,
    detached: true,
    stdio: "ignore",
  });
  child.on("error", () => {
    void unlink(DEPLOY_LOCK).catch(() => {});
  });
  child.unref();
}

/* ------------------------------------------------------------------ *
 * Versionen                                                           *
 * ------------------------------------------------------------------ */

export type ToolVersion = {
  name: string;
  /** `null`, wenn das Werkzeug nicht gefunden wurde. */
  version: string | null;
  /** Vom Projekt festgelegte Version, falls es eine gibt. */
  expected?: string;
};

async function installedVersion(pkg: string): Promise<string | null> {
  const file = path.join(ROOT, "node_modules", pkg, "package.json");
  return readFile(file, "utf8").then((raw) => JSON.parse(raw).version as string, () => null);
}

/**
 * pnpm so, wie `deploy.sh` es aufruft: gleiche Umgebung, gleiches
 * Verzeichnis. Ab pnpm 9.7 ist das schon die Version aus `packageManager`.
 */
function pnpmVersion(): Promise<string | null> {
  return new Promise((resolve) => {
    execFile("pnpm", ["-v"], { cwd: ROOT, env: deployEnv(), timeout: 15_000 }, (error, stdout) =>
      resolve(error ? null : stdout.trim().split("\n").pop() || null),
    );
  });
}

export async function getVersions(): Promise<ToolVersion[]> {
  const pkg = JSON.parse(await readFile(path.join(ROOT, "package.json"), "utf8"));
  const expectedPnpm = /^pnpm@(.+)$/.exec(pkg.packageManager ?? "")?.[1];
  const [pnpm, next, react, prisma, client] = await Promise.all([
    pnpmVersion(),
    installedVersion("next"),
    installedVersion("react"),
    installedVersion("prisma"),
    installedVersion("@prisma/client"),
  ]);
  return [
    { name: "Node.js", version: process.versions.node },
    { name: "pnpm", version: pnpm, expected: expectedPnpm },
    { name: "Next.js", version: next },
    { name: "React", version: react },
    { name: "Prisma CLI", version: prisma },
    // Client und CLI müssen gleich sein, sonst passt der generierte Client nicht.
    { name: "Prisma Client", version: client, expected: prisma ?? undefined },
  ];
}

/* ------------------------------------------------------------------ *
 * Datenbank-Backup                                                    *
 * ------------------------------------------------------------------ */

/**
 * Die Verbindung aus `DATABASE_URL` als libpq-Variablen. So steht das
 * Passwort nicht in der Befehlszeile (sichtbar in `ps`), und Prismas
 * `?schema=public` fällt weg — `pg_dump` lehnt unbekannte URL-Parameter ab.
 */
export function pgEnv(databaseUrl: string): Record<string, string> {
  const url = new URL(databaseUrl);
  const env: Record<string, string> = {
    PGHOST: url.hostname,
    PGPORT: url.port || "5432",
    PGUSER: decodeURIComponent(url.username),
    PGPASSWORD: decodeURIComponent(url.password),
    PGDATABASE: decodeURIComponent(url.pathname.slice(1)),
  };
  const sslmode = url.searchParams.get("sslmode");
  if (sslmode) env.PGSSLMODE = sslmode;
  return env;
}

/**
 * Die ganze Datenbank als `pg_dump`-Archiv (Custom-Format), inklusive
 * Passwort-Hashes und `_prisma_migrations`. Ohne Eigentümer und Rechte, damit
 * es sich auch unter einem anderen Datenbanknutzer wiederherstellen lässt —
 * Anleitung im README unter „Backup & Wiederherstellung“.
 *
 * ponytail: ganz im Speicher, damit ein Fehler als Meldung statt als halbe
 * Datei ankommt. Bei einer Datenbank jenseits einiger hundert MB streamen.
 */
export function dumpDatabase(databaseUrl: string): Promise<Buffer> {
  const env: Record<string, string> = { PATH: process.env.PATH ?? "", ...pgEnv(databaseUrl) };
  return new Promise((resolve, reject) => {
    execFile(
      "pg_dump",
      ["--format=custom", "--no-owner", "--no-privileges"],
      {
        env: env as NodeJS.ProcessEnv,
        encoding: "buffer",
        maxBuffer: 1024 ** 3,
        timeout: 5 * 60_000,
      },
      (error, stdout, stderr) => {
        if (!error) return resolve(stdout);
        const notInstalled = (error as NodeJS.ErrnoException).code === "ENOENT";
        console.error("pg_dump failed:", notInstalled ? "not installed" : stderr.toString().trim());
        reject(
          new AppError(
            "INTERNAL_ERROR",
            notInstalled
              ? "pg_dump ist auf dem Server nicht installiert (Paket postgresql-client)."
              : "Das Backup konnte nicht erstellt werden. Details stehen im Fehler-Log.",
          ),
        );
      },
    );
  });
}
