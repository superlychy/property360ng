'use client';

import { useState } from 'react';
import CloudinaryImageUpload from '@/components/CloudinaryImageUpload';

export default function CloudinaryDemo() {
    const [uploadedImages, setUploadedImages] = useState<Array<{ url: string; publicId: string }>>([]);

    const handleUploadComplete = (url: string, publicId: string) => {
        setUploadedImages(prev => [...prev, { url, publicId }]);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Cloudinary Integration Demo
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Upload images to Cloudinary with automatic optimization
                    </p>

                    {/* Single Image Upload */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Single Image Upload
                        </h2>
                        <CloudinaryImageUpload
                            onUploadComplete={handleUploadComplete}
                            folder="property-images"
                            buttonText="Upload Single Image"
                            maxSizeMB={10}
                        />
                    </div>

                    {/* Multiple Images Upload */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Multiple Images Upload
                        </h2>
                        <CloudinaryImageUpload
                            onUploadComplete={handleUploadComplete}
                            folder="property-images"
                            buttonText="Upload Multiple Images"
                            multiple={true}
                            maxSizeMB={10}
                        />
                    </div>

                    {/* Uploaded Images Gallery */}
                    {uploadedImages.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Uploaded Images ({uploadedImages.length})
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {uploadedImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                                    >
                                        <div className="aspect-video relative">
                                            <img
                                                src={image.url}
                                                alt={`Uploaded ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <p className="text-xs text-gray-500 font-mono truncate">
                                                {image.publicId}
                                            </p>
                                            <a
                                                href={image.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
                                            >
                                                View Full Image →
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Usage Instructions */}
                    <div className="mt-12 bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            How to Use in Your Components
                        </h3>
                        <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-sm">
                                {`import CloudinaryImageUpload from '@/components/CloudinaryImageUpload';

function MyComponent() {
  const handleUpload = (url: string, publicId: string) => {
    console.log('Image uploaded:', url);
    // Save to database, update state, etc.
  };

  return (
    <CloudinaryImageUpload
      onUploadComplete={handleUpload}
      folder="property-images"
      buttonText="Upload Image"
      multiple={false}
      maxSizeMB={10}
    />
  );
}`}
                            </pre>
                        </div>
                    </div>

                    {/* Features List */}
                    <div className="mt-8 grid md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-900 mb-2">✨ Features</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Automatic image optimization</li>
                                <li>• Auto format conversion (WebP, AVIF)</li>
                                <li>• Quality optimization</li>
                                <li>• Progress tracking</li>
                                <li>• File size validation</li>
                                <li>• Image preview</li>
                            </ul>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                            <h4 className="font-semibold text-green-900 mb-2">🚀 Benefits</h4>
                            <ul className="text-sm text-green-800 space-y-1">
                                <li>• Faster page load times</li>
                                <li>• CDN delivery worldwide</li>
                                <li>• Reduced bandwidth costs</li>
                                <li>• Better SEO performance</li>
                                <li>• Responsive images</li>
                                <li>• Easy transformations</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
