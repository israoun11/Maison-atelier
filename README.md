# Atelier Maison — Full-stack website

Luxury interior architecture studio website (fictional). React + TypeScript + Vite + Tailwind frontend, Node/Express + MongoDB + JWT backend, admin dashboard.

```
Atelier-Maison/
├── frontend/   React app (port 5173)
├── backend/    Express API (port 5000, prefix /api/v1)
├── postman/    Atelier-Maison-API.postman_collection.json
└── README.md
```

## Setup

### 1. Backend (terminal 1, inside `Atelier-Maison/backend`)
```bash
npm install
cp .env.example .env        # Windows PowerShell: copy .env.example .env
```
Edit `backend/.env`: set `MONGODB_URI`, a long random `JWT_SECRET`, and your own `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
Generate a secret: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`

```bash
npm run seed    # creates the admin + 5 projects + 4 services (safe to re-run)
npm run dev     # API on http://localhost:5000/api/v1
```

### 2. Frontend (terminal 2, inside `Atelier-Maison/frontend`)
```bash
npm install
cp .env.example .env        # Windows PowerShell: copy .env.example .env
npm run dev                 # http://localhost:5173
```

Public site: http://localhost:5173 — Admin: http://localhost:5173/admin/login

### MongoDB
- **Atlas:** create a free cluster → Database Access: add a user → Network Access: allow your IP → Connect → Drivers → copy the string, replace `<password>`, and add a database name: `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/atelier-maison?retryWrites=true&w=majority`
- **Local:** `mongodb://127.0.0.1:27017/atelier-maison`

## Tests
```bash
cd backend
npm test                                  # unit tests (no database needed); integration tests are skipped
MONGODB_URI_TEST=mongodb://127.0.0.1:27017/atelier-maison-test npm test   # also runs integration tests
```
Use a throwaway database for `MONGODB_URI_TEST`. Windows PowerShell: `$env:MONGODB_URI_TEST="..."; npm test`.

Frontend: `npm run typecheck` and `npm run build`.

## Endpoints (prefix `/api/v1`)
| Method | Path | Auth |
|---|---|---|
| GET | /health | – |
| POST | /auth/login | – |
| GET | /auth/me | Admin |
| GET | /admin/stats | Admin |
| GET | /projects (`?category=&featured=true`) | – |
| GET | /projects/:id | – |
| GET | /projects/slug/:slug | – |
| POST | /projects | Admin |
| PUT | /projects/:id | Admin |
| DELETE | /projects/:id | Admin |
| GET | /services | – |
| GET | /services/:id | – |
| POST | /services | Admin |
| PUT | /services/:id | Admin |
| DELETE | /services/:id | Admin |
| POST | /contact | – (rate-limited) |
| GET | /contact (`?status=new\|read\|archived`) | Admin |
| GET | /contact/:id | Admin |
| PATCH | /contact/:id/status | Admin |
| DELETE | /contact/:id | Admin |

Admin routes need `Authorization: Bearer <token>`. There is no public registration route: the only admin is created by `npm run seed` from your `.env`.

## Postman
Import `postman/Atelier-Maison-API.postman_collection.json`. Set the collection variables `adminEmail` and `adminPassword` to the values in `backend/.env`, then run **1. Auth → Admin login** (it saves `{{token}}`). Recommended order: Health → Login → Projects (create → get by id/slug → update → delete) → Services → Contact (submit → get all → update status → delete).

## Images
Photos come from Unsplash. If one is ever removed, the site shows a neutral placeholder; replace its ID in `backend/src/scripts/seedData.js` (then `npm run seed`) or in `frontend/src/assets/images.ts`.
