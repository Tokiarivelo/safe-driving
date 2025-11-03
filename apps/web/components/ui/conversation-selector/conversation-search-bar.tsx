import React from 'react';
import { Search } from 'lucide-react';
import { ConversationSearchBarProps } from './types';

export const ConversationSearchBar: React.FC<ConversationSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  isLoading,
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Rechercher une conversation..."
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
};
