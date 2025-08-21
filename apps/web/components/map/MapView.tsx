'use client';

import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapControls from '@/components/map/MapControls';
import { MapPills } from '@/components/map/MapPill';
import SidePanel from '@/components/map/SidePanel';

// Fix Leaflet's default icon paths for Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
});

type Props = {
  coordinates?: [number, number]; // [lat, lng]
};

// Component to handle map events and reference
function MapController({
  mapRef,
  userLocation,
  setIsCenteredOnMyLocation,
}: {
  mapRef: React.RefObject<L.Map | null>;
  userLocation: [number, number];
  setIsCenteredOnMyLocation: (centered: boolean) => void;
}) {
  const map = useMap();

  // Set up map reference
  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);

  // Handle map events using useMapEvents
  useMapEvents({
    moveend: () => {
      if (!map || !userLocation) return;

      const mapCenter = map.getCenter();
      const distance = mapCenter.distanceTo(L.latLng(userLocation[0], userLocation[1]));

      // If map center is more than 50 meters away from user location, consider it "not centered"
      setIsCenteredOnMyLocation(distance < 50);
    },
    dragend: () => {
      if (!map || !userLocation) return;

      const mapCenter = map.getCenter();
      const distance = mapCenter.distanceTo(L.latLng(userLocation[0], userLocation[1]));

      setIsCenteredOnMyLocation(distance < 50);
    },
  });

  return null;
}

export default function Map({ coordinates }: Props) {
  const [center, setCenter] = useState<[number, number]>(
    coordinates || [-18.8792, 47.5079], // fallback
  );
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isCenteredOnMyLocation, setIsCenteredOnMyLocation] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const newCenter: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setCenter(newCenter);
        setUserLocation(newCenter);

        // Use the map reference to set view
        if (mapRef.current) {
          mapRef.current?.flyTo(newCenter, 18, { duration: 8 });
          setIsCenteredOnMyLocation(true);
        }
      },
      error => {
        console.warn('Error getting position:', error);

        // More specific error messages
        let message = 'Unable to retrieve your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message =
              'Location access is blocked. Please enable location permissions in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out.';
            break;
        }
        alert(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  };

  const zoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const zoomOut = () => {
    mapRef.current?.zoomOut();
  };

  useEffect(() => {
    if (!coordinates) {
      getLocation();
    }
  }, [coordinates]);

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker
          center={center}
          radius={10} // circle size in pixels
          pathOptions={{
            color: 'blue', // border color
            fillColor: 'blue', // inside color
            fillOpacity: 0.5,
          }}
        >
          <Popup>Hello from Paris!</Popup>
        </CircleMarker>
        {userLocation && (
          <MapController
            mapRef={mapRef}
            userLocation={userLocation}
            setIsCenteredOnMyLocation={setIsCenteredOnMyLocation}
          />
        )}
      </MapContainer>

      <MapPills mapRef={mapRef} />

      <SidePanel />

      <MapControls
        getLocation={getLocation}
        isCentered={isCenteredOnMyLocation}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
      />
    </div>
  );
}
