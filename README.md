# EnerLuma

Energy & Water monitoring platform – React frontend + Node.js/Express backend.

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18 |
| npm | ≥ 9 |
| MongoDB | ≥ 6 (local) **or** a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster |

---

## Quick Start

### 1. Install all dependencies

```bash
npm install          # installs concurrently at the root
npm run install:all  # installs backend and frontend dependencies
```

### 2. Configure the backend

Copy the example environment file and fill in your values:

```bash
cp backend/server/.env.example backend/server/.env
```

Required variables (the rest have sensible defaults for local dev):

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Random secret string for signing JWT tokens |

Optional OAuth variables (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, etc.) can be left blank to disable social login.

### 3. Seed the database (optional)

```bash
npm run seed
```

### 4. Run both servers at once

```bash
npm run dev
```

This starts:
- **Backend** – Express API on <http://localhost:5000>
- **Frontend** – Vite dev server on <http://localhost:5173>

The Vite dev server proxies `/api/*` requests to the backend, so you only ever open the frontend URL in your browser.

---

## Running them separately

**Backend only**

```bash
cd backend/server
npm run dev
```

**Frontend only**

```bash
cd frontend
npm run dev
```

---

## Project Structure

```
EnerLuma/
├── backend/
│   └── server/        # Express API (Node.js ESM)
├── frontend/          # React + Vite + Tailwind CSS
└── package.json       # Root scripts (concurrently)
```

See [`backend/server/README.md`](backend/server/README.md) for the full API reference.
