# 🔧 Storage Policy Fix - Step by Step

## The Problem
Storage policies need to be configured correctly for uploads to work.

## ✅ Correct Setup (Follow Exactly)

### **Step 1: Delete All Existing Policies**
1. Go to: https://supabase.com/dashboard/project/fieudfmxvocdpamfylas/storage/policies
2. If you see any policies under "property-images", delete them all
3. Start fresh

---

### **Step 2: Create Policy for Public Downloads**

1. Click **"New Policy"**
2. Click **"For full customization"** (NOT templates)
3. Fill in:
   - **Policy name:** `Allow public downloads`
   - **Allowed operation:** Check ONLY **`download`** ✅
   - **Target roles:** Select **`public`**
4. In the **Policy definition** section:
   - **USING expression:** 
     ```sql
     bucket_id = 'property-images'
     ```
5. Click **"Review"** → **"Save policy"**

---

### **Step 3: Create Policy for Authenticated Uploads**

1. Click **"New Policy"** again
2. Click **"For full customization"**
3. Fill in:
   - **Policy name:** `Allow authenticated uploads`
   - **Allowed operation:** Check ALL of these ✅:
     - `upload`
     - `update`
     - `remove`
   - **Target roles:** Select **`authenticated`**
4. In the **Policy definition** section:
   - **WITH CHECK expression:**
     ```sql
     bucket_id = 'property-images'
     ```
   - **USING expression:**
     ```sql
     bucket_id = 'property-images'
     ```
5. Click **"Review"** → **"Save policy"**

---

## 🎯 What You Should See

After creating both policies, you should see:

**Policy 1:**
- Name: Allow public downloads
- Operations: download
- Roles: public

**Policy 2:**
- Name: Allow authenticated uploads
- Operations: upload, update, remove
- Roles: authenticated

---

## 🧪 Test Upload

1. **Refresh your admin page** (Ctrl+R or Cmd+R)
2. **Try uploading a cover image**
3. **Should work!** ✅

---

## 🆘 If Still Failing

### Check Browser Console:
1. Press **F12** to open Developer Tools
2. Go to **Console** tab
3. Try uploading again
4. Look for error messages (usually in red)
5. Share the error message with me

### Common Errors:

**"new row violates row-level security policy"**
→ Policy definition is wrong. Make sure it says `bucket_id = 'property-images'`

**"Bucket not found"**
→ Bucket name mismatch. Check `.env.local` has `NEXT_PUBLIC_STORAGE_BUCKET=property-images`

**"Invalid JWT"**
→ You're not logged in. Try logging out and back in.

**"Failed to upload"**
→ Check file type is allowed (JPG, PNG, WebP)

---

## 📋 Quick Checklist

Before testing:
- [ ] Deleted all old policies
- [ ] Created "Allow public downloads" with `download` operation
- [ ] Created "Allow authenticated uploads" with `upload`, `update`, `remove` operations
- [ ] Both policies have `bucket_id = 'property-images'` in definition
- [ ] Refreshed admin page
- [ ] Logged in as admin

---

## 🔍 Debug Info

**Your Bucket Configuration:**
- ✅ Name: property-images
- ✅ Public: Yes
- ✅ Max file size: 50MB
- ✅ Allowed types: JPEG, PNG, WebP, JPG

**Your Environment:**
- ✅ Supabase URL: https://fieudfmxvocdpamfylas.supabase.co
- ✅ Bucket name in code: property-images

Everything looks correct on the backend. The issue is **100% the storage policies**.

---

## 💡 Alternative: Use SQL (If UI Doesn't Work)

If the UI is confusing, I can help you create policies via SQL instead. Let me know!

---

**Follow the steps above EXACTLY and it will work!** 🚀
