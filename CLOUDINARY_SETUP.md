# Cloudinary Integration Setup

## Overview
Cloudinary has been successfully integrated into the Real Estate 360 platform for optimized image storage and delivery.

## Configuration

### Environment Variables
The following environment variables have been added to `.env.local`:

```bash
CLOUDINARY_CLOUD_NAME=dhjsvoorl
CLOUDINARY_API_KEY=385927627838147
CLOUDINARY_API_SECRET=qxON31G0ueWU3kKLjBhx3-TLHJQ
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dhjsvoorl
```

### Files Created

1. **`lib/cloudinary.ts`** - Server-side Cloudinary configuration
2. **`lib/utils/cloudinary-upload.ts`** - Utility functions for uploads
3. **`lib/hooks/useCloudinaryUpload.ts`** - React hook for client-side uploads
4. **`app/actions/cloudinary.ts`** - Server actions for image handling
5. **`components/CloudinaryImageUpload.tsx`** - Reusable upload component
6. **`app/cloudinary-demo/page.tsx`** - Demo page with examples

## Features

### ✨ Automatic Optimization
- **Auto Format**: Automatically converts images to modern formats (WebP, AVIF)
- **Auto Quality**: Optimizes image quality for best performance
- **CDN Delivery**: Global CDN for fast image loading worldwide

### 🚀 Upload Capabilities
- Single image upload
- Multiple image upload (batch)
- Progress tracking
- File size validation
- Image preview before upload
- Error handling

### 🎨 Image Transformations
- Resize images on-the-fly
- Crop and fit options
- Quality adjustments
- Format conversion

## Usage Examples

### 1. Using the Upload Component

```tsx
import CloudinaryImageUpload from '@/components/CloudinaryImageUpload';

function MyComponent() {
  const handleUploadComplete = (url: string, publicId: string) => {
    console.log('Image uploaded:', url);
    // Save to database or update state
  };

  return (
    <CloudinaryImageUpload
      onUploadComplete={handleUploadComplete}
      folder="property-images"
      buttonText="Upload Property Image"
      multiple={false}
      maxSizeMB={10}
    />
  );
}
```

### 2. Using the Hook Directly

```tsx
import { useCloudinaryUpload } from '@/lib/hooks/useCloudinaryUpload';

function MyComponent() {
  const { uploadImage, uploading, progress, error } = useCloudinaryUpload();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadImage(file, 'property-images');
      if (result) {
        console.log('Uploaded:', result.url);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      {uploading && <p>Progress: {progress}%</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
```

### 3. Using Server Actions

```tsx
'use client';

import { uploadImageToCloudinary } from '@/app/actions/cloudinary';

async function handleUpload(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  const result = await uploadImageToCloudinary(formData, 'property-images');
  
  if ('error' in result) {
    console.error(result.error);
  } else {
    console.log('Uploaded:', result.url);
  }
}
```

### 4. Multiple Images Upload

```tsx
import { useCloudinaryUpload } from '@/lib/hooks/useCloudinaryUpload';

function MultipleUpload() {
  const { uploadMultipleImages, uploading } = useCloudinaryUpload();

  const handleFiles = async (files: File[]) => {
    const results = await uploadMultipleImages(files, 'property-images');
    console.log('Uploaded images:', results);
  };

  return (
    <input
      type="file"
      multiple
      onChange={(e) => handleFiles(Array.from(e.target.files || []))}
    />
  );
}
```

### 5. Getting Optimized URLs

```tsx
import { getOptimizedImageUrl } from '@/lib/utils/cloudinary-upload';

// Get a thumbnail
const thumbnailUrl = getOptimizedImageUrl('publicId', {
  width: 300,
  height: 200,
  crop: 'fill',
  quality: 'auto',
  format: 'auto'
});

// Get a responsive image
const responsiveUrl = getOptimizedImageUrl('publicId', {
  width: 1200,
  quality: 'auto',
  format: 'auto'
});
```

## Integration with Existing Components

### Updating ListingForm.tsx

Replace the existing Supabase upload with Cloudinary:

```tsx
import { useCloudinaryUpload } from '@/lib/hooks/useCloudinaryUpload';

function ListingForm() {
  const { uploadImage, uploading } = useCloudinaryUpload();

  const handleImageUpload = async (file: File) => {
    const result = await uploadImage(file, 'property-images');
    if (result) {
      // Update form state with result.url
      setImageUrl(result.url);
    }
  };

  // ... rest of component
}
```

### Updating Scene Upload

For 360° scene images:

```tsx
const result = await uploadImage(file, 'property-360-scenes');
```

## Testing

Visit the demo page to test the integration:

```
http://localhost:3000/cloudinary-demo
```

## Folder Structure

Images are organized by folder in Cloudinary:
- `property-images` - Main property photos
- `property-360-scenes` - 360° panoramic images
- `property-thumbnails` - Generated thumbnails
- `user-uploads` - User-generated content

## Benefits Over Supabase Storage

1. **Automatic Optimization**: Images are automatically optimized for web
2. **Global CDN**: Faster delivery worldwide
3. **Transformations**: On-the-fly image transformations without storage overhead
4. **Better Performance**: Optimized formats (WebP, AVIF) for modern browsers
5. **Cost Effective**: Free tier includes 25GB storage and 25GB bandwidth

## API Limits (Free Tier)

- **Storage**: 25 GB
- **Bandwidth**: 25 GB/month
- **Transformations**: 25,000/month
- **Upload**: Unlimited

## Next Steps

1. ✅ Cloudinary SDK installed
2. ✅ Environment variables configured
3. ✅ Upload utilities created
4. ✅ Demo page created
5. 🔄 Update existing components to use Cloudinary
6. 🔄 Migrate existing images (optional)
7. 🔄 Update database schema to store Cloudinary public IDs

## Migration Guide

To migrate from Supabase to Cloudinary:

1. Update `ListingForm.tsx` to use `useCloudinaryUpload`
2. Update `SceneList.tsx` for 360° scene uploads
3. Update database to store Cloudinary URLs
4. (Optional) Migrate existing images from Supabase to Cloudinary

## Support

For Cloudinary documentation:
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Node.js SDK](https://cloudinary.com/documentation/node_integration)
- [Image Transformations](https://cloudinary.com/documentation/image_transformations)
