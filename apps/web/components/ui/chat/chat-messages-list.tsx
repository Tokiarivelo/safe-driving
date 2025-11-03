import MessageBubble from '@/components/ui/chat/message-bubble';
import { MessageFragmentFragment } from '@/graphql/generated/graphql';
import { ArrowDown } from 'lucide-react';
import { useRef, useEffect, useState, useCallback } from 'react';

interface ChatMessagesListProps {
  messages: MessageFragmentFragment[];
  loading: boolean;
  hasMore: boolean;
  currentUserId: string;
  onLoadMore: () => Promise<void>;
  onReply: (messageId: string) => void;
  onEdit: (messageId: string, content: string, attachmentIds?: string[]) => Promise<void>;
  onDelete: (messageId: string) => Promise<void>;
  onReact: (messageId: string, emoji: string) => Promise<void>;
  scrollToMessageId?: string | null;
}

export const ChatMessagesList: React.FC<ChatMessagesListProps> = ({
  messages,
  loading,
  hasMore,
  currentUserId,
  onLoadMore,
  onReply,
  onEdit,
  onDelete,
  onReact,
  scrollToMessageId,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const previousMessagesLength = useRef(messages.length);

  // Check if user is near bottom of messages
  const checkIfNearBottom = useCallback(() => {
    if (!messagesContainerRef.current) return false;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    return distanceFromBottom < 100;
  }, []);

  // Handle scroll event
  const handleScroll = useCallback(() => {
    const isNearBottom = checkIfNearBottom();
    setShowScrollButton(!isNearBottom);
    setShouldAutoScroll(isNearBottom);
  }, [checkIfNearBottom]);

  // Scroll to bottom function
  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  }, []);

  // Auto-scroll when new messages arrive (only if user is near bottom)
  useEffect(() => {
    const hasNewMessages = messages.length > previousMessagesLength.current;

    if (hasNewMessages && shouldAutoScroll) {
      // Small delay to ensure DOM is updated
      setTimeout(() => scrollToBottom(true), 100);
    }

    previousMessagesLength.current = messages.length;
  }, [messages.length, shouldAutoScroll, scrollToBottom]);

  // Scroll to specific message (from search)
  useEffect(() => {
    if (scrollToMessageId) {
      const messageElement = document.getElementById(`message-${scrollToMessageId}`);
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Highlight the message briefly
        messageElement.classList.add('bg-yellow-100');
        setTimeout(() => {
          messageElement.classList.remove('bg-yellow-100');
        }, 2000);
      }
    }
  }, [scrollToMessageId]);

  // Initial scroll to bottom
  useEffect(() => {
    if (messages.length > 0 && !loading) {
      scrollToBottom(false);
    }
    // Only run once on mount or when loading completes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex-1 flex flex-col">
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
        onScroll={handleScroll}
      >
        {/* Load more button at top */}
        {hasMore && (
          <div className="text-center py-2">
            <button
              onClick={onLoadMore}
              disabled={loading}
              className="text-blue-500 hover:text-blue-700 text-sm disabled:opacity-50"
            >
              {loading ? 'Chargement...' : 'Charger plus de messages'}
            </button>
          </div>
        )}

        {/* Initial loading state */}
        {loading && messages.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-500">Chargement des messages...</div>
          </div>
        ) : (
          <>
            {/* Messages list */}
            {messages.map(message => (
              <div key={message.id} id={`message-${message.id}`} className="transition-colors">
                <MessageBubble
                  message={message}
                  currentUserId={currentUserId}
                  onReply={onReply}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onReact={onReact}
                />
              </div>
            ))}
          </>
        )}

        {/* Anchor for scrolling to bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={() => scrollToBottom(true)}
          className="absolute bottom-4 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-10"
          title="Aller en bas"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
