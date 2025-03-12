# Shopee-clone Backend API

##### :arrow_right: [Vietnamese ](./README.md)


Welcome to the **Shopee-clone Backend API** project! This is a robust, scalable, and production-ready RESTful API built using TypeScript, Express, and TypeORM with a clean, modular architecture powered by Awilix for Dependency Injection.

## 🚀 Features
- **Dependency Injection (Awilix)**: Highly decoupled services with Awilix for Dependency Injection.
- **Authentication & Authorization**: JWT Authentication with role-based access control.
- **High Performance**: Middleware stack using `compression`, `helmet`, and `express-rate-limit` for security and optimization.
- **Media Handling**: Upload and optimize images with **Cloudinary & Sharp**.
- **Database Transactions**: Handled gracefully with TypeORM’s transaction management.
- **Logging System**: Centralized logging with Winston for efficient error tracking and debugging.
- **Swagger API Documentation**: Automatically generated and accessible at `/api-docs`.
- **Extensive Testing & Error Handling**: Includes custom error handling middleware.
- **Frontend Integration**: Fully compatible with the Shopee-clone frontend application.

---

## 🔗 Demo Links
- **API Documentation**: [Swagger UI](https://shopee-clone-be.onrender.com/api-docs)
- **Frontend Application**: [Shopee-clone Frontend](https://shopee-reactjs-zeta.vercel.app/) (from [***ductaip***](https://github.com/CNTT-UTH/Shopee-Clone-FE))

---


## 📂 Project Structure
```
/src
│
├── config/               # Configuration files (ORM, Logger)
├── constants/            # Application constants & enums
├── controllers/          # Express route controllers
├── dbs/                  # Database configuration & initialization
├── middlewares/          # Custom middlewares (error handling, authentication)
├── models/               # Request & Response DTOs, TypeORM Entities
├── repository/           # Data access layer (TypeORM Repositories)
├── routes/               # Route definitions
├── services/             # Business logic layer (using Awilix DI)
└── utils/                # Utility functions
```
---

## 📌 Tech Stack
- **Language**: TypeScript
- **Framework**: Express
- **Database**: MariaDB (via TypeORM)
- **Cloud Services**: Cloudinary (Image Uploads), Sharp (Image Optimization)
- **Dependency Injection**: Awilix
- **Logging**: Winston
- **Security**: Helmet, Rate Limiting, JWT Authentication
- **Documentation**: Swagger


---

## 🛠 Installation
```bash
# Clone the repository
$ git clone https://github.com/your-backend-repo.git

# Install dependencies
$ npm install

# Create a .env file following .env.example

# Run migrations
$ npm run migration:run

# Seed the database
$ npm run seed:run

# Start the application
$ npm run dev
```

---

## 📌 Environment Variables
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

## 🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📜 License
This project is licensed under the MIT License.

