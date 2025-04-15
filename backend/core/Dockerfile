FROM node:20

WORKDIR /app

COPY . .

# Устанавливаем зависимости
RUN yarn

# Генерируем Prisma client
RUN npx prisma generate

# Билдим проект, если используешь TypeScript
RUN yarn build

# CMD: применяем миграции и запускаем сервер
CMD npx prisma migrate deploy && yarn start:prod
