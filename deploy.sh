#!/bin/bash
# Exit on error
set -e

echo "🚀 Starting deployment..."

# Pull latest code
echo "📥 Pulling latest code from Git..."
git pull

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Generate Prisma Client
echo "🗃️ Generating Prisma Client..."
npx prisma generate

# Push database changes
echo "🗄️ Pushing database changes..."
npx prisma db push

# Build Next.js app
echo "🏗️ Building Next.js application..."
pnpm build

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
