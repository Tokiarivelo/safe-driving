import React from 'react';

export interface Location {
  id: string;
  placeholder: string;
  value: string;
  lat?: number;
  lon?: number;
}

export type LocationsProps = {
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  updateLocation: (id: string, value: string, lat?: number, lon?: number) => void;
  deleteLocation: (id: string) => void;
};
