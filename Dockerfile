FROM node:20.19.0-alpine

# Установим bash, чтобы выполнять необходимые скрипты
RUN apk add --no-cache bash

# Устанавливаем рабочую директорию
WORKDIR /frontend

# Открываем порт 3000
EXPOSE 3000

# Копируем весь исходный код
COPY . .

# Устанавливаем зависимости
RUN npm install

# Генерируем Prisma клиент
RUN npx prisma generate

# Собираем приложение
RUN npm run build

# Копируем скрипт ожидания и даем ему права на выполнение
COPY wait-for-db.sh /frontend/wait-for-db.sh
RUN chmod +x /frontend/wait-for-db.sh

# Запуск скрипта ожидания базы данных перед стартом приложения
CMD ["/bin/bash", "/frontend/wait-for-db.sh"]