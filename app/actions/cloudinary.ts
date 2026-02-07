'use server';

import cloudinary from '@/lib/cloudinary';

/**
 * Server action to upload image to Cloudinary
 * This is called from client components
 */
export async function uploadImageToCloudinary(
    formData: FormData,
    folder: string = 'property-images'
) {
    try {
        const file = formData.get('file') as File;

        if (!file) {
            return { error: 'No file provided' };
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary using a promise
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: folder,
                    resource_type: 'auto',
                    transformation: [
                        { quality: 'auto', fetch_format: 'auto' }
                    ]
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        return {
            success: true,
            url: (result as any).secure_url,
            publicId: (result as any).public_id
        };
    } catch (error) {
        console.error('Upload error:', error);
        return { error: 'Failed to upload image' };
    }
}

/**
 * Server action to delete image from Cloudinary
 */
export async function deleteImageFromCloudinary(publicId: string) {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return { success: true, result };
    } catch (error) {
        console.error('Delete error:', error);
        return { error: 'Failed to delete image' };
    }
}

/**
 * Server action to upload multiple images
 */
export async function uploadMultipleImagesToCloudinary(
    formData: FormData,
    folder: string = 'property-images'
) {
    try {
        const files = formData.getAll('files') as File[];

        if (!files || files.length === 0) {
            return { error: 'No files provided' };
        }

        const uploadPromises = files.map(async (file) => {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: folder,
                        resource_type: 'auto',
                        transformation: [
                            { quality: 'auto', fetch_format: 'auto' }
                        ]
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(buffer);
            });
        });

        const results = await Promise.all(uploadPromises);

        return {
            success: true,
            images: results.map((result: any) => ({
                url: result.secure_url,
                publicId: result.public_id
            }))
        };
    } catch (error) {
        console.error('Multiple upload error:', error);
        return { error: 'Failed to upload images' };
    }
}

/**
 * Generate a signature for client-side uploads
 * This allows uploading directly to Cloudinary without going through our server
 */
export async function getCloudinarySignature(params: Record<string, any>) {
    try {
        const timestamp = Math.round(new Date().getTime() / 1000);

        // Add timestamp to params as it's required for signature
        const paramsToSign = {
            ...params,
            timestamp
        };

        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.CLOUDINARY_API_SECRET!
        );

        return {
            signature,
            timestamp,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY
        };
    } catch (error) {
        console.error('Signature generation error:', error);
        return { error: 'Failed to generate signature' };
    }
}
