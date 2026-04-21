# GitHub Push Instructions

Your code is committed locally. Follow these steps to push to GitHub:

## Step 1: Create Repository on GitHub

1. Go to **github.com** → Sign in/Sign up
2. Click **"+"** (top right) → **"New repository"**
3. Name: **`cuber`**
4. Description: `Cuber - Uber Clone Ride Sharing App`
5. Public (so you can deploy easily)
6. **DO NOT** initialize with README, .gitignore, or license
7. Click **"Create repository"**

## Step 2: Copy the GitHub Commands

After creating the repo, GitHub shows a page with these commands. Copy the commands for "push an existing repository":

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cuber.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Run Commands in Terminal

Run these commands in PowerShell:

```powershell
cd "C:\Users\aksha\Downloads\uber-video-main (1)\uber clone"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cuber.git
git push -u origin main
```

You'll be prompted for authentication - use your GitHub credentials or a personal access token.

## Step 4: Verify

1. Go to **github.com/YOUR_USERNAME/cuber**
2. You should see all your files uploaded ✓

---

## Next: Deploy Backend to Render

Once files are on GitHub, follow RENDER_DEPLOYMENT.md:
- Part 2: MongoDB Atlas setup
- Part 3: Render backend deployment
- Part 4: Netlify frontend deployment
