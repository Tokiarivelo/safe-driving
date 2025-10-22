'use client';

import { useState, useRef, useEffect } from 'react';
import { Image } from 'lucide-react';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';

// Initialize Giphy Fetch with your API key
// You should replace this with your actual API key or use an environment variable
const giphyFetch = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY || 'your-api-key-here');

interface GifPickerProps {
  onGifSelect: (gifUrl: string) => void;
  triggerClassName?: string;
  position?: 'top' | 'bottom';
}

const GifPicker: React.FC<GifPickerProps> = ({
  onGifSelect,
  triggerClassName = '',
  position = 'top',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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

  const fetchGifs = (offset: number) => {
    if (searchTerm) {
      return giphyFetch.search(searchTerm, { offset, limit: 10 });
    }
    return giphyFetch.trending({ offset, limit: 10 });
  };

  const handleGifClick = (gif: any, e: React.SyntheticEvent<HTMLElement, Event>) => {
    e.preventDefault();
    // Get the original GIF URL
    const gifUrl = gif.images.original.url;
    onGifSelect(gifUrl);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={pickerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 text-gray-500 hover:text-gray-700 ${triggerClassName}`}
        title="Ajouter un GIF"
      >
        <Image className="w-5 h-5" />
      </button>

      {isOpen && (
        <div
          className={`absolute ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} right-0 z-50 bg-white border rounded-lg shadow-lg overflow-hidden w-[400px]`}
        >
          <div className="p-3 border-b">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Rechercher un GIF..."
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
          <div className="h-[400px] overflow-y-auto p-2">
            <Grid
              key={searchTerm}
              width={380}
              columns={2}
              fetchGifs={fetchGifs}
              onGifClick={handleGifClick}
              noLink={true}
            />
          </div>
          <div className="p-2 border-t text-center">
            <a
              href="https://giphy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Powered by GIPHY
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default GifPicker;
