import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { readFile, stat, unlink, writeFile } from "node:fs/promises";
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
  const log = raw
    .replace(new RegExp(`^${EXIT_MARKER} .*$`, "m"), "")
    .replace(/\x1b\[[0-9;]*[A-Za-z]/g, "")
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

  const env: Record<string, string | undefined> = { DEPLOY_SCRIPT, DEPLOY_LOG, DEPLOY_LOCK };
  for (const key of DEPLOY_ENV_KEYS) {
    if (process.env[key] !== undefined) env[key] = process.env[key];
  }

  const inner = `echo $$ > "$DEPLOY_LOCK"; bash "$DEPLOY_SCRIPT"; code=$?; echo; echo "${EXIT_MARKER} $code"; rm -f "$DEPLOY_LOCK"`;
  const child = spawn("sh", ["-c", `nohup bash -c '${inner}' >> "$DEPLOY_LOG" 2>&1 &`], {
    cwd: ROOT,
    env: env as NodeJS.ProcessEnv,
    detached: true,
    stdio: "ignore",
  });
  child.on("error", () => {
    void unlink(DEPLOY_LOCK).catch(() => {});
  });
  child.unref();
}
