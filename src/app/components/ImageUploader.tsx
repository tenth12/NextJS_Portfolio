'use client';

import React, { useState } from 'react';

interface ImageUploaderProps {
  label: string;
  onImageUpload: (imageUrl: string | string[]) => void;
  multiple?: boolean;
}

export default function ImageUploader({ label, onImageUpload, multiple = false }: ImageUploaderProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newPreviewImages: string[] = [];
      const uploadedImageUrls: string[] = [];

      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          newPreviewImages.push(base64String);
          uploadedImageUrls.push(base64String);

          if (newPreviewImages.length === files.length) {
            setPreviewImages(newPreviewImages);
            onImageUpload(multiple ? uploadedImageUrls : uploadedImageUrls[0]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileChange}
        className="mt-1 block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {previewImages.map((src, index) => (
          <img key={index} src={src} alt="Preview" className="w-24 h-24 object-cover rounded-md shadow-sm" />
        ))}
      </div>
    </div>
  );
}