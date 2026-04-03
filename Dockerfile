FROM node:18-alpine

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN npx prisma generate
RUN npm run build

CMD ["sh", "-c", "npx prisma db push --accept-data-loss 2>/dev/null; npm run seed 2>/dev/null; npx next start"]
