'use client';

import { useState, useEffect, useRef } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ display_name: string; lat: string; lon: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch suggestions
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`, {
      signal: controller.signal,
    })
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [query]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: '10px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '10px',
        paddingRight: '10px',
        zIndex: 1000,
      }}
    >
      <div style={{ width: '100%', position: 'relative' }}>
        <input
          type="text"
          placeholder="Search place..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoComplete="off"
          style={{
            padding: '6px',
            width: '100%',
            borderRadius: '8px',
            border: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(8px)',
            outline: 'none',
          }}
        />
        {loading && (
          <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
            <div
              className="loader"
              style={{
                border: '2px solid #ccc',
                borderTop: '2px solid #333',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                animation: 'spin 1s linear infinite',
              }}
            />
          </div>
        )}
        {results.length > 0 && (
          <ul
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(255, 255, 255, 0.4)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #ccc',
              borderRadius: '8px',
              marginTop: '4px',
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: 2000,
              listStyle: 'none',
              padding: '0 0 0 0',
            }}
          >
            {results.map((res, i) => (
              <li
                key={i}
                onClick={() => {
                  setQuery(res.display_name);
                  setResults([]);
                }}
                style={{
                  padding: '6px 8px',
                  cursor: 'pointer',
                  borderBottom: i !== results.length - 1 ? '1px solid #eee' : 'none',
                }}
              >
                {res.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        /* Webkit browsers */
        ul::-webkit-scrollbar {
          width: 8px;
        }
        ul::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          border-radius: 8px;
        }
        ul::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
        }
        ul::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
