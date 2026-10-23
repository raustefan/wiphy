#!/bin/bash
# Tägliches Datenbank-Backup auf dem Produktionsserver.
#
# Läuft per Cron als root, nicht aus dem Git-Checkout: ein halber Deploy soll
# die Backups nicht mitreißen. Installieren bzw. nach Änderungen neu kopieren:
#   install -m 755 scripts/backup.sh /usr/local/sbin/wiphy-backup
#   echo '30 3 * * * root /usr/local/sbin/wiphy-backup' > /etc/cron.d/wiphy-backup
#
# Jeder Lauf hängt eine Zeile an backup.log an (gelesen von /dashboard/server):
#   <ISO-Zeit> TAB ok   TAB <Datei> TAB <Bytes>
#   <ISO-Zeit> TAB fail TAB <Fehlermeldung>
set -u
umask 077

DIR=/var/backups/wiphy
LOG="$DIR/backup.log"
# DSGVO: Kopien mit personenbezogenen Daten nach spätestens 14 Tagen löschen.
KEEP_DAYS=14

mkdir -p "$DIR"
file="$DIR/wiphy-backup-$(date -u +%F-%H-%M).dump"

# pg_dump als postgres (Anmeldung über den lokalen Socket, kein Passwort nötig),
# die Datei schreibt root. Erst nach Erfolg umbenennen: eine halbe Datei soll
# nie wie ein Backup aussehen.
if err=$(runuser -u postgres -- pg_dump --format=custom --no-owner --no-privileges wiphy 2>&1 >"$file.part") \
  && mv "$file.part" "$file"; then
  # Alte Backups erst löschen, wenn ein neues da ist.
  find "$DIR" -name 'wiphy-backup-*.dump' -mtime +$((KEEP_DAYS - 1)) -delete
  printf '%s\tok\t%s\t%s\n' "$(date -u -Is)" "${file##*/}" "$(stat -c %s "$file")" >>"$LOG"
else
  rm -f "$file.part"
  printf '%s\tfail\t%s\n' "$(date -u -Is)" "$(echo "${err:-unbekannter Fehler}" | tr '\t\n' '  ' | cut -c1-500)" >>"$LOG"
  exit 1
fi
