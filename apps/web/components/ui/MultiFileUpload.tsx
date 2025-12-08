'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface MultiFileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onUpload: (files: File[]) => void;
  files: File[];
  initialFiles?: { url: string; name: string; key?: string }[];
  title?: string;
  description?: string;
  className?: string;
  buttonText?: string;
  addMoreText?: string;
  error?: string;
  maxFiles?: number;
  uniqueId: string;
}

const MultiFileUpload = React.forwardRef<HTMLInputElement, MultiFileUploadProps>(
  (
    {
      className,
      title,
      description,
      onUpload,
      buttonText,
      addMoreText,
      files = [],
      initialFiles = [],
      id,
      uniqueId,
      accept,
      multiple = false,
      maxFiles,
      error,
      ...props
    },
    ref,
  ) => {
    const inputId = id || `file-upload-${uniqueId}`;
    const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);

    useEffect(() => {
      const newPreviews = files.map(file => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setPreviews(newPreviews);

      return () => {
        newPreviews.forEach(preview => URL.revokeObjectURL(preview.url));
      };
    }, [files]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = event.target.files;
      if (newFiles && newFiles.length > 0) {
        let updatedFiles = [...files, ...Array.from(newFiles)];
        if (maxFiles) {
          updatedFiles = updatedFiles.slice(0, maxFiles);
        }
        onUpload(updatedFiles);
        event.target.value = '';
      }
    };

    const handleRemove = (index: number) => {
      const updatedFiles = files.filter((_, i) => i !== index);
      onUpload(updatedFiles);
    };

    const isImage = (file: File) => file.type.startsWith('image/');
    const isUrlImage = (url: string) => {
      const ext = url.split('.').pop()?.toLowerCase();
      return (
        ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '') || url.startsWith('blob:')
      );
    };

    return (
      <div className={cn('space-y-2', className)}>
        {title && <h4 className="font-medium text-auth-color-text-custom-magenta">{title}</h4>}

        <div
          className={cn(
            'relative border-2 border-dashed border-[#E33486] bg-auth-color-input rounded-xl w-full h-[200px] flex flex-col items-center justify-center text-center p-6',
            error && 'border-destructive',
          )}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
            <defs>
              <linearGradient id="uploadGradientMulti" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#E33486" />
              </linearGradient>
            </defs>
            <path d="M20 28L32 16L44 28M32 16V44M52 44V52C52 54.2091 50.2091 56 48 56H16C13.7909 56 12 54.2091 12 52V44" 
              stroke="url(#uploadGradientMulti)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="32" cy="50" r="2" fill="url(#uploadGradientMulti)"/>
            <circle cx="20" cy="50" r="2" fill="url(#uploadGradientMulti)"/>
            <circle cx="44" cy="50" r="2" fill="url(#uploadGradientMulti)"/>
          </svg>
          <h3 className="text-lg font-medium text-[#E33486] mb-2">
            Glissez / Déposez
          </h3>
          <p className="text-sm text-auth-color-placeholder mb-4">
            Les fichiers acceptés sont: JPEG, PNG, GIF avec une taille maximale de 15Mo
          </p>
          <label
            htmlFor={inputId}
            className="px-6 py-2 bg-[#E33486] text-white rounded-lg cursor-pointer hover:bg-[#c92a72] transition-colors font-medium"
          >
            Parcourir
          </label>
          {maxFiles && (
            <p className="text-xs text-auth-color-placeholder mt-2">Maximum {maxFiles} fichiers</p>
          )}
        </div>

        <input
          ref={ref}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
          {...props}
        />

        {/* Existing Files Display */}
        {initialFiles.length > 0 && (
          <div className="w-full mt-4 space-y-2">
            <h5 className="text-xs font-medium text-gray-500">Fichiers existants</h5>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {initialFiles.map((file, index) => (
                <div
                  key={`initial-${uniqueId}-${index}`}
                  className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square"
                >
                  {isUrlImage(file.url) ? (
                    <Image src={file.url} alt={file.name} fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100 text-xs text-gray-500 p-2 text-center break-words">
                      {file.name}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-medium truncate px-2">{file.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Files Previews */}
        {files.length > 0 && (
          <div className="w-full mt-4 space-y-2">
            <h5 className="text-xs font-medium text-gray-500">Nouveaux fichiers</h5>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {previews.map((preview, index) => (
                <div
                  key={`preview-${uniqueId}-${index}`}
                  className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square"
                >
                  {isImage(preview.file) ? (
                    <Image
                      src={preview.url}
                      alt={preview.file.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100 text-xs text-gray-500 p-2 text-center break-words">
                      {preview.file.name}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
                  >
                    <X className="w-3 h-3 text-gray-600" />
                  </button>

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <p className="text-white text-xs font-medium truncate px-2">
                      {preview.file.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {addMoreText && files.length > 0 && files.length < (maxFiles || Infinity) && (
          <p className="text-xs text-auth-color-placeholder mt-1">{addMoreText}</p>
        )}
        {error && <p className="text-xs text-destructive mt-1">{error}</p>}
      </div>
    );
  },
);

MultiFileUpload.displayName = 'MultiFileUpload';

export { MultiFileUpload };
