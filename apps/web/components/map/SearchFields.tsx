'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Location } from '@/components/map/Location';
import { SortableLocationItem } from '@/components/map/SortableLocationItem';

export default function SearchFields({
  locations,
  updateLocation,
  deleteLocation,
  addLocation,
  reorderLocations,
}: {
  locations: Location[];
  updateLocation: (id: string, value: string, lat?: number, lon?: number) => void;
  deleteLocation: (id: string) => void;
  addLocation: () => void;
  reorderLocations: (oldIndex: number, newIndex: number) => void;
}) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
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
  const addButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#3b82f6',
    cursor: 'pointer',
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

      <div style={{ marginLeft: '32px' }}>
        <button onClick={addLocation} style={addButtonStyle}>
          <Plus size={16} />
          Add Stop
        </button>
      </div>
    </div>
  );
}
