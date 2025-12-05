'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface NotificationFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedType: string | undefined;
  onTypeChange: (type: string | undefined) => void;
}

const NOTIFICATION_TYPES = [
  { value: undefined, label: 'Tous' },
  { value: 'RIDE_CONFIRMED', label: 'Course confirmée' },
  { value: 'DRIVER_EN_ROUTE', label: 'Chauffeur en route' },
  { value: 'DRIVER_ARRIVED', label: 'Chauffeur arrivé' },
  { value: 'RIDE_STARTED', label: 'Course démarrée' },
  { value: 'RIDE_COMPLETED', label: 'Course terminée' },
  { value: 'NEW_MESSAGE', label: 'Nouveau message' },
  { value: 'MISSED_CALL', label: 'Appel manqué' },
  { value: 'PROMOTION', label: 'Offre & promotion' },
  { value: 'RIDE_REMINDER', label: 'Rappel de course' },
  { value: 'REVIEW_REQUEST', label: "Demande d'avis" },
  { value: 'DRIVER_REVIEW', label: 'Avis reçu' },
  { value: 'SECURITY_ALERT', label: 'Alerte sécurité' },
];

export function NotificationFilters({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
}: NotificationFiltersProps) {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = NOTIFICATION_TYPES.find((t) => t.value === selectedType)?.label || 'Tous';

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
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          className={`p-2 rounded-lg transition-colors ${
            selectedType
              ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          title={`Filtre: ${selectedLabel}`}
        >
          <Icon icon="mdi:filter-variant" className="w-5 h-5" />
        </button>

        {showFilterDropdown && (
          <div className="absolute right-0 top-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[200px] z-50 max-h-80 overflow-y-auto">
            {NOTIFICATION_TYPES.map((type) => (
              <button
                key={type.value ?? 'all'}
                onClick={() => {
                  onTypeChange(type.value);
                  setShowFilterDropdown(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  selectedType === type.value
                    ? 'text-pink-600 dark:text-pink-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
