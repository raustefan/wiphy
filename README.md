# WirtschaftsPhysik Alumni e.V. Seite

## Aufbau

- **Framework:** Next.js 16 (App Router) & TypeScript
- **UI & Styling:** Radix UI (`@radix-ui/themes`)
- **Datenbank:** PostgreSQL
- **ORM:** Prisma v7 (`prisma`, `@prisma/client`, `@prisma/adapter-pg`, `pg`)
- **Authentifizierung:** NextAuth.js v5 (`next-auth@beta`, `bcryptjs`)
- **Blog / Editor:** `@uiw/react-md-editor`, `@uiw/react-markdown-preview`
- **Bildverarbeitung:** `sharp` (verkleinert Blog-Bilder beim Upload zu WebP)
- **E-Mail-Versand:** Nodemailer (Rundmails an Mitglieder)

## Features

- **Öffentlicher Bereich:**
  - Startseite mit Hero-Sektion und Info-Cards.
  - Blog-Übersicht (`/blog`) und Lese-Ansicht für Markdown-Artikel.
  - Globaler Header & Footer.
- **Authentifizierung:**
  - Registrierung (`/register`) und Login (`/login`) via E-Mail & Passwort.
- **Rollen-System (ADMIN & MEMBER):**
  - **MEMBER:** Kann sich einloggen, das Dashboard sehen und das eigene Profil (Name, Stadt, Telefon) bearbeiten.
  - **ADMIN:** Sieht alle Benutzer, kann Rollen ändern und hat vollen Zugriff auf das Blog-System (Erstellen, Bearbeiten, Löschen, Veröffentlichen).
- **Blog-System (Markdown):**
  - Integrierter Split-Screen Markdown-Editor im Admin-Bereich.
  - Öffentliche Anzeige der Beiträge im Blog-Bereich.
  - **Bildergalerie:** je Beitrag ein Titelbild und bis zu fünf weitere Bilder,
    hochgeladen über `/dashboard/blog/<id>`. Titelbild erscheint in der
    Übersicht, die Galerie auf der Beitragsseite (Vollbildansicht zum
    Durchblättern, per Wischgeste bedienbar).
- **Rundmail-System:**
  - Admins können über `/dashboard/mail` eine Rundmail an definierte Empfänger-Gruppen schicken.
  - Unterstützte Gruppen: **Alle Benutzer**, **nur Mitglieder (MEMBER)**, **nur Administratoren (ADMIN)** oder **ausgewählte Nutzer** (Suche, Mehrfachauswahl).
  - Versand per BCC, damit Empfänger nicht alle Adressen sehen; optional **BCC an mich** (Kopie an den absendenden Admin).
  - Nutzt Nodemailer und SMTP-Zugangsdaten aus der `.env`.

---

## Deployment (Hetzner Cloud / Ubuntu)

Diese Anwendung ist so vorkonfiguriert, dass sie reibungslos auf einem Ubuntu-Server (z. B. in der Hetzner Cloud) betrieben werden kann.

### Einmalige Einrichtung auf dem Server

1. **Abhängigkeiten installieren:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs postgresql postgresql-contrib git
   sudo npm install -g pnpm pm2
   ```

2. **Datenbank vorbereiten:**
   ```bash
   sudo -i -u postgres psql
   # In psql:
   CREATE DATABASE wiphy;
   CREATE USER wiphy_admin WITH PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE wiphy TO wiphy_admin;
   ALTER DATABASE wiphy OWNER TO wiphy_admin;
   \q
   exit
   ```

3. **Repository klonen & einrichten:**
   ```bash
   cd /var/www
   git clone https://github.com/raustefan/wiphy
   cd wiphy
   pnpm install
   ```

4. **Umgebungsvariablen konfigurieren:**
   Erstelle eine `.env` Datei im Stammverzeichnis des Projekts (`/var/www/wiphy/.env`):
   ```env
   DATABASE_URL="postgresql://wiphy_admin:secure_password@localhost:5432/wiphy?schema=public"
   NEXTAUTH_SECRET="DEIN_SESSIONS_GEHEIMNIS" # Erzeugen mit: openssl rand -base64 32
   NEXTAUTH_URL="http://DEINE_SERVER_IP"     # Oder deine Domain
   AUTH_TRUST_HOST=true
   SECURITY_LOG_PEPPER="DEIN_PROTOKOLL_GEHEIMNIS" # Optional, sonst wird NEXTAUTH_SECRET benutzt
   ```
   `SECURITY_LOG_PEPPER` pseudonymisiert IP- und E-Mail-Adressen im
   Sicherheitsprotokoll (`SecurityEvent`). Ohne eigenen Wert greift
   `NEXTAUTH_SECRET`; ein separater Wert lässt sich unabhängig von den Sessions
   rotieren.

5. **Datenbank & Anwendung initialisieren:**
   ```bash
   npx prisma db push
   npx prisma db seed # Erstellt den Admin-Nutzer (admin@wiphy.de / admin123)
   pnpm build
   pm2 start pnpm --name "wiphy-app" -- start
   pm2 startup
   pm2 save
   ```

---

### nginx als Reverse Proxy

nginx nimmt HTTPS entgegen und reicht an `127.0.0.1:3000` weiter. Der
`location /`-Block **muss** die Adresse des Besuchers selbst setzen:

```nginx
location / {
    # Bewusst die numerische Adresse: `localhost` kann je nach /etc/hosts
    # zuerst als ::1 aufgelöst werden, und die Anwendung lauscht nur auf
    # 127.0.0.1 — das ergäbe einen 502.
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;

    proxy_set_header Host              $host;
    proxy_set_header Upgrade           $http_upgrade;
    proxy_set_header Connection        'upgrade';

    # Ohne diese drei Zeilen sieht die Anwendung nie die echte Besucher-IP:
    # nginx reicht unbekannte Request-Header unverändert durch, ein Angreifer
    # könnte also seinen eigenen `X-Forwarded-For` mitschicken und sich damit
    # bei jeder Anfrage einen frischen Rate-Limit-Zähler aussuchen. Weil nginx
    # sie hier selbst setzt, wird alles Mitgeschickte überschrieben.
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    proxy_cache_bypass $http_upgrade;

    # Blog-Bilder dürfen bis 2 MB groß sein; nginx bricht sonst schon bei 1 MB
    # mit „413 Request Entity Too Large“ ab, bevor die Anwendung das Bild
    # überhaupt zu Gesicht bekommt.
    client_max_body_size 4M;
}
```

Übernehmen mit `nginx -t && systemctl reload nginx`.

Die Anwendung wertet in dieser Reihenfolge aus (`src/lib/server/clientIp.ts`):
`X-Real-IP` zuerst, sonst der **letzte** Eintrag aus `X-Forwarded-For` — der
stammt vom nächstgelegenen Vermittler, während der erste vom Client stammen
kann.

Damit dieser Weg nicht umgangen werden kann, lauscht die Anwendung nur auf
`127.0.0.1` (`next start -H 127.0.0.1` im `start`-Skript). Vorher war Port 3000
auf allen Schnittstellen offen und direkt aus dem Internet erreichbar — an
nginx, HTTPS und den Headern vorbei. Zur Kontrolle:

```bash
ss -tlnp | grep :3000   # soll 127.0.0.1:3000 zeigen, nicht *:3000
```

---

### Deployment & Updates via SSH (`deploy.sh`)

Im Stammverzeichnis befindet sich das Skript `deploy.sh`. Jedes Mal, wenn du Updates in dein Git-Repository gepusht hast, kannst du den Server mit folgenden Wegen aktualisieren:

#### Option 1: Automatischer Einzeiler über deinen lokalen Rechner (Empfohlen)
Du musst dich nicht einmal interaktiv auf dem Server einloggen! Führe diesen Befehl einfach von deiner **lokalen Konsole** aus:

```bash
ssh root@DEINE_SERVER_IP "cd /var/www/wiphy && ./deploy.sh"
```

#### Option 2: Manuelles Ausführen auf dem Server
Logge dich per SSH auf deinem Server ein und führe das Skript aus:
```bash
ssh root@DEINE_SERVER_IP
cd /var/www/wiphy
./deploy.sh
```

*(Hinweis: Falls das Skript auf dem Server noch nicht ausführbar ist, mache es einmalig mit `chmod +x deploy.sh` ausführbar).*

#### Einmalig beim Update auf die Bildergalerie

`deploy.sh` ruft `prisma db push` auf. Der Schritt legt die neue Tabelle
`BlogImage` an, entfernt dabei aber auch die abgelöste Spalte
`BlogPost.imageUrl` — und weil dort Daten stehen, bricht `db push` ohne
ausdrückliche Erlaubnis ab. Für dieses eine Update deshalb auf dem Server
einmal die Migration fahren, die dasselbe tut und im Repository dokumentiert
ist:

```bash
cd /var/www/wiphy
npx prisma migrate deploy
```

Danach läuft `deploy.sh` wieder unverändert durch. Vorhandene Vorschaubilder,
die als externe URL in `imageUrl` hinterlegt waren, verschwinden mit diesem
Schritt; sie müssen als Titelbild neu hochgeladen werden.

---

### Automatische Updates bei jedem Git Push (GitHub Actions)

Wenn du möchtest, dass der Server bei jedem `git push` auf GitHub vollautomatisch aktualisiert wird, erstelle eine GitHub Action unter `.github/workflows/deploy.yml` mit folgendem Inhalt:

```yaml
name: Deploy to Hetzner

on:
  push:
    branches:
      - main # Oder master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SERVER_HOST }}     # Deine Server IP
          username: root
          key: ${{ secrets.SSH_PRIVATE_KEY }}   # Dein privater SSH-Schlüssel
          port: 22
          script: |
            cd /var/www/wiphy
            ./deploy.sh
```

Füge einfach `SERVER_HOST` und `SSH_PRIVATE_KEY` als Repository-Secrets in den Einstellungen deines GitHub-Repositorys hinzu!
