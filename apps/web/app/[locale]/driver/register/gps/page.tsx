'use client';
import { LocationPermission } from '@/components/driver/register/gps/gps';
import { LocationProvider } from '@/components/driver/register/gps/LocationContext';

export default function LocationPermissionPage() {
  return (
    <LocationProvider>
      <LocationPermission />
    </LocationProvider>
  );
}
