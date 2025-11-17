'use client';
import React from 'react';
import MpMessage from './centre.child';
import Fichier from './right.child';
import Left from './left.child';
import Sidebare from '../sidebare/sidebare';
import styles from './messages.module.css';
import { useMessages } from '@/lib/message/useMessages';
import { Chat } from './chat/chat';
import { ConversationSelectorWithCRUD } from './conversation-selector';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useChatSocket } from '@/lib/socket.io/useChatSocket';
import { UserConversation } from '@/graphql/generated/graphql';
import { useSearchParams } from 'next/navigation';
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
  const [session, setSession] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [selectedConversationId, setSelectedConversationId] = useState<string | undefined>(undefined);
  const [selectedConversation, setSelectedConversation] = useState<UserConversation | undefined>();
  const [userName, setUserName] = useState<string>('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getSession();
        setSession(sessionData);
        if (sessionData?.user?.id) {
          setCurrentUserId(sessionData.user.id);
          setUserName(`${sessionData.user.firstName || ''} ${sessionData.user.lastName || ''}`.trim());
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };
    
    fetchSession();
  }, []);

  useEffect(() => {
    const conversationIdFromUrl = searchParams.get('conversationId');
    if (conversationIdFromUrl) {
      setSelectedConversationId(conversationIdFromUrl);
    } else if (conversationId) {
      setSelectedConversationId(conversationId);
    }
  }, [searchParams, conversationId]);

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
    scrollToBottom,
    editMessage,
    deleteMessage,
  } = useMessages({ conversationId: selectedConversationId, rideId });

  const { addReaction, removeReaction } = useReactions();

  const handleReactToMessage = async (messageId: string, emoji: string) => {
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
    <div className={styles.auth_msg1}>
      <div className={styles.auth_msg2}>
        <Sidebare />
        <div className={styles.auth_msg4}>
          <Left
            selectedConversationId={selectedConversationId}
            onConversationSelect={handleConversationSelect}
          />
        </div>
        <div className={styles.auth_msg11}>
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
            onEditMessage={editMessage}
            onDeleteMessage={deleteMessage}
            onReactToMessage={handleReactToMessage}
          />
        </div>
        <div className={styles.auth_msg12}>
          <Fichier conversation={selectedConversation} currentUserId={currentUserId} messages={messages} />
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;

