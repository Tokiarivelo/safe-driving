import { Message, SendMessageMutation } from '@/graphql/generated/graphql';
import { emitTyping } from '@/lib/socket.io/socketClient';
import { Paperclip, Send, Smile } from 'lucide-react';
import { useState } from 'react';
import TypingIndicator from './typing-indicator/typing-indicator';
import { useChatSocket } from '@/lib/socket.io/useChatSocket';
import { Icon } from '@iconify/react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const MessageInput: React.FC<{
  conversationId?: string;
  rideId?: string;
  onSendMessage: (
    content: string,
    parentMessageId?: string,
  ) => Promise<SendMessageMutation | undefined | null>;
  replyingTo?: Message | null;
  onCancelReply: () => void;
  disabled?: boolean;
}> = ({ onSendMessage, replyingTo, onCancelReply, disabled = false, conversationId, rideId }) => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const { typingUsers } = useChatSocket({ conversationId, rideId });

  const handleSend = async () => {
    if (!message.trim() || sending) return;

    setSending(true);
    try {
      await onSendMessage(message.trim(), replyingTo?.id);
      setMessage('');
      if (replyingTo) onCancelReply();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    emitTyping({
      conversationId,
      isTyping: e.target.value.length > 0,
    });
  };

  const onBlur = () => {
    emitTyping({ conversationId, isTyping: false });
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex items-end gap-3 p-3 border border-gray-200 rounded-lg bg-white shadow-sm">
        {/* Text Input */}
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            onInput={handleTyping}
            onBlur={onBlur}
            placeholder="Écrivez votre message..."
            className="min-h-[40px] max-h-[120px] resize-none border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-sm"
            rows={1}
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1">
          <button className="p-2 text-pink-500 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
            <Icon icon="proicons:emoji" width="20" height="20" />
          </button>

          <button className="p-2 text-pink-500 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
            <Icon icon="material-symbols-light:mic-outline-rounded" width="20" height="20" />
          </button>

          <button className="p-2 text-pink-500 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
            <Icon icon="mage:gif-fill" width="20" height="20" />
          </button>

          <button className="p-2 text-pink-500 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
            <Icon icon="mdi-light:file" width="20" height="20" />
          </button>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!message.trim() || sending || disabled}
            className="p-2 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            size="sm"
          >
            <Icon icon="fluent:send-28-filled" width="20" height="20" />
          </Button>
        </div>
      </div>
      {/* Typing Indicator */}
      {typingUsers && typingUsers.length > 0 && (
        <div className="mt-2">
          <TypingIndicator typingUsers={typingUsers} />
        </div>
      )}
    </div>
  );
};

export default MessageInput;
