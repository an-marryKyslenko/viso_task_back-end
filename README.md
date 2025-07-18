# FlavorAI Backend

The backend API for FlavorAI — a secure recipe-sharing platform. Built with **NestJS**, it handles user authentication, recipe data, and comments with clean architecture and cookie-based auth.

## DEMO

Link to demo [FlavorAI](https://flavorai.vercel.app/)

## Tech Stack

- NestJS
- TypeORM / Prisma
- PostgreSQL
- CookieParser + Guards
- HTTP-only cookie-based JWT auth

##  Authentication Flow

- Login → sets `access_token` & `refresh_token` as HTTP-only cookies
- Protected routes → validated via `AuthGuard`
- `/auth/refresh` → refreshes access token
- `onDelete: Cascade` → Comments are deleted when user or recipe is removed

## Getting Started

1. Clone the repo:
```bash
git clone https://github.com/yourusername/viso_task_back-end.git
```
2. Install dependencies:

```bash
npm install
```

3. Set up .env:

```env
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key
CLIENT_SITE=http://localhost:3000
```

4. Run server:

```bash
npm run start:dev
```

## Migration
Create and apply migrations using Prisma:

```bash
npx prisma migrate dev --name init
```

For deployment:

```bash
npx prisma migrate deploy
```

## API Endpoints

- POST /auth/login

- POST /auth/refresh

- GET /auth/whoami

- GET /recipes

- POST /comments

DELETE /comments/:id

## Deployment
- Hosted on Render

- Enable CORS:

```ts
app.enableCors({
  origin: process.env.CLIENT_SITE,
  credentials: true,
});
```