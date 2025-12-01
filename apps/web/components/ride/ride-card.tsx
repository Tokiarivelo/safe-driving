'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Ride, STATUS_LABELS, STATUS_COLORS, RideStatus } from './types';

interface RideCardProps {
  ride: Ride;
  isSelected?: boolean;
  onClick?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  showContextMenu?: boolean;
}

export function RideCard({
  ride,
  isSelected = false,
  onClick,
  onArchive,
  onDelete,
  showContextMenu = true,
}: RideCardProps) {
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Close context menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setContextMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const driverOrPassengerName = ride.driver
    ? `${ride.driver.firstName} ${ride.driver.lastName || ''}`
    : ride.passengers?.[0]
      ? `${ride.passengers[0].firstName} ${ride.passengers[0].lastName || ''}`
      : '—';

  return (
    <div
      className={`relative p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
        isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
      }`}
      onClick={onClick}
    >
      {/* Date header */}
      <div className="text-xs text-gray-500 mb-2">
        {formattedDate} à {formattedTime}
      </div>

      <div className="flex items-start gap-3">
        {/* Route indicators */}
        <div className="flex flex-col items-center pt-1">
          <div className="w-3 h-3 rounded-full border-2 border-blue-500 bg-white" />
          <div className="w-0.5 h-10 bg-gray-300 my-1" />
          <div className="w-3 h-3 rounded-full border-2 border-red-500 bg-white" />
        </div>

        {/* Ride info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{ride.departureAddress}</p>
            </div>
            <div className="flex items-center gap-1 ml-2 text-sm text-gray-600">
              <Icon icon="mdi:cash" className="w-4 h-4" />
              <span className="font-medium">{formattedPrice}{ride.currency}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500 my-1">
            <Icon icon="mdi:clock-outline" className="w-3 h-3" />
            <span>{formattedTime}</span>
          </div>

          <div className="flex justify-between items-end mt-1">
            <p className="font-medium text-sm truncate">{ride.arrivalAddress}</p>
            <div className="flex items-center gap-2 ml-2">
              <div className="flex items-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full ${STATUS_COLORS[ride.status as RideStatus]}`}
                />
                <span className="text-xs text-gray-600">{STATUS_LABELS[ride.status as RideStatus]}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
            <Icon icon="mdi:account" className="w-3 h-3" />
            <span className="truncate">{driverOrPassengerName}</span>
          </div>
        </div>

        {/* Context menu button */}
        {showContextMenu && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setContextMenuOpen(!contextMenuOpen);
              }}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <Icon icon="mdi:dots-vertical" className="w-5 h-5 text-gray-500" />
            </button>

            {contextMenuOpen && (
              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 min-w-[180px]">
                {onArchive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onArchive();
                      setContextMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Icon icon="mdi:archive-outline" className="w-4 h-4" />
                    Archiver
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                      setContextMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 text-red-600"
                  >
                    <Icon icon="mdi:trash-can-outline" className="w-4 h-4" />
                    Supprimer la conversation
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
