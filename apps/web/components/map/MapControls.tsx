'use client';

import { Icon } from '@iconify/react';
import React, { useState } from 'react';

function MapControls({
                       getLocation,
                       isCentered,
                       zoomIn,
                       zoomOut,
                     }: {
  getLocation: () => void;
  isCentered: boolean;
  zoomIn: () => void;
  zoomOut: () => void;
}) {
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleClick = (btn: string, action: () => void) => {
    setClickedButton(btn);
    action();
    setTimeout(() => setClickedButton(null), 150); // reset after 150ms
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        borderRadius: '8px',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Zoom In */}
      <button
        onClick={() => handleClick('zoomIn', zoomIn)}
        style={{
          ...buttonStyle,
          background: clickedButton === 'zoomIn' ? 'rgba(0,0,0,0.2)' : 'transparent',
        }}
        title="Zoom In"
      >
        <Icon icon="mdi:plus" width={20} height={20} />
      </button>

      {/* Zoom Out */}
      <button
        onClick={() => handleClick('zoomOut', zoomOut)}
        style={{
          ...buttonStyle,
          background: clickedButton === 'zoomOut' ? 'rgba(0,0,0,0.2)' : 'transparent',
        }}
        title="Zoom Out"
      >
        <Icon icon="mdi:minus" width={20} height={20} />
      </button>

      {/* Recenter */}
      <button
        onClick={() => handleClick('recenter', getLocation)}
        style={{
          ...buttonStyle,
          background: clickedButton === 'recenter' ? 'rgba(0,0,0,0.2)' : 'transparent',
        }}
        title="Recenter to My Location"
      >
        {isCentered ? (
          <Icon icon="material-symbols:my-location" width={20} height={20} />
        ) : (
          <Icon icon="material-symbols:location-searching" width={20} height={20} />
        )}
      </button>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: '10px',
  border: 'none',
  background: 'transparent',
  color: 'black',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default MapControls;
