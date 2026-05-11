#Sử dụng node image 
FROM node:18-alpine

#Tạo thư mục làm việc
WORKDIR /app

#Copy package.json và package-lock.json vào container
COPY package*.json ./
RUN npm install

#Copy toàn bộ mã nguồn vào container
COPY . .

#Expose cổng 7001
EXPOSE 7000

#Chạy ứng dụng
CMD ["npm", "start"]