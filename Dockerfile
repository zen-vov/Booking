# Используем образ Node.js версии 18.17.0
FROM node:18.17.0-alpine

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Открываем порт, который используется Next.js (по умолчанию 3000)
EXPOSE 3000

# Команда для запуска Next.js приложения
CMD ["npm", "run", "dev"]
