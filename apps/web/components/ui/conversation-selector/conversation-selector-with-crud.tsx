import React, { useState, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Plus } from 'lucide-react';
import { ConversationSelectorProps, ConversationFormData } from './types';
import { ConversationSearchBar } from './conversation-search-bar';
import { ConversationList } from './conversation-list';
import { ConversationFormModal } from './conversation-form-modal';
import { useConversations } from '@/lib/conversation/useConversations';
import { useConversationSearch } from './useConversationSearch';
import { useSocketConnection } from '@/lib/socket.io/SocketProvider';
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
  currentUserId: propCurrentUserId,
  onConversationChange,
}: ConversationSelectorProps & {
  onConversationChange?: (conversations: UserConversation[]) => void;
}) {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingConversation, setEditingConversation] = useState<UserConversation | null>(null);

  // Use propCurrentUserId if provided, otherwise get from session
  const currentUserId = propCurrentUserId || session?.user?.id;

  // Get socket connection for real-time notifications
  const { socket, isConnected } = useSocketConnection();

  const {
    conversations,
    loading,
    error,
    createConversation,
    updateConversation,
    deleteConversation,
    refetch,
  } = useConversations();

  // Use custom search hook
  const { searchResults, isSearching } = useConversationSearch(searchTerm, {
    enabled: searchTerm.trim().length >= 2,
  });

  // Determine which conversations to display
  const displayConversations = searchTerm.trim().length >= 2 ? searchResults : conversations;

  const isLoading = searchTerm.trim().length >= 2 ? isSearching : loading;

  // Handle new message event - refetch to update unread counts
  const handleNewMessage = useCallback(() => {
    refetch?.();
  }, [refetch]);

  // Handle conversation update events
  const handleConversationUpdate = useCallback(() => {
    refetch?.();
  }, [refetch]);

  // Subscribe to Socket.IO events for real-time notifications
  useEffect(() => {
    if (!socket || !isConnected) return;

    // Subscribe to new message events for notification updates
    socket.on('newMessage', handleNewMessage);

    // Subscribe to conversation update events
    socket.on('conversationUpdate', handleConversationUpdate);
    socket.on('conversationUpdated', handleConversationUpdate);

    // Cleanup subscriptions on unmount
    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('conversationUpdate', handleConversationUpdate);
      socket.off('conversationUpdated', handleConversationUpdate);
    };
  }, [socket, isConnected, handleNewMessage, handleConversationUpdate]);

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

  /**
   * Handle loading more conversations (pagination).
   * TODO: Implement cursor-based pagination using the useConversations hook.
   * The GraphQL query supports limit/offset or cursor-based pagination.
   * This will need to:
   * 1. Track the current page/cursor state
   * 2. Call the refetch or fetchMore function with new pagination params
   * 3. Append results to the existing conversations list
   */
  const handleLoadMore = () => {
    // Placeholder for pagination implementation
    // This button is shown to match the design mockup
    console.log('Load more conversations - pagination to be implemented');
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col ${className}`}
      style={style}
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <h2 className="text-xl font-bold text-gray-900">Messages</h2>
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gray-200"></div>
          </div>
          {showCreateButton && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-1 px-3 py-1 text-sm conversation-gradient-bg text-white rounded-md hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              <Plus className="w-4 h-4" />
              Nouvelle
            </button>
          )}
        </div>

        {showSearch && (
          <div className="mt-4">
            <ConversationSearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              isLoading={isLoading}
            />
          </div>
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
        currentUserId={currentUserId}
      />

      {/* Footer with Load More button */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLoadMore}
          className="w-full py-2.5 conversation-gradient-bg text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
        >
          Charger plus
        </button>
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
