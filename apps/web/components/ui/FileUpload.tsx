"use client"

import React from "react"
import { UploadCloud } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onUpload: (files: FileList | null) => void
  title?: string
  description?: string
  className?: string
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, title, description, onUpload, accept, multiple = false, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpload(e.target.files)
    }

    return (
      <div className="space-y-2">
        {title && <h4 className="font-medium">{title}</h4>}
        <label
          className={cn(
            "relative border border-[#E33486] bg-auth-color-input rounded-xl w-full h-[150px] flex flex-col items-center justify-center text-center cursor-pointer hover:opacity-90 transition",
            className
          )}
        >
          <UploadCloud className="text-green-500 w-8 h-8 mb-2" />
          <div className="text-sm text-auth-color-placeholder font-normal">
            {description || "Glissez un fichier ou cliquez pour télécharger"}
          </div>
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
      </div>
    )
  }
)

FileUpload.displayName = "FileUpload"

export { FileUpload }