import React from 'react';
import { ConversationItem } from './conversation-item';
import { ConversationListProps } from './types';

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversationId,
  isLoading,
  searchTerm,
  onConversationSelect,
}) => {
  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500 mx-auto"></div>
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
    <div className="overflow-y-auto flex-1">
      {conversations.map(conversation => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isSelected={selectedConversationId === conversation.id}
          onClick={() => onConversationSelect(conversation.id, conversation)}
        />
      ))}
    </div>
  );
};
