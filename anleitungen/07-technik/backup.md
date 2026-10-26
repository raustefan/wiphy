# Backup herunterladen

Der Server sichert die Datenbank **jeden Tag automatisch** (3:30 Uhr UTC) und
hebt die Sicherungen 14 Tage auf. Von Hand brauchst du ein Backup nur vor
größeren Eingriffen oder auf Bitte der Technik.

Dashboard → Debug-Modus an → **Server** → **Backup**.

## Automatische Backups prüfen

Der Abschnitt **Automatische Backups** listet die letzten Läufe mit Status
(OK/Fehler) und Größe. Gab es seit über einem Tag kein Backup, erscheint eine
gelbe Warnung. Dann bitte die Technik informieren (Details in `BETRIEB.md`).

## Komplettes Backup anfordern

1. **Backup anfordern**.
2. Datenschutzhinweis lesen, **Passwort** eingeben, bestätigen.
3. Ein Einmal-Link kommt per Mail an deine Adresse. Er ist **15 Minuten gültig**.
4. Den Link **im selben Browser** öffnen, in dem du angemeldet bist. Die
   Datei wird heruntergeladen.

Die Datei ist ein `pg_dump`-Archiv der kompletten Datenbank. Wiederherstellen
lässt es sich nur auf der Konsole mit `pg_restore` (siehe README).

## Datenschutz

Die Datei enthält **alle personenbezogenen Daten des Vereins**: Mitglieder,
Bankdaten, Passwort-Hashes, Bilder und Nachrichten. Deshalb:

- nur verschlüsselt speichern (z. B. verschlüsseltes Laufwerk)
- nicht weitergeben, nicht in Cloud-Ordner legen
- **spätestens nach 14 Tagen löschen**. Wer im Verein gelöscht wird, steckt
  sonst weiter in deiner Kopie (Art. 5 Abs. 1 lit. e und Art. 17 DSGVO).
