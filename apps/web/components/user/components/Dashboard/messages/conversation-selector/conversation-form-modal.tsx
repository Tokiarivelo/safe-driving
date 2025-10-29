import React, { useState, useEffect } from 'react';
import { useUsersQuery } from '@/graphql/generated/graphql';

interface ConversationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  title: string;
  initialData?: any;
}

export function ConversationFormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  initialData,
}: ConversationFormModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'DIRECT' as 'DIRECT' | 'GROUP' | 'RIDE_LINKED',
    participantIds: [] as string[],
    selectedUserId: '', // Pour le select des utilisateurs
  });

  // Charger la liste des utilisateurs
  const { data: usersData, loading: usersLoading } = useUsersQuery({
    variables: {
      take: 100, // Limiter à 100 utilisateurs pour performance
      orderBy: [{ firstName: 'asc' as any }],
    },
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        type: initialData.type || 'DIRECT',
        participantIds: initialData.participants?.map((p: any) => p.userId) || [],
        selectedUserId: '',
      });
    } else {
      setFormData({
        title: '',
        type: 'DIRECT',
        participantIds: [],
        selectedUserId: '',
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Le titre est requis');
      return;
    }

    if (formData.type !== 'DIRECT' && formData.participantIds.length === 0) {
      alert('Ajoutez au moins un participant');
      return;
    }

    const submitData = {
      title: formData.title.trim(),
      type: formData.type,
      participantIds: formData.participantIds,
    };

    onSubmit(submitData);
  };

  const addParticipant = () => {
    if (formData.selectedUserId && !formData.participantIds.includes(formData.selectedUserId)) {
      setFormData(prev => ({
        ...prev,
        participantIds: [...prev.participantIds, prev.selectedUserId],
        selectedUserId: '',
      }));
    }
  };

  const removeParticipant = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      participantIds: prev.participantIds.filter(id => id !== userId),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
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

          {/* Participants (seulement si ce n'est pas DIRECT ou en création) */}
          {(formData.type !== 'DIRECT' || !initialData) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Participants</label>

              {/* Ajouter un participant */}
              <div className="flex space-x-2 mb-2">
                <select
                  value={formData.selectedUserId}
                  onChange={e => setFormData(prev => ({ ...prev, selectedUserId: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={usersLoading}
                >
                  <option value="">
                    {usersLoading ? 'Chargement...' : 'Sélectionner un utilisateur'}
                  </option>
                  {usersData?.users
                    ?.filter(user => !formData.participantIds.includes(user.id))
                    ?.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName} ({user.email})
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={addParticipant}
                  disabled={!formData.selectedUserId || usersLoading}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Ajouter
                </button>
              </div>

              {/* Liste des participants */}
              {formData.participantIds.length > 0 && (
                <div className="space-y-2">
                  {formData.participantIds.map(userId => {
                    const user = usersData?.users?.find(u => u.id === userId);
                    return (
                      <div
                        key={userId}
                        className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded"
                      >
                        <span className="text-sm text-gray-700">
                          {user ? (
                            <>
                              {user.firstName} {user.lastName}
                              <span className="text-gray-500 ml-2">({user.email})</span>
                            </>
                          ) : (
                            userId
                          )}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeParticipant(userId)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
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
}
