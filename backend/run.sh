#!/bin/bash

BUILD_FLAG=""
LIGHT_MODE=false

while [[ "$#" -gt 0 ]]; do
  case "$1" in
    --build)
      BUILD_FLAG="--build"
      shift
      ;;
    --light)
      LIGHT_MODE=true
      shift
      ;;
    *)
      echo "⚠️  Неизвестный аргумент: $1"
      exit 1
      ;;
  esac
done

### Считаем, что если node_modules не существует, то это первая установка
if [ ! -d "core/node_modules" ]; then
  echo "📦 Установка зависимостей в backend/core..."
  (cd core && yarn && npx prisma generate)
fi

if $LIGHT_MODE; then
  echo "🚀 Запуск в лёгком режиме (только core, redis, postgres)..."
  docker compose up $BUILD_FLAG core redis postgres
else
  echo "✅ Запуск всех сервисов..."
  docker compose up $BUILD_FLAG
fi
