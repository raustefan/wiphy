# Server und Logs

Dashboard → Debug-Modus an → **Server** (`/dashboard/server`).

## Auslastung

**CPU** und **Arbeitsspeicher** live, solange die Seite offen ist. Einen Verlauf
darüber hinaus speichert der Server nicht. Darunter steht, wie lange die Website
seit dem letzten Neustart läuft.

Dauerhaft fast voller Arbeitsspeicher ist ein Warnsignal. Der Server hat nur
knapp 4 GB und keinen Swap.

## Logs

Die letzten Zeilen der Server-Logs (`pm2 logs wiphy`), live. Dasselbe gibt es
auf jeder Seite über **Konsole** in der
[Debug-Leiste](../01-grundlagen/debug-modus.md). Dort kannst du zwischen
Fehler- und Standardausgabe wechseln.

Wann reinschauen? Wenn ein Mitglied einen Fehler meldet: Die Uhrzeit notieren
lassen, dann in den Logs nach einem Eintrag zu dieser Zeit suchen. Für die
Fehlersuche gibst du die Zeilen an die Person weiter, die den Code betreut.
Welche Meldungen harmlos sind, steht in `BETRIEB.md` unter „Bekannte
Log-Meldungen“.

## Versionen

Node.js, pnpm, Next.js, React und Prisma, wie sie gerade laufen. Für Rückfragen
an die Technik.

Außerdem auf dieser Seite: [Deploy](deploy.md) und [Backup](backup.md).
