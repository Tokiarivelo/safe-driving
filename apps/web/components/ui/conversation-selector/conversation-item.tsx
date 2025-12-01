import React from 'react';
import Image from 'next/image';
import { ConversationItemProps } from './conversation-selector.interface';
import { ConversationType } from '@/graphql/generated/graphql';

export function ConversationItem({ conversation, isSelected, onClick }: ConversationItemProps) {
  const getConversationTitle = () => {
    if (conversation.title) {
      return conversation.title;
    }

    if (
      conversation.type === ConversationType.DIRECT &&
      conversation.participants &&
      conversation.participants.length > 0
    ) {
      const participant = conversation.participants[0];
      const firstName = participant.user.firstName || '';
      const lastName = participant.user.lastName || '';
      return `${firstName} ${lastName}`.trim() || 'Utilisateur inconnu';
    }

    if (conversation.type === 'GROUP') {
      return 'Conversation de groupe';
    }

    if (conversation.type === 'RIDE_LINKED') {
      return 'Chat de trajet';
    }

    return 'Conversation';
  };

  const getTypeIcon = () => {
    switch (conversation.type) {
      case 'DIRECT':
        return '👤';
      case 'GROUP':
        return '👥';
      case 'RIDE_LINKED':
        return '🚗';
      default:
        return '💬';
    }
  };

  const getLastMessagePreview = () => {
    // Use the last message content if available, otherwise show a placeholder
    return 'Lorem ipsum dolor ...';
  };

  const formatTime = (date: string) => {
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  // Online status - can be enhanced with socket.io real-time updates
  // For now, we check if there are any participants (simulated status)
  const isOnline = () => {
    if (conversation.participants && conversation.participants.length > 0) {
      // This can be replaced with real-time status from socket.io
      return false; // Default to offline, will be updated by socket.io
    }
    return false;
  };

  // Get unread message count - use _count.messages as a proxy for now
  // This should be replaced with actual unread count when available in the API
  const getUnreadCount = () => {
    // Using message count as a demo - in production, use actual unreadCount field
    const count = conversation._count?.messages ?? 0;
    // Only show badge if there are messages (simulating unread)
    return count > 0 ? Math.min(count, 9) : 0;
  };

  const getParticipantAvatar = () => {
    if (conversation.participants && conversation.participants.length > 0) {
      const participant = conversation.participants[0];
      if (participant.user.avatar?.url) {
        return (
          <div className="relative">
            <Image
              src={participant.user.avatar.url}
              alt={`${participant.user.firstName} ${participant.user.lastName}`}
              width={52}
              height={52}
              className="w-13 h-13 rounded-full object-cover border-2 border-white shadow-sm"
              style={{ objectFit: 'cover' }}
            />
            {isOnline() && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
        );
      }
    }

    return (
      <div className="relative">
        <div className="w-13 h-13 rounded-full bg-gray-300 flex items-center justify-center text-xl border-2 border-white shadow-sm">
          {getTypeIcon()}
        </div>
        {isOnline() && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
    );
  };

  const unreadCount = getUnreadCount();

  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-3 text-left transition-all duration-200 border-b border-gray-100 ${
        isSelected
          ? 'conversation-selected-bg conversation-gradient-border'
          : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center space-x-3">
        {getParticipantAvatar()}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{getConversationTitle()}</h3>
            <span className="text-xs text-gray-500 font-medium">
              {formatTime(conversation.createdAt)}
            </span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500 truncate max-w-[70%]">
              {getLastMessagePreview()}
            </span>

            {unreadCount > 0 && (
              <span className="conversation-gradient-bg text-white text-[10px] font-bold min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center">
                +{unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
