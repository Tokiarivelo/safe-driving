'use client';

import { useEffect, useState } from 'react';
import { DriverMarker } from './DriverMarker';
import { Driver, useNearbyDriversQuery } from '@/graphql/generated/graphql';

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

  const { data, loading, error, refetch } = useNearbyDriversQuery({
    variables: {
      lat: userLocation?.[0] || 0,
      lng: userLocation?.[1] || 0,
      radiusMeters,
      limit,
      mock,
    },
    skip: !userLocation,
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data?.nearbyDrivers?.drivers) {
      setDrivers(data.nearbyDrivers.drivers);
    }
  }, [data]);

  // Refetch when user location changes
  useEffect(() => {
    if (userLocation && refetch) {
      refetch({
        lat: userLocation[0],
        lng: userLocation[1],
        radiusMeters,
        limit,
        mock,
      });
    }
  }, [userLocation, radiusMeters, limit, mock, refetch]);

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

  return (
    <>
      {drivers.map(driver => (
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
      ))}
    </>
  );
};
