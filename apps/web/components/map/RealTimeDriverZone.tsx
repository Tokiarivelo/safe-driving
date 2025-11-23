import { LatLngExpression } from 'leaflet';
import { Circle, Marker } from 'react-leaflet';
import { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { distanceMeters } from '@/components/map/MapUtils';

interface Driver {
  key: string;
  coords: [number, number];
}

interface RealTimeDriverZoneProps {
  initialCenter: LatLngExpression;
  radius: number;
  onCenterChange?: (lat: number, lng: number) => void;
}

export const RealTimeDriverZone = ({
  initialCenter,
  radius,
  onCenterChange,
}: RealTimeDriverZoneProps) => {
  // Normalize center into a consistent { lat, lng } object
  const normalizeCenter = (c: LatLngExpression) => {
    if (Array.isArray(c)) return { lat: c[0], lng: c[1] };
    if ('lat' in c && 'lng' in c) return { lat: c.lat, lng: c.lng };
    return { lat: 0, lng: 0 }; // fallback
  };

  const [center, setCenter] = useState(() => normalizeCenter(initialCenter));
  const [drivers, setDrivers] = useState<Map<string, Driver>>(new Map());
  const socketRef = useRef<Socket | null>(null);

  // Connect to Socket.IO
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_GRAPHQL_BASE_URL, { transports: ['websocket'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Connected to server');
      socket.emit('drivers:list', { pattern: 'driver:*' });
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
    });

    socket.on('drivers:list:result', (payload: any) => {
      if (!payload?.items) return;
      const map = new Map<string, Driver>();
      for (const it of payload.items) {
        if (it.value?.coords) {
          map.set(it.key, { key: it.key, coords: it.value.coords });
        }
      }
      setDrivers(map);
    });

    socket.on('drivers:update', (payload: any) => {
      if (!payload?.value?.coords) return;
      setDrivers(prev => {
        const copy = new Map(prev);
        copy.set(payload.key, { key: payload.key, coords: payload.value.coords });
        return copy;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Filter drivers by radius
  const inRadius = Array.from(drivers.values()).filter(d => {
    const [lat, lng] = d.coords;
    return distanceMeters(center.lat, center.lng, lat, lng) <= radius;
  });

  return (
    <>
      {/* Draggable center marker */}
      <Marker
        draggable
        position={center}
        eventHandlers={{
          drag: e => {
            const newPos = e.target.getLatLng();
            setCenter(newPos);
            if (onCenterChange) onCenterChange(newPos.lat, newPos.lng);
          },
          dragend: e => {
            const newPos = e.target.getLatLng();
            setCenter(newPos);
            if (onCenterChange) onCenterChange(newPos.lat, newPos.lng);
          },
        }}
      />

      {/* Radius circle */}
      <Circle center={center} radius={radius} color="blue" opacity={0.3} />

      {/* Driver markers */}
      {inRadius.map(driver => (
        <Marker key={driver.key} position={[driver.coords[0], driver.coords[1]]} />
      ))}
    </>
  );
};

export default RealTimeDriverZone;
