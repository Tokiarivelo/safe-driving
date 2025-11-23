// Dans votre composant parent

'use client';

import { useMessages } from '@/lib/message/useMessages';
import { usePathname } from 'next/navigation';
import { Chat } from '../ui/chat/chat';
import { ConversationSelectorWithCRUD } from '../ui/conversation-selector';
import { ConversationDetailsSidebar } from '../ui/chat/conversation-details-sidebar';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useChatSocket } from '@/lib/socket.io/useChatSocket';
import { UserConversation } from '@/graphql/generated/graphql';

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

  useEffect(() => {
    session.then(data => {
      if (data?.user?.id) {
        setCurrentUserId(data?.user?.id);
      }
    });
  }, [session]);

  useEffect(() => {
    if (conversationId) {
      setSelectedConversationId(conversationId);
    }
  }, [conversationId]);

  const pathname = usePathname();

  const handleConversationSelect = (newConversationId: string, conversation?: UserConversation) => {
    setSelectedConversationId(newConversationId);
    setSelectedConversation(conversation);
    onConversationChange?.(newConversationId);

    console.log('pathname :>> ', pathname);

    if (pathname) {
      const basePath = pathname.split('/messages')[0];
      console.log('basePath :>> ', basePath);
      if (basePath) {
        window.history.pushState({}, '', `${basePath}/messages/${newConversationId}`);
      }
    }
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

  return (
    <div className="flex h-full bg-white">
      {/* Left Sidebar - Conversation List */}
      <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
        {/* Conversation Selector */}
        <div className="flex-1 overflow-hidden">
          <ConversationSelectorWithCRUD
            selectedConversationId={selectedConversationId}
            onConversationSelect={handleConversationSelect}
            className="h-full border-0 shadow-none"
            showSearch={true}
            showCreateButton={false}
            onConversationChange={conversations => {
              console.log('Conversations updated:', conversations);
            }}
          />
        </div>
      </div>

      {/* Center - Chat Messages */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
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
          onLoadMessagesAround={loadMessagesAround}
        />
      </div>

      {/* Right Sidebar - Conversation/User Details */}
      {selectedConversation && (
        <ConversationDetailsSidebar
          conversation={selectedConversation}
          messages={messages}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
}
