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

## 3) Deploy (single service approach)

Use any Node hosting platform (Railway, Render, Fly.io, VPS, etc.) and deploy from `uber-video/Backend`.

Build command:

- `cd ../frontend && npm install && npm run build && cd ../Backend && npm install`

Start command:

- `npm start`

Required environment variables on the platform:

- `PORT` (platform usually injects this automatically)
- `DB_CONNECT`
- `JWT_SECRET`
- `GOOGLE_MAPS_API`
- `CORS_ORIGIN` (set to your deployed app URL, comma-separated if multiple origins)

## 4) Post-deploy checks

1. Open your deployed URL.
2. Test signup/login for user and captain.
3. Verify map suggestions and fare APIs.
4. Confirm real-time updates (Socket.IO) are working.
