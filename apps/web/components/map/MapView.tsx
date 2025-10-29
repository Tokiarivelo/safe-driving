'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Polyline, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapControls from '@/components/map/MapControls';
import { MapPills } from '@/components/map/MapPill';
import SidePanel from '@/components/map/SidePanel';
import { Marker } from '@/components/map/Marker';
import { defaultLocations, Location } from '@/components/map/Location';
import { arrayMove } from '@dnd-kit/sortable';
import * as polyline from '@mapbox/polyline';
import { TempMarker } from '@/components/map/TempMarker';
import RealTimeDriverZone from '@/components/map/RealTimeDriverZone';
import { distanceMeters } from '@/components/map/MapUtils';

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

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NOMINATIM_URL}?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
      { headers: { 'User-Agent': 'safe-driving' } }, // Nominatim requires UA
    );
    const data = await res.json();

    if (!data.address) return 'Unknown location';

    const road = data.address.road || data.address.highway;
    const neighbourhood =
      data.address.neighbourhood || data.address.suburb || data.address.city_district;

    // Format: road name above, neighborhood below
    if (road && neighbourhood) return `${road}, ${neighbourhood}`;
    if (road) return road;
    if (neighbourhood) return neighbourhood;

    return data.display_name || 'Unnamed place';
  } catch (e) {
    console.error('Reverse geocoding failed:', e);
    return 'Unknown location';
  }
}

export default function Map({ coordinates }: Props) {
  const [center, setCenter] = useState<[number, number]>(
    coordinates || [-18.8792, 47.5079], // fallback
  );
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isCenteredOnMyLocation, setIsCenteredOnMyLocation] = useState(false);

  const [route, setRoute] = useState<[number, number][]>([]);
  const [distKm, setDistKm] = useState<string>('-');
  const [durationMin, setDurationMin] = useState<string>('-');

  const [tempMarker, setTempMarker] = useState<{ lat: number; lon: number } | null>(null);

  const mapRef = useRef<L.Map | null>(null);

  const [locations, setLocations] = useState<Location[]>(defaultLocations);

  const [tempMarkerLabel, setTempMarkerLabel] = useState<string>('');

  const addLocation = () => {
    const newLocation: Location = {
      id: Date.now().toString(),
      placeholder: `Stop ${locations.length - 1}`,
      value: '',
      source: 'user',
    };
    const newLocations = [...locations];
    newLocations.splice(-1, 0, newLocation);
    setLocations(newLocations);
  };

  const updateLocation = (
    id: string,
    value: string,
    lat?: number,
    lon?: number,
    source: 'user' | 'marker' = 'user',
  ) => {
    setLocations(prev =>
      prev.map(loc => (loc.id === id ? { ...loc, value, lat, lon, source } : loc)),
    );
  };

  const deleteLocation = (id: string) => {
    if (locations.length > 2) setLocations(prev => prev.filter(loc => loc.id !== id));
  };

  const reorderLocations = (oldIndex: number, newIndex: number) => {
    setLocations(items => arrayMove(items, oldIndex, newIndex));
  };

  const addLocationAt = async (lat: number, lon: number) => {
    const label = await reverseGeocode(lat, lon);

    const firstEmpty = locations.find(loc => loc.value === '');
    if (firstEmpty) {
      updateLocation(firstEmpty.id, label, lat, lon, 'marker');
    } else {
      const newLocation: Location = {
        id: Date.now().toString(),
        placeholder: `Stop ${locations.length - 1}`,
        value: label,
        lat,
        lon,
        source: 'marker',
      };
      const newLocations = [...locations];
      newLocations.splice(newLocations.length - 1, 0, newLocation);
      setLocations(newLocations);
    }
    setTempMarker(null); // remove after adding
  };

  const cleanLocations = () => {
    setLocations(defaultLocations);
    setDurationMin('-');
    setDistKm('-');
  };

  const cleanRouteInformation = () => {
    setDistKm('-');
    setDurationMin('-');
    setRoute([]);
  };

  const reverseLocations = () => {
    setLocations(prev => [...prev].reverse());
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
    if (tempMarker) {
      reverseGeocode(tempMarker.lat, tempMarker.lon).then(setTempMarkerLabel);
    } else {
      setTempMarkerLabel('');
    }
  }, [tempMarker]);

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

      fetch(process.env.NEXT_PUBLIC_ORS_URL || '', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coordinates }),
      })
        .then(res => res.json())
        .then(data => {
          const coords = polyline.decode(data.routes[0].geometry) as [number, number][];
          setRoute(coords);
          const distance = (data.routes[0].summary.distance / 1000).toFixed(2);
          setDistKm(distance);
          const duration = (data.routes[0].summary.duration / 60).toFixed(2);
          setDurationMin(duration);
        })
        .catch(err => {
          console.error('ORS request failed:', err);
        });
    } else {
      cleanRouteInformation();
    }
  }, [locations]); // run whenever locations change

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 0,
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
        {route.length > 0 && <Polyline positions={route} color="blue" weight={4} />}
        {locations.map((location, index) =>
          location.lat && location.lon ? (
            <Marker
              key={location.id}
              position={[location.lat, location.lon]}
              text={location.value}
              color={index === 0 ? 'blue' : index === locations.length - 1 ? 'red' : 'green'}
            />
          ) : null,
        )}
        {userLocation && (
          <>
            {isCenteredOnMyLocation && (
              <Marker
                position={userLocation}
                color="purple"
                fillColor="purple"
                text="You are here"
                addText="Add my current position"
                onAdd={() => {
                  if (!userLocation) return;

                  // Find the first default empty location
                  const firstEmpty = locations.find(loc => loc.value === '');
                  if (firstEmpty) {
                    updateLocation(firstEmpty.id, 'My Location', userLocation[0], userLocation[1]);
                    return;
                  }

                  // No empty default, insert new before last
                  const newLocation: Location = {
                    id: Date.now().toString(),
                    placeholder: `Stop ${locations.length - 1}`,
                    value: 'My Location',
                    lat: userLocation[0],
                    lon: userLocation[1],
                    source: 'marker',
                  };
                  const newLocations = [...locations];
                  newLocations.splice(newLocations.length - 1, 0, newLocation);
                  setLocations(newLocations);
                }}
              />
            )}
            <MapController
              mapRef={mapRef}
              userLocation={userLocation}
              setIsCenteredOnMyLocation={setIsCenteredOnMyLocation}
            />
          </>
        )}

        {/* temporary marker on click */}
        {tempMarker && (
          <Marker
            position={[tempMarker.lat, tempMarker.lon]}
            color="orange"
            fillColor="orange"
            text={tempMarkerLabel || 'Loading...'}
            addText="Add this position"
            onAdd={() => addLocationAt(tempMarker.lat, tempMarker.lon)}
          />
        )}

        <TempMarker setTempMarker={setTempMarker} addLocationAt={addLocationAt} />

        <RealTimeDriverZone
          initialCenter={center}
          radius={500} // meters
          onCenterChange={(lat: number, lng: number) => {
            console.log('new center:', lat, lng);
            // optional: filter drivers by distance
            const inRadius = locations.filter(
              loc =>
                loc.lat !== undefined &&
                loc.lon !== undefined &&
                distanceMeters(lat, lng, loc.lat, loc.lon) <= 500,
            );
            console.log('drivers inside radius:', inRadius);
          }}
        />
      </MapContainer>

      <MapPills mapRef={mapRef} />

      <SidePanel
        locations={locations}
        distance={distKm || '-'}
        duration={durationMin || '-'}
        cleanLocations={cleanLocations}
        reverseLocations={reverseLocations}
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
