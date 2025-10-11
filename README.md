# Приложение интерент магазин Super Pizza созданно при помощи: Next.JS, TypeScript, ORM Prisma, DB PostgreSQL и Zustand в учебных целях

Проект с использованием [Next.js](https://nextjs.org) был запущен при помощи утилиты [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)

## Доступные скрипты

В каталоге проекта вы можете запустить следующие скрипты:

### npm run dev

Запускает приложение в режиме development
Откройте [http://localhost:3000](http://localhost:3000), чтобы просмотреть его в браузере.

### npm run build

Создает оптимизированную сборку приложения в режиме production.

### npm run start

Запускает придложение в режиме production, но в начале приложение должно быть собрано при помощи команды: npm run build 

### npm run lint

Запускает ESLint для всех файлов в каталогах

### npm run postinstall

Генерирует клиента Призмы на основе файла schema.prisma

### npm run prisma:push

Пушит схемы Призмы в Базу Данных PostgreSQL

### npm run prisma:seed

(Сидинг) Наполняет Базу Данных PostgreSQL начальными(фиктивными) данными

### npm run prisma:studio

Запускает приложение для управления Базой Данных

### Для развертывания приложения потребуется выполнить следующие шаги:

1. Установить и настроить базу данных PostgreSQL,это можно сделать через контейнер Postgres в Docker.
   В корне проекта есть файл docker-compose.yml, его можно запустить без фронтендной части, выполнив
   команду: docker-compose up -d после чего запустятся два контейнра: postgres_db и adminer в сети
   postgres_db-network. Доступ к БД Postgres через Adminer можно получить по адресу: localhost:8080 
   и ввести следующие данные для БД:
    Движок:           PostgreSQL
    Сервер:           postgres_db
    Имя пользователя: admin
    Пароль:           admin
    База данных:      postgres_db
2. В терминале выполнить команду: npm run postinstall
   для генерации клиента призмы.
3. Следующей командой: npm run prisma:push запушить схемы Призмы в БД PostgreSQL

