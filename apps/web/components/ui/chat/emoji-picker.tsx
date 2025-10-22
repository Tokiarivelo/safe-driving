'use client';

import { useState, useRef, useEffect } from 'react';
import { Smile } from 'lucide-react';
import { EmojiPicker as FrimousseEmojiPicker } from 'frimousse';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  triggerClassName?: string;
  position?: 'top' | 'bottom';
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onEmojiSelect,
  triggerClassName = '',
  position = 'top',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleEmojiClick = (emoji: { emoji: string }) => {
    onEmojiSelect(emoji.emoji);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={pickerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`p-1 hover:bg-gray-100 rounded text-gray-500 ${triggerClassName}`}
        title="Ajouter une réaction"
      >
        <Smile className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          className={`absolute ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} right-0 z-50 bg-white border rounded-lg shadow-lg overflow-hidden`}
        >
          <FrimousseEmojiPicker.Root
            onEmojiSelect={handleEmojiClick}
            locale="fr"
            columns={8}
            className="w-[320px] h-[380px] p-2"
          >
            <FrimousseEmojiPicker.Search
              placeholder="Rechercher un emoji..."
              className="w-full px-3 py-2 mb-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FrimousseEmojiPicker.Viewport className="h-[320px] overflow-y-auto">
              <FrimousseEmojiPicker.Loading>
                <span className="text-sm text-gray-500">Chargement...</span>
              </FrimousseEmojiPicker.Loading>
              <FrimousseEmojiPicker.Empty>
                <span className="text-sm text-gray-500">Aucun emoji trouvé</span>
              </FrimousseEmojiPicker.Empty>
              <FrimousseEmojiPicker.List
                components={{
                  CategoryHeader: ({ category, ...props }) => (
                    <div
                      {...props}
                      className="sticky top-0 bg-white px-2 py-1 text-sm font-semibold text-gray-700 border-b"
                    >
                      {category.label}
                    </div>
                  ),
                  Row: ({ ...props }) => <div {...props} className="flex gap-1 px-2 py-1" />,
                  Emoji: ({ emoji, ...props }) => (
                    <button
                      {...props}
                      className={`w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-xl transition-colors ${
                        emoji.isActive ? 'bg-gray-100' : ''
                      }`}
                      title={emoji.label}
                    >
                      {emoji.emoji}
                    </button>
                  ),
                }}
              />
            </FrimousseEmojiPicker.Viewport>
          </FrimousseEmojiPicker.Root>
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
