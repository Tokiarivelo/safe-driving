'use client';

import React from 'react';
import { Icon } from '@iconify/react';

interface NotificationActionsProps {
  onMarkAllAsRead: () => void;
  onDeleteAll: () => void;
  unreadCount: number;
}

export function NotificationActions({
  onMarkAllAsRead,
  onDeleteAll,
  unreadCount,
}: NotificationActionsProps) {
  return (
    <div className="absolute right-0 top-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[220px] z-50">
      <button
        onClick={onMarkAllAsRead}
        disabled={unreadCount === 0}
        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icon icon="mdi:check-all" className="w-5 h-5 text-green-500" />
        Marquer tous comme lus
      </button>
      <button
        onClick={onDeleteAll}
        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-pink-600 dark:text-pink-400 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Icon icon="mdi:delete-sweep" className="w-5 h-5" />
        Supprimer tous
      </button>
    </div>
  );
}
