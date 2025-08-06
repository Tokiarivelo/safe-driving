'use client';

import React from 'react';
import { UploadCloud, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MultiFileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onUpload: (files: File[]) => void;
  title?: string;
  description?: string;
  className?: string;
  buttonText?: string;
  addMoreText?: string;
  files?: File[];
}

const MultiFileUpload = React.forwardRef<HTMLInputElement, MultiFileUploadProps>(
  ({ 
    className, 
    title, 
    description, 
    onUpload, 
    buttonText, 
    addMoreText, 
    id,
    accept, 
    multiple = false,
    files = [],
    ...props 
  }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = event.target.files;
      if (newFiles && newFiles.length > 0) {
        const updatedFiles = multiple ? [...files, ...Array.from(newFiles)] : Array.from(newFiles);
        onUpload(updatedFiles);
        // Reset input value to allow selecting same files again
        if (event.target) event.target.value = '';
      }
    };

    const handleRemove = (index: number) => {
      const updatedFiles = files.filter((_, i) => i !== index);
      onUpload(updatedFiles);
    };

    return (
      <div className="space-y-2">
        {title && <h4 className="font-medium">{title}</h4>}
        
        <label
          htmlFor={id || 'file-upload'}
          className={cn(
            "relative border-2 border-dashed border-[#E33486] bg-auth-color-input rounded-xl w-full h-[150px] flex flex-col items-center justify-center text-center cursor-pointer",
            className
          )}
        >
          <UploadCloud className="text-green-500 w-8 h-8 mb-2" />
          <div className="text-sm text-auth-color-placeholder font-normal">
            {description || buttonText || "Glissez un fichier ou cliquez pour télécharger"}
          </div>
        </label>

        <input
          ref={ref}
          id={id || 'file-upload'}
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
              <div key={`${file.name}-${index}`} className="flex items-center justify-between p-3 bg-auth-color-input rounded-lg">
                <span className="text-sm text-auth-color-placeholder truncate max-w-[80%]">
                  {file.name}
                </span>
                <button 
                  type="button" 
                  onClick={() => handleRemove(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {addMoreText && files.length > 0 && (
          <p className="text-xs text-auth-color-placeholder mt-2">{addMoreText}</p>
        )}
      </div>
    );
  }
);

MultiFileUpload.displayName = 'MultiFileUpload';

export { MultiFileUpload };