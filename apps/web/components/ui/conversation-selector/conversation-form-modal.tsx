import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ConversationFormModalProps, ConversationFormData } from './types';
import { UserSelector } from './user-selector';

export const ConversationFormModal: React.FC<ConversationFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  initialData,
}) => {
  const [formData, setFormData] = useState<ConversationFormData>({
    title: '',
    type: 'DIRECT',
    participantIds: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        type: (initialData.type as 'DIRECT' | 'GROUP' | 'RIDE_LINKED') || 'DIRECT',
        participantIds:
          initialData.participants?.map(p => p.userId).filter((id): id is string => Boolean(id)) ||
          [],
      });
    } else {
      setFormData({
        title: '',
        type: 'DIRECT',
        participantIds: [],
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Le titre est requis');
      return;
    }

    if (formData.type !== 'DIRECT' && formData.participantIds.length === 0) {
      alert('Ajoutez au moins un participant');
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      type: formData.type,
      participantIds: formData.participantIds,
    });
  };

  const handleAddUser = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      participantIds: [...prev.participantIds, userId],
    }));
  };

  const handleRemoveUser = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      participantIds: prev.participantIds.filter(id => id !== userId),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" type="button">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre de la conversation *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez le titre..."
              required
            />
          </div>

          {/* Type de conversation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type de conversation
            </label>
            <select
              value={formData.type}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  type: e.target.value as 'DIRECT' | 'GROUP' | 'RIDE_LINKED',
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="DIRECT">Conversation directe</option>
              <option value="GROUP">Groupe</option>
              <option value="RIDE_LINKED">Liée à un trajet</option>
            </select>
          </div>

          {/* Participants */}
          {(formData.type !== 'DIRECT' || !initialData) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Participants</label>
              <UserSelector
                selectedUserIds={formData.participantIds}
                onAddUser={handleAddUser}
                onRemoveUser={handleRemoveUser}
              />
            </div>
          )}

          {/* Boutons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {initialData ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
