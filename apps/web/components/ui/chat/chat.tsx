import MessageInput from '@/components/ui/chat/message-input';
import { ChatHeader } from '@/components/ui/chat/chat-header';
import { ChatSearch } from '@/components/ui/chat/chat-search';
import { ChatMessagesList } from '@/components/ui/chat/chat-messages-list';
import {
  MessageFragmentFragment,
  SendMessageMutation,
  UserConversation,
} from '@/graphql/generated/graphql';
import { useState } from 'react';

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
  connected: boolean;
  // Message actions
  onSendMessage: (
    content: string,
    parentMessageId?: string,
    attachmentIds?: string[],
  ) => Promise<SendMessageMutation | undefined | null>;
  onLoadMore: () => Promise<void>;
  onEditMessage?: (messageId: string, content: string, attachmentIds?: string[]) => Promise<void>;
  onDeleteMessage?: (messageId: string) => Promise<void>;
  onReactToMessage?: (messageId: string, emoji: string) => Promise<void>;
  onLoadMessageContext?: (messageId: string, messageDate: string) => Promise<boolean>;
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
  connected,
  // Message actions
  onSendMessage,
  onLoadMore,
  onEditMessage,
  onDeleteMessage,
  onReactToMessage,
  onLoadMessageContext,
}) => {
  // State management
  const [replyingTo, setReplyingTo] = useState<MessageFragmentFragment | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [scrollToMessageId, setScrollToMessageId] = useState<string | null>(null);

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

  const handleReact = async (messageId: string, emoji: string) => {
    if (onReactToMessage) {
      await onReactToMessage(messageId, emoji);
    }
  };

  // Search handlers
  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleSearchClose = () => {
    setShowSearch(false);
  };

  const handleMessageClick = async (messageId: string, messageDate: string) => {
    // Check if message is already loaded
    const messageExists = messages.find(m => m.id === messageId);

    if (messageExists) {
      // Message is loaded, just scroll to it
      setScrollToMessageId(messageId);
      setTimeout(() => setScrollToMessageId(null), 3000);
    } else {
      // Message not loaded - try to load it if callback provided
      if (onLoadMessageContext) {
        const loaded = await onLoadMessageContext(messageId, messageDate);
        if (loaded) {
          // Give time for messages to render
          setTimeout(() => {
            setScrollToMessageId(messageId);
            setTimeout(() => setScrollToMessageId(null), 3000);
          }, 500);
        } else {
          alert(
            'Impossible de charger le message. Veuillez charger plus de messages anciens et réessayer.',
          );
        }
      } else {
        alert(
          "Ce message n'est pas encore chargé. Veuillez charger plus de messages anciens et réessayer.",
        );
      }
    }
  };

  // Error state
  if (error) {
    return (
      <div className={`flex items-center justify-center h-full ${className}`}>
        <div className="text-center text-red-500">
          <p>Erreur de chargement des messages</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col h-full bg-gray-50 ${className}`}>
      {/* Header */}
      <ChatHeader
        conversation={conversation}
        rideId={rideId}
        connected={connected}
        onSearchClick={handleSearchClick}
      />

      {/* Search overlay */}
      {showSearch && <ChatSearch onClose={handleSearchClose} onMessageClick={handleMessageClick} />}

      {/* Messages list */}
      <ChatMessagesList
        messages={messages}
        loading={loading}
        hasMore={hasMore}
        currentUserId={currentUserId}
        onLoadMore={onLoadMore}
        onReply={handleReply}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReact={handleReact}
        scrollToMessageId={scrollToMessageId}
      />

      {/* Message input */}
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
