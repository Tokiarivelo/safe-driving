'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import SearchBar from '@/components/map/SearchBar';

export default function SidePanel() {
  const [open, setOpen] = useState(false);
  const panelWidthPercent = 35; // panel width as percent of viewport

  return (
    <>
      {/* Sliding Side Panel */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: `${panelWidthPercent}vw`,
          height: '100%',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(8px)',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.2)',
          transition: 'transform 0.3s ease',
          transform: open ? 'translateX(0)' : `translateX(${panelWidthPercent}vw)`,
          zIndex: 1000,
        }}
      >
        <div style={{ padding: '1rem' }}>
          <SearchBar />
        </div>
      </div>

      {/* Unified animated toggle button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'absolute',
          top: '50%',
          right: open ? `${panelWidthPercent}vw` : '0vw',
          transform: 'translateY(-50%)',
          transition: 'all 0.3s ease',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(8px)',
          border: '1px solid #ccc',
          borderRadius: '8px 0 0 8px',
          padding: '6px',
          cursor: 'pointer',
          boxShadow: '-2px 0 4px rgba(0,0,0,0.1)',
          zIndex: 1100,
        }}
      >
        <div
          style={{
            transition: 'transform 0.3s ease',
            transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon icon="material-symbols:keyboard-double-arrow-right-rounded" width="24" />
        </div>
      </button>
    </>
  );
}
