import { Edit, Reply, Trash2, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import styles from '../conversation-selector/conversation.module.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import LinkPreviewViewer from '@/components/ui/chat/LinkPreviewViewer';
import { AttachmentType } from '@/graphql/generated/graphql';

interface Message {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
  editedAt?: string;
  edited?: boolean;
  deleted?: boolean;
  state: 'SENT' | 'DELIVERED' | 'READ' | 'FAILED';
  sender: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  parentMessage?: {
    id: string;
    content: string;
    sender: {
      firstName: string;
      lastName: string;
    };
  };
  reactions?: Array<{
    id: string;
    type: string;
    user: {
      firstName: string;
      lastName: string;
    };
  }>;
  replies?: Message[];
  attachments?: Array<{
    id: string;
    type?: string;
    url?: string;
    linkTitle?: string;
    linkDesc?: string;
    linkThumbnail?: string;
    file?: {
      key: string;
      url: string;
    };
  }>;
}

const MessageBubble: React.FC<{
  message: Message;
  currentUserId: string;
  onReply: (messageId: string) => void;
  onEdit: (messageId: string, content: string) => void;
  onDelete: (messageId: string) => void;
  isThread?: boolean;
  isLatest?: boolean;
}> = ({
  message,
  currentUserId,
  onReply,
  onEdit,
  onDelete,
  isThread = false,
  isLatest = false,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content || '');
  const [clicked, setClicked] = useState(false);
  const isOwn = message.senderId === currentUserId;
  const messageRef = useRef<HTMLDivElement>(null);

  const handleEdit = () => {
    if (editContent?.trim() && editContent !== message.content) {
      onEdit(message.id, editContent.trim());
    }
    setIsEditing(false);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleMessageClick = () => {
    setClicked(!clicked);
  };

  // Auto scroll to latest message - FIXED
  useEffect(() => {
    if (isLatest && messageRef.current && !isThread) {
      // Delay scroll to ensure DOM is updated
      const timeoutId = setTimeout(() => {
        const container =
          messageRef.current?.closest('[data-messages-container]') ||
          document.querySelector('[data-messages-container]') ||
          messageRef.current?.parentElement;

        if (container) {
          // Force scroll to bottom with smooth behavior
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth',
          });
        } else {
          // Fallback to scrollIntoView
          messageRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
          });
        }
      }, 150);

      return () => clearTimeout(timeoutId);
    }
  }, [isLatest, message.id, message.content, isThread]);

  if (message.deleted) {
    return (
      <div
        ref={messageRef}
        className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : 'flex-row'} ${isThread ? 'ml-4' : ''}`}
      >
        <div className="flex-shrink-0">
          <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
            <User size={14} className="text-gray-500" />
          </div>
        </div>
        <div className="bg-gray-100 text-gray-500 italic p-3 rounded-lg max-w-md">
          Le message a été supprimé
        </div>
      </div>
    );
  }

  return (
    <div
      ref={messageRef}
      className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : 'flex-row'} ${isThread ? 'ml-4 border-l-2 border-gray-200 pl-4' : ''}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-sm font-medium overflow-hidden ${
            isOwn ? 'bg-blue-500' : 'bg-gray-500'
          }`}
        >
          {message.sender.avatar ? (
            <img
              src={message.sender.avatar}
              alt={`${message.sender.firstName} ${message.sender.lastName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={14} />
          )}
        </div>
      </div>

      <div className={`flex flex-col max-w-md ${isOwn ? 'items-end' : 'items-start'}`}>
        {/* Sender name */}
        <div className="text-xs text-gray-500 mb-1 px-1">
          {message.sender.firstName} {message.sender.lastName}
        </div>

        {/* Parent message preview */}
        {message.parentMessage && !isThread && (
          <div className="bg-gray-50 border-l-4 border-blue-400 p-2 mb-2 rounded text-sm max-w-full">
            <div className="text-xs text-gray-500 mb-1">
              Réponse à ... {message.parentMessage.sender.firstName}{' '}
              {message.parentMessage.sender.lastName}
            </div>
            <div className="text-gray-700">
              {message.parentMessage.content?.substring(0, 100)}
              {message.parentMessage.content && message.parentMessage.content.length > 100 && '...'}
            </div>
          </div>
        )}

        {/* Message bubble */}
        <div
          className={`relative group ${
            isOwn
              ? 'bg-blue-500 text-white rounded-2xl rounded-br-md'
              : 'bg-gray-200 text-gray-800 rounded-2xl rounded-bl-md'
          }`}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          {isEditing ? (
            <div className="p-4">
              <textarea
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                className={`w-full resize-none border-none outline-none bg-transparent ${
                  isOwn ? 'text-white placeholder-blue-200' : 'text-gray-800'
                }`}
                rows={2}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleEdit();
                  }
                  if (e.key === 'Escape') {
                    setIsEditing(false);
                    setEditContent(message.content || '');
                  }
                }}
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditContent(message.content || '');
                  }}
                  className="text-xs px-2 py-1 rounded hover:bg-black hover:bg-opacity-10"
                >
                  Tant pis
                </button>
                <button
                  onClick={handleEdit}
                  className="text-xs px-2 py-1 rounded hover:bg-black hover:bg-opacity-10"
                >
                  Modifie
                </button>
              </div>
            </div>
          ) : (
            <div
              className="px-4 py-3 cursor-pointer transition-all hover:shadow-md"
              onClick={handleMessageClick}
            >
              <div className="text-sm leading-relaxed break-words">{message.content}</div>

              {/* File attachments */}
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.attachments.map(attachment => {
                    const fileUrl =
                      attachment.url || attachment.file?.url || attachment.linkThumbnail;
                    const isImage = fileUrl?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
                    const isVideo = fileUrl?.match(/\.(mp4|webm|ogg)$/i);
                    const isLink = attachment.type === AttachmentType.LINK;

                    return (
                      <div key={attachment.id}>
                        {isImage && fileUrl && (
                          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                            <Image
                              src={fileUrl}
                              alt={attachment.linkTitle || 'Image attachment'}
                              className="rounded-lg max-w-sm w-full h-auto cursor-pointer hover:opacity-90"
                              loading="lazy"
                              fill
                            />
                          </a>
                        )}
                        {isVideo && fileUrl && (
                          <video src={fileUrl} controls className="rounded-lg max-w-sm w-full" />
                        )}

                        {isLink && fileUrl && <LinkPreviewViewer url={fileUrl} />}

                        {!isImage && !isVideo && !isLink && fileUrl && (
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center">
                              📎
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">
                                {attachment.linkTitle || attachment.file?.key || 'File'}
                              </div>
                              {attachment.linkDesc && (
                                <div className="text-xs text-gray-500 truncate">
                                  {attachment.linkDesc}
                                </div>
                              )}
                            </div>
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {message.edited && (
                <div className="text-xs opacity-70 mt-1">
                  Le texte a été modifié {message.editedAt ? formatTime(message.editedAt) : ''}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          {showActions && !isEditing && (
            <div
              className={`absolute top-0 ${isOwn ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} flex bg-white border rounded-lg shadow-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2 mr-2`}
            >
              <button
                onClick={() => onReply(message.id)}
                className="p-2 hover:bg-gray-100 rounded text-gray-600"
                title="Réponds"
              >
                <Reply className="w-4 h-4" />
              </button>
              {isOwn && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 hover:bg-gray-100 rounded text-gray-600"
                    title="Change"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(message.id)}
                    className="p-2 hover:bg-gray-100 rounded text-red-500"
                    title="supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex gap-1 mt-1 px-1">
            {message.reactions.map(reaction => (
              <span
                key={reaction.id}
                className="bg-gray-100 rounded-full px-2 py-1 text-xs"
                title={reaction.user.firstName + ' ' + reaction.user.lastName}
              >
                {reaction.type}
              </span>
            ))}
          </div>
        )}

        {/* Timestamp and status */}
        <div className="text-xs text-gray-400 mt-1 px-1 flex items-center gap-1">
          {formatTime(message.createdAt)}
          {isOwn && (
            <span
              className={`
                ${message.state === 'SENT' ? 'text-gray-400' : ''}
                ${message.state === 'DELIVERED' ? 'text-blue-400' : ''}
                ${message.state === 'READ' ? 'text-green-400' : ''}
                ${message.state === 'FAILED' ? 'text-red-400' : ''}
              `}
            >
              {message.state === 'SENT' && '✓'}
              {message.state === 'DELIVERED' && '✓✓'}
              {message.state === 'READ' && '✓✓'}
              {message.state === 'FAILED' && '✗'}
            </span>
          )}
          {clicked && (
            <div className="flex items-center gap-1 text-pink-500 font-medium">
              <span>: now</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer">
                      <Icon icon="mdi:dots-vertical" width={20} height={20} />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent side="bottom" align="start" className={styles.auth_left12}>
                  <div className={styles.auth_left13}>
                    <div className={styles.auth_left14}>
                       <Icon icon="bx:share" width="24" height="24" />
                    </div>
                    <div className={styles.auth_left15}>Transferer</div>
                  </div>
                  <DropdownMenuSeparator />
                  <div className={styles.auth_left16}>
                    <div className={styles.auth_left17}>
                      <Icon icon="mdi:delete-forever" width="24" height="24" />
                    </div>
                    <div className={styles.auth_left18}>Supprimer</div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {/* Replies thread */}
        {message.replies && message.replies.length > 0 && !isThread && (
          <div className="mt-4 space-y-4 w-full">
            {message.replies.map((reply, index) => (
              <MessageBubble
                key={reply.id}
                message={reply}
                currentUserId={currentUserId}
                onReply={onReply}
                onEdit={onEdit}
                onDelete={onDelete}
                isThread={true}
                isLatest={index === message.replies!.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
