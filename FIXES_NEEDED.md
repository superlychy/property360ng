# 🔧 Quick Fixes for Upload Issues

## Issue 1: Failed to Upload Images ❌

### **Problem:**
Storage policies are missing, preventing image uploads.

### **Solution - 2 Minutes:**

1. **Go to Supabase Storage Policies:**
   👉 https://supabase.com/dashboard/project/fieudfmxvocdpamfylas/storage/policies

2. **You'll see "property-images" bucket listed**

3. **Click on "property-images"**

4. **Click "New Policy" button**

5. **Select "For full customization"** (or "Get started quickly")

6. **Create 4 policies:**

#### **Policy 1: Public Read**
```
Policy name: Public can view images
Allowed operation: SELECT
Target roles: public
USING expression: bucket_id = 'property-images'
```
Click "Review" → "Save policy"

#### **Policy 2: Authenticated Upload**
```
Policy name: Authenticated can upload
Allowed operation: INSERT  
Target roles: authenticated
WITH CHECK expression: bucket_id = 'property-images'
```
Click "Review" → "Save policy"

#### **Policy 3: Authenticated Update**
```
Policy name: Authenticated can update
Allowed operation: UPDATE
Target roles: authenticated
USING expression: bucket_id = 'property-images'
```
Click "Review" → "Save policy"

#### **Policy 4: Authenticated Delete**
```
Policy name: Authenticated can delete
Allowed operation: DELETE
Target roles: authenticated
USING expression: bucket_id = 'property-images'
```
Click "Review" → "Save policy"

### **Quick Alternative - Use Policy Templates:**

1. Go to the storage policies page
2. Click "New Policy"
3. Select **"Allow public read access"** template
4. Click "Use this template"
5. Click "Review" → "Save"

6. Click "New Policy" again
7. Select **"Allow authenticated uploads"** template
8. Click "Use this template"
9. Click "Review" → "Save"

### **After Adding Policies:**
- Refresh your admin page
- Try uploading an image again
- Should work! ✅

---

## Issue 2: Change Currency to Naira (₦)

### **Quick Fix:**

I'll update the code to show ₦ instead of $. The changes need to be made in these files:

**Files to update:**
1. `app/listings/page.tsx` - Line 95
2. `app/listings/[id]/page.tsx` - Line 75
3. `components/admin/ListingList.tsx` - (if it exists)

### **Manual Fix (if needed):**

Search for `$` in your code and replace with `₦`:

**Find:**
```tsx
${listing.price.toLocaleString()}
```

**Replace with:**
```tsx
₦{listing.price.toLocaleString()}
```

---

## 🎯 Testing Checklist

After fixing storage policies:

- [ ] Go to admin dashboard
- [ ] Create or edit a listing
- [ ] Upload a cover image → Should work ✅
- [ ] Save the listing
- [ ] Go to Scenes page
- [ ] Upload a 360° image → Should work ✅
- [ ] Price shows as ₦ (Naira) → Should work ✅

---

## 🆘 Still Having Issues?

### **Check Browser Console:**
1. Press F12 to open Developer Tools
2. Go to Console tab
3. Look for error messages
4. Share the error with me

### **Check Storage Bucket:**
1. Go to: https://supabase.com/dashboard/project/fieudfmxvocdpamfylas/storage/buckets/property-images
2. Make sure bucket is **Public**
3. Check that policies exist (should see 4 policies)

### **Common Errors:**

**"new row violates row-level security policy"**
→ Storage policies not set up correctly

**"Failed to upload"**
→ Check bucket is public and policies exist

**"Bucket not found"**
→ Bucket name mismatch (should be 'property-images')

---

## ✅ Once Fixed:

You'll be able to:
- ✅ Upload cover images for listings
- ✅ Upload 360° scene images
- ✅ See prices in Naira (₦)
- ✅ Create full virtual tours!

---

**Let me know once you've added the storage policies and I'll help you test!** 🚀
