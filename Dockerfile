# ใช้ Node.js เป็น base image
FROM node:14

# ตั้ง working directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมด
COPY . .

# สร้างโปรเจกต์ React
RUN npm run build

# เปิดพอร์ตที่แอปจะทำงาน
EXPOSE 3000

# รันแอป
CMD ["npm", "start"]
