'use client';

import { CircleMarker, Popup } from 'react-leaflet';

interface MarkerProps {
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
  radius?: number;
  position: [number, number];
  text?: string;        // default popup text
  addText?: string | null;  // optional add button text
  onAdd?: (() => void) | null;  // optional callback for add button
}

export const Marker = ({
                         color = 'blue',
                         fillColor = color,
                         fillOpacity = 0.5,
                         radius = 10,
                         position,
                         text = 'My Location',
                         addText = null,
                         onAdd = null,
                       }: MarkerProps) => {
  const showButton = addText && onAdd;

  return (
    <CircleMarker
      center={position}
      radius={radius}
      pathOptions={{
        color,
        fillColor,
        fillOpacity,
      }}
    >
      <Popup>
        {showButton ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span>{text}</span>
            <button
              onClick={onAdd!}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                background: color,
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {addText}
            </button>
          </div>
        ) : (
          text
        )}
      </Popup>
    </CircleMarker>
  );
};
