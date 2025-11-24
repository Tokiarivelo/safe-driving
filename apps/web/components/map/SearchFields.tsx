'use client';

import React from 'react';
import { ArrowUpDown, Plus, Trash2 } from 'lucide-react';
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Location } from '@/components/map/Location';
import { SortableLocationItem } from '@/components/map/SortableLocationItem';

export default function SearchFields({
  locations,
  distance,
  duration,
  cleanLocations,
  reverseLocations,
  updateLocation,
  deleteLocation,
  addLocation,
  reorderLocations,
}: {
  locations: Location[];
  distance: string;
  duration: string;
  cleanLocations: () => void;
  reverseLocations: () => void;
  updateLocation: (id: string, value: string, lat?: number, lon?: number) => void;
  deleteLocation: (id: string) => void;
  addLocation: () => void;
  reorderLocations: (oldIndex: number, newIndex: number) => void;
}) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = locations.findIndex(loc => loc.id === active.id);
      const newIndex = locations.findIndex(loc => loc.id === over.id);
      reorderLocations(oldIndex, newIndex);
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
  };

  const iconButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(8px)',
    color: '#3b82f6',
    cursor: 'pointer',
    padding: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  return (
    <div style={containerStyle}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={locations.map(l => l.id)} strategy={verticalListSortingStrategy}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {locations.map((location, index) => (
              <div key={location.id}>
                <SortableLocationItem
                  location={location}
                  index={index}
                  totalCount={locations.length}
                  updateLocation={updateLocation}
                  onDelete={deleteLocation}
                />
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div
        style={{
          display: 'flex',
          justifyContent: 'right',
          gap: '20px',
          width: '100%',
        }}
      >
        <p>
          <strong>Distance:</strong> {distance} km
        </p>
        <p>
          <strong>Duration:</strong> {duration} min
        </p>
        <button onClick={addLocation} style={iconButtonStyle} title="Add Stop">
          <Plus size={18} />
        </button>

        <button onClick={reverseLocations} style={iconButtonStyle} title="Reverse Locations">
          <ArrowUpDown size={18} />
        </button>

        <button onClick={cleanLocations} style={iconButtonStyle} title="Clean Locations">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
