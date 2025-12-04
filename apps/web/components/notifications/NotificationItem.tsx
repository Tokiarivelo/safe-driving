'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import type { Notification } from './NotificationsList';

interface NotificationItemProps {
  notification: Notification;
  onClick: (notification: Notification) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  showMenu: boolean;
  onToggleMenu: (e: React.MouseEvent) => void;
}

// Map notification types to icons and colors
const notificationConfig: Record<string, { icon: string; iconColor: string }> = {
  RIDE_CONFIRMED: { icon: 'mdi:car-check', iconColor: 'text-pink-500' },
  DRIVER_EN_ROUTE: { icon: 'mdi:car-arrow-right', iconColor: 'text-pink-500' },
  DRIVER_ARRIVED: { icon: 'mdi:map-marker-check', iconColor: 'text-blue-500' },
  RIDE_STARTED: { icon: 'mdi:navigation', iconColor: 'text-green-500' },
  RIDE_COMPLETED: { icon: 'mdi:map-marker-check', iconColor: 'text-pink-500' },
  NEW_MESSAGE: { icon: 'mdi:message-text', iconColor: 'text-purple-500' },
  MISSED_CALL: { icon: 'mdi:phone-missed', iconColor: 'text-pink-500' },
  PROMOTION: { icon: 'mdi:percent', iconColor: 'text-pink-500' },
  RIDE_REMINDER: { icon: 'mdi:clock-outline', iconColor: 'text-blue-500' },
  REVIEW_REQUEST: { icon: 'mdi:star', iconColor: 'text-yellow-500' },
  DRIVER_REVIEW: { icon: 'mdi:account-star', iconColor: 'text-yellow-500' },
  SECURITY_ALERT: { icon: 'mdi:alert-triangle', iconColor: 'text-orange-500' },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "À l'instant";
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;

  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function NotificationItem({
  notification,
  onClick,
  onArchive,
  onDelete,
  showMenu,
  onToggleMenu,
}: NotificationItemProps) {
  const config = notificationConfig[notification.type] || {
    icon: 'mdi:bell',
    iconColor: 'text-gray-500',
  };

  const senderAvatar = notification.sender?.avatar?.url;
  const senderName = notification.sender
    ? `${notification.sender.firstName} ${notification.sender.lastName || ''}`.trim()
    : null;

  return (
    <div
      onClick={() => onClick(notification)}
      className={`relative flex items-start gap-4 p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors ${
        !notification.read ? 'bg-pink-50/50 dark:bg-pink-900/10' : ''
      }`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {senderAvatar ? (
          <img
            src={senderAvatar}
            alt={senderName || 'User'}
            className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <Icon icon="mdi:account" className="w-8 h-8 text-gray-500 dark:text-gray-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <Icon icon={config.icon} className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
              {notification.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">
              {notification.message}
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {formatDate(notification.createdAt)}
        </span>
        
        <div className="flex items-center gap-2">
          {!notification.read && (
            <span className="w-3 h-3 bg-pink-500 rounded-full flex-shrink-0" />
          )}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={onToggleMenu}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors opacity-0 group-hover:opacity-100"
              style={{ opacity: showMenu ? 1 : undefined }}
            >
              <Icon icon="mdi:dots-vertical" className="w-5 h-5 text-gray-500" />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[180px] z-50">
                <button
                  onClick={() => onArchive(notification.id)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Icon icon="mdi:archive" className="w-5 h-5" />
                  Archiver
                </button>
                <button
                  onClick={() => onDelete(notification.id)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-pink-600 dark:text-pink-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Icon icon="mdi:delete" className="w-5 h-5" />
                  Supprimer la conversation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
