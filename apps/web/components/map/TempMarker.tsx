import React from 'react';
import { useMapEvents } from 'react-leaflet';

export function TempMarker({
  setTempMarker,
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
