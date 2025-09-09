// Dans votre composant parent

import { useMessages } from '@/lib/message/useMessages';
import { useSocket } from '@/lib/socket.io/useSocket';
import { Chat } from '../ui/chat/chat';
import { ConversationSelectorWithCRUD } from '../ui/conversation-selector';
import { useConversations } from '@/lib/conversation/useConversations';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Conversation } from '@/graphql/generated/graphql';

interface ChatContainerProps {
  conversationId?: string;
  rideId?: string;
  showConversationSelector?: boolean;
  onConversationChange?: (conversationId: string) => void;
}

export function ChatContainer({
  conversationId,
  rideId,
  showConversationSelector = false,
  onConversationChange,
}: ChatContainerProps) {
  const session = getSession();
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [selectedConversationId, setSelectedConversationId] = useState(conversationId);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | undefined>();

  const { getConversationById } = useConversations();

  useEffect(() => {
    session.then(data => {
      if (data?.user?.id) {
        setCurrentUserId(data?.user?.id);
      }
    });
  }, [session]);

  useEffect(() => {
    setSelectedConversationId(conversationId);
    // Si on a un conversationId mais pas d'objet conversation, on le récupère
    if (conversationId && !selectedConversation) {
      const conversation = getConversationById(conversationId);
      setSelectedConversation(conversation as Conversation);
    }
  }, [conversationId, getConversationById, selectedConversation]);

  const handleConversationSelect = (newConversationId: string, conversation?: Conversation) => {
    setSelectedConversationId(newConversationId);
    setSelectedConversation(conversation);
    onConversationChange?.(newConversationId);
  };

  const { isConnected } = useSocket({ conversationId: selectedConversationId, rideId });

  console.log('isConnected :>> ', isConnected);

  const {
    messages,
    loading,
    error,
    hasMore,
    sendMessage,
    loadMore,
    scrollToBottom,
    editMessage, // Si vous l'implémentez
    deleteMessage, // Si vous l'implémentez
  } = useMessages({ conversationId: selectedConversationId, rideId });

  if (showConversationSelector) {
    return (
      <div className="flex h-full">
        <div className="w-80 border-r border-gray-200 bg-gray-50">
          <ConversationSelectorWithCRUD
            selectedConversationId={selectedConversationId}
            onConversationSelect={handleConversationSelect}
            className="h-full"
            showSearch={true}
            showCreateButton={true}
            onConversationChange={conversations => {
              console.log('Conversations updated:', conversations);
            }}
          />
        </div>
        <div className="flex-1">
          <Chat
            conversation={selectedConversation}
            currentUserId={currentUserId}
            messages={messages}
            loading={loading}
            error={error}
            hasMore={hasMore}
            connected={isConnected}
            onSendMessage={sendMessage}
            onLoadMore={loadMore}
            onScrollToBottom={scrollToBottom}
            onEditMessage={editMessage} // Optionnel
            onDeleteMessage={deleteMessage} // Optionnel
          />
        </div>
      </div>
    );
  }

  return (
    <Chat
      conversation={selectedConversation}
      currentUserId={currentUserId}
      messages={messages}
      loading={loading}
      error={error}
      hasMore={hasMore}
      connected={isConnected}
      onSendMessage={sendMessage}
      onLoadMore={loadMore}
      onScrollToBottom={scrollToBottom}
      onEditMessage={editMessage} // Optionnel
      onDeleteMessage={deleteMessage} // Optionnel
    />
  );
}
