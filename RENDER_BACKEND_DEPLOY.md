# Render Backend Deployment - Step by Step

## Prerequisites Checklist

Before deploying to Render, make sure you have:

- [ ] **GitHub Repository:** https://github.com/Akshatj0707/cuber ✓
- [ ] **MongoDB Connection String:** `mongodb+srv://cuber_user:PASSWORD@cluster0.xxx.mongodb.net/cuber?retryWrites=true&w=majority`
- [ ] **JWT Secret:** A secure random string (can be anything like `cuber_jwt_secret_2024_production_key_12345`)
- [ ] **Render Account:** Sign up at render.com

---

## Part 1: Prepare Your Information

Have these ready before starting:

| Variable | Value |
|----------|-------|
| `DB_CONNECT` | Your MongoDB connection string |
| `JWT_SECRET` | `cuber_jwt_secret_2024_production_key_12345` (or your choice) |
| `FRONTEND_URL` | `https://cuber.netlify.app` (you'll change this after Netlify deployment) |
| `PORT` | `3000` |

---

## Part 2: Sign Up for Render

1. Go to **render.com**
2. Click **"Get started"** or **"Sign up"**
3. Choose **"Sign up with GitHub"**
4. Click **"Authorize render"**
5. Verify your email
6. You're now on Render dashboard

---

## Part 3: Create Web Service on Render

1. Click **"New +"** in top right
2. Select **"Web Service"**
3. You'll see "Connect a repository" page

---

## Part 4: Connect GitHub Repository

1. You should see your GitHub repos listed
2. Find **`cuber`** repository
3. Click **"Connect"** next to it
4. Authorize Render to access your GitHub (if prompted)

---

## Part 5: Configure Deployment Settings

After connecting, fill in these settings:

### Basic Settings
| Field | Value |
|-------|-------|
| **Name** | `cuber-backend` |
| **Environment** | `Node` |
| **Region** | Choose closest to you (e.g., `us-east`) |
| **Branch** | `main` |

### Build & Deploy
| Field | Value |
|-------|-------|
| **Root Directory** | `Backend` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

---

## Part 6: Add Environment Variables

Scroll down to **"Environment"** section.

Click **"Add Environment Variable"** for EACH of these:

### Variable 1: DB_CONNECT
```
Key: DB_CONNECT
Value: mongodb+srv://cuber_user:YOUR_PASSWORD@cluster0.xxx.mongodb.net/cuber?retryWrites=true&w=majority
```

### Variable 2: JWT_SECRET
```
Key: JWT_SECRET
Value: cuber_jwt_secret_2024_production_key_12345
```

### Variable 3: FRONTEND_URL
```
Key: FRONTEND_URL
Value: https://cuber.netlify.app
```

### Variable 4: PORT
```
Key: PORT
Value: 3000
```

---

## Part 7: Deploy

1. Click **"Create Web Service"** at bottom
2. Render starts building (shows logs in real-time)
3. Wait for: **"Your service is live"** message ✓
4. You'll get a URL like: `https://cuber-backend.onrender.com`

---

## Part 8: Verify Backend is Running

1. Open in browser: `https://cuber-backend.onrender.com/`
2. You should see: **"Hello World"**
3. If you see this, your backend is working! ✓

---

## Important Notes

### Render Free Tier
- Free tier spins down after 15 minutes of inactivity
- First request takes 30 seconds (cold start)
- Perfect for testing/development
- Upgrade to paid for production

### Your Backend URL
**Copy this URL:** `https://cuber-backend.onrender.com`
(Your actual URL will be different - use the one Render gives you)

You'll need this for Netlify deployment in the next step.

---

## Troubleshooting

### Issue: Build fails with "npm install" error
- Check Backend/package.json is valid
- Try running locally: `cd Backend && npm install`

### Issue: Service says "Deploy failed"
- Check environment variables are set correctly
- Verify `DB_CONNECT` has no extra spaces
- Check logs for specific error message

### Issue: Backend URL shows error page
- Wait 2-3 minutes after deployment
- Refresh page
- Check Render logs for errors

### Issue: "Cannot connect to database"
- Verify MongoDB `DB_CONNECT` is correct
- Check MongoDB Atlas Network Access includes `0.0.0.0/0`
- Ensure database name `/cuber` is in connection string

---

## Next Steps

Once backend is deployed and running:

1. **Copy your Render backend URL** (e.g., `https://cuber-backend.onrender.com`)
2. Go to **RENDER_NETLIFY_FRONTEND.md**
3. Deploy frontend to Netlify with this URL

---

## Quick Summary

✅ Connected GitHub repository
✅ Configured Build settings (Root: Backend, Start: npm start)
✅ Added 4 environment variables
✅ Deployed to Render
✅ Verified backend is running

**Backend is now LIVE!** 🚀

Next: Deploy frontend to Netlify
