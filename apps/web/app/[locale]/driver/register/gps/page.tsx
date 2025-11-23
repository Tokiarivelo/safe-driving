'use client';
import { LocationPermission } from '@/components/driver/register/gps/gps';
import { LocationProvider } from '@/components/driver/register/gps/LocationContext';
import { useTranslation } from 'react-i18next';

export default function LocationPermissionPage() {
  const { t } = useTranslation();

  const handleUpdate = (data: unknown) => {
    console.log('Permissions mises à jour:', data);
  };

  return (
    <LocationProvider>
      <LocationPermission t={t} onUpdate={handleUpdate} />
    </LocationProvider>
  );
}
