import MessageBubble from '@/components/ui/chat/message-bubble';
import MessageInput from '@/components/ui/chat/message-input';
import { Message, SendMessageMutation, Conversation } from '@/graphql/generated/graphql';
import { ArrowDown, MoreVertical } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

interface ChatProps {
  conversation?: Conversation;
  rideId?: string;
  currentUserId: string;
  className?: string;
  // Props pour les données externes (vos hooks)
  messages: Message[];
  loading: boolean;
  error?: { message: string } | null;
  hasMore: boolean;
  connected: boolean;
  onSendMessage: (
    content: string,
    parentMessageId?: string,
  ) => Promise<SendMessageMutation | undefined | null>;
  onLoadMore: () => Promise<void>;
  onScrollToBottom: () => void;
  onEditMessage?: (messageId: string, content: string) => Promise<void>;
  onDeleteMessage?: (messageId: string) => Promise<void>;
}

export const Chat: React.FC<ChatProps> = ({
  conversation,
  rideId,
  currentUserId,
  className = '',
  // Props des données
  messages,
  loading,
  error,
  hasMore,
  connected,
  onSendMessage,
  onLoadMore,
  onScrollToBottom,
  onEditMessage,
  onDeleteMessage,
}) => {
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Gestion du scroll pour afficher le bouton "descendre"
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isNearBottom);
  }, []);

  const handleReply = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      setReplyingTo(message);
    }
  };

  const handleEdit = async (messageId: string, content: string) => {
    if (onEditMessage) {
      await onEditMessage(messageId, content);
    }
  };

  const handleDelete = async (messageId: string) => {
    if (onDeleteMessage) {
      await onDeleteMessage(messageId);
    }
  };

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

  console.log('conversation :>> ', conversation);

  return (
    <div className={`flex flex-col h-full bg-gray-50 ${className}`}>
      {/* Header */}
      <div className="border-b bg-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="font-semibold">
              {conversation?.title || (rideId ? 'Chat de course' : 'Chat')}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div
                className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}
              ></div>
              {connected ? 'En ligne' : 'Hors ligne'}
              {conversation?.participants && (
                <span className="ml-2">
                  • {conversation.participants.length} participant
                  {conversation.participants.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          {/* Miniatures des participants */}
          {conversation?.participants && conversation.participants.length > 0 && (
            <div className="flex -space-x-2 ml-4">
              {conversation.participants.slice(0, 4).map((participant, index) => (
                <div
                  key={participant.id}
                  className="relative w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden"
                  title={
                    `${participant.user?.firstName || ''} ${participant.user?.lastName || ''}`.trim() ||
                    participant.user?.email
                  }
                >
                  {participant.user?.avatar?.url ? (
                    <img
                      src={participant.user.avatar.url}
                      alt={`${participant.user.firstName || ''} ${participant.user.lastName || ''}`.trim()}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                      {(
                        participant.user?.firstName?.[0] ||
                        participant.user?.email?.[0] ||
                        '?'
                      ).toUpperCase()}
                    </div>
                  )}
                </div>
              ))}
              {conversation.participants.length > 4 && (
                <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center text-white text-xs font-medium">
                  +{conversation.participants.length - 4}
                </div>
              )}
            </div>
          )}
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2" onScroll={handleScroll}>
        {hasMore && (
          <div className="text-center py-2">
            <button
              onClick={onLoadMore}
              disabled={loading}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              {loading ? 'Chargement...' : 'Charger plus de messages'}
            </button>
          </div>
        )}

        {loading && messages.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-500">Chargement des messages...</div>
          </div>
        ) : (
          <>
            {messages.map(message => (
              <MessageBubble
                key={message.id}
                message={message}
                currentUserId={currentUserId}
                onReply={handleReply}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={onScrollToBottom}
          className="absolute bottom-20 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      )}

      {/* Message Input */}
      <MessageInput
        onSendMessage={onSendMessage}
        replyingTo={replyingTo}
        onCancelReply={() => setReplyingTo(null)}
        disabled={!connected}
        conversationId={conversation?.id}
      />
    </div>
  );
};
