"use client"

import React from "react"
import { UploadCloud } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileSelect?: (files: FileList | null) => void
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, onFileSelect, accept, multiple = false, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onFileSelect?.(e.target.files)
    }

    return (
      <label
        className={cn(
          "relative border border-[#E33486] bg-auth-color-input rounded-xl w-full h-[150px] flex flex-col items-center justify-center text-center cursor-pointer hover:opacity-90 transition",
          className
        )}
      >
        <UploadCloud className="text-green-500 w-8 h-8 mb-2" />
        <p className="text-sm text-auth-color-placeholder font-normal">Déposez un fichier ou cliquez ici</p>

        <input
          {...props}
          type="file"
          accept={accept}
          multiple={multiple}
          ref={ref}
          onChange={handleChange}
          className="hidden"
        />
      </label>
    )
  }
)

FileUpload.displayName = "FileUpload"

export { FileUpload }
