import React from 'react';

import { Icon } from '@iconify/react';
import { ConversationItemProps } from './conversation-selector.interface';
import { ConversationType } from '@/graphql/generated/graphql';
import styles from './conversation.module.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
          <img
            src={participant.user.avatar.url}
            alt={`${participant.user.firstName} ${participant.user.lastName}`}
          />
        );
      }
    }

    return <div>{getTypeIcon()}</div>;
  };

  return (
    <button
      onClick={onClick}
      className='w-full'
      // className={`w-full p-3 text-left hover:bg-gray-500 transition-colors border-l-4 ${
      //   isSelected ? 'bg-blue-50 border-l-blue-500' : 'border-l-transparent hover:border-l-gray-200'
      // }`}
    >
      {/* <div className="flex items-center space-x-3">
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
              <span className="text-xs bg-red-500 text-gray-600 px-2 py-1 rounded-full">
                {conversation._count?.messages ?? 0}
                {(conversation._count?.messages ?? 0) > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div> */}

      <div className={styles.auth_left1}>
        <div className={styles.auth_left2}>
          <div className={styles.auth_left3}>{getParticipantAvatar()}</div>
          {/* <div className={`w-2 h-2 ${connected ? 'bg-green-500' : 'bg-red-500'} absolute mt-9 ml-9 rounded-full`}></div> */}
          <div className={`w-2 h-2 bg-green-500 absolute mt-9 ml-9 rounded-full`}></div>
        </div>
        <div className={styles.auth_left5}>
          <div className={styles.auth_left6}>
            <div className={styles.auth_left7}>{getConversationTitle()}</div>
            <div className={styles.auth_left8}>
              {new Date(conversation.createdAt).toLocaleDateString('fr-FR')}
            </div>
            <div className={styles.auth_left9}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className={styles.auth_left10}>
                    <div className={styles.auth_left11}></div>
                    <div className={styles.auth_left11}></div>
                    <div className={styles.auth_left11}></div>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent side="bottom" align="start" className={styles.auth_left12}>
                  <div className={styles.auth_left13}>
                    <div className={styles.auth_left14}>
                      <Icon
                        icon="material-symbols:archive-outline-rounded"
                        width="24"
                        height="24"
                      />
                    </div>
                    <div className={styles.auth_left15}>Archiver</div>
                  </div>
                  <DropdownMenuSeparator />
                  <div className={styles.auth_left16}>
                    <div className={styles.auth_left17}>
                      <Icon icon="mdi:delete-forever" width="24" height="24" />
                    </div>
                    <div className={styles.auth_left18}>Supprimer conversation </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className={styles.auth_left19}>
            <div className={styles.auth_left20}>
              {conversation.type.toLowerCase().replace('_', ' ')}
            </div>
            <div className="bg-violet-400-400 w-[30%] h-10 justify-center flex items-center">
              <div className={styles.auth_left22}>
                {(conversation._count?.messages ?? 0) > 0 && (
                  <span>
                    {conversation._count?.messages ?? 0}
                    {(conversation._count?.messages ?? 0) > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
