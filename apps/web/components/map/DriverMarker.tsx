'use client';

import L from 'leaflet';
import { Marker as LeafletMarker, Popup } from 'react-leaflet';

interface DriverMarkerProps {
  id: string;
  name: string;
  vehicle?: string | null;
  lat: number;
  lng: number;
  status?: string | null;
}

export const DriverMarker = ({ name, vehicle, lat, lng, status }: DriverMarkerProps) => {
  // Create a custom icon for drivers
  const driverIcon = new L.Icon({
    iconUrl: '/leaflet/images/marker-icon.png',
    iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
    shadowUrl: '/leaflet/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Calculate a random ETA between 1-6 minutes
  const eta = Math.round(Math.random() * 5) + 1;

  return (
    <LeafletMarker position={[lat, lng]} icon={driverIcon}>
      <Popup>
        <div className="p-2">
          <h3 className="font-semibold text-sm mb-1">{name}</h3>
          {vehicle && <p className="text-xs text-gray-600 mb-1">Vehicle: {vehicle}</p>}
          {status && (
            <p className="text-xs mb-1">
              <span
                className={`inline-block w-2 h-2 rounded-full mr-1 ${
                  status === 'AVAILABLE'
                    ? 'bg-green-500'
                    : status === 'BUSY'
                      ? 'bg-red-500'
                      : 'bg-gray-500'
                }`}
              />
              {status}
            </p>
          )}
          <p className="text-xs text-blue-600 font-medium">ETA: {eta} min</p>
        </div>
      </Popup>
    </LeafletMarker>
  );
};
