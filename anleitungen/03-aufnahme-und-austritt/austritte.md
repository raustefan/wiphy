# Austritte im Blick behalten

Mitglieder können im Mitgliederbereich selbst austreten (Feature Flag
„Austritt im Mitgliederbereich“). Der Austritt gilt **sofort**. Der Vorstand
stimmt der vorzeitigen Beendigung pauschal zu.
Der Beitrag fürs laufende Jahr bleibt geschuldet.

## Was beim Austritt passiert

**Ohne offene Beiträge:** Das Konto wird sofort komplett gelöscht. Es taucht in
keiner Liste mehr auf.

**Mit offenen Beiträgen:**
- Der Status wird „Kein Mitglied“, Newsletter und Kosmos-Sichtbarkeit gehen aus.
- Offene Beiträge **künftiger** Jahre werden gestrichen. Die bis heute fälligen
  bleiben offen.
- Das Konto bleibt bestehen, bis du die offenen Beiträge als bezahlt markierst.
  Danach löscht die Website es automatisch (Prüfung höchstens alle 15 Minuten
  bei Aufrufen des Dashboards).

In beiden Fällen gehen Mails raus, jeweils mit eigenem Feature Flag:
- an alle Admins mit Name und letzter E-Mail-Adresse („Austritt: Benachrichtigung
  an Admins“). **Ist dieses Flag aus, erfährt der Vorstand von Austritten ohne
  offene Beiträge nichts**, weil davon keine Spur bleibt.
- an das Mitglied („Austritt: Mails an das Mitglied“)

## Wo du Austritte siehst

Dashboard → **Anträge & Austritte**, Abschnitt **Austritte**. Dort stehen alle
Austritte, deren Konto noch existiert:

- **Beiträge offen**: wartet auf Zahlung, wird danach automatisch gelöscht
- **Ausgetreten**: vom Vorstand ausgetragen, Nachweis bleibt drei Jahre und
  verschwindet dann von selbst
- **Login gesperrt**: zusätzlich gesperrter Zugang

In der Benutzerverwaltung tragen Ausgetretene im Beitragsjahr das Badge
„ausgetreten“.

## Typischer Ablauf bei offenen Beiträgen

1. Austrittsmail kommt an.
2. Benutzerverwaltung → Beitragsjahr wählen → bei der Person prüfen, was offen ist.
3. Zahlung abwarten (oder [Erinnerung schicken](../04-beitraege/zahlungserinnerung.md)).
4. Als bezahlt markieren, siehe
   [Zahlungen pflegen](../04-beitraege/beitraege-pflegen.md). Das Konto
   verschwindet danach automatisch.
