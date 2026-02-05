# Real Estate 360° Virtual Tour Application

A modern, mobile-first real estate web application with immersive 360° virtual tours, similar to Matterport, built with free and open-source tools.

## Features

### ✨ Core Features
- **Admin Dashboard** - Full property listing management
- **360° Scene Management** - Upload and organize equirectangular images
- **Interactive Hotspot Editor** - Click-to-place navigation points with Pannellum
- **Multi-Scene Navigation** - Seamless transitions between camera positions
- **Mobile-First Design** - Responsive UI optimized for all devices
- **Secure Authentication** - Admin-only access with Supabase Auth

### 🎯 Hotspot System
- Click anywhere in 360° panorama to place hotspots
- Automatic yaw/pitch coordinate capture
- Multiple hotspots per scene
- Custom labels for each hotspot
- Visual hotspot indicators
- Edit and delete functionality

## Tech Stack

- **Frontend:** Next.js 15 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS with custom design system
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Authentication:** Supabase Auth
- **360° Viewer:** Pannellum (CDN)
- **Hosting:** Vercel

## Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works)
- Vercel account (for deployment)

## Setup Instructions

### 1. Clone and Install

```bash
cd "c:\Users\Admin\real estate 360"
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the schema from `supabase/schema.sql`
3. Go to **Storage** and create a bucket named `property-images`
   - Make it **public**
4. Get your project credentials from **Settings > API**

### 3. Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_STORAGE_BUCKET=property-images
```

### 4. Create Admin User

In Supabase Dashboard > Authentication > Users, click "Add user" and create an admin account with email/password.

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Usage Guide

### Admin Workflow

1. **Login** - Visit `/login` and sign in with your admin credentials
2. **Create Listing** - Click "New Listing" and fill in property details
3. **Upload Scenes** - Navigate to the listing and upload 360° images
4. **Add Hotspots** - For each scene, click "Edit Hotspots" and place navigation points
5. **Publish** - Toggle the listing to "Published" when ready

### 360° Image Requirements

- **Format:** Equirectangular projection
- **Aspect Ratio:** 2:1 (e.g., 4096x2048, 8192x4096)
- **File Type:** JPG, PNG, WebP
- **Recommended Tools:**
  - Ricoh Theta cameras
  - Insta360 cameras
  - Google Street View app
  - Panorama stitching software

## Project Structure

```
real estate 360/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   │   ├── listings/      # Listing management
│   │   └── page.tsx       # Dashboard home
│   ├── login/             # Authentication
│   └── page.tsx           # Public homepage
├── components/            # React components
│   └── admin/            # Admin-specific components
├── lib/                   # Utilities and helpers
│   ├── supabase/         # Supabase clients
│   └── utils/            # Helper functions
├── types/                 # TypeScript definitions
├── supabase/             # Database schema
└── public/               # Static assets
```

## Database Schema

### Tables

- **listings** - Property information (title, price, location, etc.)
- **scenes** - 360° camera positions (one per image)
- **hotspots** - Navigation points between scenes

### Relationships

- `scenes.listing_id` → `listings.id`
- `hotspots.scene_id` → `scenes.id`
- `hotspots.target_scene_id` → `scenes.id`

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npm run type-check
```

## Troubleshooting

### Pannellum not loading
- Check browser console for errors
- Ensure CDN is accessible
- Verify image URL is correct and accessible

### Images not uploading
- Check Supabase Storage bucket is public
- Verify environment variables are set
- Check file size limits

### Hotspots not appearing
- Ensure yaw/pitch values are within valid ranges
- Check that target scene exists
- Verify database permissions (RLS policies)

## Future Enhancements

- Public listing browse and virtual tour viewer
- Mobile gyroscope support
- Floor plan navigation
- Analytics and heatmaps
- Multi-language support
- VR headset mode

## License

MIT

## Support

For issues and questions, please check the documentation or create an issue in the repository.

---

Built with ❤️ using Next.js, Supabase, and Pannellum
