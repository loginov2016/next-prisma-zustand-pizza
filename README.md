# Приложение интерент магазин Super Pizza созданно при помощи: Next.JS, TypeScript, ORM Prisma, DB PostgreSQL и State Management Zustand в учебных целях

Проект с использованием [Next.js](https://nextjs.org) был запущен при помощи утилиты [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)

## Доступные скрипты

В каталоге проекта вы можете запустить следующие скрипты:

### npm run dev

Запускает приложение в режиме development. Откройте [http://localhost:3000](http://localhost:3000), чтобы просмотреть его в браузере.

### npm run build

Создает оптимизированную сборку приложения в режиме production.

### npm run start

Запускает приложение в режиме production, но с начала приложение должно быть собрано при помощи команды: npm run build 

### npm run lint

Запускает ESLint для всех файлов в каталогах

### npm run postinstall

Генерирует клиента Призмы на основе файла schema.prisma

### npm run prisma:push

Пушит схемы Призмы в Базу Данных PostgreSQL

### npm run prisma:seed

(Сидинг) Наполняет Базу Данных PostgreSQL начальными(фиктивными) данными

### npm run prisma:studio

Запускает Prisma Studio — веб-интерфейс для управления данными в базе данных

### Для развертывания приложения потребуется выполнить следующие шаги:

1. Склонируйте мой репозиторий next-prisma-zustand-pizza себе в папку, и запустите команду: npm install<br>
2. Установить и настроить базу данных PostgreSQL, это можно сделать через контейнер postgres_db в Docker.<br>
   В корне проекта есть файл docker-compose.yml, его можно запустить без фронтендной части, выполнив<br>
   команду: docker-compose up -d после чего запустятся два контейнра: postgres_db и adminer в сети<br>
   postgres_db-network. Доступ к БД Postgres через Adminer можно получить по адресу: localhost:8080<br>
   и ввести следующие данные для БД:<br>

    <pre>
    Движок:           PostgreSQL,
    Сервер:           postgres_db,
    Имя пользователя: admin,
    Пароль:           admin,
    База данных:      postgres_db
    </pre>

3. В терминале выполнить команду: npm run postinstall для генерации клиента призмы.<br>
4. Следующей командой: npm run prisma:push запушить схемы Призмы в БД PostgreSQL в контейнере postgres_db докера.<br>
5. Следующая команда: npm run prisma:seed наполнит базу данных начальными данными.<br>
6. Следующая команда: npm run dev запустит приложение в режимер development по адресу: [http://localhost:3000](http://localhost:3000)<br>

