#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "⚠️  Укажи имя миграции, например: ./create-migration.sh add_users_table"
  exit 1
fi

MIGRATION_NAME=$1

echo "📦 Создаём миграцию в контейнере..."
docker compose exec core sh -c "
  cd /app && \
  npx prisma migrate dev --name $MIGRATION_NAME --schema=prisma/schema.prisma
"

echo "🔄 Генерация Prisma Client на хосте..."
npx prisma generate --schema=prisma/schema.prisma

echo "✅ Миграция '$MIGRATION_NAME' завершена и Prisma Client обновлён"
