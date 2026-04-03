#!/bin/bash
# Production build script for Vercel
# Swaps to PostgreSQL schema before building
cp prisma/schema.postgres.prisma prisma/schema.prisma
npx prisma generate
npx next build
