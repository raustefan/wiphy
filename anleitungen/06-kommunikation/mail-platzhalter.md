# Platzhalter in Mails

In Rundmails und Mails aus der Benutzerverwaltung ersetzt die Website diese
Platzhalter für jede Person einzeln:

| Platzhalter | wird zu | Beispiel |
|---|---|---|
| `$Anrede` | „Guten Tag“ + Vor- und Nachname | Guten Tag Anna Müller |
| `$Vorname` | Vorname | Anna |
| `$Nachname` | Nachname | Müller |
| `$Name` | Vor- und Nachname | Anna Müller |

Platzhalter funktionieren in **Betreff und Nachricht**.

## Beispiel

```
$Anrede,

wir freuen uns, dich beim Stammtisch zu sehen, $Vorname!
```

wird bei Anna Müller zu:

```
Guten Tag Anna Müller,

wir freuen uns, dich beim Stammtisch zu sehen, Anna!
```

## Warum „Guten Tag“ statt „Liebe/Lieber“?

Die Website speichert bewusst kein Geschlecht und keine Anrede. Deshalb ist die
Grußformel neutral. Schreib Mails am besten mit `$Anrede,` am Anfang. Fehlt bei
einem Konto der Name, steht dort einfach „Guten Tag“.

Schreib Platzhalter genau so, mit großem Anfangsbuchstaben. `$anrede` wird
nicht ersetzt.
