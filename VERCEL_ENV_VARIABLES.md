# Vercel Environment Variables Setup

## 🔐 Environment Variables to Add

Copy these exact values to your Vercel project settings:

### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=https://fieudfmxvocdpamfylas.supabase.co
```

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZXVkZm14dm9jZHBhbWZ5bGFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMTM0NTksImV4cCI6MjA4NTg4OTQ1OX0.K3gSz93NLLVKzvJ5eCgwKdZK3w5ycXH9lBEGa0ydB-0
```

```
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

```
NEXT_PUBLIC_STORAGE_BUCKET=property-images
```

### Cloudinary Configuration
```
CLOUDINARY_CLOUD_NAME=dhjsvoorl
```

```
CLOUDINARY_API_KEY=385927627838147
```

```
CLOUDINARY_API_SECRET=qxON31G0ueWU3kKLjBhx3-TLHJQ
```

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dhjsvoorl
```

### Discord Webhooks
```
DISCORD_WEBHOOK_VISITORS=https://discordapp.com/api/webhooks/1469575155570315264/9XnEak2K29xbOaoGDrVbPAm1NpGNbAiLhJOZtlVc77BlDPNyXBjicuDuOuVUrR5V0w7r
```

```
DISCORD_WEBHOOK_CONTACT=https://discordapp.com/api/webhooks/1469575647486541910/lDclvfv8mvs8296IN4soHt2N2wcdk1Yu8fpzhicv-5XDZluW1sbEwTSUB4JdiYxsD9Hw
```

```
DISCORD_WEBHOOK_APPLICATIONS=https://discordapp.com/api/webhooks/1469575705342902457/eg0kcW8S52C16CcLOl2qL563D2grJGE8fKHh2T9wY4FFVjNZ0iZuWc7-NIyVi3AyRgYj
```

## 📝 How to Add to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Select your **property360ng** project
3. Click **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)
5. For each variable above:
   - Click **Add New**
   - **Name**: Copy the variable name (e.g., `CLOUDINARY_CLOUD_NAME`)
   - **Value**: Copy the value
   - **Environment**: Select **Production**, **Preview**, and **Development**
   - Click **Save**
6. After adding all variables, **Redeploy** your project

### Method 2: Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Add environment variables
vercel env add CLOUDINARY_CLOUD_NAME
# Paste: dhjsvoorl
# Select: Production, Preview, Development

# Repeat for all variables...

# Deploy
vercel --prod
```

## ✅ Verification Checklist

After adding all variables:

- [ ] All 12 environment variables added
- [ ] Each variable set for Production, Preview, and Development
- [ ] No typos in variable names
- [ ] No extra spaces in values
- [ ] Project redeployed

## 🧪 Testing After Deployment

1. **Test Cloudinary Upload**:
   - Go to your deployed site
   - Login to admin
   - Upload a new listing with image
   - Check Cloudinary dashboard

2. **Test Discord Webhooks**:
   - Visit your deployed site
   - Check Discord `#visitors` channel
   - Submit contact form
   - Check Discord `#contact-forms` channel

3. **Test 360° Upload**:
   - Upload a 360° scene
   - Check Cloudinary `property-360-scenes/` folder

## 🔧 Troubleshooting

### "Environment variable not found"
- Make sure variable is added to correct environment (Production)
- Redeploy after adding variables

### "Cloudinary upload failed"
- Verify all 4 Cloudinary variables are set
- Check for typos in API key/secret

### "Discord webhook not working"
- Verify webhook URLs are correct
- Check Discord webhook is not deleted
- Test webhook with curl

## 📊 All Variables Summary

Total: **12 environment variables**

**Supabase**: 4 variables
**Cloudinary**: 4 variables
**Discord**: 3 variables
**Other**: 1 variable (NEXT_PUBLIC_STORAGE_BUCKET)

---

**After adding all variables, remember to REDEPLOY your project!**
