'use client';

import React from 'react';
import { UploadCloud, X } from 'lucide-react';
// import { Button } from './button';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onUpload: (file: File) => void;
  onRemove?: () => void;
  className?: string;
  accept?: string;
  error?: string;
  file?: File;
}

export const FileUpload = ({
  onUpload,
  onRemove,
  className = '',
  accept = 'image/*,.pdf',
  error,
  file
}: FileUploadProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onUpload(e.target.files[0]);
      e.target.value = '';
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {!file ? (
        <>
          <label
            htmlFor="single-file-upload"
            className="relative border-2 border-dashed border-[#E33486] bg-auth-color-input rounded-xl 
            w-full max-w-[200px] h-[100px] flex flex-col items-center justify-center 
            text-center cursor-pointer"
>
            <UploadCloud className="text-[#E33486] w-8 h-8 mb-2" />
            <div className="text-sm text-auth-color-placeholder font-normal">
              Glissez un fichier ou cliquez pour télécharger
            </div>
            <input
              id="single-file-upload"
              type="file"
              accept={accept}
              onChange={handleChange}
              className="hidden"
            />
          </label>
          {error && <p className="text-xs text-destructive mt-1">{error}</p>}
        </>
      ) : (
        <>
          <div className="flex items-center justify-between p-3 bg-auth-color-input rounded-lg">
            <span
              className="text-sm text-auth-color-placeholder truncate max-w-[80%]"
              title={file.name}
            >
              {file.name}
            </span>
            <button
              type="button"
              onClick={onRemove}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Supprimer le fichier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {error && <p className="text-xs text-destructive mt-1">{error}</p>}
        </>
      )}
    </div>
  );
};
