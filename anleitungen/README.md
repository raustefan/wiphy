# Anleitungen für Admins

Alles Wichtige zur Verwaltung der Vereinswebsite, in sechs Themen:

| Datei | Inhalt |
|---|---|
| [Konten](konten.md) | Benutzerverwaltung, Konto anlegen, bearbeiten, sperren, löschen |
| [Mitgliedschaft](mitgliedschaft.md) | Anträge, Austritte, Studierendenstatus |
| [Beiträge](beitraege.md) | Beitragssätze, Beitragsjahr, Zahlungen, Erinnerung, SEPA |
| [Inhalte](inhalte.md) | Termine, Blog, Vorstand und Signatur |
| [Kommunikation](kommunikation.md) | Rundmail, Newsletter, Einladungen, Kontaktanfragen |
| [Technik](technik.md) | Debug-Modus, Feature Flags, Sicherheit, Server, Backup |

Was auf dem Server per SSH zu tun ist, steht in [`BETRIEB.md`](../BETRIEB.md).

## Einstieg

Nach dem Login landest du im **Dashboard**. Admins sehen dort oben die Karte
**Verwaltung**. Ein Klick auf eine Kachel öffnet:

| Kachel | Seite |
|---|---|
| Benutzerverwaltung | alle Konten mit Beiträgen (`/dashboard/users`) |
| Anträge & Austritte | Aufnahmeanträge und Austritte. Das Badge „x offen“ zählt unentschiedene Anträge. |
| Neuer User | Formular „Konto anlegen“ |
| Rundmail | Mail an Gruppen oder einzelne Personen |
| Termine, Blog, Vorstand | Inhalte der öffentlichen Seiten |
| Kontaktanfragen | Nachrichten aus dem Kontaktformular |
| Feature Flags, Sicherheit, Server | nur bei eingeschaltetem [Debug-Modus](technik.md#debug-modus) |

## Gut zu wissen

- **Rolle und Mitgliedschaft sind getrennt.** Ein Admin kann Mitglied sein,
  muss aber nicht.
- **Admin-Sitzungen enden 12 Stunden nach dem Login**, auch wenn du aktiv warst.
- **Admins kommen immer rein**, auch wenn das Feature Flag „Login“ aus ist.
- Ist eine Funktion per Feature Flag aus, erscheint beim Klick ein Hinweisdialog
  statt eines Fehlers.
- **Dein eigenes Konto** (Passwort, E-Mail-Adresse, Newsletter) verwaltest du wie
  jedes Mitglied über die Karte **Mein Konto** im Dashboard. Dich selbst sperren
  oder über die Benutzerverwaltung löschen kannst du nicht.
