'use client';

import { useState, useCallback, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useSocketConnection } from '@/lib/socket.io/SocketProvider';
import type { Notification } from '@/components/notifications/NotificationsList';

// Define GraphQL operations inline since codegen may not be available
const GET_NOTIFICATIONS = gql`
  query GetNotifications($filter: NotificationsFilterInput, $cursor: String, $limit: Int) {
    notifications(filter: $filter, cursor: $cursor, limit: $limit) {
      notifications {
        id
        type
        title
        message
        read
        archived
        createdAt
        readAt
        rideId
        metadata
        sender {
          id
          firstName
          lastName
          avatar {
            url
          }
        }
        ride {
          id
          departureAddress
          arrivalAddress
          price
        }
      }
      totalCount
      unreadCount
      hasMore
    }
  }
`;

const MARK_NOTIFICATION_AS_READ = gql`
  mutation MarkNotificationAsRead($notificationId: String!) {
    markNotificationAsRead(notificationId: $notificationId) {
      success
      message
      notification {
        id
        read
        readAt
      }
    }
  }
`;

const MARK_ALL_NOTIFICATIONS_AS_READ = gql`
  mutation MarkAllNotificationsAsRead {
    markAllNotificationsAsRead {
      success
      count
    }
  }
`;

const ARCHIVE_NOTIFICATION = gql`
  mutation ArchiveNotification($notificationId: String!) {
    archiveNotification(notificationId: $notificationId) {
      success
      message
      notification {
        id
        archived
      }
    }
  }
`;

const DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($notificationId: String!) {
    deleteNotification(notificationId: $notificationId) {
      success
      message
    }
  }
`;

const DELETE_ALL_NOTIFICATIONS = gql`
  mutation DeleteAllNotifications {
    deleteAllNotifications {
      success
      count
    }
  }
`;

interface NotificationsFilter {
  type?: string;
  read?: boolean;
  archived?: boolean;
  search?: string;
}

interface UseNotificationsDataProps {
  filter?: NotificationsFilter;
  limit?: number;
}

interface NotificationsQueryResult {
  notifications: {
    notifications: Notification[];
    totalCount: number;
    unreadCount: number;
    hasMore: boolean;
  };
}

export function useNotificationsData({
  filter,
  limit = 20,
}: UseNotificationsDataProps = {}) {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const { socket, isConnected } = useSocketConnection();

  // Check if filter has any properties set
  const hasFilter =
    filter &&
    (filter.search !== undefined ||
      filter.type !== undefined ||
      filter.read !== undefined ||
      filter.archived !== undefined);

  // Query notifications
  const { data, loading, error, refetch, fetchMore } = useQuery<NotificationsQueryResult>(
    GET_NOTIFICATIONS,
    {
      variables: {
        filter: hasFilter ? filter : undefined,
        cursor,
        limit,
      },
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    }
  );

  // Mutations
  const [markAsReadMutation] = useMutation(MARK_NOTIFICATION_AS_READ);
  const [markAllAsReadMutation] = useMutation(MARK_ALL_NOTIFICATIONS_AS_READ);
  const [archiveNotificationMutation] = useMutation(ARCHIVE_NOTIFICATION);
  const [deleteNotificationMutation] = useMutation(DELETE_NOTIFICATION);
  const [deleteAllNotificationsMutation] = useMutation(DELETE_ALL_NOTIFICATIONS);

  // Extract data
  const notifications = data?.notifications?.notifications || [];
  const totalCount = data?.notifications?.totalCount || 0;
  const unreadCount = data?.notifications?.unreadCount || 0;
  const hasMore = data?.notifications?.hasMore || false;

  // Load more notifications
  const loadMore = useCallback(async () => {
    if (!hasMore || loading || notifications.length === 0) return;

    const lastNotification = notifications[notifications.length - 1];
    const newCursor = lastNotification?.createdAt;

    if (newCursor) {
      await fetchMore({
        variables: { cursor: newCursor, limit },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            notifications: {
              ...fetchMoreResult.notifications,
              notifications: [
                ...prev.notifications.notifications,
                ...fetchMoreResult.notifications.notifications,
              ],
            },
          };
        },
      });
    }
  }, [hasMore, loading, notifications, fetchMore, limit]);

  // Mark a single notification as read
  const markAsRead = useCallback(
    async (notificationId: string) => {
      try {
        await markAsReadMutation({
          variables: { notificationId },
          optimisticResponse: {
            markNotificationAsRead: {
              success: true,
              message: null,
              notification: {
                __typename: 'Notification',
                id: notificationId,
                read: true,
                readAt: new Date().toISOString(),
              },
            },
          },
          update: (cache) => {
            // Update the specific notification in cache
            cache.modify({
              id: cache.identify({ __typename: 'Notification', id: notificationId }),
              fields: {
                read: () => true,
                readAt: () => new Date().toISOString(),
              },
            });
          },
        });
      } catch (err) {
        console.error('Error marking notification as read:', err);
      }
    },
    [markAsReadMutation]
  );

  // Get current query variables for cache operations
  const queryVariables = {
    filter: hasFilter ? filter : undefined,
    cursor,
    limit,
  };

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    try {
      await markAllAsReadMutation({
        refetchQueries: [{ query: GET_NOTIFICATIONS, variables: queryVariables }],
      });
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  }, [markAllAsReadMutation, queryVariables]);

  // Archive a notification
  const archiveNotification = useCallback(
    async (notificationId: string) => {
      try {
        await archiveNotificationMutation({
          variables: { notificationId },
          update: (cache) => {
            // Remove from current list by modifying the query data
            const existingData = cache.readQuery<NotificationsQueryResult>({
              query: GET_NOTIFICATIONS,
              variables: queryVariables,
            });

            if (existingData) {
              cache.writeQuery({
                query: GET_NOTIFICATIONS,
                variables: queryVariables,
                data: {
                  notifications: {
                    ...existingData.notifications,
                    notifications: existingData.notifications.notifications.filter(
                      (n) => n.id !== notificationId
                    ),
                    totalCount: existingData.notifications.totalCount - 1,
                  },
                },
              });
            }
          },
        });
      } catch (err) {
        console.error('Error archiving notification:', err);
      }
    },
    [archiveNotificationMutation, queryVariables]
  );

  // Delete a notification
  const deleteNotification = useCallback(
    async (notificationId: string) => {
      try {
        await deleteNotificationMutation({
          variables: { notificationId },
          update: (cache) => {
            // Remove from current list
            const existingData = cache.readQuery<NotificationsQueryResult>({
              query: GET_NOTIFICATIONS,
              variables: queryVariables,
            });

            if (existingData) {
              const deletedNotification = existingData.notifications.notifications.find(
                (n) => n.id === notificationId
              );
              const wasUnread = deletedNotification && !deletedNotification.read;

              cache.writeQuery({
                query: GET_NOTIFICATIONS,
                variables: queryVariables,
                data: {
                  notifications: {
                    ...existingData.notifications,
                    notifications: existingData.notifications.notifications.filter(
                      (n) => n.id !== notificationId
                    ),
                    totalCount: existingData.notifications.totalCount - 1,
                    unreadCount: wasUnread
                      ? existingData.notifications.unreadCount - 1
                      : existingData.notifications.unreadCount,
                  },
                },
              });
            }
          },
        });
      } catch (err) {
        console.error('Error deleting notification:', err);
      }
    },
    [deleteNotificationMutation, queryVariables]
  );

  // Delete all notifications
  const deleteAllNotifications = useCallback(async () => {
    try {
      await deleteAllNotificationsMutation({
        refetchQueries: [{ query: GET_NOTIFICATIONS, variables: queryVariables }],
      });
    } catch (err) {
      console.error('Error deleting all notifications:', err);
    }
  }, [deleteAllNotificationsMutation, queryVariables]);

  // Listen for real-time updates via Socket.IO
  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleNewNotification = (data: { notification: Notification }) => {
      // Refetch to get the new notification
      refetch();
    };

    const handleNotificationRead = () => {
      // Just refetch to update counts
      refetch();
    };

    const handleAllNotificationsRead = () => {
      refetch();
    };

    socket.on('newNotification', handleNewNotification);
    socket.on('notificationRead', handleNotificationRead);
    socket.on('allNotificationsRead', handleAllNotificationsRead);

    return () => {
      socket.off('newNotification', handleNewNotification);
      socket.off('notificationRead', handleNotificationRead);
      socket.off('allNotificationsRead', handleAllNotificationsRead);
    };
  }, [socket, isConnected, refetch]);

  return {
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
  };
}
