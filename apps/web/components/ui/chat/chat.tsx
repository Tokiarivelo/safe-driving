import MessageInput from '@/components/ui/chat/message-input';
import { ChatHeader } from '@/components/ui/chat/chat-header';
import { ChatSearch } from '@/components/ui/chat/chat-search';
import { ChatMessagesList } from '@/components/ui/chat/chat-messages-list';
import {
  MessageFragmentFragment,
  SendMessageMutation,
  UserConversation,
  useGetMessagesAroundMessageLazyQuery,
} from '@/graphql/generated/graphql';
import { useState } from 'react';
import { useReactions } from '@/hooks/useReactions';

interface ChatProps {
  conversation?: UserConversation;
  rideId?: string;
  currentUserId: string;
  className?: string;
  // Message data
  messages: MessageFragmentFragment[];
  loading: boolean;
  error?: { message: string } | null;
  hasMore: boolean;
  hasMoreAfter: boolean;
  connected: boolean;
  // Message actions
  onSendMessage: (
    content: string,
    parentMessageId?: string,
    attachmentIds?: string[],
  ) => Promise<SendMessageMutation | undefined | null>;
  onLoadMore: () => Promise<void>;
  onLoadMoreAfter: () => Promise<void>;
  onEditMessage?: (messageId: string, content: string, attachmentIds?: string[]) => Promise<void>;
  onDeleteMessage?: (messageId: string) => Promise<void>;
  onReactToMessage?: (messageId: string, emoji: string) => Promise<void>;
  onLoadMessagesAround?: (
    messages: MessageFragmentFragment[],
    hasMoreBefore: boolean,
    hasMoreAfter: boolean,
  ) => void;
}

export const Chat: React.FC<ChatProps> = ({
  conversation,
  rideId,
  currentUserId,
  className = '',
  // Message data
  messages,
  loading,
  error,
  hasMore,
  hasMoreAfter,
  connected,
  // Message actions
  onSendMessage,
  onLoadMore,
  onLoadMoreAfter,
  onEditMessage,
  onDeleteMessage,
  onLoadMessagesAround,
}) => {
  // State management
  const [replyingTo, setReplyingTo] = useState<MessageFragmentFragment | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [scrollToMessageId, setScrollToMessageId] = useState<string | null>(null);

  // GraphQL query for loading messages around a specific message
  const [getMessagesAround, { loading: loadingAround }] = useGetMessagesAroundMessageLazyQuery();
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

  // Message action handlers
  const handleReply = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      setReplyingTo(message);
    }
  };

  const handleEdit = async (messageId: string, content: string, filesKeys?: string[]) => {
    if (onEditMessage) {
      await onEditMessage(messageId, content, filesKeys);
    }
  };

  const handleDelete = async (messageId: string) => {
    if (onDeleteMessage) {
      await onDeleteMessage(messageId);
    }
  };

  // Search handlers
  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleSearchClose = () => {
    setShowSearch(false);
  };

  const handleMessageClick = async (messageId: string) => {
    // Check if message is already loaded
    const messageExists = messages.find(m => m.id === messageId);

    if (messageExists) {
      // Message is loaded, just scroll to it
      setScrollToMessageId(messageId);
      setTimeout(() => setScrollToMessageId(null), 3000);
    } else {
      // Message not loaded - use the new GetMessagesAroundMessage query
      try {
        const result = await getMessagesAround({
          variables: {
            messageId: messageId,
            beforeCount: 25, // Load 25 messages before
            afterCount: 25, // Load 25 messages after
          },
        });

        if (result.data?.messagesAroundMessage) {
          const {
            messages: aroundMessages,
            hasMoreBefore,
            hasMoreAfter,
          } = result.data.messagesAroundMessage;

          if (aroundMessages && aroundMessages.length > 0) {
            // Load these messages into the chat (replace current messages)
            if (onLoadMessagesAround) {
              onLoadMessagesAround(aroundMessages, hasMoreBefore, hasMoreAfter);
            }

            // Scroll to the target message after a short delay
            setTimeout(() => {
              setScrollToMessageId(messageId);
              setTimeout(() => setScrollToMessageId(null), 3000);
            }, 500);
          } else {
            alert('Impossible de charger le contexte du message.');
          }
        }
      } catch (error) {
        console.error('Failed to load messages around message:', error);
        alert('Erreur lors du chargement du contexte du message.');
      }
    }
  };

  // Error state
  if (error) {
    return (
      <div className={`flex items-center justify-center h-screen ${className}`}>
        <div className="text-center text-red-500">
          <p>Erreur de chargement des messages</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col h-screen w-full bg-gray-50 ${className}`}>
      {/* Loading overlay when fetching messages around searched message */}
      {loadingAround && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="text-gray-700">Chargement du message...</span>
            </div>
          </div>
        </div>
      )}

      {/* Header - fixed height */}
      <ChatHeader
        conversation={conversation}
        rideId={rideId}
        connected={connected}
        onSearchClick={handleSearchClick}
      />

      {/* Search overlay */}
      {showSearch && <ChatSearch onClose={handleSearchClose} onMessageClick={handleMessageClick} />}

      {/* Messages list - flexible height */}
      <ChatMessagesList
        messages={messages}
        loading={loading}
        hasMore={hasMore}
        hasMoreAfter={hasMoreAfter}
        currentUserId={currentUserId}
        onLoadMore={onLoadMore}
        onLoadMoreAfter={onLoadMoreAfter}
        onReply={handleReply}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReact={handleReactToMessage}
        scrollToMessageId={scrollToMessageId}
      />

      {/* Message input - fixed height */}
      <MessageInput
        onSendMessage={onSendMessage}
        replyingTo={replyingTo}
        onCancelReply={() => setReplyingTo(null)}
        disabled={!connected}
        conversationId={conversation?.id}
        rideId={rideId}
      />
    </div>
  );
};
