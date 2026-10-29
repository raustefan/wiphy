# Inhalte der Website

Termine, Blogbeiträge und Vorstandseinträge funktionieren gleich:
**Neu** legt sofort einen unsichtbaren **Entwurf** an und öffnet ihn. Öffentlich
wird er erst mit dem Haken **… veröffentlichen** und **Speichern**.

## Termine

Dashboard → **Termine** → **Neuer Termin**.

| Feld | Hinweis |
|---|---|
| Titel | |
| Kurzbeschreibung | 1–2 Sätze. Steht in der Terminliste, auf der Startseite und in der Einladungsmail. |
| Ganztägig | ohne Uhrzeit |
| Beginn / Ende | Ende optional. Der blaue Kasten darunter zeigt, wie der Zeitraum öffentlich steht. |
| Ort / Anschrift | Die Anschrift wird zum Kartenlink und steht in der Kalenderdatei. |
| Link / Linktext | optional, z. B. Anmeldung. Ohne Linktext: „Mehr erfahren“. |
| Ausführliche Beschreibung | Markdown, rechts die Vorschau |
| Termin veröffentlichen | Haken = sichtbar für alle |

Nach dem Speichern eines veröffentlichten Termins erscheinen zwei Knöpfe:

- **Termin ankündigen** öffnet die Rundmail mit fertiger Einladung, siehe
  [Kommunikation](kommunikation.md#zu-einem-termin-einladen).
- **Öffentliche Seite** öffnet die Terminseite in einem neuen Tab.

Ein veröffentlichter Termin steht unter `/termine` (mit Kalenderdatei), als
nächster Termin auf der Startseite und, wenn er in den nächsten drei Monaten
liegt, im Dashboard aller Mitglieder. Vergangene Termine bekommen das Badge
**Vergangen** und bleiben öffentlich unter „Vergangenes“.

In der Liste: **Ankündigen** (nur veröffentlichte, kommende Termine),
**Bearbeiten**, **Löschen** → **Endgültig löschen**. Verknüpfte Blogbeiträge
bleiben dabei erhalten und verlieren nur die Verknüpfung.

## Blog

Dashboard → **Blog** → **Neuer Beitrag**.

| Feld | Hinweis |
|---|---|
| Titel, Autor | Autor ist frei wählbar |
| Veröffentlichungsdatum | bestimmt die Reihenfolge |
| Gehört zu Termin | macht den Beitrag zum **Rückblick**. Termin und Beitrag verlinken dann aufeinander. |
| Kurze Textpreview | Pflicht. Steht in der Übersicht unter dem Titel. |
| Inhalt | Markdown, Werkzeugleiste für fett, Links, Listen |
| Beitrag veröffentlichen | Haken = sichtbar für alle |

Veröffentlichte Beiträge stehen unter `/blog`, im RSS-Feed und (der neueste) auf
der Startseite.

### Bilder

Die **Bildergalerie** unter dem Formular speichert **sofort**, unabhängig vom
Knopf „Speichern“.

- Bilder ins gestrichelte Feld ziehen oder auswählen. Bis zu 10 pro Beitrag, je
  höchstens 2 MB. JPEG, PNG, WebP, AVIF, GIF, TIFF, HEIC (iPhone) gehen.
- Die Website verkleinert jedes Bild und entfernt Standortdaten (EXIF).
- Das **erste** Bild ist das Titelbild. **Als Titelbild** macht ein anderes
  zum ersten, die **Pfeile** verschieben, der **Papierkorb** löscht (mit
  Rückfrage).
- **Alternativtext**: kurz beschreiben, was zu sehen ist. Wird beim Verlassen
  des Felds gespeichert.

**Löschen** in der Übersicht → **Endgültig löschen** entfernt den Beitrag samt
Bildern.

## Vorstand und Signatur

Dashboard → **Vorstand**. Pflegt die Seite `/vorstand` und legt fest, wer für
den Verein zeichnet.

1. **Neues Mitglied** oder **Bearbeiten**.
2. **Name**, **Funktion**, optional **LinkedIn-Link** (mit `https://`).
3. Haken **Auf /vorstand veröffentlichen** und/oder **In der Mail-Signatur
   nennen**.
4. **Speichern**.
5. Optional **Profilfoto** (bis 2 MB, wird rund zugeschnitten, speichert
   sofort). Ohne Foto erscheinen die Initialen.

Wer veröffentlicht ist **und** den Signatur-Haken hat, steht an drei Stellen:

- unter **jeder Mail** der Website als „Name (Funktion) · …“
- im **Impressum** als vertretungsberechtigter Vorstand
- auf dem **Mitgliedschaftszertifikat** (PDF) in der Unterschriftenleiste

**Nach jeder Vorstandswahl hier aktualisieren.** Das Impressum ist eine
rechtliche Pflichtangabe. Die **Pfeile** in der Liste ändern die Reihenfolge für
alle diese Stellen.
