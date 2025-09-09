import React, { useState } from 'react';
import { ConversationSelectorProps } from './conversation-selector.interface';
import { ConversationItem } from './conversation-item';
import { useConversationSelector } from './conversation-selector.logic';

export function ConversationSelector({
  selectedConversationId,
  onConversationSelect,
  className = '',
  style,
  maxHeight = '400px',
  showSearch = true,
  showCreateButton = false,
  onCreateConversation,
}: ConversationSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const { conversations, loading, error, hasMore } = useConversationSelector({
    selectedConversationId,
    onConversationSelect,
  });

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
              onClick={onCreateConversation}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
      </div>

      {/* Lista de conversations */}
      <div className="overflow-y-auto" style={{ maxHeight }}>
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {searchTerm ? 'Aucune conversation trouvée' : 'Aucune conversation disponible'}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredConversations.map(conversation => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isSelected={selectedConversationId === conversation.id}
                onClick={() => onConversationSelect(conversation.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer avec informations */}
      <div className="p-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 text-center">
        {filteredConversations.length} conversation{filteredConversations.length > 1 ? 's' : ''}
        {searchTerm && ` trouvée${filteredConversations.length > 1 ? 's' : ''}`}
      </div>
    </div>
  );
}
