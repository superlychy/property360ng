'use client';

import { useRef, useState } from 'react';
import { useCloudinaryUpload } from '@/lib/hooks/useCloudinaryUpload';

interface CloudinaryImageUploadProps {
    onUploadComplete?: (url: string, publicId: string) => void;
    folder?: string;
    accept?: string;
    maxSizeMB?: number;
    className?: string;
    buttonText?: string;
    multiple?: boolean;
}

export default function CloudinaryImageUpload({
    onUploadComplete,
    folder = 'property-images',
    accept = 'image/*',
    maxSizeMB = 10,
    className = '',
    buttonText = 'Upload Image',
    multiple = false,
}: CloudinaryImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string[]>([]);
    const { uploadImage, uploadMultipleImages, uploading, progress, error } = useCloudinaryUpload();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        if (files.length === 0) return;

        // Validate file sizes
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        const oversizedFiles = files.filter(file => file.size > maxSizeBytes);

        if (oversizedFiles.length > 0) {
            alert(`Some files exceed ${maxSizeMB}MB limit`);
            return;
        }

        // Create previews
        const previewUrls = await Promise.all(
            files.map(file => {
                return new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(file);
                });
            })
        );
        setPreview(previewUrls);

        // Upload
        if (multiple) {
            const results = await uploadMultipleImages(files, folder);
            results.forEach(result => {
                if (onUploadComplete) {
                    onUploadComplete(result.url, result.publicId);
                }
            });
        } else {
            const result = await uploadImage(files[0], folder);
            if (result && onUploadComplete) {
                onUploadComplete(result.url, result.publicId);
            }
        }

        // Clear preview after upload
        setTimeout(() => setPreview([]), 2000);
    };

    return (
        <div className={`cloudinary-upload ${className}`}>
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
            />

            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
                {uploading ? 'Uploading...' : buttonText}
            </button>

            {uploading && (
                <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{progress}%</p>
                </div>
            )}

            {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {preview.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {preview.map((url, index) => (
                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                            <img
                                src={url}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
