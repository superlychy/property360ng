# Vercel Environment Variables Setup

## Issue
Your Vercel deployment is failing because the Supabase environment variables are not configured on Vercel.

## Environment Variables to Add

You need to add these environment variables to your Vercel project:

### 1. NEXT_PUBLIC_SUPABASE_URL
**Value:** `https://fieudfmxvocdpamfylas.supabase.co`
**Environments:** Production, Preview, Development

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
**Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZXVkZm14dm9jZHBhbWZ5bGFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMTM0NTksImV4cCI6MjA4NTg4OTQ1OX0.K3gSz93NLLVKzvJ5eCgwKdZK3w5ycXH9lBEGa0ydB-0`
**Environments:** Production, Preview, Development

### 3. NEXT_PUBLIC_STORAGE_BUCKET
**Value:** `property-images`
**Environments:** Production, Preview, Development

## Steps to Add Environment Variables on Vercel

### Option 1: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Select your **property360ng** project
3. Click on **Settings** tab
4. Click on **Environment Variables** in the left sidebar
5. For each variable above:
   - Click **Add New**
   - Enter the **Key** (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - Enter the **Value** (copy from above)
   - Select all environments: **Production**, **Preview**, and **Development**
   - Click **Save**
6. After adding all variables, go to the **Deployments** tab
7. Find the latest deployment and click the **three dots** menu
8. Click **Redeploy**

### Option 2: Via Vercel CLI

Run these commands in your terminal:

```bash
# Link to the correct project first
vercel link

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# When prompted, paste: https://fieudfmxvocdpamfylas.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# When prompted, paste the anon key from above

vercel env add NEXT_PUBLIC_STORAGE_BUCKET production
# When prompted, paste: property-images

# Repeat for preview and development environments
vercel env add NEXT_PUBLIC_SUPABASE_URL preview
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
vercel env add NEXT_PUBLIC_STORAGE_BUCKET preview

# Deploy
vercel --prod
```

## After Adding Variables

Once the environment variables are added, trigger a new deployment:
- Either redeploy from the Vercel dashboard
- Or run `vercel --prod` from your terminal

The build should now succeed! ✅
