# SaaS Admin Dashboard — Backend

A Node.js + Express REST API for managing organizations, products, orders, and analytics with multi-tenant architecture and role-based access control.

## Tech Stack

| Tool | Purpose |
|------|---------|
| Node.js + Express | Server framework |
| TypeScript | Type safety |
| Prisma ORM | Database access |
| PostgreSQL | Database |
| Zod | Request validation |
| JWT | Authentication |
| bcrypt | Password hashing |

## Features

**Authentication**
- Short-lived JWT access tokens
- Refresh tokens stored in httpOnly cookies
- Automatic token rotation
- Secure cookie settings for cross-origin

**RBAC**
- Roles: `ADMIN`, `MANAGER`
- Middleware-based role enforcement per route

**Multi-Tenant Organization System**
- All data scoped to an organization
- `orgId` injected via `X-Org-Id` header
- Membership verified on every request

**Products**
- Create and list products
- Stock and pricing management

**Orders**
- Create orders with multiple items
- List with pagination and status filtering
- Status transitions: `PENDING` → `COMPLETED` / `CANCELLED`

**Analytics**
- Total revenue, order count, average order value
- Daily revenue and order trends
- Top selling products
- Optional date range filtering

**Validation**
- Zod schemas on all endpoints
- Validated data attached to `req.validated`

## Getting Started
```bash
npm install
npm run dev
```

## Environment Variables
```env
DATABASE_URL=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Database Setup
```bash
npx prisma migrate dev
npx prisma generate
```

## Project Structure
```
src/
├── controllers/    # Request handlers
├── services/       # Business logic
├── routes/         # Route definitions
├── middlewares/    # Auth, org, role, validation
├── schemas/        # Zod validation schemas
└── lib/            # Prisma client, utilities
```

## Architecture

Follows a strict **Controller → Service → Database** pattern.

- Controllers handle HTTP request/response
- Services contain all business logic
- Prisma handles all DB access
- Errors flow through a centralized async error handler

## API Routes

| Method | Route | Access |
|--------|-------|--------|
| POST | `/auth/register` | Public |
| POST | `/auth/login` | Public |
| POST | `/auth/refresh` | Public |
| POST | `/auth/logout` | Private |
| GET | `/orgs` | Private |
| GET/POST | `/products` | ADMIN, MANAGER |
| GET/POST | `/orders` | ADMIN, MANAGER |
| PATCH | `/orders/:id/completed` | ADMIN, MANAGER |
| PATCH | `/orders/:id/cancel` | ADMIN, MANAGER |
| GET | `/analytics/revenue` | ADMIN |
| GET | `/analytics/revenue/daily` | ADMIN |
| GET | `/analytics/top-products` | ADMIN |

## Deployment

Hosted on Railway with PostgreSQL on Neon. CORS configured for the Vercel frontend domain.
