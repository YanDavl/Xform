## Стек

- Сервис Форм и Авторизации: Nest, postgres, prisma, redis

- Сервис генерации Форм с AI: go, chi router, testify

## Запуск сервисов

- Установить [Docker Desktop](https://www.docker.com/get-started/)
- Запустить Docker Desktop
- Установить свой .env в core и ai папки (смотри .env.example)

Первичная установка - флаг build

```bash
$ ./run.sh --build
```

Последующие старты:

```bash
$ ./run.sh
```

## Полезное

Старт без LLM (Меньше нагрузка на хост):

```bash
$ ./run.sh --light
```

```

```
