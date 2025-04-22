#!/bin/bash
set -e

echo "🧹 Сбрасываем базу и применяем миграции..."

docker compose run --rm core sh -c "
  cd /app && \
  npx prisma migrate reset --force --skip-seed --schema=prisma/schema.prisma
"

echo "✅ База данных обнулена и миграции применены"
