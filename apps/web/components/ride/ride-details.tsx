'use client';

import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Ride, STATUS_LABELS, STATUS_COLORS, RideStatus } from './types';

interface RideDetailsProps {
  ride: Ride;
  variant: 'user' | 'driver';
  onEdit?: () => void;
  onMessage?: () => void;
}

export function RideDetails({ ride, variant, onEdit, onMessage }: RideDetailsProps) {
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

  const finishedDate = ride.finishedAt
    ? new Date(ride.finishedAt).toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  // Determine which user to display based on variant
  const displayUser = variant === 'user' ? ride.driver : ride.passengers?.[0];

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200 w-80">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold">A propos de la course</h2>
        {onEdit && (
          <button onClick={onEdit} className="p-1 hover:bg-gray-100 rounded">
            <Icon icon="mdi:pencil-outline" className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Route */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Trajet</h3>
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center pt-2">
              <Icon icon="mdi:magnify" className="w-4 h-4 text-gray-400" />
              <div className="w-0.5 h-8 bg-gray-300 my-1" />
              <Icon icon="mdi:map-marker" className="w-4 h-4 text-red-500" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="bg-gray-100 px-3 py-2 rounded-lg">
                <p className="text-sm">{ride.departureAddress}</p>
              </div>
              <div className="bg-gray-100 px-3 py-2 rounded-lg">
                <p className="text-sm">{ride.arrivalAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Price */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Prix</h3>
          <p className="text-xl font-bold">{formattedPrice}{ride.currency}</p>
        </div>

        {/* Date and time */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Date et heure de départ prévue</h3>
          <p className="text-base">{formattedDate} à {formattedTime}</p>
        </div>

        {/* Status */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Status</h3>
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${STATUS_COLORS[ride.status as RideStatus]}`} />
            <span className="text-sm">{STATUS_LABELS[ride.status as RideStatus]}</span>
            {finishedDate && (
              <span className="text-xs text-gray-500">le {finishedDate}</span>
            )}
          </div>
        </div>

        {/* Vehicle characteristics - For user view */}
        {variant === 'user' && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Caractéristique du véhicule recherché
            </h3>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              {ride.vehicleType && <li>{ride.vehicleType}</li>}
              <li>Nb de passagers: {ride.requiredSeats}</li>
            </ul>
          </div>
        )}

        {/* Vehicle characteristics - For driver view */}
        {variant === 'driver' && ride.vehicle && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Caractéristique du véhicule
            </h3>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              {ride.vehicle.type && <li>{ride.vehicle.type}</li>}
              <li>Nb de places: {ride.vehicle.seats}</li>
            </ul>
          </div>
        )}

        {/* Driver preferences - For user view */}
        {variant === 'user' && (ride.minDriverRating || ride.preferredLanguages?.length) && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Préférence chauffeur</h3>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              {ride.minDriverRating && <li>Note: {ride.minDriverRating} et plus</li>}
              {ride.preferredLanguages && ride.preferredLanguages.length > 0 && (
                <li>Parlant: {ride.preferredLanguages.join(', ')}</li>
              )}
            </ul>
          </div>
        )}

        {/* Other preferences */}
        {(ride.acceptsAnimals !== undefined || ride.acceptsBaggage !== undefined || ride.baggageDetails || ride.otherPreferences) && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Autres informations</h3>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              <li>Animaux: {ride.acceptsAnimals ? 'accepté' : 'non accepté'}</li>
              {ride.baggageDetails && <li>Bagage: {ride.baggageDetails}</li>}
              {ride.otherPreferences && <li>{ride.otherPreferences}</li>}
            </ul>
          </div>
        )}

        {/* QR Code placeholder */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Qr code</h3>
          <div className="w-32 h-32 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center">
            <Icon icon="mdi:qrcode" className="w-24 h-24 text-gray-400" />
          </div>
        </div>

        {/* Driver/User info section */}
        {displayUser && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {variant === 'user' ? 'Chauffeur engagé' : "A propos de l'utilisateur"}
            </h3>
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="relative">
                {displayUser.avatarUrl ? (
                  <Image
                    src={displayUser.avatarUrl}
                    alt={`${displayUser.firstName} ${displayUser.lastName || ''}`}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                    <Icon icon="mdi:account" className="w-10 h-10 text-gray-400" />
                  </div>
                )}
                {/* Online indicator */}
                <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>

              {/* Name */}
              <p className="font-semibold mt-2">
                {displayUser.firstName} {displayUser.lastName || ''}
              </p>

              {/* Rating */}
              {displayUser.rating && (
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <Icon icon="mdi:star" className="w-4 h-4 text-yellow-500" />
                  <span>{displayUser.rating.toFixed(1)}</span>
                </div>
              )}

              {/* Vehicle info - for user view */}
              {variant === 'user' && ride.vehicle && (
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Icon icon="mdi:car" className="w-4 h-4" />
                    <span>{ride.vehicle.brand} {ride.vehicle.model}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon icon="mdi:seat-passenger" className="w-4 h-4" />
                    <span>Nb de places: {ride.vehicle.seats}</span>
                  </div>
                </div>
              )}

              {/* Phone */}
              {displayUser.phone && (
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                  <Icon icon="mdi:phone" className="w-4 h-4" />
                  <span>{displayUser.phone}</span>
                </div>
              )}

              {/* Message button - for driver view */}
              {variant === 'driver' && onMessage && (
                <button
                  onClick={onMessage}
                  className="flex items-center gap-2 mt-3 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Icon icon="mdi:message-outline" className="w-4 h-4" />
                  <span className="text-sm">Envoyer un message</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
