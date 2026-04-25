# Deployment Guide

## 1) Prepare environment variables

Create these files before deployment:

- `frontend/.env`
- `Backend/.env`

Use the templates in:

- `frontend/.env.example`
- `Backend/.env.example`

## 2) Local production test

Run this once to verify production build works:

1. Build frontend:
   - `cd frontend`
   - `npm install`
   - `npm run build`
2. Run backend:
   - `cd ../Backend`
   - `npm install`
   - `npm start`
3. Open:
   - `http://localhost:3000`

The backend serves `frontend/dist` automatically in production mode.

## 3) Deploy from GitHub on Railway (single service)

This repository includes `railway.toml`, so Railway can use repo-level build/start commands directly.

1. Create project in Railway from GitHub repo.
2. Keep root directory as repository root (`uber-video`).
3. Railway uses:
   - Build: `cd frontend && npm install && npm run build && cd ../Backend && npm install`
   - Start: `cd Backend && npm start`

Required environment variables on the platform:

- `PORT` (platform usually injects this automatically)
- `DB_CONNECT`
- `JWT_SECRET`
- `GOOGLE_MAPS_API`
- `CORS_ORIGIN` (set to your deployed app URL, comma-separated if multiple origins)

Optional (only if you want explicit frontend envs):

- `VITE_BASE_URL`
- `VITE_API_URL`
- `VITE_GOOGLE_MAPS_API_KEY`

Note: if `VITE_BASE_URL`/`VITE_API_URL` are omitted, frontend uses relative API paths, which works for this single-service deployment.

## 4) Post-deploy checks

1. Open your deployed URL.
2. Test signup/login for user and captain.
3. Verify map suggestions and fare APIs.
4. Confirm real-time updates (Socket.IO) are working.
