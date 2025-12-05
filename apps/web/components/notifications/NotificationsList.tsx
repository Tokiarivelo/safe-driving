'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useNotificationsData } from '@/hooks/useNotificationsData';
import { NotificationItem } from './NotificationItem';
import { NotificationFilters } from './NotificationFilters';
import { NotificationActions } from './NotificationActions';

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  archived: boolean;
  createdAt: string;
  readAt?: string;
  rideId?: string;
  metadata?: Record<string, unknown>;
  sender?: {
    id: string;
    firstName: string;
    lastName?: string;
    avatar?: {
      url?: string;
    };
  };
  ride?: {
    id: string;
    departureAddress?: string;
    arrivalAddress?: string;
    price?: number;
  };
}

interface NotificationsListProps {
  userType: 'user' | 'driver';
}

export function NotificationsList({ userType }: NotificationsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [showItemMenu, setShowItemMenu] = useState<string | null>(null);

  const {
    notifications,
    totalCount,
    unreadCount,
    hasMore,
    loading,
    error,
    loadMore,
    markAsRead,
    markAllAsRead,
    archiveNotification,
    deleteNotification,
    deleteAllNotifications,
    refetch,
  } = useNotificationsData({
    filter: {
      search: searchQuery || undefined,
      type: selectedType,
    },
  });

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
    },
    []
  );

  const handleFilterChange = useCallback((type: string | undefined) => {
    setSelectedType(type);
  }, []);

  const handleNotificationClick = useCallback(
    async (notification: Notification) => {
      if (!notification.read) {
        await markAsRead(notification.id);
      }
    },
    [markAsRead]
  );

  const handleMarkAllAsRead = useCallback(async () => {
    await markAllAsRead();
    setShowActionsMenu(false);
  }, [markAllAsRead]);

  const handleDeleteAll = useCallback(async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes les notifications ?')) {
      await deleteAllNotifications();
      setShowActionsMenu(false);
    }
  }, [deleteAllNotifications]);

  const handleArchive = useCallback(
    async (notificationId: string) => {
      await archiveNotification(notificationId);
      setShowItemMenu(null);
    },
    [archiveNotification]
  );

  const handleDelete = useCallback(
    async (notificationId: string) => {
      await deleteNotification(notificationId);
      setShowItemMenu(null);
    },
    [deleteNotification]
  );

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowActionsMenu(false);
      setShowItemMenu(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <Icon icon="mdi:alert-circle" className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Erreur lors du chargement des notifications</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setShowActionsMenu(!showActionsMenu)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Icon icon="mdi:dots-vertical" className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          {showActionsMenu && (
            <NotificationActions
              onMarkAllAsRead={handleMarkAllAsRead}
              onDeleteAll={handleDeleteAll}
              unreadCount={unreadCount}
            />
          )}
        </div>
      </div>

      {/* Filters */}
      <NotificationFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        selectedType={selectedType}
        onTypeChange={handleFilterChange}
      />

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {loading && notifications.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <Icon icon="mdi:loading" className="w-8 h-8 text-pink-500 animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            <Icon icon="mdi:bell-off" className="w-16 h-16 mb-4" />
            <p>Aucune notification</p>
          </div>
        ) : (
          <>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={handleNotificationClick}
                onArchive={handleArchive}
                onDelete={handleDelete}
                showMenu={showItemMenu === notification.id}
                onToggleMenu={(e) => {
                  e.stopPropagation();
                  setShowItemMenu(showItemMenu === notification.id ? null : notification.id);
                }}
              />
            ))}

            {/* Load More */}
            {hasMore && (
              <div className="p-4 flex justify-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 disabled:opacity-50 transition-colors"
                >
                  {loading ? (
                    <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                  ) : (
                    'Charger plus'
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
