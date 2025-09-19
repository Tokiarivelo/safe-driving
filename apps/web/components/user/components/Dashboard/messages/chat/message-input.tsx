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
    <div className="border-t-2 border-[#E5E7EB] p-4">
      <div className="border-2 border-[#E5E7EB] rounded-sm">
        <div>
          <Textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            onInput={handleTyping}
            onBlur={onBlur}
            placeholder="Écrivez votre message..."
            className="flex-1 resize-none text-sm min-h-[40px] max-h-[120px] bg-transparent !border-none !outline-none focus:!border-none focus:!outline-none focus:!ring-0 focus:!shadow-none"
            rows={1}
            style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
          />
        </div>
        <div className="w-full h-10 flex justify-end">
          <div className="text-pink-500 hover:text-pink-600 transition-colors w-9 h-9 flex items-center justify-center">
            <Icon icon="proicons:emoji" width="26" height="26" />
          </div>
          <div className="text-pink-500 hover:text-pink-600 transition-colors w-9 h-9 flex items-center justify-center">
            <Icon icon="material-symbols-light:mic-outline-rounded" width="26" height="26" />
          </div>
          <div className="text-pink-500 hover:text-pink-600 transition-colors w-9 h-9 flex items-center justify-center">
            <Icon icon="mage:gif-fill" width="26" height="26" />
          </div>
          <div className="text-pink-500 hover:text-pink-600 transition-colors w-9 h-9 flex items-center justify-center">
            <Icon icon="mdi-light:file" width="26" height="26" />
          </div>
          <div className="text-pink-500 hover:text-pink-600 transition-colors w-9 h-9 flex items-center justify-center">
            <button
              onClick={handleSend}
              disabled={!message.trim() || sending || disabled}
              className="w-8 h-6 text-pink-500 rounded-lg hover:text-pink-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <Icon icon="fluent:send-28-filled" width="24" height="24" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
