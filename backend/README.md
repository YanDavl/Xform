## Стек

Nest, redis, prisma, postgres

## Запуск сервиса

Прежде всего

- Установить [Docker Desktop](https://www.docker.com/get-started/)
- Установить внутренние зависимости (лучше установить yarn, с npm могут быть проблемы)

```bash
$ yarn install
```

- Запустить Docker Desktop
- Затем в консоли прописать

Поднятие докер контейнеров

```bash
docker compose up -d
```

Запуск самого приложения

```bash
# Режим разработки, код подхватывает изменения
$ yarn run start:dev

# Прод режим
$ yarn run start:prod
```
