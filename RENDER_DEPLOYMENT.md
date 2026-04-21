# Cuber - Render + Netlify Deployment Guide

## Complete Production Deployment (Render Backend + Netlify Frontend)

---

## Part 1: GitHub Setup (Required First)

### Step 1.1: Initialize Git Repository
```bash
cd "C:\Users\aksha\Downloads\uber-video-main (1)\uber clone"
git init
git add .
git commit -m "Cuber ride-sharing app - production ready"
```

### Step 1.2: Create GitHub Repository
1. Go to **github.com** → Sign up/Login
2. Click **"New"** → Create repository named `cuber`
3. Do NOT initialize with README (we have one)
4. Click **"Create repository"**

### Step 1.3: Push to GitHub
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cuber.git
git push -u origin main
```
Replace `YOUR_USERNAME` with your GitHub username.

---

## Part 2: MongoDB Atlas Setup (Database)

### Step 2.1: Create MongoDB Account
1. Go to **mongodb.com/cloud** → **Sign Up**
2. Use Google or GitHub to sign up
3. Create organization name (e.g., "Cuber")

### Step 2.2: Create Free Cluster
1. Click **"Create"** → **"Build a Cluster"**
2. Select **M0 (Free)** tier
3. Select region close to you (e.g., `us-east-1`)
4. Click **"Create Cluster"** (takes 1-2 minutes)

### Step 2.3: Create Database User
1. Go to **Security** → **Database Access**
2. Click **"Add New Database User"**
3. Username: `cuber_user`
4. Password: `Generate Secure Password` → **Copy it**
5. Click **"Add User"**

### Step 2.4: Allow Network Access
1. Go to **Security** → **Network Access**
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### Step 2.5: Get Connection String
1. Click **"Connect"** → **"Drivers"**
2. Select **Node.js** driver
3. Copy the connection string
4. Replace `<username>` with `cuber_user`
5. Replace `<password>` with your password from Step 2.3
6. Replace `<database_name>` with `cuber`

**Final connection string looks like:**
```
mongodb+srv://cuber_user:your_password_here@cluster0.abc123.mongodb.net/cuber?retryWrites=true&w=majority
```

**Save this URL - you'll need it for Render.**

---

## Part 3: Render Backend Deployment

### Step 3.1: Connect Render to GitHub
1. Go to **render.com** → **Sign Up**
2. Click **"Sign Up with GitHub"** → Authorize
3. Select your `cuber` repository to authorize

### Step 3.2: Create Web Service
1. Click **"New +"** in top right
2. Select **"Web Service"**
3. Select **`cuber`** repository
4. Click **"Connect"**

### Step 3.3: Configure Deployment Settings
On the "Create a new Web Service" page, fill in:

| Field | Value |
|-------|-------|
| **Name** | `cuber-backend` |
| **Root Directory** | `Backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Region** | (Select closest to you) |

### Step 3.4: Add Environment Variables
Scroll down to **"Environment"** section:

Click **"Add Environment Variable"** for each:

1. **DB_CONNECT**
   - Key: `DB_CONNECT`
   - Value: `mongodb+srv://cuber_user:your_password@cluster0.abc123.mongodb.net/cuber?retryWrites=true&w=majority`

2. **JWT_SECRET**
   - Key: `JWT_SECRET`
   - Value: `cuber_jwt_secret_2024_production_key_12345`

3. **FRONTEND_URL**
   - Key: `FRONTEND_URL`
   - Value: `https://cuber.netlify.app`

4. **PORT**
   - Key: `PORT`
   - Value: `3000`

### Step 3.5: Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (shows logs in real-time)
3. Once deployed, you'll see: **"Your service is live"**
4. Render gives you a URL like: `https://cuber-backend.onrender.com`

**Copy this URL - you'll need it for Netlify.**

### Step 3.6: Test Backend
Open in browser: `https://cuber-backend.onrender.com/`
Should see: **"Hello World"**

---

## Part 4: Netlify Frontend Deployment

### Step 4.1: Connect Netlify to GitHub
1. Go to **netlify.com** → **Sign Up**
2. Click **"Sign Up with GitHub"** → Authorize
3. Click **"Connect to Git"**

### Step 4.2: Deploy from GitHub
1. Click **"New site from Git"**
2. Select **GitHub** → Select **`cuber`** repository
3. Click **"Connect"**

### Step 4.3: Configure Build Settings
On deploy settings page:

| Field | Value |
|-------|-------|
| **Base directory** | `frontend` |
| **Build command** | `npm install && npm run build` |
| **Publish directory** | `dist` |

### Step 4.4: Add Environment Variables
Before deploying, add environment variable:

1. Click **"Advanced"** → **"New variable"**
2. Key: `VITE_BASE_URL`
3. Value: `https://cuber-backend.onrender.com` (your Render URL)
4. Click **"Deploy site"**

### Step 4.5: Wait for Deployment
Netlify builds and deploys (takes 2-3 minutes).
Once complete, you'll see: **"Deploy successful"** ✓

### Step 4.6: Rename to cuber.netlify.app
1. Go to **Site Settings** → **General**
2. Click **"Change site name"**
3. Type: `cuber`
4. Click **"Save"**
5. Your site is now: `https://cuber.netlify.app` ✓

---

## Part 5: Final Configuration

### Step 5.1: Update Render with Netlify URL
1. Go to **render.com** → **`cuber-backend`** service
2. Go to **Environment**
3. Edit `FRONTEND_URL`:
   - Old: `https://cuber.netlify.app`
   - If it was different, update it now
4. Click **"Save Changes"** (auto-redeploys)

### Step 5.2: Verify Everything Works
1. Go to `https://cuber.netlify.app`
2. Click **"User Sign Up"** → Test with email/password
3. Verify form submission works
4. Check browser **DevTools → Network tab** → should see API calls to your backend URL

---

## Testing Deployment

### Frontend Tests
- [ ] Visit `https://cuber.netlify.app` - page loads
- [ ] Try User Sign Up - form submits without errors
- [ ] Try Captain Sign Up - form submits without errors
- [ ] Check DevTools Network tab - API calls go to Render URL
- [ ] Verify no CORS errors in console

### Backend Tests
- [ ] Visit `https://cuber-backend.onrender.com/` - shows "Hello World"
- [ ] Check Render logs - no errors
- [ ] MongoDB Atlas shows new users in database

---

## Troubleshooting

### Issue: Frontend shows "Cannot connect to backend"
**Solution:**
1. Check `VITE_BASE_URL` in Netlify matches your Render URL
2. Verify Render backend is running (check status in Render dashboard)
3. Ensure `FRONTEND_URL` in Render matches `https://cuber.netlify.app`

### Issue: MongoDB connection error
**Solution:**
1. Verify `DB_CONNECT` URL is correct in Render
2. Check Network Access in MongoDB Atlas includes `0.0.0.0/0`
3. Test MongoDB Atlas connection string locally first

### Issue: CORS errors in browser console
**Solution:**
1. Ensure both URLs use `https://`
2. Verify `FRONTEND_URL` in backend is exact: `https://cuber.netlify.app`
3. Backend `app.js` has correct CORS config (already done)

### Issue: Deployment stuck or failing
**Solution:**
1. Check build logs in Netlify/Render
2. Ensure `frontend/` and `Backend/` folders exist
3. Run locally: `cd Backend && npm install && npm start`
4. Run locally: `cd frontend && npm install && npm run build`

---

## Post-Deployment: Making Updates

### Update Code
1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Feature: your change"
   git push origin main
   ```
3. **Netlify** automatically redeploys frontend
4. **Render** automatically redeploys backend

---

## Security Checklist

- [x] `.env` files are in `.gitignore` (never committed)
- [x] `JWT_SECRET` is strong and random
- [x] MongoDB Network Access is restricted
- [x] Both URLs use `https://`
- [x] CORS is configured correctly
- [x] `FRONTEND_URL` doesn't expose backend secrets

---

## Live Deployment Summary

| Component | Host | URL |
|-----------|------|-----|
| **Frontend** | Netlify | `https://cuber.netlify.app` |
| **Backend API** | Render | `https://cuber-backend.onrender.com` |
| **Database** | MongoDB Atlas | Cloud (no public URL) |

---

## Support

If you encounter issues:
1. Check the **DEPLOYMENT_GUIDE.md** for common fixes
2. Review Render logs: Dashboard → Service logs
3. Review Netlify logs: Deploys → Build log
4. Test backend locally: `cd Backend && npm start`
5. Test frontend locally: `cd frontend && npm run dev`

**Your Cuber ride-sharing app is now live! 🚀**
