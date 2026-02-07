'use client';

import { useState } from 'react';
import { getCloudinarySignature } from '@/app/actions/cloudinary';

export interface UploadResult {
    url: string;
    publicId: string;
}

export function useCloudinaryUpload() {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const uploadDirectly = async (file: File, folder: string = 'property-images'): Promise<UploadResult | null> => {
        return new Promise(async (resolve, reject) => {
            try {
                // 1. Get signature from server
                const signatureData = await getCloudinarySignature({
                    folder,
                });

                if (signatureData.error || !signatureData.signature) {
                    throw new Error(signatureData.error || 'Failed to get upload signature');
                }

                const { signature, timestamp, apiKey, cloudName } = signatureData;

                // 2. Prepare upload
                const formData = new FormData();
                formData.append('file', file);
                formData.append('api_key', apiKey!);
                formData.append('timestamp', timestamp!.toString());
                formData.append('signature', signature);
                formData.append('folder', folder);

                // 3. Upload directly to Cloudinary using XHR for progress
                const xhr = new XMLHttpRequest();
                const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

                xhr.open('POST', url);

                xhr.upload.onprogress = (e) => {
                    if (e.lengthComputable) {
                        const percentComplete = Math.round((e.loaded / e.total) * 100);
                        setProgress(percentComplete);
                    }
                };

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const result = JSON.parse(xhr.responseText);
                        resolve({
                            url: result.secure_url,
                            publicId: result.public_id
                        });
                    } else {
                        try {
                            const errorResponse = JSON.parse(xhr.responseText);
                            reject(new Error(errorResponse.error?.message || 'Upload failed'));
                        } catch {
                            reject(new Error(`Upload failed with status ${xhr.status}`));
                        }
                    }
                };

                xhr.onerror = () => {
                    reject(new Error('Network error during upload'));
                };

                xhr.send(formData);

            } catch (err) {
                reject(err);
            }
        });
    };

    const uploadImage = async (file: File, folder?: string): Promise<UploadResult | null> => {
        setUploading(true);
        setError(null);
        setProgress(0);

        try {
            const result = await uploadDirectly(file, folder);
            return result;
        } catch (err) {
            console.error('Upload error:', err);
            setError(err instanceof Error ? err.message : 'Upload failed');
            return null;
        } finally {
            setUploading(false);
            // Reset progress after a delay
            setTimeout(() => setProgress(0), 1000);
        }
    };

    const uploadMultipleImages = async (
        files: File[],
        folder: string = 'property-images'
    ): Promise<UploadResult[]> => {
        setUploading(true);
        setError(null);
        setProgress(0);

        try {
            const results: UploadResult[] = [];
            const totalFiles = files.length;
            let completedFiles = 0;

            // Upload files sequentially to maintain order and easier progress tracking
            // Parallel uploads are possible but complex to track unified progress nicely
            for (const file of files) {
                // Reset progress for individual file tracking or calculate total?
                // Let's do a simple average progress or individual
                // For simplicity in this UI, we'll just track current file progress 
                // but user sees global "Uploading..."

                const result = await uploadDirectly(file, folder);
                if (result) {
                    results.push(result);
                }

                completedFiles++;
                // Update progress based on file count for simplicity in multi-upload
                setProgress(Math.round((completedFiles / totalFiles) * 100));
            }

            return results;
        } catch (err) {
            console.error('Multiple upload error:', err);
            setError(err instanceof Error ? err.message : 'Upload failed');
            return []; // Return partial results? Or empty? consistent with previous behavior
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
