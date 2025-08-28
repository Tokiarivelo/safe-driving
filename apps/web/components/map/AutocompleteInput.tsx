import React, { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Location } from '@/components/map/Location';

export const AutocompleteInput = ({
  location,
  updateLocation,
  onDelete,
  canDelete,
}: {
  location: Location;
  updateLocation: (id: string, value: string, lat?: number, lon?: number) => void;
  onDelete: (id: string) => void;
  canDelete: boolean;
}) => {
  const [query, setQuery] = useState(location.value);
  const [results, setResults] = useState<{ display_name: string; lat: string; lon: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(location.value);
  }, [location.value]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    if (query === 'My Location') return;
    if (location.source === 'marker') return;

    const controller = new AbortController();
    setLoading(true);

    fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=MG&addressdetails=1`,
      { signal: controller.signal },
    )
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [query]);

  const handleInputChange = (value: string, lat?: number, lon?: number) => {
    setQuery(value);
    updateLocation(location.id, value, lat, lon);
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const inputWrapperStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '8px 12px',
    backgroundColor: 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(8px)',
    position: 'relative',
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#333',
    fontSize: '14px',
  };

  const deleteButtonStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginTop: '4px',
    padding: '4px', // petit padding autour
    zIndex: 50,
    listStyle: 'none',
  };

  const scrollWrapperStyle: React.CSSProperties = {
    maxHeight: '192px',
    overflowY: 'auto',
    borderRadius: '8px', // garder les coins arrondis
  };

  const listItemStyle: React.CSSProperties = {
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '14px',
    borderRadius: '16px', // pill shape
    backgroundColor: 'rgba(255,255,255,0.0)',
    transition: 'background-color 0.2s',
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <div style={inputWrapperStyle}>
        <Search style={{ marginRight: '8px', color: '#888' }} size={18} />
        <input
          type="text"
          placeholder={location.placeholder}
          value={query}
          onChange={e => handleInputChange(e.target.value)}
          autoComplete="off"
          style={inputStyle}
        />
        {loading && (
          <div style={{ position: 'absolute', right: '12px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                border: '2px solid #ccc',
                borderTop: '2px solid #333',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}
            />
          </div>
        )}
      </div>

      {canDelete && (
        <button onClick={() => onDelete(location.id)} style={deleteButtonStyle}>
          <X size={16} color="#888" />
        </button>
      )}

      {results.length > 0 && (
        <ul style={dropdownStyle}>
          <div style={scrollWrapperStyle}>
            {results.map((res, i) => (
              <li
                key={i}
                onClick={() => {
                  handleInputChange(res.display_name, parseFloat(res.lat), parseFloat(res.lon));
                  setResults([]);
                }}
                style={listItemStyle}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.0)')}
              >
                {res.display_name}
              </li>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
};
