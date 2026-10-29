# Beiträge

Alles zu Beiträgen passiert in der **Benutzerverwaltung**, immer für das oben
gewählte **Beitragsjahr**.

## So rechnet die Website

Du rechnest nichts selbst. Jeder Beitrag folgt aus den Beitragssätzen (§ 5
Satzung):

| Regel | Beispiel |
|---|---|
| Sätze sind Monatsbeträge, Jahresbeitrag = Satz × 12 | 2 €/Monat → 24 € |
| Eintrittsjahr anteilig ab dem Eintrittsmonat | Eintritt im Juli → 6 Monate |
| Sonderstatus (Studierende): ermäßigter Satz | 1 €/Monat → 12 € |
| Ohne Lastschrift: +10 %, auf volle Euro aufgerundet | 24 € → 26,40 € → **27 €** |
| Ehrenmitglieder und Konten ohne Mitgliedschaft | kein Beitrag |

Ein Beitrag existiert erst, wenn es für Person und Jahr einen **Eintrag** gibt.
Jeder Eintrag ist entweder **Standard** (Betrag folgt immer den aktuellen
Sätzen) oder **Ausnahme** (fester Betrag, Stift-Symbol in der Tabelle). Fahr mit
der Maus über einen Betrag, dann siehst du die Rechnung.

## Beitragssätze

Benutzerverwaltung → **Beitragssätze** (oben rechts).

1. **Ab Jahr**, **Regulär (€/Monat)** und **Sonderstatus (€/Monat)** eintragen.
2. **Speichern**.

- Ein Satz gilt ab seinem Jahr, bis ein neueres eingetragen ist. Neu eintragen
  musst du also nur bei einer Änderung.
- Der **Papierkorb** löscht einen Satz sofort, ohne Rückfrage. Dann gilt wieder
  der vorherige.
- **Achtung:** Ein neuer oder geänderter Satz ändert sofort alle
  Standard-Beiträge der betroffenen Jahre, auch offene und schon angelegte.
  Ausnahmen bleiben.

## Beitragsjahr hinzufügen

Zum Jahreswechsel (oder vorher fürs nächste Jahr) legst du die Beiträge aller
Mitglieder an. Wählbar sind alle angelegten Jahre, das laufende und das nächste.

1. Benutzerverwaltung → **Beitragsjahr** → das neue Jahr wählen.
2. Statt der Tabelle steht die Karte „… ist noch nicht angelegt“. Sie nennt,
   wie viele Mitglieder einen Beitrag bekommen, davon wie viele mit
   Sonderstatus, und die geltenden Sätze.
3. **Jahr … hinzufügen**.

Was passiert: Jedes **ordentliche Mitglied**, das in diesem Jahr schon dabei
ist, bekommt einen offenen Standard-Eintrag. Danach erscheint die Tabelle mit
allen Beträgen.

Steht auf der Karte in Orange „Für … ist noch kein eigener Beitragssatz
eingetragen“, gelten die Sätze des genannten Vorjahrs. Willst du andere, trag
sie vorher unter **Beitragssätze** ein. Später geht es auch noch, die Beträge
passen sich an.

### Hinweis „Erst x von y Mitgliedern haben einen Beitragseintrag“

Erscheint, wenn einzelnen Mitgliedern im Jahr der Eintrag fehlt, z. B. weil sie
aufgenommen wurden, nachdem du das Jahr angelegt hast. Ihre Zeile zeigt nur
„—“. **Bearbeiten** einschalten → **Einträge für … anlegen** ergänzt nur die
fehlenden, vorhandene bleiben unverändert.

## Zahlungen pflegen

Erst den Schalter **Bearbeiten** einschalten. Ohne ihn sind die Chips nur
Anzeige.

| Klick auf | Ergebnis |
|---|---|
| roter Chip (!) in **Zahlung** | sofort **bezahlt**, Chip wird grün |
| grüner Chip (✓) in **Zahlung** | Rückfrage → **Als offen markieren** setzt zurück auf offen |
| Chip in **Tarif** | schaltet den Sonderstatus des Mitglieds für dieses Jahr um (Doktorhut ↔ Person), der Betrag passt sich sofort an |
| **Betrag** (gestrichelt unterstrichen) | Dialog für eine Ausnahme, siehe unten |

Typischer Ablauf: Kontoauszug daneben, Filter **Beitrag → Offen**, Zahlungen
abhaken. Bezahlt markierte Beiträge von Ausgetretenen lösen deren automatische
Löschung aus.

### Sonderstatus umschalten

Der Tarif-Chip ändert den Sonderstatus des Mitglieds für genau dieses Jahr.
Normalerweise pflegt das Mitglied ihn selbst, siehe
[Studierendenstatus](mitgliedschaft.md#studierendenstatus).

### Ausnahme (abweichender Betrag)

Für Absprachen, Erlass oder gestrichene Beiträge:

1. Auf den **Betrag** klicken. Der Dialog zeigt den Standardbeitrag und seine
   Rechnung.
2. **Abweichender Betrag (€)** eintragen, auch 0.
3. **Ausnahme speichern**.

Der Betrag ist jetzt fest (Stift-Symbol) und ändert sich nicht mehr mit den
Sätzen. **Auf Standardbeitrag zurücksetzen** im selben Dialog hebt das auf.
Schreib in die **Notiz** (Sprechblase), warum.

## Zahlungserinnerung

1. Beitragsjahr wählen. Tipp: vorher Filter **Lastschrift → Ohne Mandat**, denn
   Lastschrift-Zahler musst du nicht erinnern.
2. **Alle offenen**. Einzelne Häkchen kannst du wieder entfernen.
3. **E-Mail an Auswahl**. Betreff und Text sind als Erinnerung vorbelegt.
4. **Erinnerung senden**.

Jede Person bekommt eine eigene Mail. Der Versand steht im Protokoll unter
**Rundmail**. Ist jemand ohne Beitrag im Jahr ausgewählt (z. B. ein
Ehrenmitglied), startet der Dialog mit leerem Text.

## SEPA-Lastschrift

Die Website erzeugt eine Datei (pain.008) für das Online-Banking. Geld bewegt sie
selbst nicht.

1. Beitragsjahr wählen → **Alle offenen** (oder einzeln anhaken) →
   **SEPA-Lastschrift**.
2. **Vereinskonto**: Kontoinhaber, Gläubiger-ID, IBAN, BIC (optional). Nicht
   vorbelegt, halte die Daten bereit.
3. **Fälligkeitsdatum**: mindestens einen Bankarbeitstag nach dem Hochladen.
4. **Lastschriftart**: „Folgelastschrift (RCUR)“ passt fast immer.
5. **Verwendungszweck**: vorbelegt mit dem Beitragsjahr.
6. Liste prüfen → **SEPA-Datei herunterladen**.

In die Datei kommen nur ordentliche Mitglieder mit **offenem Eintrag und
Lastschriftmandat**. Alle anderen stehen eingeklappt unter „… ausgewählte
Personen ohne SEPA“. Fehlen Bankdaten, erscheint eine gelbe Warnung mit dem
Namen. „Mitglied seit …“ markiert Leute, die noch kein Jahr dabei sind.

Mandatsreferenz und -datum kannst du im Dialog ändern, das gilt aber nur für
diese Datei. Dauerhaft änderst du sie im Profil unter „Zahlungsdaten“.

**Danach:** Datei im Online-Banking hochladen und freigeben. Nach dem Einzug die
Beiträge **selbst als bezahlt markieren**, das passiert nicht automatisch. Bei
Rücklastschrift wieder auf offen setzen und die Person anschreiben.
