'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { RideList } from './ride-list';
import { RideDetails } from './ride-details';
import { Ride } from './types';

// Import MapContainer dynamically to avoid SSR issues
const MapView = dynamic(() => import('@/components/map/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <span className="text-gray-500">Chargement de la carte...</span>
    </div>
  ),
});

interface RideContainerProps {
  rides: Ride[];
  variant: 'user' | 'driver';
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onRideSelect?: (ride: Ride) => void;
  onArchive?: (ride: Ride) => void;
  onDelete?: (ride: Ride) => void;
  onMessage?: (ride: Ride) => void;
}

export function RideContainer({
  rides,
  variant,
  loading = false,
  hasMore = false,
  onLoadMore,
  onRideSelect,
  onArchive,
  onDelete,
  onMessage,
}: RideContainerProps) {
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);

  // Select first ride by default when rides load
  useEffect(() => {
    if (rides.length > 0 && !selectedRide) {
      setSelectedRide(rides[0]);
    }
  }, [rides, selectedRide]);

  const handleRideSelect = (ride: Ride) => {
    setSelectedRide(ride);
    onRideSelect?.(ride);
  };

  // Get map center from selected ride
  const mapCenter = useMemo(() => {
    if (selectedRide) {
      return [selectedRide.departureLat, selectedRide.departureLng] as [number, number];
    }
    // Default to Antananarivo
    return [-18.8792, 47.5079] as [number, number];
  }, [selectedRide]);

  return (
    <div className="flex h-full bg-white">
      {/* Left Sidebar - Ride List */}
      <div className="w-80 flex-shrink-0">
        <RideList
          rides={rides}
          selectedRideId={selectedRide?.id}
          onRideSelect={handleRideSelect}
          onArchive={onArchive}
          onDelete={onDelete}
          onLoadMore={onLoadMore}
          hasMore={hasMore}
          loading={loading}
          title="Mes courses"
        />
      </div>

      {/* Center - Map */}
      <div className="flex-1 min-w-0">
        <MapView coordinates={mapCenter} />
      </div>

      {/* Right Sidebar - Ride Details */}
      {selectedRide && (
        <RideDetails
          ride={selectedRide}
          variant={variant}
          onEdit={() => {
            // Handle edit
          }}
          onMessage={() => onMessage?.(selectedRide)}
        />
      )}
    </div>
  );
}
