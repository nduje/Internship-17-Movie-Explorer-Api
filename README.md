# Movie Explorer API

### DUMP Internship - NestJS #1

## Task

**Movie Explorer API** is a NestJS + Prisma + PostgreSQL backend designed to replace the local mock data previously used in the **[Movie Explorer frontend](https://github.com/nduje/Internship-15-Movie-Explorer)** application.

The API serves movies, genres, and favorites directly from a PostgreSQL database.

The goal of this task is to build a clean, modular backend that integrates with the existing frontend and supports searching, sorting, filtering, and managing favorite movies.

## Features

**Backend Architecture**

- NestJS project with modular structure (module, controller, service per resource)
- Prisma ORM used for database access
- DTO validation and `ParseIntPipe` for ID parameters
- CRUD endpoints implemented for all resources
- Swagger documentation for all endpoints

**Entities**

- `Movie` entity containing fields used on the frontend (title, year, rating, description, poster URL, etc.)
- `Genre` entity with a many-to-many relationship to `Movie`
- `Favorite` entity referencing a `Movie`

**Database**

- PostgreSQL database running through Docker
- Prisma schema defining all models and relations
- Seed script populates the database with 20+ movies
- Each movie contains at least one associated genre

**Frontend Integration**

- Frontend requests now target the local API instead of mock data
- Favorites are stored in the database instead of `localStorage`
- Search, sorting, and filtering handled through query parameters (`/movies?search=batman&sort=rating&genre=action`)
- Genre dropdown populated from `GET /genres`
- Loading, error, and empty states remain handled on the frontend
- Using **React Query** (`@tanstack/react-query`) for API calls instead of manual fetching

## Setup

1. Clone repository (`git clone <repository-url>`)
2. Install dependencies (`npm install`)
3. Start PostgreSQL with Docker
4. Run Prisma migrations (`npx prisma migrate dev`)
5. Seed the database

```bash
npm install -D tsx typescript @types/node
npx prisma db seed
```

6. Start the development server (`npm run start:dev`)
7. Access Swagger documentation (`http://localhost:3000/api`)
