'use client';

import { Circle, Marker as LeafletMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useMemo } from 'react';

interface UserPositionZoneProps {
  position: [number, number];
  radiusMeters?: number;
  showZone?: boolean;
}

export const UserPositionZone = ({
  position,
  radiusMeters = 1500,
  showZone = true,
}: UserPositionZoneProps) => {
  // Create a custom user position marker with a distinct appearance
  const userIcon = useMemo(() => {
    const userIconHtml = `
      <div style="position: relative; width: 24px; height: 24px;">
        <!-- Outer pulse ring -->
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.3);
          animation: pulse 2s infinite;
        "></div>
        <!-- Inner circle -->
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>
      </div>
    `;

    return new L.DivIcon({
      html: userIconHtml,
      className: 'user-position-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    });
  }, []);

  return (
    <>
      {/* User position marker */}
      <LeafletMarker position={position} icon={userIcon}>
        <Popup>
          <div className="p-2">
            <p className="font-semibold text-blue-600">Your Location</p>
            <p className="text-sm text-gray-600">
              Lat: {position[0].toFixed(6)}
              <br />
              Lng: {position[1].toFixed(6)}
            </p>
          </div>
        </Popup>
      </LeafletMarker>

      {/* Limited zone circle */}
      {showZone && (
        <Circle
          center={position}
          radius={radiusMeters}
          pathOptions={{
            color: '#3b82f6',
            fillColor: '#3b82f6',
            fillOpacity: 0.1,
            weight: 2,
            dashArray: '5, 10',
          }}
        />
      )}
    </>
  );
};
