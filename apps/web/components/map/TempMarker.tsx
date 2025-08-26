import React from 'react';
import { useMapEvents } from 'react-leaflet';

export function TempMarker({
  setTempMarker,
  addLocationAt,
}: {
  setTempMarker: React.Dispatch<React.SetStateAction<{ lat: number; lon: number } | null>>;
  addLocationAt: (lat: number, lon: number) => void;
}) {
  useMapEvents({
    contextmenu(e) {
      setTempMarker({ lat: e.latlng.lat, lon: e.latlng.lng });
    },
    dragstart() {
      setTempMarker(null); // remove when map moves
    },
    zoomstart() {
      setTempMarker(null);
    },
  });

  return null;
}
