FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Khởi chạy ứng dụng khi container chạy
CMD ["npm", "start"]