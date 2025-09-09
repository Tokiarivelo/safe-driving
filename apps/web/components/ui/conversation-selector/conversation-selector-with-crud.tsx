import React, { useState } from 'react';
import { ConversationSelectorProps } from './conversation-selector.interface';
import { ConversationItem } from './conversation-item';
import { ConversationFormModal } from './conversation-form-modal';
import { useConversations } from '@/lib/conversation/useConversations';
import { CreateConversationInput, UpdateConversationInput } from '@/graphql/generated/graphql';

export function ConversationSelectorWithCRUD({
  selectedConversationId,
  onConversationSelect,
  className = '',
  style,
  maxHeight = '400px',
  showSearch = true,
  showCreateButton = true,
  onConversationChange,
}: ConversationSelectorProps & { onConversationChange?: (conversations: any[]) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingConversation, setEditingConversation] = useState<any>(null);

  const {
    conversations,
    loading,
    error,
    createConversation,
    updateConversation,
    deleteConversation,
  } = useConversations();

  // Filtrer les conversations en fonction du terme de recherche
  const filteredConversations = conversations.filter(conversation => {
    if (!searchTerm) return true;

    const titleMatch = conversation.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const participantMatch = conversation.participants?.some(participant => {
      const firstName = participant.user.firstName?.toLowerCase() || '';
      const lastName = participant.user.lastName?.toLowerCase() || '';
      const fullName = `${firstName} ${lastName}`.trim();
      return fullName.includes(searchTerm.toLowerCase());
    });

    return titleMatch || participantMatch;
  });

  const handleCreateConversation = async (data: CreateConversationInput) => {
    try {
      const newConversation = await createConversation(data);
      setShowCreateModal(false);
      if (newConversation) {
        onConversationSelect(newConversation.id, newConversation as any);
      }
      onConversationChange?.(conversations);
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    }
  };

  const handleUpdateConversation = async (data: UpdateConversationInput) => {
    if (!editingConversation) return;

    try {
      await updateConversation(editingConversation.id, {
        title: data.title,
      });
      setEditingConversation(null);
      onConversationChange?.(conversations);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleDeleteConversation = async (conversationId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette conversation ?')) {
      return;
    }

    try {
      await deleteConversation(conversationId);
      if (selectedConversationId === conversationId) {
        onConversationSelect('', undefined);
      }
      onConversationChange?.(conversations);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}
      style={style}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
          {showCreateButton && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              Nouvelle
            </button>
          )}
        </div>

        {showSearch && (
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une conversation..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-2 p-2 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Lista de conversations */}
      <div className="overflow-y-auto" style={{ maxHeight }}>
        {loading ? (
          <div className="p-4 text-center text-gray-500">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
            <div className="mt-2">Chargement...</div>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {searchTerm ? 'Aucune conversation trouvée' : 'Aucune conversation disponible'}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredConversations.map(conversation => (
              <div key={conversation.id} className="relative group">
                <ConversationItem
                  conversation={conversation}
                  isSelected={selectedConversationId === conversation.id}
                  onClick={() => onConversationSelect(conversation.id, conversation as any)}
                />

                {/* Actions menu */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-1">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setEditingConversation(conversation);
                      }}
                      className="p-1 text-gray-400 hover:text-blue-600 rounded"
                      title="Modifier"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleDeleteConversation(conversation.id);
                      }}
                      className="p-1 text-gray-400 hover:text-red-600 rounded"
                      title="Supprimer"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer avec informations */}
      <div className="p-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 text-center">
        {filteredConversations.length} conversation{filteredConversations.length > 1 ? 's' : ''}
        {searchTerm && ` trouvée${filteredConversations.length > 1 ? 's' : ''}`}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <ConversationFormModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateConversation}
          title="Créer une nouvelle conversation"
        />
      )}

      {editingConversation && (
        <ConversationFormModal
          isOpen={!!editingConversation}
          onClose={() => setEditingConversation(null)}
          onSubmit={handleUpdateConversation}
          title="Modifier la conversation"
          initialData={editingConversation}
        />
      )}
    </div>
  );
}
