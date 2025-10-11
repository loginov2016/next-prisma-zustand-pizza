#!/bin/bash

# Ждем, пока база данных будет доступна на порту 5432
until nc -z -v -w30 postgres_db 5432; do
  echo "Waiting for database connection..."
  sleep 1
done

# Когда база данных доступна, выполняем миграции и запускаем приложение
echo "Database is up, running prisma db push"
npx prisma db push

echo "Database is up, running prisma db seed"
npx prisma db seed

# Запускаем приложение
echo "Database is ready, starting the app в development mode!"
npm run dev