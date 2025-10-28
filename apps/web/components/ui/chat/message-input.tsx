import { MessageFragmentFragment, SendMessageMutation } from '@/graphql/generated/graphql';
import { emitTyping } from '@/lib/socket.io/socketClient';
import { Paperclip, Send, X } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import TypingIndicator from './typing-indicator/typing-indicator';
import { useChatSocket } from '@/lib/socket.io/useChatSocket';
import EmojiPicker from './emoji-picker';
import GifPicker from './gif-picker';
import { FileType } from '@/graphql/generated/graphql';
import { useUploadComponent } from '../upload/upload-component.logic';
import Image from 'next/image';
import LinkPreviewViewer from './LinkPreviewViewer';

const MessageInput: React.FC<{
  conversationId?: string;
  rideId?: string;
  onSendMessage: (
    content: string,
    parentMessageId?: string,
    attachmentIds?: string[],
  ) => Promise<SendMessageMutation | undefined | null>;
  replyingTo?: MessageFragmentFragment | null;
  onCancelReply: () => void;
  disabled?: boolean;
}> = ({ onSendMessage, replyingTo, onCancelReply, disabled = false, conversationId, rideId }) => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { typingUsers } = useChatSocket({ conversationId, rideId });

  // Initialize upload component
  const {
    files,
    uploadProgress,
    status: uploadStatus,
    errorMsg: uploadError,
    handleChange: handleFileChange,
    removeFile,
    handleStartUpload,
  } = useUploadComponent({
    fileType: FileType.MESSAGE,
    concurrency: 3,
    maxRetries: 3,
  });

  const handleSend = async () => {
    if ((!message.trim() && files.length === 0) || sending) return;

    setSending(true);
    try {
      let filesKeys: string[] = [];
      // If there are files, upload them first
      if (files.length > 0 && uploadStatus !== 'done') {
        const uploadResults = await handleStartUpload();
        filesKeys = uploadResults?.map(r => r.key) || [];
      }

      // Send the message
      const contentToSend = message.trim();

      // If files were uploaded, you could append file info to message
      // For now, we'll just send the text message
      // TODO: Modify backend to accept file attachments or embed file URLs

      await onSendMessage(contentToSend || '📎 File(s) attached', replyingTo?.id, filesKeys);
      setMessage('');

      // Clear files after sending
      handleFileChange([], { replace: true });

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
    // Focus back on textarea
    textareaRef.current?.focus();
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

  // Handle paste event for images
  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const imageFiles: File[] = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            imageFiles.push(file);
          }
        }
      }

      if (imageFiles.length > 0) {
        e.preventDefault();
        handleFileChange(imageFiles, { removeUploadedOnAdd: false });
      }
    },
    [handleFileChange],
  );

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleFileChange(selectedFiles, { removeUploadedOnAdd: false });
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle drag and drop
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      const droppedFiles = e.dataTransfer?.files;
      if (droppedFiles && droppedFiles.length > 0) {
        handleFileChange(droppedFiles, { removeUploadedOnAdd: false });
      }
    },
    [handleFileChange],
  );

  const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  };

  return (
    <div className="border-t bg-white p-4">
      {/* Link preview viewer for multiple URLs */}
      {message &&
        message.match(/https?:\/\/[\w\-\.]+(:\d+)?(\/\S*)?/gi) &&
        message
          .match(/https?:\/\/[\w\-\.]+(:\d+)?(\/\S*)?/gi)
          ?.map((url, idx) => <LinkPreviewViewer key={url + idx} url={url} />)}
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

      {/* File previews */}
      {files.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="relative group bg-gray-100 rounded-lg p-2 flex items-center gap-2 max-w-xs"
            >
              {file.type.startsWith('image/') ? (
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-12 h-12 object-cover rounded"
                  fill
                />
              ) : (
                <div className="w-12 h-12 bg-gray-300 rounded flex items-center justify-center">
                  <Paperclip className="w-6 h-6 text-gray-600" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{file.name}</div>
                <div className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                  {uploadProgress[index] !== undefined && uploadProgress[index] < 100 && (
                    <span className="ml-2">• {uploadProgress[index]}%</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                type="button"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {uploadError && <div className="mb-2 text-sm text-red-600">Error: {uploadError}</div>}

      <div className="flex items-end gap-3">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-500 hover:text-gray-700"
          title="Joindre un fichier"
          type="button"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            onInput={handleTyping}
            onBlur={onBlur}
            onPaste={handlePaste}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
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
          disabled={(!message.trim() && files.length === 0) || sending || disabled}
          className={`p-2 rounded-lg ${
            (message.trim() || files.length > 0) && !sending && !disabled
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
