# Betrieb: Checkliste für den Produktionsserver

Für alle, die den Server übernehmen. Einrichtung, nginx, Deploy und Backup
stehen ausführlich in der [README](README.md#deployment-hetzner-cloud--ubuntu);
hier steht, **was auf dem echten Server wo liegt** und **wie man prüft, ob
alles läuft**. Jeder Befehl in der Checkliste ist nur lesend.

## Der Server

Hetzner Cloud, Ubuntu 26.04 LTS, 2 vCPU / 3,7 GB RAM / 38 GB Platte, kein Swap.
Domain `wiphy.de` (+ `www.wiphy.de`); `wirtschaftsphysik.de` (+ `www.`) leitet per 301 dorthin
um, beide Domains und DNS bei Hetzner. Zugang nur per SSH-Schlüssel als `root`
(siehe [Zugang](#zugang-für-eine-neue-person)).

## Wo liegt was

| Was                  | Wo                                                  | Ändern / neu laden                           |
| -------------------- | --------------------------------------------------- | -------------------------------------------- |
| Code (Git-Checkout von `main`) | `/var/www/wiphy/wiphy` — **doppeltes `wiphy`**, nicht `/var/www/wiphy` wie in der README | `bash deploy.sh` (ist auf dem Server nicht ausführbar) oder Knopf in `/dashboard/server`; nie direkt auf dem Server editieren |
| Geheimnisse/Config   | `/var/www/wiphy/wiphy/.env`                         | Datei bearbeiten, dann `pm2 restart wiphy --update-env` |
| Feature Flags        | Admin-Dashboard (liegen in der Datenbank)           | im Browser                                   |
| App-Prozess          | PM2-Prozess `wiphy` (`pnpm start` → `127.0.0.1:3000`), Node 24, pnpm 10 | `pm2 restart wiphy`        |
| Autostart nach Reboot| systemd-Unit `pm2-root` lädt `/root/.pm2/dump.pm2`  | nach Änderungen an PM2-Prozessen: `pm2 save` |
| App-Logs             | `/root/.pm2/logs/wiphy-out.log`, `wiphy-error.log`; täglich rotiert durch Modul `pm2-logrotate` (10 MB, 6 Stück, gzip) | `pm2 logs wiphy` |
| Deploy-Protokoll     | `/var/www/wiphy/wiphy/.deploy.log` (nur Deploys per Knopf) | —                                     |
| Reverse Proxy / HTTPS| `/etc/nginx/sites-available/wiphy` (verlinkt in `sites-enabled`); Umleitung `wirtschaftsphysik.de` → `wiphy.de` in eigener Datei `/etc/nginx/sites-available/wirtschaftsphysik` | `nginx -t && systemctl reload nginx` |
| nginx-Logs           | `/var/log/nginx/access.log`, `error.log`            | —                                            |
| TLS-Zertifikat       | `/etc/letsencrypt/live/wiphy.de/` und `/etc/letsencrypt/live/wirtschaftsphysik.de/` (certbot, `certbot.timer` erneuert automatisch) | `certbot renew --dry-run` zum Testen |
| Datenbank            | PostgreSQL 18 lokal (`127.0.0.1:5432`), DB `wiphy`  | `sudo -u postgres psql wiphy`                |
| Backup               | täglich 3:30 UTC nach `/var/backups/wiphy/` (14 Tage), Skript `/usr/local/sbin/wiphy-backup`, Cron `/etc/cron.d/wiphy-backup`; manuell: `/dashboard/server` → „Backup anfordern“ | README „Backup & Wiederherstellung“ |
| OS-Updates           | `unattended-upgrades` (Sicherheitsupdates automatisch) | `apt upgrade`, danach ggf. `reboot`       |

## Checkliste

Jeweils: Befehl → was rauskommen soll. Vorher `cd /var/www/wiphy/wiphy`.

**App**
- [ ] `pm2 status` → `wiphy` und `pm2-logrotate` sind `online`; „↺“ steigt nur bei Deploys
- [ ] `pm2 logs wiphy --lines 100 --nostream` → keine neuen, wiederkehrenden Fehler (siehe [Bekannte Log-Meldungen](#bekannte-log-meldungen))
- [ ] `ss -tlnp | grep :3000` → `127.0.0.1:3000`, **nicht** `*:3000` oder `0.0.0.0:3000`
- [ ] `systemctl is-enabled pm2-root` → `enabled`
- [ ] `git status -sb && git fetch -q && git rev-list --count HEAD..origin/main` → sauber, `0` (sonst ist ein Deploy fällig)
- [ ] `tail -3 .deploy.log` → „✅ Deployment finished successfully!“

**Konfiguration** (Werte nie ausgeben, nur prüfen, ob sie gesetzt sind)
- [ ] `grep -oE '^[A-Z_]+=' .env` → mindestens `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `AUTH_TRUST_HOST`, `ALTCHA_HMAC_KEY`, `EMAIL_FROM`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`
- [ ] `grep -oE '^NEXTAUTH_URL="?https?://[^/"]*' .env` → `https://wiphy.de` (daraus entstehen alle Links in Mails und die Sitemap)
- [ ] `stat -c '%a' .env` → `600`

**Datenbank**
- [ ] `systemctl is-active postgresql` → `active`
- [ ] `pnpm exec prisma migrate status` → „Database schema is up to date!“
- [ ] `pg_dump --version` → vorhanden (sonst schlägt „Backup anfordern“ fehl)
- [ ] `ss -tlnp | grep :5432` → nur `127.0.0.1` / `[::1]`
- [ ] `tail -3 /var/backups/wiphy/backup.log` → jüngste Zeile `ok` und nicht älter als ein Tag (auch im Dashboard unter „Automatische Backups“)

**nginx / HTTPS** (die `curl`-Zeilen gehen auch vom eigenen Rechner)
- [ ] `nginx -t` → „syntax is ok“ / „test is successful“
- [ ] `curl -sI https://wiphy.de | head -1` → `200`
- [ ] `curl -sI http://wiphy.de | head -1` → `301`
- [ ] `curl -s https://wiphy.de/robots.txt | grep Sitemap` → `https://…`
- [ ] `curl -sI https://wirtschaftsphysik.de/blog | grep -i location` → `https://wiphy.de/blog`
- [ ] `certbot certificates` → beide mehr als 30 Tage gültig
- [ ] `grep -E 'X-Real-IP|client_max_body_size' /etc/nginx/sites-available/wiphy` → beide vorhanden (siehe README)

**System & Sicherheit**
- [ ] `df -h /` → unter 80 % belegt
- [ ] `free -h` → genug „available“
- [ ] `apt list --upgradable 2>/dev/null | wc -l` → klein; `systemctl is-active unattended-upgrades` → `active`
- [ ] `[ -f /var/run/reboot-required ] && echo REBOOT` → nichts (sonst Neustart einplanen)
- [ ] `sshd -T | grep -E '^(passwordauthentication|permitrootlogin) '` → `no` / `prohibit-password`
- [ ] `swapon --show` → `/swapfile` mit 2 GB
- [ ] `curl -sI https://www.wiphy.de | head -1` → `301`, und `curl -sI https://wiphy.de | grep -iE '^(server|x-powered-by)'` → nur `server: nginx` ohne Version
- [ ] `cat /root/.ssh/authorized_keys | awk '{print $3}'` → nur Schlüssel von Leuten, die aktuell Zugang haben sollen
- [ ] Hetzner Cloud Console → Firewall: nur 22, 80, 443 eingehend (`ufw` ist auf dem Server aus)

**Funktion von außen**
- [ ] Startseite, Login und `/dashboard/server` laden
- [ ] Kontaktformular abschicken → Mail kommt an (prüft Mailzugang und ALTCHA)
- [ ] Blogbild > 1 MB hochladen → klappt (prüft `client_max_body_size`)
- [ ] Backup anfordern → Link kommt, Datei lässt sich mit `pg_restore --list` lesen

## Bekannte Log-Meldungen

Harmlos, solange sie nicht massenhaft auftreten:

- `The Server Reference ID did not match the expected format` — Bots schicken
  Müll als Server-Action-ID. Kein Handlungsbedarf.
- `Failed to find Server Action. This request might be from an older or newer
  deployment` — ein Browser hatte die Seite vor einem Deploy geöffnet. Taucht
  nach jedem Deploy kurz auf.
- `Failed to parse body as FormData` — kaputte Anfragen, meist Bots.

Nicht harmlos:

- `client reference manifest for route … does not exist` — `.next` passt nicht
  zum laufenden Prozess (halber Build). `deploy.sh` sichert den alten Build
  inzwischen; falls es trotzdem auftritt: `bash deploy.sh` erneut laufen lassen.

## Zugang für eine neue Person

1. Person schickt ihren **öffentlichen** SSH-Schlüssel (`….pub`).
2. Auf dem Server als eigene Zeile an `/root/.ssh/authorized_keys` anhängen
   (der Kommentar am Zeilenende sollte den Namen der Person enthalten).
3. Lokal bei der Person in `~/.ssh/config`:
   ```
   Host wiphy
     HostName SERVER_IP
     User root
     IdentityFile ~/.ssh/wiphy_key
     IdentitiesOnly yes
   ```
   und `chmod 600 ~/.ssh/wiphy_key`.
4. Testen: `ssh wiphy 'pm2 status'`.
5. Beim Ausscheiden: die Zeile wieder aus `authorized_keys` löschen.
   Passwörter werden nie weitergegeben — `.env`-Werte liegen nur auf dem Server.

## Befunde vom 2026-10-20

Ergebnis der ersten Prüfung, am 2026-10-23 größtenteils behoben. Offen ist
nur noch, was in der Hetzner Console passieren muss. Nach dem Beheben abhaken
oder den Abschnitt löschen.

**Behebt etwas, das kaputt ist**
- [x] **Blogbild-Uploads > 1 MB scheitern.** *Behoben 2026-10-20, Sicherung der alten Datei: `/root/nginx-wiphy.bak-2026-10-20`.* In `/etc/nginx/sites-available/wiphy`
  fehlt `client_max_body_size 4M;` im `location /`-Block. nginx-Log vom
  2026-10-01: zwei Uploads auf `/api/dashboard/blog/images` mit 1,5 und 1,8 MB
  abgewiesen (413).
- [x] **Mail-Links und Sitemap zeigen auf `http://`.** *Behoben 2026-10-20 (`https://` gesetzt, neu deployt), Sicherung der alten `.env`: `/root/env-wiphy.bak-2026-10-20`.* `.env` hat
  `NEXTAUTH_URL="http://wiphy.de"`. Daraus baut `siteUrl()` alle Links in
  E-Mails, u. a. Passwort-Reset und E-Mail-Bestätigung mit Token. Der erste
  Aufruf geht unverschlüsselt über das Netz, bevor nginx auf HTTPS umleitet.
  `robots.txt` und `sitemap.xml` liefern ebenfalls `http://…`. Fix: auf
  `https://wiphy.de` setzen, dann `pnpm build` (Sitemap-Basis wird beim Build
  festgelegt) und Neustart — also einfach `bash deploy.sh` nach der Änderung.

**Sicherheit**
- [x] *Behoben 2026-10-23: `/etc/ssh/sshd_config.d/00-wiphy.conf` (Passwort- und Tastatur-Login aus, `X11Forwarding no`), Sicherung: `/root/sshd_config.bak-2026-10-23`.* `PasswordAuthentication yes` in der SSH-Konfiguration. Root darf sich
  zwar nicht per Passwort anmelden (`prohibit-password`), trotzdem auf `no`
  stellen, weil nur Schlüssel benutzt werden.
- [ ] **Hetzner Console:** Server → Backups einschalten. Die täglichen Dumps
  in `/var/backups/wiphy` liegen auf derselben Platte und überstehen den
  Verlust des Servers nicht.
- [x] *Behoben 2026-10-23: Kommentar `stefan-rau`.* Der einzige Schlüssel in
  `/root/.ssh/authorized_keys` hatte keinen Kommentar.
- [ ] Keine Firewall auf dem Server (`ufw` inaktiv). Nach außen offen sind nur
  22, 80, 443 — das ist korrekt. Prüfen, ob in der Hetzner Console eine
  Cloud-Firewall hängt; wenn nicht, dort eine anlegen (22/80/443).
- [x] *Behoben 2026-10-23, ebenso die `.env`-Sicherung in `/root`.* `.env` hat Rechte `644` statt `600`. Einziger Login-Nutzer ist `root`,
  daher geringes Risiko, aber ein Einzeiler: `chmod 600 .env`.
- [x] *Neustart am 2026-10-20 erledigt (Kernel 7.0.0-34, alles kam von selbst wieder hoch, Seite ca. 30 s weg). Danach `apt upgrade` (66 Pakete, u. a. OpenSSL; Configs behalten) und zweiter Neustart auf Kernel 7.0.0-38. Zwei Pakete (`software-properties`) hält Ubuntu per Phased Update bewusst zurück — normal.* — 45 Pakete warten auf Update, **Neustart überfällig** (`reboot-required`
  verlangt neue Kernel und `libc6`; Server läuft seit 90 Tagen). Neustart
  testet nebenbei den PM2-Autostart (`pm2-root` war seit dem letzten Boot nie
  aktiv, die App wurde von Hand gestartet; der gespeicherte Dump ist aber
  korrekt).

**Aufräumen / klein**
- [x] Server ist 2 Commits hinter `origin/main` → *beim Deploy am 2026-10-20 mitgezogen.*
- [x] *Behoben 2026-10-23 (301 auf `https://wiphy.de`), Sicherung: `/root/nginx-wiphy.bak-2026-10-23`.* `www.wiphy.de` liefert die Seite direkt aus statt auf `wiphy.de`
  umzuleiten (doppelte Inhalte für Suchmaschinen).
- [ ] *`SECURITY_LOG_PEPPER` ist inzwischen gesetzt.* `SECURITY_LOG_PEPPER` und `NEXT_PUBLIC_SITE_URL` fehlen in `.env`
  (optional, Fallbacks greifen).
- [x] *Behoben 2026-10-23, zusätzlich `proxy_hide_header X-Powered-By;`. Sicherung: `/root/nginx.conf.bak-2026-10-23`.* `server_tokens build;` in `/etc/nginx/nginx.conf` verrät die
  nginx-Version → `server_tokens off;`.
- [x] *Gelöscht 2026-10-23.* Alte Logs `/root/.pm2/logs/wiphy-app-*.log` vom 2026-07-31 (früherer
  Prozessname) können weg.
- [x] *Behoben 2026-10-23 (`http2 on;`).* HTTPS läuft nur mit HTTP/1.1: `listen 443 ssl http2;` bzw.
  `http2 on;` im Server-Block.
- [x] *Behoben 2026-10-23: `/swapfile`, 2 GB, in `/etc/fstab`.* Kein Swap bei 3,7 GB RAM. `pnpm build` läuft auf demselben Server; bisher
  kein OOM in den Kernel-Logs, aber ein 2-GB-Swapfile wäre billige
  Absicherung.

**In Ordnung:** App läuft stabil (keine ungeplanten Neustarts, kein OOM),
Port 3000 nur lokal, Postgres nur lokal, Migrationen aktuell, `pg_dump`
vorhanden, Zertifikat bis 2026-12-19 gültig und Autoerneuerung aktiv,
HTTP→HTTPS-Umleitung, Sicherheitsheader (HSTS, CSP, X-Frame-Options) gesetzt,
Platte 23 % belegt, Logrotation aktiv.
