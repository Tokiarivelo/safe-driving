'use client';

import React from 'react';
import { Icon } from '@iconify/react';

interface RideInfoPanelProps {
  ride: {
    id: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    departure: {
      address: string;
      lat: number;
      lng: number;
    };
    arrival: {
      address: string;
      lat: number;
      lng: number;
    };
    scheduledDeparture: Date | string;
    price: number;
    currency: string;
  };
  variant?: 'user' | 'driver';
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'En attente',
  IN_PROGRESS: 'En cours',
  COMPLETED: 'Terminée',
  CANCELLED: 'Annulée',
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-500',
  IN_PROGRESS: 'bg-green-500',
  COMPLETED: 'bg-red-500',
  CANCELLED: 'bg-gray-500',
};

// The variant prop is available for future use to customize UI based on user/driver view
export default function RideInfoPanel({ ride }: RideInfoPanelProps) {
  const formattedDate = new Date(ride.scheduledDeparture).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const formattedTime = new Date(ride.scheduledDeparture).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedPrice = new Intl.NumberFormat('fr-MG').format(ride.price);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-xs">
      {/* Header with date */}
      <div className="flex items-center gap-2 mb-4">
        <Icon icon="mdi:chevron-up" className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          Course du {formattedDate} à {formattedTime.replace(':', 'h')}
        </span>
      </div>

      {/* Route display */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex flex-col items-center pt-1">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <div className="w-0.5 h-12 bg-gray-300 my-1 border-dashed" style={{ borderLeft: '2px dashed #d1d5db' }} />
          <div className="w-3 h-3 rounded-full bg-red-500" />
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <p className="font-medium text-sm">{ride.departure.address}</p>
          </div>
          <div>
            <p className="font-medium text-sm">{ride.arrival.address}</p>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="mb-3">
        <p className="text-xs text-gray-500 mb-1">Prix</p>
        <p className="font-bold text-lg">{formattedPrice}{ride.currency}</p>
      </div>

      {/* Status */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">Status</p>
        <div className="flex items-center gap-2">
          <span className="text-sm">{STATUS_LABELS[ride.status]}</span>
          <div className={`w-2.5 h-2.5 rounded-full ${STATUS_COLORS[ride.status]}`} />
        </div>
      </div>

      {/* QR Code */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Qr code</p>
        <div className="w-24 h-24 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center">
          <Icon icon="mdi:qrcode" className="w-20 h-20 text-gray-800" />
        </div>
      </div>
    </div>
  );
}
