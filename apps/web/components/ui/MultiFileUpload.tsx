'use client';

import React from 'react';
import { UploadCloud, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MultiFileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onUpload: (files: File[]) => void;
  files: File[];
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
  ({ 
    className, 
    title, 
    description, 
    onUpload, 
    buttonText, 
    addMoreText, 
    files = [],
    id,
    uniqueId,
    accept, 
    multiple = false,
    maxFiles,
    error,
    ...props 
  }, ref) => {
    const inputId = id || `file-upload-${uniqueId}`;

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

    return (
      <div className={cn("space-y-2", className)}>
        {title && <h4 className="font-medium text-auth-color-text-custom-magenta">{title}</h4>}
        
        <label
          htmlFor={inputId}
          className={cn(
            "relative border-2 border-dashed border-[#E33486] bg-auth-color-input rounded-xl w-full h-[150px] flex flex-col items-center justify-center text-center cursor-pointer",
            error && "border-destructive"
          )}
        >
          <UploadCloud className="text-[#E33486] w-8 h-8 mb-2" />
          <div className="text-sm text-auth-color-placeholder font-normal">
            {description || buttonText || "Glissez un fichier ou cliquez pour télécharger"}
          </div>
          {maxFiles && (
            <p className="text-xs text-auth-color-placeholder mt-2">
              Maximum {maxFiles} fichiers
            </p>
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

        {files.length > 0 && (
          <div className="w-full mt-4 space-y-2">
            {files.map((file, index) => (
              <div 
                key={`${uniqueId}-${index}-${file.name}-${file.size}-${file.lastModified}`}
                className="flex items-center justify-between p-3 bg-auth-color-input rounded-lg"
              >
                <span 
                  className="text-sm text-auth-color-placeholder truncate max-w-[80%]"
                  title={file.name}
                >
                  {file.name}
                </span>
                <button 
                  type="button" 
                  onClick={() => handleRemove(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {addMoreText && files.length > 0 && files.length < (maxFiles || Infinity) && (
          <p className="text-xs text-auth-color-placeholder mt-1">{addMoreText}</p>
        )}
        {error && <p className="text-xs text-destructive mt-1">{error}</p>}
      </div>
    );
  }
);

MultiFileUpload.displayName = 'MultiFileUpload';

export { MultiFileUpload };
