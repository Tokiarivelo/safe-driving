'use client';
import { useLocationContext } from './LocationContext';
import { useEffect } from 'react';
import React from 'react';
export const useLocation = (options: {
  autoUpdate?: boolean;
  updateInterval?: number;
  onPositionChange?: (position: GeolocationPosition) => void;
} = {}) => {
  const {
    isEnabled,
    hasPermission,
    currentPosition,
    updateLocation,
  } = useLocationContext();

  const { autoUpdate = false, updateInterval = 30000, onPositionChange } = options;

  useEffect(() => {
    if (!autoUpdate || !isEnabled || !hasPermission) return;

    const interval = setInterval(async () => {
      try {
        await updateLocation();
      } catch (error) {
        console.error('Erreur lors de la mise à jour automatique:', error);
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, [autoUpdate, isEnabled, hasPermission, updateInterval, updateLocation]);

  useEffect(() => {
    if (currentPosition && onPositionChange) {
      onPositionChange(currentPosition);
    }
  }, [currentPosition, onPositionChange]);

  const getLocationInfo = () => {
    if (!currentPosition) return null;
    
    return {
      latitude: currentPosition.coords.latitude,
      longitude: currentPosition.coords.longitude,
      accuracy: currentPosition.coords.accuracy,
      timestamp: currentPosition.timestamp,
    };
  };

  const forceUpdate = async () => {
    if (!hasPermission) {
      throw new Error('Permission de géolocalisation requise');
    }
    await updateLocation();
  };

  return {
    isEnabled,
    hasPermission,
    currentPosition,
    locationInfo: getLocationInfo(),
    forceUpdate,
    updateLocation,
  };
};

export const ExampleUsage = () => {
  const { 
    isEnabled, 
    hasPermission, 
    locationInfo, 
    forceUpdate 
  } = useLocation({
    autoUpdate: true, 
    updateInterval: 30000,
    onPositionChange: (position) => {
      console.log('Nouvelle position:', position.coords);
    }
  });

  if (!isEnabled) {
    return <div>Géolocalisation désactivée</div>;
  }

  if (!hasPermission) {
    return <div>Permission requise</div>;
  }

  return (
    <div>
      <h2>Position actuelle :</h2>
      {locationInfo ? (
        <div>
          <p>Latitude: {locationInfo.latitude}</p>
          <p>Longitude: {locationInfo.longitude}</p>
          <p>Précision: {locationInfo.accuracy}m</p>
          <button onClick={forceUpdate}>Actualiser</button>
        </div>
      ) : (
        <p>Récupération de la position...</p>
      )}
    </div>
  );
};