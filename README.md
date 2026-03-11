# 📚 Backend Study Lyson

Backend API cho nền tảng học tập **Study Lyson** — được xây dựng với **NestJS**, **Prisma ORM** và **PostgreSQL** (AWS RDS).

---

## 🧰 Tech Stack

| Công nghệ                                                       | Phiên bản | Mô tả                        |
| --------------------------------------------------------------- | --------- | ---------------------------- |
| [NestJS](https://nestjs.com/)                                   | ^11.0     | Framework Node.js chính      |
| [Prisma ORM](https://www.prisma.io/)                            | ^7.4      | Truy vấn và quản lý database |
| [PostgreSQL](https://www.postgresql.org/)                       | —         | Database (AWS RDS)           |
| [JWT](https://jwt.io/)                                          | —         | Xác thực người dùng          |
| [Passport.js](http://www.passportjs.org/)                       | ^0.7      | Middleware authentication    |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js)            | ^6.0      | Mã hóa mật khẩu              |
| [class-validator](https://github.com/typestack/class-validator) | ^0.15     | Validation DTO               |
| TypeScript                                                      | ^5.7      | Ngôn ngữ lập trình           |

---

## 📁 Cấu trúc thư mục

```
backend/
├── prisma/
│   ├── schema.prisma          # Định nghĩa schema database
│   └── prisma.service.ts      # Prisma client service
├── src/
│   ├── auth/                  # Module xác thực
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── common/
│   │   └── filters/           # Global interceptors & exception filters
│   ├── generated/             # Prisma generated types
│   ├── app.module.ts          # Root module
│   └── main.ts                # Entry point
├── test/                      # E2E tests
├── .env                       # Biến môi trường (không commit)
├── nest-cli.json
├── tsconfig.json
└── package.json
```

---

## ⚙️ Yêu cầu hệ thống

- **Node.js** >= 18.x
- **npm** >= 9.x
- **PostgreSQL** (hoặc kết nối tới AWS RDS)

---

## 🚀 Cài đặt & Chạy dự án

### 1. Clone repository

```bash
git clone <repository-url>
cd backend-study-lyson/backend
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình biến môi trường

Tạo file `.env` tại thư mục gốc và điền các giá trị sau:

```env
# PostgreSQL Connection
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=no-verify"

# JWT Secrets
JWT_ACCESS_SECRET="your_access_secret_here"
JWT_REFRESH_SECRET="your_refresh_secret_here"

# Server Port (tùy chọn, mặc định 3001)
PORT=3001
```

> ⚠️ **Lưu ý:** Không commit file `.env` lên Git. File này đã được thêm vào `.gitignore`.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Chạy migration database (nếu cần)

```bash
npx prisma migrate dev
```

### 6. Khởi động server

```bash
# Development (hot reload)
npm run start:dev

# Production
npm run start:prod

# Debug mode
npm run start:debug
```

Server sẽ chạy tại: **http://localhost:3001**

---

## 🗄️ Database Schema

Dự án sử dụng **PostgreSQL** với các model chính:

| Model                  | Mô tả                                   |
| ---------------------- | --------------------------------------- |
| `User`                 | Người dùng (có xp, streak_days)         |
| `Subject`              | Môn học                                 |
| `Lesson`               | Bài học thuộc môn học                   |
| `Exercise`             | Bài tập thuộc bài học                   |
| `ExerciseOption`       | Đáp án cho bài tập                      |
| `UserExerciseProgress` | Tiến độ làm bài tập của user            |
| `UserLessonProgress`   | Tiến độ hoàn thành bài học của user     |
| `Tutor`                | Gia sư (có đánh giá, trạng thái online) |
| `ChatRoom`             | Phòng chat giữa user và tutor           |
| `Message`              | Tin nhắn trong phòng chat               |
| `XpLog`                | Lịch sử nhận điểm kinh nghiệm           |
| `StudyLog`             | Lịch sử học tập theo ngày               |

---

## 🔐 API Endpoints

### Auth

| Method | Endpoint         | Mô tả                 | Auth |
| ------ | ---------------- | --------------------- | ---- |
| `POST` | `/auth/register` | Đăng ký tài khoản     | ❌   |
| `POST` | `/auth/login`    | Đăng nhập, trả về JWT | ❌   |

#### `POST /auth/register`

**Request Body:**

```json
{
  "name": "Nguyễn Văn A",
  "username": "nguyenvana",
  "email": "nguyenvana@example.com",
  "password": "matkhau123"
}
```

**Response:**

```json
{
  "id": 1,
  "name": "Nguyễn Văn A",
  "username": "nguyenvana",
  "email": "nguyenvana@example.com",
  "xp": 0,
  "streak_days": 0,
  "created_at": "2026-03-11T07:00:00.000Z"
}
```

---

#### `POST /auth/login`

**Request Body:**

```json
{
  "email": "nguyenvana@example.com",
  "password": "matkhau123"
}
```

**Response:**

```json
{
  "access_token": "<jwt_access_token>",
  "refresh_token": "<jwt_refresh_token>",
  "user": {
    "id": 1,
    "email": "nguyenvana@example.com",
    "name": "Nguyễn Văn A"
  }
}
```

> **Access Token** hết hạn sau `15 phút`.  
> **Refresh Token** hết hạn sau `7 ngày`.

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# Unit tests (watch mode)
npm run test:watch

# Test coverage
npm run test:cov

# End-to-end tests
npm run test:e2e
```

---

## 🛠️ Scripts hữu ích

```bash
# Format code với Prettier
npm run format

# Lint & tự động fix lỗi
npm run lint

# Build production
npm run build

# Xem Prisma Studio (UI quản lý database)
npx prisma studio
```

---

## 🌐 CORS

Backend đã cấu hình CORS cho phép frontend tại:

```
http://localhost:3000
```

Để thay đổi, chỉnh sửa trong `src/main.ts`:

```typescript
app.enableCors({
  origin: 'http://localhost:3000', // ← Thay đổi tại đây
  credentials: true,
});
```

---

## 📝 Quy ước Response

Mọi response đều được chuẩn hóa qua `TransformInterceptor`:

```json
{
  "statusCode": 200,
  "data": { ... },
  "timestamp": "2026-03-11T07:00:00.000Z"
}
```

Lỗi được xử lý tập trung qua `AllExceptionsFilter`:

```json
{
  "statusCode": 400,
  "message": "Thông báo lỗi",
  "error": "Bad Request"
}
```

---

## 👤 Tác giả

**Bui Van Chau** — [@buivanchau](https://github.com/buivanchau)

---

## 📄 License

Project này là **UNLICENSED** — chỉ dùng cho mục đích nội bộ.
