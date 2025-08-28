import React from 'react';

export interface Location {
  id: string;
  placeholder: string;
  value: string;
  lat?: number;
  lon?: number;
  source: 'user' | 'marker';
}

export type LocationsProps = {
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  updateLocation: (id: string, value: string, lat?: number, lon?: number) => void;
  deleteLocation: (id: string) => void;
};

export const defaultLocations: Location[] = [
  { id: '1', placeholder: 'Origin', value: '', source: 'marker' },
  { id: '2', placeholder: 'Destination', value: '', source: 'marker' },
];
