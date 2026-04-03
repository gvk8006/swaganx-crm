FROM node:18-alpine

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL="postgresql://placeholder"
RUN npm run build

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

CMD ["sh", "-c", "npx prisma db push --accept-data-loss 2>/dev/null; node prisma/seed.js 2>/dev/null; node .next/standalone/server.js"]
