// components/ui/Popup.tsx
'use client';
import { Button } from '@/components/ui/button';

interface PopupProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
  onAccept?: () => void;
  closeText?: string;
  acceptText?: string;
}

export const Popup = ({
  title,
  content,
  onClose,
  onAccept,
  closeText = 'Fermer',
  acceptText = 'Accepter',
}: PopupProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Fermer"
          >
            &times;
          </button>
        </div>
        <div className="overflow-y-auto flex-1 mb-4">{content}</div>
        <div className="flex justify-end gap-2">
          {onAccept && (
            <Button
              onClick={() => {
                onAccept();
                onClose();
              }}
              variant="default"
            >
              {acceptText}
            </Button>
          )}
          <Button onClick={onClose} variant="outline">
            {closeText}
          </Button>
        </div>
      </div>
    </div>
  );
};
