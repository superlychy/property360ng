# Vercel Environment Variables Setup

## 🔐 Environment Variables to Add

### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=[Your Supabase URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[Your Supabase Anon Key]
SUPABASE_SERVICE_ROLE_KEY=[Your Supabase Service Role Key]
NEXT_PUBLIC_STORAGE_BUCKET=property-images
```

### Cloudinary Configuration
```
CLOUDINARY_CLOUD_NAME=[Your Cloud Name]
CLOUDINARY_API_KEY=[Your API Key]
CLOUDINARY_API_SECRET=[Your API Secret]
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=[Your Cloud Name]
```

### Discord Webhooks
```
DISCORD_WEBHOOK_VISITORS=[Your Visitor Webhook URL]
DISCORD_WEBHOOK_CONTACT=[Your Contact Webhook URL]
DISCORD_WEBHOOK_APPLICATIONS=[Your Application Webhook URL]
```

## 📝 How to Add to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Select your project
3. Click **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)
5. For each variable above:
   - Click **Add New**
   - **Name**: Copy the variable name (e.g., `CLOUDINARY_CLOUD_NAME`)
   - **Value**: Paste your secret value
   - **Environment**: Select **Production**, **Preview**, and **Development**
   - Click **Save**
6. After adding all variables, **Redeploy** your project

## ⚠️ Security Note

Never commit actual secrets to Git! Always use environment variables and keep the values in `.env.local` (which is gitignored) or in your deployment platform's secrets manager.
