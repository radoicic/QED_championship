# Vercel Deployment Checklist

## ✅ Immediate Actions Required:

1. **Set Root Directory**: Make sure Vercel is set to deploy from the `frontend` folder, not the root
2. **Environment Variables**: Set these in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL` (your backend API URL)
   - `NEXTAUTH_URL` (your Vercel app URL)
   - `NEXTAUTH_SECRET` (any random string)

## 🔍 Check These Settings in Vercel:

- **Framework Preset**: Next.js
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## 🚨 Common 404 Causes:

1. **Wrong Root Directory**: If Vercel tries to build from root instead of `frontend`
2. **Missing Environment Variables**: App crashes during build
3. **Build Failures**: Check Vercel build logs
4. **API Connection Issues**: Backend not accessible

## 📋 Quick Fix Steps:

1. Go to Vercel dashboard
2. Check project settings
3. Verify root directory is `frontend`
4. Set environment variables
5. Redeploy

## 📞 If Still Having Issues:

1. Check Vercel build logs
2. Verify all files are committed to GitHub
3. Ensure backend API is accessible
4. Check if there are any build errors
