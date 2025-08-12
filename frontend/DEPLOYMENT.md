# Vercel Deployment Guide

## Prerequisites
- Make sure your code is pushed to a GitHub repository
- Have a Vercel account (free tier available)

## Step 1: Environment Variables
You need to set these environment variables in Vercel:

### Required Environment Variables:
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key-here
```

### Optional Environment Variables (if using these services):
```
# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend` (since your Next.js app is in the frontend folder)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

## Step 3: Set Environment Variables
1. In your Vercel project dashboard, go to "Settings" → "Environment Variables"
2. Add each environment variable from Step 1
3. Make sure to set them for all environments (Production, Preview, Development)

## Step 4: Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Your app will be available at the provided Vercel URL

## Troubleshooting

### Common Issues:

1. **404 Error**: 
   - Check if environment variables are set correctly
   - Ensure the root directory is set to `frontend`
   - Verify the build command is `npm run build`

2. **Build Failures**:
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

3. **API Connection Issues**:
   - Ensure `NEXT_PUBLIC_API_URL` is set correctly
   - Check if your backend is accessible from Vercel's servers

### Build Configuration:
Your project already includes:
- `vercel.json` with proper configuration
- `next.config.mjs` with build optimizations
- Proper `.gitignore` file

## Support
If you continue to have issues:
1. Check Vercel build logs
2. Verify all environment variables are set
3. Ensure your backend API is accessible
4. Check the Vercel documentation for Next.js deployments
