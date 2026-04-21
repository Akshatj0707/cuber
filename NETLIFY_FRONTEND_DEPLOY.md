# Netlify Frontend Deployment - Complete Guide

## Prerequisites Checklist

Before deploying frontend to Netlify, have these ready:

- [ ] **Render Backend URL:** `https://cuber-backend.onrender.com` (or your actual Render URL)
- [ ] **Netlify Account:** Sign up at netlify.com
- [ ] **GitHub Repository:** Already connected and pushed ✓

---

## Part 1: Sign Up for Netlify

1. Go to **netlify.com**
2. Click **"Sign up"**
3. Select **"Sign up with GitHub"**
4. Click **"Authorize Netlify by Netlify"**
5. Complete any verification
6. You're now on Netlify dashboard

---

## Part 2: Create New Site from Git

1. Click **"Add new site"** or **"New site from Git"**
2. Click **"Connect to Git"**
3. Select **GitHub** (since your repo is there)
4. Authorize Netlify to access GitHub (if prompted)

---

## Part 3: Select Your Repository

1. You'll see list of your GitHub repositories
2. Find and click **`cuber`**
3. Click **"Connect"** or **"Install"**

---

## Part 4: Configure Build Settings

On the "Build settings" page, configure:

### Basic Build Settings
| Field | Value |
|-------|-------|
| **Base directory** | `frontend` |
| **Build command** | `npm install && npm run build` |
| **Publish directory** | `dist` |

---

## Part 5: Add Environment Variables

**IMPORTANT:** Add these BEFORE deploying!

1. Scroll down to **"Advanced build settings"** or **"Environment"**
2. Click **"Add environment variable"**

### Add Variable 1: VITE_BASE_URL
```
Key: VITE_BASE_URL
Value: https://cuber-backend.onrender.com
```
(Use your actual Render URL from backend deployment)

---

## Part 6: Deploy Site

1. Click **"Deploy site"** button
2. Netlify starts building (watch the logs)
3. Build completes in 2-3 minutes
4. You'll see: **"Your site is live"** ✓
5. Netlify gives you a random URL like: `https://some-random-name.netlify.app`

---

## Part 7: Rename to cuber.netlify.app

Once deployed successfully:

1. Go to **Site Settings** (top menu)
2. Click **"General"** in left sidebar
3. Find **"Site details"** section
4. Click **"Change site name"** button
5. Type: `cuber`
6. Click **"Save"**
7. Your site is now: `https://cuber.netlify.app` ✓

---

## Part 8: Verify Frontend is Running

1. Open in browser: `https://cuber.netlify.app`
2. You should see the Cuber app landing page
3. Try clicking around - should load without errors ✓

---

## Part 9: Test API Connection

1. On the site, try **"User Sign Up"**
2. Open browser **DevTools** (F12)
3. Go to **"Network"** tab
4. Submit the form
5. You should see API call to your Render URL
6. If successful, form submits! ✓

---

## Important Notes

### Your Frontend URL
```
https://cuber.netlify.app
```

### Netlify Auto-Deploy
- Every time you push to GitHub, Netlify auto-deploys
- No manual deployment needed
- Takes 2-3 minutes to build and deploy

### Environment Variables
- `VITE_BASE_URL` = your Render backend URL
- Never commit `.env` files (already in .gitignore)
- Netlify environment is separate from your local `.env`

---

## Troubleshooting

### Issue: Build fails with "npm install" error
- Check frontend/package.json is valid
- Try locally: `cd frontend && npm install && npm run build`

### Issue: Frontend loads but API calls fail
- Check `VITE_BASE_URL` is correct in Netlify settings
- Verify Render backend is running (check status on render.com)
- Check browser DevTools Console for errors

### Issue: Cannot rename to cuber.netlify.app
- Ensure site is fully deployed (not "Building" status)
- Wait 5 minutes and try again
- Check site name doesn't already exist

### Issue: CORS errors in browser console
- Verify `VITE_BASE_URL` uses `https://` (not `http://`)
- Check Render has `FRONTEND_URL=https://cuber.netlify.app`
- Both must match exactly

---

## Final Configuration: Update Render with Netlify URL

Now that frontend is deployed, update Render:

1. Go to **render.com** → your `cuber-backend` service
2. Go to **Environment** settings
3. Edit `FRONTEND_URL`:
   - Old value: whatever you had before
   - New value: `https://cuber.netlify.app`
4. Click **"Save Changes"**
5. Render auto-redeploys backend with new URL

---

## Testing Everything Works Together

1. **Test User Sign Up:**
   - Go to `https://cuber.netlify.app`
   - Click "User Sign Up"
   - Fill in email and password
   - Submit form
   - Should redirect to home page

2. **Test Captain Sign Up:**
   - Go to "Captain Sign Up" page
   - Fill in form
   - Submit
   - Should work without errors

3. **Check Database:**
   - Go to MongoDB Atlas
   - Go to "Browse Collections"
   - You should see new users in `cuber > users` collection

---

## Deployment Summary

| Component | Platform | URL |
|-----------|----------|-----|
| **Frontend** | Netlify | `https://cuber.netlify.app` |
| **Backend API** | Render | `https://cuber-backend.onrender.com` |
| **Database** | MongoDB Atlas | Cloud (no public URL) |

---

## Live Production Checklist

- [x] Code pushed to GitHub ✓
- [x] MongoDB Atlas database created ✓
- [x] Backend deployed on Render ✓
- [x] Frontend deployed on Netlify ✓
- [x] Environment variables configured ✓
- [x] CORS properly configured ✓
- [x] Custom domain set ✓
- [x] APIs tested and working ✓

---

## Making Updates

To update your live app:

1. Make changes locally
2. Push to GitHub: `git push origin main`
3. Netlify auto-deploys frontend (2-3 minutes)
4. For backend changes:
   - Push to GitHub
   - Render auto-redeploys (2-3 minutes)

---

## Production Monitoring

### Netlify Dashboard
- **Deploys:** See deployment history and logs
- **Analytics:** View visitor count
- **Logs:** Monitor site performance

### Render Dashboard
- **Logs:** See backend errors in real-time
- **Metrics:** Monitor CPU, memory usage
- **Events:** Deployment history

### MongoDB Atlas
- **Collections:** View and edit data
- **Metrics:** Database performance stats
- **Backups:** Automatic backups included

---

## Congratulations! 🎉

Your Cuber ride-sharing app is now LIVE!

**Frontend:** https://cuber.netlify.app
**Backend:** https://cuber-backend.onrender.com
**Database:** MongoDB Atlas (cloud)

Share your app with friends and test it live!

---

## Next Steps (Optional)

1. **Domain:** Buy a custom domain and connect to Netlify
2. **SSL/HTTPS:** Already enabled by Netlify ✓
3. **Monitoring:** Set up alerts for errors
4. **Analytics:** Track user behavior
5. **Scaling:** Upgrade Render plan if needed

---

**Your Cuber app is production-ready! 🚀**
