# Cuber (Uber Clone) - Complete Deployment Guide

## Quick Start Deployment Path

### Step 1: Prepare GitHub Repository
```bash
# Initialize git if not done
git init
git add .
git commit -m "Initial Cuber deployment setup"

# Create repo on GitHub and push
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cuber.git
git push -u origin main
```

---

## Frontend Deployment to Netlify

### Option A: Netlify via GitHub (Recommended)

1. **Go to netlify.com** → Sign up/Login
2. Click **"Add new site"** → **"Connect to Git"**
3. Select **GitHub** → Authorize Netlify
4. Select your **cuber** repository
5. Configure build settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist`
6. Click **"Deploy site"**
7. Once deployed, Netlify will give you a URL like `https://cuber-xyz.netlify.app`
8. **Rename to cuber.netlify.app:**
   - Go to Site Settings → General → Site details
   - Click "Change site name" → type `cuber`
9. Add environment variable:
   - Site Settings → Build & deploy → Environment
   - Add: `VITE_BASE_URL` = `YOUR_BACKEND_URL` (you'll set this after deploying backend)

---

## Backend Deployment Options

### Option 1: Railway (Easiest for beginners)

1. **Go to railway.app** → Sign up with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your **cuber** repository
4. Railway auto-detects the backend; select **Backend** folder
5. Add environment variables in Railway dashboard:
   - `DB_CONNECT` = MongoDB Atlas connection string
   - `JWT_SECRET` = random secret (e.g., `your_super_secret_jwt_key_123`)
   - `FRONTEND_URL` = `https://cuber.netlify.app`
6. Railway generates a URL like `https://cuber-production.up.railway.app`
7. Copy this URL and add to Netlify as `VITE_BASE_URL`

**Railway MongoDB Setup:**
- Go to mongodb.com/cloud → Create free account
- Create cluster → Get connection string
- Paste into Railway `DB_CONNECT` variable

---

### Option 2: Render

1. **Go to render.com** → Sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Select your **cuber** repository
4. Configure:
   - **Root Directory:** `Backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables:
   - `DB_CONNECT`
   - `JWT_SECRET`
   - `FRONTEND_URL`
   - `PORT` = `3000`
6. Deploy and get your backend URL

---

### Option 3: Heroku (Requires credit card)

1. **Go to heroku.com** → Sign up
2. Click **"Create new app"** → name it `cuber-backend`
3. Go to **Deployment** tab → Connect GitHub
4. Select **cuber** repository
5. Click **"Deploy Branch"**
6. Go to **Settings** → **Config Vars** → Add:
   - `DB_CONNECT`
   - `JWT_SECRET`
   - `FRONTEND_URL`
7. Backend URL: `https://cuber-backend.herokuapp.com`

---

## MongoDB Setup (Required for all options)

1. **Go to mongodb.com/cloud**
2. **Sign up** with Google/GitHub
3. **Create Organization** → **Create Project**
4. **Create Free Cluster** (M0 - 512MB is free)
5. In **Security** → **Database Access**:
   - Create username/password
   - Remember credentials
6. In **Network Access**:
   - Add IP `0.0.0.0/0` (allows all IPs)
7. Click **Connect** → Copy connection string
8. Replace `<username>` and `<password>` with your credentials
9. Replace `<database-name>` with `cuber`
10. This is your `DB_CONNECT` URL

**Example:**
```
mongodb+srv://cuber_user:your_password@cluster0.abc123.mongodb.net/cuber?retryWrites=true&w=majority
```

---

## Complete Deployment Checklist

### Before Deploying

- [ ] GitHub account created
- [ ] Repository pushed to GitHub
- [ ] MongoDB Atlas account created with cluster
- [ ] `.env.example` files exist in both folders
- [ ] Frontend build successful (`npm run build`)
- [ ] Backend dependencies installed (`npm install`)

### Frontend (Netlify)

- [ ] Netlify account created
- [ ] Site connected to GitHub
- [ ] Build settings configured correctly
- [ ] Site deployed successfully
- [ ] Custom domain set to `cuber.netlify.app`
- [ ] `VITE_BASE_URL` env variable added

### Backend (Railway/Render/Heroku)

- [ ] Account created on chosen platform
- [ ] Repository connected
- [ ] `DB_CONNECT` environment variable set
- [ ] `JWT_SECRET` environment variable set
- [ ] `FRONTEND_URL` environment variable set
- [ ] Backend deployed successfully
- [ ] Backend URL copied

### Final Step

- [ ] Update Netlify `VITE_BASE_URL` with your backend URL
- [ ] Test the app on `https://cuber.netlify.app`

---

## Testing After Deployment

### Test Frontend
1. Go to `https://cuber.netlify.app`
2. Try user signup
3. Try captain signup
4. Verify API calls work (check browser DevTools → Network tab)

### Test Backend
1. Visit `https://your-backend-url/` - should see "Hello World"
2. Check MongoDB Atlas dashboard for new database entries

### Common Issues

**Issue:** Frontend shows "Cannot reach backend"
- **Fix:** Check `VITE_BASE_URL` is correct in Netlify
- **Fix:** Ensure backend `FRONTEND_URL` includes `https://cuber.netlify.app`

**Issue:** Database errors
- **Fix:** Verify `DB_CONNECT` string in backend settings
- **Fix:** Check MongoDB Atlas Network Access includes `0.0.0.0/0`

**Issue:** Cookies not working
- **Fix:** Ensure both `FRONTEND_URL` and `VITE_BASE_URL` use `https://`

---

## After Successful Deployment

### Monitoring
- **Netlify:** Analytics tab shows visitor count
- **Railway/Render:** Logs tab shows backend errors
- **MongoDB:** Data tab shows database entries

### Updating Code
1. Make changes locally
2. Push to GitHub: `git push origin main`
3. Netlify auto-deploys frontend
4. Backend redeploys automatically

---

## Production Security Tips

1. **Never commit `.env` file** ✓ Already ignored
2. **Use strong JWT_SECRET** (random 32+ characters)
3. **Enable MongoDB IP whitelist** (already done)
4. **Set MongoDB user permissions** (read/write specific database)
5. **Use environment-specific API URLs** ✓ Already configured

---

## Support & Next Steps

If deployment fails:
1. Check Netlify/Railway/Heroku build logs
2. Verify all environment variables are set
3. Test backend locally: `cd Backend && npm start`
4. Test frontend locally: `cd frontend && npm run dev`

For live updates or fixes, push to GitHub and redeploy.

**You're ready to go live! 🚀**
