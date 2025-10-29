'use client';
import React from 'react';
import MpMessage from './centre.child';
import Fichier from './right.child';
import ConversationItem from './left.child';
import styles from './messages.module.css';
import { useMessages } from '@/lib/message/useMessages';
import { Chat } from './chat/chat';
import { ConversationSelectorWithCRUD } from './conversation-selector';
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
  const [session, setSession] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [selectedConversationId, setSelectedConversationId] = useState(conversationId);
  const [selectedConversation, setSelectedConversation] = useState<UserConversation | undefined>();
  const [userName, setUserName] = useState<string>('');

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

  // Update selected conversation when prop changes
  useEffect(() => {
    setSelectedConversationId(conversationId);
  }, [conversationId]);

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

  return (
    <div className={styles.auth_msg1}>
      <div className={styles.auth_msg2}>
        <div className={styles.auth_msg3}></div>
        <div className={styles.auth_msg4}>
          <ConversationSelectorWithCRUD
            selectedConversationId={selectedConversationId}
            onConversationSelect={handleConversationSelect}
            className="h-full"
            showSearch={true}
            showCreateButton={true}
            onConversationChange={(conversations) => {
              console.log('Conversations updated:', conversations);
            }}
          />
          {/* <ConversationItem/> */}
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
          />
          {/* <MpMessage/> */}
        </div>
        <div className={styles.auth_msg12}>
          <Fichier />
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;