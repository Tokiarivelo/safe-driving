'use client';

import React from 'react';
import { X } from 'lucide-react';
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
          <div className="relative border-2 border-dashed border-[#E33486] bg-auth-color-input rounded-xl 
            w-full h-[200px] flex flex-col items-center justify-center 
            text-center p-6">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
              <defs>
                <linearGradient id="uploadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B35" />
                  <stop offset="100%" stopColor="#E33486" />
                </linearGradient>
              </defs>
              <path d="M20 28L32 16L44 28M32 16V44M52 44V52C52 54.2091 50.2091 56 48 56H16C13.7909 56 12 54.2091 12 52V44" 
                stroke="url(#uploadGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="32" cy="50" r="2" fill="url(#uploadGradient)"/>
              <circle cx="20" cy="50" r="2" fill="url(#uploadGradient)"/>
              <circle cx="44" cy="50" r="2" fill="url(#uploadGradient)"/>
            </svg>
            <h3 className="text-lg font-medium text-[#E33486] mb-2">
              Glissez / Déposez
            </h3>
            <p className="text-sm text-auth-color-placeholder mb-4">
              Les fichiers acceptés sont: JPEG, PNG, GIF avec une taille maximale de 15Mo
            </p>
            <label
              htmlFor="single-file-upload"
              className="px-6 py-2 bg-[#E33486] text-white rounded-lg cursor-pointer hover:bg-[#c92a72] transition-colors font-medium"
            >
              Parcourir
            </label>
            <input
              id="single-file-upload"
              type="file"
              accept={accept}
              onChange={handleChange}
              className="hidden"
            />
          </div>
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
