# 🛒 Shopee-clone Backend API

##### :arrow_right: [English ](./README.en.md)

## 📖 Giới Thiệu
Chào mừng đến với dự án **Shopee-clone Backend API**! Đây là một RESTful API mạnh mẽ, linh hoạt, sẵn sàng cho môi trường sản xuất được xây dựng bằng TypeScript, Express, và TypeORM với kiến trúc module hóa rõ ràng được hỗ trợ bởi Awilix cho việc quản lý Dependency Injection.

## 🚀 Tính Năng
- **Dependency Injection (Awilix)**: Quản lý các module một cách độc lập, dễ dàng thay thế hoặc mở rộng.
- **Xác Thực & Phân Quyền (Authentication & Authorization)**: Hỗ trợ xác thực JWT với kiểm soát quyền hạn theo vai trò người dùng.
- **Hiệu Năng Cao**: Sử dụng `compression`, `helmet`, và `express-rate-limit` để tăng cường bảo mật và tối ưu hóa.
- **Xử Lý Media**: Tải lên và tối ưu hóa hình ảnh với **Cloudinary & Sharp**.
- **Giao Dịch Cơ Sở Dữ Liệu (Transactions)**: Được quản lý mượt mà nhờ TypeORM.
- **Hệ Thống Logging**: Ghi log tập trung với Winston giúp theo dõi lỗi và kiểm soát trạng thái hiệu quả.
- **Tài Liệu API (Swagger)**: Tự động tạo và truy cập tại `/api-docs`.
- **Kiểm Thử & Xử Lý Lỗi Toàn Diện**: Tích hợp middleware tùy chỉnh để xử lý lỗi.
- **Tương Thích Hoàn Toàn Với Frontend**: Tích hợp tốt với ứng dụng frontend Shopee-clone.

---

## 🔗 Demo & Tài Liệu API
- **Tài Liệu API**: [Swagger UI](https://shopee-clone-be.onrender.com/api-docs)
- **Ứng Dụng Frontend**: [Shopee-clone Frontend](https://shopee-reactjs-zeta.vercel.app/) (from [***ductaip***](https://github.com/CNTT-UTH/Shopee-Clone-FE))

---

## 📂 Cấu Trúc Thư Mục Dự Án
```
/src
│
├── config/               # Cấu hình chung (ORM, Logger)
├── constants/            # Các hằng số & enums của ứng dụng
├── controllers/          # Bộ điều khiển định tuyến Express
├── dbs/                  # Cấu hình & khởi tạo cơ sở dữ liệu
├── middlewares/          # Các middleware tùy chỉnh (xử lý lỗi, xác thực, ...)
├── models/               # Định nghĩa DTO, Entities của TypeORM
├── repository/           # Tầng truy cập dữ liệu (TypeORM Repositories)
├── routes/               # Khai báo các tuyến API
├── services/             # Tầng logic nghiệp vụ (sử dụng Awilix DI)
└── utils/                # Các tiện ích bổ trợ
```

---

## 📌 Công Nghệ Sử Dụng
- **Ngôn Ngữ**: TypeScript
- **Framework**: Express
- **Cơ Sở Dữ Liệu**: MariaDB (qua TypeORM)
- **Dịch Vụ Đám Mây**: Cloudinary (Upload hình ảnh), Sharp (Xử lý & tối ưu hóa hình ảnh)
- **Dependency Injection**: Awilix
- **Ghi Log**: Winston
- **Bảo Mật**: Helmet, Rate Limiting, JWT Authentication
- **Tài Liệu API**: Swagger

---

## 🛠 Cài Đặt & Chạy Ứng Dụng
```bash
# Clone repository
$ git clone https://github.com/your-backend-repo.git

# Cài đặt các phụ thuộc
$ npm install

# Tạo file .env dựa theo .env.example

# Chạy migrations
$ npm run migration:run

# Seed cơ sở dữ liệu
$ npm run seed:run

# Chạy ứng dụng
$ npm run dev
```

---

## 📌 Biến Môi Trường (.env)
```env
PORT=3004
FRONTEND_URL=http://localhost:3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=shopee_clone
JWT_SECRET=your_jwt_secret
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
```

---

## 🤝 Đóng Góp
Mọi đóng góp đều được hoan nghênh! Hãy mở issues hoặc gửi pull requests để cùng cải thiện dự án.

---

## 📜 Bản Quyền
Dự án này được phát hành dưới giấy phép MIT.

