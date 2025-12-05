'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import RideInfoPanel from './RideInfoPanel';
import { RealtimeRideData } from './RealtimeRideMap';

// Dynamically import the map component to avoid SSR issues with Leaflet
const RealtimeRideMap = dynamic(() => import('./RealtimeRideMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <div className="text-gray-500">Chargement de la carte...</div>
    </div>
  ),
});

interface RealtimeRidePageProps {
  variant: 'user' | 'driver';
}

// Mock data for the current ride - This will be replaced with actual GraphQL query
const mockCurrentRide: RealtimeRideData = {
  id: '1',
  status: 'IN_PROGRESS',
  departure: {
    address: 'Anosy',
    lat: -18.9127,
    lng: 47.5209,
  },
  arrival: {
    address: 'Ankorondrano',
    lat: -18.8756,
    lng: 47.5256,
  },
  // Use a time 30 minutes from now to simulate an ongoing ride
  scheduledDeparture: new Date(Date.now() - 30 * 60 * 1000),
  price: 8000,
  currency: 'MGA',
  currentPosition: {
    lat: -18.8950,
    lng: 47.5230,
  },
};

export default function RealtimeRidePage({ variant }: RealtimeRidePageProps) {
  const [ride, setRide] = useState<RealtimeRideData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Simulate loading the current ride
    // TODO: Replace with actual GraphQL query to get user's current ride
    const timer = setTimeout(() => {
      setRide(mockCurrentRide);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time position updates (for demonstration)
  useEffect(() => {
    if (!ride || ride.status !== 'IN_PROGRESS') return;

    // In a real implementation, this would be a websocket subscription
    const interval = setInterval(() => {
      setRide((prev) => {
        if (!prev || !prev.currentPosition) return prev;

        // Simulate movement towards destination
        const targetLat = prev.arrival.lat;
        const targetLng = prev.arrival.lng;
        const currentLat = prev.currentPosition.lat;
        const currentLng = prev.currentPosition.lng;

        // Move 0.5% closer to destination each update
        const newLat = currentLat + (targetLat - currentLat) * 0.005;
        const newLng = currentLng + (targetLng - currentLng) * 0.005;

        return {
          ...prev,
          currentPosition: {
            lat: newLat,
            lng: newLng,
          },
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [ride]);

  if (!isClient) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <div className="text-gray-500">Chargement...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          <div className="text-gray-500">Chargement de la course...</div>
        </div>
      </div>
    );
  }

  if (!ride) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-gray-500 text-lg mb-2">Aucune course en cours</div>
          <p className="text-gray-400 text-sm">
            {variant === 'user'
              ? 'Vous n\'avez pas de course active pour le moment.'
              : 'Vous n\'avez pas de course à effectuer pour le moment.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Map takes full screen */}
      <RealtimeRideMap ride={ride} variant={variant} />

      {/* Info panel overlay on the right */}
      <div className="absolute top-4 right-4 z-[1000]">
        <RideInfoPanel ride={ride} variant={variant} />
      </div>
    </div>
  );
}
