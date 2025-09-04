// Dans votre composant parent

import { useMessages } from '@/lib/message/useMessages';
import { useSocket } from '@/lib/socket.io/useSocket';
import { Chat } from '../ui/chat/chat';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface ChatContainerProps {
  conversationId?: string;
  rideId?: string;
}

const DEFAULT_CONVERSATION_ID = '68d3169b-9553-42ee-b998-4966bb001dae'; // Remplacez par une valeur par défaut appropriée

export function ChatContainer({
  conversationId = DEFAULT_CONVERSATION_ID,
  rideId,
}: ChatContainerProps) {
  const session = getSession();
  const [currentUserId, setCurrentUserId] = useState<string>('');

  useEffect(() => {
    session.then(data => {
      if (data?.user?.id) {
        setCurrentUserId(data?.user?.id);
      }
    });
  }, [session]);

  const { isConnected } = useSocket({ conversationId, rideId });

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
  } = useMessages({ conversationId, rideId });

  return (
    <Chat
      conversationId={conversationId}
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
