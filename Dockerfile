FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tailwind.config.js ./
COPY jsconfig.json ./
COPY src ./src
COPY public ./public
EXPOSE 3000
CMD ["node","src/index.js"]