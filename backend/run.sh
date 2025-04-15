#!/bin/bash

ENV_FILE=".env"
BUILD_FLAG=""
LIGHT_MODE=false

while [[ "$#" -gt 0 ]]; do
  case "$1" in
    --env-file)
      ENV_FILE="$2"
      shift 2
      ;;
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

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Файл $ENV_FILE не найден!"
  exit 1
fi

if $LIGHT_MODE; then
  echo "🚀 Запуск в лёгком режиме (только core, redis, postgres)..."
  docker compose --env-file "$ENV_FILE" up $BUILD_FLAG core redis postgres
else
  echo "✅ Запуск всех сервисов..."
  docker compose --env-file "$ENV_FILE" up $BUILD_FLAG
fi
