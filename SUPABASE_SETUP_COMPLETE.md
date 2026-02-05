# ✅ Supabase Setup Complete!

## What's Been Configured

### ✅ Database Schema
- **Tables Created:**
  - `listings` - Property information (9 columns, RLS enabled)
  - `scenes` - 360° camera positions (6 columns, RLS enabled)
  - `hotspots` - Navigation points (7 columns, RLS enabled)

- **Indexes Created:**
  - Fast queries on published listings
  - Optimized scene ordering
  - Efficient hotspot lookups

- **RLS Policies:**
  - Public can view published content
  - Authenticated users have full admin access

### ✅ Storage Bucket
- **Bucket Name:** `property-images`
- **Type:** Public
- **Max File Size:** 50MB
- **Allowed Types:** JPEG, PNG, WebP

### ✅ Environment Variables
- **Project URL:** https://fieudfmxvocdpamfylas.supabase.co
- **Anon Key:** Configured in `.env.local`
- **Service Role Key:** Needs manual configuration (see below)

---

## 🔐 Create Admin User

You need to create an admin user to login:

### Option 1: Via Supabase Dashboard (Recommended)
1. Go to: https://supabase.com/dashboard/project/fieudfmxvocdpamfylas
2. Click **Authentication** → **Users** (left sidebar)
3. Click **"Add user"** → **"Create new user"**
4. Enter:
   - Email: `admin@example.com` (or your email)
   - Password: (choose a strong password)
5. Click **"Create user"**
6. **Save these credentials!**

### Option 2: Via SQL (Advanced)
```sql
-- This will be done through the dashboard
```

---

## 🔑 Get Service Role Key (Optional but Recommended)

The service role key is needed for some admin operations:

1. Go to: https://supabase.com/dashboard/project/fieudfmxvocdpamfylas/settings/api
2. Scroll to **"Project API keys"**
3. Copy the **`service_role`** key (long string starting with `eyJ...`)
4. Open `.env.local`
5. Replace `your-service-role-key-here` with the actual key
6. Save the file

---

## 🚀 Next Steps

### 1. Restart Dev Server
```bash
# In your terminal, press Ctrl+C
# Then run:
npm run dev
```

### 2. Test the Application
1. Go to: http://localhost:3000
2. Click "Admin Dashboard" or go to: http://localhost:3000/login
3. Login with your admin credentials
4. Create your first listing!

---

## 📸 Getting 360° Images for Testing

### Free Sample Images
- **Poly Haven**: https://polyhaven.com/hdris (Download HDRIs)
- **Flickr Equirectangular**: https://www.flickr.com/groups/equirectangular/
- **Google Images**: Search "free 360 panorama equirectangular"

### Requirements
- **Format**: Equirectangular (2:1 aspect ratio)
- **Resolution**: 4096x2048 or higher recommended
- **File Type**: JPG, PNG, or WebP

---

## ✅ Setup Checklist

- [x] Database schema applied
- [x] Tables created with RLS
- [x] Storage bucket created
- [x] Environment variables configured
- [ ] Admin user created (do this now!)
- [ ] Service role key added (optional)
- [ ] Dev server restarted
- [ ] First listing created

---

## 🎯 Quick Test Workflow

1. **Login**: http://localhost:3000/login
2. **Create Listing**: 
   - Title: "Luxury Apartment"
   - Price: 500000
   - Location: "New York, NY"
   - Description: "Beautiful 2-bedroom apartment"
   - Upload a cover image
3. **Add Scenes**:
   - Upload 2-3 360° images
   - Name them (Living Room, Kitchen, Bedroom)
4. **Place Hotspots**:
   - Click "Edit Hotspots" for each scene
   - Click in the panorama to place navigation points
   - Link scenes together
5. **Publish**: Toggle to "Published"
6. **View Tour**: Go to http://localhost:3000/listings

---

## 🎉 You're Ready!

Your Real Estate 360° application is now fully configured and ready to use!

**Project Details:**
- **Name**: real estate with 360 tours
- **Region**: EU West (Ireland)
- **Status**: ACTIVE_HEALTHY
- **Database**: PostgreSQL 17
- **URL**: https://fieudfmxvocdpamfylas.supabase.co

---

## 🆘 Troubleshooting

### If login doesn't work:
- Make sure you created an admin user in Supabase dashboard
- Check that email/password are correct
- Verify dev server is running

### If images don't upload:
- Check that storage bucket exists
- Verify environment variables are set
- Restart dev server after changing `.env.local`

### If you see Supabase errors:
- Make sure `.env.local` has correct values
- Restart dev server
- Check Supabase project is active

---

**Need help?** Check the logs in your terminal or browser console!
