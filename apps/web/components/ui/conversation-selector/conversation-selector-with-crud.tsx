import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ConversationSelectorProps, ConversationFormData } from './types';
import { ConversationSearchBar } from './conversation-search-bar';
import { ConversationList } from './conversation-list';
import { ConversationFormModal } from './conversation-form-modal';
import { useConversations } from '@/lib/conversation/useConversations';
import { useConversationSearch } from './useConversationSearch';
import {
  CreateConversationInput,
  UpdateConversationInput,
  UserConversation,
  ConversationType,
} from '@/graphql/generated/graphql';

export function ConversationSelectorWithCRUD({
  selectedConversationId,
  onConversationSelect,
  className = '',
  style,
  maxHeight = '400px',
  showSearch = true,
  showCreateButton = true,
  onConversationChange,
}: ConversationSelectorProps & {
  onConversationChange?: (conversations: UserConversation[]) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingConversation, setEditingConversation] = useState<UserConversation | null>(null);

  const {
    conversations,
    loading,
    error,
    createConversation,
    updateConversation,
    deleteConversation,
  } = useConversations();

  // Use custom search hook
  const { searchResults, isSearching } = useConversationSearch(searchTerm, {
    enabled: searchTerm.trim().length >= 2,
  });

  // Determine which conversations to display
  const displayConversations = searchTerm.trim().length >= 2 ? searchResults : conversations;

  const isLoading = searchTerm.trim().length >= 2 ? isSearching : loading;

  const handleCreateConversation = async (data: ConversationFormData) => {
    try {
      const input: CreateConversationInput = {
        title: data.title,
        type: data.type as unknown as ConversationType,
        participantIds: data.participantIds,
      };
      const newConversation = await createConversation(input);
      setShowCreateModal(false);
      if (newConversation) {
        onConversationSelect(newConversation.id, newConversation as UserConversation);
      }
      onConversationChange?.(conversations);
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    }
  };

  const handleUpdateConversation = async (data: ConversationFormData) => {
    if (!editingConversation) return;

    try {
      const input: UpdateConversationInput = {
        title: data.title,
      };
      await updateConversation(editingConversation.id, input);
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
      className={`bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col ${className}`}
      style={style}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
          {showCreateButton && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              disabled={isLoading}
            >
              <Plus className="w-4 h-4" />
              Nouvelle
            </button>
          )}
        </div>

        {showSearch && (
          <ConversationSearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            isLoading={isLoading}
          />
        )}

        {error && (
          <div className="mt-2 p-2 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Conversation list */}
      <ConversationList
        conversations={displayConversations}
        selectedConversationId={selectedConversationId}
        onConversationSelect={onConversationSelect}
        onEdit={setEditingConversation}
        onDelete={handleDeleteConversation}
        isLoading={isLoading}
        searchTerm={searchTerm}
        maxHeight={maxHeight}
      />

      {/* Footer avec informations */}
      <div className="p-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 text-center">
        {displayConversations.length} conversation{displayConversations.length > 1 ? 's' : ''}
        {searchTerm && ` trouvée${displayConversations.length > 1 ? 's' : ''}`}
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
