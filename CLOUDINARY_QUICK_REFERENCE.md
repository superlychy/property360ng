# Cloudinary Quick Reference

## 🚀 Quick Start

### Upload an Image
```tsx
import { useCloudinaryUpload } from '@/lib/hooks/useCloudinaryUpload';

const { uploadImage, uploading, progress } = useCloudinaryUpload();

const handleUpload = async (file: File) => {
  const result = await uploadImage(file, 'property-images');
  if (result) {
    console.log(result.url);      // https://res.cloudinary.com/...
    console.log(result.publicId); // property-images/abc123
  }
};
```

### Display Optimized Image
```tsx
import { CloudinaryImage } from '@/components/CloudinaryImage';

<CloudinaryImage
  src={imageUrl}
  alt="Property"
  width={800}
  height={600}
  quality="auto"
  className="rounded-lg"
/>
```

### Use Upload Component
```tsx
import CloudinaryImageUpload from '@/components/CloudinaryImageUpload';

<CloudinaryImageUpload
  onUploadComplete={(url, publicId) => {
    setImageUrl(url);
  }}
  folder="property-images"
  buttonText="Upload Image"
  multiple={false}
/>
```

## 📁 Folder Organization

| Folder | Purpose |
|--------|---------|
| `property-images` | Main property photos |
| `property-videos` | Property walkthrough videos |
| `property-360-scenes` | 360° panoramic images |

## 🎨 Image Transformations

### Get Thumbnail
```tsx
import { getCloudinaryUrl } from '@/components/CloudinaryImage';

const thumbnail = getCloudinaryUrl(imageUrl, {
  width: 300,
  height: 200,
  crop: 'fill',
  quality: 'auto'
});
```

### Responsive Images
```tsx
import { getCloudinarySrcSet } from '@/components/CloudinaryImage';

<img
  src={getCloudinaryUrl(imageUrl, { width: 1024 })}
  srcSet={getCloudinarySrcSet(imageUrl)}
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Property"
/>
```

## 🔧 Server Actions

### Upload from Server
```tsx
import { uploadImageToCloudinary } from '@/app/actions/cloudinary';

const formData = new FormData();
formData.append('file', file);

const result = await uploadImageToCloudinary(formData, 'property-images');
```

### Upload Multiple
```tsx
import { uploadMultipleImagesToCloudinary } from '@/app/actions/cloudinary';

const formData = new FormData();
files.forEach(file => formData.append('files', file));

const result = await uploadMultipleImagesToCloudinary(formData, 'property-images');
```

## 📊 Environment Variables

```bash
CLOUDINARY_CLOUD_NAME=dhjsvoorl
CLOUDINARY_API_KEY=385927627838147
CLOUDINARY_API_SECRET=qxON31G0ueWU3kKLjBhx3-TLHJQ
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dhjsvoorl
```

## 🎯 Common Use Cases

### Property Listing Form
```tsx
const { uploadImage, uploading } = useCloudinaryUpload();

const handleCoverImage = async (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const result = await uploadImage(file, 'property-images');
    if (result) {
      setFormData(prev => ({ ...prev, cover_image: result.url }));
    }
  }
};
```

### 360° Scene Upload
```tsx
const result = await uploadImage(file, 'property-360-scenes');
if (result) {
  await supabase.from('scenes').insert({
    listing_id: listingId,
    image_360_url: result.url,
    name: sceneName
  });
}
```

### Video Upload
```tsx
const result = await uploadImage(videoFile, 'property-videos');
if (result) {
  setFormData(prev => ({ ...prev, video_url: result.url }));
}
```

## 🔍 Testing

### Demo Page
```
http://localhost:3000/cloudinary-demo
```

### Cloudinary Dashboard
```
https://console.cloudinary.com/
```

## 💡 Tips

1. **Always use folders** - Organize uploads by type
2. **Use auto quality** - Let Cloudinary optimize
3. **Use auto format** - Automatic WebP/AVIF conversion
4. **Validate file sizes** - Check before upload
5. **Handle errors** - Always check upload result

## 🆘 Troubleshooting

### Upload Fails
- Check environment variables are set
- Verify file size (max 10MB by default)
- Check Cloudinary dashboard for errors

### Images Not Optimized
- Ensure using `CloudinaryImage` component
- Check transformation parameters
- Verify URL includes transformations

### Slow Uploads
- Check file size
- Consider compressing before upload
- Use progress tracking for UX

## 📚 Resources

- [Full Documentation](./CLOUDINARY_SETUP.md)
- [Completion Summary](./CLOUDINARY_COMPLETE.md)
- [Cloudinary Docs](https://cloudinary.com/documentation)
