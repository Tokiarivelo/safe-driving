'use client';

import { useEffect, useState, useMemo } from 'react';
import { DriverMarker } from './DriverMarker';
import { Driver, useNearbyDriversQuery } from '@/graphql/generated/graphql';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css';

interface NearbyDriversZoneProps {
  userLocation: [number, number] | null;
  radiusMeters?: number;
  limit?: number;
  mock?: boolean;
}

export const NearbyDriversZone = ({
  userLocation,
  radiusMeters = 1500,
  limit = 50,
  mock = false,
}: NearbyDriversZoneProps) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  // Debounce user location to avoid frequent refetches when moving
  // If useDebounce is not available, I'll use a local effect
  const [debouncedLocation, setDebouncedLocation] = useState(userLocation);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedLocation(userLocation);
    }, 1000); // 1 second debounce

    return () => {
      clearTimeout(handler);
    };
  }, [userLocation]);

  const { data, loading, error } = useNearbyDriversQuery({
    variables: {
      lat: debouncedLocation?.[0] || 0,
      lng: debouncedLocation?.[1] || 0,
      radiusMeters,
      limit,
      mock,
    },
    skip: !debouncedLocation,
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data?.nearbyDrivers?.drivers) {
      setDrivers(data.nearbyDrivers.drivers);
    }
  }, [data]);

  // Memoize the driver markers to prevent unnecessary re-renders
  const driverMarkers = useMemo(() => {
    return drivers.map(driver => (
      <DriverMarker
        key={driver.id}
        id={driver.id}
        name={driver.name}
        vehicle={driver.vehicle}
        lat={driver.lat}
        lng={driver.lng}
        status={driver.status}
        rating={driver.rating}
        phone={driver.phone}
        nbPlaces={driver.nbPlaces}
      />
    ));
  }, [drivers]);

  if (!userLocation) {
    return null;
  }

  if (loading && drivers.length === 0) {
    return null; // Or a loading indicator
  }

  if (error) {
    console.error('Error fetching nearby drivers:', error);
    return null;
  }

  console.log('drivers :>>>>>>>>>>>>>>> ', drivers);

  return (
    <MarkerClusterGroup chunkedLoading maxClusterRadius={60} spiderfyOnMaxZoom={true}>
      {driverMarkers}
    </MarkerClusterGroup>
  );
};
