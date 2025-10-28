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

  const getParticipantAvatar = () => {
    if (conversation.participants && conversation.participants.length > 0) {
      const participant = conversation.participants[0];
      if (participant.user.avatar?.url) {
        return (
          <Image
            src={participant.user.avatar.url}
            alt={`${participant.user.firstName} ${participant.user.lastName}`}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
            style={{ objectFit: 'cover' }}
          />
        );
      }
    }

    return (
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg">
        {getTypeIcon()}
      </div>
    );
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-3 text-left hover:bg-gray-50 transition-colors border-l-4 ${
        isSelected ? 'bg-blue-50 border-l-blue-500' : 'border-l-transparent hover:border-l-gray-200'
      }`}
    >
      <div className="flex items-center space-x-3">
        {getParticipantAvatar()}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 truncate">{getConversationTitle()}</h3>
            <span className="text-xs text-gray-500">
              {new Date(conversation.createdAt).toLocaleDateString('fr-FR')}
            </span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500 capitalize">
              {conversation.type.toLowerCase().replace('_', ' ')}
            </span>

            {(conversation._count?.messages ?? 0) > 0 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {conversation._count?.messages ?? 0} message
                {(conversation._count?.messages ?? 0) > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
