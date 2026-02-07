'use client';

/**
 * Client-side utility to generate optimized Cloudinary URLs
 * Use this in your components to display images with automatic optimization
 */

interface CloudinaryImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    quality?: 'auto' | 'best' | 'good' | 'eco' | 'low';
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
    crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb';
    className?: string;
}

/**
 * Optimized Cloudinary Image Component
 * Automatically applies best practices for image delivery
 */
export function CloudinaryImage({
    src,
    alt,
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    className = '',
}: CloudinaryImageProps) {
    // Check if it's a Cloudinary URL
    const isCloudinaryUrl = src.includes('cloudinary.com');

    if (!isCloudinaryUrl) {
        // Return regular img tag for non-Cloudinary images (e.g., old Supabase URLs)
        return <img src={src} alt={alt} className={className} />;
    }

    // Build transformation string
    const transformations: string[] = [];

    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    transformations.push(`c_${crop}`);
    transformations.push(`q_${quality}`);
    transformations.push(`f_${format}`);

    // Insert transformations into Cloudinary URL
    const transformString = transformations.join(',');
    const optimizedUrl = src.replace('/upload/', `/upload/${transformString}/`);

    return <img src={optimizedUrl} alt={alt} className={className} />;
}

/**
 * Get optimized Cloudinary URL (for use in src attributes)
 */
export function getCloudinaryUrl(
    url: string,
    options?: {
        width?: number;
        height?: number;
        quality?: 'auto' | 'best' | 'good' | 'eco' | 'low';
        format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
        crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb';
    }
): string {
    // Check if it's a Cloudinary URL
    if (!url.includes('cloudinary.com')) {
        return url; // Return as-is for non-Cloudinary URLs
    }

    const {
        width,
        height,
        quality = 'auto',
        format = 'auto',
        crop = 'fill',
    } = options || {};

    // Build transformation string
    const transformations: string[] = [];

    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    transformations.push(`c_${crop}`);
    transformations.push(`q_${quality}`);
    transformations.push(`f_${format}`);

    // Insert transformations into Cloudinary URL
    const transformString = transformations.join(',');
    return url.replace('/upload/', `/upload/${transformString}/`);
}

/**
 * Generate responsive srcSet for Cloudinary images
 */
export function getCloudinarySrcSet(url: string, widths: number[] = [640, 768, 1024, 1280, 1536]): string {
    if (!url.includes('cloudinary.com')) {
        return ''; // Return empty for non-Cloudinary URLs
    }

    return widths
        .map(width => {
            const optimizedUrl = getCloudinaryUrl(url, { width, quality: 'auto', format: 'auto' });
            return `${optimizedUrl} ${width}w`;
        })
        .join(', ');
}

/**
 * Example Usage:
 * 
 * // Using the component
 * <CloudinaryImage
 *   src={listing.cover_image}
 *   alt={listing.title}
 *   width={800}
 *   height={600}
 *   quality="auto"
 *   className="rounded-lg"
 * />
 * 
 * // Using the URL helper
 * const thumbnailUrl = getCloudinaryUrl(image.url, {
 *   width: 300,
 *   height: 200,
 *   crop: 'fill'
 * });
 * 
 * // Using responsive images
 * <img
 *   src={getCloudinaryUrl(image.url, { width: 1024 })}
 *   srcSet={getCloudinarySrcSet(image.url)}
 *   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 *   alt="Property"
 * />
 */
