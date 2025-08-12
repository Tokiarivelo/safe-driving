'use client';
import { LocationPermission } from '@/components/Driver/register/gps/gps';
import { LocationProvider } from '@/components/Driver/register/gps/LocationContext';
import { useTranslation } from 'react-i18next';

export default function LocationPermissionPage() {
  const { t } = useTranslation();
  
  const handleUpdate = (data: any) => {
    console.log('Permissions mises à jour:', data);
  };

  return (
    <LocationProvider>
      <LocationPermission t={t} onUpdate={handleUpdate} />
    </LocationProvider>
  );
}
