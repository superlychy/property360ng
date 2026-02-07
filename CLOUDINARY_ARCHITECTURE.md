# Cloudinary Integration Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Real Estate 360 Platform                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Admin UI   │     │  Public UI   │     │  Components  │
│              │     │              │     │              │
│ ListingForm  │     │ Listing Page │     │ Cloudinary   │
│ SceneList    │     │ Tour Viewer  │     │ ImageUpload  │
└──────────────┘     └──────────────┘     └──────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Upload Layer    │
                    │                  │
                    │ useCloudinary    │
                    │ Upload Hook      │
                    └──────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │  Client  │  │  Server  │  │  Utils   │
        │  Upload  │  │  Actions │  │          │
        └──────────┘  └──────────┘  └──────────┘
                │             │             │
                └─────────────┼─────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │   Cloudinary     │
                    │   SDK (v2)       │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Cloudinary API  │
                    │                  │
                    │  Cloud Storage   │
                    │  + CDN           │
                    └──────────────────┘
```

## Data Flow

### Upload Flow
```
User selects file
       │
       ▼
CloudinaryImageUpload Component
       │
       ▼
useCloudinaryUpload Hook
       │
       ├─── Convert File to FormData
       │
       ▼
uploadImageToCloudinary (Server Action)
       │
       ├─── File → Buffer
       │
       ▼
Cloudinary SDK upload_stream
       │
       ├─── Apply transformations
       │    (quality: auto, format: auto)
       │
       ▼
Cloudinary Cloud Storage
       │
       ▼
Return secure_url + public_id
       │
       ▼
Update Component State
       │
       ▼
Save URL to Supabase Database
```

### Display Flow
```
Database URL
       │
       ▼
CloudinaryImage Component
       │
       ├─── Check if Cloudinary URL
       │
       ├─── Build transformation string
       │    (width, height, crop, quality, format)
       │
       ▼
Optimized Cloudinary URL
       │
       ▼
Global CDN Delivery
       │
       ▼
User's Browser
```

## File Structure

```
real-estate-360/
│
├── .env.local                          # Environment variables
│
├── lib/
│   ├── cloudinary.ts                   # Server-side config
│   ├── hooks/
│   │   └── useCloudinaryUpload.ts      # React hook
│   └── utils/
│       ├── cloudinary-upload.ts        # Utility functions
│       └── image-upload.ts             # Legacy Supabase (kept)
│
├── app/
│   ├── actions/
│   │   └── cloudinary.ts               # Server actions
│   └── cloudinary-demo/
│       └── page.tsx                    # Demo page
│
├── components/
│   ├── CloudinaryImageUpload.tsx       # Upload component
│   ├── CloudinaryImage.tsx             # Display component
│   └── admin/
│       ├── ListingForm.tsx             # ✅ Updated
│       └── SceneList.tsx               # ✅ Updated
│
└── Documentation/
    ├── CLOUDINARY_SETUP.md             # Full setup guide
    ├── CLOUDINARY_COMPLETE.md          # Completion summary
    └── CLOUDINARY_QUICK_REFERENCE.md   # Quick reference
```

## Component Relationships

```
┌─────────────────────────────────────────────────────────┐
│                    ListingForm.tsx                       │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  useCloudinaryUpload()                         │    │
│  │                                                 │    │
│  │  ├─ uploadImage(file, 'property-images')      │    │
│  │  ├─ uploading state                            │    │
│  │  └─ progress tracking                          │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  Cover Image Upload → property-images/                  │
│  Video Upload       → property-videos/                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    SceneList.tsx                         │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  useCloudinaryUpload()                         │    │
│  │                                                 │    │
│  │  └─ uploadImage(file, 'property-360-scenes')  │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  360° Scene Upload → property-360-scenes/               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              CloudinaryImageUpload.tsx                   │
│                                                          │
│  Reusable component with:                               │
│  ├─ File input                                          │
│  ├─ Progress bar                                        │
│  ├─ Preview                                             │
│  ├─ Error handling                                      │
│  └─ Callback on complete                                │
└─────────────────────────────────────────────────────────┘
```

## Cloudinary Folder Structure

```
cloudinary://dhjsvoorl/
│
├── property-images/
│   ├── abc123.jpg              # Cover images
│   ├── def456.jpg              # Gallery images
│   └── ...
│
├── property-videos/
│   ├── xyz789.mp4              # Walkthrough videos
│   └── ...
│
└── property-360-scenes/
    ├── scene_001.jpg           # Living room 360°
    ├── scene_002.jpg           # Kitchen 360°
    └── ...
```

## Integration Points

### 1. Upload Integration
- **ListingForm**: Cover images + videos
- **SceneList**: 360° panoramic images
- **Future**: User avatars, documents, etc.

### 2. Display Integration
- **CloudinaryImage**: Optimized image display
- **getCloudinaryUrl**: URL generation
- **getCloudinarySrcSet**: Responsive images

### 3. Database Integration
- Supabase stores Cloudinary URLs
- No migration needed for existing data
- Backward compatible with Supabase URLs

## Security

```
Client Side:
- File validation (size, type)
- Preview generation
- Progress tracking

Server Side:
- API key/secret in .env.local
- Server actions for secure upload
- Cloudinary handles authentication

Cloudinary:
- Secure URLs (HTTPS)
- Access control
- Transformation validation
```

## Performance Optimization

```
Upload:
├─ Client-side validation
├─ Async upload with progress
├─ Error handling
└─ Automatic retry (Cloudinary SDK)

Delivery:
├─ Global CDN
├─ Auto format (WebP/AVIF)
├─ Auto quality
├─ Lazy loading support
└─ Responsive images
```

## Backward Compatibility

```
Old Supabase URLs:
https://fieudfmxvocdpamfylas.supabase.co/storage/v1/...
                    ↓
            Still works!
                    ↓
        CloudinaryImage component
        detects and handles both

New Cloudinary URLs:
https://res.cloudinary.com/dhjsvoorl/image/upload/...
                    ↓
        Automatic optimization
                    ↓
        CDN delivery
```
