# construction-work-journal

Разработка внутренних инструментов для строительной сферы. Тестовое задание («Журнал работ на строительном объекте»).

## Стек

- **Mise** - менеджер платформ, для контроля версий Node.js, python и т.д.
- **pnpm** - пакетный менеджер, компактный, не засоряет систему модулями.
- **prisma** - ORM;
- **antd** - готовая и удобная компонентная база;
- **zod** - в качестве валидатора;

## Установка

```sh
# Клонируем проект
git clone https://github.com/n1k2100/construction-work-journal
```

```sh
# Если у Вас в качестве менежера платформ используется mise, то необходимо одобрить данный проект
mise trust
```

```sh
# Устанавливаем необходимые зависимости
pnpm i
```

```sh
# Предзаполняем .env файлы по примерам, обязательно указывая DATABASE_URL
DATABASE_URL=mysql://root:mysql@localhost:3306/construction-work-journal
```

```sh
# Осуществляем деплой
pnpm --filter construction-work-journal-backend exec prisma migrate deploy
```

```sh
# При необходимости используем seed.ts
pnpm --filter construction-work-journal-backend exec -- tsx --env-file=.env ./prisma/seed.ts
```

## Запуск

```sh
# Запуск только backend
pnpm --filter construction-work-journal-backend exec start:dev
```

```sh
# Запуск frontend
pnpm --filter construction-work-journal-frontend exec dev
```

```sh
# При необходимости ознакомиться с БД
pnpm --filter construction-work-journal-backend exec prisma studio
```

## Развертывание

```sh
# Вариант запуска для Docker
docker compose up -d
```

```sh
# Вариант запуска для Podman
podman compose up -d
```

## Ссылки

> Если не менять дефолтных значений, то по данным ссылкам можно будет удобно перейти на интересующие Вас страницы.

- [**Swagger**](http://localhost:3390/api/docs)
- [**Клиент**](http://localhost:3391/)

## Вложения

### Схема БД

![Схема БД](image.png)

### Журнал работ

![Журнал работ](image-1.png)

### Виды работ

![Справочник видов работ](image-2.png)

### Сотрудники

![Справочник сотрудников](image-3.png)

### Редактирование/создание работ

![Редактирование и/или создание работ](file.gif)

### Клиент

## Известные проблемы

1. При использовании `podman` в образах промежуточные шаги остаются в виде мусора около ~2ГБ. Для пользователей `docker` это будет незаметно, т.к. эти следы подчищает `buildkit`. Итоговые образы: клиент ~78МБ, сервер: ~570МБ. Большие размеры серверной части связаны с наличием в ней Prisma. По-хорошему, деплой лучше делать отдельной стадией, но в целях экономии времении, деплой делается на этапе сборки сервера.
