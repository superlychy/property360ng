'use client';

import { useState } from 'react';
import { uploadImageToCloudinary, uploadMultipleImagesToCloudinary } from '@/app/actions/cloudinary';

export interface UploadResult {
    url: string;
    publicId: string;
}

export function useCloudinaryUpload() {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const uploadImage = async (file: File, folder?: string): Promise<UploadResult | null> => {
        setUploading(true);
        setError(null);
        setProgress(0);

        try {
            const formData = new FormData();
            formData.append('file', file);

            // Simulate progress (Cloudinary doesn't provide real-time progress)
            const progressInterval = setInterval(() => {
                setProgress(prev => Math.min(prev + 10, 90));
            }, 200);

            const result = await uploadImageToCloudinary(formData, folder);

            clearInterval(progressInterval);
            setProgress(100);

            if ('error' in result) {
                setError(result.error);
                return null;
            }

            return {
                url: result.url!,
                publicId: result.publicId!
            };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
            return null;
        } finally {
            setUploading(false);
            setTimeout(() => setProgress(0), 1000);
        }
    };

    const uploadMultipleImages = async (
        files: File[],
        folder?: string
    ): Promise<UploadResult[]> => {
        setUploading(true);
        setError(null);
        setProgress(0);

        try {
            const formData = new FormData();
            files.forEach(file => formData.append('files', file));

            // Simulate progress
            const progressInterval = setInterval(() => {
                setProgress(prev => Math.min(prev + 10, 90));
            }, 300);

            const result = await uploadMultipleImagesToCloudinary(formData, folder);

            clearInterval(progressInterval);
            setProgress(100);

            if ('error' in result) {
                setError(result.error);
                return [];
            }

            return result.images!;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
            return [];
        } finally {
            setUploading(false);
            setTimeout(() => setProgress(0), 1000);
        }
    };

    return {
        uploadImage,
        uploadMultipleImages,
        uploading,
        progress,
        error,
    };
}
