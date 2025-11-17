import { useEffect, useRef, useCallback } from 'react';

type RouteWorkerMessage =
  | { type: 'ROUTE_CALCULATED'; data: { geometry: string; distance: number; duration: number } }
  | { type: 'ROUTE_ERROR'; error: string };

type GeocodingWorkerMessage =
  | { type: 'GEOCODE_RESULT'; data: { lat: number; lon: number; locationName: string } }
  | { type: 'GEOCODE_ERROR'; error: string; data: { lat: number; lon: number } };

export function useRouteWorker() {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Initialize worker only on client side
    if (typeof window !== 'undefined') {
      workerRef.current = new Worker('/workers/route-worker.js');
    }

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const calculateRoute = useCallback(
    (
      coordinates: [number, number][],
      orsUrl: string,
      callback: (result: RouteWorkerMessage) => void,
    ) => {
      if (!workerRef.current) return;

      const handleMessage = (event: MessageEvent<RouteWorkerMessage>) => {
        callback(event.data);
        workerRef.current?.removeEventListener('message', handleMessage);
      };

      workerRef.current.addEventListener('message', handleMessage);
      workerRef.current.postMessage({
        type: 'CALCULATE_ROUTE',
        data: { coordinates, orsUrl },
      });
    },
    [],
  );

  return { calculateRoute };
}

export function useGeocodingWorker() {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Initialize worker only on client side
    if (typeof window !== 'undefined') {
      workerRef.current = new Worker('/workers/geocoding-worker.js');
    }

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const reverseGeocode = useCallback(
    (
      lat: number,
      lon: number,
      nominatimUrl: string,
      callback: (result: GeocodingWorkerMessage) => void,
    ) => {
      if (!workerRef.current) return;

      const handleMessage = (event: MessageEvent<GeocodingWorkerMessage>) => {
        callback(event.data);
        workerRef.current?.removeEventListener('message', handleMessage);
      };

      workerRef.current.addEventListener('message', handleMessage);
      workerRef.current.postMessage({
        type: 'REVERSE_GEOCODE',
        data: { lat, lon, nominatimUrl },
      });
    },
    [],
  );

  return { reverseGeocode };
}
