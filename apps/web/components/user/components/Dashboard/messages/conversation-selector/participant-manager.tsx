import React, { useState } from 'react';
import { useConversations } from '@/lib/conversation/useConversations';

interface ParticipantManagerProps {
  conversation: any;
  currentUserId: string;
  onParticipantChange?: () => void;
}

export function ParticipantManager({
  conversation,
  currentUserId,
  onParticipantChange,
}: ParticipantManagerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newParticipantEmail, setNewParticipantEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { addParticipant, removeParticipant } = useConversations();

  const handleAddParticipant = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newParticipantEmail.trim()) return;

    setLoading(true);
    try {
      // Simule la conversion email -> userId
      const userId = `user_${newParticipantEmail.replace('@', '_').replace('.', '_')}`;

      await addParticipant({
        conversationId: conversation.id,
        userId,
      });

      setNewParticipantEmail('');
      setShowAddForm(false);
      onParticipantChange?.();
    } catch (error) {
      console.error("Erreur lors de l'ajout du participant:", error);
      alert("Erreur lors de l'ajout du participant");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveParticipant = async (userId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir retirer ce participant ?')) return;

    setLoading(true);
    try {
      await removeParticipant({
        conversationId: conversation.id,
        userId,
      });

      onParticipantChange?.();
    } catch (error) {
      console.error('Erreur lors de la suppression du participant:', error);
      alert('Erreur lors de la suppression du participant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-red-500 border border-gray-200 rounded-lg p-4">{/*==================================================*/}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Participants ({conversation.participants?.length || 0})
        </h3>

        {conversation.type !== 'DIRECT' && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            Ajouter
          </button>
        )}
      </div>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <form onSubmit={handleAddParticipant} className="mb-4 p-3 bg-gray-50 rounded-md">
          <div className="flex space-x-2">
            <input
              type="email"
              value={newParticipantEmail}
              onChange={e => setNewParticipantEmail(e.target.value)}
              placeholder="Email du nouveau participant..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? '...' : 'Ajouter'}
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      {/* Liste des participants */}
      <div className="space-y-2">
        {conversation.participants?.map((participant: any) => (
          <div
            key={participant.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {participant.user.firstName?.[0] || '?'}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {participant.user.firstName} {participant.user.lastName}
                </div>
                <div className="text-sm text-gray-500">
                  {participant.userId === currentUserId ? '(Vous)' : participant.userId}
                </div>
              </div>
            </div>

            {/* Actions */}
            {conversation.type !== 'DIRECT' && participant.userId !== currentUserId && (
              <button
                onClick={() => handleRemoveParticipant(participant.userId)}
                className="p-1 text-red-600 hover:text-red-800 rounded"
                title="Retirer de la conversation"
                disabled={loading}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}

        {(!conversation.participants || conversation.participants.length === 0) && (
          <div className="text-center text-gray-500 py-4">Aucun participant</div>
        )}
      </div>
    </div>
  );
}
