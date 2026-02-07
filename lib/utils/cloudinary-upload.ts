import cloudinary from '../cloudinary';

/**
 * Upload an image to Cloudinary
 * @param file - The file to upload (File object or base64 string)
 * @param folder - Optional folder path in Cloudinary (default: 'property-images')
 * @returns The secure URL of the uploaded image
 */
export const uploadToCloudinary = async (
    file: File | string,
    folder: string = 'property-images'
): Promise<string> => {
    try {
        let uploadData: string;

        // Convert File to base64 if needed
        if (file instanceof File) {
            uploadData = await fileToBase64(file);
        } else {
            uploadData = file;
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(uploadData, {
            folder: folder,
            resource_type: 'auto',
            transformation: [
                { quality: 'auto', fetch_format: 'auto' }
            ]
        });

        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Failed to upload image to Cloudinary');
    }
};

/**
 * Upload multiple images to Cloudinary
 * @param files - Array of files to upload
 * @param folder - Optional folder path in Cloudinary
 * @returns Array of secure URLs
 */
export const uploadMultipleToCloudinary = async (
    files: File[],
    folder: string = 'property-images'
): Promise<string[]> => {
    const uploadPromises = files.map(file => uploadToCloudinary(file, folder));
    return Promise.all(uploadPromises);
};

/**
 * Delete an image from Cloudinary
 * @param publicId - The public ID of the image to delete
 * @returns Deletion result
 */
export const deleteFromCloudinary = async (publicId: string) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw new Error('Failed to delete image from Cloudinary');
    }
};

/**
 * Get optimized image URL with transformations
 * @param publicId - The public ID of the image
 * @param options - Transformation options
 * @returns Optimized image URL
 */
export const getOptimizedImageUrl = (
    publicId: string,
    options?: {
        width?: number;
        height?: number;
        crop?: string;
        quality?: string;
        format?: string;
    }
): string => {
    return cloudinary.url(publicId, {
        fetch_format: options?.format || 'auto',
        quality: options?.quality || 'auto',
        width: options?.width,
        height: options?.height,
        crop: options?.crop || 'fill',
    });
};

/**
 * Convert File to base64 string
 * @param file - File object to convert
 * @returns Base64 string
 */
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};
