# === Базовый образ ===
FROM node:20 AS base
WORKDIR /app
ENV NODE_ENV=production

# === Установка зависимостей (будет использоваться и в dev и в prod) ===
FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# === Сборка (для продакшена) ===
FROM deps AS build
COPY . .
RUN npx prisma generate
RUN yarn build

# === Финальный образ для продакшена ===
FROM node:20 AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app .
CMD npx prisma migrate deploy && yarn start:prod

# === Dev-режим ===
FROM node:20 AS dev
WORKDIR /app
ENV NODE_ENV=development

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN rm -rf node_modules/.prisma
RUN rm -rf node_modules/@prisma/client
RUN npx prisma generate

CMD yarn start:dev
