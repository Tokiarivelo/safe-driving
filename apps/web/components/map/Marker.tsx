'use client';

import { CircleMarker, Popup } from 'react-leaflet';

export const Marker = ({
  color = 'blue',
  fillColor = color,
  fillOpacity = 0.5,
  radius = 10,
  position,
  text = 'My Location',
}: {
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
  radius?: number;
  position: [number, number];
  text?: string;
}) => {
  return (
    <CircleMarker
      center={position}
      radius={radius}
      pathOptions={{
        color: color,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
      }}
    >
      <Popup>{text}</Popup>
    </CircleMarker>
  );
};
