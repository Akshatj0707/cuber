# Cuber Deployment Guide

## Overview
This repository contains a React frontend in `frontend/` and an Express backend in `Backend/`.

Netlify can host the frontend as a static site. The backend must be hosted separately because it requires Node.js, MongoDB, and server-side endpoints.

## Netlify frontend deployment
1. Push this repository to GitHub or another Git host.
2. Create a new site in Netlify and connect your repository.
3. Set the build settings:
   - Base directory: `frontend`
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
4. Add a site environment variable in Netlify:
   - `VITE_BASE_URL` = your backend URL (for example `https://your-backend-host.com`)
5. Deploy the site.
6. To support client-side routing, the `_redirects` file in `frontend/public/` is already configured.

## Backend deployment
The backend cannot be deployed directly to Netlify. Use one of these services:
- Render
- Railway
- Heroku
- Fly.io
- Vercel Serverless Functions (with additional refactor)

### Backend deployment checklist
- Deploy the Express server from `Backend/`.
- Use a hosted MongoDB database (MongoDB Atlas or similar).
- Configure required environment variables.
- Set the backend base URL in Netlify environment variables for the frontend.

### Recommended backend settings
- Root or build directory: `Backend`
- Install command: `npm install`
- Start command: `npm start`
- Node version: `18`

### Required backend environment variables
- `DB_CONNECT` = your MongoDB connection string
- `JWT_SECRET` = your JWT signing secret
- `PORT` = `3000` or the host-provided port
- `FRONTEND_URL` = your Netlify site URL, for example `https://cuber.netlify.app`

### Backend deployment files added
- `Backend/.env.example`
- `Backend/Procfile`
- `Backend/package.json` now includes `npm start`

### Connect frontend and backend
In Netlify, add this environment variable:
- `VITE_BASE_URL` = your backend URL

### Example Netlify setup
1. Create a Netlify site and connect this repository.
2. Set the build settings:
   - Base directory: `frontend`
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
3. Add Netlify environment variables for the backend URL.
4. Deploy.

## Local testing
### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd Backend
npm install
npm start
```

## Notes
- `netlify.toml` is configured for `frontend` deployment.
- `frontend/public/_redirects` handles client-side routing.
- `frontend/.env.example` shows how to configure the backend URL.
