import { Message, MessageFragmentFragment } from '@/graphql/generated/graphql';
import { Edit, Reply, Trash2 } from 'lucide-react';
import { useState } from 'react';
import EmojiPicker from './emoji-picker';

const MessageBubble: React.FC<{
  message: MessageFragmentFragment;
  currentUserId: string;
  onReply: (messageId: string) => void;
  onEdit: (messageId: string, content: string) => void;
  onDelete: (messageId: string) => void;
  onReact: (messageId: string, emoji: string) => void;
  isThread?: boolean;
}> = ({ message, currentUserId, onReply, onEdit, onDelete, onReact, isThread = false }) => {
  const [showActions, setShowActions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content || '');
  const isOwn = message.senderId === currentUserId;

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

  if (message.deleted) {
    return (
      <div
        className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2 ${isThread ? 'ml-4' : ''}`}
      >
        <div className="bg-gray-100 text-gray-500 italic p-3 rounded-lg max-w-xs">
          Message supprimé
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4 ${isThread ? 'ml-4 border-l-2 border-gray-200 pl-4' : ''}`}
    >
      <div className={`max-w-md ${isOwn ? 'order-2' : 'order-1'}`}>
        {!isOwn && (
          <div className="text-xs text-gray-500 mb-1 ml-2">
            {message.sender.firstName} {message.sender.lastName}
          </div>
        )}

        {message.parentMessage && !isThread && (
          <div className="bg-gray-50 border-l-4 border-blue-400 p-2 mb-2 rounded text-sm">
            <div className="text-xs text-gray-500 mb-1">
              En réponse à {message.parentMessage.sender.firstName}{' '}
              {message.parentMessage.sender.lastName}
            </div>
            <div className="text-gray-700">
              {message.parentMessage.content?.substring(0, 100)}
              {message.parentMessage.content && message.parentMessage.content.length > 100 && '...'}
            </div>
          </div>
        )}

        <div
          className={`relative group ${
            isOwn
              ? 'bg-blue-500 text-white rounded-l-lg rounded-tr-lg'
              : 'bg-white border rounded-r-lg rounded-tl-lg shadow-sm'
          }`}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          {isEditing ? (
            <div className="p-3">
              <textarea
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                className={`w-full resize-none border-none outline-none ${
                  isOwn ? 'bg-blue-500 text-white placeholder-blue-200' : 'bg-white text-gray-900'
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
                  Annuler
                </button>
                <button
                  onClick={handleEdit}
                  className="text-xs px-2 py-1 rounded hover:bg-black hover:bg-opacity-10"
                >
                  Modifier
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3">
              <div className="break-words">{message.content}</div>
              {message.edited && (
                <div className="text-xs opacity-70 mt-1">
                  Modifié {message.editedAt ? formatTime(message.editedAt) : ''}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          {showActions && !isEditing && (
            <div
              className={`absolute top-0 ${isOwn ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} flex bg-white border rounded-lg shadow-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity`}
            >
              <EmojiPicker
                onEmojiSelect={emoji => onReact(message.id, emoji)}
                triggerClassName=""
              />
              <button
                onClick={() => onReply(message.id)}
                className="p-1 hover:bg-gray-100 rounded text-gray-500"
                title="Répondre"
              >
                <Reply className="w-4 h-4" />
              </button>
              {isOwn && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 hover:bg-gray-100 rounded text-gray-500"
                    title="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(message.id)}
                    className="p-1 hover:bg-gray-100 rounded text-red-500"
                    title="Supprimer"
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
          <div className="flex flex-wrap gap-1 mt-1 ml-2">
            {/* Group reactions by type */}
            {Object.entries(
              message.reactions.reduce(
                (acc, reaction) => {
                  const type = reaction.type;
                  if (!acc[type]) {
                    acc[type] = [];
                  }
                  acc[type].push(reaction);
                  return acc;
                },
                {} as Record<string, typeof message.reactions>,
              ),
            ).map(([emoji, reactions]) => {
              const userReacted = reactions.some(r => r.user.id === currentUserId);
              const userNames = reactions
                .map(r => `${r.user.firstName} ${r.user.lastName}`)
                .join(', ');

              return (
                <button
                  key={emoji}
                  onClick={() => onReact(message.id, emoji)}
                  className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs transition-colors ${
                    userReacted
                      ? 'bg-blue-100 border border-blue-300 text-blue-700'
                      : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'
                  }`}
                  title={userNames}
                >
                  <span>{emoji}</span>
                  {reactions.length > 1 && (
                    <span className="font-medium text-gray-600">{reactions.length}</span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Timestamp and status */}
        <div
          className={`flex items-center gap-2 mt-1 text-xs text-gray-500 ${isOwn ? 'justify-end' : 'justify-start'}`}
        >
          <span>{formatTime(message.createdAt)}</span>
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
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
