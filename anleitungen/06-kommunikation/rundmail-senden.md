# Rundmail verschicken

Dashboard → **Rundmail** (`/dashboard/mail`).

![Rundmail-Formular](../bilder/rundmail.png)

## Schritt für Schritt

1. **Art der Mail** wählen, Pflichtfeld:
   - **Newsletter**: Neuigkeiten aus dem Verein. Geht nur an Abonnenten, mit
     Abmeldelink.
   - **Mitteilung an alle**: Mitgliedschaftsthemen. Geht an alle Empfänger,
     ohne Abmeldelink.

   Was wann passt: [Newsletter oder Mitteilung?](newsletter.md)
2. **Empfänger** wählen:
   - **Alle Benutzer**: wirklich jedes Konto, auch ohne Mitgliedschaft
   - **Ordentliches Mitglied**, **Ehrenmitglied**, **Kein Mitglied**: nur
     diese Gruppe
   - **Ausgewählte Nutzer**: Personen per Suche einzeln anhaken

   Unter dem Feld steht, wie viele Personen die Mail bekommen und wie viele
   wegen abbestelltem Newsletter ausgelassen werden.
3. **Betreff** und **Nachricht** schreiben. Der Editor kann fett, kursiv,
   durchgestrichen, Listen und Links.
   [Platzhalter](mail-platzhalter.md) wie `$Anrede` machen die Mail persönlich.
4. Optional **Kopie an mich senden (BCC)**.
5. Optional **Empfängerliste anzeigen**, um vorher zu prüfen, wer die Mail
   bekommt.
6. **… an X Personen senden**.

## Während und nach dem Versand

- Jede Person bekommt **eine eigene Mail**. Niemand sieht die anderen
  Empfänger.
- Während des Versands ist die Seite gesperrt. **Nicht neu laden und das Fenster
  nicht schließen.** Bei vielen Empfängern dauert das einen Moment.
- Danach siehst du, an wie viele die Mail ging. Bei „teilweise gesendet“ steht
  dabei, bei wem es gescheitert ist. Schick die Mail dann nur an diese Personen
  noch einmal (Empfänger: „Ausgewählte Nutzer“), nicht an alle.

Jede Mail trägt automatisch die Vereinssignatur mit den Vorstandsnamen, siehe
[Vorstand pflegen](../05-inhalte/vorstand-pflegen.md).

## Versandprotokoll

Unten auf der Seite: die letzten 50 Mails mit Datum, Betreff, Empfängergruppe
und Anzahl. Einträge werden nach einem Jahr gelöscht. Der Inhalt der Mails wird
nicht gespeichert.

## Mail an einzelne Personen

Für eine Mail an eine oder wenige Personen geht es schneller über die
Benutzerverwaltung: E-Mail-Adresse in der Tabelle anklicken oder Konten anhaken →
**E-Mail an Auswahl**.

Abschalten lässt sich das über das Feature Flag „Mail-Versand an Mitglieder“.
