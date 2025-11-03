// Dans votre composant parent

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
    sendMessage,
    loadMore,
    editMessage,
    deleteMessage,
    loadMessageContext,
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
    <div className="flex h-full">
      {/* User name */}
      <div className="p-4 border-b bg-white">
        <h3 className="text-lg font-semibold">Bonjour, {userName || 'Utilisateur'}</h3>
      </div>
      {/* Conversation Selector */}
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
          onEditMessage={editMessage}
          onDeleteMessage={deleteMessage}
          onReactToMessage={handleReactToMessage}
          onLoadMessageContext={loadMessageContext}
        />
      </div>
    </div>
  );
}
