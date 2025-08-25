'use client';

import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, Polyline, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapControls from '@/components/map/MapControls';
import { MapPills } from '@/components/map/MapPill';
import SidePanel from '@/components/map/SidePanel';
import { Marker } from '@/components/map/Marker';
import { Location } from '@/components/map/Location';
import { arrayMove } from '@dnd-kit/sortable';
import * as polyline from '@mapbox/polyline';

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

  const [route, setRoute] = useState<[number, number][]>([]);

  const mapRef = useRef<L.Map | null>(null);

  const [locations, setLocations] = useState<Location[]>([
    { id: '1', placeholder: 'Origin', value: '' },
    { id: '2', placeholder: 'Destination', value: '' },
  ]);

  const addLocation = () => {
    const newLocation: Location = {
      id: Date.now().toString(),
      placeholder: `Stop ${locations.length - 1}`,
      value: '',
    };
    const newLocations = [...locations];
    newLocations.splice(-1, 0, newLocation);
    setLocations(newLocations);
  };

  const updateLocation = (id: string, value: string, lat?: number, lon?: number) => {
    setLocations(prev =>
      prev.map(loc =>
        loc.id === id ? { ...loc, value, lat, lon } : loc
      ),
    );
  };

  const deleteLocation = (id: string) => {
    if (locations.length > 2) setLocations(prev => prev.filter(loc => loc.id !== id));
  };

  const reorderLocations = (oldIndex: number, newIndex: number) => {
    setLocations(items => arrayMove(items, oldIndex, newIndex));
  };

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

  // inside your Map component
  useEffect(() => {
    const validLocations = locations.filter(loc => loc.lat != null && loc.lon != null);
    if (validLocations.length >= 2) {
      const coordinates = validLocations.map(loc => [loc.lon, loc.lat]); // ORS expects [lon, lat]

      fetch("http://localhost:8085/ors/v2/directions/driving-car", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coordinates }),
      })
        .then(res => res.json())
        .then(data => {
          // Decode ORS polyline (geometry is encoded)
          const coords = polyline.decode(data.routes[0].geometry) as [number, number][];
          // ORS uses [lat, lon] format, Leaflet uses [lat, lon], so no swap needed
          setRoute(coords); // store in state for Polyline
        })
        .catch(err => {
          console.error("ORS request failed:", err);
        });
    } else {
      setRoute([]);
    }
  }, [locations]);// run whenever locations change

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
        {route.length > 0 && <Polyline positions={route} color="blue" weight={10} />}
        {locations.map((location, index) =>
          location.lat && location.lon ? (
            <Marker
              key={location.id}
              position={[location.lat, location.lon]}
              color={index === 0 ? 'blue' : index === locations.length - 1 ? 'red' : 'green'}
            />
          ) : null
        )}
        {userLocation && (
          <>
            <Marker
              position={userLocation}
              color={isCenteredOnMyLocation ? "purple" : "gray"}
              fillColor={isCenteredOnMyLocation ? "purple" : "gray"}
              text="You are here"
            />
            <MapController
              mapRef={mapRef}
              userLocation={userLocation}
              setIsCenteredOnMyLocation={setIsCenteredOnMyLocation}
            />
          </>
        )}
      </MapContainer>

      <MapPills mapRef={mapRef} />

      <SidePanel
        locations={locations}
        updateLocation={updateLocation}
        deleteLocation={deleteLocation}
        addLocation={addLocation}
        reorderLocations={reorderLocations}
      />

      <MapControls
        getLocation={getLocation}
        isCentered={isCenteredOnMyLocation}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
      />
    </div>
  );
}
