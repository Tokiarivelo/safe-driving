'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Plus } from 'lucide-react';
import { RideList } from './ride-list';
import { RideDetails } from './ride-details';
import { CreateRideDialog, CreateRideFormData } from './create-ride-dialog';
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
  onCreateRide?: (data: CreateRideFormData) => Promise<void>;
  createRideLoading?: boolean;
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
  onCreateRide,
  createRideLoading = false,
}: RideContainerProps) {
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

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

  const handleCreateRide = async (data: CreateRideFormData) => {
    if (onCreateRide) {
      await onCreateRide(data);
    }
  };

  return (
    <div className="flex h-full bg-white relative">
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

      {/* Floating Action Button */}
      {onCreateRide && (
        <button
          onClick={() => setShowCreateDialog(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#E33486] text-white rounded-full shadow-lg hover:bg-[#c92d75] transition-colors flex items-center justify-center z-40"
          title={variant === 'user' ? 'Créer une course' : 'Proposer une course'}
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      {/* Create Ride Dialog */}
      <CreateRideDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSubmit={handleCreateRide}
        loading={createRideLoading}
        variant={variant}
      />
    </div>
  );
}
