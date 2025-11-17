'use client';

import L from 'leaflet';
import { Marker as LeafletMarker, Popup } from 'react-leaflet';
import { Icon } from '@iconify/react';
import { useState } from 'react';

interface DriverMarkerProps {
  id: string;
  name: string;
  vehicle?: string | null;
  lat: number;
  lng: number;
  status?: string | null;
  rating?: number | null;
  phone?: string | null;
  nbPlaces?: number | null;
}

export const DriverMarker = ({ 
  name, 
  vehicle, 
  lat, 
  lng, 
  status, 
  rating = 4.2, 
  phone = '(+261) 34 ....',
  nbPlaces = 4 
}: DriverMarkerProps) => {
  const [message, setMessage] = useState('');

  // Determine marker color based on status
  const getMarkerColor = (status?: string | null) => {
    switch (status) {
      case 'AVAILABLE':
        return '#22c55e'; // green-500
      case 'BUSY':
        return '#ef4444'; // red-500
      default:
        return '#6b7280'; // gray-500
    }
  };

  // Create a custom icon using SVG marker
  const markerColor = getMarkerColor(status);
  
  // Create a simple SVG marker icon instead of using Iconify
  const iconHtml = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
      <path fill="${markerColor}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `;

  const driverIcon = new L.DivIcon({
    html: iconHtml,
    className: 'custom-driver-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  // Get status color for the dot
  const getStatusColor = (status?: string | null) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-500';
      case 'BUSY':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Implement actual message sending logic
      console.log('Sending message:', message, 'to driver:', name);
      setMessage('');
    }
  };

  return (
    <LeafletMarker position={[lat, lng]} icon={driverIcon}>
      <Popup className="driver-popup" minWidth={300}>
        <div className="p-3 min-w-[280px]">
          {/* Driver name and rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <Icon icon="mdi:account" className="text-3xl text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base">{name}</h3>
              <div className="flex items-center gap-1">
                <Icon icon="mdi:star" className="text-yellow-500 text-sm" />
                <span className="text-sm font-medium">{rating}</span>
              </div>
            </div>
          </div>

          {/* Vehicle and places info */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:car" className="text-gray-600 text-lg" />
              <span className="text-sm text-gray-700">{vehicle || 'Unknown'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="mdi:car-seat" className="text-gray-600 text-lg" />
              <span className="text-sm text-gray-700">Nb de places: {nbPlaces}</span>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor(status)}`} />
            <span className="text-sm">{status || 'Unknown'}</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 mb-3">
            <Icon icon="mdi:phone" className="text-blue-600 text-lg" />
            <span className="text-sm text-blue-600">{phone}</span>
          </div>

          {/* Message input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Envoyer un message"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              aria-label="Send message"
            >
              <Icon icon="mdi:send" className="text-lg" />
            </button>
          </div>
        </div>
      </Popup>
    </LeafletMarker>
  );
};
