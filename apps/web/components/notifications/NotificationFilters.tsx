'use client';

import React from 'react';
import { Icon } from '@iconify/react';

interface NotificationFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedType: string | undefined;
  onTypeChange: (type: string | undefined) => void;
}

export function NotificationFilters({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
}: NotificationFiltersProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
      {/* Search */}
      <div className="flex-1 relative">
        <Icon
          icon="mdi:magnify"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        />
        <input
          type="text"
          placeholder="Rechercher"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-gray-900 dark:text-white placeholder-gray-500"
        />
      </div>

      {/* Filter button */}
      <button
        onClick={() => {
          // Could open a filter dropdown here
        }}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <Icon icon="mdi:filter-variant" className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>
    </div>
  );
}
