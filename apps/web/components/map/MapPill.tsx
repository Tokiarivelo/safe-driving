import { Icon } from '@iconify/react';
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import centroid from '@turf/centroid';
import { polygon } from '@turf/helpers';

type PillProps = {
  label: string;
  onClick: () => void;
  active?: boolean;
  iconName: string;
};

function Pill({ label, onClick, active, iconName }: PillProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 12px',
        borderRadius: '9999px',
        background: active ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(8px)',
        cursor: 'pointer',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        color: active ? 'white' : 'black',
        border: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <Icon icon={iconName} width={20} height={20} />
      {label}
    </button>
  );
}

type ProgressPillProps = {
  label: string;
};

function ProgressPill({ label }: ProgressPillProps) {
  const radius = 8;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      style={{
        padding: '6px 12px',
        borderRadius: '9999px',
        background: 'rgba(59, 130, 246, 0.2)',
        backdropFilter: 'blur(8px)',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        color: '#1e40af',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <svg width="18" height="18">
        {/* Background circle */}
        <circle
          cx="9"
          cy="9"
          r={radius}
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="2"
          fill="none"
        />
        {/* Spinning circle */}
        <circle
          cx="9"
          cy="9"
          r={radius}
          stroke="#1e40af"
          strokeWidth="2"
          fill="none"
          strokeDasharray={`${circumference * 0.25} ${circumference * 0.75}`}
          style={{
            animation: 'spin 1s linear infinite',
            transformOrigin: '9px 9px',
          }}
        />
      </svg>
      {label}
    </div>
  );
}

export function MapPills({ mapRef }: { mapRef: React.RefObject<L.Map | null> }) {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const markersRef = useRef<L.Marker[]>([]);
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearMarkers = () => {
    markersRef.current.forEach((marker: L.Marker) => {
      marker.remove();
    });
    markersRef.current = [];
  };

  const removeOutOfBoundsMarkers = (bounds: L.LatLngBounds) => {
    markersRef.current = markersRef.current.filter((marker) => {
      const pos = marker.getLatLng();
      if (!bounds.contains(pos)) {
        marker.remove();
        return false;
      }
      return true;
    });
  };

  const handleClick = (label: string) => {
    setActiveLabel(prev => (prev === label ? null : label)); // just toggle
    clearMarkers();
  };

  async function fetchOverpassData(query: string): Promise<Array<{ type?: string; lat?: number; lon?: number; geometry?: Array<{ lon: number; lat: number }> }>> {
    const response = await fetch(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
    );
    if (!response.ok) throw new Error(`Overpass API error: ${response.statusText}`);
    const data = await response.json();
    return data.elements || [];
  }

  function renderMarkers(map: L.Map, elements: Array<{ type?: string; lat?: number; lon?: number; geometry?: Array<{ lon: number; lat: number }> }>, pill: string): L.Marker[] {
    const markers: L.Marker[] = [];
    const bounds = map.getBounds();

    elements.forEach((el, index) => {
      // Update progress as we process markers
      const renderProgress = 70 + ((index + 1) / elements.length) * 30; // 70-100%
      setProgress(Math.min(renderProgress, 100));

      let lat, lon;

      if (el.type === 'node') {
        lat = el.lat;
        lon = el.lon;
      } else if (el.type === 'way' && el.geometry?.length) {
        const coords = el.geometry.map((g: { lon: number; lat: number }) => [g.lon, g.lat]);
        if (
          coords[0][0] !== coords[coords.length - 1][0] ||
          coords[0][1] !== coords[coords.length - 1][1]
        ) {
          coords.push(coords[0]); // ensure closed polygon
        }
        const poly = polygon([coords]);
        const c = centroid(poly).geometry.coordinates;
        lon = c[0];
        lat = c[1];
      }

      if (!lat || !lon) return;

      // Only add markers that are within current bounds
      const markerLatLng = L.latLng(lat, lon);
      if (!bounds.contains(markerLatLng)) return;

      const markerName = el.tags?.name || 'Unnamed ' + pill;

      const markerHtml = `
      <div style="
        display:flex;
        align-items:center;
        gap:4px;
        white-space:nowrap;
      ">
        <span style="
          background:white;
          padding:2px 4px;
          border-radius:4px;
          font-size:12px;
          background:rgba(255,255,255,0.5);
          backdrop-filter:blur(8px);
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        ">
          ${markerName}
        </span>
      </div>
    `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: '',
        iconAnchor: [15, 15],
      });

      const marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);
      markers.push(marker);
      markersRef.current.push(marker);
    });

    return markers;
  }

  async function fetchAndRenderHotels(map: L.Map): Promise<L.Marker[]> {
    const bounds = map.getBounds();
    const south = bounds.getSouth();
    const west = bounds.getWest();
    const north = bounds.getNorth();
    const east = bounds.getEast();

    setProgress(30);
    const query = `
    [out:json][timeout:25];
    nwr["tourism"="hotel"](${south},${west},${north},${east});
    out geom;
  `;

    setProgress(50);
    const elements = await fetchOverpassData(query);
    setProgress(70);
    return renderMarkers(map, elements, 'Hotels');
  }

  async function fetchAndRenderRestaurants(map: L.Map): Promise<L.Marker[]> {
    const bounds = map.getBounds();
    const south = bounds.getSouth();
    const west = bounds.getWest();
    const north = bounds.getNorth();
    const east = bounds.getEast();

    setProgress(30);
    const query = `
      [out:json][timeout:25];
      nwr["amenity"="restaurant"](${south},${west},${north},${east});
      out geom;
    `;

    setProgress(50);
    const elements = await fetchOverpassData(query);
    setProgress(70);
    return renderMarkers(map, elements, 'Restaurants');
  }

  async function fetchAndRenderShops(map: L.Map): Promise<L.Marker[]> {
    const bounds = map.getBounds();
    const south = bounds.getSouth();
    const west = bounds.getWest();
    const north = bounds.getNorth();
    const east = bounds.getEast();

    setProgress(30);
    const query = `
      [out:json][timeout:25];
      (
        nwr["shop"="supermarket"](${south},${west},${north},${east});
        nwr["shop"="mall"](${south},${west},${north},${east});
        nwr["shop"="department_store"](${south},${west},${north},${east});
        nwr["amenity"="marketplace"](${south},${west},${north},${east});
      );
      out geom;
    `;

    setProgress(50);
    const elements = await fetchOverpassData(query);
    setProgress(70);
    return renderMarkers(map, elements, 'Shops');
  }

  const fetchAndRender = async (clearExisting = true) => {
    if (!mapRef.current) return;

    setCount(count + 1);

    if (clearExisting) {
      clearMarkers();
    }

    if (!activeLabel) {
      setLoading(null);
      return;
    }

    setLoading(activeLabel);
    setProgress(10);

    try {
      switch (activeLabel) {
        case 'Hotels':
          await fetchAndRenderHotels(mapRef.current);
          break;
        case 'Restaurants':
          await fetchAndRenderRestaurants(mapRef.current);
          break;
        case 'Shops':
          await fetchAndRenderShops(mapRef.current);
          break;
      }
      setProgress(100);
      // Small delay to show 100% before hiding
      setTimeout(() => {
        setLoading(null);
        setProgress(0);
      }, 300);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(null);
      setProgress(0);
    }
  };

  // Handle initial fetch when activeLabel changes
  useEffect(() => {
    fetchAndRender().then();
  }, [activeLabel]);

  // Handle map move events
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const onMoveStart = () => {
      // Clear any pending move timeout
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
        moveTimeoutRef.current = null;
      }
    };

    const onMoveEnd = () => {
      if (!activeLabel) return;

      const newBounds = map.getBounds();

      // Remove markers that are now out of bounds
      removeOutOfBoundsMarkers(newBounds);

      // Debounce the fetch to avoid too many requests
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }

      moveTimeoutRef.current = setTimeout(() => {
        fetchAndRender(false).then(); // Don't clear existing markers, just add new ones
      }, 500); // 500ms debounce
    };

    map.on('movestart', onMoveStart);
    map.on('moveend', onMoveEnd);

    // Cleanup
    return () => {
      map.off('movestart', onMoveStart);
      map.off('moveend', onMoveEnd);
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
    };
  }, [activeLabel]);

  return (
    <div
      style={{
        position: 'absolute',
        top: '18px',
        left: '80px',
        display: 'flex',
        gap: '8px',
        zIndex: 1000,
      }}
    >
      <Pill
        label="Restaurants"
        onClick={() => handleClick('Restaurants')}
        active={activeLabel === 'Restaurants'}
        iconName="material-symbols:restaurant-rounded"
      />
      <Pill
        label="Hotels"
        onClick={() => handleClick('Hotels')}
        active={activeLabel === 'Hotels'}
        iconName="material-symbols:hotel"
      />
      <Pill
        label="Shops"
        onClick={() => handleClick('Shops')}
        active={activeLabel === 'Shops'}
        iconName="material-symbols:shopping-cart"
      />

      {/* Progress Pill */}
      {loading && (
        <ProgressPill
          label={`Loading ${loading}...`}
        />
      )}
    </div>
  );
}