'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

interface LocationState {
  isEnabled: boolean;
  hasPermission: boolean;
  currentPosition: GeolocationPosition | null;
  rememberChoice: boolean;
  lastUpdated: number | null;
}

interface LocationContextType extends LocationState {
  setLocationEnabled: (enabled: boolean) => void;
  setHasPermission: (permission: boolean) => void;
  setCurrentPosition: (position: GeolocationPosition | null) => void;
  setRememberChoice: (remember: boolean) => void;
  requestPermission: () => Promise<boolean>;
  updateLocation: () => Promise<void>;
  clearLocationData: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const STORAGE_KEY = 'location_preferences';
const POSITION_EXPIRY = 10 * 60 * 1000;

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locationState, setLocationState] = useState<LocationState>({
    isEnabled: false,
    hasPermission: false,
    currentPosition: null,
    rememberChoice: false,
    lastUpdated: null,
  });

  const saveToStorage = (state: LocationState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const requestLocationPermission = useCallback(
    async (currentState?: LocationState): Promise<boolean> => {
      if (!navigator.geolocation) {
        return false;
      }

      return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(
          position => {
            const newState = {
              ...(currentState || locationState),
              hasPermission: true,
              currentPosition: position,
              lastUpdated: Date.now(),
            };
            setLocationState(newState);
            saveToStorage(newState);
            resolve(true);
          },
          error => {
            console.error('Permission de géolocalisation refusée:', error);
            const newState = {
              ...(currentState || locationState),
              hasPermission: false,
              currentPosition: null,
              lastUpdated: null,
            };
            setLocationState(newState);
            saveToStorage(newState);
            resolve(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 300000,
          },
        );
      });
    },
    [locationState],
  );

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);

        const now = Date.now();
        const isPositionExpired = parsed.lastUpdated && now - parsed.lastUpdated > POSITION_EXPIRY;

        const initialState = {
          ...parsed,
          currentPosition: isPositionExpired ? null : parsed.currentPosition,
          lastUpdated: isPositionExpired ? null : parsed.lastUpdated,
        };

        setLocationState(initialState);

        if (parsed.isEnabled && parsed.rememberChoice && !isPositionExpired) {
          setTimeout(() => {
            requestLocationPermission(initialState);
          }, 100);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des préférences de géolocalisation:', error);
      }
    }
  }, [requestLocationPermission]);

  const updateLocation = async (): Promise<void> => {
    if (!locationState.hasPermission || !navigator.geolocation) {
      throw new Error('Permission de géolocalisation requise');
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const newState = {
            ...locationState,
            currentPosition: position,
            lastUpdated: Date.now(),
          };
          setLocationState(newState);
          saveToStorage(newState);
          resolve();
        },
        error => {
          console.error('Erreur lors de la mise à jour de position:', error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        },
      );
    });
  };

  const setLocationEnabled = (enabled: boolean) => {
    const newState = {
      ...locationState,
      isEnabled: enabled,
      ...(enabled ? {} : { hasPermission: false, currentPosition: null, lastUpdated: null }),
    };
    setLocationState(newState);
    saveToStorage(newState);
  };

  const setHasPermission = (permission: boolean) => {
    const newState = {
      ...locationState,
      hasPermission: permission,
      ...(permission ? {} : { currentPosition: null, lastUpdated: null }),
    };
    setLocationState(newState);
    saveToStorage(newState);
  };

  const setCurrentPosition = (position: GeolocationPosition | null) => {
    const newState = {
      ...locationState,
      currentPosition: position,
      lastUpdated: position ? Date.now() : null,
    };
    setLocationState(newState);
    saveToStorage(newState);
  };

  const setRememberChoice = (remember: boolean) => {
    const newState = {
      ...locationState,
      rememberChoice: remember,
    };
    setLocationState(newState);
    saveToStorage(newState);
  };

  const clearLocationData = () => {
    const newState = {
      isEnabled: false,
      hasPermission: false,
      currentPosition: null,
      rememberChoice: false,
      lastUpdated: null,
    };
    setLocationState(newState);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <LocationContext.Provider
      value={{
        ...locationState,
        setLocationEnabled,
        setHasPermission,
        setCurrentPosition,
        setRememberChoice,
        requestPermission: requestLocationPermission,
        updateLocation,
        clearLocationData,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext doit être utilisé dans un LocationProvider');
  }
  return context;
};
