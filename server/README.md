# FASH Backend

This directory contains the backend services for the **FASH** application.

---

## Prerequisites

- Node.js (>=18) and npm
- MongoDB (local or cloud)
- Docker and Docker Compose (optional)
- Git

---

## Getting Started

1. Clone the repository and navigate into the backend directory:

```bash
git clone <repository-url>
cd server
```

2. Copy the example environment file and customize it with your credentials/settings:

```bash
cp .env.example .env
```

3. **Install dependencies:**

```bash
npm install
```

4. **Start the backend server in development mode:**

```bash
npm run dev
```

5. Access the services:

- **API Base:** `http://localhost:4000/api/v1`
- **Swagger UI:** `http://localhost:4000/docs`
- **MongoDB:** `localhost:27017`

---

## Optional: Docker Setup

Build and run the backend with Docker:

```bash
docker build -t fash-backend .
docker run -p 4000:4000 --env-file .env fash-backend
```

---

## Services Overview

- **express-api**: REST API for authentication and user management
- **mongodb**: Database for users and related data
- **swagger-ui**: API documentation and testing

---

## Build & Push Docker Image (Optional)

```bash
docker login <your-docker-registry>
docker buildx build --platform linux/amd64,linux/arm64 -t <your-docker-registry>/fash-backend:latest --push .
```

---

## API Documentation

All routes are documented via **Swagger**:

- **Auth Routes:** `/auth/register`, `/auth/login`, `/auth/logout`, `/auth/refresh`, `/auth/me`, `/auth/change-password`, `/auth/verify-email`,`/auth/upload`
- **User Routes:** `/users`, `/users/:id`, `/users/me`

Access Swagger UI at: `http://localhost:4000/docs`

---

## Project Structure

```
src/
├─ controllers/       # Route handlers (Express request handlers)
│   ├─ auth.controller.ts
│   └─ user.controller.ts
│
├─ services/          # Business logic (calls repositories, processes data)
│   ├─ auth.service.ts
│   └─ user.service.ts
│
├─ repositories/      # DB access (mongoose queries)
│   └─ auth.repository.ts
│
├─ models/            # MongoDB schemas
│   └─ user.model.ts
│
├─ middlewares/       # Middleware (auth, error handling, validators)
│   ├─ auth.middleware.ts
│   ├─ error.middleware.ts
│   └─ upload.middleware.ts
│
├─ schemas/           # Request validation (Zod or Joi)
│   └─ auth.schema.ts
│
├─ utils/             # Utilities (JWT, cookies, AppError, email, etc.)
│   ├─ jwt.ts
│   ├─ cookie.ts
│   └─ appError.ts
│
├─ docs/              # Swagger/OpenAPI docs
│   └─ auth.docs.ts
│
├─ routes/            # Express route definitions
│   ├─ auth.routes.ts
│   └─ user.routes.ts
│
├─ config/            # Environment/config files
│   └─ db.ts
│
├─ app.ts             # Express app entrypoint
└─ swagger.ts         # Swagger setup and config

```

---

## Scripts

```bash
npm run dev       # Start dev server (ts-node + nodemon)
npm run build     # Compile TypeScript
npm start         # Start compiled JS server
```

---

## License

MIT License
