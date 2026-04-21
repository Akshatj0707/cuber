# MongoDB Atlas Setup - Complete Guide

## Overview
MongoDB Atlas is a free cloud database service. You'll create a database and get a connection string to use in your Render backend.

---

## Step 1: Create MongoDB Account

1. Go to **mongodb.com/cloud**
2. Click **"Try Free"** or **"Sign Up"**
3. Sign up with:
   - Email: your-email@example.com
   - Password: strong password
   - OR use **Google/GitHub** to sign up faster
4. Verify email if needed
5. Click **"Continue"**

---

## Step 2: Create Organization (First Time Only)

1. **Organization Name:** `Cuber`
2. **Cloud Partner:** Select None (unless you have AWS/Azure preference)
3. Click **"Continue"**
4. You'll land on the dashboard

---

## Step 3: Create Project

1. In left sidebar, click **"Projects"**
2. Click **"New Project"**
3. **Project Name:** `Cuber`
4. Click **"Create Project"**
5. Wait for it to initialize

---

## Step 4: Create Free Cluster

1. Click **"Build a Database"** or **"Create"**
2. Choose **M0 (Free)** tier - it's free forever with limits
3. Select a cloud provider (AWS, Google Cloud, Azure)
4. Select **Region** closest to you:
   - US East: `us-east-1`
   - Europe: `eu-west-1`
   - Asia: `ap-south-1`
5. **Cluster Name:** `cuber-cluster` (keep default)
6. Click **"Create Cluster"**
7. **Wait 1-2 minutes** for cluster to initialize

---

## Step 5: Create Database User (Security)

Once cluster is ready:

1. In left sidebar, go to **"Security"** → **"Database Access"**
2. Click **"Add New Database User"**
3. Fill in:
   - **Authentication Method:** Password
   - **Username:** `cuber_user`
   - **Password:** Click **"Generate Secure Password"**
   - **Copy the password** and save it somewhere safe! (You'll need it for Render)
4. **Built-in Role:** `readWriteAnyDatabase`
5. Click **"Add User"**

---

## Step 6: Allow Network Access

1. Go to **"Security"** → **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
4. Confirm IP `0.0.0.0/0` (allows all IPs - needed for cloud hosting)
5. Click **"Confirm"**

---

## Step 7: Get Connection String

1. Go to **"Databases"** tab
2. Click **"Connect"** on your cluster
3. Select **"Drivers"** (not MongoDB Shell)
4. Choose **Node.js** version `4.x`
5. Copy the connection string

**Example:**
```
mongodb+srv://<username>:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

---

## Step 8: Customize Connection String

Replace in the copied string:

1. Replace `<username>` with: `cuber_user`
2. Replace `<password>` with: your generated password from Step 5
3. Add database name `/cuber` before the `?`

**Final string looks like:**
```
mongodb+srv://cuber_user:YOUR_PASSWORD_HERE@cluster0.abc123.mongodb.net/cuber?retryWrites=true&w=majority
```

---

## Step 9: Test Connection (Optional)

1. Click **"MongoDB Compass"** or **"Connect with MongoDB Compass"**
2. Copy connection string
3. Open MongoDB Compass (free app)
4. Paste string
5. Click Connect
6. You should see your `cuber` database

---

## Important: Save Your Connection String

**You MUST save this:**
```
mongodb+srv://cuber_user:YOUR_PASSWORD@cluster0.abc123.mongodb.net/cuber?retryWrites=true&w=majority
```

**Keep this safe!** You'll use it in Render environment variables.

---

## What's Next

Once you have your MongoDB connection string:

1. Go to **RENDER_DEPLOYMENT.md**
2. Follow **Part 3: Render Backend Deployment**
3. Use this connection string as `DB_CONNECT` environment variable

---

## Troubleshooting

### Issue: "Cluster creation pending"
- **Wait 2-3 minutes** for initialization to complete
- Refresh the page

### Issue: "IP Address not whitelisted"
- Verify you added `0.0.0.0/0` in Network Access
- Try again after 5 minutes (takes time to propagate)

### Issue: "Authentication failed"
- Verify username is `cuber_user`
- Verify password is correct (copy from Step 5)
- Reset password in Database Access if needed

### Issue: "Cannot connect from Render"
- Ensure Network Access includes `0.0.0.0/0`
- Check connection string has `/cuber` before `?`

---

## MongoDB Atlas Dashboard Quick Links

Once logged in:
- **Collections:** View/edit database data
- **Performance:** Monitor database performance
- **Backup:** Automatic backups (included)
- **Metrics:** See database usage

---

## Security Notes

- ✅ Username: `cuber_user` (saved)
- ✅ Password: Securely generated (saved)
- ✅ Network: Open to all IPs (needed for Render)
- ✅ Database: Read/write access configured

**Never commit `.env` files with this string to GitHub!** (Already in .gitignore)

---

## Next: Render Deployment

You now have:
- MongoDB connection string ✓
- Database user credentials ✓
- Network access configured ✓

**Ready for Part 3 of RENDER_DEPLOYMENT.md!**
