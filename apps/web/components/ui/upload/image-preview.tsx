import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  //  DialogDescription,
  //  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
// import { Button } from '../button';

// Small ImagePreview component: thumbnails, remove, modal preview, per-image progress
export function ImagePreview({
  files,
  uploadProgress,
  onRemove,
  onOpenPreview,
}: {
  files: File[];
  uploadProgress?: Record<number, number>;
  onRemove?: (index: number) => void;
  onOpenPreview?: (index: number) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const urls = useMemo(
    () => files.map(f => ({ name: f.name, url: URL.createObjectURL(f) })),
    [files],
  );

  useEffect(() => {
    return () => {
      // revoke all urls when component unmounts
      urls.forEach(u => URL.revokeObjectURL(u.url));
    };
  }, [urls]);

  if (files.length === 0) return null;

  return (
    <div className="image-preview-container flex gap-2 flex-wrap">
      <Dialog>
        {urls.map((u, i) => (
          <div key={i} className="w-[120px] text-center">
            <DialogTrigger asChild>
              <button
                type="button"
                onClick={() => {
                  setSelected(i);
                  onOpenPreview?.(i);
                }}
                className="border-none p-0 bg-transparent cursor-pointer"
                aria-label={`Preview ${u.name}`}
              >
                <Image
                  src={u.url}
                  alt={u.name}
                  width={96}
                  height={96}
                  className="w-[96px] h-[96px] object-cover rounded-md shadow"
                  unoptimized
                />
              </button>
            </DialogTrigger>
            <div className="text-xs mt-1" title={u.name}>
              {u.name.length > 18 ? u.name.slice(0, 15) + '...' : u.name}
            </div>
            <div className="text-xs mt-1" title={u.url}>
              {Math.round(files[i].size / 1024)} KB
            </div>

            {/* Per-image progress bar */}
            <div className="mt-1">
              <div className="h-1.5 w-[96px] bg-gray-200 rounded overflow-hidden">
                <div
                  className="bg-green-500 h-full"
                  style={{ width: `${uploadProgress?.[i] ?? 0}%` }}
                />
              </div>
              <div className="text-xs">{uploadProgress?.[i] ?? 0}%</div>
            </div>

            {onRemove && (
              <button
                onClick={() => onRemove(i)}
                className="mt-1 text-xs bg-white border border-gray-300 px-2 py-1 rounded cursor-pointer"
              >
                Supprimer
              </button>
            )}
          </div>
        ))}

        {/* Modal */}
        {selected !== null && (
          <DialogContent className="w-">
            <DialogHeader>
              <DialogTitle>{urls[selected].name}</DialogTitle>
            </DialogHeader>
            {/* wrapper central qui gère le scroll si besoin */}
            <div
              onClick={e => e.stopPropagation()}
              className="w-full h-full flex items-center justify-center bg-white p-3"
              style={{ minHeight: 0 }} // important pour certains cas flex/overflow
            >
              {/* zone scrollable si l'image est trop grande */}
              <div className="max-w-full max-h-full overflow-auto">
                <Image
                  src={urls[selected].url}
                  alt={urls[selected].name}
                  width={800}
                  height={600}
                  className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain block"
                  unoptimized
                />
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
