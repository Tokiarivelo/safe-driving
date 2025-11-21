// src/drivers/drivers.utils.ts

import { UserDriverStatus } from '@prisma/client';

/**
 * Convert degrees to radians
 */
export function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Convert radians to degrees
 */
export function toDeg(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Generate a random point around a given coordinate within a specified radius
 * Uses the Haversine formula for accurate geographic calculations
 *
 * @param lat - Center latitude in degrees
 * @param lng - Center longitude in degrees
 * @param radiusMeters - Maximum distance from center in meters
 * @returns Object with lat and lng of the random point
 */
export function randomPointAround(
  lat: number,
  lng: number,
  radiusMeters: number,
): { lat: number; lng: number } {
  const R = 6371000; // Earth radius in meters
  const dist = Math.random() * radiusMeters; // Random distance within radius
  const bearing = Math.random() * 2 * Math.PI; // Random bearing (0-360 degrees in radians)

  const lat1 = toRad(lat);
  const lng1 = toRad(lng);

  // Calculate new latitude
  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(dist / R) +
      Math.cos(lat1) * Math.sin(dist / R) * Math.cos(bearing),
  );

  // Calculate new longitude
  const lng2 =
    lng1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(dist / R) * Math.cos(lat1),
      Math.cos(dist / R) - Math.sin(lat1) * Math.sin(lat2),
    );

  return {
    lat: toDeg(lat2),
    lng: toDeg(lng2),
  };
}

/**
 * Generate multiple random drivers around a coordinate
 *
 * @param lat - Center latitude
 * @param lng - Center longitude
 * @param radiusMeters - Radius in meters
 * @param count - Number of drivers to generate
 * @returns Array of driver objects with id, name, vehicle, lat, lng, and status
 */
export function generateRandomDriversAround(
  lat: number,
  lng: number,
  radiusMeters: number,
  count: number,
): Array<{
  id: string;
  name: string;
  vehicle: string;
  lat: number;
  lng: number;
  status: string;
  rating: number;
  phone: string;
  nbPlaces: number;
}> {
  const drivers = [];
  const vehicleTypes = ['Sedan', 'SUV', 'Van', 'Truck', 'Compact', 'Luxury'];
  const statuses = [
    UserDriverStatus.AVAILABLE,
    UserDriverStatus.BUSY,
    UserDriverStatus.UNAVAILABLE,
    UserDriverStatus.PAUSED,
  ];
  const firstNames = [
    'John',
    'Jane',
    'Mike',
    'Sarah',
    'David',
    'Emma',
    'Chris',
    'Lisa',
    'Tom',
    'Anna',
  ];
  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
  ];

  for (let i = 0; i < count; i++) {
    const point = randomPointAround(lat, lng, radiusMeters);
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const vehicle =
      vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    // Generate random rating between 3.0 and 5.0
    const rating = Math.round((3 + Math.random() * 2) * 10) / 10;

    // Generate random phone number
    const phone = `(+261) 34 ${Math.floor(10 + Math.random() * 90)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(10 + Math.random() * 90)}`;

    // Generate random number of places (2-7)
    const nbPlaces = Math.floor(2 + Math.random() * 6);

    drivers.push({
      id: `driver-${Date.now()}-${i}`,
      name: `${firstName} ${lastName}`,
      vehicle,
      lat: point.lat,
      lng: point.lng,
      status,
      rating,
      phone,
      nbPlaces,
    });
  }

  return drivers;
}
