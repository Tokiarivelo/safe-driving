// Dans votre composant parent

'use client';

import { useMessages } from '@/lib/message/useMessages';
import { Chat } from '../ui/chat/chat';
import { ConversationSelectorWithCRUD } from '../ui/conversation-selector';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useChatSocket } from '@/lib/socket.io/useChatSocket';
import { UserConversation } from '@/graphql/generated/graphql';
import { useReactions } from '@/hooks/useReactions';

interface ChatContainerProps {
  conversationId?: string;
  rideId?: string;
  onConversationChange?: (conversationId: string) => void;
}

export function ChatContainer({
  conversationId,
  rideId,
  onConversationChange,
}: ChatContainerProps) {
  const session = getSession();
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [selectedConversationId, setSelectedConversationId] = useState(conversationId);
  const [selectedConversation, setSelectedConversation] = useState<UserConversation | undefined>();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    session.then(data => {
      if (data?.user?.id) {
        setCurrentUserId(data?.user?.id);
        setUserName(`${data?.user?.firstName || ''} ${data?.user?.lastName || ''}`.trim());
      }
    });
  }, [session]);

  const handleConversationSelect = (newConversationId: string, conversation?: UserConversation) => {
    setSelectedConversationId(newConversationId);
    setSelectedConversation(conversation);
    onConversationChange?.(newConversationId);
  };

  const { isConnected } = useChatSocket({ conversationId: selectedConversationId, rideId });

  const {
    messages,
    loading,
    error,
    hasMore,
    hasMoreAfter,
    sendMessage,
    loadMore,
    loadMoreAfter,
    editMessage,
    deleteMessage,
    loadMessagesAround,
  } = useMessages({ conversationId: selectedConversationId, rideId });

  const { addReaction, removeReaction } = useReactions();

  const handleReactToMessage = async (messageId: string, emoji: string) => {
    // remove if already reacted with the same emoji
    const hasReacted = messages.some(msg => {
      return (
        msg.id === messageId &&
        msg.reactions?.some(r => r.user.id === currentUserId && r.type === emoji)
      );
    });

    if (hasReacted) {
      await removeReaction(messageId, emoji);
    } else {
      await addReaction(messageId, emoji);
    }
  };

  return (
    <div className="flex h-full bg-white">
      {/* Left Sidebar - Conversation List */}
      <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
        {/* User greeting header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <h3 className="text-lg font-semibold text-gray-900">
            Bonjour, {userName || 'Utilisateur'}
          </h3>
        </div>
        
        {/* Conversation Selector */}
        <div className="flex-1 overflow-hidden">
          <ConversationSelectorWithCRUD
            selectedConversationId={selectedConversationId}
            onConversationSelect={handleConversationSelect}
            className="h-full border-0 shadow-none"
            showSearch={true}
            showCreateButton={true}
            onConversationChange={conversations => {
              console.log('Conversations updated:', conversations);
            }}
          />
        </div>
      </div>

      {/* Center - Chat Messages */}
      <div className="flex-1 flex flex-col min-w-0">
        <Chat
          conversation={selectedConversation}
          currentUserId={currentUserId}
          messages={messages}
          loading={loading}
          error={error}
          hasMore={hasMore}
          hasMoreAfter={hasMoreAfter}
          connected={isConnected}
          onSendMessage={sendMessage}
          onLoadMore={loadMore}
          onLoadMoreAfter={loadMoreAfter}
          onEditMessage={editMessage}
          onDeleteMessage={deleteMessage}
          onReactToMessage={handleReactToMessage}
          onLoadMessagesAround={loadMessagesAround}
        />
      </div>

      {/* Right Sidebar - Conversation/User Details */}
      {selectedConversation && (
        <div className="w-80 border-l border-gray-200 flex flex-col bg-white overflow-y-auto">
          {/* User/Conversation Info Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gray-300 mb-3 overflow-hidden">
                {selectedConversation.participants?.[0]?.user?.avatar?.url ? (
                  <img
                    src={selectedConversation.participants[0].user.avatar.url}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl text-gray-600">
                    {selectedConversation.participants?.[0]?.user?.firstName?.[0] || '?'}
                  </div>
                )}
              </div>
              
              {/* Name */}
              <h3 className="text-lg font-semibold text-gray-900 text-center">
                {selectedConversation.title ||
                  `${selectedConversation.participants?.[0]?.user?.firstName || ''} ${
                    selectedConversation.participants?.[0]?.user?.lastName || ''
                  }`.trim() ||
                  'Conversation'}
              </h3>

              {/* Additional Info (e.g., rating, phone) */}
              {selectedConversation.participants?.[0]?.user?.phone && (
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>{selectedConversation.participants[0].user.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Search in messages */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
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
              <input
                type="text"
                placeholder="Rechercher dans les messages"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Files Section */}
          <div className="border-b border-gray-200">
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                <span className="font-medium text-gray-900">Fichiers</span>
                <span className="text-xs bg-red-500 text-white rounded-full px-2 py-0.5">
                  {messages.filter(m => m.attachments && m.attachments.length > 0).length}
                </span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Links Section */}
          <div className="border-b border-gray-200">
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                <span className="font-medium text-gray-900">Liens</span>
                <span className="text-xs bg-red-500 text-white rounded-full px-2 py-0.5">
                  {
                    messages.filter(
                      m =>
                        m.attachments &&
                        m.attachments.some(a => a.type === 'LINK' || a.linkTitle),
                    ).length
                  }
                </span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Additional sections can be added here */}
        </div>
      )}
    </div>
  );
}
