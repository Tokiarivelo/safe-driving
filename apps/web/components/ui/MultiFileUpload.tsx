'use client';

import React, { useEffect, useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
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

        <label
          htmlFor={inputId}
          className={cn(
            'relative border-2 border-dashed border-[#E33486] bg-auth-color-input rounded-xl w-full h-[150px] flex flex-col items-center justify-center text-center cursor-pointer',
            error && 'border-destructive',
          )}
        >
          <UploadCloud className="text-[#E33486] w-8 h-8 mb-2" />
          <div className="text-sm text-auth-color-placeholder font-normal">
            {description || buttonText || 'Glissez un fichier ou cliquez pour télécharger'}
          </div>
          {maxFiles && (
            <p className="text-xs text-auth-color-placeholder mt-2">Maximum {maxFiles} fichiers</p>
          )}
        </label>

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
