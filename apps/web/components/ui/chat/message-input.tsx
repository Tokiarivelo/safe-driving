import { Message, MessageFragmentFragment, SendMessageMutation } from '@/graphql/generated/graphql';
import { emitTyping } from '@/lib/socket.io/socketClient';
import { Paperclip, Send, Smile } from 'lucide-react';
import { useState } from 'react';
import TypingIndicator from './typing-indicator/typing-indicator';
import { useChatSocket } from '@/lib/socket.io/useChatSocket';
import EmojiPicker from './emoji-picker';
import GifPicker from './gif-picker';

const MessageInput: React.FC<{
  conversationId?: string;
  rideId?: string;
  onSendMessage: (
    content: string,
    parentMessageId?: string,
  ) => Promise<SendMessageMutation | undefined | null>;
  replyingTo?: MessageFragmentFragment | null;
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

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  const handleGifSelect = async (gifUrl: string) => {
    // Send the GIF URL as a message
    setSending(true);
    try {
      await onSendMessage(gifUrl, replyingTo?.id);
      if (replyingTo) onCancelReply();
    } catch (error) {
      console.error('Error sending GIF:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="border-t bg-white p-4">
      {replyingTo && (
        <div className="mb-3 p-2 bg-gray-50 border-l-4 border-blue-400 rounded">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-gray-500 mb-1">
                Répondre à {`${replyingTo.sender.firstName} ${replyingTo.sender.lastName}`}
              </div>
              <div className="text-sm text-gray-700">
                {replyingTo.content?.substring(0, 100)}
                {replyingTo.content && replyingTo.content.length > 100 && '...'}
              </div>
            </div>
            <button onClick={onCancelReply} className="text-gray-400 hover:text-gray-600 ml-2">
              ×
            </button>
          </div>
        </div>
      )}
      <div>
        <TypingIndicator typingUsers={typingUsers} />
      </div>
      <div className="flex items-end gap-3">
        <button className="p-2 text-gray-500 hover:text-gray-700" title="Joindre un fichier">
          <Paperclip className="w-5 h-5" />
        </button>

        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            onInput={handleTyping}
            onBlur={onBlur}
            placeholder="Tapez votre message..."
            className="w-full resize-none border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-blue-500 max-h-32"
            rows={1}
            disabled={sending}
            style={{
              minHeight: '40px',
              height: 'auto',
            }}
          />
        </div>

        <EmojiPicker onEmojiSelect={handleEmojiSelect} triggerClassName="" />

        <GifPicker onGifSelect={handleGifSelect} triggerClassName="" />

        <button
          onClick={handleSend}
          disabled={!message.trim() || sending || disabled}
          className={`p-2 rounded-lg ${
            message.trim() && !sending && !disabled
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
