'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { MapContainer, Polyline, TileLayer, useMap, Marker as LeafletMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as polyline from '@mapbox/polyline';
import { useRouteWorker } from '@/hooks/useMapWorkers';

// Fix Leaflet's default icon paths for Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
});

export interface RideLocation {
  address: string;
  lat: number;
  lng: number;
}

export interface RealtimeRideData {
  id: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  departure: RideLocation;
  arrival: RideLocation;
  scheduledDeparture: Date | string;
  price: number;
  currency: string;
  currentPosition?: {
    lat: number;
    lng: number;
  };
}

interface RealtimeRideMapProps {
  ride: RealtimeRideData;
  variant?: 'user' | 'driver';
}

// Component to auto-fit bounds to show the route
const FitBounds = React.memo(function FitBounds({
  departure,
  arrival,
  currentPosition,
}: {
  departure: RideLocation;
  arrival: RideLocation;
  currentPosition?: { lat: number; lng: number };
}) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds([
      [departure.lat, departure.lng],
      [arrival.lat, arrival.lng],
    ]);

    if (currentPosition) {
      bounds.extend([currentPosition.lat, currentPosition.lng]);
    }

    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, departure, arrival, currentPosition]);

  return null;
});

// Create custom marker icons
const createMarkerIcon = (color: string) => {
  const iconHtml = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
      <path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `;

  return new L.DivIcon({
    html: iconHtml,
    className: 'custom-ride-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Current position marker (car icon)
const createCurrentPositionIcon = () => {
  const iconHtml = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.4))">
      <circle cx="12" cy="12" r="10" fill="#3b82f6" stroke="white" stroke-width="2"/>
      <path fill="white" d="M12 8l4 8H8l4-8z" transform="rotate(0 12 12)"/>
    </svg>
  `;

  return new L.DivIcon({
    html: iconHtml,
    className: 'current-position-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
};

// The variant prop is available for future use to customize UI based on user/driver view
export default function RealtimeRideMap({ ride }: RealtimeRideMapProps) {
  const [route, setRoute] = useState<[number, number][]>([]);
  const [distKm, setDistKm] = useState<string>('-');
  const [durationMin, setDurationMin] = useState<string>('-');
  const mapRef = useRef<L.Map | null>(null);

  // Use web worker for route calculation
  const { calculateRoute: calculateRouteWorker } = useRouteWorker();

  // Calculate center based on departure and arrival
  const center = useMemo<[number, number]>(() => {
    return [
      (ride.departure.lat + ride.arrival.lat) / 2,
      (ride.departure.lng + ride.arrival.lng) / 2,
    ];
  }, [ride.departure, ride.arrival]);

  // Calculate route when ride changes
  useEffect(() => {
    const coordinates: [number, number][] = [
      [ride.departure.lng, ride.departure.lat], // ORS expects [lon, lat]
      [ride.arrival.lng, ride.arrival.lat],
    ];

    calculateRouteWorker(coordinates, process.env.NEXT_PUBLIC_ORS_URL || '', (result) => {
      if (result.type === 'ROUTE_CALCULATED') {
        const coords = polyline.decode(result.data.geometry) as [number, number][];
        setRoute(coords);
        const distance = (result.data.distance / 1000).toFixed(1);
        setDistKm(distance);
        const duration = Math.round(result.data.duration / 60);
        setDurationMin(duration.toString());
      } else if (result.type === 'ROUTE_ERROR') {
        console.error('Route calculation failed:', result.error);
        setRoute([]);
        setDistKm('-');
        setDurationMin('-');
      }
    });
  }, [ride.departure, ride.arrival, calculateRouteWorker]);

  // Memoize icons
  const departureIcon = useMemo(() => createMarkerIcon('#3b82f6'), []); // blue
  const arrivalIcon = useMemo(() => createMarkerIcon('#ef4444'), []); // red
  const currentPositionIcon = useMemo(() => createCurrentPositionIcon(), []);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Route line */}
        {route.length > 0 && (
          <Polyline
            positions={route}
            color="#3b82f6"
            weight={5}
            opacity={0.8}
          />
        )}

        {/* Departure marker */}
        <LeafletMarker
          position={[ride.departure.lat, ride.departure.lng]}
          icon={departureIcon}
        />

        {/* Arrival marker */}
        <LeafletMarker
          position={[ride.arrival.lat, ride.arrival.lng]}
          icon={arrivalIcon}
        />

        {/* Current position marker (if ride is in progress) */}
        {ride.currentPosition && ride.status === 'IN_PROGRESS' && (
          <LeafletMarker
            position={[ride.currentPosition.lat, ride.currentPosition.lng]}
            icon={currentPositionIcon}
          />
        )}

        {/* Auto-fit bounds */}
        <FitBounds
          departure={ride.departure}
          arrival={ride.arrival}
          currentPosition={ride.currentPosition}
        />
      </MapContainer>

      {/* Distance and duration info overlay */}
      {route.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 z-[1000]">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2.81A2 2 0 0 1 20 8v8a2 2 0 0 1-2 2h-2"/>
                <circle cx="7" cy="18" r="2"/>
                <path d="M15 18H9"/>
                <circle cx="17" cy="18" r="2"/>
              </svg>
              <span className="font-medium">{durationMin} min</span>
            </div>
            <div className="text-gray-400">|</div>
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="font-medium">{distKm} km</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
