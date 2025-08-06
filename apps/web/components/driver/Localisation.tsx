'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox'; 
import { useEffect, useState } from 'react';

const LocationPermission = ({ 
  onUpdate, 
  t 
}: { 
  onUpdate: (data: any) => void; 
  t: any;
}) => {
  const [enableLocation, setEnableLocation] = useState(false);
  const [rememberChoice, setRememberChoice] = useState(false);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          console.log('Coordonnées obtenues:', coords);
          
          onUpdate({
            location: coords,
            locationPermission: 'granted',
            rememberLocationChoice: rememberChoice
          });
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          onUpdate({
            locationPermission: 'denied',
            rememberLocationChoice: rememberChoice
          });
        },
        {
          enableHighAccuracy: true,
          maximumAge: rememberChoice ? 86400000 : 0 
        }
      );
    } else {
      console.error("La géolocalisation n'est pas supportée par ce navigateur.");
    }
  };

  useEffect(() => {
    if (enableLocation) {
      requestLocation();
    }
  }, [enableLocation, rememberChoice]);

  return (
    <div className="w-full max-w-xl space-y-6">
      <div className="space-y-4">        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="enable-location" 
            checked={enableLocation}
            onCheckedChange={(checked) => setEnableLocation(checked as boolean)}
          />
          <Label htmlFor="enable-location">
            {t('options.enable')}
          </Label>
        </div>
      </div>
 
    </div>
  );
};
export default LocationPermission;