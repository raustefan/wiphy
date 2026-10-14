#!/bin/bash
# Exit on error
set -e

echo "🚀 Starting deployment..."

# Pull latest code
echo "📥 Pulling latest code from Git..."
git pull

# Install dependencies
echo "📦 Installing dependencies..."
# pnpm wechselt selbst auf die Version aus `packageManager` in package.json.
# --frozen-lockfile: genau die Versionen aus pnpm-lock.yaml, nichts nachauflösen.
pnpm install --frozen-lockfile

# Generate Prisma Client
# `pnpm exec` statt `npx`: immer die Prisma-Version aus dem Projekt, nie eine globale.
echo "🗃️ Generating Prisma Client..."
pnpm exec prisma generate

# Apply pending migrations
echo "🗄️ Applying database migrations..."
pnpm exec prisma migrate deploy

# Build Next.js app
echo "🏗️ Building Next.js application..."
# Stale dev route types (from a `next dev` run) break the build's type check
rm -rf .next/dev
# Der laufende Server liest weiter aus .next. Scheitert der Build, bleibt dort
# sonst ein halber Build liegen, der nicht zum Prozess passt („client reference
# manifest … does not exist“, fehlende Schriften) — deshalb vorher sichern und
# bei einem Fehler zurückspielen.
rm -rf .next.bak
[ -d .next ] && cp -a .next .next.bak
if ! pnpm build; then
  echo "❌ Build fehlgeschlagen – vorheriger Build wird wiederhergestellt."
  rm -rf .next
  [ -d .next.bak ] && mv .next.bak .next
  exit 1
fi
rm -rf .next.bak

# Restart application via PM2
echo "🔄 Restarting application with PM2..."
if pm2 show wiphy > /dev/null 2>&1; then
  echo "🔄 Restarting existing PM2 process..."
  pm2 restart wiphy
else
  echo "🚀 Starting new PM2 process..."
  pm2 start pnpm --name "wiphy" -- start
fi

echo "✅ Deployment finished successfully!"
