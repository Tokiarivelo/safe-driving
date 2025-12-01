'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { RideCard } from './ride-card';
import { Ride } from './types';

interface RideListProps {
  rides: Ride[];
  selectedRideId?: string | null;
  onRideSelect?: (ride: Ride) => void;
  onArchive?: (ride: Ride) => void;
  onDelete?: (ride: Ride) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
  title?: string;
}

export function RideList({
  rides,
  selectedRideId,
  onRideSelect,
  onArchive,
  onDelete,
  onLoadMore,
  hasMore = false,
  loading = false,
  title = 'Mes courses',
}: RideListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter rides based on search query
  const filteredRides = rides.filter(ride => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      ride.departureAddress.toLowerCase().includes(query) ||
      ride.arrivalAddress.toLowerCase().includes(query) ||
      ride.driver?.firstName?.toLowerCase().includes(query) ||
      ride.driver?.lastName?.toLowerCase().includes(query)
    );
  });

  // Group rides by date
  const groupedRides = filteredRides.reduce((groups, ride) => {
    const date = new Date(ride.scheduledDeparture).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(ride);
    return groups;
  }, {} as Record<string, Ride[]>);

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
        
        {/* Search bar */}
        <div className="relative">
          <Icon
            icon="mdi:magnify"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          />
          <input
            type="text"
            placeholder="Rechercher"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <Icon icon="mdi:filter-variant" className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Ride list */}
      <div className="flex-1 overflow-y-auto">
        {loading && rides.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <Icon icon="mdi:loading" className="w-6 h-6 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-500">Chargement...</span>
          </div>
        ) : filteredRides.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Icon icon="mdi:car-off" className="w-12 h-12 mb-2" />
            <p>Aucune course trouvée</p>
          </div>
        ) : (
          Object.entries(groupedRides).map(([date, dateRides]) => (
            <div key={date}>
              {dateRides.map(ride => (
                <RideCard
                  key={ride.id}
                  ride={ride}
                  isSelected={selectedRideId === ride.id}
                  onClick={() => onRideSelect?.(ride)}
                  onArchive={() => onArchive?.(ride)}
                  onDelete={() => onDelete?.(ride)}
                />
              ))}
            </div>
          ))
        )}

        {/* Load more button */}
        {hasMore && (
          <div className="p-4">
            <button
              onClick={onLoadMore}
              disabled={loading}
              className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Chargement...' : 'Charger plus'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
