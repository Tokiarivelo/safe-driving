import { Location } from '@/components/map/Location';
import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Crosshair, GripVertical, MapPin } from 'lucide-react';
import { AutocompleteInput } from '@/components/map/AutocompleteInput';

export const SortableLocationItem = ({
  location,
  index,
  totalCount,
  updateLocation,
  onDelete,
}: {
  location: Location;
  index: number;
  totalCount: number;
  updateLocation: (id: string, value: string, lat?: number, lon?: number) => void;
  onDelete: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: location.id,
  });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    position: 'relative',
  };

  const isFirst = index === 0;
  const isLast = index === totalCount - 1;
  const canDelete = totalCount > 2;

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div
        style={{ width: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {isFirst ? (
          <Crosshair color="#3b82f6" size={20} />
        ) : isLast ? (
          <MapPin color="#ef4444" size={20} />
        ) : (
          <button
            {...listeners}
            style={{ cursor: 'grab', border: 'none', background: 'transparent', color: '#888' }}
          >
            <GripVertical size={18} />
          </button>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <AutocompleteInput
          location={location}
          updateLocation={updateLocation}
          onDelete={onDelete}
          canDelete={canDelete}
        />
      </div>
    </div>
  );
};
