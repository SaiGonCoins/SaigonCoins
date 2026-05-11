#Sử dụng node image chính thức
FROM node:18-alpine

#Tạo thư mục làm việc
WORKDIR /app

#Copy package.json và package-lock.json vào container
COPY package*.json ./
RUN npm install

#Copy toàn bộ mã nguồn vào container
COPY . .

#Expose cổng 3000
EXPOSE 3000

#Chạy ứng dụng
CMD ["npm", "run", "dev"]