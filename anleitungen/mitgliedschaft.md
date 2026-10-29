# Mitgliedschaft

## Ablauf einer Aufnahme

1. Die Person registriert sich unter `/mitglied-werden` und bestätigt ihre
   E-Mail-Adresse.
2. Sie füllt dort den Aufnahmeantrag aus. Ab jetzt hat sie ein Konto, aber noch
   keine Mitgliedschaft.
3. Alle Admins bekommen eine Mail, und die Kachel **Anträge & Austritte** zeigt
   „1 offen“.
4. Du nimmst auf oder lehnst ab.

## Antrag bearbeiten

Dashboard → **Anträge & Austritte**.

| Klick auf | Ergebnis |
|---|---|
| **Details** | klappt alle Angaben auf: Person, Studium & Beruf, Zahlungsweise, Beitrag. **Zuklappen** schließt wieder. |
| **Aufnehmen** | Dialog „Antrag annehmen“, siehe unten |
| **Ablehnen** | Dialog mit optionaler **Begründung**. **Ablehnen** darin: Antrag ist abgelehnt, die Person bekommt eine Mail mit der Begründung. Ihr Konto bleibt, ohne Mitgliedschaft. |
| **Löschen** | nach Rückfrage **Endgültig löschen**: Antrag samt dokumentiertem SEPA-Mandat ist weg. Nur für Testanträge oder Unsinn. Für eine echte Absage nimm **Ablehnen**. |

Im Dialog **Aufnehmen**:

1. **Beschlussdatum**: Tag, an dem der Vorstand die Aufnahme beschlossen hat.
   Es wird zum Aufnahmedatum und bestimmt das erste Beitragsjahr.
2. **Mitglieds-ID**: vorgeschlagen ist die nächste freie.
3. Die Vorschau zeigt den Beitrag, der angelegt wird: das Eintrittsjahr,
   anteilig ab dem Monat der Aufnahme.
4. **Als Mitglied aufnehmen**.

Danach ist die Person ordentliches Mitglied, steht in der Benutzerverwaltung
und bekommt eine Bestätigung mit ihrer Mitglieds-ID. Ihre Studienjahre aus dem
Antrag gelten als Sonderstatus. Beiträge späterer Jahre entstehen erst, wenn du
das [Beitragsjahr hinzufügst](beitraege.md#beitragsjahr-hinzufügen).

Gut zu wissen:

- Der **Satz bei Antragstellung** in den Details zeigt nur, was der Person beim
  Antrag genannt wurde. Berechnet wird immer mit den aktuellen
  [Beitragssätzen](beitraege.md#beitragssätze).
- Badge **Nicht gemailt**: Die Benachrichtigung an die Admins ist nicht
  rausgegangen. Der Antrag selbst ist vollständig.
- Solange du nicht entschieden hast, kann die Person ihren Antrag selbst
  zurückziehen (Badge **Zurückgezogen**).

## Austritte

Mitglieder treten im eigenen Profil über **Austreten** aus (Passwort nötig).
Der Austritt gilt **sofort**:

- **Ohne offene Beiträge**: Das Konto wird sofort komplett gelöscht.
- **Mit offenen Beiträgen**: Status wird „Kein Mitglied“, Newsletter und
  Kosmos gehen aus, unbezahlte Beiträge künftiger Jahre werden gestrichen. Der
  Beitrag des laufenden Jahres bleibt geschuldet. Das Konto bleibt, bis du alles
  als bezahlt markierst. Danach löscht die Website es automatisch (spätestens
  15 Minuten später, beim nächsten Aufruf des Dashboards).

Beides löst Mails an alle Admins und an das Mitglied aus. **Wichtig:** Ist das
Feature Flag „Austritt: Benachrichtigung an Admins“ aus, erfährt niemand von
einem Austritt ohne offene Beiträge, weil davon nichts übrig bleibt.

Unter **Anträge & Austritte → Austritte** stehen alle Austritte, deren Konto
noch existiert:

| Badge | Bedeutung |
|---|---|
| Beiträge offen | wartet auf Zahlung, wird danach automatisch gelöscht |
| Ausgetreten | von Hand ausgetragen. Der Nachweis verschwindet nach 3 Jahren von selbst. |
| Login gesperrt | zusätzlich ist der Zugang gesperrt |

Bei offenen Beiträgen: Benutzerverwaltung → Person prüfen →
[Erinnerung schicken](beitraege.md#zahlungserinnerung) → nach Zahlung
[als bezahlt markieren](beitraege.md#zahlungen-pflegen). Das Konto
verschwindet dann von selbst.

## Austritt von Hand eintragen

Für Austritte per Brief, Ausschluss (§ 6) oder Tod:

1. Benutzerverwaltung → **Stift** beim Mitglied.
2. Im Adminbereich **Status** → **Kein Mitglied**.
3. Es erscheint **Grund für das Ende der Mitgliedschaft**: Austritt,
   Ausschluss oder Verstorben.
4. Bei Bedarf **Login deaktiviert** anhaken.
5. **Speichern** → **Ja, Änderungen speichern**.

Was passiert:

- Ein Austrittsnachweis mit heutigem Datum entsteht (Liste „Austritte“, wird
  nach 3 Jahren gelöscht).
- Bei **Verstorben** wird der Login automatisch gesperrt.
- Ohne Sperre bleibt die Person als Konto ohne Mitgliedschaft und kann sich
  weiter anmelden.
- **Beiträge passt die Website hier nicht an.** Was nicht mehr eingefordert
  wird, setzt du per [Ausnahme](beitraege.md#ausnahme-abweichender-betrag) auf
  0 €.

Soll das Konto ganz weg: danach [löschen](konten.md#konto-löschen).

## Studierendenstatus

Den ermäßigten Beitrag (Sonderstatus nach § 5) pflegt das **Mitglied selbst**.
Er hängt am Mitglied, nicht an einzelnen Beitragszeilen.

- Unter **Zahlungen verwalten → Studierendenstatus** wählt das Mitglied „bis
  wann studierst du voraussichtlich?“, höchstens drei Jahre voraus. Vergangene
  Jahre, das laufende und bereits bezahlte Jahre lassen sich nicht ändern.
- Im **letzten ermäßigten Jahr** fragt das Dashboard: „Studierst du … noch?“.
  **Status verlängern** führt zur Zahlungsseite, **Nein, ab … nicht mehr**
  speichert die Antwort.
- Du siehst den Stand in der Benutzerverwaltung am Badge **Studium endet ·
  offen** (keine Antwort) oder **· bestätigt**. Der Filter **Tarif → Letztes
  Jahr ermäßigt** zeigt alle Betroffenen.

Selbst ändern kannst du den Sonderstatus pro Jahr über den Tarif-Chip, siehe
[Beiträge](beitraege.md#sonderstatus-umschalten).
