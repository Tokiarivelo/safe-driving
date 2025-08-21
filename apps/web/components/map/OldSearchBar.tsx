'use client'

import { useState } from 'react'
import { GeoJSON } from 'react-leaflet';

type SearchResult = {
  display_name: string
  lat: string
  lon: string
  geojson?: GeoJSON.GeoJsonObject
}

const OldSearchBar = ({ onSelect }: { onSelect: (lat: number, lon: number, geojson?: GeoJSON.GeoJsonObject) => void }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])

  const handleSearch = async () => {
    if (!query.trim()) return

    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&polygon_geojson=1&q=${encodeURIComponent(query)}`)
    const data = await res.json()
    setResults(data)
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1000,
        background: 'white',
        padding: '8px',
        borderRadius: '8px',
      }}
    >
      <input
        type="text"
        placeholder="Search place..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSearch()}
        style={{ padding: '6px', width: '200px' }}
      />
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {results.map((r, i) => (
          <li
            key={i}
            style={{ cursor: 'pointer', padding: '4px 0', borderBottom: '1px solid #ccc' }}
            onClick={() => {
              console.log(r);
              onSelect(parseFloat(r.lat), parseFloat(r.lon), r.geojson);
              setResults([]);
              setQuery(r.display_name);
            }}
          >
            {r.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OldSearchBar
