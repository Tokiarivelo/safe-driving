import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { ConversationItem } from './conversation-item';
import { ConversationListProps } from './types';

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversationId,
  isLoading,
  searchTerm,
  maxHeight = '400px',
  onConversationSelect,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
        <div className="mt-2">Chargement...</div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        {searchTerm ? 'Aucune conversation trouvée' : 'Aucune conversation disponible'}
      </div>
    );
  }

  return (
    <div className="overflow-y-auto" style={{ maxHeight }}>
      {conversations.map(conversation => (
        <div key={conversation.id} className="relative group">
          <ConversationItem
            conversation={conversation}
            isSelected={selectedConversationId === conversation.id}
            onClick={() => onConversationSelect(conversation.id, conversation)}
          />

          {/* Actions menu */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex space-x-1">
              <button
                onClick={e => {
                  e.stopPropagation();
                  onEdit(conversation);
                }}
                className="p-1 text-gray-400 hover:text-blue-600 rounded"
                title="Modifier"
                type="button"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                  onDelete(conversation.id);
                }}
                className="p-1 text-gray-400 hover:text-red-600 rounded"
                title="Supprimer"
                type="button"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
