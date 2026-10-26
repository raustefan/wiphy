# Deploy per Knopfdruck

Ein Deploy spielt den neuesten Code-Stand ein. Normalerweise macht das die
Person, die den Code betreut. Der Knopf ist für den Fall gedacht, dass sie dich
darum bittet.

Dashboard → Debug-Modus an → **Server** → **Deploy**.

## Was passiert

`deploy.sh` holt den aktuellen Stand des `main`-Branches von Git, installiert
Abhängigkeiten, gleicht das Datenbankschema ab, baut die Website neu und startet
sie neu.

## So geht's

1. Klären, **was** sich seit dem letzten Deploy geändert hat. Starte keinen
   Deploy „einfach mal so“.
2. **Deploy starten** → im Dialog bestätigen.
3. Das Log läuft live mit. Am Ende steht „✅ Deployment finished successfully!“.
4. Beim Neustart ist die Website ein paar Sekunden weg und die Seite meldet
   „Server nicht erreichbar“. Das ist normal.
5. Danach ein paar Seiten durchklicken: Startseite, Login, Dashboard.

## Wenn es schiefgeht

Scheitert der Build, stellt das Skript den vorherigen Build wieder her, und
die alte Version läuft weiter. Datenbankänderungen aus dem neuen Stand können
zu dem Zeitpunkt aber schon eingespielt sein. Deshalb das Log kopieren und
**sofort** an die Technik schicken. Das Protokoll liegt auch auf dem
Server in `.deploy.log`, siehe `BETRIEB.md`.

Der Knopf funktioniert nur auf dem Produktionsserver.
