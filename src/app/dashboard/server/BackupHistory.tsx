import { HugeiconsIcon } from "@hugeicons/react";
import { Alert01Icon, CancelCircleIcon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { Badge, Callout, Card, SectionTitle, Table, TableWrap, Td, Th } from "@/components/ui";
import { formatBytes, formatDateTime } from "@/lib/format";
import type { BackupStatus } from "@/lib/server/serverStatus";

/** Protokoll des täglichen Cron-Backups (`scripts/backup.sh`). */
export function BackupHistory({ status }: { status: BackupStatus }) {
  const { runs, lastSuccessAt, overdue } = status;
  const lastFailed = runs[0] && !runs[0].ok;
  const kept = runs.filter((run) => run.ok && run.kept);
  const keptBytes = kept.reduce((sum, run) => sum + (run.ok ? run.bytes : 0), 0);

  return (
    <section className="mt-10 grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionTitle>Automatische Backups</SectionTitle>
        {status.available &&
          (lastFailed ? (
            <Badge tone="negative">
              <HugeiconsIcon icon={CancelCircleIcon} size={12} aria-hidden="true" /> Letztes Backup fehlgeschlagen
            </Badge>
          ) : overdue ? (
            <Badge tone="warning">
              <HugeiconsIcon icon={Alert01Icon} size={12} aria-hidden="true" /> Überfällig
            </Badge>
          ) : (
            <Badge tone="positive">
              <HugeiconsIcon icon={CheckmarkCircle01Icon} size={12} aria-hidden="true" /> Aktuell
            </Badge>
          ))}
      </div>

      <Card className="grid gap-4 p-5">
        {!status.available ? (
          <p className="text-sm text-muted">
            Auf diesem Rechner sind keine automatischen Backups eingerichtet — sie laufen nur auf dem
            Produktionsserver (siehe README).
          </p>
        ) : (
          <>
            <p className="text-sm text-muted text-pretty">
              Jede Nacht um 3:30 Uhr UTC (4:30 bzw. 5:30 Uhr deutscher Zeit) sichert ein Cron-Job die Datenbank nach{" "}
              <code>/var/backups/wiphy</code>. Backups älter als 14 Tage werden gelöscht. Zuletzt
              erfolgreich: <strong>{formatDateTime(lastSuccessAt)}</strong> · {kept.length}{" "}
              {kept.length === 1 ? "Backup" : "Backups"} mit zusammen {formatBytes(keptBytes)} auf dem Server.
            </p>

            {overdue && (
              <Callout tone="warning" icon={<HugeiconsIcon icon={Alert01Icon} size={16} />} title="Seit über einem Tag kein Backup">
                Prüfe auf dem Server <code>/etc/cron.d/wiphy-backup</code> und{" "}
                <code>/var/backups/wiphy/backup.log</code>. Von Hand starten:{" "}
                <code>/usr/local/sbin/wiphy-backup</code>.
              </Callout>
            )}

            <TableWrap>
              <Table>
                <thead>
                  <tr>
                    <Th>Zeitpunkt</Th>
                    <Th>Status</Th>
                    <Th>Größe</Th>
                    <Th>Datei / Fehler</Th>
                  </tr>
                </thead>
                <tbody>
                  {runs.map((run) => (
                    <tr key={run.at}>
                      <Td className="whitespace-nowrap">{formatDateTime(run.at)}</Td>
                      <Td>
                        {run.ok ? <Badge tone="positive">OK</Badge> : <Badge tone="negative">Fehler</Badge>}
                      </Td>
                      <Td className="whitespace-nowrap">{run.ok ? formatBytes(run.bytes) : "—"}</Td>
                      <Td className="min-w-64 font-mono text-xs break-all">
                        {run.ok ? (
                          <>
                            {run.file}
                            {!run.kept && <span className="ml-2 font-sans text-faint">(gelöscht)</span>}
                          </>
                        ) : (
                          <span className="text-negative">{run.error}</span>
                        )}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrap>
          </>
        )}
      </Card>
    </section>
  );
}
