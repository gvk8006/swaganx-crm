#!/bin/sh
echo "Running Prisma generate..."
npx prisma generate 2>/dev/null

echo "Running Prisma db push..."
npx prisma db push --accept-data-loss 2>/dev/null

echo "Running seed if needed..."
node prisma/seed.js 2>/dev/null || echo "Seed skipped (data may exist)"

echo "Starting Next.js..."
exec node server.js
