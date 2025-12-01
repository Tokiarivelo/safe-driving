import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ConversationSearchBarProps } from './types';

export const ConversationSearchBar: React.FC<ConversationSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  isLoading,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher message / utilisateur"
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pink-500"></div>
          </div>
        )}
      </div>
      <button
        type="button"
        className="p-2.5 text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        title="Filtrer"
      >
        <SlidersHorizontal className="w-5 h-5" />
      </button>
    </div>
  );
};
