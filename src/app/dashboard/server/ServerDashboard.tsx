"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Download, Loader2, Mail, Rocket, WifiOff, XCircle } from "lucide-react";
import { PasswordInput } from "@/components/PasswordField";
import { Badge, Button, Callout, Card, Dialog, DialogFooter, Field, SectionTitle } from "@/components/ui";
import { useActionForm } from "@/lib/client/useActionForm";
import { formatNumber } from "@/lib/format";
import type { AppLogs, DeployStatus, SystemStats } from "@/lib/server/serverStatus";
import { requestBackupLink, triggerDeploy } from "./actions";
import { UsageChart, type UsagePoint } from "./UsageChart";

const INTERVAL_SECONDS = 1;
/** Während eines Deploys öfter nachsehen, damit das Log mitläuft. */
const DEPLOY_INTERVAL_SECONDS = 1;
/** Zehn Minuten Verlauf bei einer Messung alle fünf Sekunden. */
const SLOTS = 120;

type Sample = { at: number; cpu: number; mem: number; stats: SystemStats };

function formatBytes(bytes: number) {
  const gb = bytes / 1024 ** 3;
  return gb >= 1 ? `${formatNumber(Math.round(gb * 10) / 10)} GB` : `${formatNumber(Math.round(bytes / 1024 ** 2))} MB`;
}

function formatUptime(seconds: number) {
  const days = Math.floor(seconds / 86_400);
  const hours = Math.floor((seconds % 86_400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return days > 0 ? `${days} T ${hours} Std.` : `${hours} Std. ${minutes} Min.`;
}

function timeLabel(at: number) {
  return new Date(at).toLocaleTimeString("de-DE", { timeZone: "Europe/Berlin" });
}

export function ServerDashboard() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [deploy, setDeploy] = useState<DeployStatus | null>(null);
  const [logs, setLogs] = useState<AppLogs | null>(null);
  const [offline, setOffline] = useState(false);

  const poll = useCallback(async () => {
    try {
      const response = await fetch("/api/dashboard/server", { cache: "no-store" });
      if (!response.ok) throw new Error(String(response.status));
      const data = (await response.json()) as { stats: SystemStats; deploy: DeployStatus; logs: AppLogs };
      const { stats } = data;
      setSamples((previous) =>
        [
          ...previous,
          { at: stats.at, cpu: stats.cpuPercent, mem: Math.round((stats.memUsed / stats.memTotal) * 100), stats },
        ].slice(-SLOTS),
      );
      setDeploy(data.deploy);
      setLogs(data.logs);
      setOffline(false);
    } catch {
      // Beim `pm2 restart` ist der Server ein paar Sekunden weg — normal.
      setOffline(true);
    }
  }, []);

  const running = deploy?.running ?? false;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- poll() setzt den State erst nach dem await
    void poll();
    const id = setInterval(() => void poll(), (running ? DEPLOY_INTERVAL_SECONDS : INTERVAL_SECONDS) * 1000);
    return () => clearInterval(id);
  }, [poll, running]);

  const latest = samples.at(-1)?.stats;
  const cpuPoints: UsagePoint[] = samples.map((sample) => ({
    at: sample.at,
    value: sample.cpu,
    detail: `${timeLabel(sample.at)}: ${sample.cpu} % CPU`,
  }));
  const memPoints: UsagePoint[] = samples.map((sample) => ({
    at: sample.at,
    value: sample.mem,
    detail: `${timeLabel(sample.at)}: ${sample.mem} % RAM (${formatBytes(sample.stats.memUsed)})`,
  }));

  return (
    <div className="grid gap-8">
      {offline && (
        <Callout tone="warning" icon={<WifiOff size={16} />} title="Server nicht erreichbar">
          Während eines Deploys startet der Server kurz neu. Die Seite versucht es weiter
          automatisch.
        </Callout>
      )}

      <section className="grid gap-4">
        <SectionTitle>Auslastung</SectionTitle>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-sm font-semibold">CPU</h3>
              <span className="text-2xl font-semibold tracking-tight">
                {latest ? `${latest.cpuPercent} %` : "–"}
              </span>
            </div>
            <p className="mb-3 text-xs text-muted">
              {latest
                ? `${latest.cores} Kerne · Last ${latest.load.map((value) => formatNumber(Math.round(value * 100) / 100)).join(" / ")} (1 / 5 / 15 Min.)`
                : "Messung läuft …"}
            </p>
            <UsageChart label="CPU-Auslastung" points={cpuPoints} slots={SLOTS} intervalSeconds={INTERVAL_SECONDS} />
          </Card>

          <Card className="p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-sm font-semibold">Arbeitsspeicher</h3>
              <span className="text-2xl font-semibold tracking-tight">
                {latest ? `${samples.at(-1)?.mem} %` : "–"}
              </span>
            </div>
            <p className="mb-3 text-xs text-muted">
              {latest
                ? `${formatBytes(latest.memUsed)} von ${formatBytes(latest.memTotal)} belegt · davon Website ${formatBytes(latest.appRss)}`
                : "Messung läuft …"}
            </p>
            <UsageChart label="RAM-Auslastung" points={memPoints} slots={SLOTS} intervalSeconds={INTERVAL_SECONDS} />
          </Card>
        </div>
        <p className="text-xs text-faint">
          Messung alle {INTERVAL_SECONDS} Sekunden, solange diese Seite offen ist. Einen Verlauf
          darüber hinaus speichert der Server nicht.
          {latest && ` Laufzeit seit dem letzten Neustart: ${formatUptime(latest.uptimeSeconds)}`}
        </p>
      </section>

      <LogsSection logs={logs} />

      <DeploySection deploy={deploy} onStarted={poll} />

      <BackupSection />
    </div>
  );
}

function LogsSection({ logs }: { logs: AppLogs | null }) {
  const [stream, setStream] = useState<"out" | "err">("out");
  const logRef = useRef<HTMLPreElement>(null);
  const text = logs?.[stream] ?? "";

  // Unten mitlaufen wie `pm2 logs` — aber nicht, wenn gerade weiter oben gelesen wird.
  const stickRef = useRef(true);
  useEffect(() => {
    const el = logRef.current;
    if (el && stickRef.current) el.scrollTop = el.scrollHeight;
  }, [text]);

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionTitle>Logs</SectionTitle>
        {logs?.available && (
          <div className="flex gap-1">
            {(
              [
                ["out", "Ausgabe"],
                ["err", "Fehler"],
              ] as const
            ).map(([key, label]) => (
              <Button
                key={key}
                type="button"
                size="sm"
                variant={stream === key ? "soft" : "ghost"}
                color={key === "err" ? "danger" : "neutral"}
                aria-pressed={stream === key}
                onClick={() => {
                  stickRef.current = true;
                  setStream(key);
                }}
              >
                {label}
              </Button>
            ))}
          </div>
        )}
      </div>

      <Card className="grid gap-3 p-5">
        {logs && !logs.available ? (
          <p className="text-sm text-muted">Die Website läuft hier nicht unter PM2 — Logs gibt es nur auf dem Server.</p>
        ) : (
          <>
            <p className="text-xs text-muted">
              Die letzten Zeilen von <code>pm2 logs wiphy</code>, live.
            </p>
            <pre
              ref={logRef}
              onScroll={(e) => {
                const el = e.currentTarget;
                stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 24;
              }}
              className="max-h-96 min-h-24 overflow-auto rounded-[3px] border border-line bg-raised p-4 text-xs leading-relaxed whitespace-pre-wrap"
            >
              {text || (logs ? "Leer." : "Wird geladen …")}
            </pre>
          </>
        )}
      </Card>
    </section>
  );
}

function DeploySection({ deploy, onStarted }: { deploy: DeployStatus | null; onStarted: () => Promise<void> }) {
  const [confirming, setConfirming] = useState(false);
  const logRef = useRef<HTMLPreElement>(null);
  const form = useActionForm(triggerDeploy, {
    onSuccess: () => {
      setConfirming(false);
      void onStarted();
    },
  });

  // Das Log folgt der letzten Zeile, wie im Terminal.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [deploy?.log]);

  const running = deploy?.running ?? false;

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionTitle>Deploy</SectionTitle>
        <DeployBadge deploy={deploy} />
      </div>

      <Card className="grid gap-4 p-5">
        <p className="text-sm text-muted text-pretty">
          Führt <code>deploy.sh</code> aus: neuesten Stand von Git holen, Abhängigkeiten
          installieren, Datenbankschema abgleichen, neu bauen und die Website neu starten.
        </p>

        {deploy && !deploy.available && (
          <Callout tone="info">Deploys sind nur auf dem Produktionsserver möglich.</Callout>
        )}

        <Button
          type="button"
          color="danger"
          className="justify-self-start"
          disabled={!deploy?.available || running}
          loading={running}
          onClick={() => setConfirming(true)}
        >
          <Rocket size={16} aria-hidden="true" />
          {running ? "Deploy läuft …" : "Deploy starten"}
        </Button>

        {deploy?.log && (
          <pre
            ref={logRef}
            className="max-h-96 overflow-auto rounded-[3px] border border-line bg-raised p-4 text-xs leading-relaxed whitespace-pre-wrap"
          >
            {deploy.log}
          </pre>
        )}
      </Card>

      <Dialog
        open={confirming}
        onClose={() => setConfirming(false)}
        title="Deploy wirklich starten?"
        description="Die Website wird neu gebaut und neu gestartet."
      >
        <div className="grid gap-3 text-sm">
          <Callout tone="warning" icon={<AlertTriangle size={16} />}>
            Während des Builds ist die Website für einige Minuten langsam und beim Neustart kurz
            nicht erreichbar. Schlägt der Build fehl, kann sie ausfallen, bis jemand auf dem
            Server nachsieht.
          </Callout>
          <p className="text-muted">
            Deployed wird der aktuelle Stand des <code>main</code>-Branches. Starte den Deploy nur,
            wenn du weißt, was sich seit dem letzten Mal geändert hat.
          </p>
          {form.feedback}
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="soft"
            color="neutral"
            onClick={() => setConfirming(false)}
            disabled={form.pending}
          >
            Abbrechen
          </Button>
          <Button type="button" color="danger" onClick={() => void form.run()} loading={form.pending}>
            Jetzt deployen
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  );
}

function BackupSection() {
  const [confirming, setConfirming] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const form = useActionForm(requestBackupLink, {
    onSuccess: (data) => {
      setConfirming(false);
      setSentTo(data?.sentTo ?? null);
    },
  });

  return (
    <section className="grid gap-4">
      <SectionTitle>Backup</SectionTitle>

      <Card className="grid gap-4 p-5">
        <p className="text-sm text-muted text-pretty">
          Die komplette Datenbank als <code>pg_dump</code>-Archiv — alle Mitglieder, Bankdaten,
          Passwort-Hashes, Bilder und Nachrichten. Nach der Passwortabfrage kommt ein kurz gültiger
          Einmal-Link per E-Mail. Wiederherstellen lässt sich das Archiv auf der Konsole mit{" "}
          <code>pg_restore</code> (siehe README).
        </p>

        {sentTo && (
          <Callout tone="success" icon={<Mail size={16} />} title="Link verschickt">
            Der Download-Link ist unterwegs an {sentTo}. Öffne ihn in diesem Browser, solange du
            angemeldet bist.
          </Callout>
        )}

        <Button
          type="button"
          color="danger"
          className="justify-self-start"
          onClick={() => setConfirming(true)}
        >
          <Download size={16} aria-hidden="true" />
          Backup anfordern
        </Button>
      </Card>

      <Dialog
        open={confirming}
        onClose={() => setConfirming(false)}
        title="Komplettes Backup anfordern?"
        description="Bitte bestätige mit deinem Passwort. Der Link kommt per E-Mail."
      >
        <form action={form.submit}>
          <div className="grid gap-3 text-sm">
            <Callout tone="warning" icon={<AlertTriangle size={16} />} title="Datenschutz (DSGVO)">
              Die Datei enthält alle personenbezogenen Daten des Vereins. Speichere sie nur
              verschlüsselt, gib sie nicht weiter und lösche sie, sobald du sie nicht mehr brauchst
              — spätestens nach 14 Tagen. Wer im Verein gelöscht wird, steckt sonst weiter in deiner
              Kopie (Art. 5 Abs. 1 lit. e und Art. 17 DSGVO).
            </Callout>
            <Field label="Passwort" htmlFor="backup-password" required>
              <PasswordInput id="backup-password" name="password" autoComplete="current-password" required />
            </Field>
            {form.feedback}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="soft"
              color="neutral"
              onClick={() => setConfirming(false)}
              disabled={form.pending}
            >
              Abbrechen
            </Button>
            <Button type="submit" color="danger" loading={form.pending}>
              Link senden
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </section>
  );
}

function DeployBadge({ deploy }: { deploy: DeployStatus | null }) {
  if (!deploy) return null;
  if (deploy.running) {
    return (
      <Badge tone="info">
        <Loader2 size={12} className="animate-spin" aria-hidden="true" /> Läuft
      </Badge>
    );
  }
  if (deploy.exitCode === 0) {
    return (
      <Badge tone="positive">
        <CheckCircle2 size={12} aria-hidden="true" /> Letzter Deploy erfolgreich
      </Badge>
    );
  }
  if (deploy.exitCode !== null) {
    return (
      <Badge tone="negative">
        <XCircle size={12} aria-hidden="true" /> Letzter Deploy fehlgeschlagen (Code {deploy.exitCode})
      </Badge>
    );
  }
  return null;
}
