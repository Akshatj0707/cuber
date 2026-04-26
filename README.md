# Cuber Deployment Guide (Vercel + Railway)

## Overview
This repository contains a React frontend in `frontend/` and an Express backend in `Backend/`.

Vercel hosts the frontend as a static site. The backend is deployed separately on Railway because it requires Node.js, MongoDB, and server-side endpoints.

## Vercel frontend deployment
1. Push this repository to GitHub or another Git host.
2. Create a new project in Vercel and connect your repository.
3. Set the build settings:
   - Root directory: `frontend`
   - Build command: `npm install && npm run build`
   - Output directory: `dist`
4. Add a project environment variable in Vercel:
   - `VITE_BASE_URL` = your backend URL (for example `https://your-backend-host.com`)
5. Deploy the project.
6. To support client-side routing, the `_redirects` file in `frontend/public/` is already configured.

## Railway backend deployment
1. Create a new project in Railway and connect your repository.
2. Set the service root directory to `Backend`.
3. Railway will use:
   - Build command: `npm install`
   - Start command: `npm start`
4. Add the required environment variables listed below.
5. Deploy and copy the backend URL.

### Railway backend deployment checklist
- Deploy the Express server from `Backend/`.
- Use a hosted MongoDB database (MongoDB Atlas or similar).
- Configure required environment variables.
- Set the backend base URL in Vercel environment variables for the frontend.

### Recommended Railway settings
- Root directory: `Backend`
- Install command: `npm install`
- Start command: `npm start`
- Node version: `18`

### Required backend environment variables
- `DB_CONNECT` = your MongoDB connection string
- `JWT_SECRET` = your JWT signing secret
- `PORT` = `3000` or the host-provided port
- `CORS_ORIGIN` = your frontend URL(s), for example `https://your-project.vercel.app`
- `NODE_ENV` = `production`

### Backend deployment files added
- `Backend/.env.example`
- `Backend/Procfile`
- `Backend/package.json` now includes `npm start`

### Connect frontend and backend
In Vercel, add this environment variable:
- `VITE_BASE_URL` = your backend URL
- You can copy from `frontend/.env.vercel.example`

### Example Vercel + Railway setup
1. Create a Vercel project and connect this repository.
2. Set the build settings:
   - Root directory: `frontend`
   - Build command: `npm install && npm run build`
   - Output directory: `dist`
3. Add Vercel environment variables for the backend URL.
4. Create a Railway project from the same repository and set root directory to `Backend`.
5. Add Railway backend environment variables and deploy.
6. You can copy from `Backend/.env.railway.example`.

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
- `frontend/vercel.json` is configured for `frontend` deployment.
- `railway.toml` is configured for backend deployment on Railway.
- `.github/workflows/ci.yml` runs frontend build and backend install checks on push/PR.
- `.github/workflows/release.yml` auto-creates `vX.Y.Z` tags and GitHub releases after successful CI on `main`.
- `frontend/public/_redirects` handles client-side routing.
- `frontend/.env.vercel.example` and `Backend/.env.railway.example` provide deploy-ready env templates.

## Enforce CI before merge
To block merges unless CI passes, enable branch protection for `main` in GitHub:
1. Open your repository settings.
2. Go to Branches -> Add branch protection rule.
3. Branch name pattern: `main`.
4. Enable **Require a pull request before merging**.
5. Enable **Require status checks to pass before merging**.
6. Select these required checks:
   - `frontend-build`
   - `backend-install`

## Go live checklist
- Verify Railway service is healthy at `GET /health`.
- Confirm `CORS_ORIGIN` in Railway exactly matches your Vercel domain.
- Confirm `VITE_BASE_URL` in Vercel points to your Railway backend URL.
- Open your Vercel site and test sign up, login, map loading, and ride flow.
- Check browser console and Railway logs for runtime errors.
- Keep `main` protected and merge only when CI checks are green.

## Custom domain setup
### Vercel frontend domain
1. In Vercel project settings, open Domains.
2. Add your domain (for example `app.yourdomain.com`).
3. Add the required DNS records in your domain provider.
4. Wait for SSL to become active.

### Railway backend domain
1. In Railway service settings, open Networking/Domains.
2. Add your API domain (for example `api.yourdomain.com`).
3. Add required DNS records and wait for SSL.
4. Update Vercel `VITE_BASE_URL` to this custom API domain.
5. Update Railway `CORS_ORIGIN` to your custom frontend domain.

## Rollback plan
- **Frontend rollback:** In Vercel deployments, promote the previous successful deployment.
- **Backend rollback:** In Railway, redeploy the previous successful deployment.
- **Config rollback:** Revert the last bad commit in GitHub and redeploy both services.
- **Safety check after rollback:** Verify `GET /health`, then test login and booking flow from UI.
