FROM node:alpine

WORKDIR /app

# Копируем package.json отдельно для кэширования
COPY package*.json ./
RUN npm install

# Копируем остальные файлы
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]