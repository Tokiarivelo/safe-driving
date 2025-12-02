'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { MapContainer, Polyline, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Marker } from '@/components/map/Marker';
import * as polyline from '@mapbox/polyline';
import { useRouteWorker, useGeocodingWorker } from '@/hooks/useMapWorkers';

// Fix Leaflet's default icon paths for Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
});

// Default center (Antananarivo)
const DEFAULT_CENTER: [number, number] = [-18.8792, 47.5079];

export interface PickedLocation {
  address: string;
  lat: number;
  lng: number;
}

interface LocationPickerMapProps {
  departure: PickedLocation | null;
  arrival: PickedLocation | null;
  onDepartureChange: (location: PickedLocation) => void;
  onArrivalChange: (location: PickedLocation) => void;
  pickingMode: 'departure' | 'arrival' | null;
  onPickingModeChange: (mode: 'departure' | 'arrival' | null) => void;
}

// Component to handle map click events
const MapClickHandler = React.memo(function MapClickHandler({
  pickingMode,
  onMapClick,
}: {
  pickingMode: 'departure' | 'arrival' | null;
  onMapClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click: e => {
      if (pickingMode) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });

  return null;
});

// Component to fit map bounds to show both markers
const MapBoundsHandler = React.memo(function MapBoundsHandler({
  departure,
  arrival,
}: {
  departure: PickedLocation | null;
  arrival: PickedLocation | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (departure && arrival) {
      const bounds = L.latLngBounds([departure.lat, departure.lng], [arrival.lat, arrival.lng]);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (departure) {
      map.setView([departure.lat, departure.lng], 15);
    } else if (arrival) {
      map.setView([arrival.lat, arrival.lng], 15);
    }
  }, [departure, arrival, map]);

  return null;
});

export default function LocationPickerMap({
  departure,
  arrival,
  onDepartureChange,
  onArrivalChange,
  pickingMode,
  onPickingModeChange,
}: LocationPickerMapProps) {
  const [route, setRoute] = useState<[number, number][]>([]);
  const [distKm, setDistKm] = useState<string>('-');
  const [durationMin, setDurationMin] = useState<string>('-');

  // Use web workers for heavy operations
  const { calculateRoute: calculateRouteWorker } = useRouteWorker();
  const { reverseGeocode: reverseGeocodeWorker } = useGeocodingWorker();

  const center = useMemo(() => {
    if (departure && arrival) {
      return [(departure.lat + arrival.lat) / 2, (departure.lng + arrival.lng) / 2] as [
        number,
        number,
      ];
    }
    if (departure) return [departure.lat, departure.lng] as [number, number];
    if (arrival) return [arrival.lat, arrival.lng] as [number, number];
    return DEFAULT_CENTER;
  }, [departure, arrival]);

  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      if (!pickingMode) return;

      // Use worker for reverse geocoding
      reverseGeocodeWorker(
        lat,
        lng,
        process.env.NEXT_PUBLIC_NOMINATIM_URL || 'https://nominatim.openstreetmap.org/reverse',
        result => {
          if (result.type === 'GEOCODE_RESULT') {
            const locationData: PickedLocation = {
              address: result.data.locationName,
              lat,
              lng,
            };

            if (pickingMode === 'departure') {
              onDepartureChange(locationData);
            } else {
              onArrivalChange(locationData);
            }
            onPickingModeChange(null);
          } else if (result.type === 'GEOCODE_ERROR') {
            console.error('Geocoding failed:', result.error);
            // Still set the location with coordinates only
            const locationData: PickedLocation = {
              address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
              lat,
              lng,
            };
            if (pickingMode === 'departure') {
              onDepartureChange(locationData);
            } else {
              onArrivalChange(locationData);
            }
            onPickingModeChange(null);
          }
        },
      );
    },
    [pickingMode, reverseGeocodeWorker, onDepartureChange, onArrivalChange, onPickingModeChange],
  );

  // Route calculation
  useEffect(() => {
    const orsUrl = process.env.NEXT_PUBLIC_ORS_URL;
    if (departure && arrival && orsUrl) {
      const coordinates: [number, number][] = [
        [departure.lng, departure.lat], // ORS expects [lon, lat]
        [arrival.lng, arrival.lat],
      ];

      calculateRouteWorker(coordinates, orsUrl, result => {
        if (result.type === 'ROUTE_CALCULATED') {
          const coords = polyline.decode(result.data.geometry) as [number, number][];
          setRoute(coords);
          const distance = (result.data.distance / 1000).toFixed(2);
          setDistKm(distance);
          const duration = (result.data.duration / 60).toFixed(2);
          setDurationMin(duration);
        } else if (result.type === 'ROUTE_ERROR') {
          console.error('Route calculation failed:', result.error);
          setRoute([]);
          setDistKm('-');
          setDurationMin('-');
        }
      });
    } else {
      setRoute([]);
      setDistKm('-');
      setDurationMin('-');
    }
  }, [departure, arrival, calculateRouteWorker]);

  const getCursorStyle = () => {
    if (pickingMode) {
      return 'crosshair';
    }
    return 'grab';
  };

  return (
    <div className="relative w-full h-full" style={{ minHeight: '300px' }}>
      {/* Picking mode indicator */}
      {pickingMode && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-[1000] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
          <span className="text-sm font-medium">
            {pickingMode === 'departure'
              ? 'Cliquez sur la carte pour sélectionner le départ'
              : "Cliquez sur la carte pour sélectionner l'arrivée"}
          </span>
          <button
            onClick={() => onPickingModeChange(null)}
            className="ml-3 text-sm text-gray-500 hover:text-gray-700"
          >
            Annuler
          </button>
        </div>
      )}

      {/* Route info */}
      {departure && arrival && (
        <div className="absolute bottom-2 left-2 z-[1000] bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
          <div className="flex gap-4 text-sm">
            <span>
              <strong>Distance:</strong> {distKm} km
            </span>
            <span>
              <strong>Durée:</strong> {durationMin} min
            </span>
          </div>
        </div>
      )}

      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        zoomControl={true}
        style={{ height: '100%', width: '100%', cursor: getCursorStyle() }}
      >
        <TileLayer
          attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Route polyline */}
        {route.length > 0 && <Polyline positions={route} color="blue" weight={4} />}

        {/* Departure marker */}
        {departure && (
          <Marker
            position={[departure.lat, departure.lng]}
            color="blue"
            fillColor="blue"
            text={departure.address || 'Départ'}
          />
        )}

        {/* Arrival marker */}
        {arrival && (
          <Marker
            position={[arrival.lat, arrival.lng]}
            color="red"
            fillColor="red"
            text={arrival.address || 'Arrivée'}
          />
        )}

        <MapClickHandler pickingMode={pickingMode} onMapClick={handleMapClick} />
        <MapBoundsHandler departure={departure} arrival={arrival} />
      </MapContainer>
    </div>
  );
}
